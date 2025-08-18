// ✅ SSE Connector para Cache Events em Tempo Real
import { intelligentCache } from "./intelligent-cache";

interface CacheEvent {
  type: "invalidate" | "invalidate_type" | "update" | "delete";
  pattern: string;
  timestamp: string;
  metadata?: any;
}

export class CacheSSEConnector {
  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private isConnected = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  // ✅ Conectar ao SSE
  connect() {
    if (typeof window === "undefined") {
      console.log("🚫 [CacheSSE] Ambiente não é browser, ignorando conexão");
      return;
    }

    // Verificar se usuário está logado
    if (!this.isUserLoggedIn()) {
      console.log("👤 [CacheSSE] Usuário não logado, não conectando SSE");
      return;
    }

    try {
      console.log("🔌 [CacheSSE] Iniciando conexão SSE...");
      console.log(
        `📊 [CacheSSE] Estado atual: conectado=${this.isConnected}, tentativas=${this.reconnectAttempts}`
      );

      // Construir URL com auth token
      const token = this.getAuthToken();
      const url = new URL("/api/cache-events/stream", window.location.origin);

      console.log(`🌐 [CacheSSE] URL de conexão: ${url.toString()}`);
      console.log(`🔑 [CacheSSE] Token presente: ${!!token}`);

      this.eventSource = new EventSource(url.toString(), {
        withCredentials: true,
      });

      console.log(`✅ [CacheSSE] EventSource criado, configurando handlers...`);
      this.setupEventHandlers();
    } catch (error) {
      console.error("❌ [CacheSSE] Erro ao conectar:", error);
      this.handleReconnection();
    }
  }

  // ✅ Configurar event handlers
  private setupEventHandlers() {
    if (!this.eventSource) return;

    this.eventSource.onopen = () => {
      console.log("✅ [SSE] Conectado para atualizações em tempo real");
      this.isConnected = true;
      this.reconnectAttempts = 0;

      // Limpar timeout de reconexão se existir
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }

      // Emitir evento de conexão
      this.emitConnectionEvent("connected");
    };

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Filtrar heartbeat
        if (data.type === "heartbeat") {
          console.log("💓 [SSE] Heartbeat recebido");
          return;
        }

        console.log(`📡 [SSE] Evento recebido:`, data);
        this.handleCacheEvent(data);
      } catch (error) {
        console.error("❌ [SSE] Erro ao processar evento:", error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error("❌ [SSE] Erro na conexão:", error);
      this.isConnected = false;
      this.emitConnectionEvent("error");
      this.handleReconnection();
    };
  }

  // ✅ Processar eventos de cache
  private async handleCacheEvent(event: CacheEvent) {
    try {
      console.log(`🎯 [CacheSSE] Processando evento de cache:`);
      console.log(`📋 [CacheSSE] Tipo: ${event.type}, Padrão: ${event.pattern}, Timestamp: ${event.timestamp}`);
      console.log(`🏷️ [CacheSSE] Metadata:`, event.metadata);

      switch (event.type) {
        case "invalidate":
          console.log(`🔄 [CacheSSE] Invalidando cache por padrão: ${event.pattern}`);
          await intelligentCache.invalidatePattern(event.pattern);
          console.log(`✅ [CacheSSE] Cache invalidado com sucesso: ${event.pattern}`);
          break;

        case "invalidate_type":
          console.log(`🔄 [CacheSSE] Invalidando cache por tipo: ${event.pattern}`);
          await intelligentCache.invalidateByType(event.pattern as any);
          console.log(`✅ [CacheSSE] Tipo de cache invalidado com sucesso: ${event.pattern}`);
          break;

        case "update":
          console.log(`🔄 [CacheSSE] Cache atualizado: ${event.pattern}`);
          console.log(`ℹ️ [CacheSSE] Implementação específica de atualização pode ser adicionada aqui`);
          break;

        case "delete":
          console.log(`🗑️ [CacheSSE] Deletando cache: ${event.pattern}`);
          await intelligentCache.delete(event.pattern);
          console.log(`✅ [CacheSSE] Cache deletado com sucesso: ${event.pattern}`);
          break;

        default:
          console.warn(`⚠️ [CacheSSE] Tipo de evento desconhecido: ${event.type}`);
      }

      // Emitir evento customizado para componentes
      console.log(`📡 [CacheSSE] Notificando componentes sobre atualização...`);
      this.notifyComponentUpdate(event);
      console.log(`✅ [CacheSSE] Componentes notificados com sucesso`);
    } catch (error) {
      console.error(`❌ [CacheSSE] Erro ao processar evento de cache:`, error);
      console.error(`🔍 [CacheSSE] Detalhes do evento que falhou:`, event);
    }
  }

  // ✅ Notificar componentes sobre atualização
  private notifyComponentUpdate(event: CacheEvent) {
    const customEvent = new CustomEvent("cache-updated", {
      detail: {
        type: event.type,
        pattern: event.pattern,
        timestamp: event.timestamp,
        metadata: event.metadata,
      },
    });

    window.dispatchEvent(customEvent);

    // Também emitir evento específico por tipo
    const typeEvent = new CustomEvent(`cache-${event.type}`, {
      detail: {
        pattern: event.pattern,
        timestamp: event.timestamp,
        metadata: event.metadata,
      },
    });

    window.dispatchEvent(typeEvent);
  }

  // ✅ Emitir eventos de conexão
  private emitConnectionEvent(
    status: "connected" | "disconnected" | "error" | "reconnecting"
  ) {
    const connectionEvent = new CustomEvent("sse-connection-change", {
      detail: {
        status,
        timestamp: new Date().toISOString(),
        attempts: this.reconnectAttempts,
      },
    });

    window.dispatchEvent(connectionEvent);
  }

  // ✅ Lidar com reconexão
  private handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(
        `❌ [SSE] Máximo de tentativas de reconexão atingido (${this.maxReconnectAttempts})`
      );
      this.emitConnectionEvent("error");
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(Math.pow(2, this.reconnectAttempts) * 1000, 30000); // Máximo 30s

    console.log(
      `🔄 [SSE] Tentativa de reconexão ${this.reconnectAttempts} em ${delay}ms`
    );
    this.emitConnectionEvent("reconnecting");

    this.reconnectTimeout = setTimeout(() => {
      this.disconnect(false); // Não emitir evento de desconexão
      this.connect();
    }, delay);
  }

  // ✅ Desconectar
  disconnect(emitEvent = true) {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.isConnected = false;
    this.reconnectAttempts = 0;

    if (emitEvent) {
      console.log("❌ [SSE] Desconectado");
      this.emitConnectionEvent("disconnected");
    }
  }

  // ✅ Verificar se usuário está logado
  private isUserLoggedIn(): boolean {
    try {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");
      return !!token;
    } catch (error) {
      return false;
    }
  }

  // ✅ Obter token de autenticação
  private getAuthToken(): string | null {
    try {
      return (
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token")
      );
    } catch (error) {
      return null;
    }
  }

  // ✅ Verificar status da conexão
  getConnectionStatus(): {
    isConnected: boolean;
    reconnectAttempts: number;
    readyState?: number;
  } {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      readyState: this.eventSource?.readyState,
    };
  }

  // ✅ Forçar reconexão
  forceReconnect() {
    console.log("🔄 [SSE] Forçando reconexão...");
    this.disconnect(false);
    this.reconnectAttempts = 0;
    this.connect();
  }
}

// Instância global
export const cacheSSE = new CacheSSEConnector();

// ✅ Auto-conectar quando possível
if (typeof window !== "undefined") {
  // Conectar após login
  window.addEventListener("storage", (event) => {
    if (event.key === "auth_token" && event.newValue) {
      console.log("🔑 [SSE] Token detectado, conectando...");
      setTimeout(() => cacheSSE.connect(), 1000);
    } else if (event.key === "auth_token" && !event.newValue) {
      console.log("🚪 [SSE] Logout detectado, desconectando...");
      cacheSSE.disconnect();
    }
  });

  // Reconectar quando a página ganhar foco
  window.addEventListener("focus", () => {
    const status = cacheSSE.getConnectionStatus();
    if (!status.isConnected && cacheSSE["isUserLoggedIn"]()) {
      console.log("👀 [SSE] Página em foco, verificando conexão...");
      setTimeout(() => cacheSSE.forceReconnect(), 500);
    }
  });

  // Desconectar quando a página perder foco (opcional)
  window.addEventListener("beforeunload", () => {
    cacheSSE.disconnect(false);
  });
}
