"use server";

import { serverGet } from "@/lib/server-api";
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

// ✅ Dashboard Stats
export async function prefetchDashboardStats() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchDashboardStats()"
    );
    return await cacheUtils.getCachedData(
      "dashboard:stats",
      async () => {
        const result = await serverGet("/dashboard/stats");
        console.log("✅ [Prefetch Server Action] Dashboard stats carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.dashboard
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchDashboardStats:",
      error
    );
    throw error;
  }
}

// ✅ Current Profile
export async function prefetchCurrentProfile() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchCurrentProfile()"
    );
    return await cacheUtils.getCachedData(
      "profile:current",
      async () => {
        const result = await serverGet("/auth/profile");
        console.log("✅ [Prefetch Server Action] Profile carregado:", result);
        return result.data;
      },
      CACHE_CONFIG.profile
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchCurrentProfile:",
      error
    );
    throw error;
  }
}

// ✅ Today Appointments
export async function prefetchTodayAppointments() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchTodayAppointments()"
    );
    return await cacheUtils.getCachedData(
      "appointments:today",
      async () => {
        const result = await serverGet("/appointments/today");
        console.log(
          "✅ [Prefetch Server Action] Appointments today carregados:",
          result
        );
        return result.data;
      },
      CACHE_CONFIG.appointments
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchTodayAppointments:",
      error
    );
    throw error;
  }
}

// ✅ My Appointments
export async function prefetchMyAppointments() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchMyAppointments()"
    );
    return await cacheUtils.getCachedData(
      "appointments:my",
      async () => {
        const result = await serverGet("/appointments/my");
        console.log("✅ [Prefetch Server Action] My appointments carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.appointments
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchMyAppointments:",
      error
    );
    throw error;
  }
}

// ✅ Employees
export async function prefetchEmployees() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando prefetchEmployees()");
    return await cacheUtils.getCachedData(
      "employees:list",
      async () => {
        const result = await serverGet("/employees");
        console.log("✅ [Prefetch Server Action] Employees carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.employees
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchEmployees:",
      error
    );
    throw error;
  }
}

// ✅ My Clients
export async function prefetchMyClients() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando prefetchMyClients()");
    return await cacheUtils.getCachedData(
      "clients:my",
      async () => {
        const result = await serverGet("/clients/my");
        console.log("✅ [Prefetch Server Action] My clients carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.clients
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchMyClients:",
      error
    );
    throw error;
  }
}

// ✅ All Clients
export async function prefetchAllClients() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando prefetchAllClients()");
    return await cacheUtils.getCachedData(
      "clients:all",
      async () => {
        const result = await serverGet("/clients");
        console.log("✅ [Prefetch Server Action] All clients carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.clients
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchAllClients:",
      error
    );
    throw error;
  }
}

// ✅ Available Services
export async function prefetchAvailableServices() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchAvailableServices()"
    );
    return await cacheUtils.getCachedData(
      "services:available",
      async () => {
        const result = await serverGet("/services/public");
        console.log(
          "✅ [Prefetch Server Action] Available services carregados:",
          result
        );
        return result.data;
      },
      CACHE_CONFIG.services
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchAvailableServices:",
      error
    );
    throw error;
  }
}

// ✅ All Services
export async function prefetchAllServices() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando prefetchAllServices()");
    return await cacheUtils.getCachedData(
      "services:all",
      async () => {
        const result = await serverGet("/services");
        console.log("✅ [Prefetch Server Action] All services carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.services
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchAllServices:",
      error
    );
    throw error;
  }
}

// ✅ App Settings
export async function prefetchAppSettings() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando prefetchAppSettings()");
    return await cacheUtils.getCachedData(
      "settings:app",
      async () => {
        const result = await serverGet("/settings/app");
        console.log("✅ [Prefetch Server Action] App settings carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.settings
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchAppSettings:",
      error
    );
    throw error;
  }
}

// ✅ Monthly Analytics
export async function prefetchMonthlyAnalytics() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchMonthlyAnalytics()"
    );
    return await cacheUtils.getCachedData(
      "analytics:monthly",
      async () => {
        const result = await serverGet("/analytics/monthly");
        console.log("✅ [Prefetch Server Action] Monthly analytics carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.analytics
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchMonthlyAnalytics:",
      error
    );
    throw error;
  }
}

// ✅ Personal Analytics
export async function prefetchPersonalAnalytics() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchPersonalAnalytics()"
    );
    return await cacheUtils.getCachedData(
      "analytics:personal",
      async () => {
        const result = await serverGet("/analytics/personal");
        console.log(
          "✅ [Prefetch Server Action] Personal analytics carregados:",
          result
        );
        return result.data;
      },
      CACHE_CONFIG.analytics
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchPersonalAnalytics:",
      error
    );
    throw error;
  }
}

// ✅ Available Employees
export async function prefetchAvailableEmployees() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchAvailableEmployees()"
    );
    return await cacheUtils.getCachedData(
      "employees:available",
      async () => {
        const result = await serverGet("/employees/available");
        console.log(
            "✅ [Prefetch Server Action] Available employees carregados:",
          result
        );
        return result.data;
      },
      CACHE_CONFIG.employees
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchAvailableEmployees:",
      error
    );
    throw error;
  }
}

// ✅ Detailed Analytics
export async function prefetchDetailedAnalytics() {
  try {
    console.log(
      "🚀 [Prefetch Server Action] Iniciando prefetchDetailedAnalytics()"
    );
    return await cacheUtils.getCachedData(
      "analytics:detailed",
      async () => {
        const result = await serverGet("/analytics/detailed");
        console.log(
          "✅ [Prefetch Server Action] Detailed analytics carregados:",
          result
        );
        return result.data;
      },
      CACHE_CONFIG.analytics
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchDetailedAnalytics:",
      error
    );
    throw error;
  }
}

// ✅ System Health
export async function prefetchSystemHealth() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando prefetchSystemHealth()");
    return await cacheUtils.getCachedData(
      "system:health",
      async () => {
        const result = await serverGet("/system/health");
        console.log("✅ [Prefetch Server Action] System health carregado:", result);
        return result.data;
      },
      CACHE_CONFIG.system
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchSystemHealth:",
      error
    );
    throw error;
  }
}

// ✅ All Users
export async function prefetchAllUsers() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando prefetchAllUsers()");
    return await cacheUtils.getCachedData(
      "users:all",
      async () => {
        const result = await serverGet("/users");
        console.log("✅ [Prefetch Server Action] All users carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.users
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchAllUsers:",
      error
    );
    throw error;
  }
}

// ✅ Recent Logs
export async function prefetchRecentLogs() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando prefetchRecentLogs()");
    return await cacheUtils.getCachedData(
      "logs:recent",
      async () => {
        const result = await serverGet("/logs/recent");
        console.log("✅ [Prefetch Server Action] Recent logs carregados:", result);
        return result.data;
      },
      CACHE_CONFIG.logs
    );
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em prefetchRecentLogs:",
      error
    );
    throw error;
  }
}

// ✅ Clear Cache
export async function clearCache() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando clearCache()");
    await cacheUtils.clear();
    return { success: true, message: "Cache limpo com sucesso" };
  } catch (error) {
    console.error("❌ [Prefetch Server Action] Erro em clearCache:", error);
    throw error;
  }
}

// ✅ Get Cache Stats
export async function getCacheStats() {
  try {
    console.log("🚀 [Prefetch Server Action] Iniciando getCacheStats()");
    const stats = cacheUtils.getStats();
    console.log("✅ [Prefetch Server Action] Cache stats obtidos:", stats);
    return stats;
  } catch (error) {
    console.error("❌ [Prefetch Server Action] Erro em getCacheStats:", error);
    throw error;
  }
}

// ✅ Invalidate Cache Pattern
export async function invalidateCachePattern(pattern: string) {
  try {
    console.log(
      `🚀 [Prefetch Server Action] Iniciando invalidateCachePattern(${pattern})`
    );
    await cacheUtils.invalidatePattern(pattern);
    console.log(
      `✅ [Prefetch Server Action] Cache pattern ${pattern} invalidado`
    );
    return {
      success: true,
      message: `Pattern ${pattern} invalidado com sucesso`,
    };
  } catch (error) {
    console.error(
      "❌ [Prefetch Server Action] Erro em invalidateCachePattern:",
      error
    );
    throw error;
  }
}
