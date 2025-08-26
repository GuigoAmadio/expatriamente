// ✅ Sistema de Prefetch Inteligente - TEMPORARILY DISABLED FOR PROJECT DELIVERY
/*
import {
  intelligentCache,
  CACHE_CONFIG,
  cacheUtils,
} from "./intelligent-cache";
import { requestManager } from "./request-manager";
*/

// ✅ Importar Server Actions - TEMPORARILY DISABLED FOR PROJECT DELIVERY
/*
import {
  prefetchDashboardStats,
  prefetchCurrentProfile,
  prefetchTodayAppointments,
  prefetchMyAppointments,
  prefetchEmployees,
  prefetchMyClients,
  prefetchAllClients,
  prefetchAvailableServices,
  prefetchAllServices,
  prefetchAppSettings,
  prefetchMonthlyAnalytics,
  prefetchPersonalAnalytics,
  prefetchAvailableEmployees,
  prefetchDetailedAnalytics,
  prefetchSystemHealth,
  prefetchAllUsers,
  prefetchRecentLogs,
} from "../actions/prefetch";
*/

/*
interface PrefetchItem {
  key: string;
  priority: "high" | "medium" | "low";
  fetchFn: () => Promise<any>;
  dependencies?: string[];
}

export class IntelligentPrefetch {
  private prefetchQueue = new Map<string, Promise<any>>();
  private prefetchPriorities = new Map<string, "high" | "medium" | "low">();
  private isActive = false;

  // ✅ Configuração da API (agora gerenciada pelo server-api)

  // ✅ Prefetch essencial (alta prioridade) - carrega imediatamente
  async prefetchEssential(userRole: string): Promise<void> {
    if (this.isActive) {
      console.log("🔄 [Prefetch] Prefetch já ativo, ignorando");
      return;
    }

    this.isActive = true;

    try {
      const essentialData = this.getEssentialDataByRole(userRole);

      console.log(
        `🚀 [Prefetch] Iniciando prefetch essencial para role: ${userRole}`
      );
      console.log(
        `📋 [Prefetch] Items essenciais: ${essentialData
          .map((item) => item.key)
          .join(", ")}`
      );

      // Carregar items de alta prioridade em paralelo
      const highPriorityItems = essentialData.filter(
        (item) => item.priority === "high"
      );
      const mediumPriorityItems = essentialData.filter(
        (item) => item.priority === "medium"
      );

      // Carregar alta prioridade primeiro
      if (highPriorityItems.length > 0) {
        console.log(
          `⚡ [Prefetch] Carregando ${highPriorityItems.length} items de alta prioridade...`
        );
        const highPromises = highPriorityItems.map((item) =>
          this.prefetchWithPriority(item.key, item.fetchFn, "high")
        );
        await Promise.allSettled(highPromises);
      }

      // Carregar média prioridade depois
      if (mediumPriorityItems.length > 0) {
        console.log(
          `🔄 [Prefetch] Carregando ${mediumPriorityItems.length} items de média prioridade...`
        );
        const mediumPromises = mediumPriorityItems.map((item) =>
          this.prefetchWithPriority(item.key, item.fetchFn, "medium")
        );
        await Promise.allSettled(mediumPromises);
      }

      console.log("✅ [Prefetch] Prefetch essencial concluído");
    } catch (error) {
      console.error("❌ [Prefetch] Erro durante prefetch essencial:", error);
    } finally {
      this.isActive = false;
    }
  }

  // ✅ Prefetch secundário (baixa prioridade) - em background
  async prefetchSecondary(userRole: string): Promise<void> {
    // Aguardar 2 segundos para não interferir no carregamento inicial
    setTimeout(async () => {
      try {
        const secondaryData = this.getSecondaryDataByRole(userRole);

        console.log(
          `🔄 [Prefetch] Iniciando prefetch secundário para role: ${userRole}`
        );
        console.log(
          `📋 [Prefetch] Items secundários: ${secondaryData
            .map((item) => item.key)
            .join(", ")}`
        );

        const promises = secondaryData.map((item) =>
          this.prefetchWithPriority(item.key, item.fetchFn, "low")
        );

        await Promise.allSettled(promises);
        console.log("✅ [Prefetch] Prefetch secundário concluído");
      } catch (error) {
        console.error("❌ [Prefetch] Erro durante prefetch secundário:", error);
      }
    }, 2000);
  }

  // ✅ Prefetch com prioridade
  private async prefetchWithPriority(
    key: string,
    fetchFn: () => Promise<any>,
    priority: "high" | "medium" | "low"
  ): Promise<void> {
    if (this.prefetchQueue.has(key)) {
      console.log(`⏭️ [Prefetch] ${key} já está sendo processado`);
      return;
    }

    const prefetchPromise = this.executePrefetch(key, fetchFn);
    this.prefetchQueue.set(key, prefetchPromise);
    this.prefetchPriorities.set(key, priority);

    try {
      if (priority === "high") {
        // Alta prioridade - executar imediatamente
        await prefetchPromise;
      } else if (priority === "medium") {
        // Média prioridade - executar com delay pequeno
        setTimeout(() => prefetchPromise, 500);
      } else {
        // Baixa prioridade - executar em background
        setTimeout(() => prefetchPromise, 3000);
      }
    } finally {
      this.prefetchQueue.delete(key);
      this.prefetchPriorities.delete(key);
    }
  }

  // ✅ Executar prefetch
  private async executePrefetch(
    key: string,
    fetchFn: () => Promise<any>
  ): Promise<void> {
    try {
      console.log(`🔄 [Prefetch] Carregando ${key}...`);

      // Verificar se já está em cache
      const cacheType = key.split(":")[0] as keyof typeof CACHE_CONFIG;
      const config = CACHE_CONFIG[cacheType];

      const cached = await intelligentCache.get(key, config);
      if (cached) {
        console.log(`✅ [Prefetch] ${key} já está em cache, pulando`);
        return;
      }

      // Buscar dados usando request manager para evitar duplicação
      const data = await requestManager.executeRequest(
        `prefetch:${key}`,
        async () => await fetchFn(),
        { deduplicate: true, timeout: 15000 }
      );

      // Salvar no cache
      await intelligentCache.set(key, data, config);
      console.log(`✅ [Prefetch] ${key} carregado e salvo no cache`);
    } catch (error) {
      console.error(`❌ [Prefetch] Erro ao carregar ${key}:`, error);
    }
  }

  // ✅ Dados essenciais por role
  private getEssentialDataByRole(role: string): PrefetchItem[] {
    const baseItems = [
      {
        key: "dashboard:stats",
        priority: "high" as const,
        fetchFn: () => this.fetchDashboardStats(),
      },
      {
        key: "profile:current",
        priority: "high" as const,
        fetchFn: () => this.fetchCurrentProfile(),
      },
    ];

    const roleSpecificItems: Record<string, PrefetchItem[]> = {
      SUPER_ADMIN: [
        ...baseItems,
        {
          key: "appointments:today",
          priority: "high" as const,
          fetchFn: () => this.fetchTodayAppointments(),
        },
        {
          key: "employees:list",
          priority: "high" as const,
          fetchFn: () => this.fetchEmployees(),
        },
        {
          key: "clients:list",
          priority: "high" as const,
          fetchFn: () => this.fetchAllClients(),
        },
        {
          key: "services:list",
          priority: "high" as const,
          fetchFn: () => this.fetchAllServices(),
        },
      ],
      ADMIN: [
        ...baseItems,
        {
          key: "appointments:today",
          priority: "high" as const,
          fetchFn: () => this.fetchTodayAppointments(),
        },
        {
          key: "employees:list",
          priority: "medium" as const,
          fetchFn: () => this.fetchEmployees(),
        },
      ],
      EMPLOYEE: [
        ...baseItems,
        {
          key: "appointments:my",
          priority: "high" as const,
          fetchFn: () => this.fetchMyAppointments(),
        },
        {
          key: "clients:my",
          priority: "medium" as const,
          fetchFn: () => this.fetchMyClients(),
        },
      ],
      CLIENT: [
        ...baseItems,
        {
          key: "appointments:my",
          priority: "high" as const,
          fetchFn: () => this.fetchMyAppointments(),
        },
        {
          key: "services:available",
          priority: "medium" as const,
          fetchFn: () => this.fetchAvailableServices(),
        },
      ],
    };

    return roleSpecificItems[role] || baseItems;
  }

  // ✅ Dados secundários por role
  private getSecondaryDataByRole(role: string): PrefetchItem[] {
    const baseItems: PrefetchItem[] = [
      {
        key: "settings:app",
        priority: "low" as const,
        fetchFn: () => this.fetchAppSettings(),
      },
    ];

    const roleSpecificItems: Record<string, PrefetchItem[]> = {
      SUPER_ADMIN: [
        ...baseItems,
        {
          key: "analytics:detailed",
          priority: "low" as const,
          fetchFn: () => this.fetchDetailedAnalytics(),
        },
        {
          key: "system:health",
          priority: "low" as const,
          fetchFn: () => this.fetchSystemHealth(),
        },
        {
          key: "users:all",
          priority: "low" as const,
          fetchFn: () => this.fetchAllUsers(),
        },
        {
          key: "logs:recent",
          priority: "low" as const,
          fetchFn: () => this.fetchRecentLogs(),
        },
      ],
      ADMIN: [
        ...baseItems,
        {
          key: "clients:list",
          priority: "low" as const,
          fetchFn: () => this.fetchAllClients(),
        },
        {
          key: "services:list",
          priority: "low" as const,
          fetchFn: () => this.fetchAllServices(),
        },
        {
          key: "analytics:monthly",
          priority: "low" as const,
          fetchFn: () => this.fetchMonthlyAnalytics(),
        },
      ],
      EMPLOYEE: [
        ...baseItems,
        {
          key: "services:list",
          priority: "low" as const,
          fetchFn: () => this.fetchAllServices(),
        },
        {
          key: "analytics:personal",
          priority: "low" as const,
          fetchFn: () => this.fetchPersonalAnalytics(),
        },
      ],
      CLIENT: [
        ...baseItems,
        {
          key: "employees:available",
          priority: "low" as const,
          fetchFn: () => this.fetchAvailableEmployees(),
        },
      ],
    };

    return roleSpecificItems[role] || baseItems;
  }

  // ✅ Funções de fetch usando Server Actions (executam no servidor)
  private async fetchDashboardStats(): Promise<any> {
    try {
      return await prefetchDashboardStats();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar dashboard stats:", error);
      throw error;
    }
  }

  private async fetchCurrentProfile(): Promise<any> {
    try {
      return await prefetchCurrentProfile();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar profile:", error);
      throw error;
    }
  }

  private async fetchTodayAppointments(): Promise<any> {
    try {
      return await prefetchTodayAppointments();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar today appointments:", error);
      throw error;
    }
  }

  private async fetchMyAppointments(): Promise<any> {
    try {
      return await prefetchMyAppointments();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar my appointments:", error);
      throw error;
    }
  }

  private async fetchEmployees(): Promise<any> {
    try {
      return await prefetchEmployees();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar employees:", error);
      throw error;
    }
  }

  private async fetchMyClients(): Promise<any> {
    try {
      return await prefetchMyClients();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar my clients:", error);
      throw error;
    }
  }

  private async fetchAllClients(): Promise<any> {
    try {
      return await prefetchAllClients();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar all clients:", error);
      throw error;
    }
  }

  private async fetchAvailableServices(): Promise<any> {
    try {
      return await prefetchAvailableServices();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar available services:", error);
      throw error;
    }
  }

  private async fetchAllServices(): Promise<any> {
    try {
      return await prefetchAllServices();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar all services:", error);
      throw error;
    }
  }

  private async fetchAppSettings(): Promise<any> {
    try {
      return await prefetchAppSettings();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar app settings:", error);
      throw error;
    }
  }

  private async fetchMonthlyAnalytics(): Promise<any> {
    try {
      return await prefetchMonthlyAnalytics();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar monthly analytics:", error);
      throw error;
    }
  }

  private async fetchPersonalAnalytics(): Promise<any> {
    try {
      return await prefetchPersonalAnalytics();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar personal analytics:", error);
      throw error;
    }
  }

  private async fetchAvailableEmployees(): Promise<any> {
    try {
      return await prefetchAvailableEmployees();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar available employees:", error);
      throw error;
    }
  }

  // ✅ Funções específicas para SUPER_ADMIN usando Server Actions
  private async fetchDetailedAnalytics(): Promise<any> {
    try {
      return await prefetchDetailedAnalytics();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar detailed analytics:", error);
      throw error;
    }
  }

  private async fetchSystemHealth(): Promise<any> {
    try {
      return await prefetchSystemHealth();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar system health:", error);
      throw error;
    }
  }

  private async fetchAllUsers(): Promise<any> {
    try {
      return await prefetchAllUsers();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar all users:", error);
      throw error;
    }
  }

  private async fetchRecentLogs(): Promise<any> {
    try {
      return await prefetchRecentLogs();
    } catch (error) {
      console.error("❌ [Prefetch] Erro ao buscar recent logs:", error);
      throw error;
    }
  }

  // ✅ Prefetch baseado na rota atual
  async prefetchByRoute(route: string): Promise<void> {
    const routePrefetchMap: Record<string, string[]> = {
      // Rotas SUPER_ADMIN e ADMIN (todas as permissões)
      "/dashboard/admin": [
        "dashboard:stats",
        "appointments:today",
        "employees:list",
        "clients:list",
        "services:list",
        "analytics:monthly",
      ],
      "/dashboard/admin/appointments": [
        "appointments:list",
        "employees:list",
        "services:list",
        "clients:list",
      ],
      "/dashboard/admin/employees": [
        "employees:list",
        "appointments:today",
        "analytics:monthly",
      ],
      "/dashboard/admin/clients": [
        "clients:list",
        "appointments:today",
        "analytics:monthly",
      ],
      "/dashboard/admin/analytics": [
        "analytics:monthly",
        "analytics:detailed",
        "system:health",
      ],
      "/dashboard/admin/system": ["system:health", "users:all", "logs:recent"],
      "/dashboard/admin/users": [
        "users:all",
        "analytics:monthly",
        "system:health",
      ],
      // Rotas EMPLOYEE
      "/dashboard/employee": [
        "dashboard:stats",
        "appointments:my",
        "clients:my",
      ],
      // Rotas CLIENT
      "/dashboard/client": [
        "dashboard:stats",
        "appointments:my",
        "services:available",
      ],
    };

    const keysToPrefetch = routePrefetchMap[route] || [];

    if (keysToPrefetch.length > 0) {
      console.log(`🔄 [Prefetch] Prefetch para rota: ${route}`);

      const promises = keysToPrefetch.map((key) =>
        this.prefetchWithPriority(key, this.getFetchFnForKey(key), "medium")
      );

      await Promise.allSettled(promises);
    }
  }

  // ✅ Helper para obter função de fetch por key
  private getFetchFnForKey(key: string): () => Promise<any> {
    const fetchMap: Record<string, () => Promise<any>> = {
      "dashboard:stats": () => this.fetchDashboardStats(),
      "appointments:today": () => this.fetchTodayAppointments(),
      "appointments:my": () => this.fetchMyAppointments(),
      "employees:list": () => this.fetchEmployees(),
      "clients:list": () => this.fetchAllClients(),
      "clients:my": () => this.fetchMyClients(),
      "services:list": () => this.fetchAllServices(),
      "services:available": () => this.fetchAvailableServices(),
      // Funções específicas do SUPER_ADMIN
      "analytics:detailed": () => this.fetchDetailedAnalytics(),
      "system:health": () => this.fetchSystemHealth(),
      "users:all": () => this.fetchAllUsers(),
      "logs:recent": () => this.fetchRecentLogs(),
    };

    return fetchMap[key] || (() => Promise.resolve(null));
  }

  // ✅ Obter estatísticas do prefetch
  getStats() {
    return {
      queueSize: this.prefetchQueue.size,
      isActive: this.isActive,
      priorities: Object.fromEntries(this.prefetchPriorities),
    };
  }

  // ✅ Cancelar todos os prefetches
  cancelAllPrefetches(): void {
    console.log("❌ [Prefetch] Cancelando todos os prefetches...");
    this.prefetchQueue.clear();
    this.prefetchPriorities.clear();
    this.isActive = false;
  }
}

// Instância global
export const intelligentPrefetch = new IntelligentPrefetch();
}
*/

// ✅ TEMPORARY FALLBACK IMPLEMENTATION FOR PROJECT DELIVERY
export class IntelligentPrefetch {
  getStats() {
    return { queueSize: 0, isActive: false, priorities: {} };
  }

  async prefetchEssential(userRole: string): Promise<void> {
    console.log(
      `⚠️ [Prefetch] Desabilitado temporariamente para entrega do projeto - userRole: ${userRole}`
    );
  }

  async prefetchSecondary(userRole: string): Promise<void> {
    console.log(
      `⚠️ [Prefetch] Desabilitado temporariamente para entrega do projeto - userRole: ${userRole}`
    );
  }

  async prefetchByRoute(route: string): Promise<void> {
    console.log(
      `⚠️ [Prefetch] Desabilitado temporariamente para entrega do projeto - route: ${route}`
    );
  }

  cancelAllPrefetches(): void {
    console.log(
      "⚠️ [Prefetch] Desabilitado temporariamente para entrega do projeto"
    );
  }
}

// Instância global
export const intelligentPrefetch = new IntelligentPrefetch();
