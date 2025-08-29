"use client";

import { useEffect, useState } from "react";
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

export function useCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  configKey: keyof typeof CACHE_CONFIG
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cached = await cacheUtils.getCachedData<T>(
          key,
          async () => await fetcher(),
          CACHE_CONFIG[configKey]
        );
        if (!mounted) return;
        setData(cached);
        setLoading(false);

        // Revalidação em background (não bloqueia UI)
        fetcher()
          .then(async (fresh) => {
            if (!mounted) return;
            setData(fresh);
            await cacheUtils.setCachedData(key, fresh, CACHE_CONFIG[configKey]);
          })
          .catch(() => {});
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "Erro ao carregar dados");
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [key, fetcher, configKey]);

  return { data, loading, error } as const;
}
