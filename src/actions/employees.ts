"use server";

import {
  serverGet,
  serverPost,
  serverDelete,
  serverPatch,
} from "@/lib/server-api";
import { Employee as BackendEmployee } from "@/types/backend";
// ✅ Imports para cache inteligente
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

// Re-exportar o tipo do backend para manter compatibilidade
export type Employee = BackendEmployee;

export interface CreateEmployeeData {
  name: string;
  email: string;
  phone?: string;
  position?: string;
  description?: string;
  isActive?: boolean;
  workingHours?: any;
}

export interface UpdateEmployeeData extends Partial<CreateEmployeeData> {
  id: string;
}

export interface GetEmployeesCountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

export interface GetEmployeeCountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

// Obter quantidade de employees com filtro opcional por status
export async function getEmployeesCount(isActive?: boolean): Promise<number> {
  try {
    const queryParams = new URLSearchParams();

    if (isActive !== undefined) {
      queryParams.append("isActive", isActive.toString());
    }

    const response = await serverGet<any>(
      `/employees/count?${queryParams.toString()}`
    );

    if (response.success && response.data && response.data.count) {
      return response.data.count as number;
    }

    return 0;
  } catch (error) {
    console.error("Erro ao obter quantidade de employees:", error);
    return 0;
  }
}

// Obter quantidade de employees ativos
export async function getActiveEmployeeCount(): Promise<number> {
  try {
    const response = await serverGet<any>("/employees/count/active");

    if (response.success && response.data.data && response.data.data.count) {
      return response.data.data.count;
    }

    return 0;
  } catch (error) {
    console.error("Erro ao obter quantidade de employees ativos:", error);
    return 0;
  }
}

// Obter quantidade de employees inativos
export async function getInactiveEmployeeCount(): Promise<number> {
  try {
    const response = await serverGet<any>("/employees/count/inactive");

    if (response.success && response.data && response.data.count) {
      return response.data.count;
    }

    return 0;
  } catch (error) {
    console.error("Erro ao obter quantidade de employees inativos:", error);
    return 0;
  }
}

export async function getEmployees(): Promise<Employee[]> {
  try {
    console.log("🔍 [getEmployees] Iniciando busca de funcionários...");
    
    // ✅ Usar cache inteligente com validação
    return await cacheUtils.getCachedData(
      "employees:list",
      async () => {
        console.log("🔄 [getEmployees] Cache miss - buscando dados frescos do backend...");

        const response = await serverGet<{
          success: boolean;
          data: {
            success: boolean;
            data: { data: Employee[]; meta: any };
            timestamp: string;
            path: string;
            method: string;
          };
          message: string;
        }>("/employees");

        // A resposta tem estrutura: response.data.data.data (array de funcionários)
        if (
          response.data?.data?.data &&
          Array.isArray(response.data.data.data)
        ) {
          return response.data.data.data;
        }

        // Fallback para resposta direta (array)
        if (Array.isArray(response.data)) {
          return response.data;
        }

        console.warn("Resposta inesperada da API:", response.data);
        return [];
      },
      CACHE_CONFIG.employees
    );
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    return [];
  }
}

export async function getEmployeesWithMeta(): Promise<{
  data: Employee[];
  meta: any;
}> {
  try {
    const response = await serverGet<{
      success: boolean;
      data: {
        success: boolean;
        data: { data: Employee[]; meta: any };
        meta: any;
        timestamp: string;
        path: string;
        method: string;
      };
      message: string;
    }>("/employees");

    // A resposta tem estrutura: response.data.data.data (array de funcionários) e response.data.data.meta
    if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
      return {
        data: response.data.data.data,
        meta: response.data.data.meta || {
          page: 1,
          limit: 10,
          total: response.data.data.data.length,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        },
      };
    }

    // Fallback para resposta direta (array)
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        meta: {
          page: 1,
          limit: 10,
          total: response.data.length,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        },
      };
    }

    console.warn("Resposta inesperada da API:", response.data);
    return {
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    return {
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  try {
    console.log("🔍 Buscando funcionário com ID:", id);

    const response = await serverGet<{
      success: boolean;
      data: {
        success: boolean;
        data: Employee;
        message: string;
      };
      message: string;
    }>(`/employees/${id}`);

    console.log("📦 Resposta completa da API:", response);
    console.log("📦 response.data:", response.data);
    console.log("📦 response.data?.data:", response.data?.data);

    // A resposta tem estrutura: response.data.data.data (objeto do funcionário)
    if (response.data?.data) {
      console.log("✅ Funcionário encontrado:", response.data.data);
      return response.data?.data as unknown as Employee;
    }

    console.warn("❌ Resposta inesperada da API:", response.data);
    return null;
  } catch (error) {
    console.error("❌ Erro ao buscar funcionário:", error);
    return null;
  }
}

export async function createEmployee(
  data: CreateEmployeeData
): Promise<Employee | null> {
  try {
    console.log("🆕 Criando funcionário:", data);

    const response = await serverPost<{
      success: boolean;
      data: Employee;
      message: string;
    }>("/employees", data);

    // ✅ Invalidar cache após criação
    await cacheUtils.invalidateByType("employees");
    console.log("🗑️ [Employees] Cache invalidado após criação");

    console.log("✅ Funcionário criado:", response.data);
    return response.data?.data || null;
  } catch (error) {
    console.error("❌ Erro ao criar funcionário:", error);
    throw error;
  }
}

export async function updateEmployee(
  id: string,
  data: Partial<Employee>
): Promise<Employee | null> {
  try {
    console.log("🔄 Atualizando funcionário:", id, data);

    const response = await serverPatch<{
      success: boolean;
      data: Employee;
      message: string;
    }>(`/employees/${id}`, data);

    // ✅ Invalidar cache após atualização
    await cacheUtils.invalidateByType("employees");
    await cacheUtils.invalidatePattern(`employee:${id}`);
    console.log("🗑️ [Employees] Cache invalidado após atualização");

    console.log("✅ Funcionário atualizado:", response.data);
    return response.data?.data || null;
  } catch (error) {
    console.error("❌ Erro ao atualizar funcionário:", error);
    throw error;
  }
}

export async function deleteEmployee(id: string): Promise<boolean> {
  try {
    await serverDelete(`/employees/${id}`);

    // ✅ Invalidar cache após exclusão
    await cacheUtils.invalidateByType("employees");
    await cacheUtils.invalidatePattern(`employee:${id}`);
    console.log("🗑️ [Employees] Cache invalidado após exclusão");

    return true;
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error);
    throw error;
  }
}

export async function toggleEmployeeStatus(
  id: string,
  isActive: boolean
): Promise<Employee | null> {
  try {
    const response = await serverPatch<Employee>(`/employees/${id}`, {
      isActive,
    });
    return response.data || null;
  } catch (error) {
    console.error("Erro ao alterar status do funcionário:", error);
    throw error;
  }
}
