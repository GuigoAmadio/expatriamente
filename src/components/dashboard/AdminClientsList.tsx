"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToasts } from "@/components/ui/Toast";
import { Client } from "@/types/backend";
import { deleteClient } from "@/actions/clients";
import { FiSearch, FiPlus, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

interface AdminClientsListProps {
  clients: Client[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (status: string) => void;
  onPageChange: (page: number) => void;
  onSelectClient: (client: Client) => void;
  onClientDeleted?: () => void;
}

export default function AdminClientsList({
  clients,
  meta,
  loading,
  error,
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onPageChange,
  onSelectClient,
  onClientDeleted,
}: AdminClientsListProps) {
  const router = useRouter();
  const { addToast } = useToasts();
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleViewClient = (client: Client) => {
    onSelectClient(client);
    router.push(`/dashboard/admin/clients/${client.id}`);
  };

  const handleEditClient = (client: Client) => {
    onSelectClient(client);
    router.push(`/dashboard/admin/clients/${client.id}/edit`);
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
  };

  const handleConfirmDelete = async () => {
    if (!clientToDelete) return;

    try {
      setDeletingClientId(clientToDelete.id);
      await deleteClient(clientToDelete.id);
      addToast({
        type: "success",
        message: "Cliente excluído com sucesso!",
      });
      // Chamar callback para atualizar a lista
      if (onClientDeleted) {
        onClientDeleted();
      }
    } catch (error: any) {
      addToast({
        type: "error",
        message: error.message || "Erro ao excluir cliente",
      });
    } finally {
      setDeletingClientId(null);
      setClientToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setClientToDelete(null);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="text-red-800">
            <p className="font-medium">Erro ao carregar clientes</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra de pesquisa e filtros */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 order-2 sm:order-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors text-sm"
            />
          </div>
        </div>
        <div className="sm:w-48 order-3 sm:order-2">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors text-sm"
          >
            <option value="all">Todos os status</option>
            <option value="ACTIVE">Ativo</option>
            <option value="INACTIVE">Inativo</option>
          </select>
        </div>
        <div className="order-1 sm:order-3">
          <button
            onClick={() => router.push("/dashboard/admin/clients/new")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <FiPlus />
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Lista de clientes - Mobile minimalista */}
      <div className="sm:hidden space-y-3 w-full">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center text-gray-500">
            Carregando...
          </div>
        ) : clients.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center text-gray-500">
            Nenhum cliente encontrado
          </div>
        ) : (
          clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate max-w-[60vw]">
                  {client.name}
                </div>
                <div className="text-xs text-gray-600 truncate max-w-[60vw]">
                  {client.email}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  aria-label="Ver"
                  title="Ver"
                  className="w-9 h-9 grid place-items-center rounded-lg bg-gray-100 text-gray-700"
                  onClick={() => handleViewClient(client)}
                >
                  <FiEye className="w-4 h-4" />
                </button>
                <button
                  aria-label="Editar"
                  title="Editar"
                  className="w-9 h-9 grid place-items-center rounded-lg bg-blue-600 text-white"
                  onClick={() => handleEditClient(client)}
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <button
                  aria-label="Excluir"
                  title="Excluir"
                  onClick={() => handleDeleteClick(client)}
                  disabled={deletingClientId === client.id}
                  className={`w-9 h-9 grid place-items-center rounded-lg ${
                    deletingClientId === client.id
                      ? "bg-red-200 text-white"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tabela de clientes - Desktop */}
      <div className="hidden sm:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Carregando...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum cliente encontrado
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {getInitials(client.name)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {client.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                      {client.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                      {client.phone || "-"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          client.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {client.status === "ACTIVE" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                      {formatDate(client.createdAt)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewClient(client)}
                          className="w-9 h-9 grid place-items-center rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Visualizar"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditClient(client)}
                          className="w-9 h-9 grid place-items-center rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                          title="Editar"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(client)}
                          disabled={deletingClientId === client.id}
                          className={`w-9 h-9 grid place-items-center rounded-lg transition-colors ${
                            deletingClientId === client.id
                              ? "bg-red-200 text-white cursor-not-allowed"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                          title="Excluir"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando {(meta.page - 1) * meta.limit + 1} a{" "}
            {Math.min(meta.page * meta.limit, meta.totalItems)} de{" "}
            {meta.totalItems} itens
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(meta.page - 1)}
              disabled={!meta.hasPrevious}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Anterior
            </button>

            {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                    meta.page === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {meta.totalPages > 5 && (
              <>
                <span className="px-2 text-gray-500">...</span>
                <button
                  onClick={() => onPageChange(meta.totalPages)}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {meta.totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => onPageChange(meta.page + 1)}
              disabled={!meta.hasNext}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Delete */}
      {clientToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar Exclusão
            </h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o cliente{" "}
              <span className="font-semibold">{clientToDelete.name}</span>? Esta
              ação não pode ser desfeita.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                disabled={deletingClientId === clientToDelete.id}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deletingClientId === clientToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {deletingClientId === clientToDelete.id
                  ? "Excluindo..."
                  : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
