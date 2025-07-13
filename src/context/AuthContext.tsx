"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { BackendUser } from "@/types/backend";
import { apiClient } from "@/lib/api-client";

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

  useEffect(() => {
    // Carregar usuário usando Server Action (que acessa cookies HttpOnly)
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Usar Server Action para buscar usuário (acessa cookies HttpOnly)
      const { getAuthUser } = await import("@/actions/auth");
      const user = await getAuthUser();

      console.log("Usuário carregado via Server Action:", user);

      if (user) {
        // Converter User para BackendUser se necessário
        const backendUser: BackendUser = {
          id: user.id,
          name: user.name || "",
          email: user.email,
          phone: (user as any).phone,
          role: user.role === "admin" ? "ADMIN" : "CLIENT",
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
  };

  const login = async (email: string, password: string) => {
    try {
      const { loginAction } = await import("@/actions/auth");
      const response = await loginAction({ email, password });

      if (response.success) {
        // Recarregar o usuário após login bem-sucedido
        await loadUser();
        return { success: true };
      } else {
        return { success: false, error: response.message || "Erro no login" };
      }
    } catch (error) {
      return { success: false, error: "Erro ao fazer login" };
    }
  };

  const logout = async () => {
    try {
      const { logoutAction } = await import("@/actions/auth");
      await logoutAction();
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setUser(null);
    }
  };

  const register = async (data: any) => {
    try {
      // Assumindo que você tem uma registerAction similar ao loginAction
      // Se não existir, você pode criar uma ou usar o apiClient temporariamente
      const response = await apiClient.register(data);
      if (response.success && response.data) {
        // A API pode retornar os dados em diferentes estruturas
        const responseData = (response.data as any)?.data || response.data;
        const token = (responseData as any)?.token;
        const user = (responseData as any)?.user;

        if (token && user) {
          // Após registro bem-sucedido, recarregar usuário
          await loadUser();
          return { success: true };
        } else {
          return { success: false, error: "Dados de registro inválidos" };
        }
      } else {
        return {
          success: false,
          error: response.message || "Erro no registro",
        };
      }
    } catch (error) {
      return { success: false, error: "Erro ao registrar" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
