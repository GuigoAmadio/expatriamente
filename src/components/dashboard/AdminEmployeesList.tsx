"use client";
import { Employee } from "@/types/backend";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Pagination } from "@/components/ui/Pagination";
import { useMemo, useCallback } from "react";
import { FixedSizeList as List } from "react-window";

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
  deletingId,
  confirmDeleteId,
  onSelectEmployee,
}: AdminEmployeesListProps) {
  // Dados para o gráfico de evolução de funcionários ativos por mês
  const activeByMonth = employees.reduce((acc, emp) => {
    if (!emp.createdAt) return acc;
    const date = new Date(emp.createdAt);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    if (!acc[month]) acc[month] = { total: 0, active: 0 };
    acc[month].total += 1;
    if (emp.isActive) acc[month].active += 1;
    return acc;
  }, {} as Record<string, { total: number; active: number }>);
  const lineChartData = Object.entries(activeByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, { total, active }]) => ({
      month,
      total,
      active,
    }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Funcionários</h1>
        {/* Botão de adicionar funcionário será implementado depois */}
      </div>
      {/* Gráfico de evolução de funcionários ativos */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-bold mb-2">
          Evolução de Funcionários Ativos
        </h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#22c55e"
                name="Ativos"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                name="Total"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="border rounded px-3 py-2"
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
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Nenhum funcionário encontrado.
                </td>
              </tr>
            ) : (
              <List
                height={400}
                itemCount={employees.length}
                itemSize={56}
                width="100%"
                style={{ minWidth: "100%" }}
              >
                {({ index, style }) => {
                  const employee = employees[index];
                  return (
                    <tr
                      key={employee.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => onSelectEmployee(employee)}
                      style={style}
                    >
                      {/* Renderize as células da linha conforme já está no seu código */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.isActive ? "Ativo" : "Inativo"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditEmployee(employee);
                          }}
                          className="text-blue-600 hover:underline mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteEmployee(employee.id);
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                }}
              </List>
            )}
          </tbody>
        </table>
      </div>
      {/* Paginação */}
      {meta.total > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <Pagination
            totalItems={meta.total}
            itemsPerPage={meta.limit}
            currentPage={meta.page}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
