# Integração Request Manager com Server API

## 🎯 **Problema Identificado**

O `request-manager` estava fazendo requisições diretamente via `fetch()` do navegador, **sem passar pelo `server-api.ts`**, resultando em:

- ❌ **Sem acesso aos cookies HTTP-only**
- ❌ **Sem token de autenticação automático**
- ❌ **Erros 401 Unauthorized** para endpoints protegidos
- ❌ **Inconsistência** entre Server Actions e Client-side requests

## ✅ **Solução Implementada**

### **1. Integração Híbrida Server/Client**

O `request-manager` agora usa uma abordagem híbrida:

```typescript
// ✅ No servidor: usa server-api (acesso a cookies HTTP-only)
if (typeof window === "undefined") {
  console.log(`🔄 [Request] Usando server-api para: ${cacheKey}`);
  const endpoint = url || `/${cacheKey.split(":")[0]}`;
  const response = await serverGet<T>(endpoint);
  return response.data;
}

// ✅ No cliente: usa fetch com token do localStorage
console.log(`🔄 [Request] Usando fetch do cliente para: ${cacheKey}`);
const token = this.getAuthToken();
const headers: HeadersInit = {
  "Cache-Control": "no-cache",
  "x-client-id": "2a2ad019-c94a-4f35-9dc8-dd877b3e8ec8",
};

if (token) {
  headers.Authorization = `Bearer ${token}`;
}
```

### **2. Métodos Atualizados**

#### **fetchWithCache:**

- ✅ **Servidor:** Usa `serverGet()` com cookies HTTP-only
- ✅ **Cliente:** Usa `fetch()` com token do localStorage

#### **create:**

- ✅ **Servidor:** Usa `serverPost()` com cookies HTTP-only
- ✅ **Cliente:** Usa `fetch()` com token do localStorage

#### **update:**

- ✅ **Servidor:** Usa `serverPatch()` com cookies HTTP-only
- ✅ **Cliente:** Usa `fetch()` com token do localStorage

#### **delete:**

- ✅ **Servidor:** Usa `serverDelete()` com cookies HTTP-only
- ✅ **Cliente:** Usa `fetch()` com token do localStorage

#### **login:**

- ✅ **Sempre:** Usa `fetch()` direto (não precisa de autenticação)
- ✅ **Inclui:** `x-client-id` header

### **3. Novo Método: getAuthToken()**

```typescript
// ✅ Obter token de autenticação do localStorage
private getAuthToken(): string | null {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    }
    return null;
  } catch (error) {
    console.error("❌ [Request] Erro ao obter token:", error);
    return null;
  }
}
```

## 🔄 **Fluxo de Autenticação**

### **Server-Side (Server Actions):**

```typescript
// 1. Request Manager detecta que está no servidor
if (typeof window === "undefined") {
  // 2. Usa server-api que acessa cookies HTTP-only
  const response = await serverGet<T>(endpoint);
  return response.data;
}
```

### **Client-Side (Prefetch, etc.):**

```typescript
// 1. Request Manager detecta que está no cliente
// 2. Obtém token do localStorage
const token = this.getAuthToken();

// 3. Inclui token no header Authorization
if (token) {
  headers.Authorization = `Bearer ${token}`;
}

// 4. Faz requisição com autenticação
const response = await fetch(url, { headers });
```

## 📊 **Benefícios da Integração**

### **1. Consistência de Autenticação:**

- ✅ **Server Actions:** Cookies HTTP-only (mais seguro)
- ✅ **Client Requests:** Token do localStorage (mais flexível)
- ✅ **Ambos:** Incluem `x-client-id` header

### **2. Melhor Performance:**

- ✅ **Server:** Acesso direto aos cookies (sem round-trip)
- ✅ **Client:** Cache local do token (rápido acesso)

### **3. Segurança Aprimorada:**

- ✅ **Server:** Cookies HTTP-only (não acessíveis via JavaScript)
- ✅ **Client:** Token em localStorage (para funcionalidades client-side)

### **4. Debugging Melhorado:**

- ✅ **Logs específicos** para cada tipo de requisição
- ✅ **Identificação clara** se está usando server-api ou fetch
- ✅ **Rastreamento** de headers de autenticação

## 🚀 **Impacto nos Problemas Anteriores**

### **Antes (Problemas):**

- ❌ `401 Unauthorized` em prefetch
- ❌ `401 Unauthorized` em cache validation
- ❌ `401 Unauthorized` em SSE connection
- ❌ Inconsistência entre Server Actions e Client requests

### **Depois (Soluções):**

- ✅ **Prefetch:** Usa server-api no servidor, token no cliente
- ✅ **Cache Validation:** Usa server-api no servidor, token no cliente
- ✅ **SSE:** Usa token do localStorage (já implementado)
- ✅ **Consistência:** Ambos os métodos incluem autenticação

## 🔧 **Configuração Necessária**

### **1. Headers Padrão:**

```typescript
const headers: HeadersInit = {
  "x-client-id": "2a2ad019-c94a-4f35-9dc8-dd877b3e8ec8",
  // ... outros headers específicos
};
```

### **2. Token de Autenticação:**

```typescript
if (token) {
  headers.Authorization = `Bearer ${token}`;
}
```

### **3. Fallback Graceful:**

```typescript
// Se não conseguir obter token, continua sem autenticação
// (melhor que falhar completamente)
```

## 📝 **Próximos Passos**

1. **Testar a integração:**

   - Verificar se prefetch está funcionando
   - Confirmar que cache validation está funcionando
   - Validar que SSE ainda funciona

2. **Monitorar logs:**

   - Verificar se está usando server-api quando apropriado
   - Confirmar que headers estão sendo enviados corretamente

3. **Otimizações futuras:**
   - Implementar refresh token automático
   - Adicionar retry com re-autenticação
   - Implementar cache de tokens

## 🎯 **Resultado Esperado**

Com essa integração, o sistema agora deve:

- ✅ **Funcionar consistentemente** tanto no servidor quanto no cliente
- ✅ **Respeitar a autenticação** em todas as requisições
- ✅ **Manter a performance** com cache e prefetch
- ✅ **Fornecer logs claros** para debugging
- ✅ **Ser mais seguro** com cookies HTTP-only no servidor
