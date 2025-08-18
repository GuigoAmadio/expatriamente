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
