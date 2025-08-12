export interface ApiError {
  message?: string;
  error?: string;
  details?: string;
  code?: string;
  status?: number;
  success?: boolean;
  statusCode?: number;
  errors?: any;
  timestamp?: string;
  path?: string;
  method?: string;
}

export const extractErrorMessage = (error: any): string => {
  console.log("🔍 [error-utils] Error received:", error);

  // Se já é uma string, verifica se contém JSON
  if (typeof error === "string") {
    console.log("🔍 [error-utils] Error is string:", error);

    // Se a string contém JSON (como no seu caso)
    if (error.includes('{"success":') || error.includes('{"message":')) {
      try {
        // Extrai o JSON da string
        const jsonMatch = error.match(/\{.*\}/);
        if (jsonMatch) {
          const jsonError = JSON.parse(jsonMatch[0]);
          console.log("🔍 [error-utils] Parsed JSON:", jsonError);

          if (jsonError.message) {
            return jsonError.message;
          }
        }
      } catch (parseError) {
        console.log("🔍 [error-utils] Failed to parse JSON:", parseError);
      }
    }

    // Se não conseguiu parsear JSON, retorna a string original
    return error;
  }

  // Se é um objeto de erro da API
  if (error && typeof error === "object") {
    if (error.message) {
      return error.message;
    }

    if (error.error) {
      return error.error;
    }

    if (error.details) {
      return error.details;
    }

    // Se não encontrou mensagem específica, tenta converter para string
    return JSON.stringify(error);
  }

  // Fallback
  return "Erro desconhecido";
};

export const getErrorType = (error: any): "error" | "warning" | "info" => {
  if (typeof error === "string") {
    if (
      error.toLowerCase().includes("credenciais inválidas") ||
      error.toLowerCase().includes("unauthorized") ||
      error.toLowerCase().includes("401")
    ) {
      return "error";
    }
    if (
      error.toLowerCase().includes("validation") ||
      error.toLowerCase().includes("invalid")
    ) {
      return "warning";
    }
  }

  if (error && typeof error === "object") {
    if (error.statusCode === 401 || error.status === 401) {
      return "error";
    }
    if (error.statusCode === 400 || error.status === 400) {
      return "warning";
    }
  }

  return "error";
};

// Função de teste temporária
export const testErrorExtraction = () => {
  const testError =
    'HTTP error! status: 401 - {"success":false,"statusCode":401,"message":"Credenciais inválidas","errors":null,"timestamp":"2025-08-07T09:56:32.138Z","path":"/api/v1/auth/login","method":"POST"}';

  console.log("🧪 [test] Testing error extraction...");
  const result = extractErrorMessage(testError);
  console.log("🧪 [test] Result:", result);

  return result;
};
