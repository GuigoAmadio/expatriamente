"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getServiceCategories } from "@/actions/services";

interface Category {
  id: string;
  name: string;
  color?: string;
}

interface ServiceFiltersProps {
  onFiltersChange?: (filters: any) => void;
  showAdvancedFilters?: boolean;
}

export function ServiceFilters({
  onFiltersChange,
  showAdvancedFilters = true,
}: ServiceFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Estados dos filtros
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || ""
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Carregar categorias
  useEffect(() => {
    const loadCategories = async () => {
      const result = await getServiceCategories();
      if (result) {
        if (Array.isArray(result)) {
          setCategories(result);
        } else if (result.success && result.data) {
          setCategories(result.data);
        }
      }
    };
    loadCategories();
  }, []);

  // Aplicar filtros
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (categoryId) params.append("categoryId", categoryId);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    router.push(`?${params.toString()}`);

    // Callback para componente pai
    onFiltersChange?.({
      search,
      status,
      categoryId,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }, [search, status, categoryId, minPrice, maxPrice, router, onFiltersChange]);

  // Limpar filtros
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    router.push(window.location.pathname);
    onFiltersChange?.({});
  };

  // Auto-aplicar quando search mudar (com debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== searchParams.get("search")) {
        applyFilters();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, searchParams, applyFilters]);

  const hasActiveFilters =
    search || status || categoryId || minPrice || maxPrice;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Busca principal */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar serviços..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {showAdvancedFilters && (
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            className={`${showFilters ? "bg-blue-50 text-blue-600" : ""}`}
          >
            <FiFilter className="w-4 h-4 mr-2" />
            Filtros
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {
                  [search, status, categoryId, minPrice, maxPrice].filter(
                    Boolean
                  ).length
                }
              </span>
            )}
          </Button>
        )}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <FiX className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Filtros avançados */}
      {showFilters && showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>

          {/* Categoria */}
          {categories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Preço mínimo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço Mínimo (€)
            </label>
            <Input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          {/* Preço máximo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço Máximo (€)
            </label>
            <Input
              type="number"
              placeholder="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          {/* Botão aplicar filtros */}
          <div className="md:col-span-2 lg:col-span-4 flex justify-end pt-2">
            <Button onClick={applyFilters} variant="primary">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
