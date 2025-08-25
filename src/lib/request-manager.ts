// ✅ Request Manager com Deduplication e Loading States
export class RequestManager {
  private pendingRequests = new Map<string, Promise<any>>();
  private loadingStates = new Map<string, boolean>();
  private requestCounters = new Map<string, number>();
  private abortControllers = new Map<string, AbortController>();

  // ✅ Adicionar a propriedade API_BASE_URL
  private API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://api.expatriamente.com/api/v1";

  // ✅ Prevenir múltiplas chamadas simultâneas
  async executeRequest<T>(
    key: string,
    requestFn: (signal?: AbortSignal) => Promise<T>,
    options?: {
      deduplicate?: boolean;
      timeout?: number;
      retries?: number;
    }
  ): Promise<T> {
    const { deduplicate = true, timeout = 30000, retries = 0 } = options || {};

    // Se deduplicação está ativa e já existe requisição
    if (deduplicate && this.pendingRequests.has(key)) {
      console.log(`🔄 [Request] Reutilizando requisição em andamento: ${key}`);
      return this.pendingRequests.get(key)!;
    }

    // Cancelar requisição anterior se existir
    if (this.abortControllers.has(key)) {
      this.abortControllers.get(key)?.abort();
    }

    // Criar novo AbortController
    const abortController = new AbortController();
    this.abortControllers.set(key, abortController);

    // Incrementar contador
    this.requestCounters.set(key, (this.requestCounters.get(key) || 0) + 1);

    // Marcar como carregando
    this.loadingStates.set(key, true);

    try {
      // Criar nova requisição com timeout e retry
      const requestPromise = this.executeWithRetry(
        () => requestFn(abortController.signal),
        retries,
        timeout
      );

      // Armazenar Promise para reutilização
      this.pendingRequests.set(key, requestPromise);

      console.log(`🚀 [Request] Iniciando requisição: ${key}`);
      const result = await requestPromise;
      console.log(`✅ [Request] Requisição concluída: ${key}`);

      return result;
    } catch (error) {
      console.error(`❌ [Request] Erro na requisição ${key}:`, error);
      throw error;
    } finally {
      // Decrementar contador
      const count = (this.requestCounters.get(key) || 1) - 1;
      if (count <= 0) {
        this.requestCounters.delete(key);
        this.loadingStates.set(key, false);
        this.pendingRequests.delete(key);
        this.abortControllers.delete(key);
      } else {
        this.requestCounters.set(key, count);
      }
    }
  }

  // ✅ Executar com retry automático
  private async executeWithRetry<T>(
    requestFn: () => Promise<T>,
    retries: number,
    timeout: number
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Executar com timeout
        const result = await Promise.race([
          requestFn(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Request timeout")), timeout)
          ),
        ]);

        return result;
      } catch (error) {
        lastError = error;

        if (attempt < retries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(
            `🔄 [Request] Tentativa ${
              attempt + 1
            } falhou, tentando novamente em ${delay}ms`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  }

  // ✅ Verificar se requisição está em andamento
  isLoading(key: string): boolean {
    return this.loadingStates.get(key) || false;
  }

  // ✅ Obter contador de requisições
  getRequestCount(key: string): number {
    return this.requestCounters.get(key) || 0;
  }

  // ✅ Cancelar requisição específica
  cancelRequest(key: string): void {
    if (this.abortControllers.has(key)) {
      this.abortControllers.get(key)?.abort();
    }

    this.pendingRequests.delete(key);
    this.loadingStates.set(key, false);
    this.requestCounters.delete(key);
    this.abortControllers.delete(key);

    console.log(`❌ [Request] Requisição cancelada: ${key}`);
  }

  // ✅ Cancelar todas as requisições
  cancelAllRequests(): void {
    // Cancelar todos os AbortControllers
    for (const [key, controller] of this.abortControllers.entries()) {
      controller.abort();
      console.log(`❌ [Request] Requisição cancelada: ${key}`);
    }

    this.pendingRequests.clear();
    this.loadingStates.clear();
    this.requestCounters.clear();
    this.abortControllers.clear();

    console.log(`🧹 [Request] Todas as requisições canceladas`);
  }

  // ✅ Obter estatísticas de requisições
  getStats() {
    return {
      pendingRequests: this.pendingRequests.size,
      loadingStates: Array.from(this.loadingStates.entries()).filter(
        ([, loading]) => loading
      ).length,
      totalRequests: Array.from(this.requestCounters.values()).reduce(
        (sum, count) => sum + count,
        0
      ),
    };
  }

  // ✅ Verificar se alguma requisição está pendente
  hasAnyPendingRequest(): boolean {
    return this.pendingRequests.size > 0;
  }

  // ✅ Obter todas as requisições em andamento
  getPendingRequests(): string[] {
    return Array.from(this.pendingRequests.keys());
  }

  // ✅ Aguardar todas as requisições terminarem
  async waitForAllRequests(): Promise<void> {
    const promises = Array.from(this.pendingRequests.values());
    if (promises.length > 0) {
      console.log(
        `⏳ [Request] Aguardando ${promises.length} requisições terminarem...`
      );
      await Promise.allSettled(promises);
      console.log(`✅ [Request] Todas as requisições terminaram`);
    }
  }

  // ✅ Mover as funções helper para dentro da classe
  async login(credentials: any): Promise<any> {
    return this.executeRequest(
      "auth:login",
      async (signal) => {
        const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          signal,
        });

        if (!response.ok) {
          throw new Error(`Login failed: ${response.status}`);
        }

        return response.json();
      },
      { timeout: 10000, retries: 1 }
    );
  }

  async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.executeRequest(
      cacheKey,
      async (signal) => {
        const response = await fetch(
          url || `${this.API_BASE_URL}/${cacheKey.split(":")[0]}`,
          {
            headers: { "Cache-Control": "no-cache" },
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }

        return response.json();
      },
      options
    );
  }

  async create<T>(url: string, data: any, entityType: string): Promise<T> {
    return this.executeRequest(
      `${entityType}:create`,
      async (signal) => {
        const response = await fetch(
          url || `${this.API_BASE_URL}/${entityType}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Create failed: ${response.status}`);
        }

        return response.json();
      },
      { timeout: 15000, retries: 1 }
    );
  }

  async update<T>(
    url: string,
    data: any,
    entityType: string,
    id: string
  ): Promise<T> {
    return this.executeRequest(
      `${entityType}:update:${id}`,
      async (signal) => {
        const response = await fetch(
          url || `${this.API_BASE_URL}/${entityType}/${id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Update failed: ${response.status}`);
        }

        return response.json();
      },
      { timeout: 15000, retries: 1 }
    );
  }

  async delete<T>(url: string, entityType: string, id: string): Promise<T> {
    return this.executeRequest(
      `${entityType}:delete:${id}`,
      async (signal) => {
        const response = await fetch(
          url || `${this.API_BASE_URL}/${entityType}/${id}`,
          {
            method: "DELETE",
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Delete failed: ${response.status}`);
        }

        return response.json();
      },
      { timeout: 10000, retries: 1 }
    );
  }
}

// Instância global
export const requestManager = new RequestManager();

// ✅ Tipos para melhor TypeScript
export interface RequestOptions {
  deduplicate?: boolean;
  timeout?: number;
  retries?: number;
}

// ✅ Exportar as funções helper através da instância
export const requestHelpers = {
  login: (credentials: any) => requestManager.login(credentials),
  fetchWithCache: <T>(
    url: string,
    cacheKey: string,
    options?: RequestOptions
  ) => requestManager.fetchWithCache<T>(url, cacheKey, options),
  create: <T>(url: string, data: any, entityType: string) =>
    requestManager.create<T>(url, data, entityType),
  update: <T>(url: string, data: any, entityType: string, id: string) =>
    requestManager.update<T>(url, data, entityType, id),
  delete: <T>(url: string, entityType: string, id: string) =>
    requestManager.delete<T>(url, entityType, id),
};
