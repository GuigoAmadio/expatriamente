"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// ✅ Imports dos hooks de cache - TEMPORARILY DISABLED FOR PROJECT DELIVERY
// import {
//   useCacheAndSSE,
//   usePrefetch,
//   useCacheValidation,
// } from "@/hooks/useCacheAndSSE";
// import { useRequestManager } from "@/hooks/useRequestManager";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // ✅ Hooks de cache - TEMPORARILY DISABLED FOR PROJECT DELIVERY
  /*
  const {
    isSSEConnected,
    connectionStatus,
    lastCacheUpdate,
    cacheStats,
    forceReconnect,
  } = useCacheAndSSE(user);

  const {
    prefetchEssential,
    prefetchSecondary,
    prefetchByRoute,
    prefetchStats,
  } = usePrefetch();

  const { validateCacheAfterLogin, isValidating } = useCacheValidation();

  const { hasAnyLoading, loadingStates } = useRequestManager();
  */

  // ✅ TEMPORARY FALLBACK VALUES
  const isSSEConnected = false;
  const connectionStatus = { reconnectAttempts: 0, readyState: 0 };
  const lastCacheUpdate = null;
  const cacheStats = { totalSize: 0, memorySize: 0, localStorageSize: 0 };
  const forceReconnect = () => {};
  const prefetchEssential = () => {};
  const prefetchSecondary = () => {};
  const prefetchByRoute = () => {};
  const prefetchStats = { queueSize: 0, isActive: false };
  const validateCacheAfterLogin = () => Promise.resolve();
  const isValidating = false;
  const hasAnyLoading = false;
  const loadingStates = {};

  // ✅ Verificar se está no cliente para evitar problemas de hidratação
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Inicialização após login
  useEffect(() => {
    const initializeDashboard = async () => {
      if (isInitialized || !user) return;

      try {
        // Obter role do usuário do contexto de autenticação
        const role = user?.role?.toUpperCase() || "CLIENT";
        setUserRole(role);

        // TEMPORARILY DISABLED FOR PROJECT DELIVERY
        /*
        console.log("🚀 [Dashboard] Inicializando sistema de cache...");

        // 1. Validar cache após login
        await validateCacheAfterLogin();

        // 2. Prefetch essencial (dados críticos)
        await prefetchEssential(role);

        // 3. Prefetch secundário (em background)
        prefetchSecondary(role);

        // 4. Prefetch baseado na rota atual
        await prefetchByRoute(pathname);

        setIsInitialized(true);
        console.log("✅ [Dashboard] Sistema de cache inicializado");
        */

        // ✅ TEMPORARY: Simple initialization without cache/prefetch
        console.log(
          "🚀 [Dashboard] Inicializando dashboard (cache/prefetch desabilitado)"
        );
        setIsInitialized(true);
        console.log("✅ [Dashboard] Dashboard inicializado");
      } catch (error) {
        console.error("❌ [Dashboard] Erro ao inicializar:", error);
      }
    };

    initializeDashboard();
  }, [
    isInitialized,
    pathname,
    user,
    // TEMPORARILY DISABLED DEPENDENCIES
    // validateCacheAfterLogin,
    // prefetchEssential,
    // prefetchSecondary,
    // prefetchByRoute,
  ]);

  // ✅ Prefetch baseado na mudança de rota - TEMPORARILY DISABLED
  /*
  useEffect(() => {
    if (isInitialized && pathname) {
      console.log(`📍 [Dashboard] Rota mudou para: ${pathname}`);
      prefetchByRoute(pathname);
    }
  }, [pathname, isInitialized, prefetchByRoute]);
  */

  // ✅ Reconectar SSE se necessário - TEMPORARILY DISABLED
  /*
  useEffect(() => {
    if (!isSSEConnected && connectionStatus.reconnectAttempts >= 3) {
      console.log("🔄 [Dashboard] Tentando reconectar SSE...");
      forceReconnect();
    }
  }, [isSSEConnected, connectionStatus.reconnectAttempts, forceReconnect]);

  // ✅ Log de atualizações de cache
  useEffect(() => {
    if (lastCacheUpdate) {
      console.log("🔄 [Dashboard] Cache atualizado via SSE:", lastCacheUpdate);

      // Pode implementar notificações visuais aqui
      if (lastCacheUpdate.type === "invalidate") {
        // Mostrar toast: "Dados atualizados"
      }
    }
  }, [lastCacheUpdate]);
  */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Status Bar de Debug (só em desenvolvimento) - TEMPORARILY DISABLED */}
      {/*
      {process.env.NODE_ENV === "development" && isClient && (
        <div className="bg-blue-900 text-white text-xs p-2 flex justify-between items-center">
          <div className="flex space-x-4">
            <span>
              SSE: {isSSEConnected ? "✅ Conectado" : "❌ Desconectado"}
            </span>
            <span>Cache: {cacheStats.totalSize} items</span>
            <span>Prefetch: {prefetchStats.queueSize} na fila</span>
            {hasAnyLoading && (
              <span className="animate-pulse">
                ⏳{" "}
                {
                  Object.keys(loadingStates).filter((k) => loadingStates[k])
                    .length
                }{" "}
                carregando...
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            {isValidating && <span>🔍 Validando...</span>}
            {connectionStatus.reconnectAttempts > 0 && (
              <span>🔄 Tentativas: {connectionStatus.reconnectAttempts}</span>
            )}
          </div>
        </div>
      )}
      */}

      {/* ✅ Loading Global */}
      {!isInitialized && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Inicializando sistema...</p>
            {/* TEMPORARILY DISABLED */}
            {/* {isValidating && (
              <p className="text-sm text-gray-500">Validando cache...</p>
            )} */}
          </div>
        </div>
      )}

      {/* ✅ Notificação de Reconexão SSE - TEMPORARILY DISABLED */}
      {/*
      {!isSSEConnected && isInitialized && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                Conexão perdida. Tentativas:{" "}
                {connectionStatus.reconnectAttempts}
                <button
                  onClick={forceReconnect}
                  className="ml-2 text-yellow-800 underline hover:text-yellow-900"
                >
                  Reconectar
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
      */}

      {/* ✅ Conteúdo Principal */}
      <main className="container mx-auto px-4 py-6">{children}</main>

      {/* ✅ Footer com Stats (desenvolvimento) - TEMPORARILY DISABLED */}
      {/*
      {process.env.NODE_ENV === "development" && isClient && (
        <footer className="bg-gray-800 text-gray-300 text-xs p-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <h4 className="font-bold mb-2">Cache Stats</h4>
              <p>Memória: {cacheStats.memorySize}</p>
              <p>LocalStorage: {cacheStats.localStorageSize}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">SSE Status</h4>
              <p>Estado: {connectionStatus.readyState}</p>
              <p>Tentativas: {connectionStatus.reconnectAttempts}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Prefetch</h4>
              <p>Ativo: {prefetchStats.isActive ? "Sim" : "Não"}</p>
              <p>Fila: {prefetchStats.queueSize}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Requests</h4>
              <p>
                Loading:{" "}
                {
                  Object.keys(loadingStates).filter((k) => loadingStates[k])
                    .length
                }
              </p>
              <p>Role: {userRole}</p>
            </div>
          </div>
        </footer>
      )}
      */}
    </div>
  );
}
