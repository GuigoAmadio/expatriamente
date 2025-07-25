import React, { useEffect, useRef } from "react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
  id?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
  id,
  position = "top-right",
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timerRef.current = setTimeout(onClose, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onClose, duration]);

  const color =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600";

  // Posição
  const posClass =
    position === "top-right"
      ? "top-6 right-6"
      : position === "top-left"
      ? "top-6 left-6"
      : position === "bottom-right"
      ? "bottom-6 right-6"
      : "bottom-6 left-6";

  return (
    <div
      className={`fixed z-50 px-4 py-3 rounded shadow-lg text-white ${color} animate-fade-in-out ${posClass} min-w-[220px] max-w-xs pointer-events-auto flex items-center gap-2`}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <span className="flex-1 break-words text-sm">{message}</span>
      <button
        className="ml-2 text-white font-bold focus:outline-none focus:ring-2 focus:ring-white/80 rounded"
        onClick={onClose}
        aria-label="Fechar notificação"
        tabIndex={0}
      >
        ×
      </button>
    </div>
  );
};

// Hook para múltiplos toasts
import { useCallback, useState } from "react";
export function useToasts(initial: ToastProps[] = []) {
  const [toasts, setToasts] = useState<ToastProps[]>(initial);
  const addToast = useCallback(
    (toast: Omit<ToastProps, "onClose" | "id"> & { id?: string }) => {
      const id = toast.id || Math.random().toString(36).slice(2);
      setToasts((prev) => [
        ...prev,
        { ...toast, id, onClose: () => removeToast(id) },
      ]);
    },
    []
  );
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return { toasts, addToast, removeToast };
}

// Tailwind animation (adicione ao seu CSS global se necessário):
// .animate-fade-in-out { animation: fadeIn 0.3s, fadeOut 0.3s 2.7s; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
// @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
