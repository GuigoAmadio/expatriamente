"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Service } from "@/types/backend";
import { ServiceCard } from "@/components/dashboard/services/ServiceCard";
import { ServiceFilters } from "@/components/dashboard/services/ServiceFilters";
import { Pagination } from "@/components/ui/Pagination";
import {
  FiGrid,
  FiList,
  FiStar,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";

interface ClientServicesClientProps {
  initialServices: Service[];
  initialMeta: any;
}

export function ClientServicesClient({
  initialServices,
  initialMeta,
}: ClientServicesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleView = (service: Service) => {
    router.push(`/dashboard/client/services/${service.id}`);
  };

  const handleBook = (service: Service) => {
    router.push(
      `/dashboard/client/appointments/create?serviceId=${service.id}`
    );
  };

  // Estatísticas para exibir ao cliente
  const totalServices = initialServices.length;
  const averagePrice =
    totalServices > 0
      ? initialServices.reduce(
          (sum, service) => sum + Number(service.price),
          0
        ) / totalServices
      : 0;
  const cheapestService =
    totalServices > 0
      ? Math.min(...initialServices.map((s) => Number(s.price)))
      : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Informações Destacadas para Cliente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-white bg-opacity-20">
              <FiStar className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium opacity-90">
                Serviços Disponíveis
              </p>
              <p className="text-2xl font-bold">{totalServices}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-white bg-opacity-20">
              <FiTrendingUp className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium opacity-90">Preço Médio</p>
              <p className="text-2xl font-bold">
                {formatCurrency(averagePrice)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-white bg-opacity-20">
              <FiDollarSign className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium opacity-90">A partir de</p>
              <p className="text-2xl font-bold">
                {formatCurrency(cheapestService)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dica para Cliente */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <FiStar className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              Encontre o serviço ideal para você
            </h3>
            <p className="text-sm text-blue-700">
              Use os filtros para encontrar serviços por categoria, faixa de
              preço ou busque por palavras-chave. Clique em "Agendar" para
              marcar sua consulta.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros e Visualização */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <ServiceFilters />

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
            <FiStar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum serviço encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou remover alguns critérios de busca
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
                role="CLIENT"
                onView={handleView}
                onBook={handleBook}
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

      {/* Call to Action para Cliente */}
      {initialServices.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-center text-white mt-8">
          <h3 className="text-xl font-bold mb-2">Pronto para começar?</h3>
          <p className="mb-4 opacity-90">
            Escolha um dos nossos serviços e agende sua consulta hoje mesmo.
          </p>
          <button
            onClick={() => router.push("/dashboard/client/appointments")}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Ver Meus Agendamentos
          </button>
        </div>
      )}
    </div>
  );
}
