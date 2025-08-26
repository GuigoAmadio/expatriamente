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

// Mensagens de erro padronizadas para usuários
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Email ou senha incorretos",
  EMAIL_EXISTS: "Este email já está cadastrado",
  INVALID_EMAIL: "Email inválido",
  WEAK_PASSWORD: "Senha deve ter pelo menos 6 caracteres",
  VALIDATION_ERROR: "Dados inválidos. Verifique os campos",
  SERVER_ERROR: "Erro interno. Tente novamente em alguns minutos",
  NETWORK_ERROR: "Problema de conexão. Verifique sua internet",
  UNKNOWN_ERROR: "Algo deu errado. Tente novamente",
  ACCOUNT_LOCKED: "Conta temporariamente bloqueada. Tente mais tarde",
  EMAIL_NOT_VERIFIED: "Verifique seu email antes de continuar",
  SESSION_EXPIRED: "Sessão expirada. Faça login novamente",
  RATE_LIMIT: "Muitas tentativas. Aguarde alguns minutos",
} as const;

// Sanitiza mensagens de erro para evitar exposição de informações sensíveis
const sanitizeErrorMessage = (message: string): string => {
  // Limitar tamanho da mensagem (máximo 80 caracteres)
  if (message.length > 80) {
    console.warn(
      `[Security] Mensagem de erro muito longa (${message.length} chars), truncando:`,
      message
    );
    return ERROR_MESSAGES.SERVER_ERROR;
  }

  const lowerMessage = message.toLowerCase();

  // Mapear erros de autenticação
  if (
    lowerMessage.includes("credenciais inválidas") ||
    lowerMessage.includes("invalid credentials") ||
    lowerMessage.includes("unauthorized") ||
    lowerMessage.includes("senha incorreta") ||
    lowerMessage.includes("email não encontrado") ||
    lowerMessage.includes("wrong password") ||
    lowerMessage.includes("authentication failed") ||
    lowerMessage.includes("login failed")
  ) {
    return ERROR_MESSAGES.INVALID_CREDENTIALS;
  }

  // Mapear erros de email já existente
  if (
    lowerMessage.includes("email já existe") ||
    lowerMessage.includes("email already exists") ||
    lowerMessage.includes("user already exists") ||
    lowerMessage.includes("duplicate email") ||
    lowerMessage.includes("email taken") ||
    lowerMessage.includes("already registered")
  ) {
    return ERROR_MESSAGES.EMAIL_EXISTS;
  }

  // Mapear erros de email inválido
  if (
    lowerMessage.includes("email inválido") ||
    lowerMessage.includes("invalid email") ||
    lowerMessage.includes("malformed email") ||
    lowerMessage.includes("email format")
  ) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }

  // Mapear erros de senha
  if (
    lowerMessage.includes("senha muito fraca") ||
    lowerMessage.includes("password too weak") ||
    lowerMessage.includes("password too short") ||
    lowerMessage.includes("senha muito curta") ||
    lowerMessage.includes("minimum password")
  ) {
    return ERROR_MESSAGES.WEAK_PASSWORD;
  }

  // Mapear erros de validação
  if (
    lowerMessage.includes("validation") ||
    lowerMessage.includes("validação") ||
    lowerMessage.includes("bad request") ||
    lowerMessage.includes("invalid input") ||
    lowerMessage.includes("required field")
  ) {
    return ERROR_MESSAGES.VALIDATION_ERROR;
  }

  // Mapear erros de conta
  if (
    lowerMessage.includes("account locked") ||
    lowerMessage.includes("conta bloqueada") ||
    lowerMessage.includes("temporarily disabled") ||
    lowerMessage.includes("suspended")
  ) {
    return ERROR_MESSAGES.ACCOUNT_LOCKED;
  }

  // Mapear erros de verificação
  if (
    lowerMessage.includes("email not verified") ||
    lowerMessage.includes("email não verificado") ||
    lowerMessage.includes("verify email") ||
    lowerMessage.includes("account not activated")
  ) {
    return ERROR_MESSAGES.EMAIL_NOT_VERIFIED;
  }

  // Mapear erros de sessão
  if (
    lowerMessage.includes("session expired") ||
    lowerMessage.includes("sessão expirada") ||
    lowerMessage.includes("token expired") ||
    lowerMessage.includes("please login again")
  ) {
    return ERROR_MESSAGES.SESSION_EXPIRED;
  }

  // Mapear erros de rate limiting
  if (
    lowerMessage.includes("rate limit") ||
    lowerMessage.includes("too many requests") ||
    lowerMessage.includes("muitas tentativas") ||
    lowerMessage.includes("try again later")
  ) {
    return ERROR_MESSAGES.RATE_LIMIT;
  }

  // Mapear erros de rede
  if (
    lowerMessage.includes("network") ||
    lowerMessage.includes("timeout") ||
    lowerMessage.includes("connection") ||
    lowerMessage.includes("fetch")
  ) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // Para erros de servidor ou erros técnicos
  if (
    lowerMessage.includes("internal server error") ||
    lowerMessage.includes("500") ||
    lowerMessage.includes("database") ||
    lowerMessage.includes("prisma") ||
    lowerMessage.includes("sql") ||
    lowerMessage.includes("orm") ||
    lowerMessage.includes("exception") ||
    lowerMessage.includes("stack trace") ||
    lowerMessage.includes("undefined") ||
    lowerMessage.includes("null") ||
    lowerMessage.includes("cannot read") ||
    // Verificar se contém caracteres técnicos suspeitos
    message.includes("Error:") ||
    message.includes("TypeError:") ||
    message.includes("ReferenceError:") ||
    message.includes("SyntaxError:") ||
    message.includes("PrismaClient") ||
    message.includes("node_modules") ||
    message.includes("/api/") ||
    message.includes("localhost") ||
    // Verificar URLs, paths, ou códigos técnicos
    /^[A-Z][a-zA-Z]*Error:/.test(message) ||
    /\w+\.\w+\.\w+/.test(message) ||
    /[{}[\]()]/g.test(message)
  ) {
    console.warn(`[Security] Erro técnico detectado, sanitizando:`, message);
    return ERROR_MESSAGES.SERVER_ERROR;
  }

  // Verificar se a mensagem contém apenas caracteres seguros
  const safePattern = /^[a-zA-Z0-9\sáàâãéèêíïóôõöúçñü.,!?-]+$/i;
  if (!safePattern.test(message)) {
    console.warn(
      `[Security] Mensagem com caracteres suspeitos, sanitizando:`,
      message
    );
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  // Se a mensagem passou por todas as verificações e é curta, pode ser segura
  if (message.length <= 50) {
    return message;
  }

  // Por segurança, retornar mensagem genérica
  return ERROR_MESSAGES.UNKNOWN_ERROR;
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
