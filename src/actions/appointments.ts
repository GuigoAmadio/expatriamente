"use server";

import {
  serverGet,
  serverPost,
  serverPut,
  serverDelete,
} from "@/lib/server-api";
import type { Appointment } from "@/types/backend";
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

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
        const result = await getAppointments({ employeeId });
        return result.data || [];
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
    console.log("🆕 [createAppointment] Criando novo agendamento...");
    console.log("📋 [createAppointment] Dados:", { ...data, userId: "***" });
    const result = await serverPost<Appointment>("/appointments", data);

    // ✅ Invalidar cache de appointments
    console.log("🗑️ [createAppointment] Invalidando caches relacionados...");
    await cacheUtils.invalidateByType("appointments");
    await cacheUtils.invalidateByType("dashboard");
    console.log("✅ [createAppointment] Caches invalidados com sucesso");

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
    console.log(`🔄 [updateAppointment] Atualizando agendamento ${id}...`);
    console.log("📋 [updateAppointment] Dados:", data);
    const result = await serverPut<Appointment>(`/appointments/${id}`, data);

    // ✅ Invalidar cache de appointments
    console.log("🗑️ [updateAppointment] Invalidando caches relacionados...");
    await cacheUtils.invalidateByType("appointments");
    await cacheUtils.invalidateByType("dashboard");
    console.log("✅ [createAppointment] Caches invalidados com sucesso");

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
    console.log(`🗑️ [deleteAppointment] Deletando agendamento ${id}...`);
    await serverDelete(`/appointments/${id}`);

    // ✅ Invalidar cache de appointments
    console.log("🗑️ [deleteAppointment] Invalidando caches relacionados...");
    await cacheUtils.invalidateByType("appointments");
    await cacheUtils.invalidateByType("dashboard");
    console.log("✅ [createAppointment] Caches invalidados com sucesso");

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
  console.log("params", params);
  try {
    // Defaults: semana atual para startDate, final do ano para endDate
    const now = params.date ? new Date(params.date) : new Date();
    const wkStart = new Date(now);
    wkStart.setDate(now.getDate() - now.getDay());

    // Se não especificado endDate, buscar até o final do ano
    const currentYear = new Date().getFullYear();
    const defaultEndDate = `${currentYear}-12-31`;

    const toLocalYMD = (d: Date) =>
      `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
        .getDate()
        .toString()
        .padStart(2, "0")}`;

    const normalizedParams = {
      page: params.page ? Number(params.page) : 1,
      limit: params.limit ? Number(params.limit) : 1000,
      status: params.status,
      search: params.search,
      startDate: params.startDate || toLocalYMD(wkStart),
      endDate: params.endDate || defaultEndDate, // Final do ano por padrão
      employeeId: params.employeeId,
      userId: params.userId,
      clientId: params.clientId,
      categoryId: params.categoryId,
      orderBy: params.orderBy || "startTime",
      orderDirection: params.orderDirection || "asc",
    } as Record<string, any>;

    const query = new URLSearchParams();
    query.append("page", String(normalizedParams.page));
    query.append("limit", String(normalizedParams.limit));
    if (normalizedParams.status)
      query.append("status", normalizedParams.status);
    if (normalizedParams.search)
      query.append("search", normalizedParams.search);
    if (normalizedParams.startDate)
      query.append("startDate", normalizedParams.startDate);
    if (normalizedParams.endDate)
      query.append("endDate", normalizedParams.endDate);
    if (normalizedParams.employeeId)
      query.append("employeeId", normalizedParams.employeeId);
    if (normalizedParams.userId)
      query.append("userId", normalizedParams.userId);
    if (normalizedParams.clientId)
      query.append("clientId", normalizedParams.clientId);
    if (normalizedParams.categoryId)
      query.append("categoryId", normalizedParams.categoryId);
    if (normalizedParams.orderBy)
      query.append("orderBy", normalizedParams.orderBy);
    if (normalizedParams.orderDirection)
      query.append("orderDirection", normalizedParams.orderDirection);

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
