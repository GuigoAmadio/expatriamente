// ✅ Componente de Debug para Custom SSE
"use client";

import { useState } from "react";
import { useCustomSSE, useCachePerformance } from "@/hooks/useCustomSSE";

export default function CustomCacheDebug() {
  const [activeTab, setActiveTab] = useState<
    "cache" | "sse" | "requests" | "performance"
  >("sse");

  const {
    isSSEConnected,
    reconnectAttempts,
    readyState,
    lastEvent,
    lastCacheUpdate,
    reconnect,
    disconnect,
    enable,
    disable,
    getStatus,
  } = useCustomSSE();

  const cacheStats = useCachePerformance();

  const tabs = [
    { id: "cache", label: "📦 Cache", icon: "📦" },
    { id: "sse", label: "📡 SSE", icon: "📡" },
    { id: "requests", label: "🌐 Requests", icon: "🌐" },
    { id: "performance", label: "⚡ Performance", icon: "⚡" },
  ];

  const getReadyStateText = (state?: number) => {
    switch (state) {
      case 0:
        return "Conectando";
      case 1:
        return "Conectado";
      case 2:
        return "Fechado";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          🔧 Custom SSE Debug
        </h3>
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2 py-1 text-xs rounded ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </div>

      {/* SSE Tab */}
      {activeTab === "sse" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <span
              className={`px-2 py-1 text-xs rounded ${
                isSSEConnected
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isSSEConnected ? "✅ Conectado" : "❌ Desconectado"}
            </span>
          </div>

          <div className="text-sm space-y-1">
            <div>Ready State: {getReadyStateText(readyState)}</div>
            <div>Tentativas: {reconnectAttempts}/5</div>
            {lastEvent && (
              <div>Último Evento: {lastEvent.toLocaleTimeString()}</div>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={reconnect}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Reconectar
            </button>
            <button
              onClick={disconnect}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
              Desconectar
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={enable}
              className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
            >
              Habilitar
            </button>
            <button
              onClick={disable}
              className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
            >
              Desabilitar
            </button>
          </div>

          {!isSSEConnected && (
            <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
              ⚠️ SSE desconectado. Verifique se o usuário está logado e o
              backend está rodando.
            </div>
          )}

          {lastCacheUpdate && (
            <div className="bg-blue-50 p-2 rounded text-xs">
              <div className="font-medium">Último Evento SSE:</div>
              <div>Tipo: {lastCacheUpdate.type}</div>
              <div>Padrão: {lastCacheUpdate.pattern}</div>
              <div>
                Timestamp:{" "}
                {new Date(lastCacheUpdate.timestamp).toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cache Tab */}
      {activeTab === "cache" && (
        <div className="space-y-3">
          <div className="text-sm space-y-1">
            <div>Hits: {cacheStats.hits}</div>
            <div>Misses: {cacheStats.misses}</div>
            <div>Hit Rate: {cacheStats.hitRate.toFixed(1)}%</div>
          </div>

          <div className="bg-gray-50 p-2 rounded text-xs">
            <div className="font-medium">Cache Local:</div>
            <div>Implementação: Intelligent Cache</div>
            <div>Status: Ativo</div>
          </div>
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-3">
          <div className="text-sm space-y-1">
            <div>
              API Base:{" "}
              {process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:3000/api/v1"}
            </div>
            <div>Ambiente: {process.env.NODE_ENV}</div>
            <div>
              Protocolo:{" "}
              {typeof window !== "undefined" ? window.location.protocol : "N/A"}
            </div>
          </div>

          <div className="bg-gray-50 p-2 rounded text-xs">
            <div className="font-medium">Configuração:</div>
            <div>SSE: Custom Implementation</div>
            <div>Auth: JWT Token</div>
            <div>Multi-tenant: Ativo</div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="space-y-3">
          <div className="text-sm space-y-1">
            <div>Reconexões: {reconnectAttempts}</div>
            <div>Estado: {getReadyStateText(readyState)}</div>
            <div>
              Última Atividade:{" "}
              {lastEvent ? lastEvent.toLocaleTimeString() : "N/A"}
            </div>
          </div>

          <div className="bg-gray-50 p-2 rounded text-xs">
            <div className="font-medium">Métricas:</div>
            <div>Heartbeat: 30s</div>
            <div>Reconexão: Exponential Backoff</div>
            <div>Max Tentativas: 5</div>
          </div>
        </div>
      )}
    </div>
  );
}
