import { useEffect } from "react";
import { cacheUtils } from "@/lib/cache";

// Hook para prefetch de dados principais
export const usePrefetch = () => {
  const prefetchMainData = async () => {
    try {
      console.log("🚀 Iniciando prefetch de dados principais...");

      // Prefetch de dados em paralelo
      const prefetchPromises = [
        // Dashboard stats
        cacheUtils.getCachedData("dashboard:stats", async () => {
          // Esta função será chamada apenas se não estiver em cache
          console.log("📊 Prefetching dashboard stats...");
          return null; // Placeholder - será preenchido quando acessado
        }),

        // Appointments today
        cacheUtils.getCachedData("appointments:today", async () => {
          console.log("📅 Prefetching appointments today...");
          return null;
        }),

        // Services list
        cacheUtils.getCachedData("services:list", async () => {
          console.log("🔧 Prefetching services list...");
          return null;
        }),

        // Employees list
        cacheUtils.getCachedData("employees:list", async () => {
          console.log("👥 Prefetching employees list...");
          return null;
        }),

        // Active employees
        cacheUtils.getCachedData("employees:active", async () => {
          console.log("✅ Prefetching active employees...");
          return null;
        }),
      ];

      await Promise.allSettled(prefetchPromises);
      console.log("✅ Prefetch concluído com sucesso!");
    } catch (error) {
      console.error("❌ Erro durante prefetch:", error);
    }
  };

  // Prefetch automático após login
  useEffect(() => {
    // Verificar se o usuário está logado
    const token = localStorage.getItem("auth_token");
    if (token) {
      prefetchMainData();
    }
  }, []);

  return {
    prefetchMainData,
  };
};

// Hook para prefetch específico por página
export const usePagePrefetch = (
  pageType: "dashboard" | "appointments" | "services" | "employees" | "clients"
) => {
  const prefetchPageData = async () => {
    try {
      console.log(`🚀 Prefetching dados para página: ${pageType}`);

      switch (pageType) {
        case "dashboard":
          await Promise.allSettled([
            cacheUtils.getCachedData("dashboard:stats", async () => null),
            cacheUtils.getCachedData(
              "dashboard:appointment-stats",
              async () => null
            ),
            cacheUtils.getCachedData("appointments:today", async () => null),
          ]);
          break;

        case "appointments":
          await Promise.allSettled([
            cacheUtils.getCachedData("appointments:all", async () => null),
            cacheUtils.getCachedData("appointments:today", async () => null),
          ]);
          break;

        case "services":
          await Promise.allSettled([
            cacheUtils.getCachedData("services:list", async () => null),
          ]);
          break;

        case "employees":
          await Promise.allSettled([
            cacheUtils.getCachedData("employees:list", async () => null),
            cacheUtils.getCachedData("employees:active", async () => null),
          ]);
          break;

        case "clients":
          await Promise.allSettled([
            cacheUtils.getCachedData("clients:list", async () => null),
          ]);
          break;
      }

      console.log(`✅ Prefetch para ${pageType} concluído!`);
    } catch (error) {
      console.error(`❌ Erro durante prefetch de ${pageType}:`, error);
    }
  };

  return {
    prefetchPageData,
  };
};
