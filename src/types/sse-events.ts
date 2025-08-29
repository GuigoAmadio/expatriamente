// ✅ Tipos para eventos customizados do SSE

export interface SSEConnectionEvent {
  status: "connected" | "disconnected" | "error" | "max_attempts_reached";
  timestamp: string;
  attempts: number;
}

export interface CacheUpdateEvent {
  type: "invalidate" | "invalidate_type" | "update" | "delete" | "heartbeat";
  pattern: string;
  timestamp: string;
  metadata?: any;
  clientId?: string;
}

// ✅ Extender a interface Window para incluir nossos eventos customizados
declare global {
  interface WindowEventMap {
    "sse-connection-change": CustomEvent<SSEConnectionEvent>;
    "cache-update": CustomEvent<CacheUpdateEvent>;
  }
}
