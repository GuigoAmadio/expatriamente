"use client";

import { useAuth } from "@/context/AuthContext";
import { BackendUser } from "@/types/backend";
import React from "react";

interface HeaderProps {
  user: BackendUser | null;
}

export const Header = React.memo(function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Bem-vindo, {user?.name || "Usuário"}
          </h2>
          <p className="text-sm text-gray-600">
            {user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
              ? "Painel Administrativo"
              : user?.role === "EMPLOYEE"
              ? "Painel do Funcionário"
              : "Painel do Cliente"}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
});
