"use server";

import type { Service, CreateServiceRequest } from "@/types/backend";
import {
  serverGet,
  serverPost,
  serverPut,
  serverDelete,
} from "@/lib/server-api";
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

export async function getServices() {
  try {
    return await cacheUtils.getCachedData(
      "services:list",
      async () => {
        const result = await serverGet<{
          success: boolean;
          data: {
            data: Service[];
            meta: {
              page: number;
              limit: number;
              totalItems: number;
              totalPages: number;
              hasNext: boolean;
              hasPrevious: boolean;
            };
          };
          message: string;
        }>("/services");
        console.log(result);
        return (result.data as any)?.data || result.data;
      },
      CACHE_CONFIG.services
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar serviços",
    };
  }
}

export async function getService(id: string) {
  try {
    return await cacheUtils.getCachedData(
      `services:detail:${id}`,
      async () => {
        const result = await serverGet<Service>(`/services/${id}`);
        return (result.data as any)?.data || result.data;
      },
      CACHE_CONFIG.services
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar serviço",
    };
  }
}

export async function createService(data: CreateServiceRequest) {
  try {
    const result = await serverPost<Service>("/services", data);

    // Invalidar cache de serviços após criação
    await cacheUtils.invalidateByType("services");

    return {
      success: true,
      data: (result.data as any)?.data || result.data,
      message: "Serviço criado com sucesso",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao criar serviço",
    };
  }
}

export async function updateService(
  id: string,
  data: Partial<CreateServiceRequest>
) {
  try {
    const result = await serverPut<Service>(`/services/${id}`, data);

    // Invalidar cache de serviços após atualização
    await cacheUtils.invalidateByType("services");

    return {
      success: true,
      data: (result.data as any)?.data || result.data,
      message: "Serviço atualizado com sucesso",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao atualizar serviço",
    };
  }
}

export async function deleteService(id: string) {
  try {
    await serverDelete(`/services/${id}`);

    // Invalidar cache de serviços após exclusão
    await cacheUtils.invalidateByType("services");

    return {
      success: true,
      message: "Serviço excluído com sucesso",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao excluir serviço",
    };
  }
}

// Interfaces para os novos endpoints
export interface ServiceStats {
  totalServices: number;
  activeServices: number;
  inactiveServices: number;
  totalRevenue: number;
  averagePrice: number;
  mostBookedService: string;
  totalAppointments: number;
}

export interface ServiceFilters {
  search?: string;
  isActive?: boolean;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

// Novos actions expandidos
export async function getServicesByRole(
  role: string,
  filters?: ServiceFilters
) {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.search) queryParams.append("search", filters.search);
    if (filters?.isActive !== undefined)
      queryParams.append("status", filters.isActive ? "active" : "inactive");
    if (filters?.categoryId)
      queryParams.append("categoryId", filters.categoryId);
    if (filters?.minPrice)
      queryParams.append("minPrice", filters.minPrice.toString());
    if (filters?.maxPrice)
      queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters?.page) queryParams.append("page", filters.page.toString());
    if (filters?.limit) queryParams.append("limit", filters.limit.toString());

    return await cacheUtils.getCachedData(
      `services:list:${role}:${queryParams.toString()}`,
      async () => {
        const endpoint =
          role === "CLIENT"
            ? `/services/public?${queryParams}`
            : `/services?${queryParams}`;

        const result = await serverGet<{
          success: boolean;
          data: {
            data: Service[];
            meta: {
              page: number;
              limit: number;
              totalItems: number;
              totalPages: number;
              hasNext: boolean;
              hasPrevious: boolean;
            };
          };
        }>(endpoint);

        return result.data;
      },
      CACHE_CONFIG.services
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar serviços",
      data: {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          totalItems: 0,
          totalPages: 0,
          hasNext: false,
          hasPrevious: false,
        },
      },
    };
  }
}

export async function getServiceStats() {
  try {
    return await cacheUtils.getCachedData(
      "services:stats",
      async () => {
        const result = await serverGet<ServiceStats>("/services/stats");
        return result.data;
      },
      { ...CACHE_CONFIG.services, ttl: 300 } // 5 minutos
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar estatísticas",
      data: {
        totalServices: 0,
        activeServices: 0,
        inactiveServices: 0,
        totalRevenue: 0,
        averagePrice: 0,
        mostBookedService: "N/A",
        totalAppointments: 0,
      },
    };
  }
}

export async function updateServiceStatus(id: string, isActive: boolean) {
  try {
    const result = await serverPut<Service>(`/services/${id}/status`, {
      isActive,
    });

    // Invalidar cache relacionado
    await cacheUtils.invalidateByType("services");

    return {
      success: true,
      data: result.data,
      message: `Serviço ${isActive ? "ativado" : "desativado"} com sucesso`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao atualizar status do serviço",
    };
  }
}

export async function getServiceCategories() {
  try {
    return await cacheUtils.getCachedData(
      "services:categories",
      async () => {
        const result = await serverGet<
          { id: string; name: string; color?: string }[]
        >("/categories");
        return result.data;
      },
      CACHE_CONFIG.services
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar categorias",
      data: [],
    };
  }
}
