"use client";
import { Client } from "@/types/backend";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FiCheckCircle, FiUser, FiXCircle, FiMail } from "react-icons/fi";

interface EmployeeClientsListProps {
  clients: Client[];
}

export function EmployeeClientsList({ clients }: EmployeeClientsListProps) {
  const router = useRouter();

  const onSelectClient = useCallback(
    (client: Client) => {
      router.push(`/dashboard/employee/clients/${client.id}`);
    },
    [router]
  );

  // Removidos editar/excluir no contexto do employee

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Meus Clientes
        </h1>
        <p className="text-sm text-gray-500">Total: {clients.length}</p>
      </div>

      {clients.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-gray-500">
          Nenhum cliente encontrado
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="group relative rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md cursor-pointer"
              onClick={() => onSelectClient(client)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-700 flex items-center gap-2 truncate">
                      {client.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600 flex items-center gap-1 truncate">
                      <FiMail className="h-4 w-4" /> {client.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                    client.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {client.status === "ACTIVE" ? (
                    <FiCheckCircle className="h-3.5 w-3.5" />
                  ) : (
                    <FiXCircle className="h-3.5 w-3.5" />
                  )}
                  {client.status}
                </span>
              </div>

              {/* Removidos botões de Editar/Excluir conforme solicitado */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
