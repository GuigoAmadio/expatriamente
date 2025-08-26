// TEMPORARILY DISABLED FOR PROJECT DELIVERY
/*
'use server';

import { 
  serverGet, 
  serverPost, 
  serverPut, 
  serverPatch, 
  serverDelete,
  serverFetch 
} from '@/lib/server-api';
*/

// ✅ GET Request - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export async function serverRequestGet<T>(endpoint: string) {
  console.log(
    "⚠️ [Request Manager Server Action] Desabilitado temporariamente para entrega do projeto"
  );
  return {
    success: false,
    data: null,
    message: "Desabilitado temporariamente",
  };
}

// ✅ POST Request - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export async function serverRequestPost<T>(endpoint: string, body: any) {
  console.log(
    "⚠️ [Request Manager Server Action] Desabilitado temporariamente para entrega do projeto"
  );
  return {
    success: false,
    data: null,
    message: "Desabilitado temporariamente",
  };
}

// ✅ PUT Request - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export async function serverRequestPut<T>(endpoint: string, body: any) {
  console.log(
    "⚠️ [Request Manager Server Action] Desabilitado temporariamente para entrega do projeto"
  );
  return {
    success: false,
    data: null,
    message: "Desabilitado temporariamente",
  };
}

// ✅ PATCH Request - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export async function serverRequestPatch<T>(endpoint: string, body: any) {
  console.log(
    "⚠️ [Request Manager Server Action] Desabilitado temporariamente para entrega do projeto"
  );
  return {
    success: false,
    data: null,
    message: "Desabilitado temporariamente",
  };
}

// ✅ DELETE Request - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export async function serverRequestDelete<T>(endpoint: string) {
  console.log(
    "⚠️ [Request Manager Server Action] Desabilitado temporariamente para entrega do projeto"
  );
  return {
    success: false,
    data: null,
    message: "Desabilitado temporariamente",
  };
}

// ✅ Generic Request - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export async function serverRequest<T>(
  endpoint: string,
  options: RequestInit = {}
) {
  console.log(
    "⚠️ [Request Manager Server Action] Desabilitado temporariamente para entrega do projeto"
  );
  return {
    success: false,
    data: null,
    message: "Desabilitado temporariamente",
  };
}

/*
// ALL ORIGINAL IMPLEMENTATIONS - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export async function serverRequestGet_DISABLED<T>(endpoint: string) {
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

export async function serverRequestPost_DISABLED<T>(endpoint: string, body: any) {
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

export async function serverRequestPut_DISABLED<T>(endpoint: string, body: any) {
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

export async function serverRequestPatch_DISABLED<T>(endpoint: string, body: any) {
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

export async function serverRequestDelete_DISABLED<T>(endpoint: string) {
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

export async function serverRequest_DISABLED<T>(endpoint: string, options: RequestInit = {}) {
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
*/
