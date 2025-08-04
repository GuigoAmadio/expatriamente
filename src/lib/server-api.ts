import type { ApiResponse } from "@/types";

// Configuração da API
const API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://72.60.1.234:3000/api/v1", // Backend NestJS na porta 3000
  defaultClientId:
    process.env.NEXT_PUBLIC_DEFAULT_CLIENT_ID ||
    "2a2ad019-c94a-4f35-9dc8-dd877b3e8ec8",
};

// Função para obter headers que funciona tanto no servidor quanto no cliente
async function getHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-client-id": API_CONFIG.defaultClientId,
  };

  let token: string | undefined;

  try {
    console.log("🔍 [server-api] Iniciando busca do token...");

    // Verificar se estamos no contexto de uma requisição
    if (typeof window === "undefined") {
      try {
        // Sempre no servidor - acessa cookies HTTP-only
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();

        console.log("🔍 [server-api] Cookie store obtido:", cookieStore);

        const authCookie = cookieStore.get("auth_token");
        console.log(
          "🔍 [server-api] Cookie auth_token encontrado:",
          authCookie
        );

        if (authCookie) {
          token = authCookie.value;
          console.log(
            "✅ [server-api] Token extraído com sucesso:",
            token ? `${token.substring(0, 20)}...` : "null"
          );
        } else {
          console.log("❌ [server-api] Cookie auth_token não encontrado");

          // Listar todos os cookies para debug
          const allCookies = cookieStore.getAll();
          console.log(
            "🔍 [server-api] Todos os cookies disponíveis:",
            allCookies.map((c) => c.name)
          );
        }
      } catch (error) {
        console.error(
          "❌ [server-api] Erro ao acessar cookies (fora do contexto de requisição):",
          error
        );
        console.log("🔍 [server-api] Tentando método alternativo...");

        // Método alternativo: usar headers da requisição
        try {
          const { headers: requestHeaders } = await import("next/headers");
          const headersList = await requestHeaders();
          const cookieHeader = headersList.get("cookie");

          if (cookieHeader) {
            console.log(
              "🔍 [server-api] Cookie header encontrado:",
              cookieHeader
            );
            const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
              const [key, value] = cookie.trim().split("=");
              if (key && value) {
                acc[key] = value;
              }
              return acc;
            }, {} as Record<string, string>);

            token = cookies.auth_token;
            console.log(
              "🔍 [server-api] Token extraído do header:",
              token ? `${token.substring(0, 20)}...` : "null"
            );
          }
        } catch (headerError) {
          console.error(
            "❌ [server-api] Erro ao acessar headers:",
            headerError
          );
        }
      }
    } else {
      console.log(
        "❌ [server-api] Executando no cliente - não é possível acessar cookies HTTP-only"
      );
    }
  } catch (error) {
    console.error("❌ [server-api] Erro geral ao acessar cookies:", error);
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log("✅ [server-api] Authorization header adicionado");
  } else {
    console.log(
      "❌ [server-api] Nenhum token disponível - requisição sem autenticação"
    );
  }

  console.log("🔍 [server-api] Headers finais:", headers);
  return headers;
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
