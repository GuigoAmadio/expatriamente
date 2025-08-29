"use client";

import { useState } from "react";
import { intelligentCache } from "@/lib/intelligent-cache";
import { useRouter } from "next/navigation";

interface RefreshButtonProps {
  cachePattern?: string;
  onRefresh?: () => void;
  className?: string;
  children?: React.ReactNode;
  forceReload?: boolean;
  clearAllCache?: boolean;
}

export function RefreshButton({
  cachePattern,
  onRefresh,
  className = "",
  children = "🔄 Atualizar",
  forceReload = true,
  clearAllCache = false,
}: RefreshButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRefresh = async () => {
    setIsLoading(true);

    try {
      console.log("🔄 [RefreshButton] Iniciando atualização...");

      // Limpar todo o cache se solicitado
      if (clearAllCache) {
        console.log("🗑️ [RefreshButton] Limpando todo o cache...");
        await intelligentCache.clear();
      }
      // Invalidar cache por padrão se fornecido
      else if (cachePattern) {
        console.log(`🗑️ [RefreshButton] Invalidando cache: ${cachePattern}`);
        await intelligentCache.invalidatePattern(cachePattern);
      }

      // Limpar cache do localStorage também
      if (typeof window !== "undefined") {
        console.log("🗑️ [RefreshButton] Limpando localStorage...");
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("cache:")) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        console.log(
          `🗑️ [RefreshButton] Removidos ${keysToRemove.length} itens do localStorage`
        );
      }

      // Chamar callback de atualização se fornecido
      if (onRefresh) {
        await onRefresh();
      }

      // Forçar recarregamento da página para atualizar dados do servidor
      if (forceReload) {
        console.log("🔄 [RefreshButton] Forçando recarregamento da página...");
        router.refresh();
      }

      console.log("✅ [RefreshButton] Atualização concluída");
    } catch (error) {
      console.error("❌ [RefreshButton] Erro na atualização:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isLoading}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300
        text-white font-medium rounded-lg transition-colors
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Atualizando...
        </>
      ) : (
        children
      )}
    </button>
  );
}
