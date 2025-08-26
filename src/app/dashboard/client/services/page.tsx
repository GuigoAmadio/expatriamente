import React from "react";
import { getServicesByRole } from "@/actions/services";
import { ClientServicesClient } from "./ClientServicesClient";

export default async function ClientServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const search = (resolvedSearchParams.search as string) || "";
  const categoryId = resolvedSearchParams.categoryId as string;
  const minPrice = resolvedSearchParams.minPrice
    ? Number(resolvedSearchParams.minPrice)
    : undefined;
  const maxPrice = resolvedSearchParams.maxPrice
    ? Number(resolvedSearchParams.maxPrice)
    : undefined;

  const servicesResponse = await getServicesByRole("CLIENT", {
    page,
    limit: 12,
    search,
    isActive: true, // Client só vê serviços ativos
    categoryId,
    minPrice,
    maxPrice,
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Catálogo de Serviços
        </h1>
        <p className="text-gray-600">
          Explore nossos serviços disponíveis e agende sua consulta
        </p>
      </div>

      <ClientServicesClient
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
      />
    </div>
  );
}
