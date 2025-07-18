"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BackendUser } from "@/types/backend";

interface SidebarProps {
  user: BackendUser | null;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const getMenuItems = () => {
    switch (user?.role) {
      case "ADMIN":
      case "SUPER_ADMIN":
        return [
          { label: "Dashboard", href: "/dashboard/admin", icon: "🏠" },
          {
            label: "Funcionários",
            href: "/dashboard/admin/employees",
            icon: "👥",
          },
          {
            label: "Agendamentos",
            href: "/dashboard/admin/appointments",
            icon: "📅",
          },
          { label: "Usuários", href: "/dashboard/admin/users", icon: "👤" },
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
            label: "Minha Agenda",
            href: "/dashboard/employee/schedule",
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
            label: "Psicólogos",
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
    <nav className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
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
          onClick={() => {
            // Implementar logout
            localStorage.removeItem("auth-token");
            window.location.href = "/login";
          }}
          className="w-full flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="mr-3">🚪</span>
          Sair
        </button>
      </div>
    </nav>
  );
}
