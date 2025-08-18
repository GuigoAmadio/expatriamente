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

type IntelligentCacheConfig = CacheConfigWithValidation | CacheConfigWithoutValidation;

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
    layer: "memory" as const,
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
} as const;

class LocalStorageCache {
  private prefix = "expatriamente_cache:";

  get<T>(key: string): CacheItem<T> | null {
    try {
      const stored = localStorage.getItem(`${this.prefix}${key}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Erro ao obter do localStorage:", error);
      return null;
    }
  }

  set<T>(key: string, item: CacheItem<T>): void {
    try {
      localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(item));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }

  delete(key: string): void {
    try {
      localStorage.removeItem(`${this.prefix}${key}`);
    } catch (error) {
      console.error("Erro ao remover do localStorage:", error);
    }
  }

  clear(): void {
    try {
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
}

export class IntelligentCache {
  private memoryCache = new Map<string, CacheItem<any>>();
  private localStorageCache: LocalStorageCache;
  private maxMemorySize = 100;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    this.localStorageCache = new LocalStorageCache();

    // Limpeza automática a cada 5 minutos
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  // ✅ Cache com validação baseada na tabela de metadata
  async get<T>(key: string, config?: IntelligentCacheConfig): Promise<T | null> {
    try {
      console.log(`🔍 [IntelligentCache] Buscando chave: ${key}`);
      console.log(
        `📊 [IntelligentCache] Stats atuais - Memória: ${this.memoryCache.size} items`
      );

      // 1. Tentar memória primeiro (mais rápido)
      const memoryItem = this.memoryCache.get(key);
      if (memoryItem) {
        console.log(`🎯 [IntelligentCache] Item encontrado em memória: ${key}`);
        const isValid = await this.isValid(memoryItem);
        if (isValid) {
          console.log(
            `✅ [IntelligentCache] HIT válido em memória para: ${key}`
          );
          return memoryItem.data as T;
        } else {
          console.log(
            `⏰ [IntelligentCache] Item em memória expirado/inválido: ${key}`
          );
          this.memoryCache.delete(key);
        }
      }

      // 2. Tentar localStorage
      if (typeof window !== "undefined") {
        console.log(`💾 [IntelligentCache] Tentando localStorage para: ${key}`);
        const localItem = this.localStorageCache.get<T>(key);
        if (localItem) {
          console.log(
            `🎯 [IntelligentCache] Item encontrado em localStorage: ${key}`
          );
          const isValid = await this.isValid(localItem);
          if (isValid) {
            console.log(
              `✅ [IntelligentCache] HIT válido em localStorage para: ${key}`
            );
            // Promover para memória para acesso mais rápido
            this.memoryCache.set(key, localItem);
            console.log(
              `⬆️ [IntelligentCache] Item promovido para memória: ${key}`
            );
            return localItem.data;
          } else {
            console.log(
              `⏰ [IntelligentCache] Item em localStorage expirado/inválido: ${key}`
            );
            this.localStorageCache.delete(key);
          }
        } else {
          console.log(
            `❌ [IntelligentCache] Item não encontrado em localStorage: ${key}`
          );
        }
      }

      console.log(`❌ [IntelligentCache] MISS completo para: ${key}`);
      return null;
    } catch (error) {
      console.error(
        `❌ [IntelligentCache] Erro ao obter cache para ${key}:`,
        error
      );
      return null;
    }
  }

  // ✅ Validação baseada na tabela de cache metadata
  private async isValid<T>(item: CacheItem<T>): Promise<boolean> {
    try {
      // 1. Verificar TTL primeiro (mais rápido)
      const isNotExpired = Date.now() - item.timestamp < item.ttl;
      if (!isNotExpired) {
        console.log(`⏰ [Cache] Cache expirado: ${item.cacheKey}`);
        return false;
      }

      // 2. Se tem validação configurada, verificar na tabela de metadata
      const cacheType = item.cacheKey.split(":")[0];
      const config = CACHE_CONFIG[cacheType];

      // Verificação de tipo segura para validateOnAccess
      if (config && config.validateOnAccess === true) {
        console.log(`🔄 [Cache] Validando freshness para: ${item.cacheKey}`);

        const response = await fetch(`/api/cache/metadata/${cacheType}`, {
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        if (!response.ok) {
          console.warn(
            `⚠️ [Cache] Erro ao validar metadata: ${response.status}`
          );
          return true; // Em caso de erro, considerar válido
        }

        const { data } = await response.json();
        const { last_updated } = data;

        const cacheDate = new Date(item.timestamp);
        const dbLastUpdated = new Date(last_updated);

        const isValid = cacheDate >= dbLastUpdated;
        console.log(`🔍 [Cache] Validação ${item.cacheKey}:`, {
          cacheDate: cacheDate.toISOString(),
          dbLastUpdated: dbLastUpdated.toISOString(),
          isValid,
        });

        return isValid;
      }

      return true; // Não tem validação configurada
    } catch (error) {
      console.warn(
        "❌ [Cache] Erro ao validar cache, considerando válido:",
        error
      );
      return true; // Em caso de erro, considerar válido
    }
  }

  // ✅ Salvar em ambas as camadas
  async set<T>(key: string, data: T, config?: IntelligentCacheConfig): Promise<void> {
    try {
      const ttl = config?.ttl || CACHE_CONFIG.dashboard.ttl;
      const layer = config?.layer || "memory";
      const cacheKey = key.split(":")[0]; // employees:list -> employees

      console.log(`💾 [IntelligentCache] Salvando chave: ${key}`);
      console.log(
        `📋 [IntelligentCache] Configuração: TTL=${ttl}ms, Layer=${layer}, Type=${cacheKey}`
      );
      console.log(
        `📦 [IntelligentCache] Tamanho dos dados: ${
          JSON.stringify(data).length
        } chars`
      );

      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl,
        cacheKey,
        version: config?.version,
      };

      // Sempre salvar em memória para acesso rápido
      this.memoryCache.set(key, item);
      console.log(`✅ [IntelligentCache] Salvo em memória: ${key}`);

      // Se configurado para localStorage, salvar lá também
      if (layer === "localStorage" && typeof window !== "undefined") {
        this.localStorageCache.set(key, item);
        console.log(`✅ [IntelligentCache] Salvo em localStorage: ${key}`);
      }

      // Implementar LRU para memória
      if (this.memoryCache.size > this.maxMemorySize) {
        const firstKey = this.memoryCache.keys().next().value;
        if (firstKey) {
          this.memoryCache.delete(firstKey);
          console.log(
            `🗑️ [IntelligentCache] LRU - Removido da memória: ${firstKey}`
          );
        }
      }

      console.log(
        `📊 [IntelligentCache] Cache stats após set - Memória: ${this.memoryCache.size}/${this.maxMemorySize}`
      );
    } catch (error) {
      console.error(
        `❌ [IntelligentCache] Erro ao definir cache para ${key}:`,
        error
      );
    }
  }

  // ✅ Invalidar cache por padrão
  async invalidatePattern(pattern: string): Promise<void> {
    try {
      console.log(`🗑️ [IntelligentCache] Invalidando padrão: ${pattern}`);
      console.log(
        `📊 [IntelligentCache] Estado antes - Memória: ${this.memoryCache.size} items`
      );

      let memoryCount = 0;
      let localStorageCount = 0;
      const removedKeys: string[] = [];

      // Invalidar em memória
      for (const key of this.memoryCache.keys()) {
        if (key.includes(pattern)) {
          this.memoryCache.delete(key);
          memoryCount++;
          removedKeys.push(key);
          console.log(`🗑️ [IntelligentCache] Removido da memória: ${key}`);
        }
      }

      // Invalidar em localStorage
      if (typeof window !== "undefined") {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          if (key.startsWith("expatriamente_cache:") && key.includes(pattern)) {
            localStorage.removeItem(key);
            localStorageCount++;
            removedKeys.push(key);
            console.log(
              `🗑️ [IntelligentCache] Removido do localStorage: ${key}`
            );
          }
        }
      }

      console.log(
        `✅ [IntelligentCache] Invalidação concluída para padrão: ${pattern}`
      );
      console.log(
        `📊 [IntelligentCache] Resultados: Memória=${memoryCount}, localStorage=${localStorageCount}`
      );
      console.log(`📋 [IntelligentCache] Chaves removidas:`, removedKeys);
      console.log(
        `📊 [IntelligentCache] Estado depois - Memória: ${this.memoryCache.size} items`
      );
    } catch (error) {
      console.error(
        `❌ [IntelligentCache] Erro ao invalidar cache por padrão ${pattern}:`,
        error
      );
    }
  }

  // ✅ Invalidar cache por tipo
  async invalidateByType(type: keyof typeof CACHE_CONFIG): Promise<void> {
    await this.invalidatePattern(type);
  }

  // ✅ Deletar chave específica
  async delete(key: string): Promise<void> {
    try {
      this.memoryCache.delete(key);
      if (typeof window !== "undefined") {
        this.localStorageCache.delete(key);
      }
    } catch (error) {
      console.error("Erro ao remover cache:", error);
    }
  }

  // ✅ Limpar todo o cache
  async clear(): Promise<void> {
    try {
      this.memoryCache.clear();
      if (typeof window !== "undefined") {
        this.localStorageCache.clear();
      }
    } catch (error) {
      console.error("Erro ao limpar cache:", error);
    }
  }

  // ✅ Limpeza automática
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
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith("expatriamente_cache:")) {
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

  // ✅ Obter estatísticas do cache
  getStats() {
    const memorySize = this.memoryCache.size;
    let localStorageSize = 0;

    if (typeof window !== "undefined") {
      const keys = Object.keys(localStorage);
      localStorageSize = keys.filter((key) =>
        key.startsWith("expatriamente_cache:")
      ).length;
    }

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
  }
}

// Instância global do cache
export const intelligentCache = new IntelligentCache();

// ✅ Funções utilitárias para facilitar o uso
export const cacheUtils = {
  // Buscar dados com cache automático + validação
  async getCachedData<T>(
    key: string,
    fetchFn: () => Promise<T>,
    config?: IntelligentCacheConfig
  ): Promise<T> {
    // Tentar obter do cache
    const cached = await intelligentCache.get<T>(key, config);
    if (cached) {
      return cached;
    }

    // Se não estiver em cache, buscar e salvar
    console.log(`🔄 [Cache] Buscando dados frescos para: ${key}`);
    const data = await fetchFn();
    await intelligentCache.set(key, data, config);
    return data;
  },

  // Invalidar cache por tipo
  async invalidateByType(type: keyof typeof CACHE_CONFIG): Promise<void> {
    await intelligentCache.invalidateByType(type);
  },

  // Invalidar cache por padrão específico
  async invalidatePattern(pattern: string): Promise<void> {
    await intelligentCache.invalidatePattern(pattern);
  },

  // Deletar chave específica
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
