// ✅ Configuração do SSE
export const SSE_CONFIG = {
  // ✅ URLs base por ambiente
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",

  // ✅ Endpoints SSE
  ENDPOINTS: {
    STREAM: "/cache-events/stream",
    UPDATES: "/cache-events/updates",
    STATS: "/cache-events/stats",
  },

  // ✅ Configurações de reconexão
  RECONNECTION: {
    MAX_ATTEMPTS: 5,
    BASE_DELAY: 1000, // 1 segundo
    MAX_DELAY: 30000, // 30 segundos
  },

  // ✅ Configurações de heartbeat
  HEARTBEAT: {
    INTERVAL: 30000, // 30 segundos
    CLIENT_INTERVAL: 25000, // 25 segundos
  },

  // ✅ Configurações de limpeza
  CLEANUP: {
    INACTIVE_TIMEOUT: 10 * 60 * 1000, // 10 minutos
    CLEANUP_INTERVAL: 5 * 60 * 1000, // 5 minutos
  },

  // ✅ Configurações de debug
  DEBUG: {
    ENABLED: process.env.NODE_ENV === "development",
    LOG_LEVEL: "info", // 'debug', 'info', 'warn', 'error'
  },
} as const;

// ✅ Função para obter URL completa do SSE
export function getSSEUrl(
  endpoint: string,
  params?: Record<string, string>
): string {
  const url = new URL(`${SSE_CONFIG.API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      // Incluir parâmetros mesmo se vazios (para client_id vazio)
      url.searchParams.append(key, value || "");
    });
  }

  return url.toString();
}

// ✅ Função para obter URL do stream principal
export function getStreamUrl(): string {
  // ✅ Token agora é enviado via Authorization header
  return getSSEUrl(SSE_CONFIG.ENDPOINTS.STREAM);
}

// ✅ Função para obter URL de updates por tipo
export function getUpdatesUrl(
  type: string,
  token?: string,
  clientId?: string
): string {
  const params: Record<string, string> = {};

  if (token) params.token = token;
  if (clientId) params.client_id = clientId;

  return getSSEUrl(`${SSE_CONFIG.ENDPOINTS.UPDATES}/${type}`, params);
}

// ✅ Função para obter URL de estatísticas
export function getStatsUrl(): string {
  return getSSEUrl(SSE_CONFIG.ENDPOINTS.STATS);
}
