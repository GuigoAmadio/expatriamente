'use server';

import { 
  serverGet, 
  serverPost, 
  serverPut, 
  serverPatch, 
  serverDelete,
  serverFetch 
} from '@/lib/server-api';

// ✅ GET Request
export async function serverRequestGet<T>(endpoint: string) {
  try {
    console.log(`🚀 [Request Manager Server Action] GET ${endpoint}`);
    const result = await serverGet<T>(endpoint);
    console.log(`✅ [Request Manager Server Action] GET ${endpoint} concluído`);
    return result;
  } catch (error) {
    console.error(`❌ [Request Manager Server Action] Erro em GET ${endpoint}:`, error);
    throw error;
  }
}

// ✅ POST Request
export async function serverRequestPost<T>(endpoint: string, body: any) {
  try {
    console.log(`🚀 [Request Manager Server Action] POST ${endpoint}`);
    const result = await serverPost<T>(endpoint, body);
    console.log(`✅ [Request Manager Server Action] POST ${endpoint} concluído`);
    return result;
  } catch (error) {
    console.error(`❌ [Request Manager Server Action] Erro em POST ${endpoint}:`, error);
    throw error;
  }
}

// ✅ PUT Request
export async function serverRequestPut<T>(endpoint: string, body: any) {
  try {
    console.log(`🚀 [Request Manager Server Action] PUT ${endpoint}`);
    const result = await serverPut<T>(endpoint, body);
    console.log(`✅ [Request Manager Server Action] PUT ${endpoint} concluído`);
    return result;
  } catch (error) {
    console.error(`❌ [Request Manager Server Action] Erro em PUT ${endpoint}:`, error);
    throw error;
  }
}

// ✅ PATCH Request
export async function serverRequestPatch<T>(endpoint: string, body: any) {
  try {
    console.log(`🚀 [Request Manager Server Action] PATCH ${endpoint}`);
    const result = await serverPatch<T>(endpoint, body);
    console.log(`✅ [Request Manager Server Action] PATCH ${endpoint} concluído`);
    return result;
  } catch (error) {
    console.error(`❌ [Request Manager Server Action] Erro em PATCH ${endpoint}:`, error);
    throw error;
  }
}

// ✅ DELETE Request
export async function serverRequestDelete<T>(endpoint: string) {
  try {
    console.log(`🚀 [Request Manager Server Action] DELETE ${endpoint}`);
    const result = await serverDelete<T>(endpoint);
    console.log(`✅ [Request Manager Server Action] DELETE ${endpoint} concluído`);
    return result;
  } catch (error) {
    console.error(`❌ [Request Manager Server Action] Erro em DELETE ${endpoint}:`, error);
    throw error;
  }
}

// ✅ Generic Request
export async function serverRequest<T>(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    console.log(`🚀 [Request Manager Server Action] ${options.method || 'GET'} ${endpoint}`);
    const result = await serverFetch<T>(endpoint, options);
    console.log(`✅ [Request Manager Server Action] ${options.method || 'GET'} ${endpoint} concluído`);
    return result;
  } catch (error) {
    console.error(`❌ [Request Manager Server Action] Erro em ${options.method || 'GET'} ${endpoint}:`, error);
    throw error;
  }
}
