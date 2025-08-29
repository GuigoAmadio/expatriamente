"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { getAuthUser } from "@/actions/auth";
import { BackendUser } from "@/types/backend";
import { DashboardLayout as DashboardLayoutWithSidebar } from "@/components/layout/DashboardLayout";
import { useCustomSSE, useCachePerformance } from "@/hooks/useCustomSSE";
import { useRequestManager } from "@/hooks/useRequestManager";
import { CacheDebug } from "@/components/debug/CacheDebug";

// ✅ Importar prefetchs e cache bridge
import {
  prefetchDashboardStats,
  prefetchCurrentProfile,
  prefetchTodayAppointments,
  prefetchMyAppointments,
  prefetchEmployees,
  prefetchAvailableServices,
  prefetchAllServices,
  prefetchAppSettings,
} from "@/actions/prefetch";
import { populateClientCache, type CacheBridgeData } from "@/lib/cache-bridge";
import { CACHE_CONFIG } from "@/lib/intelligent-cache";

// ✅ Dashboard Layout com Prefetch Automático

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// ✅ Função para sincronizar prefetchs com cache client-side
async function syncPrefetchesToClientCache(
  results: PromiseSettledResult<any>[],
  userRole: string
): Promise<void> {
  console.log("🔄 [Dashboard] Sincronizando prefetchs com cache client...");

  const cacheData: CacheBridgeData[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value) {
      // ✅ Mapear índices para chaves de cache baseado na ORDEM REAL dos prefetchs
      let cacheKeyMapping: Array<{ key: string; config: any }> = [];

      // ✅ Ordem correta baseada em executeAutomaticPrefetch
      if (userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
        cacheKeyMapping = [
          // Prefetchs ADMIN (primeiros 5)
          { key: "dashboard:stats", config: CACHE_CONFIG.dashboard }, // índice 0
          { key: "appointments:today", config: CACHE_CONFIG.appointments }, // índice 1
          { key: "employees:list:meta", config: CACHE_CONFIG.employees }, // índice 2 ← CORRETO!
          { key: "services:all", config: CACHE_CONFIG.services }, // índice 3
          { key: "services:available", config: CACHE_CONFIG.services }, // índice 4
          // Prefetchs ESSENCIAIS (apenas 1 agora)
          { key: "profile:current", config: CACHE_CONFIG.profile }, // índice 5
          // settings:app removido pois endpoint não existe
        ];
      } else if (userRole === "EMPLOYEE") {
        cacheKeyMapping = [
          // Prefetchs EMPLOYEE (primeiros 3)
          { key: "appointments:my", config: CACHE_CONFIG.appointments }, // índice 0
          { key: "appointments:today", config: CACHE_CONFIG.appointments }, // índice 1
          { key: "services:available", config: CACHE_CONFIG.services }, // índice 2
          // Prefetchs ESSENCIAIS (apenas 1 agora)
          { key: "profile:current", config: CACHE_CONFIG.profile }, // índice 3
          // settings:app removido pois endpoint não existe
        ];
      } else {
        // CLIENT
        cacheKeyMapping = [
          // Prefetchs CLIENT (primeiros 2)
          { key: "appointments:my", config: CACHE_CONFIG.appointments }, // índice 0
          { key: "services:available", config: CACHE_CONFIG.services }, // índice 1
          // Prefetchs ESSENCIAIS (apenas 1 agora)
          { key: "profile:current", config: CACHE_CONFIG.profile }, // índice 2
          // settings:app removido pois endpoint não existe
        ];
      }

      if (cacheKeyMapping[index]) {
        cacheData.push({
          key: cacheKeyMapping[index].key,
          data: result.value,
          config: cacheKeyMapping[index].config,
        });
        console.log(
          `🔗 [Dashboard] Mapeando índice ${index} → ${cacheKeyMapping[index].key}`
        );
      }
    }
  });

  if (cacheData.length > 0) {
    await populateClientCache(cacheData);
    console.log(
      `✅ [Dashboard] ${cacheData.length} itens sincronizados com cache client`
    );
  } else {
    console.log("⚠️ [Dashboard] Nenhum dado para sincronizar com cache client");
  }
}

// ✅ Função para executar prefetchs automáticos baseados no role
async function executeAutomaticPrefetch(
  userRole: string,
  setProgress?: (progress: string) => void
): Promise<void> {
  const prefetchPromises: Promise<any>[] = [];

  console.log(`📋 [Dashboard] Executando prefetchs para role: ${userRole}`);

  // ✅ Prefetchs ESSENCIAIS para todos os usuários
  const essentialPrefetches = [
    { name: "prefetchCurrentProfile", fn: prefetchCurrentProfile },
    // { name: "prefetchAppSettings", fn: prefetchAppSettings }, // ❌ Endpoint não existe
  ];

  // ✅ Prefetchs BASEADOS NO ROLE
  if (userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
    // Admins: Dashboard completo + todas as entidades
    const adminPrefetches = [
      { name: "prefetchDashboardStats", fn: prefetchDashboardStats },
      { name: "prefetchTodayAppointments", fn: prefetchTodayAppointments },
      { name: "prefetchEmployees", fn: prefetchEmployees },
      { name: "prefetchAllServices", fn: prefetchAllServices },
      { name: "prefetchAvailableServices", fn: prefetchAvailableServices },
    ];
    prefetchPromises.push(...adminPrefetches.map((p) => p.fn()));
    console.log(
      `🔑 [Dashboard] Prefetchs ADMIN: ${adminPrefetches
        .map((p) => p.name)
        .join(", ")}`
    );
  } else if (userRole === "EMPLOYEE") {
    // Funcionários: Seus próprios dados + serviços
    const employeePrefetches = [
      { name: "prefetchMyAppointments", fn: prefetchMyAppointments },
      { name: "prefetchTodayAppointments", fn: prefetchTodayAppointments },
      { name: "prefetchAvailableServices", fn: prefetchAvailableServices },
    ];
    prefetchPromises.push(...employeePrefetches.map((p) => p.fn()));
    console.log(
      `👨‍💼 [Dashboard] Prefetchs EMPLOYEE: ${employeePrefetches
        .map((p) => p.name)
        .join(", ")}`
    );
  } else {
    // Clientes: Apenas seus próprios dados
    const clientPrefetches = [
      { name: "prefetchMyAppointments", fn: prefetchMyAppointments },
      { name: "prefetchAvailableServices", fn: prefetchAvailableServices },
    ];
    prefetchPromises.push(...clientPrefetches.map((p) => p.fn()));
    console.log(
      `👤 [Dashboard] Prefetchs CLIENT: ${clientPrefetches
        .map((p) => p.name)
        .join(", ")}`
    );
  }

  // ✅ Adicionar prefetchs essenciais
  prefetchPromises.push(...essentialPrefetches.map((p) => p.fn()));
  console.log(
    `⭐ [Dashboard] Prefetchs ESSENCIAIS: ${essentialPrefetches
      .map((p) => p.name)
      .join(", ")}`
  );

  // ✅ Executar todos os prefetchs em paralelo com timeout e progress
  const startTime = Date.now();
  const totalPrefetches = prefetchPromises.length;
  let completedPrefetches = 0;

  try {
    setProgress?.(`Carregando ${totalPrefetches} recursos...`);

    const results = await Promise.allSettled(
      prefetchPromises.map(async (promise, index) => {
        try {
          const result = await Promise.race([
            promise,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Prefetch timeout")), 8000)
            ),
          ]);

          completedPrefetches++;
          setProgress?.(
            `Carregado ${completedPrefetches}/${totalPrefetches} recursos...`
          );

          return result;
        } catch (error) {
          completedPrefetches++;
          setProgress?.(
            `Carregado ${completedPrefetches}/${totalPrefetches} recursos...`
          );
          throw error;
        }
      })
    );

    const duration = Date.now() - startTime;
    const successCount = results.filter((r) => r.status === "fulfilled").length;
    const failureCount = results.filter((r) => r.status === "rejected").length;

    console.log(
      `✅ [Dashboard] Prefetchs concluídos em ${duration}ms: ${successCount} sucessos, ${failureCount} falhas`
    );

    // ✅ POPULAR CACHE CLIENT-SIDE com dados dos prefetchs bem-sucedidos
    if (successCount > 0) {
      setProgress?.("Sincronizando cache...");
      await syncPrefetchesToClientCache(results, userRole);
    }

    setProgress?.("Dados carregados com sucesso!");
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `❌ [Dashboard] Erro nos prefetchs após ${duration}ms:`,
      error
    );
    setProgress?.("Erro ao carregar alguns dados");
  }
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<BackendUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [prefetchProgress, setPrefetchProgress] = useState("");
  const userRef = useRef(user);

  // ✅ Memoizar o usuário para evitar re-criações desnecessárias
  const memoizedUser = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      clientId: user.clientId,
      role: user.role,
      name: user.name,
      employeeId: user.employeeId,
    };
  }, [user]);

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
  } = useCustomSSE(memoizedUser);

  const cacheStats = useCachePerformance();

  const {
    loadingStates,
    requestCounts,
    hasAnyLoading,
    addLoading,
    removeLoading,
    cancelAllRequests,
    isLoading: isRequestLoading,
  } = useRequestManager();

  // ✅ Verificar se está no cliente para evitar problemas de hidratação
  useEffect(() => {
    setIsClient(true);

    // Client-side initialization completed
  }, []);

  // ✅ Carregar usuário usando getAuthUser
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("🔄 [Dashboard] Carregando usuário...");
        const userData = await getAuthUser();

        if (userData) {
          const backendUser: BackendUser = {
            id: userData.id,
            employeeId: userData.employeeId,
            name: userData.name || "",
            email: userData.email,
            phone: (userData as any).phone,
            role: userData.role as
              | "SUPER_ADMIN"
              | "ADMIN"
              | "EMPLOYEE"
              | "CLIENT",
            status: "ACTIVE",
            clientId: (userData as any).clientId || "",
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            client: (userData as any).client,
          };
          setUser(backendUser);
          console.log("✅ [Dashboard] Usuário carregado:", backendUser);
          console.log(
            "📡 [Dashboard] Passando usuário para useCustomSSE:",
            backendUser
          );
        } else {
          setUser(null);
          console.log("❌ [Dashboard] Nenhum usuário encontrado");
        }
      } catch (error) {
        console.error("❌ [Dashboard] Erro ao carregar usuário:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (isClient) {
      loadUser();
    }
  }, [isClient]);

  // ✅ Atualizar referência do usuário
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // ✅ Inicialização após login (apenas uma vez)
  useEffect(() => {
    const initializeDashboard = async () => {
      if (isLoading) {
        console.log("⏳ [Dashboard] Aguardando carregamento do usuário...");
        return;
      }

      if (isInitialized) {
        console.log("✅ [Dashboard] Já inicializado, pulando...");
        return;
      }

      if (!user) {
        console.log("👤 [Dashboard] Usuário não autenticado, aguardando...");
        return;
      }

      console.log("🚀 [Dashboard] Inicializando sistema de cache...");
      console.log("👤 [Dashboard] Usuário autenticado:", user);

      try {
        // Obter role do usuário do contexto de autenticação
        const role = user?.role?.toUpperCase() || "CLIENT";
        setUserRole(role);

        // ✅ EXECUTAR PREFETCHS AUTOMÁTICOS BASEADOS NO ROLE
        // ... existing code ...

        // ✅ EXECUTAR PREFETCHS AUTOMÁTICOS BASEADOS NO ROLE
        console.log("🚀 [Dashboard] Iniciando prefetchs automáticos...");
        setIsPrefetching(true);
        setPrefetchProgress("Carregando dados do dashboard...");

        // 🚫 DESABILITADO: Prefetchs já executados no login
        // await executeAutomaticPrefetch(role, setPrefetchProgress);

        // ✅ Simular carregamento rápido (prefetchs já feitos no login)
        setTimeout(() => {
          setIsPrefetching(false);
          setPrefetchProgress("");
        }, 500);

        setIsInitialized(true);
        console.log("✅ [Dashboard] Sistema de cache inicializado");
        console.log(
          "✅ [Dashboard] Dashboard inicializado (prefetchs já feitos no login)"
        );

        // ... existing code ...
      } catch (error) {
        console.error("❌ [Dashboard] Erro ao inicializar:", error);
        // Mesmo com erro nos prefetchs, continuar a inicialização
        setIsInitialized(true);
        setIsPrefetching(false);
      }
    };

    initializeDashboard();
  }, [user, isLoading, isInitialized]);

  // ✅ Reconectar SSE se necessário
  useEffect(() => {
    if (!isSSEConnected && reconnectAttempts >= 3 && user) {
      console.log("🔄 [Dashboard] Tentando reconectar SSE...");
      const attemptReconnect = async () => {
        try {
          await reconnect();
        } catch (error) {
          console.error("❌ [Dashboard] Erro ao reconectar SSE:", error);
        }
      };
      attemptReconnect();
    }
  }, [isSSEConnected, reconnectAttempts, reconnect, user]);

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

  // ✅ Reset de inicialização quando usuário muda
  useEffect(() => {
    if (!user && isInitialized) {
      console.log(
        "🔄 [Dashboard] Usuário desconectado, resetando inicialização..."
      );
      setIsInitialized(false);
      setUserRole("");
    }
  }, [user, isInitialized]);

  // ✅ Mostrar loading enquanto carrega
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ Loading Global com Progress dos Prefetchs */}
      {(!isInitialized && user) || isPrefetching ? (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center max-w-md w-full mx-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-800 font-medium mb-2">
              {isPrefetching
                ? "Preparando dashboard..."
                : "Inicializando sistema..."}
            </p>
            {isPrefetching && prefetchProgress && (
              <p className="text-gray-600 text-sm">{prefetchProgress}</p>
            )}
            {isPrefetching && (
              <div className="mt-3 text-xs text-gray-500">
                Precarregando dados para navegação mais rápida ⚡
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* ✅ Botão de Debug */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
        title="Toggle Debug SSE"
      >
        🔧
      </button>

      {/* ✅ Componente de Debug */}
      <CacheDebug isVisible={showDebug} />

      {/* ✅ Usar o DashboardLayout que contém a sidebar */}
      <DashboardLayoutWithSidebar>{children}</DashboardLayoutWithSidebar>
    </>
  );
}
