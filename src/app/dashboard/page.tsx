"use client";
import { Button } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

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

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    // Redireciona para o painel principal conforme a role
    const role = user.role?.toUpperCase();
    if (role === "ADMIN" || role === "SUPER_ADMIN")
      router.push("/dashboard/admin");
    else if (role === "EMPLOYEE") router.push("/dashboard/employee");
    else router.push("/dashboard/client");
  }, [user, isLoading, router]);

  // Enquanto decide o destino, mostra loading simples
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <p>Carregando dashboard...</p>
    </main>
  );
}
