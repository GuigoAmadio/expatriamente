"use client";

import { ReactNode } from "react";
import { Pagination } from "@/components/ui/Pagination";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiPause,
  FiPlay,
} from "react-icons/fi";

// Tipos genéricos para o componente
export interface DataItem {
  id: string;
  [key: string]: any;
}

// Constraint para garantir que T sempre tenha id
export type DataItemWithId<T> = T & { id: string };

export interface Column<T extends DataItem = DataItem> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
  width?: string;
}

export interface Action<T extends DataItem = DataItem> {
  key: string;
  icon: ReactNode | ((item: T) => ReactNode);
  label: string | ((item: T) => string);
  onClick: (item: T) => void;
  className?: string;
  disabled?: (item: T) => boolean;
  show?: (item: T) => boolean;
}

export interface AdminDataListProps<T extends DataItem = DataItem> {
  // Dados
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };

  // Estados
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;

  // Configuração
  title: string;
  addButtonText: string;
  searchPlaceholder: string;
  emptyMessage: string;
  loadingMessage: string;

  // Colunas da tabela
  columns: Column<T>[];

  // Ações
  actions: Action<T>[];

  // Callbacks
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onAddItem: () => void;
  onSelectItem: (item: T) => void;

  // Estados de loading para ações
  loadingStates?: {
    [key: string]: string | null;
  };

  // Configurações opcionais
  showStatusFilter?: boolean;
  statusOptions?: { value: string; label: string }[];
  mobileView?: "list" | "cards";
  showPagination?: boolean;
}

export function AdminDataList<T extends DataItem = DataItem>({
  data,
  meta,
  loading,
  error,
  searchTerm,
  statusFilter,
  title,
  addButtonText,
  searchPlaceholder,
  emptyMessage,
  loadingMessage,
  columns,
  actions,
  onSearchChange,
  onStatusFilterChange,
  onPageChange,
  onAddItem,
  onSelectItem,
  loadingStates = {},
  showStatusFilter = true,
  statusOptions = [
    { value: "", label: "Todos os status" },
    { value: "ACTIVE", label: "Ativo" },
    { value: "INACTIVE", label: "Inativo" },
  ],
  mobileView = "list",
  showPagination = true,
}: AdminDataListProps<T>) {
  // Garantir que data seja sempre um array
  const dataArray: T[] = Array.isArray(data) ? data : [];

  // Renderizar célula da tabela
  const renderCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item);
    }

    const value = (item as any)[column.key];
    if (value === null || value === undefined) {
      return "-";
    }

    return String(value);
  };

  // Renderizar ações
  const renderActions = (item: T) => {
    return actions.map((action: Action<T>) => {
      const isDisabled = action.disabled ? action.disabled(item) : false;
      const shouldShow = action.show ? action.show(item) : true;
      const isLoading = loadingStates[action.key] === item.id;

      if (!shouldShow) return null;

      return (
        <button
          key={action.key}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick(item);
          }}
          disabled={isDisabled || isLoading}
          className={`w-9 h-9 grid place-items-center rounded-lg transition-colors ${
            action.className || "text-gray-600 hover:bg-gray-50"
          } ${isDisabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          title={
            typeof action.label === "function"
              ? action.label(item)
              : action.label
          }
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : typeof action.icon === "function" ? (
            action.icon(item)
          ) : (
            action.icon
          )}
        </button>
      );
    });
  };

  // Renderizar item mobile
  const renderMobileItem = (item: T) => {
    if (mobileView === "cards") {
      return (
        <div
          key={item.id}
          onClick={() => onSelectItem(item)}
          className="bg-white rounded-2xl shadow-xl p-4 flex items-center justify-between gap-3 border border-blue-200/60 hover:shadow-2xl hover:scale-[1.02] hover:border-blue-300/80 cursor-pointer transition-all duration-300 transform active:scale-[0.98]"
        >
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {renderCell(item, columns[0])}
            </div>
            {columns[1] && (
              <div className="text-xs text-gray-600 truncate">
                {renderCell(item, columns[1])}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {renderActions(item)}
          </div>
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => onSelectItem(item)}
        className="w-full text-left px-3 py-3 hover:bg-blue-50 hover:shadow-lg hover:scale-[1.01] border border-blue-200/60 rounded-xl transition-all duration-300 bg-white transform active:scale-[0.99] cursor-pointer"
      >
        <span className="font-medium text-gray-900">
          {renderCell(item, columns[0])}
        </span>
      </button>
    );
  };

  return (
    <div className="px-4 sm:px-20 py-8 sm:py-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* Sombras de fundo azuis */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full opacity-15 blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-200 rounded-full opacity-10 blur-2xl"></div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6 relative z-10">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <div>
          <button
            onClick={onAddItem}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FiPlus className="w-5 h-5" />
            {addButtonText}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 mb-6 relative z-10 border border-blue-200/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-white"
          />
          {showStatusFilter && (
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer text-sm bg-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Feedback visual */}
      {loading && (
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg text-center text-blue-600 font-semibold relative z-10 border border-blue-200/60">
          {loadingMessage}
        </div>
      )}
      {error && (
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg text-center text-red-600 font-semibold relative z-10 border border-red-200/60">
          {error}
        </div>
      )}

      {/* Lista - Mobile */}
      <div className="sm:hidden space-y-3 relative z-10">
        {!loading && dataArray.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center text-gray-500 border border-blue-200/60">
            {emptyMessage}
          </div>
        ) : (
          dataArray.map(renderMobileItem)
        )}
      </div>

      {/* Tabela - Desktop */}
      <div className="hidden sm:block relative z-10">
        {/* Container com borda gradiente apenas nas laterais e inferior */}
        <div className="relative bg-white rounded-b-2xl overflow-hidden shadow-xl">
          {/* Bordas laterais e inferior com gradiente */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-400 to-blue-600"></div>
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-400 to-blue-600"></div>
          <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>

          <table className="w-full text-sm table-fixed relative z-10">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                {columns.map((column: Column<T>) => (
                  <th
                    key={column.key}
                    className={`px-4 sm:px-6 py-3 text-left text-[11px] font-semibold text-blue-800 uppercase tracking-wider ${
                      column.width || ""
                    } ${column.className || ""}`}
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-4 sm:px-6 py-3 text-right text-[11px] font-semibold text-blue-800 uppercase tracking-wider w-32">
                  AÇÕES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {loadingMessage}
                  </td>
                </tr>
              ) : dataArray.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                dataArray.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-blue-50 hover:shadow-md cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                    } border-b border-blue-100/20 last:border-b-0`}
                    onClick={() => onSelectItem(item)}
                  >
                    {columns.map((column: Column<T>) => (
                      <td
                        key={column.key}
                        className={`px-4 sm:px-6 py-4 whitespace-nowrap ${
                          column.className || ""
                        }`}
                      >
                        {renderCell(item, column)}
                      </td>
                    ))}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 justify-end">
                        {renderActions(item)}
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
      {showPagination && meta.total > 0 && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mt-6 relative z-10 border border-blue-200/60">
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

export default AdminDataList;
