// ✅ Hook para Custom SSE Connector
import { useState, useEffect, useCallback, useRef } from "react";
import { customSSE } from "@/lib/custom-sse-connector";
import type { SSEConnectionEvent, CacheUpdateEvent } from "@/types/sse-events";

// ✅ Sistema de debug (duplicado para evitar dependência circular)
const SSE_DEBUG = {
  ENABLED:
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_SSE_DEBUG === "true",
  VERBOSE: process.env.NEXT_PUBLIC_SSE_VERBOSE === "true",

  verbose: (message: string, ...args: any[]) => {
    if (SSE_DEBUG.ENABLED && SSE_DEBUG.VERBOSE) {
      console.log(message, ...args);
    }
  },
};

interface SSEConnectionStatus {
  isConnected: boolean;
  reconnectAttempts: number;
  readyState?: number;
  lastEvent?: Date;
}

// ✅ Hook principal para Custom SSE
export const useCustomSSE = (user?: any) => {
 // SSE_DEBUG.verbose("🎯 [useCustomSSE] Hook chamado com usuário:", user);
  const [connectionStatus, setConnectionStatus] = useState<SSEConnectionStatus>(
    {
      isConnected: false,
      reconnectAttempts: 0,
    }
  );
  const [lastCacheUpdate, setLastCacheUpdate] =
    useState<CacheUpdateEvent | null>(null);
  const isInitialized = useRef(false);
  const userRef = useRef(user);

  // ✅ Atualizar referência do usuário
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // ✅ Conectar SSE automaticamente quando usuário estiver autenticado
  useEffect(() => {
    // ✅ Verificar se o usuário mudou
    const currentUser = userRef.current;

//   SSE_DEBUG.verbose("🔍 [useCustomSSE] Verificando usuário:", {
//     currentUser,
//     userId: currentUser?.id,
//     userFromParam: user,
//     userParamId: user?.id,
//   });

    if (!currentUser) {
      SSE_DEBUG.verbose(
        "👤 [useCustomSSE] Usuário não autenticado, aguardando..."
      );
      // Limpar usuário do connector
      customSSE.setUser(null);
      return;
    }

    // ✅ Definir usuário no connector (JWT já contém clientId)
    const sseUser = {
      id: currentUser.id,
      email: currentUser.email,
      clientId: currentUser.clientId || "", // Para compatibilidade, mas JWT tem o valor real
      role: currentUser.role,
    };

    SSE_DEBUG.verbose(
      "👤 [useCustomSSE] Definindo usuário no connector:",
      sseUser
    );
    customSSE.setUser(sseUser);

    // ✅ Verificar se já foi inicializado para este usuário
    if (isInitialized.current) {
      console.log("⚠️ [useCustomSSE] Hook já inicializado, pulando...");
      return;
    }

    const status = customSSE.getConnectionStatus();
    if (status.reconnectAttempts >= 5) {
      console.log("🚫 [useCustomSSE] SSE com muitas tentativas, pulando...");
      return;
    }

    isInitialized.current = true;
    console.log("🚀 [useCustomSSE] Inicializando hook de custom SSE...");

    // ✅ Conectar SSE (agora é assíncrono)
    const connectSSE = async () => {
      try {
        await customSSE.connect();
      } catch (error) {
        console.error("❌ [useCustomSSE] Erro ao conectar SSE:", error);
      }
    };

    connectSSE();

    // ✅ Escutar eventos de conexão SSE
    const handleConnectionChange = (event: CustomEvent<SSEConnectionEvent>) => {
      const { status, attempts, timestamp } = event.detail;
      console.log(`📡 [useCustomSSE] Evento de conexão: ${status}`);

      setConnectionStatus((prev) => ({
        ...prev,
        isConnected: status === "connected",
        reconnectAttempts: attempts || 0,
        readyState: customSSE.getConnectionStatus().readyState,
      }));
    };

    // ✅ Escutar eventos de cache
    const handleCacheUpdate = (event: CustomEvent<CacheUpdateEvent>) => {
      const updateEvent: CacheUpdateEvent = event.detail;
      console.log(`🔄 [useCustomSSE] Evento de cache: ${updateEvent.type}`);
      setLastCacheUpdate(updateEvent);
    };

    // ✅ Adicionar event listeners
    window.addEventListener("sse-connection-change", handleConnectionChange);
    window.addEventListener("cache-update", handleCacheUpdate);

    // ✅ Cleanup
    return () => {
      window.removeEventListener(
        "sse-connection-change",
        handleConnectionChange
      );
      window.removeEventListener("cache-update", handleCacheUpdate);
    };
  }, [user]); // ✅ Usar user como dependência para detectar mudanças

  // ✅ Reset de inicialização quando usuário muda
  useEffect(() => {
    if (!user) {
      isInitialized.current = false;
    }
  }, [user]);

  // ✅ Reconectar manualmente
  const reconnect = useCallback(async () => {
    console.log("🔄 [useCustomSSE] Reconectando manualmente...");
    try {
      await customSSE.forceReconnect();
    } catch (error) {
      console.error("❌ [useCustomSSE] Erro ao reconectar:", error);
    }
  }, []);

  // ✅ Desconectar manualmente
  const disconnect = useCallback(() => {
    console.log("🔌 [useCustomSSE] Desconectando manualmente...");
    customSSE.disconnect();
  }, []);

  // ✅ Habilitar/Desabilitar
  const enable = useCallback(() => {
    console.log("✅ [useCustomSSE] Habilitando SSE...");
    customSSE.enable();
  }, []);

  const disable = useCallback(() => {
    console.log("🚫 [useCustomSSE] Desabilitando SSE...");
    customSSE.disable();
  }, []);

  // ✅ Obter status atual
  const getStatus = useCallback(() => {
    return customSSE.getConnectionStatus();
  }, []);

  return {
    // ✅ Estado da conexão
    isSSEConnected: connectionStatus.isConnected,
    reconnectAttempts: connectionStatus.reconnectAttempts,
    readyState: connectionStatus.readyState,
    lastEvent: connectionStatus.lastEvent,

    // ✅ Último evento de cache
    lastCacheUpdate,

    // ✅ Métodos de controle
    reconnect,
    disconnect,
    enable,
    disable,
    getStatus,
  };
};

// ✅ Hook para performance do cache (separado)
export const useCachePerformance = () => {
  const [cacheStats, setCacheStats] = useState({
    hits: 0,
    misses: 0,
    hitRate: 0,
  });

  useEffect(() => {
    // ✅ Atualizar estatísticas periodicamente
    const interval = setInterval(() => {
      // Aqui você pode implementar lógica para obter estatísticas do cache
      // Por enquanto, vamos simular
      setCacheStats({
        hits: Math.floor(Math.random() * 100),
        misses: Math.floor(Math.random() * 20),
        hitRate: Math.random() * 100,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return cacheStats;
};
