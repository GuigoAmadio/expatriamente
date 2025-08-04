"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminEmployeesList } from "./AdminEmployeesList";
import {
  Employee,
  getEmployees,
  deleteEmployee,
  toggleEmployeeStatus,
} from "@/actions/employees";
import { useToasts, Toast } from "@/components/ui/Toast";

interface AdminEmployeesListClientProps {
  employees?: Employee[];
  meta?: any;
  loading?: boolean;
  error?: string | null;
  searchTerm?: string;
  statusFilter?: string;
}

export default function AdminEmployeesListClient({
  employees: initialEmployees = [],
  meta,
  loading: initialLoading = false,
  error: initialError = null,
  searchTerm = "",
  statusFilter = "",
}: AdminEmployeesListClientProps) {
  const router = useRouter();
  const { toasts, addToast } = useToasts();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [loading, setLoading] = useState(initialLoading);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);
  const [currentStatusFilter, setCurrentStatusFilter] = useState(statusFilter);
  const [currentPage, setCurrentPage] = useState(1);

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
      addToast({
        message: "Erro ao carregar funcionários.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Se não recebeu employees iniciais, carrega
  useEffect(() => {
    if (initialEmployees.length === 0 && !initialLoading) {
      loadEmployees();
    }
  }, [initialEmployees.length, initialLoading, loadEmployees]);

  const onAddEmployee = () => router.push("/dashboard/admin/employees/new");
  const onViewEmployee = (emp: Employee) =>
    router.push(`/dashboard/admin/employees/${emp.id}`);
  const onEditEmployee = (emp: Employee) =>
    router.push(`/dashboard/admin/employees/${emp.id}/edit`);
  const onSelectEmployee = (emp: Employee) =>
    router.push(`/dashboard/admin/employees/${emp.id}`);

  const onDeleteEmployee = (employeeId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      setDeletingId(employeeId);
      deleteEmployee(employeeId)
        .then(() => {
          addToast({
            message: "Funcionário excluído com sucesso!",
            type: "success",
          });

          // Recarregar lista
          return loadEmployees();
        })
        .catch((error: any) => {
          console.error("Erro ao excluir funcionário:", error);

          // Verificar se é erro de foreign key constraint
          if (
            error.message?.includes("agendamentos") ||
            error.message?.includes("foreign key")
          ) {
            addToast({
              message:
                "Não é possível excluir funcionário com agendamentos ativos. Desative o funcionário ao invés de excluí-lo.",
              type: "error",
            });
          } else {
            addToast({
              message: "Erro ao excluir funcionário. Tente novamente.",
              type: "error",
            });
          }
        })
        .finally(() => {
          setDeletingId(null);
        });
    }
  };

  const onToggleEmployeeStatus = (employee: Employee) => {
    const action = employee.isActive ? "desativar" : "ativar";
    if (window.confirm(`Tem certeza que deseja ${action} este funcionário?`)) {
      toggleEmployeeStatus(employee.id, !employee.isActive)
        .then(() => {
          addToast({
            message: `Funcionário ${
              action === "desativar" ? "desativado" : "ativado"
            } com sucesso!`,
            type: "success",
          });

          // Recarregar lista
          return loadEmployees();
        })
        .catch((error: any) => {
          console.error(`Erro ao ${action} funcionário:`, error);
          addToast({
            message: `Erro ao ${action} funcionário. Tente novamente.`,
            type: "error",
          });
        });
    }
  };

  const handleSearchChange = (value: string) => {
    setCurrentSearchTerm(value);
    // Implementar lógica de busca se necessário
  };

  const handleStatusFilterChange = (value: string) => {
    setCurrentStatusFilter(value);
    // Implementar lógica de filtro se necessário
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Implementar lógica de paginação se necessário
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (initialError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">
            Erro ao carregar funcionários
          </h3>
          <p className="text-red-600 mt-1">{initialError}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminEmployeesList
        employees={employees}
        meta={
          meta || {
            page: currentPage,
            limit: 10,
            total: employees.length,
            totalPages: 1,
            hasNext: false,
            hasPrevious: false,
          }
        }
        loading={loading}
        error={initialError}
        searchTerm={currentSearchTerm}
        statusFilter={currentStatusFilter}
        onSearchChange={handleSearchChange}
        onStatusFilterChange={handleStatusFilterChange}
        onPageChange={handlePageChange}
        onAddEmployee={onAddEmployee}
        onViewEmployee={onViewEmployee}
        onEditEmployee={onEditEmployee}
        onDeleteEmployee={onDeleteEmployee}
        onToggleEmployeeStatus={onToggleEmployeeStatus}
        onSelectEmployee={onSelectEmployee}
        deletingId={deletingId || undefined}
        confirmDeleteId={confirmDeleteId || undefined}
      />
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  );
}
