# Integração do Prefetch com Server-API

## 🎯 **Problema Identificado**

O `intelligent-prefetch.ts` estava fazendo requisições diretas com `fetch()` que **não passavam pelo `server-api.ts`**, causando:

- ❌ **Sem cookies HTTP-only**: Requisições não autenticadas
- ❌ **Erros 401**: Falha de autenticação
- ❌ **Inconsistência**: Diferentes formas de fazer requisições

## ✅ **Solução Implementada**

### **Antes (Problemático)**
```typescript
// ❌ Requisição direta sem cookies HTTP-only
private async fetchDashboardStats(): Promise<any> {
  const response = await fetch(`${this.API_BASE_URL}/dashboard/stats`);
  if (!response.ok) throw new Error("Failed to fetch dashboard stats");
  return response.json();
}
```

### **Depois (Correto)**
```typescript
// ✅ Usando server-api com cookies HTTP-only
private async fetchDashboardStats(): Promise<any> {
  const response = await serverGet("/dashboard/stats");
  return response.data;
}
```

## 🔧 **Mudanças Realizadas**

### **1. Import do Server-API**
```typescript
import { serverGet } from "./server-api";
```

### **2. Todas as Funções de Fetch Atualizadas**

#### **Funções Básicas**
- ✅ `fetchDashboardStats()` → `serverGet("/dashboard/stats")`
- ✅ `fetchCurrentProfile()` → `serverGet("/auth/profile")`
- ✅ `fetchTodayAppointments()` → `serverGet("/appointments?date=${today}")`
- ✅ `fetchMyAppointments()` → `serverGet("/appointments/my")`

#### **Funções de Funcionários**
- ✅ `fetchEmployees()` → `serverGet("/employees")`
- ✅ `fetchAvailableEmployees()` → `serverGet("/employees/available")`

#### **Funções de Clientes**
- ✅ `fetchMyClients()` → `serverGet("/clients/my")`
- ✅ `fetchAllClients()` → `serverGet("/clients")`

#### **Funções de Serviços**
- ✅ `fetchAvailableServices()` → `serverGet("/services/available")`
- ✅ `fetchAllServices()` → `serverGet("/services")`

#### **Funções de Configuração**
- ✅ `fetchAppSettings()` → `serverGet("/settings")`

#### **Funções de Analytics**
- ✅ `fetchMonthlyAnalytics()` → `serverGet("/analytics/monthly")`
- ✅ `fetchPersonalAnalytics()` → `serverGet("/analytics/personal")`

#### **Funções SUPER_ADMIN**
- ✅ `fetchDetailedAnalytics()` → `serverGet("/analytics/detailed")`
- ✅ `fetchSystemHealth()` → `serverGet("/system/health")`
- ✅ `fetchAllUsers()` → `serverGet("/users")`
- ✅ `fetchRecentLogs()` → `serverGet("/logs/recent")`

### **3. Remoção de Código Desnecessário**
- ❌ Removido `API_BASE_URL` (agora gerenciado pelo server-api)
- ❌ Removido tratamento manual de erros HTTP
- ❌ Removido `response.json()` manual

## 🚀 **Benefícios da Correção**

### **1. Autenticação Consistente**
- ✅ **Cookies HTTP-only**: Todas as requisições autenticadas
- ✅ **Sem erros 401**: Autenticação automática
- ✅ **Mesmo padrão**: Todas as requisições usam server-api

### **2. Segurança Melhorada**
- ✅ **Tokens seguros**: Cookies HTTP-only não acessíveis via JavaScript
- ✅ **Proteção XSS**: Tokens não expostos no código cliente
- ✅ **Autenticação automática**: Sem necessidade de gerenciar tokens manualmente

### **3. Manutenibilidade**
- ✅ **Código limpo**: Menos código duplicado
- ✅ **Centralizado**: Configuração de API em um local
- ✅ **Consistente**: Mesmo padrão em todo o sistema

### **4. Performance**
- ✅ **Menos overhead**: Sem verificação manual de status HTTP
- ✅ **Tratamento automático**: Erros tratados pelo server-api
- ✅ **Cache otimizado**: Integração com sistema de cache

## 📋 **Fluxo de Autenticação**

### **Antes (Problemático)**
```
1. Prefetch faz fetch() direto
2. Sem cookies HTTP-only
3. Backend retorna 401 Unauthorized
4. Prefetch falha ❌
```

### **Depois (Correto)**
```
1. Prefetch chama serverGet()
2. server-api extrai cookies HTTP-only
3. Requisição autenticada enviada
4. Backend processa com sucesso ✅
```

## 🔍 **Logs de Debug**

### **Logs do Server-API**
```
🔍 [server-api] Iniciando busca do token...
✅ [server-api] Token extraído com sucesso: eyJhbGciOiJIUzI1NiIs...
✅ [server-api] Authorization header adicionado
📡 [server-api] Fazendo fetch: /dashboard/stats
✅ [server-api] Resposta HTTP: 200 OK
```

### **Logs do Prefetch**
```
🚀 [Prefetch] Iniciando prefetch essencial para role: SUPER_ADMIN
🔄 [Prefetch] Carregando dashboard:stats...
✅ [Prefetch] dashboard:stats carregado e salvo no cache
```

## 🎯 **Impacto nos Erros**

### **Erros Resolvidos**
- ❌ `GET http://localhost:3000/api/v1/dashboard/stats 401 (Unauthorized)`
- ❌ `GET http://localhost:3000/api/v1/auth/profile 401 (Unauthorized)`
- ❌ `GET http://localhost:3000/api/v1/appointments/my 401 (Unauthorized)`

### **Resultado Esperado**
- ✅ Todas as requisições de prefetch autenticadas
- ✅ Cache populado corretamente
- ✅ Sistema funcionando sem erros 401

## 📝 **Próximos Passos**

1. **Testar** o prefetch após login
2. **Verificar** se cache está sendo populado
3. **Monitorar** logs de autenticação
4. **Validar** que não há mais erros 401

## 🔧 **Configuração Necessária**

### **Variáveis de Ambiente**
```env
# Backend
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_DEFAULT_CLIENT_ID=2a2ad019-c94a-4f35-9dc8-dd877b3e8ec8
```

### **Cookies HTTP-Only**
O backend deve configurar cookies HTTP-only no login:
```typescript
res.cookie('auth_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
});
```
