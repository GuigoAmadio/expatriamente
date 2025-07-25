import { serverGet } from "@/lib/server-api";
import type {
  BackendClient,
  BackendUser,
  PaginatedResponse,
} from "@/types/backend";
import { cacheUtils, CACHE_CONFIG } from "@/lib/cache";

// Listar clientes (paginação)
export async function getClients(employeeId: string) {
  return await cacheUtils.getCachedData(
    `clients:by-employee:${employeeId}`,
    async () => {
      const resp = await serverGet<{ data: PaginatedResponse<BackendClient> }>(
        `clients/by-employee/${employeeId}`
      );
      const paginated = resp.data?.data;
      const clients = paginated?.data || [];
      const meta = paginated?.meta;
      return { success: true, data: clients, meta };
    },
    CACHE_CONFIG.clients
  );
}

// Buscar cliente por ID
export async function getClientById(id: string) {
  return await cacheUtils.getCachedData(
    `clients:detail:${id}`,
    async () => {
      const resp = await serverGet<{ data: BackendClient }>(`/clients/${id}`);
      return { success: true, data: resp.data?.data };
    },
    CACHE_CONFIG.clients
  );
}

// Buscar usuários (clientes) atendidos por um employee
export async function getClientsByEmployee(employeeId: string) {
  return await cacheUtils.getCachedData(
    `clients:users-by-employee:${employeeId}`,
    async () => {
      const resp = await serverGet<{ data: PaginatedResponse<BackendUser> }>(
        `/clients/by-employee/${employeeId}`
      );
      const paginated = resp.data?.data;
      const clients = paginated?.data || [];
      const meta = paginated?.meta;
      return { success: true, data: clients, meta };
    },
    CACHE_CONFIG.clients
  );
}
