// Cache utilitário avançado para o frontend
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  version?: string;
}

interface CacheConfig {
  ttl: number;
  layer: "memory" | "localStorage" | "indexedDB";
  version?: string;
}

// Configurações de TTL por tipo de dado - OTIMIZADAS
export const CACHE_CONFIG = {
  // Dados dinâmicos - cache otimizado
  dashboard: { ttl: 5 * 60 * 1000, layer: "memory" }, // 5 minutos (era 2)
  appointments: { ttl: 3 * 60 * 1000, layer: "memory" }, // 3 minutos (era 1)
  notifications: { ttl: 60 * 1000, layer: "memory" }, // 1 minuto (era 30s)

  // Dados semi-estáticos - cache otimizado
  services: { ttl: 30 * 60 * 1000, layer: "localStorage" }, // 30 minutos (era 10)
  employees: { ttl: 45 * 60 * 1000, layer: "localStorage" }, // 45 minutos (era 15)
  clients: { ttl: 30 * 60 * 1000, layer: "localStorage" }, // 30 minutos (era 10)

  // Dados estáticos - cache otimizado
  profile: { ttl: 60 * 60 * 1000, layer: "localStorage" }, // 1 hora (era 30min)
  settings: { ttl: 24 * 60 * 60 * 1000, layer: "localStorage" }, // 24 horas
  catalogs: { ttl: 2 * 60 * 60 * 1000, layer: "localStorage" }, // 2 horas (era 1)
} as const;

class AdvancedCache {
  private memoryCache = new Map<string, CacheItem<any>>();
  private maxMemorySize = 100;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Limpeza automática a cada 5 minutos
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  // Gerar chave de cache padronizada
  generateKey(prefix: string, params?: Record<string, any>): string {
    if (!params) return prefix;

    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}:${params[key]}`)
      .join(":");

    return `${prefix}:${sortedParams}`;
  }

  // Obter dados do cache
  async get<T>(key: string, config?: CacheConfig): Promise<T | null> {
    try {
      console.log(`🔍 [Cache] Buscando chave: ${key}`);

      // Tentar memória primeiro (mais rápido)
      const memoryItem = this.memoryCache.get(key);
      if (memoryItem && this.isValid(memoryItem)) {
        console.log(`✅ [Cache] HIT em memória para: ${key}`);
        return memoryItem.data as T;
      }

      // Se não estiver em memória, tentar localStorage
      if (typeof window !== "undefined") {
        const localStorageItem = this.getFromLocalStorage<T>(key);
        if (localStorageItem && this.isValid(localStorageItem)) {
          console.log(`✅ [Cache] HIT em localStorage para: ${key}`);
          // Mover para memória para acesso mais rápido
          this.memoryCache.set(key, localStorageItem);
          return localStorageItem.data;
        }
      }

      console.log(`❌ [Cache] MISS para: ${key}`);
      return null;
    } catch (error) {
      console.error(`❌ [Cache] Erro ao obter cache para ${key}:`, error);
      return null;
    }
  }

  // Definir dados no cache
  async set<T>(key: string, data: T, config?: CacheConfig): Promise<void> {
    try {
      const ttl = config?.ttl || CACHE_CONFIG.dashboard.ttl;
      const layer = config?.layer || "memory";

      console.log(
        `💾 [Cache] Salvando chave: ${key} (TTL: ${ttl}ms, Layer: ${layer})`
      );

      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl,
        version: config?.version,
      };

      // Sempre salvar em memória para acesso rápido
      this.memoryCache.set(key, item);
      console.log(`✅ [Cache] Salvo em memória: ${key}`);

      // Se configurado para localStorage, salvar lá também
      if (layer === "localStorage" && typeof window !== "undefined") {
        this.setToLocalStorage(key, item);
        console.log(`✅ [Cache] Salvo em localStorage: ${key}`);
      }

      // Implementar LRU para memória
      if (this.memoryCache.size > this.maxMemorySize) {
        const firstKey = this.memoryCache.keys().next().value;
        if (firstKey) {
          this.memoryCache.delete(firstKey);
          console.log(`🗑️ [Cache] LRU - Removido da memória: ${firstKey}`);
        }
      }
    } catch (error) {
      console.error(`❌ [Cache] Erro ao definir cache para ${key}:`, error);
    }
  }

  // Remover do cache
  async delete(key: string): Promise<void> {
    try {
      this.memoryCache.delete(key);

      if (typeof window !== "undefined") {
        localStorage.removeItem(`cache:${key}`);
      }
    } catch (error) {
      console.error("Erro ao remover cache:", error);
    }
  }

  // Invalidar cache por padrão
  async invalidatePattern(pattern: string): Promise<void> {
    try {
      console.log(`🗑️ [Cache] Invalidando padrão: ${pattern}`);
      let memoryCount = 0;
      let localStorageCount = 0;

      // Invalidar em memória
      for (const key of this.memoryCache.keys()) {
        if (key.includes(pattern)) {
          this.memoryCache.delete(key);
          memoryCount++;
          console.log(`🗑️ [Cache] Removido da memória: ${key}`);
        }
      }

      // Invalidar em localStorage
      if (typeof window !== "undefined") {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith("cache:") && key.includes(pattern)) {
            localStorage.removeItem(key);
            localStorageCount++;
            console.log(`🗑️ [Cache] Removido do localStorage: ${key}`);
          }
        }
      }

      console.log(
        `✅ [Cache] Invalidação concluída - Memória: ${memoryCount}, localStorage: ${localStorageCount}`
      );
    } catch (error) {
      console.error(
        `❌ [Cache] Erro ao invalidar cache por padrão ${pattern}:`,
        error
      );
    }
  }

  // Limpar todo o cache
  async clear(): Promise<void> {
    try {
      this.memoryCache.clear();

      if (typeof window !== "undefined") {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith("cache:")) {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao limpar cache:", error);
    }
  }

  // Verificar se item é válido
  private isValid<T>(item: CacheItem<T>): boolean {
    return Date.now() - item.timestamp < item.ttl;
  }

  // Obter do localStorage
  private getFromLocalStorage<T>(key: string): CacheItem<T> | null {
    try {
      const stored = localStorage.getItem(`cache:${key}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Erro ao obter do localStorage:", error);
      return null;
    }
  }

  // Salvar no localStorage
  private setToLocalStorage<T>(key: string, item: CacheItem<T>): void {
    try {
      localStorage.setItem(`cache:${key}`, JSON.stringify(item));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }

  // Limpeza automática
  private cleanup(): void {
    const now = Date.now();

    // Limpar memória
    for (const [key, item] of this.memoryCache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.memoryCache.delete(key);
      }
    }

    // Limpar localStorage
    if (typeof window !== "undefined") {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith("cache:")) {
          try {
            const item = JSON.parse(localStorage.getItem(key) || "{}");
            if (now - item.timestamp > item.ttl) {
              localStorage.removeItem(key);
            }
          } catch (error) {
            // Se não conseguir parsear, remover
            localStorage.removeItem(key);
          }
        }
      }
    }
  }

  // Obter estatísticas do cache
  getStats() {
    const memorySize = this.memoryCache.size;
    const localStorageSize =
      typeof window !== "undefined"
        ? Array.from({ length: localStorage.length }, (_, i) =>
            localStorage.key(i)
          ).filter((key) => key && key.startsWith("cache:")).length
        : 0;

    return {
      memorySize,
      localStorageSize,
      totalSize: memorySize + localStorageSize,
    };
  }

  // Destruir cache (limpar intervalos)
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Instância global do cache
export const advancedCache = new AdvancedCache();

// Funções utilitárias para facilitar o uso
export const cacheUtils = {
  // Buscar dados com cache automático
  async getCachedData<T>(
    key: string,
    fetchFn: () => Promise<T>,
    config?: CacheConfig
  ): Promise<T> {
    // Tentar obter do cache
    const cached = await advancedCache.get<T>(key, config);
    if (cached) {
      return cached;
    }

    // Se não estiver em cache, buscar e salvar
    const data = await fetchFn();
    await advancedCache.set(key, data, config);
    return data;
  },

  // Invalidar cache por tipo
  async invalidateByType(type: keyof typeof CACHE_CONFIG): Promise<void> {
    const patterns: Record<keyof typeof CACHE_CONFIG, string> = {
      dashboard: "dashboard",
      appointments: "appointments",
      notifications: "notifications",
      services: "services",
      employees: "employees",
      clients: "clients",
      profile: "profile",
      settings: "settings",
      catalogs: "catalogs",
    };

    const pattern = patterns[type];
    if (pattern) {
      await advancedCache.invalidatePattern(pattern);
    }
  },

  // Invalidar cache por padrão específico
  async invalidatePattern(pattern: string): Promise<void> {
    await advancedCache.invalidatePattern(pattern);
  },

  // Deletar chave específica
  async delete(key: string): Promise<void> {
    await advancedCache.delete(key);
  },

  // Prefetch de dados principais
  async prefetchMainData(): Promise<void> {
    if (typeof window === "undefined") return;

    const prefetchPromises = [
      // Dashboard stats
      advancedCache.set("dashboard:stats", null, CACHE_CONFIG.dashboard),
      // Appointments today
      advancedCache.set("appointments:today", null, CACHE_CONFIG.appointments),
      // Services list
      advancedCache.set("services:list", null, CACHE_CONFIG.services),
      // Employees list
      advancedCache.set("employees:list", null, CACHE_CONFIG.employees),
    ];

    await Promise.allSettled(prefetchPromises);
  },

  // Prefetch inteligente baseado na rota atual
  async prefetchByRoute(route: string): Promise<void> {
    if (typeof window === "undefined") return;

    const routePrefetchMap: Record<string, string[]> = {
      "/dashboard/admin": [
        "dashboard:stats",
        "appointments:today",
        "employees:list",
        "services:list",
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
        "appointments:today",
        "clients:list",
      ],
      "/dashboard/client": [
        "dashboard:stats",
        "appointments:today",
        "services:list",
      ],
    };

    const keysToPrefetch = routePrefetchMap[route] || [];

    if (keysToPrefetch.length > 0) {
      console.log(`🔄 [Cache] Prefetch para rota: ${route}`);
      const prefetchPromises = keysToPrefetch.map((key) =>
        advancedCache.set(key, null, CACHE_CONFIG.dashboard)
      );
      await Promise.allSettled(prefetchPromises);
    }
  },

  // Prefetch baseado no role do usuário
  async prefetchByUserRole(role: string): Promise<void> {
    if (typeof window === "undefined") return;

    const rolePrefetchMap: Record<string, string[]> = {
      ADMIN: [
        "dashboard:stats",
        "appointments:today",
        "employees:list",
        "services:list",
        "clients:list",
      ],
      EMPLOYEE: ["dashboard:stats", "appointments:today", "clients:list"],
      CLIENT: ["dashboard:stats", "appointments:today", "services:list"],
    };

    const keysToPrefetch = rolePrefetchMap[role] || [];

    if (keysToPrefetch.length > 0) {
      console.log(`🔄 [Cache] Prefetch para role: ${role}`);
      const prefetchPromises = keysToPrefetch.map((key) =>
        advancedCache.set(key, null, CACHE_CONFIG.dashboard)
      );
      await Promise.allSettled(prefetchPromises);
    }
  },
};

// Hook para usar cache em componentes React
export const useCache = () => {
  return {
    get: advancedCache.get.bind(advancedCache),
    set: advancedCache.set.bind(advancedCache),
    delete: advancedCache.delete.bind(advancedCache),
    invalidatePattern: cacheUtils.invalidatePattern,
    getCachedData: cacheUtils.getCachedData,
    invalidateByType: cacheUtils.invalidateByType,
    prefetchMainData: cacheUtils.prefetchMainData,
    prefetchByRoute: cacheUtils.prefetchByRoute,
    prefetchByUserRole: cacheUtils.prefetchByUserRole,
  };
};
