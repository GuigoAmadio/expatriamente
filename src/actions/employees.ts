"use server";

import type { Employee, CreateEmployeeRequest } from "@/types/backend";
import {
  serverGet,
  serverPost,
  serverPut,
  serverDelete,
} from "@/lib/server-api";

export async function getEmployees() {
  try {
    const result = await serverGet<Employee[]>("/employees");
    return {
      success: true,
      data: (result.data as any)?.data || result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar funcionários",
    };
  }
}

export async function getEmployee(id: string) {
  try {
    const result = await serverGet<Employee>(`/employees/${id}`);
    return {
      success: true,
      data: (result.data as any)?.data || result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao carregar funcionário",
    };
  }
}

export async function createEmployee(data: CreateEmployeeRequest) {
  try {
    const result = await serverPost<Employee>("/employees", data);
    return {
      success: true,
      data: (result.data as any)?.data || result.data,
      message: "Funcionário criado com sucesso",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao criar funcionário",
    };
  }
}

export async function updateEmployee(
  id: string,
  data: Partial<CreateEmployeeRequest>
) {
  try {
    const result = await serverPut<Employee>(`/employees/${id}`, data);
    return {
      success: true,
      data: (result.data as any)?.data || result.data,
      message: "Funcionário atualizado com sucesso",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao atualizar funcionário",
    };
  }
}

export async function deleteEmployee(id: string) {
  try {
    await serverDelete(`/employees/${id}`);
    return {
      success: true,
      message: "Funcionário excluído com sucesso",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao excluir funcionário",
    };
  }
}
