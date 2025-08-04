"use client";
import { Employee } from "@/types/backend";
import { Pagination } from "@/components/ui/Pagination";
import { useMemo, useCallback } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiPause,
  FiPlay,
} from "react-icons/fi";

interface AdminEmployeesListProps {
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

export function AdminEmployeesList({
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
}: AdminEmployeesListProps) {
  // Garantir que employees seja sempre um array
  const employeesArray = Array.isArray(employees) ? employees : [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Funcionários</h1>
        <button
          onClick={onAddEmployee}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          Adicionar Funcionário
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            <option value="">Todos os status</option>
            <option value="ACTIVE">Ativo</option>
            <option value="INACTIVE">Inativo</option>
          </select>
        </div>
      </div>

      {/* Feedback visual */}
      {loading && (
        <div className="bg-white p-4 rounded-lg shadow text-center text-blue-600 font-semibold">
          Carregando funcionários...
        </div>
      )}
      {error && (
        <div className="bg-white p-4 rounded-lg shadow text-center text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* Lista de funcionários */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NOME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CARGO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AÇÕES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeesArray.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum funcionário encontrado.
                  </td>
                </tr>
              ) : (
                employeesArray.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onSelectEmployee(employee)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.position || "Não definido"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          employee.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewEmployee(employee);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded cursor-pointer"
                          title="Visualizar"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditEmployee(employee);
                          }}
                          className="text-green-600 hover:text-green-900 p-1 rounded cursor-pointer"
                          title="Editar"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleEmployeeStatus(employee);
                          }}
                          className={`p-1 rounded cursor-pointer ${
                            employee.isActive
                              ? "text-orange-600 hover:text-orange-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                          title={employee.isActive ? "Desativar" : "Ativar"}
                        >
                          {employee.isActive ? (
                            <FiPause className="w-4 h-4" />
                          ) : (
                            <FiPlay className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteEmployee(employee.id);
                          }}
                          className="text-red-600 hover:text-red-900 p-1 rounded cursor-pointer"
                          title="Excluir"
                          disabled={deletingId === employee.id}
                        >
                          <FiTrash2 className="w-4 h-4" />
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
      {meta.total > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando {(meta.page - 1) * meta.limit + 1} a{" "}
              {Math.min(meta.page * meta.limit, meta.total)} de {meta.total}{" "}
              itens
            </div>
            <Pagination
              totalItems={meta.total}
              itemsPerPage={meta.limit}
              currentPage={meta.page}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEmployeesList;
