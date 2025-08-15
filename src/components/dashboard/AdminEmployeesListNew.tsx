"use client";

import { Employee } from "@/types/backend";
import { FiEye, FiEdit, FiTrash2, FiPause, FiPlay } from "react-icons/fi";
import AdminDataList, { Column, Action } from "./AdminDataList";

interface AdminEmployeesListNewProps {
  employees: Employee[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onEditEmployee: (emp: Employee) => void;
  onDeleteEmployee: (id: string) => void;
  onAddEmployee: () => void;
  onViewEmployee: (emp: Employee) => void;
  onToggleEmployeeStatus: (emp: Employee) => void;
  deletingId?: string;
  confirmDeleteId?: string;
  onSelectEmployee: (emp: Employee) => void;
}

export function AdminEmployeesListNew({
  employees,
  meta,
  loading,
  error,
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onPageChange,
  onEditEmployee,
  onDeleteEmployee,
  onAddEmployee,
  onViewEmployee,
  onToggleEmployeeStatus,
  deletingId,
  confirmDeleteId,
  onSelectEmployee,
}: AdminEmployeesListNewProps) {
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
  const columns: Column<Employee>[] = [
    {
      key: "name",
      label: "NOME",
      className: "font-medium text-gray-900 max-w-44",
    },
    {
      key: "email",
      label: "EMAIL",
      className: "text-gray-500 max-w-1/3",
      render: (employee: Employee) => (
        <div
          className="truncate cursor-pointer hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
          title={`Clique para copiar: ${employee.email}`}
          onClick={async (e) => {
            e.stopPropagation();
            await copyEmailToClipboard(employee.email);
            if (typeof window !== "undefined" && "CustomEvent" in window) {
              // Dispara um evento customizado para mostrar um toast global, se existir
              window.dispatchEvent(
                new CustomEvent("show-toast", {
                  detail: {
                    message: "Email copiado para a área de transferência!",
                    type: "success",
                  },
                })
              );
            } else {
              // Fallback: alerta simples
              alert("Email copiado para a área de transferência!");
            }
          }}
        >
          {employee.email}
        </div>
      ),
    },
    {
      key: "isActive",
      label: "STATUS",
      className: "w-28",
      render: (employee: Employee) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            employee.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {employee.isActive ? "Ativo" : "Inativo"}
        </span>
      ),
    },
  ];

  // Configuração das ações
  const actions: Action<Employee>[] = [
    {
      key: "view",
      icon: <FiEye size={18} />,
      label: "Visualizar",
      onClick: (employee: Employee) => onViewEmployee(employee),
      className: "text-blue-600 hover:bg-blue-50",
    },
    {
      key: "edit",
      icon: <FiEdit size={18} />,
      label: "Editar",
      onClick: (employee: Employee) => onEditEmployee(employee),
      className: "text-green-600 hover:bg-green-50",
    },
    {
      key: "toggle",
      icon: (employee: Employee) =>
        employee.isActive ? <FiPause size={18} /> : <FiPlay size={18} />,
      label: (employee: Employee) =>
        employee.isActive ? "Desativar" : "Ativar",
      onClick: (employee: Employee) => onToggleEmployeeStatus(employee),
      className: "text-orange-600 hover:bg-orange-50",
      show: () => true, // Sempre mostrar
    },
    {
      key: "delete",
      icon: <FiTrash2 size={18} />,
      label: "Excluir",
      onClick: (employee: Employee) => onDeleteEmployee(employee.id),
      className: "text-red-600 hover:bg-red-50",
      disabled: (employee: Employee) => deletingId === employee.id,
    },
  ];

  // Estados de loading
  const loadingStates = {
    delete: deletingId || null,
  };

  // Opções de status personalizadas
  const statusOptions = [
    { value: "", label: "Todos os status" },
    { value: "true", label: "Ativo" },
    { value: "false", label: "Inativo" },
  ];

  return (
    <AdminDataList
      data={employees}
      meta={meta}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      title="Funcionários"
      addButtonText="Adicionar Funcionário"
      searchPlaceholder="Buscar por nome ou email..."
      emptyMessage="Nenhum funcionário encontrado."
      loadingMessage="Carregando funcionários..."
      columns={columns}
      actions={actions}
      onSearchChange={onSearchChange}
      onStatusFilterChange={onStatusFilterChange}
      onPageChange={onPageChange}
      onAddItem={onAddEmployee}
      onSelectItem={onSelectEmployee}
      loadingStates={loadingStates}
      statusOptions={statusOptions}
      mobileView="list"
    />
  );
}

export default AdminEmployeesListNew;
