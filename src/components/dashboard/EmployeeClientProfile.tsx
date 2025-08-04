"use client";
import { BackendUser, Client } from "@/types/backend";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiEdit,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

interface EmployeeClientProfileProps {
  client: BackendUser | Client;
}

export function EmployeeClientProfile({ client }: EmployeeClientProfileProps) {
  const router = useRouter();

  if (!client) {
    return <div className="p-6">Cliente não encontrado.</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Perfil do Cliente</h1>
          <button
            onClick={() =>
              router.push(`/dashboard/admin/clients/${client.id}/edit`)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors flex items-center gap-2"
          >
            <FiEdit className="w-4 h-4" />
            Editar Cliente
          </button>
        </div>

        {/* Informações Básicas */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiUser className="w-5 h-5" />
            Informações Básicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <div className="text-gray-900 font-medium">{client.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="text-gray-900 flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                {client.email}
              </div>
            </div>

            {client.phone && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <div className="text-gray-900 flex items-center gap-2">
                  <FiPhone className="w-4 h-4" />
                  {client.phone}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex items-center gap-2">
                {client.status === "ACTIVE" ? (
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <FiXCircle className="w-5 h-5 text-red-500" />
                )}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {client.status === "ACTIVE" ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiCalendar className="w-5 h-5" />
            Informações do Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID do Cliente
              </label>
              <div className="text-gray-900 font-mono text-sm">{client.id}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Criação
              </label>
              <div className="text-gray-900">
                {new Date(client.createdAt).toLocaleDateString("pt-BR")}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Última Atualização
              </label>
              <div className="text-gray-900">
                {new Date(client.updatedAt).toLocaleDateString("pt-BR")}
              </div>
            </div>

            {"lastLogin" in client && client.lastLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Último Login
                </label>
                <div className="text-gray-900">
                  {new Date(client.lastLogin).toLocaleDateString("pt-BR")}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informações do Cliente/Tenant */}
        {"client" in client && client.client && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              Informações do Cliente/Tenant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Cliente
                </label>
                <div className="text-gray-900">{client.client.name}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status do Cliente
                </label>
                <div className="flex items-center gap-2">
                  {client.client.status === "ACTIVE" ? (
                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <FiXCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.client.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {client.client.status === "ACTIVE" ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder para funcionalidades futuras */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Histórico de Sessões
          </h2>
          <div className="text-gray-500 text-center py-8">
            <div className="text-lg font-medium mb-2">Em desenvolvimento</div>
            <div className="text-sm">
              Sistema de histórico de sessões será implementado em breve...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
