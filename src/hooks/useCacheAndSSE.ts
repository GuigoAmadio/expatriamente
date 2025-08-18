import { useState, useEffect, useCallback, useRef } from "react";
import { cacheSSE } from "@/lib/cache-sse-connector";
import { intelligentCache, cacheUtils } from "@/lib/intelligent-cache";
import { intelligentPrefetch } from "@/lib/intelligent-prefetch";

interface SSEConnectionStatus {
  isConnected: boolean;
  reconnectAttempts: number;
  readyState?: number;
  lastEvent?: Date;
}

interface CacheUpdateEvent {
  type: "invalidate" | "invalidate_type" | "update" | "delete";
  pattern: string;
  timestamp: string;
  metadata?: any;
}

// ✅ Hook principal para Cache e SSE
export const useCacheAndSSE = () => {
  const [connectionStatus, setConnectionStatus] = useState<SSEConnectionStatus>(
    {
      isConnected: false,
      reconnectAttempts: 0,
    }
  );
  const [lastCacheUpdate, setLastCacheUpdate] =
    useState<CacheUpdateEvent | null>(null);
  const [cacheStats, setCacheStats] = useState(intelligentCache.getStats());
  const isInitialized = useRef(false);

  // ✅ Conectar SSE automaticamente
  useEffect(() => {
    if (isInitialized.current) {
      console.log("⚠️ [useCacheAndSSE] Hook já inicializado, pulando...");
      return;
    }
    isInitialized.current = true;

    console.log("🚀 [useCacheAndSSE] Inicializando hook de cache e SSE...");
    console.log("🔌 [useCacheAndSSE] Conectando ao SSE...");

    // Conectar SSE
    cacheSSE.connect();

    // Escutar eventos de conexão SSE
    const handleConnectionChange = (event: CustomEvent) => {
      const { status, attempts, timestamp } = event.detail;

      console.log(`📡 [useCacheAndSSE] Evento de conexão recebido:`);
      console.log(
        `📋 [useCacheAndSSE] Status: ${status}, Tentativas: ${attempts}, Timestamp: ${timestamp}`
      );

      setConnectionStatus((prev) => ({
        ...prev,
        isConnected: status === "connected",
        reconnectAttempts: attempts || 0,
        readyState: cacheSSE.getConnectionStatus().readyState,
      }));

      console.log(
        `✅ [useCacheAndSSE] Estado de conexão atualizado: ${status}`
      );
    };

    // Escutar eventos de cache
    const handleCacheUpdate = (event: CustomEvent) => {
      const updateEvent: CacheUpdateEvent = event.detail;

      console.log(`🔄 [useCacheAndSSE] Evento de cache recebido:`);
      console.log(
        `📋 [useCacheAndSSE] Tipo: ${updateEvent.type}, Padrão: ${updateEvent.pattern}`
      );
      console.log(`⏰ [useCacheAndSSE] Timestamp: ${updateEvent.timestamp}`);
      console.log(`🏷️ [useCacheAndSSE] Metadata:`, updateEvent.metadata);

      setLastCacheUpdate(updateEvent);
      setCacheStats(intelligentCache.getStats());

      console.log(
        `✅ [useCacheAndSSE] Estado de cache atualizado após evento ${updateEvent.type}`
      );
    };

    // Atualizar estatísticas periodicamente
    const statsInterval = setInterval(() => {
      setCacheStats(intelligentCache.getStats());
    }, 10000); // A cada 10 segundos

    // Registrar listeners
    window.addEventListener(
      "sse-connection-change",
      handleConnectionChange as EventListener
    );
    window.addEventListener(
      "cache-updated",
      handleCacheUpdate as EventListener
    );

    return () => {
      cacheSSE.disconnect();
      clearInterval(statsInterval);
      window.removeEventListener(
        "sse-connection-change",
        handleConnectionChange as EventListener
      );
      window.removeEventListener(
        "cache-updated",
        handleCacheUpdate as EventListener
      );
    };
  }, []);

  // ✅ Forçar reconexão SSE
  const forceReconnect = useCallback(() => {
    console.log("🔄 [Cache Hook] Forçando reconexão SSE...");
    cacheSSE.forceReconnect();
  }, []);

  // ✅ Invalidar cache específico
  const invalidateCache = useCallback(async (pattern: string) => {
    console.log(`🗑️ [Cache Hook] Invalidando cache: ${pattern}`);
    await intelligentCache.invalidatePattern(pattern);
    setCacheStats(intelligentCache.getStats());
  }, []);

  // ✅ Invalidar cache por tipo
  const invalidateCacheByType = useCallback(async (type: string) => {
    console.log(`🗑️ [Cache Hook] Invalidando tipo: ${type}`);
    await intelligentCache.invalidateByType(type as any);
    setCacheStats(intelligentCache.getStats());
  }, []);

  // ✅ Limpar todo o cache
  const clearAllCache = useCallback(async () => {
    console.log("🧹 [Cache Hook] Limpando todo o cache...");
    await intelligentCache.clear();
    setCacheStats(intelligentCache.getStats());
  }, []);

  // ✅ Obter dados do cache
  const getCachedData = useCallback(
    async <T>(key: string): Promise<T | null> => {
      return await intelligentCache.get<T>(key);
    },
    []
  );

  // ✅ Definir dados no cache
  const setCachedData = useCallback(
    async <T>(key: string, data: T, config?: any) => {
      await intelligentCache.set(key, data, config);
      setCacheStats(intelligentCache.getStats());
    },
    []
  );

  return {
    // Status da conexão
    isSSEConnected: connectionStatus.isConnected,
    connectionStatus,
    lastCacheUpdate,

    // Estatísticas do cache
    cacheStats,

    // Funções de controle
    forceReconnect,
    invalidateCache,
    invalidateCacheByType,
    clearAllCache,
    getCachedData,
    setCachedData,
  };
};

// ✅ Hook para prefetch inteligente
export const usePrefetch = () => {
  const [prefetchStats, setPrefetchStats] = useState(
    intelligentPrefetch.getStats()
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Atualizar estatísticas periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setPrefetchStats(intelligentPrefetch.getStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Executar prefetch essencial
  const prefetchEssential = useCallback(
    async (userRole: string) => {
      if (isInitialized) {
        console.log("⏭️ [Prefetch Hook] Prefetch já inicializado, ignorando");
        return;
      }

      setIsInitialized(true);

      console.log(
        `🚀 [Prefetch Hook] Iniciando prefetch essencial para: ${userRole}`
      );
      await intelligentPrefetch.prefetchEssential(userRole);
      setPrefetchStats(intelligentPrefetch.getStats());
    },
    [isInitialized]
  );

  // ✅ Executar prefetch secundário
  const prefetchSecondary = useCallback(async (userRole: string) => {
    console.log(
      `🔄 [Prefetch Hook] Iniciando prefetch secundário para: ${userRole}`
    );
    await intelligentPrefetch.prefetchSecondary(userRole);
    setPrefetchStats(intelligentPrefetch.getStats());
  }, []);

  // ✅ Prefetch por rota
  const prefetchByRoute = useCallback(async (route: string) => {
    console.log(`📍 [Prefetch Hook] Prefetch para rota: ${route}`);
    await intelligentPrefetch.prefetchByRoute(route);
    setPrefetchStats(intelligentPrefetch.getStats());
  }, []);

  // ✅ Cancelar todos os prefetches
  const cancelAllPrefetches = useCallback(() => {
    console.log("❌ [Prefetch Hook] Cancelando todos os prefetches...");
    intelligentPrefetch.cancelAllPrefetches();
    setPrefetchStats(intelligentPrefetch.getStats());
  }, []);

  return {
    prefetchEssential,
    prefetchSecondary,
    prefetchByRoute,
    cancelAllPrefetches,
    prefetchStats,
    isInitialized,
  };
};

// ✅ Hook para validação de cache
export const useCacheValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidation, setLastValidation] = useState<Date | null>(null);

  // ✅ Validar cache após login
  const validateCacheAfterLogin = useCallback(async () => {
    if (isValidating) {
      console.log("⏳ [Cache Validation] Validação já em andamento, ignorando");
      return;
    }

    setIsValidating(true);

    try {
      console.log("🔍 [Cache Validation] Iniciando validação pós-login...");

      // Verificar estatísticas atuais
      const stats = intelligentCache.getStats();
      console.log("📊 [Cache Validation] Estatísticas atuais:", stats);

      if (stats.totalSize > 0) {
        console.log("🧹 [Cache Validation] Limpando cache antigo...");
        await intelligentCache.clear();
      }

      setLastValidation(new Date());
      console.log("✅ [Cache Validation] Validação pós-login concluída");
    } catch (error) {
      console.error(
        "❌ [Cache Validation] Erro durante validação pós-login:",
        error
      );
    } finally {
      setIsValidating(false);
    }
  }, [isValidating]);

  // ✅ Validar cache específico
  const validateSpecificCache = useCallback(async (cacheKey: string) => {
    try {
      console.log(`🔍 [Cache Validation] Validando cache: ${cacheKey}`);

      const cached = await intelligentCache.get(cacheKey);
      if (!cached) {
        console.log(`❌ [Cache Validation] Cache não encontrado: ${cacheKey}`);
        return false;
      }

      console.log(`✅ [Cache Validation] Cache válido: ${cacheKey}`);
      return true;
    } catch (error) {
      console.error(
        `❌ [Cache Validation] Erro ao validar cache ${cacheKey}:`,
        error
      );
      return false;
    }
  }, []);

  return {
    validateCacheAfterLogin,
    validateSpecificCache,
    isValidating,
    lastValidation,
  };
};

// ✅ Hook para monitoramento de performance
export const useCachePerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    hitRate: 0,
    missRate: 0,
    avgResponseTime: 0,
    totalRequests: 0,
  });

  const [requestTimes, setRequestTimes] = useState<
    Array<{
      key: string;
      startTime: number;
      endTime: number;
      hit: boolean;
    }>
  >([]);

  // ✅ Registrar tempo de requisição
  const recordRequestTime = useCallback(
    (key: string, startTime: number, endTime: number, hit: boolean) => {
      setRequestTimes((prev) => {
        const newTimes = [...prev, { key, startTime, endTime, hit }];

        // Manter apenas os últimos 100 registros
        if (newTimes.length > 100) {
          newTimes.splice(0, newTimes.length - 100);
        }

        return newTimes;
      });
    },
    []
  );

  // ✅ Calcular métricas
  useEffect(() => {
    if (requestTimes.length === 0) return;

    const hits = requestTimes.filter((r) => r.hit).length;
    const misses = requestTimes.length - hits;
    const hitRate = (hits / requestTimes.length) * 100;
    const missRate = (misses / requestTimes.length) * 100;

    const totalTime = requestTimes.reduce(
      (sum, r) => sum + (r.endTime - r.startTime),
      0
    );
    const avgResponseTime = totalTime / requestTimes.length;

    setPerformanceMetrics({
      hitRate: Math.round(hitRate),
      missRate: Math.round(missRate),
      avgResponseTime: Math.round(avgResponseTime),
      totalRequests: requestTimes.length,
    });
  }, [requestTimes]);

  return {
    performanceMetrics,
    recordRequestTime,
    requestTimes: requestTimes.slice(-10), // Últimos 10 para debug
  };
};
