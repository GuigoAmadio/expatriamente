// ✅ Custom SSE Connector - Implementação do Zero (SEM EventSource)
import { intelligentCache } from "./intelligent-cache";
import { SSE_CONFIG, getStreamUrl } from "./sse-config";
import type { SSEConnectionEvent, CacheUpdateEvent } from "@/types/sse-events";

// ✅ Importar funções de prefetch
import * as prefetchActions from "@/actions/prefetch";

// ✅ Sistema de debug controlado
const SSE_DEBUG = {
  ENABLED:
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_SSE_DEBUG === "true",
  VERBOSE: process.env.NEXT_PUBLIC_SSE_VERBOSE === "true",

  log: (message: string, ...args: any[]) => {
    if (SSE_DEBUG.ENABLED) {
      console.log(message, ...args);
    }
  },

  verbose: (message: string, ...args: any[]) => {
    if (SSE_DEBUG.ENABLED && SSE_DEBUG.VERBOSE) {
      console.log(message, ...args);
    }
  },

  warn: (message: string, ...args: any[]) => {
    console.warn(message, ...args);
  },

  error: (message: string, ...args: any[]) => {
    console.error(message, ...args);
  },
};

// ✅ Mapeamento de padrões de cache para funções de prefetch
const PREFETCH_MAPPING: Record<string, string[]> = {
  // Dashboard
  "dashboard:*": ["prefetchDashboardStats"],
  "dashboard:stats": ["prefetchDashboardStats"],

  // Appointments
  "appointments:*": ["prefetchTodayAppointments", "prefetchMyAppointments"],
  "appointments:today": ["prefetchTodayAppointments"],
  "appointments:my": ["prefetchMyAppointments"],

  // Employees
  "employees:*": ["prefetchEmployees", "prefetchAvailableEmployees"],
  "employees:list": ["prefetchEmployees"],
  "employees:available": ["prefetchAvailableEmployees"],

  // Clients
  "clients:*": ["prefetchMyClients", "prefetchAllClients"],
  "clients:my": ["prefetchMyClients"],
  "clients:all": ["prefetchAllClients"],

  // Services
  "services:*": ["prefetchAvailableServices", "prefetchAllServices"],
  "services:available": ["prefetchAvailableServices"],
  "services:all": ["prefetchAllServices"],

  // Profile/Auth
  "profile:*": ["prefetchCurrentProfile"],
  "profile:current": ["prefetchCurrentProfile"],

  // Settings
  "settings:*": ["prefetchAppSettings"],
  "settings:app": ["prefetchAppSettings"],

  // Analytics
  "analytics:*": [
    "prefetchMonthlyAnalytics",
    "prefetchPersonalAnalytics",
    "prefetchDetailedAnalytics",
  ],
  "analytics:monthly": ["prefetchMonthlyAnalytics"],
  "analytics:personal": ["prefetchPersonalAnalytics"],
  "analytics:detailed": ["prefetchDetailedAnalytics"],

  // Users
  "users:*": ["prefetchAllUsers"],
  "users:all": ["prefetchAllUsers"],

  // System
  "system:*": ["prefetchSystemHealth"],
  "system:health": ["prefetchSystemHealth"],

  // Logs
  "logs:*": ["prefetchRecentLogs"],
  "logs:recent": ["prefetchRecentLogs"],
};

interface SSEConnectionStatus {
  isConnected: boolean;
  reconnectAttempts: number;
  readyState?: number;
  lastEvent?: Date;
}

interface User {
  id: string;
  email: string;
  clientId: string;
  role: string;
}

export class CustomSSEConnector {
  private abortController: AbortController | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = SSE_CONFIG.RECONNECTION.MAX_ATTEMPTS;
  private isConnected = false;
  private isConnecting = false;
  private isDisabled = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private currentUser: User | null = null;

  // ✅ Obter token de autenticação
  private getAuthToken(): string | null {
    try {
      return (
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token")
      );
    } catch (error) {
      console.error("Erro ao obter token:", error);
      return null;
    }
  }

  // ✅ Obter dados do usuário logado
  private getUserData(): User | null {
    try {
      const userStr =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      if (userStr) {
        return JSON.parse(userStr);
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    }
    return null;
  }

  // ✅ Definir usuário atual
  setUser(user: User | null): void {
    SSE_DEBUG.verbose("👤 [CustomSSE] Definindo usuário:", user);
    this.currentUser = user;
  }

  // ✅ Verificar se usuário está logado
  private isUserLoggedIn(): boolean {
    const token = this.getAuthToken();
    const user = this.currentUser || this.getUserData();
    SSE_DEBUG.verbose("🔍 [CustomSSE] Verificando login:", {
      hasToken: !!token,
      hasUser: !!user,
      role: user?.role,
    });

    // JWT já contém o clientId, só precisamos do token e usuário
    return !!(token && user);
  }

  // ✅ Conectar ao SSE usando fetch customizado
  async connect(): Promise<void> {
    // ✅ Verificações de segurança
    if (this.isDisabled) {
      SSE_DEBUG.log("🚫 [CustomSSE] SSE desabilitado");
      return;
    }

    if (typeof window === "undefined") {
      SSE_DEBUG.verbose("🚫 [CustomSSE] Ambiente não é browser");
      return;
    }

    if (this.isConnecting || this.isConnected) {
      SSE_DEBUG.warn(
        "🔄 [CustomSSE] Já conectando ou conectado - ignorando chamada duplicada"
      );
      return;
    }

    if (!this.isUserLoggedIn()) {
      SSE_DEBUG.verbose("👤 [CustomSSE] Usuário não logado");
      return;
    }

    try {
      this.isConnecting = true;
      SSE_DEBUG.log("🔌 [CustomSSE] Iniciando conexão SSE customizada...");

      // ✅ Obter dados necessários
      const token = this.getAuthToken();
      const user = this.currentUser || this.getUserData();

      if (!token || !user) {
        throw new Error("Token ou usuário não encontrados");
      }

      // JWT já contém o clientId, não precisamos validar aqui

      // ✅ Construir URL usando configuração centralizada
      const url = getStreamUrl();

      SSE_DEBUG.log(`🌐 [CustomSSE] Conectando: ${user.role}@${user.clientId}`);
      SSE_DEBUG.verbose(`🔑 [CustomSSE] URL: ${url}`);
      SSE_DEBUG.verbose(
        `🔑 [CustomSSE] Token: ${!!token}, Role: ${user.role} (clientId no JWT)`
      );

      // ✅ Criar AbortController para cancelar a conexão
      this.abortController = new AbortController();

      // ✅ Preparar headers
      const headers: Record<string, string> = {
        Accept: "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Authorization: `Bearer ${token}`, // ✅ Enviar token via Authorization header
      };

      // ✅ Fazer requisição fetch com streaming
      const response = await fetch(url, {
        method: "GET",
        headers,
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      // ✅ Configurar leitor de stream
      this.reader = response.body.getReader();
      this.isConnected = true;
      this.isConnecting = false;
      this.reconnectAttempts = 0;

      // ✅ Limpar timeout de reconexão
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }

      // ✅ Iniciar heartbeat
      this.startHeartbeat();

      // ✅ Emitir evento de conexão
      this.emitConnectionEvent("connected");

      // ✅ Iniciar leitura do stream
      this.readStream();
    } catch (error) {
      console.error("❌ [CustomSSE] Erro ao conectar:", error);
      this.isConnecting = false;
      this.isConnected = false;
      this.handleReconnection();
    }
  }

  // ✅ Ler stream de dados
  private async readStream(): Promise<void> {
    if (!this.reader) return;

    try {
      while (this.isConnected) {
        const { done, value } = await this.reader.read();

        if (done) {
          console.log("📡 [CustomSSE] Stream finalizado");
          break;
        }

        // ✅ Converter Uint8Array para string
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n");

        // ✅ Processar cada linha do SSE
        for (const line of lines) {
          if (line.trim() === "") continue;

          if (line.startsWith("data: ")) {
            const data = line.slice(6); // Remove 'data: '
            this.processSSEMessage(data);
          }
        }
      }
    } catch (error) {
      console.error("❌ [CustomSSE] Erro ao ler stream:", error);
      this.handleStreamError();
    }
  }

  // ✅ Processar mensagem SSE
  private processSSEMessage(data: string): void {
    try {
      const parsedData = JSON.parse(data);

      // ✅ Filtrar heartbeat
      if (parsedData.type === "heartbeat") {
        SSE_DEBUG.verbose("💓 [CustomSSE] Heartbeat recebido");
        return;
      }

      SSE_DEBUG.log(`📡 [CustomSSE] Evento recebido:`, parsedData);
      this.handleCacheEvent(parsedData);
    } catch (error) {
      console.error("❌ [CustomSSE] Erro ao processar mensagem SSE:", error);
    }
  }

  // ✅ Processar eventos de cache
  private async handleCacheEvent(event: CacheUpdateEvent): Promise<void> {
    try {
      SSE_DEBUG.log(
        `🎯 [CustomSSE] Processando evento: ${event.type} -> ${event.pattern}`
      );

      // ✅ INTEGRAÇÃO COM PREFETCHS REAIS
      await this.triggerSmartPrefetch(event);

      switch (event.type) {
        case "invalidate":
          SSE_DEBUG.log(`🔄 [CustomSSE] Invalidando cache: ${event.pattern}`);
          await intelligentCache.invalidatePattern(event.pattern);
          break;

        case "invalidate_type":
          SSE_DEBUG.log(
            `🔄 [CustomSSE] Invalidando por tipo: ${event.pattern}`
          );
          await intelligentCache.invalidateByType(event.pattern as any);
          break;

        case "update":
          SSE_DEBUG.log(`🔄 [CustomSSE] Atualizando cache: ${event.pattern}`);
          // Lógica de atualização já implementada no triggerSmartPrefetch
          break;

        case "delete":
          SSE_DEBUG.log(`🗑️ [CustomSSE] Removendo do cache: ${event.pattern}`);
          await intelligentCache.invalidatePattern(event.pattern);
          break;

        default:
          SSE_DEBUG.warn(`❓ [CustomSSE] Evento desconhecido: ${event.type}`);
      }

      // ✅ Emitir evento de cache para componentes
      this.emitCacheEvent(event);
    } catch (error) {
      console.error("❌ [CustomSSE] Erro ao processar evento de cache:", error);
    }
  }

  // ✅ Tratar erro do stream
  private handleStreamError(): void {
    console.error("❌ [CustomSSE] Erro na conexão do stream");
    this.isConnected = false;
    this.isConnecting = false;
    this.stopHeartbeat();
    this.emitConnectionEvent("error");
    this.handleReconnection();
  }

  // ✅ Gerenciar reconexão
  private handleReconnection(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("🚫 [CustomSSE] Máximo de tentativas de reconexão atingido");
      this.emitConnectionEvent("max_attempts_reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(
      SSE_CONFIG.RECONNECTION.BASE_DELAY * Math.pow(2, this.reconnectAttempts),
      SSE_CONFIG.RECONNECTION.MAX_DELAY
    );

    console.log(
      `🔄 [CustomSSE] Tentativa de reconexão ${this.reconnectAttempts}/${this.maxReconnectAttempts} em ${delay}ms`
    );

    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, delay);
  }

  // ✅ Iniciar heartbeat
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        console.log("💓 [CustomSSE] Enviando heartbeat...");
        // O servidor envia heartbeat automaticamente
      }
    }, SSE_CONFIG.HEARTBEAT.CLIENT_INTERVAL);
  }

  // ✅ Parar heartbeat
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // ✅ Desconectar
  disconnect(emitEvent = true): void {
    console.log("🔌 [CustomSSE] Desconectando SSE customizado...");

    // ✅ Cancelar requisição fetch
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }

    // ✅ Fechar reader
    if (this.reader) {
      this.reader.cancel();
      this.reader = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.stopHeartbeat();
    this.isConnected = false;
    this.isConnecting = false;
    this.reconnectAttempts = 0;

    if (emitEvent) {
      this.emitConnectionEvent("disconnected");
    }
  }

  // ✅ Forçar reconexão
  forceReconnect(): void {
    console.log("🔄 [CustomSSE] Forçando reconexão...");
    this.disconnect(false);
    this.reconnectAttempts = 0;
    this.isDisabled = false;
    this.connect();
  }

  // ✅ Obter status da conexão
  getConnectionStatus(): SSEConnectionStatus {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      readyState: this.isConnected ? 1 : this.isConnecting ? 0 : 2,
      lastEvent: new Date(),
    };
  }

  // ✅ Habilitar/Desabilitar
  enable(): void {
    console.log("✅ [CustomSSE] Habilitando SSE...");
    this.isDisabled = false;
  }

  disable(): void {
    console.log("🚫 [CustomSSE] Desabilitando SSE...");
    this.isDisabled = true;
    this.disconnect(false);
  }

  // ✅ Emitir eventos customizados
  private emitConnectionEvent(status: SSEConnectionEvent["status"]): void {
    if (typeof window !== "undefined") {
      const event: SSEConnectionEvent = {
        status,
        timestamp: new Date().toISOString(),
        attempts: this.reconnectAttempts,
      };

      window.dispatchEvent(
        new CustomEvent("sse-connection-change", {
          detail: event,
        })
      );
    }
  }

  // ✅ PREFETCH INTELIGENTE BASEADO EM EVENTOS SSE
  private async triggerSmartPrefetch(event: CacheUpdateEvent): Promise<void> {
    try {
      SSE_DEBUG.log(
        `🚀 [CustomSSE] Iniciando prefetch inteligente para: ${event.pattern}`
      );

      // ✅ Encontrar funções de prefetch correspondentes
      const prefetchFunctions = this.findPrefetchFunctions(event.pattern);

      if (prefetchFunctions.length === 0) {
        SSE_DEBUG.verbose(
          `⚠️ [CustomSSE] Nenhum prefetch configurado para: ${event.pattern}`
        );
        return;
      }

      // ✅ Executar prefetchs em paralelo com timeout
      const prefetchPromises = prefetchFunctions.map(async (funcName) => {
        try {
          SSE_DEBUG.log(`📥 [CustomSSE] Executando prefetch: ${funcName}`);

          // ✅ Acessar função do objeto importado
          const prefetchFunc = (prefetchActions as any)[funcName];
          if (typeof prefetchFunc === "function") {
            const result = await Promise.race([
              prefetchFunc(),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), 5000)
              ),
            ]);

            SSE_DEBUG.log(`✅ [CustomSSE] Prefetch concluído: ${funcName}`);
            return { function: funcName, success: true, result };
          } else {
            throw new Error(`Função ${funcName} não encontrada`);
          }
        } catch (error) {
          SSE_DEBUG.error(
            `❌ [CustomSSE] Erro no prefetch ${funcName}:`,
            error
          );
          return { function: funcName, success: false, error };
        }
      });

      // ✅ Aguardar todos os prefetchs (sem falhar se um der erro)
      const results = await Promise.allSettled(prefetchPromises);

      const successCount = results.filter(
        (r) => r.status === "fulfilled"
      ).length;
      SSE_DEBUG.log(
        `📊 [CustomSSE] Prefetch concluído: ${successCount}/${prefetchFunctions.length} sucessos`
      );
    } catch (error) {
      SSE_DEBUG.error(
        "❌ [CustomSSE] Erro geral no prefetch inteligente:",
        error
      );
    }
  }

  // ✅ Encontrar funções de prefetch baseadas no padrão
  private findPrefetchFunctions(pattern: string): string[] {
    const functions: string[] = [];

    // ✅ Busca exata
    if (PREFETCH_MAPPING[pattern]) {
      functions.push(...PREFETCH_MAPPING[pattern]);
    }

    // ✅ Busca por wildcard (ex: "dashboard:*" para "dashboard:stats")
    for (const [key, funcs] of Object.entries(PREFETCH_MAPPING)) {
      if (key.endsWith(":*")) {
        const prefix = key.replace(":*", ":");
        if (pattern.startsWith(prefix)) {
          functions.push(...funcs);
        }
      }
    }

    // ✅ Remover duplicatas
    return [...new Set(functions)];
  }

  private emitCacheEvent(event: CacheUpdateEvent): void {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cache-update", {
          detail: event,
        })
      );
    }
  }
}

// ✅ Instância global
export const customSSE = new CustomSSEConnector();

// ✅ Auto-conectar quando possível
if (typeof window !== "undefined") {
  // ✅ Conectar após login
  window.addEventListener("storage", (event) => {
    if (event.key === "auth_token" && event.newValue) {
      console.log("🔑 [CustomSSE] Token detectado, conectando...");
      setTimeout(() => customSSE.connect(), 1000);
    } else if (event.key === "auth_token" && !event.newValue) {
      console.log("🚪 [CustomSSE] Logout detectado, desconectando...");
      customSSE.disconnect();
    }
  });

  // ✅ Reconectar quando a página ganhar foco
  window.addEventListener("focus", () => {
    const status = customSSE.getConnectionStatus();
    if (!status.isConnected && customSSE["isUserLoggedIn"]()) {
      console.log("👀 [CustomSSE] Página em foco, verificando conexão...");
      setTimeout(() => customSSE.forceReconnect(), 500);
    }
  });

  // ✅ Desconectar quando a página for fechada
  window.addEventListener("beforeunload", () => {
    customSSE.disconnect(false);
  });
}
