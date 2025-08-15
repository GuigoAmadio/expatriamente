"use client";

import { useAuth } from "@/context/AuthContext";
import { BackendUser } from "@/types/backend";
import React from "react";

interface HeaderProps {
  user: BackendUser | null;
}

export const Header = React.memo(function Header({ user }: HeaderProps) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
      case "SUPER_ADMIN":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case "EMPLOYEE":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "ADMIN":
      case "SUPER_ADMIN":
        return "Painel Administrativo";
      case "EMPLOYEE":
        return "Painel do Funcionário";
      default:
        return "Painel do Cliente";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
      case "SUPER_ADMIN":
        return "bg-purple-100 text-purple-700";
      case "EMPLOYEE":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-xl font-semibold text-gray-900">
              Bem-vindo, {user?.name?.split(" ")[0] || "Usuário"}
            </h2>
            <div
              className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                user?.role || ""
              )}`}
            >
              {getRoleIcon(user?.role || "")}
              {user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
                ? "Admin"
                : user?.role === "EMPLOYEE"
                ? "Psicanalista"
                : "Cliente"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[200px]">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 line-clamp-1 max-w-[220px]">
                {user?.email}
              </p>
            </div>

            {/* Avatar melhorado */}
            <div className="relative group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group-hover:shadow-xl group-hover:scale-105">
                <span className="text-white text-sm sm:text-base font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
