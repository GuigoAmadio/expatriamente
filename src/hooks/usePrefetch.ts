import { useState, useEffect, useCallback } from "react";
import { intelligentPrefetch } from "@/lib/intelligent-prefetch";

// Hook para prefetch de dados principais
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

// Hook para prefetch específico por página
export const usePagePrefetch = (pageKey: string) => {
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [prefetchError, setPrefetchError] = useState<string | null>(null);

  // ✅ Executar prefetch para página específica
  const executePagePrefetch = useCallback(async () => {
    if (isPrefetching) {
      console.log(`⏭️ [Page Prefetch] ${pageKey} já está sendo carregado`);
      return;
    }

    setIsPrefetching(true);
    setPrefetchError(null);

    try {
      console.log(`🚀 [Page Prefetch] Iniciando prefetch para: ${pageKey}`);
      await intelligentPrefetch.prefetchByRoute(`/dashboard/${pageKey}`);
      console.log(`✅ [Page Prefetch] Prefetch concluído para: ${pageKey}`);
    } catch (error: any) {
      const errorMessage = error?.message || "Erro no prefetch";
      console.error(`❌ [Page Prefetch] Erro para ${pageKey}:`, errorMessage);
      setPrefetchError(errorMessage);
    } finally {
      setIsPrefetching(false);
    }
  }, [pageKey, isPrefetching]);

  return {
    executePagePrefetch,
    isPrefetching,
    prefetchError,
  };
};
