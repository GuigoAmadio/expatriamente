"use client";
import { Button } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/");
    router.refresh();
  }, [logout, router]);

  return (
    <Button type="button" variant="outline" onClick={handleLogout}>
      Sair
    </Button>
  );
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Bem-vindo, {user.name}!
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Cards de estatísticas podem ser adicionados aqui */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Seu Perfil
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Email: {user.email}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
