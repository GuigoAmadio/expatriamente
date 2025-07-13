"use server";

import type { Service, CreateServiceRequest } from "@/types/backend";
import {
  serverGet,
  serverPost,
  serverPut,
  serverDelete,
} from "@/lib/server-api";

export async function getServices() {
  try {
    const result = await serverGet<Service[]>("/services");
    return {
      success: true,
      data: (result.data as any)?.data || result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar serviços",
    };
  }
}

export async function getService(id: string) {
  try {
    const result = await serverGet<Service>(`/services/${id}`);
    return {
      success: true,
      data: (result.data as any)?.data || result.data,
    };
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
