import type { BackendUser } from "@/types/backend";

/**
 * Configuração de Autenticação para Desenvolvimento Expatriamente
 * Permite desabilitar a autenticação em ambiente de desenvolvimento
 */

export const authConfig = {
  // Em desenvolvimento, permitir bypass da autenticação
  isAuthEnabled:
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENABLE_AUTH === "true",

  // Se auth estiver desabilitada, usar usuário mockado
  mockUser: {
    id: "dev-user-expatriamente",
    client_id: "clnt_expatriamente",
    name: "Admin Expatriamente",
    email: "admin@expatriamente.com",
    role: "ADMIN" as const,
    status: "ACTIVE" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

/**
 * Verifica se a autenticação está habilitada
 */
export function isAuthenticationEnabled(): boolean {
  return authConfig.isAuthEnabled;
}

/**
 * Retorna usuário atual (real ou mockado)
 */
export function getCurrentUser(): BackendUser {
  const mockData = authConfig.mockUser;

  // Transformar para o tipo BackendUser esperado
  return {
    id: mockData.id,
    name: mockData.name,
    email: mockData.email,
    role: mockData.role,
    status: mockData.status,
    clientId: mockData.client_id, // Converter client_id para clientId
    createdAt: mockData.createdAt,
    updatedAt: mockData.updatedAt,
    client: {
      id: mockData.client_id,
      name: "Expatriamente Demo",
      status: "ACTIVE",
    },
  };
}

/**
 * Simula verificação de autenticação
 */
export function isAuthenticated(): boolean {
  if (!authConfig.isAuthEnabled) {
    return true; // Em dev, sempre autenticado
  }

  // Aqui seria a lógica real de verificação
  return false;
}

/**
 * Middleware de autenticação para desenvolvimento
 */
export function devAuthMiddleware() {
  return {
    isAuthenticated: isAuthenticated(),
    user: getCurrentUser(),
    authEnabled: authConfig.isAuthEnabled,
  };
}
