"use client";

import { useState, useEffect } from "react";
import { useCache } from "@/lib/cache";
import { advancedCache } from "@/lib/cache";

interface CacheStats {
  memorySize: number;
  localStorageSize: number;
  totalSize: number;
}

interface PerformanceMetrics {
  timestamp: string;
  route: string;
  loadTime: number;
  cacheHits: number;
  cacheMisses: number;
}

export function CacheDebug() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const cache = useCache();

  useEffect(() => {
    const updateStats = () => {
      const cacheStats = advancedCache.getStats();
      setStats(cacheStats);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // Atualizar a cada 5 segundos

    return () => clearInterval(interval);
  }, [cache]);

  const clearCache = async () => {
    await advancedCache.clear();
    setStats(advancedCache.getStats());
  };

  const addPerformanceMetric = (route: string, loadTime: number) => {
    const newMetric: PerformanceMetrics = {
      timestamp: new Date().toISOString(),
      route,
      loadTime,
      cacheHits: 0, // Implementar contadores
      cacheMisses: 0,
    };

    setMetrics((prev) => [...prev.slice(-9), newMetric]); // Manter apenas os últimos 10
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg z-50"
        title="Debug Cache"
      >
        🔧
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Cache Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {stats && (
        <div className="space-y-2 mb-4">
          <div className="text-sm">
            <span className="font-medium">Memória:</span> {stats.memorySize}{" "}
            itens
          </div>
          <div className="text-sm">
            <span className="font-medium">LocalStorage:</span>{" "}
            {stats.localStorageSize} itens
          </div>
          <div className="text-sm">
            <span className="font-medium">Total:</span> {stats.totalSize} itens
          </div>
        </div>
      )}

      <div className="space-y-2 mb-4">
        <h4 className="font-medium text-sm text-gray-700">
          Performance Recente
        </h4>
        {metrics.length > 0 ? (
          <div className="space-y-1">
            {metrics.map((metric, index) => (
              <div key={index} className="text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>{metric.route}</span>
                  <span
                    className={
                      metric.loadTime > 1000 ? "text-red-500" : "text-green-500"
                    }
                  >
                    {metric.loadTime}ms
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-gray-500">
            Nenhuma métrica registrada
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={clearCache}
          className="w-full bg-red-500 text-white text-sm py-1 px-2 rounded hover:bg-red-600"
        >
          Limpar Cache
        </button>

        <button
          onClick={() => {
            // Implementar prefetch manual
            cache.prefetchMainData();
          }}
          className="w-full bg-green-500 text-white text-sm py-1 px-2 rounded hover:bg-green-600"
        >
          Prefetch Dados
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <div>Última atualização: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

// Hook para monitorar performance de rotas
export function usePerformanceMonitor() {
  const addMetric = (route: string, loadTime: number) => {
    // Implementar lógica de monitoramento
    console.log(`Performance: ${route} - ${loadTime}ms`);
  };

  return { addMetric };
}
