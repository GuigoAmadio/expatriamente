"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { BackendUser } from "@/types/backend";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { DASHBOARD_ROUTE_BY_ROLE } from "@/lib/auth-config";

interface AuthContextType {
  user: BackendUser | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Memoizar loadUser para evitar recriações desnecessárias
  const loadUser = useCallback(async () => {
    try {
      // Usar Server Action para buscar usuário (acessa cookies HttpOnly)
    const { getAuthUser } = await import("@/actions/auth");
      const user = await getAuthUser();

      console.log("Usuário carregado via Server Action:", user);

      if (user) {
        // Converter User para BackendUser se necessário
        const backendUser: BackendUser = {
          id: user.id,
          employeeId: user.employeeId,
          name: user.name || "",
          email: user.email,
          phone: (user as any).phone,
          role: user.role as "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE" | "CLIENT",
          status: "ACTIVE",
          clientId: (user as any).clientId || "",
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          client: (user as any).client,
        };
        setUser(backendUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
      console.log("Finalizou carregamento do usuário");
    }
  }, []);

  useEffect(() => {
    // Carregar usuário usando Server Action (que acessa cookies HttpOnly)
    loadUser();
  }, [loadUser]);

  // Memoizar funções para evitar recriações
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { loginAction } = await import("@/actions/auth");
        const result = await loginAction({ email, password });
        console.log("result", result);
        if (!result.success) {
          return {
            success: false,
            error: result.message || "Erro ao fazer login",
          };
        } else {
          // Recarregar o usuário após login bem-sucedido
          await loadUser();

          // role pode ser ADMIN, EMPLOYEE, CLIENT, etc
          const role = result.user?.role?.toUpperCase() || "CLIENT";
          let dashboardRoute = "/dashboard";
          if (role === "EMPLOYEE") dashboardRoute = "/dashboard/employee";
          else if (role === "ADMIN") dashboardRoute = "/dashboard/admin";
          else if (role === "CLIENT") dashboardRoute = "/dashboard/client";

          console.log(`Redirecionando para: ${dashboardRoute}`);
          router.push(dashboardRoute);
          router.refresh();
          return { success: true };
        }
      } catch (error) {
        return { success: false, error: "Erro ao fazer login" };
      }
    },
    [loadUser, router]
  );

  const logout = useCallback(async () => {
    try {
      const { logoutAction } = await import("@/actions/auth");
      await logoutAction();
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setUser(null);
    }
  }, []);

  const register = useCallback(
    async (data: any) => {
      try {
        const { registerAction } = await import("@/actions/auth");
        const response = await registerAction(data);

        if (response.success) {
          // Recarregar o usuário após registro bem-sucedido
          await loadUser();
          // Redirecionar para o dashboard correto
          const role = response.user?.role?.toUpperCase() || "CLIENT";
          const dashboardRoute = DASHBOARD_ROUTE_BY_ROLE[role] || "/dashboard";
          router.push(dashboardRoute);
          return { success: true };
        } else {
          return {
            success: false,
            error: response.message || "Erro no registro",
          };
        }
      } catch (error) {
        return { success: false, error: "Erro ao registrar" };
      }
    },
    [loadUser, router]
  );

  // Memoizar o valor do contexto para evitar re-renderizações
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
      register,
    }),
    [user, isLoading, login, logout, register]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
