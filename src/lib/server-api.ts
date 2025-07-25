import type { ApiResponse } from "@/types";

// Configuração da API
const API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://localhost:3000/api/v1", // Backend NestJS na porta 3000
  defaultClientId:
    process.env.NEXT_PUBLIC_DEFAULT_CLIENT_ID ||
    "a9a86733-b2a5-4f0e-b230-caed27ce74df",
};

// Função para obter headers que funciona tanto no servidor quanto no cliente
async function getHeaders(): Promise<Record<string, string>> {
  try {
    // Sempre usa o client_id do environment
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-client-id": API_CONFIG.defaultClientId,
    };

    // Token de autenticação (opcional)
    let token: string | undefined;
    if (typeof window === "undefined") {
      // No servidor, tenta usar next/headers se disponível
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        token = cookieStore.get("auth_token")?.value;
      } catch (error) {
        // Ignora erro, segue sem token
      }
    } else {
      // No cliente, usa document.cookie
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
      token = cookies.auth_token;
    }
    console.log("TOKEEEENN A A AAA", token);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Erro ao obter headers:", error);
    }
    return {
      "Content-Type": "application/json",
      "x-client-id": API_CONFIG.defaultClientId,
    };
  }
}

// Funções para Server Actions
export async function serverFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers = await getHeaders();

  // Log para debug
  console.log("[server-api] Fazendo fetch:", {
    url: `${API_CONFIG.baseURL}${url}`,
    headers: { ...headers, ...(options.headers || {}) },
    method: options.method || "GET",
  });

  const response = await fetch(`${API_CONFIG.baseURL}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("📡 [server-api] Resposta HTTP:", {
      url: `${API_CONFIG.baseURL}${url}`,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    if (process.env.NODE_ENV === "development") {
      console.error("❌ [server-api] Erro HTTP:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
    }
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  if (process.env.NODE_ENV === "development") {
    console.log("📦 [server-api] Dados recebidos:", data);
  }

  return {
    success: true,
    data,
    message: "Success",
  };
}

export async function serverGet<T>(url: string): Promise<ApiResponse<T>> {
  return serverFetch<T>(url);
}

export async function serverPost<T>(
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return serverFetch<T>(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function serverPut<T>(
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return serverFetch<T>(url, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function serverPatch<T>(
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return serverFetch<T>(url, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function serverDelete<T>(url: string): Promise<ApiResponse<T>> {
  return serverFetch<T>(url, {
    method: "DELETE",
  });
}

// Função para verificar conectividade com o backend
export async function checkBackendConnection(): Promise<boolean> {
  try {
    await serverGet("/health");
    return true;
  } catch {
    return false;
  }
}
