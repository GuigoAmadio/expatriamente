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

// Sanitiza mensagens de erro para evitar exposição de informações sensíveis
const sanitizeErrorMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  // Mapear erros comuns para mensagens user-friendly
  if (
    lowerMessage.includes("credenciais inválidas") ||
    lowerMessage.includes("invalid credentials") ||
    lowerMessage.includes("unauthorized") ||
    lowerMessage.includes("senha incorreta") ||
    lowerMessage.includes("email não encontrado")
  ) {
    return "Email ou senha incorretos";
  }

  if (
    lowerMessage.includes("email já existe") ||
    lowerMessage.includes("email already exists") ||
    lowerMessage.includes("user already exists")
  ) {
    return "Este email já está cadastrado";
  }

  if (
    lowerMessage.includes("email inválido") ||
    lowerMessage.includes("invalid email")
  ) {
    return "Email inválido";
  }

  if (
    lowerMessage.includes("senha muito fraca") ||
    lowerMessage.includes("password too weak")
  ) {
    return "Senha muito fraca. Use pelo menos 6 caracteres";
  }

  if (
    lowerMessage.includes("validation") ||
    lowerMessage.includes("validação")
  ) {
    return "Dados inválidos. Verifique os campos";
  }

  // Para erros de servidor ou erros não tratados
  if (
    lowerMessage.includes("internal server error") ||
    lowerMessage.includes("500") ||
    lowerMessage.includes("database") ||
    lowerMessage.includes("prisma") ||
    lowerMessage.includes("connection") ||
    message.length > 100
  ) {
    // Mensagens muito longas geralmente são técnicas
    return "Erro interno. Tente novamente mais tarde";
  }

  // Se a mensagem parece segura, retorna ela
  return message;
};

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
            return sanitizeErrorMessage(jsonError.message);
          }
        }
      } catch (parseError) {
        console.log("🔍 [error-utils] Failed to parse JSON:", parseError);
      }
    }

    // Se não conseguiu parsear JSON, sanitiza a string original
    return sanitizeErrorMessage(error);
  }

  // Se é um objeto de erro da API
  if (error && typeof error === "object") {
    if (error.message) {
      return sanitizeErrorMessage(error.message);
    }

    if (error.error) {
      return sanitizeErrorMessage(error.error);
    }

    if (error.details) {
      return sanitizeErrorMessage(error.details);
    }

    // Se não encontrou mensagem específica, retorna erro genérico
    return "Erro interno. Tente novamente mais tarde";
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
