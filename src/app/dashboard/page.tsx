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
      <div className="min-h-[50vh] flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
        Bem-vindo, {user.name}!
      </h2>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
            Seu Perfil
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Email: {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}
