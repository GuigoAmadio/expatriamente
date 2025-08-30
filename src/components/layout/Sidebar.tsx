"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BackendUser } from "@/types/backend";
import React, { useCallback } from "react";
import {
  Home,
  Users,
  CalendarDays,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

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
          {
            label: "Dashboard",
            href: "/dashboard/admin",
            icon: <Home className="w-4 h-4 text-[#a8b093]" />,
          },
          {
            label: "Psicanalistas",
            href: "/dashboard/admin/employees",
            icon: <Users className="w-4 h-4 text-[#a8b093]" />,
          },
          {
            label: "Agendamentos",
            href: "/dashboard/admin/appointments",
            icon: <CalendarDays className="w-4 h-4 text-[#a8b093]" />,
          },
          {
            label: "Usuários",
            href: "/dashboard/admin/clients",
            icon: <UserRound className="w-4 h-4 text-[#a8b093]" />,
          },
          {
            label: "Serviços",
            href: "/dashboard/admin/services",
            icon: <Settings className="w-4 h-4 text-[#a8b093]" />,
          },
        ];
      case "EMPLOYEE":
        return [
          {
            label: "Dashboard",
            href: "/dashboard/employee",
            icon: <Home className="w-4 h-4 text-[#a8b093]" />,
          },
          {
            label: "Meus Clientes",
            href: "/dashboard/employee/clients",
            icon: <Users className="w-4 h-4 text-[#a8b093]" />,
          },
          {
            label: "Meus Agendamentos",
            href: "/dashboard/employee/appointments",
            icon: <CalendarDays className="w-4 h-4 text-[#a8b093]" />,
          },
        ];
      case "CLIENT":
        return [
          {
            label: "Dashboard",
            href: "/dashboard/client",
            icon: <Home className="w-4 h-4 text-[#a8b093]" />,
          },
          {
            label: "Meus Agendamentos",
            href: "/dashboard/client/appointments",
            icon: <CalendarDays className="w-4 h-4 text-[#a8b093]" />,
          },
          {
            label: "Ver Psiquiatras",
            href: "/dashboard/client/psychologists",
            icon: <UserRound className="w-4 h-4 text-[#a8b093]" />,
          },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="hidden lg:block fixed left-0 top-0 h-full w-48 bg-[#fbf5e0] z-50 border-r border-lime-100">
      <div className="p-6">
        <h1 className="text-lg font-bold text-stone-600">Expatriamente</h1>
      </div>

      <div className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 text-gray-700 text-xs rounded-lg font-body font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-white text-blue-700"
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
          className="w-full flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 text-[#a8b093] mr-3" />
          Sair
        </button>
      </div>
    </nav>
  );
});
