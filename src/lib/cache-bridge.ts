// ✅ Bridge entre Server Actions e Client-side Cache
import { intelligentCache, CACHE_CONFIG } from "./intelligent-cache";

export type CacheBridgeData = {
  key: string;
  data: any;
  config?: any;
};

// ✅ Funcão para transferir dados do server action para o cache client
export const populateClientCache = async (
  cacheData: CacheBridgeData[]
): Promise<void> => {
  console.log(
    `📦 [CacheBridge] Populando cache client com ${cacheData.length} itens`
  );

  const promises = cacheData.map(async ({ key, data, config }) => {
    try {
      await intelligentCache.set(key, data, config);
      console.log(`✅ [CacheBridge] Cache populado: ${key}`);
    } catch (error) {
      console.error(`❌ [CacheBridge] Erro ao popular cache ${key}:`, error);
    }
  });

  await Promise.allSettled(promises);
  console.log(`🎯 [CacheBridge] Cache client populado com sucesso`);
};

// ✅ Verificar se um item existe no cache client
export const checkClientCache = async (key: string): Promise<boolean> => {
  const cached = await intelligentCache.get(key);
  return cached !== null;
};

// ✅ Obter item do cache client
export const getFromClientCache = async <T>(key: string): Promise<T | null> => {
  return await intelligentCache.get<T>(key);
};

// ✅ Limpar cache client
export const clearClientCache = async (): Promise<void> => {
  await intelligentCache.clear();
  console.log("🧹 [CacheBridge] Cache client limpo");
};

// ✅ Estatísticas do cache client
export const getClientCacheStats = () => {
  return intelligentCache.getStats();
};

// ✅ Adicionar ao window para debugging
if (typeof window !== "undefined") {
  (window as any).cacheBridge = {
    checkCache: checkClientCache,
    getCache: getFromClientCache,
    clearCache: clearClientCache,
    getStats: getClientCacheStats,
    populateCache: populateClientCache,
  };
  console.log(
    "🔧 [CacheBridge] Debug functions available at window.cacheBridge"
  );
}
