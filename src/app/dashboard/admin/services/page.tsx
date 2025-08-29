import React from "react";
import { getServicesByRole, getServiceStats } from "@/actions/services";
import { AdminServicesClient } from "./AdminServicesClient";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const search = (resolvedSearchParams.search as string) || "";
  const status = resolvedSearchParams.status as string;
  const categoryId = resolvedSearchParams.categoryId as string;
  const minPrice = resolvedSearchParams.minPrice
    ? Number(resolvedSearchParams.minPrice)
    : undefined;
  const maxPrice = resolvedSearchParams.maxPrice
    ? Number(resolvedSearchParams.maxPrice)
    : undefined;

  const isActive =
    status === "active" ? true : status === "inactive" ? false : undefined;

  const [servicesResponse, statsResponse] = await Promise.all([
    getServicesByRole("ADMIN", {
      page,
      limit: 12,
      search,
      isActive,
      categoryId,
      minPrice,
      maxPrice,
    }),
    getServiceStats(),
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Gerenciamento de Serviços
        </h1>
        <p className="text-gray-600">
          Gerencie todos os serviços oferecidos pela plataforma
        </p>
      </div>

      <AdminServicesClient
        initialServices={servicesResponse?.data?.data || []}
        initialMeta={
          servicesResponse?.data?.meta || {
            page: 1,
            limit: 12,
            totalItems: 0,
            totalPages: 0,
            hasNext: false,
            hasPrevious: false,
          }
        }
        initialStats={
          (statsResponse as any)?.data ||
          statsResponse || {
            totalServices: 0,
            activeServices: 0,
            inactiveServices: 0,
            totalRevenue: 0,
            averagePrice: 0,
            mostBookedService: "N/A",
            totalAppointments: 0,
          }
        }
      />
    </div>
  );
}
