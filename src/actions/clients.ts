"use server";

import { cookies } from "next/headers";
import { Client } from "@/types/backend";

export interface GetClientsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface GetClientsResponse {
  data: Client[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface GetClientsCountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

export interface CreateClientData {
  name: string;
  email: string;
  phone?: string;
  status: "ACTIVE" | "INACTIVE";
}

async function serverFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
  const fullUrl = `${baseUrl}${url}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-client-id": "a9a86733-b2a5-4f0e-b230-caed27ce74df",
  };

  // Obter token do cookie
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth_token");

  if (authCookie?.value) {
    headers.Authorization = `Bearer ${authCookie.value}`;
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getClientsCount(): Promise<number> {
  try {
    const response = await serverFetch<GetClientsCountResponse>(
      "/clients/count"
    );

    if (response.success) {
      return response.data.count;
    }

    return 0;
  } catch (error) {
    console.error("Erro ao obter quantidade de clientes:", error);
    return 0;
  }
}

export async function getClients(params: GetClientsParams = {}) {
  try {
    const queryParams = new URLSearchParams();

    // URLSearchParams só aceita strings, mas mantemos a tipagem como number
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.status) queryParams.append("status", params.status);

    const response = await serverFetch<{
      success: boolean;
      data: {
        data: Client[];
        meta: {
          page: number;
          limit: number;
          totalItems: number;
          totalPages: number;
          hasNext: boolean;
          hasPrevious: boolean;
        };
      };
      message: string;
    }>(`/clients?${queryParams.toString()}`);

    return {
      success: response.success,
      data: response.data?.data || [],
      meta: response.data?.meta || {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      },
      message: response.message,
    };
  } catch (error) {
    console.error("❌ [clients] Erro ao buscar clientes:", error);
    return {
      success: false,
      data: [],
      meta: {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      },
      message: "Erro ao buscar clientes",
    };
  }
}

export async function createClient(
  data: CreateClientData
): Promise<Client | null> {
  try {
    console.log("🆕 [server-action] Criando cliente:", data);

    const response = await serverFetch<{
      success: boolean;
      data: {
        data: Client;
      };
      message: string;
    }>("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log("✅ [server-action] Cliente criado:", response.data);
    return response.data?.data || null;
  } catch (error) {
    console.error("❌ [server-action] Erro ao criar cliente:", error);
    throw error;
  }
}

export async function getClientById(id: string): Promise<Client | null> {
  try {
    console.log("🔍 [server-action] Buscando cliente com ID:", id);

    const response = await serverFetch<{
      success: boolean;
      data: {
        data: Client;
      };
      message: string;
    }>(`/clients/${id}`);

    console.log("✅ [server-action] Cliente encontrado:", response.data);
    return response.data?.data || null;
  } catch (error) {
    console.error("❌ [server-action] Erro ao buscar cliente:", error);
    throw error;
  }
}

export async function updateClient(
  id: string,
  data: Partial<CreateClientData>
): Promise<Client | null> {
  try {
    console.log("📝 [server-action] Atualizando cliente com ID:", id);
    console.log("📦 Dados sendo enviados:", data);

    const response = await serverFetch<{
      success: boolean;
      data: {
        data: Client;
      };
      message: string;
    }>(`/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    console.log("✅ [server-action] Cliente atualizado:", response.data);
    return response.data?.data || null;
  } catch (error) {
    console.error("❌ [server-action] Erro ao atualizar cliente:", error);
    throw error;
  }
}

export async function deleteClient(id: string): Promise<boolean> {
  try {
    console.log("🗑️ [server-action] Deletando cliente com ID:", id);

    const response = await serverFetch<{
      success: boolean;
      message: string;
    }>(`/clients/${id}`, {
      method: "DELETE",
    });

    console.log("✅ [server-action] Cliente deletado:", response);
    return response.success;
  } catch (error) {
    console.error("❌ [server-action] Erro ao deletar cliente:", error);
    throw error;
  }
}
