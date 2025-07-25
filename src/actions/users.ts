import {
  serverGet,
  serverPost,
  serverPut,
  serverDelete,
} from "@/lib/server-api";
import type { BackendUser } from "@/types/backend";
import { cacheUtils, CACHE_CONFIG, advancedCache } from "@/lib/cache";

type UsersApiResponse = {
  data: BackendUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    // outros campos se necessário
  };
};

type OuterApiResponse = {
  success: boolean;
  data: UsersApiResponse;
  message: string;
};

// Listar usuários (agora aceita filtros dinâmicos)
export async function getUsers(params: Record<string, any> = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.append(key, String(value));
  });
  return await cacheUtils.getCachedData(
    `users:list:${query.toString()}`,
    async () => {
      const resp = await serverGet<OuterApiResponse>(
        `/users?${query.toString()}`
      );
      const paginated = resp.data?.data;
      const users = paginated?.data || [];
      const meta = paginated?.meta;
      return { success: true, data: users, meta };
    },
    { ...CACHE_CONFIG.employees }
  );
}

// Criar usuário
export async function createUser(data: Partial<BackendUser>) {
  const resp = await serverPost<BackendUser>("/users", data);
  console.log("[Cache][createUser] Invalidando cache de lista de usuários...");
  await advancedCache.invalidatePattern("employees:list");
  return { success: true, data: resp.data };
}

// Atualizar usuário
export async function updateUser(id: string, data: Partial<BackendUser>) {
  const resp = await serverPut<BackendUser>(`/users/${id}`, data);
  console.log(
    `[Cache][updateUser] Invalidando cache de usuário ${id} e lista...`
  );
  await advancedCache.invalidatePattern(`employee:${id}`);
  await advancedCache.invalidatePattern("employees:list");
  return { success: true, data: resp.data };
}

// Deletar usuário
export async function deleteUser(id: string) {
  await serverDelete(`/users/${id}`);
  console.log(
    `[Cache][deleteUser] Invalidando cache de usuário ${id} e lista...`
  );
  await advancedCache.invalidatePattern(`employee:${id}`);
  await advancedCache.invalidatePattern("employees:list");
  return { success: true };
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterUserResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    // outros campos se necessário
  };
  message?: string;
  error?: string;
}

export async function registerUser(
  data: RegisterUserInput
): Promise<RegisterUserResponse> {
  const resp = await serverPost("/auth/register", data);
  // Corrigir aninhamento duplo de .data
  let user: any = undefined;
  if (resp.data && typeof resp.data === "object" && "data" in resp.data) {
    user = (resp.data as any).data;
  } else if (resp.data) {
    user = resp.data;
  }
  return {
    success: resp.success,
    user,
    message: resp.message,
    error: resp.error,
  };
}

export async function getServicesByEmployee(employeeId: string) {
  return await cacheUtils.getCachedData(
    `employee:${employeeId}:services`,
    async () => {
      console.log(
        "[Cache][getServicesByEmployee] Fetched from API",
        employeeId
      );
      const response = await serverGet(`/employees/${employeeId}/services`);
      return response.data;
    },
    { ...CACHE_CONFIG.services }
  );
}

export async function getEmployeeById(employeeId: string) {
  return await cacheUtils.getCachedData(
    `employee:${employeeId}`,
    async () => {
      console.log("[Cache][getEmployeeById] Fetched from API", employeeId);
      const response = await serverGet(`/employees/${employeeId}`);
      return response.data;
    },
    { ...CACHE_CONFIG.employees }
  );
}

export async function getAgendamentosByPsicanalista(employeeId: string) {
  return await cacheUtils.getCachedData(
    `employee:${employeeId}:appointments`,
    async () => {
      console.log(
        "[Cache][getAgendamentosByPsicanalista] Fetched from API",
        employeeId
      );
      const response = await serverGet(`/employees/${employeeId}/appointments`);
      return response.data || [];
    },
    { ...CACHE_CONFIG.appointments }
  );
}
