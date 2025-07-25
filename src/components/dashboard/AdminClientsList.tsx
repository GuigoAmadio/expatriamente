"use client";
import { BackendUser } from "@/types/backend";
import { Pagination } from "@/components/ui/Pagination";
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
import { useMemo, useCallback } from "react";
import { FixedSizeList as List } from "react-window";

interface AdminClientsListProps {
  clients: BackendUser[];
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
  roleFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onAddClient: () => void;
  onEditClient: (client: BackendUser) => void;
  onDeleteClient: (id: string) => void;
  deletingId?: string;
  confirmDeleteId?: string;
  onSelectClient: (client: BackendUser) => void;
}

export function AdminClientsList({
  clients,
  meta,
  loading,
  error,
  searchTerm,
  statusFilter,
  roleFilter,
  onSearchChange,
  onStatusFilterChange,
  onRoleFilterChange,
  onPageChange,
  onAddClient,
  onEditClient,
  onDeleteClient,
  deletingId,
  confirmDeleteId,
  onSelectClient,
}: AdminClientsListProps) {
  // Memoizar dados do gráfico
  const registrationsByMonth = useMemo(() => {
    return clients.reduce((acc, client) => {
      if (!client.createdAt) return acc;
      const date = new Date(client.createdAt);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [clients]);

  const lineChartData = useMemo(() => {
    return Object.entries(registrationsByMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({
        month,
        total,
      }));
  }, [registrationsByMonth]);

  // Memoizar contagem de status
  const totalActive = useMemo(
    () => clients.filter((c) => c.status === "ACTIVE").length,
    [clients]
  );
  const totalSuspended = useMemo(
    () => clients.filter((c) => c.status === "SUSPENDED").length,
    [clients]
  );
  const totalInactive = useMemo(
    () => clients.filter((c) => c.status === "INACTIVE").length,
    [clients]
  );

  // Memoizar funções de callback
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const handleStatusFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onStatusFilterChange(e.target.value);
    },
    [onStatusFilterChange]
  );

  const handleRoleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onRoleFilterChange(e.target.value);
    },
    [onRoleFilterChange]
  );

  return (
    <div className="space-y-6">
      {/* Filtros e Busca */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nome ou email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtro de Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
              <option value="SUSPENDED">Suspenso</option>
            </select>
          </div>

          {/* Filtro de Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={roleFilter}
              onChange={handleRoleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="CLIENT">Cliente</option>
              <option value="EMPLOYEE">Funcionário</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Botão Adicionar */}
          <div className="flex items-end">
            <button
              onClick={onAddClient}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              + Adicionar Cliente
            </button>
          </div>
        </div>
      </div>

      {/* Feedback visual */}
      {loading && (
        <div className="bg-white p-4 rounded-lg shadow text-center text-blue-600 font-semibold">
          Carregando clientes...
        </div>
      )}
      {error && (
        <div className="bg-white p-4 rounded-lg shadow text-center text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* Estatísticas */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{meta.total}</div>
            <div className="text-sm text-gray-600">Total de Clientes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {totalActive}
            </div>
            <div className="text-sm text-gray-600">Ativos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {totalSuspended}
            </div>
            <div className="text-sm text-gray-600">Suspensos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {totalInactive}
            </div>
            <div className="text-sm text-gray-600">Inativos</div>
          </div>
        </div>
      </div>

      {/* Gráfico de evolução de cadastros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-bold mb-2">Evolução de Cadastros</h3>
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
                dataKey="total"
                stroke="#2563eb"
                name="Cadastros"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de Clientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!loading && clients.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                <List
                  height={400}
                  itemCount={clients.length}
                  itemSize={56}
                  width="100%"
                  style={{ minWidth: "100%" }}
                >
                  {({ index, style }) => {
                    const client = clients[index];
                    return (
                      <tr
                        key={client.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => onSelectClient(client)}
                        style={style}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {client.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {client.name || "Sem nome"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {client.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              client.role === "ADMIN"
                                ? "bg-purple-100 text-purple-800"
                                : client.role === "EMPLOYEE"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {client.role === "ADMIN"
                              ? "Admin"
                              : client.role === "EMPLOYEE"
                              ? "Funcionário"
                              : "Cliente"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              client.status === "ACTIVE"
                                ? "bg-green-100 text-green-800"
                                : client.status === "SUSPENDED"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {client.status === "ACTIVE"
                              ? "Ativo"
                              : client.status === "SUSPENDED"
                              ? "Suspenso"
                              : "Inativo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {client.createdAt
                              ? new Date(client.createdAt).toLocaleDateString()
                              : "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditClient(client);
                            }}
                            className="text-blue-600 hover:underline mr-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteClient(client.id);
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
