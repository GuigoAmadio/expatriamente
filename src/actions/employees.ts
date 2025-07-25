"use server";

import {
  serverGet,
  serverPost,
  serverPut,
  serverDelete,
} from "@/lib/server-api";
import type { Employee } from "@/types/backend";
import { cacheUtils, CACHE_CONFIG } from "@/lib/cache";

export interface CreateEmployeeData {
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}

export interface UpdateEmployeeData {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  phone?: string;
}

// Listar todos os employees
export async function getEmployees(params?: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}) {
  try {
    // Montar query string com os parâmetros recebidos
    const query = new URLSearchParams();
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.role) query.append("role", params.role);
    if (params?.status) query.append("status", params.status);
    if (params?.search) query.append("search", params.search);

    const url = "/employees" + (query.toString() ? `?${query.toString()}` : "");

    return await cacheUtils.getCachedData(
      `employees:list:${url}`,
      async () => {
        const result = await serverGet<any>(url);
        // Corrigir o aninhamento
        const employees = result.data?.data?.data || [];
        const resumoEmployees = result.data?.data?.meta || [];
        return {
          success: true,
          data: employees,
          resumo: resumoEmployees,
        };
      },
      CACHE_CONFIG.employees
    );
  } catch (error) {
    console.error("Erro ao buscar employees:", error);
    return {
      success: false,
      message: "Erro ao buscar funcionários",
    };
  }
}

// Buscar employee por ID
export async function getEmployee(id: string) {
  try {
    return await cacheUtils.getCachedData(
      `employees:detail:${id}`,
      async () => {
        const result = await serverGet<Employee>(`/employees/${id}`);
        return result.data;
      },
      CACHE_CONFIG.employees
    );
  } catch (error) {
    console.error("Erro ao buscar employee:", error);
    return {
      success: false,
      message: "Erro ao buscar funcionário",
    };
  }
}

// Criar novo employee
export async function createEmployee(data: CreateEmployeeData) {
  try {
    const result = await serverPost<Employee>("/employees", data);

    // Invalidar cache de employees após criação
    await cacheUtils.invalidateByType("employees");

    return {
      success: true,
      data: result.data,
      message: "Funcionário criado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao criar employee:", error);
    return {
      success: false,
      message: "Erro ao criar funcionário",
    };
  }
}

// Atualizar employee
export async function updateEmployee(id: string, data: UpdateEmployeeData) {
  try {
    const result = await serverPut<Employee>(`/employees/${id}`, data);

    // Invalidar cache de employees após atualização
    await cacheUtils.invalidateByType("employees");

    return {
      success: true,
      data: result.data,
      message: "Funcionário atualizado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar employee:", error);
    return {
      success: false,
      message: "Erro ao atualizar funcionário",
    };
  }
}

// Excluir employee
export async function deleteEmployee(id: string) {
  try {
    await serverDelete(`/employees/${id}`);

    // Invalidar cache de employees após exclusão
    await cacheUtils.invalidateByType("employees");

    return {
      success: true,
      message: "Funcionário excluído com sucesso",
    };
  } catch (error) {
    console.error("Erro ao excluir employee:", error);
    return {
      success: false,
      message: "Erro ao excluir funcionário",
    };
  }
}

// Buscar employees por role
export async function getEmployeesByRole(role: string) {
  try {
    return await cacheUtils.getCachedData(
      `employees:role:${role}`,
      async () => {
        const result = await serverGet<Employee[]>(`/employees?role=${role}`);
        return result.data;
      },
      CACHE_CONFIG.employees
    );
  } catch (error) {
    console.error("Erro ao buscar employees por role:", error);
    return {
      success: false,
      message: "Erro ao buscar funcionários por função",
    };
  }
}

// Buscar employees ativos
export async function getActiveEmployees() {
  try {
    return await cacheUtils.getCachedData(
      "employees:active",
      async () => {
        const result = await serverGet<Employee[]>("/employees?status=ACTIVE");
        return result.data;
      },
      CACHE_CONFIG.employees
    );
  } catch (error) {
    console.error("Erro ao buscar employees ativos:", error);
    return {
      success: false,
      message: "Erro ao buscar funcionários ativos",
    };
  }
}

export async function getAllPsychologists() {
  return await cacheUtils.getCachedData(
    "employees:psychologists",
    async () => {
      const resp = await serverGet<{ data: Employee[] }>(
        "/employees?role=EMPLOYEE"
      );
      return resp.data?.data || [];
    },
    CACHE_CONFIG.employees
  );
}
