// ✅ Sistema de Prefetch Inteligente
import {
  intelligentCache,
  CACHE_CONFIG,
  cacheUtils,
} from "./intelligent-cache";
import { requestManager } from "./request-manager";

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

  // ✅ Funções de fetch específicas
  private async fetchDashboardStats(): Promise<any> {
    const response = await fetch("/api/dashboard/stats");
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return response.json();
  }

  private async fetchCurrentProfile(): Promise<any> {
    const response = await fetch("/api/auth/profile");
    if (!response.ok) throw new Error("Failed to fetch profile");
    return response.json();
  }

  private async fetchTodayAppointments(): Promise<any> {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(`/api/appointments?date=${today}`);
    if (!response.ok) throw new Error("Failed to fetch today appointments");
    return response.json();
  }

  private async fetchMyAppointments(): Promise<any> {
    const response = await fetch("/api/appointments/my");
    if (!response.ok) throw new Error("Failed to fetch my appointments");
    return response.json();
  }

  private async fetchEmployees(): Promise<any> {
    const response = await fetch("/api/employees");
    if (!response.ok) throw new Error("Failed to fetch employees");
    return response.json();
  }

  private async fetchMyClients(): Promise<any> {
    const response = await fetch("/api/clients/my");
    if (!response.ok) throw new Error("Failed to fetch my clients");
    return response.json();
  }

  private async fetchAllClients(): Promise<any> {
    const response = await fetch("/api/clients");
    if (!response.ok) throw new Error("Failed to fetch all clients");
    return response.json();
  }

  private async fetchAvailableServices(): Promise<any> {
    const response = await fetch("/api/services/available");
    if (!response.ok) throw new Error("Failed to fetch available services");
    return response.json();
  }

  private async fetchAllServices(): Promise<any> {
    const response = await fetch("/api/services");
    if (!response.ok) throw new Error("Failed to fetch all services");
    return response.json();
  }

  private async fetchAppSettings(): Promise<any> {
    const response = await fetch("/api/settings");
    if (!response.ok) throw new Error("Failed to fetch app settings");
    return response.json();
  }

  private async fetchMonthlyAnalytics(): Promise<any> {
    const response = await fetch("/api/analytics/monthly");
    if (!response.ok) throw new Error("Failed to fetch monthly analytics");
    return response.json();
  }

  private async fetchPersonalAnalytics(): Promise<any> {
    const response = await fetch("/api/analytics/personal");
    if (!response.ok) throw new Error("Failed to fetch personal analytics");
    return response.json();
  }

  private async fetchAvailableEmployees(): Promise<any> {
    const response = await fetch("/api/employees/available");
    if (!response.ok) throw new Error("Failed to fetch available employees");
    return response.json();
  }

  // ✅ Prefetch baseado na rota atual
  async prefetchByRoute(route: string): Promise<void> {
    const routePrefetchMap: Record<string, string[]> = {
      "/dashboard/admin": [
        "dashboard:stats",
        "appointments:today",
        "employees:list",
      ],
      "/dashboard/admin/appointments": [
        "appointments:list",
        "employees:list",
        "services:list",
      ],
      "/dashboard/admin/employees": ["employees:list", "appointments:today"],
      "/dashboard/admin/clients": ["clients:list", "appointments:today"],
      "/dashboard/employee": [
        "dashboard:stats",
        "appointments:my",
        "clients:my",
      ],
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
        this.prefetchWithPriority(
          key,
          this.getFetchFnForKey(key),
          "medium"
        )
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
