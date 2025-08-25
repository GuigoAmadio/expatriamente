import axios, { AxiosResponse } from "axios";
import type { ApiResponse, ApiError } from "@/types";
import type { BackendUser } from "@/types/backend";

// Interfaces para as respostas da API
interface LoginApiResponse {
  data?: {
    token: string;
    client_id: string;
    refresh_token?: string;
    user: BackendUser;
  };
  token?: string;
  client_id?: string;
  refresh_token?: string;
  user?: BackendUser;
}

interface RegisterApiResponse {
  data?: {
    token: string;
    client_id: string;
    user: BackendUser;
  };
  token?: string;
  client_id?: string;
  user?: BackendUser;
}

// Configuração da API otimizada para Expatriamente
const API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "https://72.60.1.234/api/v1", // Backend NestJS na porta 3000
  timeout: 5000,
  defaultClientId:
    process.env.NEXT_PUBLIC_DEFAULT_CLIENT_ID ||
    "2a2ad019-c94a-4f35-9dc8-dd877b3e8ec8",
};

// Cache simples para requisições (mantido para compatibilidade)
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 segundos

// Tipos para configuração de tenant/cliente
interface TenantConfig {
  clientId: string;
  token?: string;
}

// Armazenamento do tenant atual (client-side)
let currentTenant: TenantConfig | null = null;

// Flag para evitar redirecionamentos múltiplos
let isRedirecting = false;

// Função para definir o tenant atual
export function setCurrentTenant(clientId: string, token?: string) {
  currentTenant = { clientId, token };

  // Salvar no localStorage se estiver no browser
  if (typeof window !== "undefined") {
    localStorage.setItem("current_client_id", clientId);
    if (token) {
      localStorage.setItem("auth_token", token);
    }
  }
}

// Função para obter headers padrão (sempre usa o clientId fixo)
function getDefaultHeaders(config?: {
  clientId?: string;
  token?: string;
}): Record<string, string> {
  const clientId = API_CONFIG.defaultClientId;
  const token = config?.token;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-client-id": clientId,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// Instância do axios configurada
export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    const defaultHeaders = getDefaultHeaders();
    Object.assign(config.headers, defaultHeaders);
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respostas com tratamento de erro melhorado
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    console.log("🔍 API Error:", error.response?.status, error.response?.data);

    // Tratamento de erro 401 - Token expirado ou inválido
    if (error.response?.status === 401) {
      console.log("🚨 Token inválido/expirado - limpando autenticação");

      // Limpar autenticação local
      clearAuth();

      // Evitar redirecionamentos múltiplos
      if (!isRedirecting && typeof window !== "undefined") {
        isRedirecting = true;

        // Só redirecionar se não estamos já na página de login E não estamos em rota pública
        const publicPrefixes = [
          "/",
          "/auth/signin",
          "/auth/signup",
          "/psicanalistas",
        ];
        const isPublic = publicPrefixes.some(
          (prefix) =>
            window.location.pathname === prefix ||
            window.location.pathname.startsWith(prefix + "/")
        );
        if (!window.location.pathname.includes("/auth/signin") && !isPublic) {
          console.log("🔄 Redirecionando para auth/signin devido a 401");
          window.location.href = "/auth/signin";
        }

        // Reset flag após um tempo
        setTimeout(() => {
          isRedirecting = false;
        }, 1000);
      }
    }

    const apiError: ApiError = {
      message: error.response?.data?.message || "Erro interno do servidor",
      code: error.response?.status?.toString() || "UNKNOWN_ERROR",
      details: error.response?.data,
    };

    return Promise.reject(apiError);
  }
);

// Função para verificar cache
function getCachedData<T>(key: string): T | null {
  console.log("🔍 [cache] Buscando dados para key:", key);
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("✅ [cache] Dados encontrados e válidos");
    return cached.data as T;
  }

  if (cached) {
    console.log("⏰ [cache] Dados expirados, removendo...");
    cache.delete(key);
  } else {
    console.log("❌ [cache] Nenhum dado encontrado");
  }

  return null;
}

// Função para definir cache
function setCachedData<T>(key: string, data: T): void {
  console.log("💾 [cache] Salvando dados para key:", key);
  cache.set(key, { data, timestamp: Date.now() });
  console.log("✅ [cache] Dados salvos com sucesso");
}

// Funções de API otimizadas com cache (CLIENT-SIDE)
export async function get<T>(
  url: string,
  config?: { clientId?: string; token?: string; useCache?: boolean }
): Promise<ApiResponse<T>> {
  console.log("🔍 [api-client] GET iniciado:", { url, config });

  const cacheKey = `GET:${url}:${JSON.stringify(config)}`;
  console.log("🔍 [api-client] Cache key gerada:", cacheKey);

  // Verificar cache se habilitado
  if (config?.useCache !== false) {
    console.log("🔍 [api-client] Verificando cache...");
    const cached = getCachedData<ApiResponse<T>>(cacheKey);
    if (cached) {
      console.log("✅ [api-client] Dados encontrados no cache, retornando...");
      return cached;
    }
    console.log("❌ [api-client] Cache miss, fazendo requisição...");
  } else {
    console.log("🔍 [api-client] Cache desabilitado, fazendo requisição...");
  }

  console.log(
    "🔍 [api-client] Headers que serão enviados:",
    getDefaultHeaders(config)
  );

  try {
    console.log("🚀 [api-client] Fazendo requisição GET para:", url);
    const data = (await api.get<T>(url, {
      headers: getDefaultHeaders(config),
    })) as T;
    console.log("✅ [api-client] Requisição GET bem-sucedida:", data);

    const response: ApiResponse<T> = {
      success: true,
      data,
      message: "Success",
    };

    // Salvar no cache
    if (config?.useCache !== false) {
      console.log("💾 [api-client] Salvando no cache...");
      setCachedData(cacheKey, response);
      console.log("✅ [api-client] Dados salvos no cache");
    }

    console.log("✅ [api-client] GET concluído com sucesso");
    return response;
  } catch (error) {
    console.error("❌ [api-client] Erro na requisição GET:", error);
    console.error("❌ [api-client] URL que falhou:", url);
    console.error("❌ [api-client] Config que falhou:", config);
    throw error;
  }
}

export async function post<T>(
  url: string,
  data?: unknown,
  config?: { clientId?: string; token?: string }
): Promise<ApiResponse<T>> {
  console.log("[api-client] POST url:", url);
  console.log("[api-client] POST data:", data);
  const AAAA = getDefaultHeaders(config);
  const result = (await api.post<T>(url, data, {
    headers: AAAA,
  })) as T;
  console.log("[api-client] POST resposta:", result);

  return {
    success: true,
    data: result,
    message: "Success",
  };
}

export async function put<T>(
  url: string,
  data?: unknown,
  config?: { clientId?: string; token?: string }
): Promise<ApiResponse<T>> {
  const result = (await api.put<T>(url, data, {
    headers: getDefaultHeaders(config),
  })) as T;

  return {
    success: true,
    data: result,
    message: "Success",
  };
}

export async function del<T>(
  url: string,
  config?: { clientId?: string; token?: string }
): Promise<ApiResponse<T>> {
  const result = (await api.delete<T>(url, {
    headers: getDefaultHeaders(config),
  })) as T;

  return {
    success: true,
    data: result,
    message: "Success",
  };
}

export async function patch<T>(
  url: string,
  data?: unknown,
  config?: { clientId?: string; token?: string }
): Promise<ApiResponse<T>> {
  const result = (await api.patch<T>(url, data, {
    headers: getDefaultHeaders(config),
  })) as T;

  return {
    success: true,
    data: result,
    message: "Success",
  };
}

// Função para limpar cache
export function clearCache(): void {
  cache.clear();
}

// Função para limpar autenticação melhorada
export function clearAuth() {
  console.log("🧹 Limpando autenticação local");
  currentTenant = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("current_client_id");
  }
  clearCache(); // Limpar cache também
}

// apiClient para compatibilidade com AuthContext
export const apiClient = {
  setToken: (token: string) => {
    if (token) {
      setCurrentTenant(API_CONFIG.defaultClientId, token);
    } else {
      clearAuth();
    }
  },

  getProfile: async (): Promise<BackendUser> => {
    const response = await get<BackendUser>("/auth/me");
    return response.data as BackendUser;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await post<LoginApiResponse>("/auth/login", credentials);
    return response;
  },

  register: async (data: any) => {
    const response = await post<RegisterApiResponse>("/auth/register", data);
    return response;
  },
};
