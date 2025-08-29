"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Service } from "@/types/backend";
import { ServiceStats } from "@/components/dashboard/services/ServiceStats";
import { ServiceCard } from "@/components/dashboard/services/ServiceCard";
import { ServiceFilters } from "@/components/dashboard/services/ServiceFilters";
import Button from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { Loading } from "@/components/ui/Loading";
import { updateServiceStatus, deleteService } from "@/actions/services";
import { FiPlus, FiGrid, FiList } from "react-icons/fi";
import { ServiceStats as ServiceStatsType } from "@/actions/services";

interface AdminServicesClientProps {
  initialServices: Service[];
  initialMeta: any;
  initialStats: ServiceStatsType;
}

export function AdminServicesClient({
  initialServices,
  initialMeta,
  initialStats,
}: AdminServicesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [services, setServices] = useState(initialServices);

  const handleEdit = (service: Service) => {
    router.push(`/dashboard/admin/services/${service.id}/edit`);
  };

  const handleCreate = () => {
    router.push("/dashboard/admin/services/create");
  };

  const handleView = (service: Service) => {
    router.push(`/dashboard/admin/services/${service.id}`);
  };

  const handleToggleStatus = async (service: Service) => {
    startTransition(async () => {
      try {
        const result = await updateServiceStatus(service.id, !service.isActive);

        if (result.success) {
          setServices((prev) =>
            prev.map((s) =>
              s.id === service.id ? { ...s, isActive: !s.isActive } : s
            )
          );

          // Mostrar notificação de sucesso (implementar toast)
          console.log(result.message);
        } else {
          // Mostrar notificação de erro
          console.error(result.message);
        }
      } catch (error) {
        console.error("Erro ao atualizar status do serviço", error);
      }
    });
  };

  const handleDelete = async (service: Service) => {
    if (
      !confirm(`Tem certeza que deseja excluir o serviço "${service.name}"?`)
    ) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteService(service.id);

        if (result.success) {
          setServices((prev) => prev.filter((s) => s.id !== service.id));
          console.log(result.message);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Erro ao excluir serviço", error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <ServiceStats stats={initialStats} />

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <ServiceFilters />

        <div className="flex items-center gap-3">
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

          <Button onClick={handleCreate} variant="primary">
            <FiPlus className="w-4 h-4 mr-2" />
            Novo Serviço
          </Button>
        </div>
      </div>

      {/* Loading */}
      {isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <Loading type="spinner" />
        </div>
      )}

      {/* Lista de Serviços */}
      {services.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiPlus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum serviço encontrado
          </h3>
          <p className="text-gray-600 mb-4">
            Comece criando seu primeiro serviço
          </p>
          <Button onClick={handleCreate} variant="primary">
            <FiPlus className="w-4 h-4 mr-2" />
            Criar Serviço
          </Button>
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
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                role="ADMIN"
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onToggleStatus={handleToggleStatus}
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
