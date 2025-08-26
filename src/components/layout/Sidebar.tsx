"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BackendUser } from "@/types/backend";
import React, { useCallback } from "react";

interface SidebarProps {
  user: BackendUser | null;
}

export const Sidebar = React.memo(function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.push("/auth/signin");
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Em caso de erro, tentar limpeza manual e redirecionamento
      localStorage.removeItem("auth-token");
      window.location.href = "/auth/signin";
    }
  }, [logout, router]);

  const getMenuItems = () => {
    switch (user?.role) {
      case "ADMIN":
      case "SUPER_ADMIN":
        return [
          { label: "Dashboard", href: "/dashboard/admin", icon: "🏠" },
          {
            label: "Psicanalistas",
            href: "/dashboard/admin/employees",
            icon: "👥",
          },
          {
            label: "Agendamentos",
            href: "/dashboard/admin/appointments",
            icon: "📅",
          },
          { label: "Usuários", href: "/dashboard/admin/clients", icon: "👤" },
          { label: "Serviços", href: "/dashboard/admin/services", icon: "⚙️" },
        ];
      case "EMPLOYEE":
        return [
          { label: "Dashboard", href: "/dashboard/employee", icon: "🏠" },
          {
            label: "Meus Clientes",
            href: "/dashboard/employee/clients",
            icon: "👥",
          },
          {
            label: "Meus Agendamentos",
            href: "/dashboard/employee/appointments",
            icon: "📅",
          },
        ];
      case "CLIENT":
        return [
          { label: "Dashboard", href: "/dashboard/client", icon: "🏠" },
          {
            label: "Meus Agendamentos",
            href: "/dashboard/client/appointments",
            icon: "📅",
          },
          {
            label: "Ver Psiquiatras",
            href: "/dashboard/client/psychologists",
            icon: "👤",
          },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Expatriamente</h1>
        {user && (
          <p className="text-sm text-gray-600 mt-2">
            {user.name} ({user.role})
          </p>
        )}
      </div>

      <div className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 w-full p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <span className="mr-3">🚪</span>
          Sair
        </button>
      </div>
    </nav>
  );
});
