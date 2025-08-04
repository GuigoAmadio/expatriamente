"use server";

import {
  serverGet,
  serverPost,
  serverPut,
  serverDelete,
} from "@/lib/server-api";
import type { Appointment } from "@/types/backend";
import { cacheUtils, CACHE_CONFIG } from "@/lib/cache";

export interface CreateAppointmentData {
  startTime: string;
  endTime: string;
  userId: string;
  employeeId: string;
  serviceId: string;
}

export interface UpdateAppointmentData {
  startTime?: string;
  endTime?: string;
  status?: string;
  userId?: string;
  employeeId?: string;
  serviceId?: string;
}

export interface GetAppointmentsCountParams {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export interface GetAppointmentsCountResponse {
  count: number;
}

// Obter quantidade de appointments com filtros opcionais
export async function getAppointmentsCount(
  params: GetAppointmentsCountParams = {}
): Promise<number> {
  try {
    const queryParams = new URLSearchParams();

    if (params.startDate) queryParams.append("startDate", params.startDate);
    if (params.endDate) queryParams.append("endDate", params.endDate);
    if (params.status) queryParams.append("status", params.status);

    const response = await serverGet<GetAppointmentsCountResponse>(
      `/appointments/count?${queryParams.toString()}`
    );

    if (response.success && response.data?.count !== undefined) {
      return response.data.count;
    }

    return 0;
  } catch (error) {
    console.error("Erro ao obter quantidade de appointments:", error);
    return 0;
  }
}

// Listar todos os appointments (para admin)
export async function getAllAppointments() {
  try {
    const data = await cacheUtils.getCachedData(
      "appointments:all",
      async () => {
        const result = await serverGet<{ data: Appointment[] }>(
          "/appointments"
        );
        return result.data?.data || [];
      },
      CACHE_CONFIG.appointments
    );

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error("Erro ao buscar appointments:", error);
    return {
      success: false,
      message: "Erro ao buscar agendamentos",
      data: [],
    };
  }
}

// Listar appointments por período
export async function getAppointmentsByPeriod(
  startDate: string,
  endDate: string
) {
  try {
    const data = await cacheUtils.getCachedData(
      `appointments:period:${startDate}:${endDate}`,
      async () => {
        const result = await serverGet<Appointment[]>(
          `/appointments?startDate=${startDate}&endDate=${endDate}`
        );
        return result.data || [];
      },
      CACHE_CONFIG.appointments
    );

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error("Erro ao buscar appointments por período:", error);
    return {
      success: false,
      message: "Erro ao buscar agendamentos por período",
      data: [],
    };
  }
}

// Listar appointments por employee
export async function getAppointmentsByEmployee(employeeId: string) {
  try {
    const data = await cacheUtils.getCachedData(
      `appointments:employee:${employeeId}`,
      async () => {
        const result = await serverGet<{ data: Appointment[] }>(
          `/appointments?employeeId=${employeeId}`
        );
        console.log("result", result);
        return result.data?.data || [];
      },
      CACHE_CONFIG.appointments
    );

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error("Erro ao buscar appointments por employee:", error);
    return {
      success: false,
      message: "Erro ao buscar agendamentos por psicólogo",
      data: [],
    };
  }
}

// Listar appointments por cliente
export async function getAppointmentsByClient(userId: string) {
  try {
    const data = await cacheUtils.getCachedData(
      `appointments:client:${userId}`,
      async () => {
        const result = await serverGet<Appointment[]>(
          `/appointments?userId=${userId}`
        );
        return result.data || [];
      },
      CACHE_CONFIG.appointments
    );

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error("Erro ao buscar appointments por cliente:", error);
    return {
      success: false,
      message: "Erro ao buscar agendamentos por cliente",
      data: [],
    };
  }
}

// Buscar appointment por ID
export async function getAppointment(id: string) {
  try {
    return await cacheUtils.getCachedData(
      `appointments:detail:${id}`,
      async () => {
        const result = await serverGet<Appointment>(`/appointments/${id}`);
        return result.data;
      },
      CACHE_CONFIG.appointments
    );
  } catch (error) {
    console.error("Erro ao buscar appointment:", error);
    return {
      success: false,
      message: "Erro ao buscar agendamento",
    };
  }
}

// Criar novo appointment
export async function createAppointment(data: CreateAppointmentData) {
  try {
    const result = await serverPost<Appointment>("/appointments", data);

    // Invalidar apenas cache específico em vez de todo o tipo
    await cacheUtils.invalidatePattern("appointments:today");
    await cacheUtils.invalidatePattern("appointments:period");
    await cacheUtils.invalidatePattern("dashboard:stats");

    return {
      success: true,
      data: result.data,
      message: "Agendamento criado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao criar appointment:", error);
    return {
      success: false,
      message: "Erro ao criar agendamento",
    };
  }
}

// Atualizar appointment
export async function updateAppointment(
  id: string,
  data: UpdateAppointmentData
) {
  try {
    const result = await serverPut<Appointment>(`/appointments/${id}`, data);

    // Invalidar apenas cache específico
    await cacheUtils.invalidatePattern("appointments:today");
    await cacheUtils.invalidatePattern("appointments:period");
    await cacheUtils.invalidatePattern(`appointments:detail:${id}`);
    await cacheUtils.invalidatePattern("dashboard:stats");

    return {
      success: true,
      data: result.data,
      message: "Agendamento atualizado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar appointment:", error);
    return {
      success: false,
      message: "Erro ao atualizar agendamento",
    };
  }
}

// Excluir appointment
export async function deleteAppointment(id: string) {
  try {
    await serverDelete(`/appointments/${id}`);

    // Invalidar apenas cache específico
    await cacheUtils.invalidatePattern("appointments:today");
    await cacheUtils.invalidatePattern("appointments:period");
    await cacheUtils.invalidatePattern(`appointments:detail:${id}`);
    await cacheUtils.invalidatePattern("dashboard:stats");

    return {
      success: true,
      message: "Agendamento excluído com sucesso",
    };
  } catch (error) {
    console.error("Erro ao excluir appointment:", error);
    return {
      success: false,
      message: "Erro ao excluir agendamento",
    };
  }
}

// Confirmar appointment
export async function confirmAppointment(id: string) {
  try {
    const result = await serverPut<Appointment>(`/appointments/${id}/status`, {
      status: "CONFIRMED",
    });

    // Invalidar apenas cache específico
    await cacheUtils.invalidatePattern("appointments:today");
    await cacheUtils.invalidatePattern(`appointments:detail:${id}`);
    await cacheUtils.invalidatePattern("dashboard:stats");

    return {
      success: true,
      data: result.data,
      message: "Agendamento confirmado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao confirmar appointment:", error);
    return {
      success: false,
      message: "Erro ao confirmar agendamento",
    };
  }
}

// Cancelar appointment
export async function cancelAppointment(id: string) {
  try {
    const result = await serverPut<Appointment>(`/appointments/${id}/status`, {
      status: "CANCELLED",
    });

    // Invalidar apenas cache específico
    await cacheUtils.invalidatePattern("appointments:today");
    await cacheUtils.invalidatePattern(`appointments:detail:${id}`);
    await cacheUtils.invalidatePattern("dashboard:stats");

    return {
      success: true,
      data: result.data,
      message: "Agendamento cancelado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao cancelar appointment:", error);
    return {
      success: false,
      message: "Erro ao cancelar agendamento",
    };
  }
}

// Buscar appointments da semana
export async function getWeekAppointments(weekStart: string) {
  try {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    return await cacheUtils.getCachedData(
      `appointments:week:${weekStart}`,
      async () => {
        const result = await serverGet<Appointment[]>(
          `/appointments?startDate=${weekStart}&endDate=${
            weekEnd.toISOString().split("T")[0]
          }`
        );
        return result.data;
      },
      CACHE_CONFIG.appointments
    );
  } catch (error) {
    console.error("Erro ao buscar appointments da semana:", error);
    return {
      success: false,
      message: "Erro ao buscar agendamentos da semana",
    };
  }
}

// Listar appointments paginados e filtrados
export async function getAppointments(params: Record<string, any> = {}) {
  try {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.status) query.append("status", params.status);
    if (params.search) query.append("search", params.search);
    if (params.startDate) query.append("startDate", params.startDate);
    if (params.endDate) query.append("endDate", params.endDate);
    if (params.employeeId) query.append("employeeId", params.employeeId);
    if (params.userId) query.append("userId", params.userId);
    if (params.clientId) query.append("clientId", params.clientId);
    if (params.categoryId) query.append("categoryId", params.categoryId);
    if (params.orderBy) query.append("orderBy", params.orderBy);
    if (params.orderDirection)
      query.append("orderDirection", params.orderDirection);
    const url =
      "/appointments" + (query.toString() ? `?${query.toString()}` : "");
    const resp = await serverGet(url);
    console.log("resp", resp);
    const metaDefaults = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    };
    return {
      data: (resp.data as any).data ?? [],
      meta: { ...metaDefaults, ...((resp.data as any)?.pagination || {}) },
    };
  } catch (error) {
    return { data: [], meta: {} };
  }
}
