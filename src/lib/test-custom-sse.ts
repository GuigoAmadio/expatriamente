// ✅ Script de Teste para Custom SSE (Implementação do Zero)
import { customSSE } from "./custom-sse-connector";

export async function testCustomSSE() {
  console.log("🧪 [Test] Iniciando testes do Custom SSE (Implementação do Zero)...");

  // ✅ Teste 1: Verificar se o usuário está logado
  console.log("📋 [Test] 1. Verificando se usuário está logado...");

  // Simular usuário logado
  const mockUser = {
    id: "test-user-123",
    email: "test@example.com",
    clientId: "test-client-456",
    role: "ADMIN",
  };

  const mockToken = "mock-jwt-token-123";

  // Salvar dados mock no localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("auth_token", mockToken);
  }

  console.log("✅ [Test] Usuário mock configurado");

  // ✅ Teste 2: Verificar URL de conexão
  console.log("📋 [Test] 2. Verificando URL de conexão...");

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
  const expectedUrl = `${apiBaseUrl}/cache-events/stream?token=${mockToken}&client_id=${mockUser.clientId}`;

  console.log(`🌐 [Test] URL esperada: ${expectedUrl}`);

  // ✅ Teste 3: Testar conexão SSE customizada
  console.log("📋 [Test] 3. Testando conexão SSE customizada...");

  try {
    await customSSE.connect();
    console.log("✅ [Test] Conexão SSE customizada iniciada");
  } catch (error) {
    console.error("❌ [Test] Erro ao conectar SSE customizado:", error);
  }

  // ✅ Teste 4: Verificar status
  console.log("📋 [Test] 4. Verificando status da conexão...");

  setTimeout(() => {
    const status = customSSE.getConnectionStatus();
    console.log("📊 [Test] Status da conexão:", status);
  }, 2000);

  // ✅ Teste 5: Testar reconexão
  console.log("📋 [Test] 5. Testando reconexão...");

  setTimeout(async () => {
    console.log("🔄 [Test] Forçando reconexão...");
    try {
      await customSSE.forceReconnect();
    } catch (error) {
      console.error("❌ [Test] Erro ao reconectar:", error);
    }
  }, 5000);

  // ✅ Teste 6: Testar desconexão
  console.log("📋 [Test] 6. Testando desconexão...");

  setTimeout(() => {
    console.log("🔌 [Test] Desconectando...");
    customSSE.disconnect();
  }, 8000);

  // ✅ Teste 7: Limpeza
  console.log("📋 [Test] 7. Limpeza...");

  setTimeout(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("auth_token");
    }
    console.log("🧹 [Test] Dados mock removidos");
    console.log("✅ [Test] Testes concluídos!");
  }, 10000);
}

// ✅ Função para testar eventos de cache
export function testCacheEvents() {
  console.log("🧪 [Test] Testando eventos de cache...");

  // Simular evento de cache
  const mockCacheEvent = {
    type: "invalidate" as const,
    pattern: "users:list",
    timestamp: new Date().toISOString(),
    metadata: { source: "test" },
  };

  // Disparar evento customizado
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cache-update", {
        detail: mockCacheEvent,
      })
    );
    console.log("✅ [Test] Evento de cache disparado");
  }
}

// ✅ Função para testar eventos de conexão
export function testConnectionEvents() {
  console.log("🧪 [Test] Testando eventos de conexão...");

  // Simular evento de conexão
  const mockConnectionEvent = {
    status: "connected" as const,
    timestamp: new Date().toISOString(),
    attempts: 0,
  };

  // Disparar evento customizado
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("sse-connection-change", {
        detail: mockConnectionEvent,
      })
    );
    console.log("✅ [Test] Evento de conexão disparado");
  }
}

// ✅ Função para testar a implementação fetch customizada
export async function testFetchImplementation() {
  console.log("🧪 [Test] Testando implementação fetch customizada...");

  try {
    // Simular uma requisição fetch para o SSE
    const response = await fetch("http://localhost:3000/api/v1/cache-events/stream?token=test&client_id=test", {
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

    console.log("📡 [Test] Response status:", response.status);
    console.log("📡 [Test] Response headers:", Object.fromEntries(response.headers.entries()));

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Ler apenas os primeiros chunks para teste
      let chunkCount = 0;
      while (chunkCount < 3) {
        const { done, value } = await reader.read();
        
        if (done) {
          console.log("📡 [Test] Stream finalizado");
          break;
        }

        const chunk = decoder.decode(value);
        console.log(`📡 [Test] Chunk ${chunkCount + 1}:`, chunk);
        chunkCount++;

        // Parar após 3 chunks para não bloquear
        if (chunkCount >= 3) {
          reader.cancel();
          break;
        }
      }
    }

  } catch (error) {
    console.error("❌ [Test] Erro ao testar fetch:", error);
  }
}

// ✅ Função para executar todos os testes
export async function runAllTests() {
  console.log("🚀 [Test] Executando todos os testes do Custom SSE (Implementação do Zero)...");

  await testCustomSSE();

  setTimeout(() => {
    testCacheEvents();
  }, 3000);

  setTimeout(() => {
    testConnectionEvents();
  }, 6000);

  setTimeout(async () => {
    await testFetchImplementation();
  }, 9000);
}

// ✅ Auto-executar testes se estiver em desenvolvimento
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Descomente a linha abaixo para executar testes automaticamente
  // runAllTests();
}
