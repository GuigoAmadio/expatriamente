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

// ✅ Importar o prefetch existente
import { prefetchEmployees } from "./prefetch";

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

// ✅ Interface para a resposta da API do prefetch
interface EmployeesApiResponse {
  success: boolean;
  data: {
    data: Employee[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
  message: string;
}

// Obter quantidade de employees com filtro opcional por status
export async function getEmployeesCount(isActive?: boolean): Promise<number> {
  try {
    const queryParams = new URLSearchParams();

    if (isActive !== undefined) {
      queryParams.append("isActive", isActive.toString());
    }

    // ✅ Adicionar cache para evitar chamadas repetidas
    const cacheKey = `employees:count:${
      isActive !== undefined ? isActive.toString() : "all"
    }`;

    const data = await cacheUtils.getCachedData(
      cacheKey,
      async () => {
        console.log(
          "🔄 [getEmployeesCount] Cache miss - buscando dados frescos do backend..."
        );
        const response = await serverGet<any>(
          `/employees/count?${queryParams.toString()}`
        );

        if (response.success && response.data && response.data.count) {
          return response.data.count as number;
        }

        return 0;
      },
      CACHE_CONFIG.employees
    );

    return data || 0;
  } catch (error) {
    console.error("Erro ao obter quantidade de employees:", error);
    return 0;
  }
}

// Obter quantidade de employees ativos
export async function getActiveEmployeeCount(): Promise<number> {
  try {
    // ✅ Adicionar cache para evitar chamadas repetidas
    const data = await cacheUtils.getCachedData(
      "employees:count:active",
      async () => {
        console.log(
          "🔄 [getActiveEmployeeCount] Cache miss - buscando dados frescos do backend..."
        );
        const response = await serverGet<any>("/employees/count/active");

        if (
          response.success &&
          response.data.data &&
          response.data.data.count
        ) {
          return response.data.data.count;
        }

        return 0;
      },
      CACHE_CONFIG.employees
    );

    return data || 0;
  } catch (error) {
    console.error("Erro ao obter quantidade de employees ativos:", error);
    return 0;
  }
}

// Obter quantidade de employees inativos
export async function getInactiveEmployeeCount(): Promise<number> {
  try {
    // ✅ Adicionar cache para evitar chamadas repetidas
    const data = await cacheUtils.getCachedData(
      "employees:count:inactive",
      async () => {
        console.log(
          "🔄 [getInactiveEmployeeCount] Cache miss - buscando dados frescos do backend..."
        );
        const response = await serverGet<any>("/employees/count/inactive");

        if (response.success && response.data && response.data.count) {
          return response.data.count;
        }

        return 0;
      },
      CACHE_CONFIG.employees
    );

    return data || 0;
  } catch (error) {
    console.error("Erro ao obter quantidade de employees inativos:", error);
    return 0;
  }
}

// ✅ Função unificada que usa o prefetch existente
export async function getEmployees(): Promise<Employee[]> {
  try {
    console.log("🔍 [getEmployees] Buscando funcionários via prefetch...");

    // ✅ Usar o prefetch existente
    const result = await prefetchEmployees();

    // ✅ Tipagem adequada para extrair dados
    const apiResponse = result as EmployeesApiResponse;

    if (apiResponse?.data?.data && Array.isArray(apiResponse.data.data)) {
      return apiResponse.data.data;
    }

    // ✅ Fallback para resposta direta
    if (Array.isArray(result)) {
      return result;
    }

    console.warn("Resposta inesperada do prefetch:", result);
    return [];
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    return [];
  }
}

// ✅ Função que usa o prefetch existente
export async function getEmployeesWithMeta(): Promise<{
  data: Employee[];
  meta: any;
}> {
  try {
    console.log(
      "🔍 [getEmployeesWithMeta] Buscando funcionários via prefetch..."
    );

    // ✅ Usar o prefetch existente
    const result = await prefetchEmployees();

    // ✅ Tipagem adequada para extrair dados
    const apiResponse = result as EmployeesApiResponse;

    if (apiResponse?.data?.data && apiResponse?.data?.meta) {
      return {
        data: apiResponse.data.data,
        meta: apiResponse.data.meta,
      };
    }

    // ✅ Fallback para resposta direta
    if (Array.isArray(result)) {
      return {
        data: result,
        meta: {
          page: 1,
          limit: 10,
          total: result.length,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        },
      };
    }

    console.warn("Resposta inesperada do prefetch:", result);
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
