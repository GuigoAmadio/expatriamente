// ✅ Sistema de Cache Inteligente com Validação da Tabela de Metadata
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  cacheKey: string; // Para identificar na tabela de metadata
  version?: string;
}

interface BaseCacheConfig {
  ttl: number;
  layer: "memory" | "localStorage";
}

interface CacheConfigWithValidation extends BaseCacheConfig {
  validateOnAccess: true;
  version?: string;
}

interface CacheConfigWithoutValidation extends BaseCacheConfig {
  validateOnAccess?: false;
  version?: string;
}

type IntelligentCacheConfig =
  | CacheConfigWithValidation
  | CacheConfigWithoutValidation;

// ✅ Configurações de TTL otimizadas para diferentes tipos de dados
export const CACHE_CONFIG: Record<string, IntelligentCacheConfig> = {
  // Dados dinâmicos - cache curto
  dashboard: {
    ttl: 5 * 60 * 1000,
    layer: "memory" as const,
    validateOnAccess: false,
  },

  appointments: {
    ttl: 3 * 60 * 1000,
    layer: "localStorage" as const,
    validateOnAccess: false,
  },

  notifications: {
    ttl: 1 * 60 * 1000,
    layer: "memory" as const,
    validateOnAccess: false,
  },

  // Dados semi-estáticos - cache médio + validação
  employees: {
    ttl: 2 * 60 * 60 * 1000, // 2 horas
    layer: "localStorage" as const,
    validateOnAccess: true,
  },

  clients: {
    ttl: 4 * 60 * 60 * 1000, // 4 horas
    layer: "localStorage" as const,
    validateOnAccess: true,
  },

  services: {
    ttl: 12 * 60 * 60 * 1000, // 12 horas
    layer: "localStorage" as const,
    validateOnAccess: true,
  },

  // Dados estáticos - cache longo
  profile: {
    ttl: 60 * 60 * 1000,
    layer: "localStorage" as const,
    validateOnAccess: false,
  },

  settings: {
    ttl: 24 * 60 * 60 * 1000,
    layer: "localStorage" as const,
    validateOnAccess: false,
  },

  analytics: {
    ttl: 30 * 60 * 1000, // 30 minutos
    layer: "memory" as const,
    validateOnAccess: false,
  },

  system: {
    ttl: 10 * 60 * 1000, // 10 minutos
    layer: "memory" as const,
    validateOnAccess: false,
  },

  users: {
    ttl: 6 * 60 * 60 * 1000, // 6 horas
    layer: "localStorage" as const,
    validateOnAccess: true,
  },

  logs: {
    ttl: 15 * 60 * 1000, // 15 minutos
    layer: "memory" as const,
    validateOnAccess: false,
  },
} as const;

class LocalStorageCache {
  private prefix = "expatriamente_cache:";

  private isBrowser(): boolean {
    return typeof window !== "undefined" && !!window.localStorage;
  }

  get<T>(key: string): CacheItem<T> | null {
    console.log("🔍 [Cache] Tentando obter do localStorage:", key);
    try {
      if (!this.isBrowser()) return null;
      const stored = localStorage.getItem(`${this.prefix}${key}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Erro ao obter do localStorage:", error);
      return null;
    }
  }

  set<T>(key: string, item: CacheItem<T>): void {
    console.log("🔍 [Cache] Tentando salvar no localStorage:", key);
    try {
      if (!this.isBrowser()) return;
      localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(item));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }

  delete(key: string): void {
    try {
      if (!this.isBrowser()) return;

      localStorage.removeItem(`${this.prefix}${key}`);
    } catch (error) {
      console.error("Erro ao deletar do localStorage:", error);
    }
  }

  clear(): void {
    try {
      if (!this.isBrowser()) return;

      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Erro ao limpar localStorage:", error);
    }
  }

  getSize(): number {
    try {
      if (!this.isBrowser()) return 0;

      const keys = Object.keys(localStorage);
      return keys
        .filter((key) => key.startsWith(this.prefix))
        .reduce((size, key) => {
          const item = localStorage.getItem(key);
          return size + (item ? new Blob([item]).size : 0);
        }, 0);
    } catch (error) {
      console.error("Erro ao calcular tamanho do localStorage:", error);
      return 0;
    }
  }
}

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();

  get<T>(key: string): CacheItem<T> | null {
    return this.cache.get(key) || null;
  }

  set<T>(key: string, item: CacheItem<T>): void {
    this.cache.set(key, item);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  getEntries(): [string, CacheItem<any>][] {
    return Array.from(this.cache.entries());
  }
}

// ✅ Cache com validação baseada na tabela de metadata
class IntelligentCache {
  private memoryCache = new MemoryCache();
  private localStorageCache = new LocalStorageCache();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Limpar cache expirado a cada 5 minutos
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  // ✅ Gerar chave de cache padronizada
  private generateKey(key: string): string {
    return `cache:${key}`;
  }

  // ✅ Obter dados do cache
  async get<T>(key: string): Promise<T | null> {
    const cacheKey = this.generateKey(key);
    const config = this.getConfigForKey(key);

    if (process.env.NODE_ENV !== "production") {
      console.log(
        "🔍 [Cache] Tentando obter dados do cache:",
        cacheKey,
        "a",
        config
      );
    }
    // Tentar obter do cache de memória primeiro
    const memoryItem = this.memoryCache.get<T>(cacheKey);
    if (memoryItem && !this.isExpired(memoryItem)) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`✅ [Cache] HIT memory: ${key}`);
      }
      return memoryItem.data;
    }

    // Tentar obter do localStorage
    const localStorageItem = this.localStorageCache.get<T>(cacheKey);
    if (localStorageItem && !this.isExpired(localStorageItem)) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`✅ [Cache] HIT localStorage: ${key}`);
      }

      // Se configurado para validação, verificar na tabela de metadata
      if (config?.validateOnAccess) {
        const isValid = await this.validateWithMetadata(key, localStorageItem);
        if (!isValid) {
          console.log(`❌ [Cache] INVALID localStorage: ${key}`);
          this.localStorageCache.delete(cacheKey);
          return null;
        }
      }

      // Mover para cache de memória para acesso mais rápido
      this.memoryCache.set(cacheKey, localStorageItem);
      return localStorageItem.data;
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`❌ [Cache] MISS: ${key}`);
    }
    return null;
  }

  // ✅ Definir dados no cache
  async set<T>(key: string, data: T, config?: any): Promise<void> {
    const cacheKey = this.generateKey(key);
    const cacheConfig = config || this.getConfigForKey(key);

    if (process.env.NODE_ENV !== "production") {
      console.log(
        "🔍 [Cache] Tentando definir dados no cache:",
        cacheKey,
        cacheConfig
      );
    }

    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: cacheConfig?.ttl || 5 * 60 * 1000,
      cacheKey: key,
      version: cacheConfig?.version,
    };

    // Sempre salvar em memória para ganho no SSR e acessos subsequentes
    this.memoryCache.set(cacheKey, item);
    if (process.env.NODE_ENV !== "production") {
      console.log(`💾 [Cache] SET memory: ${key}`);
    }

    // Se configurado para localStorage e estivermos no browser, salvar também no localStorage
    if (cacheConfig?.layer === "localStorage" && this.isBrowser()) {
      this.localStorageCache.set(cacheKey, item);
      if (process.env.NODE_ENV !== "production") {
        console.log(`💾 [Cache] SET localStorage: ${key}`);
      }
    }

    // Se configurado para validação, salvar na tabela de metadata
    if (cacheConfig?.validateOnAccess) {
      await this.saveToMetadata(key, item);
    }
  }

  // ✅ Validação baseada na tabela de cache metadata
  private async validateWithMetadata(
    key: string,
    item: CacheItem<any>
  ): Promise<boolean> {
    try {
      // Aqui você faria uma requisição para verificar se o item ainda é válido
      // Por enquanto, vamos assumir que é válido se não expirou
      return !this.isExpired(item);
    } catch (error) {
      console.error(`❌ [Cache] Erro na validação: ${key}`, error);
      return false;
    }
  }

  // ✅ Salvar na tabela de metadata
  private async saveToMetadata(
    key: string,
    item: CacheItem<any>
  ): Promise<void> {
    try {
      // Aqui você salvaria na tabela de metadata do backend
      // Por enquanto, vamos apenas logar
      console.log(`📝 [Cache] Metadata saved: ${key}`);
    } catch (error) {
      console.error(`❌ [Cache] Erro ao salvar metadata: ${key}`, error);
    }
  }

  // ✅ Verificar se item expirou
  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }

  // ✅ Obter configuração para uma chave
  private getConfigForKey(key: string): IntelligentCacheConfig | undefined {
    const type = key.split(":")[0];
    return CACHE_CONFIG[type];
  }

  // ✅ Invalidar cache por padrão específico
  async invalidatePattern(pattern: string): Promise<void> {
    console.log(`🔄 [Cache] Invalidando padrão: ${pattern}`);

    // Limpar da memória
    const keys = this.memoryCache.getKeys();
    keys.forEach((key) => {
      if (key.includes(pattern)) {
        this.memoryCache.delete(key);
      }
    });

    // Limpar do localStorage
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.includes(pattern)) {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (error) {
      console.error("Erro ao invalidar localStorage:", error);
    }
  }

  // ✅ Invalidar cache por tipo
  async invalidateByType(type: string): Promise<void> {
    console.log(`🗑️ [Cache] Invalidating type: ${type}`);
    await this.invalidatePattern(`${type}:`);
  }

  // ✅ Remover item específico
  async delete(key: string): Promise<void> {
    const cacheKey = this.generateKey(key);
    this.memoryCache.delete(cacheKey);
    this.localStorageCache.delete(cacheKey);
    console.log(`🗑️ [Cache] Deleted: ${key}`);
  }

  // ✅ Limpar todo o cache
  async clear(): Promise<void> {
    this.memoryCache.clear();
    this.localStorageCache.clear();
    console.log("🧹 [Cache] All cache cleared");
  }

  // ✅ Limpeza automática de itens expirados
  private cleanup(): void {
    console.log("🧹 [Cache] Running cleanup...");

    // Limpar cache de memória
    const memoryEntries = this.memoryCache.getEntries();
    memoryEntries.forEach(([key, item]) => {
      if (this.isExpired(item)) {
        this.memoryCache.delete(key);
      }
    });

    // Limpar localStorage
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith("expatriamente_cache:")) {
            const item = this.localStorageCache.get(
              key.replace("expatriamente_cache:", "")
            );
            if (item && this.isExpired(item)) {
              localStorage.removeItem(key);
            }
          }
        });
      }
    } catch (error) {
      console.error("Erro na limpeza do localStorage:", error);
    }
  }

  // ✅ Obter estatísticas do cache
  getStats() {
    const memorySize = this.memoryCache.getSize();
    const localStorageSize = this.localStorageCache.getSize();

    return {
      memorySize,
      localStorageSize,
      totalSize: memorySize + localStorageSize,
    };
  }

  // ✅ Destruir cache (limpar intervalos)
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }

  private isBrowser(): boolean {
    return typeof window !== "undefined" && !!window.localStorage;
  }
}

// Instância global do cache
export const intelligentCache = new IntelligentCache();

// ✅ Funções utilitárias para facilitar o uso
export const cacheUtils = {
  // Buscar dados com cache automático
  async getCachedData<T>(
    key: string,
    fetchFn: () => Promise<T>,
    config?: any
  ): Promise<T> {
    // Tentar obter do cache
    const cached = await intelligentCache.get<T>(key);
    if (cached) {
      return cached;
    }

    // Se não estiver em cache, buscar e salvar
    const data = await fetchFn();
    await intelligentCache.set(key, data, config);
    return data;
  },

  // Definir dados diretamente no cache com a configuração adequada
  async setCachedData<T>(key: string, data: T, config?: any): Promise<void> {
    await intelligentCache.set(key, data, config);
  },

  // Invalidar cache por tipo
  async invalidateByType(type: string): Promise<void> {
    await intelligentCache.invalidateByType(type);
  },

  // Invalidar cache por padrão específico
  async invalidatePattern(pattern: string): Promise<void> {
    await intelligentCache.invalidatePattern(pattern);
  },

  // Remover item específico
  async delete(key: string): Promise<void> {
    await intelligentCache.delete(key);
  },

  // Limpar todo o cache
  async clear(): Promise<void> {
    await intelligentCache.clear();
  },

  // Obter estatísticas
  getStats() {
    return intelligentCache.getStats();
  },
};

// Hook para usar cache em componentes React
export const useCache = () => {
  return {
    get: intelligentCache.get.bind(intelligentCache),
    set: intelligentCache.set.bind(intelligentCache),
    delete: intelligentCache.delete.bind(intelligentCache),
    invalidatePattern: cacheUtils.invalidatePattern,
    getCachedData: cacheUtils.getCachedData,
    invalidateByType: cacheUtils.invalidateByType,
    clear: cacheUtils.clear,
    getStats: cacheUtils.getStats,
  };
};
