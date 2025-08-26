import React from "react";
import { getServicesByRole } from "@/actions/services";
import { EmployeeServicesClient } from "./EmployeeServicesClient";

export default async function EmployeeServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const search = (resolvedSearchParams.search as string) || "";
  const categoryId = resolvedSearchParams.categoryId as string;

  const servicesResponse = await getServicesByRole("EMPLOYEE", {
    page,
    limit: 12,
    search,
    isActive: true, // Employee só vê serviços ativos
    categoryId,
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Serviços Disponíveis
        </h1>
        <p className="text-gray-600">
          Visualize e gerencie os serviços que você pode oferecer
        </p>
      </div>

      <EmployeeServicesClient
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
