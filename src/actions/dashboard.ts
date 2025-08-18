"use server";

import type { DashboardStats } from "@/types";
import { serverGet } from "@/lib/server-api";
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

interface ProductStatsResponse {
  totalProducts: number;
  totalSoldValue: number;
  totalSoldQuantity: number;
  lowStockCount: number;
  outOfStockCount: number;
  averagePrice: number;
  monthlyRevenue: number;
}

interface AppointmentStatsResponse {
  today: {
    count: number;
    revenue: number;
  };
  month: {
    count: number;
    revenue: number;
  };
  overall: {
    totalCompleted: number;
    averageDuration: number;
  };
}

interface TopSellingProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantitySold: number;
  totalRevenue: number;
}

interface TodayAppointment {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  service: {
    name: string;
    price: number;
  };
  user: {
    name: string;
    email: string;
  };
}

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  service: {
    name: string;
    price: number;
  };
  user: {
    name: string;
    email: string;
  };
  employee?: {
    name: string;
    email: string;
  };
}

export async function getDashboardStats(startDate?: string, endDate?: string) {
  try {
    console.log("🚀 [Frontend] Iniciando getDashboardStats()", {
      startDate,
      endDate,
    });
    const query =
      startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : "";
    return await cacheUtils.getCachedData(
      `dashboard:stats:${startDate || "default"}:${endDate || "default"}`,
      async () => {
        const dashboardResult = await serverGet<any>(
          `/dashboard/stats${query}`
        );
        console.log("📥 [Frontend] Resposta recebida do backend:");
        console.log("Dashboard data:", dashboardResult);
        return (dashboardResult.data as any)?.data || dashboardResult.data;
      },
      CACHE_CONFIG.dashboard
    );
  } catch (error: any) {
    console.error("❌ [Frontend] Erro ao carregar estatísticas:", error);
    return {
      success: false,
      message: error.message || "Erro ao carregar estatísticas do dashboard",
      data: undefined,
    };
  }
}

export async function getProductStats() {
  try {
    return await cacheUtils.getCachedData(
      "dashboard:product-stats",
      async () => {
        const result = await serverGet<ProductStatsResponse>("/products/stats");
        return (result.data as any)?.data || result.data;
      },
      CACHE_CONFIG.dashboard
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar estatísticas de produtos",
    };
  }
}

export async function getTopSellingProducts(limit: number = 5) {
  try {
    return await cacheUtils.getCachedData(
      `dashboard:top-selling-products:${limit}`,
      async () => {
        const result = await serverGet<TopSellingProduct[]>(
          `/products/top-selling?limit=${limit}`
        );
        return (result.data as any)?.data || result.data;
      },
      CACHE_CONFIG.dashboard
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar produtos mais vendidos",
    };
  }
}

export async function getAppointmentStats() {
  try {
    return await cacheUtils.getCachedData(
      "dashboard:appointment-stats",
      async () => {
        const result = await serverGet<AppointmentStatsResponse>(
          "/appointments/stats"
        );
        return (result.data as any)?.data || result.data;
      },
      CACHE_CONFIG.appointments
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar estatísticas de agendamentos",
    };
  }
}

export async function getTodayAppointments() {
  try {
    return await cacheUtils.getCachedData(
      "appointments:today",
      async () => {
        const result = await serverGet<TodayAppointment[]>(
          "/appointments/today"
        );
        return (result.data as any)?.data || result.data;
      },
      CACHE_CONFIG.appointments
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar agendamentos de hoje",
    };
  }
}

export async function getAppointments(params?: {
  employeeId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}) {
  try {
    const queryParams = new URLSearchParams();

    if (params?.employeeId) {
      queryParams.append("employeeId", params.employeeId);
    }

    if (params?.userId) {
      queryParams.append("userId", params.userId);
    }

    if (params?.startDate) {
      queryParams.append("startDate", params.startDate);
    }

    if (params?.endDate) {
      queryParams.append("endDate", params.endDate);
    }

    if (params?.status) {
      queryParams.append("status", params.status);
    }

    const url = `/appointments${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    return await cacheUtils.getCachedData(
      `appointments:list:${url}`,
      async () => {
        const result = await serverGet<Appointment[]>(url);
        return (result.data as any)?.data || result.data;
      },
      CACHE_CONFIG.appointments
    );
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar agendamentos",
    };
  }
}

// Função para invalidar cache do dashboard
export async function invalidateDashboardCache() {
  await cacheUtils.invalidateByType("dashboard");
}

// Função para invalidar cache de agendamentos
export async function invalidateAppointmentsCache() {
  await cacheUtils.invalidateByType("appointments");
}
