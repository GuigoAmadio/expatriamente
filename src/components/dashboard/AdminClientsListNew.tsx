"use client";

import { Client } from "@/types/backend";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import AdminDataList, { Column, Action } from "./AdminDataList";

interface AdminClientsListNewProps {
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
  onEditClient: (client: Client) => Promise<boolean>;
  onClientDeleted: (id: string) => Promise<boolean>;
}

export default function AdminClientsListNew({
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
}: AdminClientsListNewProps) {
  // Função para obter iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  // Função para copiar email
  const copyEmailToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      // Aqui você pode adicionar um toast de sucesso se quiser
      console.log("Email copiado:", email);
    } catch (err) {
      console.error("Erro ao copiar email:", err);
    }
  };

  // Configuração das colunas
  const columns: Column<Client>[] = [
    {
      key: "name",
      label: "CLIENTE",
      className: "font-medium text-gray-900",
      width: "w-60",
      render: (client: Client) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-800">
                {getInitials(client.name)}
              </span>
            </div>
          </div>
          <div className="ml-4 min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900 truncate">
              {client.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "EMAIL",
      className: "text-gray-500",
      width: "w-1/2",
      render: (client: Client) => (
        <div
          className="truncate cursor-pointer hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
          title={`Clique para copiar: ${client.email}`}
          onClick={(e) => {
            e.stopPropagation();
            copyEmailToClipboard(client.email);
          }}
        >
          {client.email}
        </div>
      ),
    },
    {
      key: "status",
      label: "STATUS",
      className: "",
      width: "w-1/4",
      render: (client: Client) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            client.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {client.status === "ACTIVE" ? "Ativo" : "Inativo"}
        </span>
      ),
    },
  ];

  // Configuração das ações
  const actions: Action<Client>[] = [
    {
      key: "view",
      icon: <FiEye size={18} />,
      label: "Visualizar",
      onClick: (client: Client) => {
        window.location.href = `/dashboard/admin/clients/${client.id}`;
      },
      className: "text-blue-600 hover:bg-blue-50",
    },
    {
      key: "edit",
      icon: <FiEdit size={18} />,
      label: "Editar",
      onClick: (client: Client) => {
        window.location.href = `/dashboard/admin/clients/${client.id}/edit`;
      },
      className: "text-green-600 hSover:bg-green-50",
    },
    {
      key: "delete",
      icon: <FiTrash2 size={18} />,
      label: "Excluir",
      onClick: (client: Client) => {
        if (
          confirm(`Tem certeza que deseja excluir o cliente ${client.name}?`)
        ) {
          console.log("Excluindo cliente:", client.id);
          onClientDeleted(client.id).then((result) => {
            if (result) {
              alert("Cliente excluído com sucesso");
              window.location.reload();
            } else {
              alert("Cliente não excluído");
            }
          });
        } else {
          alert("Cliente não excluído");
        }
      },
      className: "text-red-600 hover:bg-red-50",
    },
  ];

  // Opções de status personalizadas
  const statusOptions = [
    { value: "all", label: "Todos os status" },
    { value: "ACTIVE", label: "Ativo" },
    { value: "INACTIVE", label: "Inativo" },
  ];

  return (
    <AdminDataList
      data={clients}
      meta={{
        ...meta,
        total: meta.totalItems, // Ajustar para o formato esperado
      }}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      title="Clientes"
      addButtonText="Novo Cliente"
      searchPlaceholder="Buscar clientes..."
      emptyMessage="Nenhum cliente encontrado"
      loadingMessage="Carregando..."
      columns={columns}
      actions={actions}
      onSearchChange={onSearchChange}
      onStatusFilterChange={onStatusFilterChange}
      onPageChange={onPageChange}
      onAddItem={() => {
        // Aqui você pode implementar a navegação para adicionar cliente
        console.log("Add new client");
      }}
      onSelectItem={onSelectClient}
      statusOptions={statusOptions}
      mobileView="list"
    />
  );
}
