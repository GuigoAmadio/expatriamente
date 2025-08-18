"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  // Compat: expor tanto addToast quanto showToast
  addToast: (toast: Omit<Toast, "id">) => void;
  showToast: (toast: Omit<Toast, "id">) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Compat: hook com nome antigo
export const useToasts = () => useToast();

// Utils no escopo do módulo para uso tanto no Provider quanto no componente Toast
const getToastStyles = (type: Toast["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-600 border-green-700 text-white shadow-lg";
    case "error":
      return "bg-red-600 border-red-700 text-white shadow-lg";
    case "warning":
      return "bg-yellow-600 border-yellow-700 text-white shadow-lg";
    case "info":
      return "bg-blue-600 border-blue-700 text-white shadow-lg";
    default:
      return "bg-gray-600 border-gray-700 text-white shadow-lg";
  }
};

const getToastIcon = (type: Toast["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-white" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-white" />;
    case "warning":
      return <AlertCircle className="w-5 h-5 text-white" />;
    case "info":
      return <Info className="w-5 h-5 text-white" />;
    default:
      return <Info className="w-5 h-5 text-white" />;
  }
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const defaultTitle = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "Sucesso";
      case "error":
        return "Erro";
      case "warning":
        return "Atenção";
      case "info":
      default:
        return "Info";
    }
  };

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      ...toast,
      id,
      title: toast.title ?? defaultTitle(toast.type),
      duration: toast.duration || 5000,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast
    setTimeout(() => {
      hideToast(id);
    }, newToast.duration);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast: showToast, showToast, hideToast, clearToasts }}
    >
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                max-w-sm w-full p-4 rounded-lg border shadow-lg backdrop-blur-sm
                ${getToastStyles(toast.type)}
              `}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0">
                  {getToastIcon(toast.type)}
                </span>
                <div className="flex-1 min-w-0">
                  {toast.title && (
                    <h4 className="font-semibold text-sm">{toast.title}</h4>
                  )}
                  {toast.message && (
                    <p className="text-sm mt-1 opacity-90">{toast.message}</p>
                  )}
                </div>
                <button
                  onClick={() => hideToast(toast.id)}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Componente Toast para compat com imports existentes
export const Toast: React.FC<Toast> = ({ id, type, title, message }) => {
  const { hideToast } = useToast();
  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`max-w-sm w-full p-4 rounded-lg border shadow-lg backdrop-blur-sm ${getToastStyles(
        type
      )}`}
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0">{getToastIcon(type)}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{title}</h4>
          {message && <p className="text-sm mt-1 opacity-90">{message}</p>}
        </div>
        <button
          onClick={() => hideToast(id)}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
