"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout as DashboardLayoutWithSidebar } from "@/components/layout/DashboardLayout";
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
    <>
      {/* ✅ Loading Global */}
      {!isInitialized && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Inicializando sistema...</p>
          </div>
        </div>
      )}

      {/* ✅ Usar o DashboardLayout que contém a sidebar */}
      <DashboardLayoutWithSidebar>{children}</DashboardLayoutWithSidebar>
    </>
  );
}
