"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Service } from "@/types/backend";
import { ServiceCard } from "@/components/dashboard/services/ServiceCard";
import { ServiceFilters } from "@/components/dashboard/services/ServiceFilters";
import { Pagination } from "@/components/ui/Pagination";
import { FiGrid, FiList, FiCalendar, FiClock } from "react-icons/fi";

interface EmployeeServicesClientProps {
  initialServices: Service[];
  initialMeta: any;
}

export function EmployeeServicesClient({
  initialServices,
  initialMeta,
}: EmployeeServicesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleView = (service: Service) => {
    router.push(`/dashboard/employee/services/${service.id}`);
  };

  const handleSchedule = (service: Service) => {
    router.push(
      `/dashboard/employee/appointments/create?serviceId=${service.id}`
    );
  };

  // Estatísticas rápidas para employee
  const totalServices = initialServices.length;
  const averagePrice =
    totalServices > 0
      ? initialServices.reduce(
          (sum, service) => sum + Number(service.price),
          0
        ) / totalServices
      : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas Simples para Employee */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Serviços Disponíveis
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalServices}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <FiClock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Preço Médio</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(averagePrice)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100">
              <FiCalendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Agendamentos Hoje
              </p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Visualização */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <ServiceFilters showAdvancedFilters={false} />

        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FiGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FiList className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lista de Serviços */}
      {initialServices.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiCalendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum serviço disponível
          </h3>
          <p className="text-gray-600">
            Entre em contato com o administrador para ativar serviços
          </p>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {initialServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                role="EMPLOYEE"
                onView={handleView}
              />
            ))}
          </div>

          {/* Paginação */}
          {initialMeta.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={initialMeta.page}
                totalItems={initialMeta.totalItems}
                itemsPerPage={initialMeta.limit}
                onPageChange={(page) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("page", page.toString());
                  router.push(`?${params.toString()}`);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
