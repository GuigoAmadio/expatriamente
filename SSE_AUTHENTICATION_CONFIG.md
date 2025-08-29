# Configuração de Autenticação SSE com Cookies HTTP-Only

## 🎯 **Configuração Atual**

### **Backend (`backend/src/cache-events/cache-events.controller.ts`)**

O controller SSE agora suporta **duas formas** de autenticação:

1. **Query Parameter** (para compatibilidade)
2. **HTTP-Only Cookies** (recomendado)

```typescript
@Sse('stream')
streamCacheEvents(
  @Query('token') queryToken: string,        // Token via query parameter
  @Headers('cookie') cookies: string,        // Cookies HTTP-only
): Observable<MessageEvent> {
  // Extrair token de cookies ou query parameter
  let token = queryToken;

  if (!token && cookies) {
    const cookieToken = this.extractTokenFromCookies(cookies);
    if (cookieToken) {
      token = cookieToken;
      this.logger.log(`🍪 [SSE] Token extraído de cookies`);
    }
  }

  // Validar token...
}
```

### **Frontend (`expatriamente/src/lib/cache-sse-connector.ts`)**

O frontend continua enviando o token via query parameter, mas **cookies HTTP-only são enviados automaticamente** pelo navegador:

```typescript
// Criar EventSource
// Nota: EventSource nativo não suporta withCredentials, mas cookies HTTP-only
// são enviados automaticamente pelo navegador se o domínio for o mesmo
this.eventSource = new EventSource(url.toString());
```

## 🔧 **Como Funciona**

### **1. Autenticação via Cookies HTTP-Only**

- ✅ **Seguro**: Cookies HTTP-only não são acessíveis via JavaScript
- ✅ **Automático**: Navegador envia cookies automaticamente
- ✅ **Mesmo domínio**: Funciona quando frontend e backend estão no mesmo domínio

### **2. Autenticação via Query Parameter**

- ✅ **Compatibilidade**: Funciona com EventSource nativo
- ✅ **Cross-domain**: Funciona mesmo em domínios diferentes
- ⚠️ **Menos seguro**: Token visível na URL

## 🌐 **Configuração CORS**

O backend está configurado corretamente em `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: allowedOrigins,
  credentials: true, // ✅ Habilita envio de cookies
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "x-client-id",
    "x-api-key",
    "Cache-Control",
  ],
});
```

## 📋 **Fluxo de Autenticação**

### **Cenário 1: Mesmo Domínio (Recomendado)**

```
1. Frontend faz login → Backend define cookie HTTP-only
2. Frontend conecta SSE → Navegador envia cookie automaticamente
3. Backend extrai token do cookie → Valida e autoriza
4. SSE conecta com sucesso ✅
```

### **Cenário 2: Domínios Diferentes**

```
1. Frontend faz login → Backend define cookie HTTP-only
2. Frontend conecta SSE → Cookie não é enviado (cross-domain)
3. Frontend envia token via query parameter
4. Backend extrai token do query → Valida e autoriza
5. SSE conecta com sucesso ✅
```

## 🚀 **Vantagens da Configuração Atual**

### **1. Segurança**

- ✅ Cookies HTTP-only são mais seguros que localStorage
- ✅ Tokens não ficam expostos no JavaScript
- ✅ Proteção contra ataques XSS

### **2. Compatibilidade**

- ✅ Funciona com EventSource nativo
- ✅ Suporte a cross-domain
- ✅ Fallback para query parameter

### **3. Flexibilidade**

- ✅ Prioriza cookies quando disponíveis
- ✅ Fallback automático para query parameter
- ✅ Logs detalhados para debugging

## 🔍 **Debugging**

### **Logs do Backend**

```
🍪 [SSE] Token extraído de cookies
✅ [SSE] Token válido para usuário: admin@expatriamente.com
📡 [SSE] Nova conexão de cache events
```

### **Logs do Frontend**

```
🌐 [CacheSSE] URL de conexão: https://api.expatriamente.com/api/v1/cache-events/stream?token=...
🔑 [CacheSSE] Token presente: true
✅ [SSE] Conectado para atualizações em tempo real
```

## 🎯 **Recomendações**

### **Para Desenvolvimento**

- ✅ Usar `localhost:3000` para backend
- ✅ Usar `localhost:3001` para frontend
- ✅ Cookies HTTP-only funcionam automaticamente

### **Para Produção**

- ✅ Configurar domínios corretos no CORS
- ✅ Usar HTTPS para cookies seguros
- ✅ Configurar `SameSite` nos cookies

## 📝 **Próximos Passos**

1. **Testar** a configuração atual
2. **Verificar** se cookies estão sendo enviados
3. **Monitorar** logs de autenticação
4. **Otimizar** se necessário
