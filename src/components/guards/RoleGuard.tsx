"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallback,
}: RoleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Só redirecionar se não estiver carregando E não tiver usuário
    if (!isLoading && !user) {
      console.log(
        "RoleGuard: Usuário não encontrado, redirecionando para login"
      );
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

  // Mostrar loading enquanto carrega
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Se não tem usuário E não está carregando, não renderizar nada (vai redirecionar)
  if (!user) {
    return null;
  }

  // Verificar se o usuário tem a role permitida
  if (!allowedRoles.includes(user.role)) {
    console.log(
      `RoleGuard: Usuário com role ${user.role} não tem acesso. Roles permitidas:`,
      allowedRoles
    );
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Acesso Negado
            </h1>
            <p className="text-gray-600 mb-4">
              Você não tem permissão para acessar esta página.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
