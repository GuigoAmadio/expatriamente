"use client";

import { useState, useEffect } from "react";
import { useCacheAndSSE, useCachePerformance } from "@/hooks/useCacheAndSSE";
import { useRequestManager } from "@/hooks/useRequestManager";
import { intelligentCache } from "@/lib/intelligent-cache";
import { intelligentPrefetch } from "@/lib/intelligent-prefetch";


interface CacheDebugProps {
  isVisible?: boolean;
}

export function CacheDebug({ isVisible = false }: CacheDebugProps) {
  const [debugVisible, setDebugVisible] = useState(isVisible);
  const [activeTab, setActiveTab] = useState<
    "cache" | "sse" | "requests" | "performance"
  >("cache");

  // ✅ Hooks de monitoramento
  const {
    isSSEConnected,
    connectionStatus,
    cacheStats,
    lastCacheUpdate,
    forceReconnect,
    clearAllCache,
    invalidateCache,
  } = useCacheAndSSE();

  const { hasAnyLoading, loadingStates, requestCounts, cancelAllRequests } =
    useRequestManager();

  const { performanceMetrics, requestTimes } = useCachePerformance();

  const [prefetchStats, setPrefetchStats] = useState(
    intelligentPrefetch.getStats()
  );
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  // ✅ Atualizar estatísticas em tempo real
  useEffect(() => {
    if (debugVisible) {
      const interval = setInterval(() => {
        setPrefetchStats(intelligentPrefetch.getStats());
      }, 2000);
      setRefreshInterval(interval);

      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
    }
  }, [debugVisible, refreshInterval]);

  // ✅ Toggle visibility
  if (!debugVisible) {
    return (
      <button
        onClick={() => setDebugVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
        title="Abrir Debug Cache"
      >
        🔧
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-2xl w-96 max-h-96 overflow-hidden z-50">
      {/* ✅ Header */}
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
        <h3 className="font-bold text-gray-800">Cache Debug</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setDebugVisible(false)}
            className="text-gray-500 hover:text-gray-700 text-lg"
            title="Fechar"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ✅ Tabs */}
      <div className="flex border-b">
        {(["cache", "sse", "requests", "performance"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 text-xs font-medium ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab === "cache" && "💾 Cache"}
            {tab === "sse" && "📡 SSE"}
            {tab === "requests" && "🔄 Requests"}
            {tab === "performance" && "📊 Performance"}
            
          </button>
        ))}
      </div>

      {/* ✅ Content */}
      <div className="p-4 overflow-y-auto max-h-64">
        {/* Cache Tab */}
        {activeTab === "cache" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Memória:</span>{" "}
                {cacheStats.memorySize} items
              </div>
              <div>
                <span className="font-medium">LocalStorage:</span>{" "}
                {cacheStats.localStorageSize} items
              </div>
              <div>
                <span className="font-medium">Total:</span>{" "}
                {cacheStats.totalSize} items
              </div>
              <div>
                <span className="font-medium">Prefetch:</span>{" "}
                {prefetchStats.queueSize} na fila
              </div>
            </div>

            {lastCacheUpdate && (
              <div className="bg-yellow-50 p-2 rounded text-xs">
                <div className="font-medium">Última Atualização:</div>
                <div>Tipo: {lastCacheUpdate.type}</div>
                <div>Padrão: {lastCacheUpdate.pattern}</div>
                <div>
                  Quando:{" "}
                  {new Date(lastCacheUpdate.timestamp).toLocaleTimeString()}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={clearAllCache}
                className="w-full bg-red-500 text-white text-sm py-2 px-3 rounded hover:bg-red-600"
              >
                🗑️ Limpar Todo Cache
              </button>

              <button
                onClick={() => invalidateCache("employees")}
                className="w-full bg-orange-500 text-white text-sm py-2 px-3 rounded hover:bg-orange-600"
              >
                🗑️ Invalidar Employees
              </button>
            </div>
          </div>
        )}

        {/* SSE Tab */}
        {activeTab === "sse" && (
          <div className="space-y-3">
            <div className="space-y-2 text-sm">
              <div
                className={`p-2 rounded ${
                  isSSEConnected
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                Status: {isSSEConnected ? "✅ Conectado" : "❌ Desconectado"}
              </div>

              <div>
                <span className="font-medium">Ready State:</span>{" "}
                {connectionStatus.readyState}
              </div>

              <div>
                <span className="font-medium">Tentativas:</span>{" "}
                {connectionStatus.reconnectAttempts}
              </div>
            </div>

            {!isSSEConnected && (
              <button
                onClick={forceReconnect}
                className="w-full bg-blue-500 text-white text-sm py-2 px-3 rounded hover:bg-blue-600"
              >
                🔄 Forçar Reconexão
              </button>
            )}

            {lastCacheUpdate && (
              <div className="bg-blue-50 p-2 rounded text-xs">
                <div className="font-medium">Último Evento SSE:</div>
                <div>Tipo: {lastCacheUpdate.type}</div>
                <div>Padrão: {lastCacheUpdate.pattern}</div>
                <div>
                  Quando:{" "}
                  {new Date(lastCacheUpdate.timestamp).toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div className="space-y-3">
            <div className="text-sm">
              <div
                className={`p-2 rounded ${
                  hasAnyLoading
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Status: {hasAnyLoading ? "⏳ Carregando" : "✅ Idle"}
              </div>
            </div>

            {Object.keys(loadingStates).filter((k) => loadingStates[k]).length >
              0 && (
              <div>
                <div className="font-medium text-sm mb-2">
                  Requisições Ativas:
                </div>
                <div className="space-y-1">
                  {Object.keys(loadingStates)
                    .filter((k) => loadingStates[k])
                    .map((key) => (
                      <div
                        key={key}
                        className="bg-yellow-50 p-1 rounded text-xs"
                      >
                        <div className="font-medium">{key}</div>
                        <div>Count: {requestCounts[key] || 1}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <button
              onClick={cancelAllRequests}
              className="w-full bg-red-500 text-white text-sm py-2 px-3 rounded hover:bg-red-600"
            >
              ❌ Cancelar Todas
            </button>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === "performance" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Hit Rate:</span>{" "}
                {performanceMetrics.hitRate}%
              </div>
              <div>
                <span className="font-medium">Miss Rate:</span>{" "}
                {performanceMetrics.missRate}%
              </div>
              <div>
                <span className="font-medium">Avg Time:</span>{" "}
                {performanceMetrics.avgResponseTime}ms
              </div>
              <div>
                <span className="font-medium">Total:</span>{" "}
                {performanceMetrics.totalRequests}
              </div>
            </div>

            {requestTimes.length > 0 && (
              <div>
                <div className="font-medium text-sm mb-2">
                  Últimas Requisições:
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {requestTimes.map((req, index) => (
                    <div
                      key={index}
                      className={`p-1 rounded text-xs ${
                        req.hit ? "bg-green-50" : "bg-red-50"
                      }`}
                    >
                      <div className="font-medium">{req.key}</div>
                      <div className="flex justify-between">
                        <span>{req.hit ? "✅ HIT" : "❌ MISS"}</span>
                        <span>{req.endTime - req.startTime}ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}


      </div>

      {/* ✅ Footer */}
      <div className="p-2 bg-gray-50 border-t text-xs text-gray-500 text-center">
        Última atualização: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}

// ✅ Hook para usar o componente facilmente
export function useCacheDebug() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDebug = () => setIsVisible(!isVisible);
  const showDebug = () => setIsVisible(true);
  const hideDebug = () => setIsVisible(false);

  return {
    isVisible,
    toggleDebug,
    showDebug,
    hideDebug,
    CacheDebugComponent: () => <CacheDebug isVisible={isVisible} />,
  };
}
