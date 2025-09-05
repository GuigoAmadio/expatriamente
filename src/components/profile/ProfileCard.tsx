"use client";

import React from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiEdit,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

interface ProfileCardProps {
  title: string;
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
    clientId?: string;
    role: "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE" | "CLIENT";
    employeeId?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  showEdit?: boolean;
  onEdit?: () => void;
  showSystemInfo?: boolean;
}

export function ProfileCard({
  title,
  user,
  showEdit = true,
  onEdit,
  showSystemInfo = true,
}: ProfileCardProps) {
  return (
    <div className="card-elevated p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-[#453706] flex items-center gap-2">
          <FiUser className="w-5 h-5" />
          {title}
        </h2>
        {showEdit && onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <FiEdit className="w-4 h-4" />
            Editar Perfil
          </button>
        )}
      </div>

      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Nome
          </label>
          <div className="text-stone-900 font-medium">{user.name}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Email
          </label>
          <div className="text-stone-900 flex items-center gap-2">
            <FiMail className="w-4 h-4" />
            {user.email}
          </div>
        </div>
      </div>

      {/* Informações do Sistema */}
      {showSystemInfo && (
        <div className="mt-6 pt-6 border-t border-stone-200">
          <h3 className="text-lg font-semibold text-[#453706] mb-4 flex items-center gap-2">
            <FiCalendar className="w-5 h-5" />
            Informações do Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                ID do Usuário
              </label>
              <div className="text-stone-900 font-mono text-sm">{user.id}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Data de Criação
              </label>
              <div className="text-stone-900">
                {new Date(user.createdAt).toLocaleDateString("pt-BR")}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Última Atualização
              </label>
              <div className="text-stone-900">
                {new Date(user.updatedAt).toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
