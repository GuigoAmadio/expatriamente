# Correções de SSE e Hidratação - Expatriamente

## Problemas Identificados e Soluções

### 1. **Erro de Hidratação (SSR/CSR Mismatch)**

**Problema:**

```
stitched-error.ts:23 Uncaught Error: Hydration failed because the server rendered text didn't match the client.
```

**Causa:**

- Componentes renderizando conteúdo diferente no servidor vs cliente
- Valores dinâmicos (cache stats, prefetch stats) mudando entre renderizações
- Debug components sendo renderizados no servidor

**Solução:**

```typescript
// Adicionado estado para detectar cliente
const [isClient, setIsClient] = useState(false);

// Verificar se está no cliente
useEffect(() => {
  setIsClient(true);
}, []);

// Só renderizar debug components no cliente
{
  process.env.NODE_ENV === "development" && isClient && <DebugComponent />;
}
```

### 2. **SSE Conectando Antes da Autenticação**

**Problema:**

```
cache-sse-connector.ts:27 👤 [CacheSSE] Usuário não logado, não conectando SSE
```

**Causa:**

- Hook tentando conectar SSE antes do usuário estar autenticado
- Token não disponível no localStorage

**Solução:**

```typescript
// Modificado hook para receber usuário como parâmetro
export const useCacheAndSSE = (user?: any) => {
  useEffect(() => {
    // Só conectar se o usuário estiver autenticado
    if (!user) {
      console.log("👤 [useCacheAndSSE] Usuário não autenticado, aguardando...");
      return;
    }
    // ... resto da lógica
  }, [user]);
};
```

### 3. **Prefetch Usando Role Errada**

**Problema:**

```
intelligent-prefetch.ts:37 🚀 [Prefetch] Iniciando prefetch essencial para role: CLIENT
```

(Mesmo com usuário sendo SUPER_ADMIN)

**Causa:**

- Layout executando prefetch antes do usuário estar carregado
- Usando role padrão "CLIENT" em vez da role real

**Solução:**

```typescript
// Modificado para só executar quando usuário estiver disponível
useEffect(() => {
  const initializeDashboard = async () => {
    if (isInitialized || !user) return; // Verificar se usuário existe

    const role = user?.role?.toUpperCase() || "CLIENT";
    // ... resto da lógica
  };
}, [user, ...dependencies]);
```

### 4. **Problema de CORS com Cache-Control**

**Problema:**

```
Access to fetch at 'http://localhost:3000/api/v1/cache/metadata/employees' from origin 'http://localhost:3001' has been blocked by CORS policy: Request header field cache-control is not allowed by Access-Control-Allow-Headers in preflight response.
```

**Solução:**

```typescript
// Adicionado Cache-Control aos headers permitidos
app.enableCors({
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "x-client-id",
    "x-api-key",
    "Cache-Control", // ✅ Adicionado
  ],
});
```

### 5. **Contexto de Autenticação Incorreto**

**Problema:**

- Layout tentando obter usuário de localStorage em vez do contexto
- Função `getUserFromAuth()` desnecessária

**Solução:**

```typescript
// Usar contexto de autenticação diretamente
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  // Usar user diretamente do contexto
  const role = user?.role?.toUpperCase() || "CLIENT";
}
```

## Arquivos Modificados

1. **`expatriamente/src/app/dashboard/layout.tsx`**

   - Adicionado estado `isClient`
   - Corrigido uso do contexto de autenticação
   - Modificado para só executar prefetch com usuário autenticado

2. **`expatriamente/src/hooks/useCacheAndSSE.ts`**

   - Modificado para receber usuário como parâmetro
   - Adicionado verificação de autenticação antes de conectar SSE

3. **`backend/src/main.ts`**
   - Adicionado `Cache-Control` aos headers CORS permitidos

## Resultados Esperados

- ✅ Erro de hidratação resolvido
- ✅ SSE só conecta após autenticação
- ✅ Prefetch usa role correta do usuário
- ✅ Problemas de CORS resolvidos
- ✅ Contexto de autenticação funcionando corretamente

## Próximos Passos

1. Testar login e verificar se SSE conecta corretamente
2. Verificar se prefetch está usando role correta
3. Confirmar que não há mais erros de hidratação
4. Testar endpoints que estavam retornando 404/401
