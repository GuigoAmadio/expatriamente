"use client";

import React from "react";

interface LoadingProps {
  type?: "spinner" | "skeleton" | "dots";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function Loading({
  type = "spinner",
  size = "md",
  text = "Carregando...",
  className = "",
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (type === "skeleton") {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gray-200 rounded h-4 mb-2"></div>
        <div className="bg-gray-200 rounded h-4 mb-2 w-3/4"></div>
        <div className="bg-gray-200 rounded h-4 w-1/2"></div>
      </div>
    );
  }

  if (type === "dots") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        {text && <span className="ml-2 text-gray-600">{text}</span>}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-500`}
      ></div>
      {text && <span className="ml-2 text-gray-600">{text}</span>}
    </div>
  );
}

// Componente de skeleton específico para dashboard
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="bg-gray-200 h-4 w-20 rounded mb-2"></div>
            <div className="bg-gray-200 h-8 w-16 rounded"></div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="bg-gray-200 h-4 w-32 rounded mb-4"></div>
          <div className="bg-gray-200 h-48 rounded"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="bg-gray-200 h-4 w-32 rounded mb-4"></div>
          <div className="bg-gray-200 h-48 rounded"></div>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white p-6 rounded-lg shadow animate-pulse">
        <div className="bg-gray-200 h-4 w-32 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="bg-gray-200 h-4 flex-1 rounded"></div>
              <div className="bg-gray-200 h-4 w-20 rounded"></div>
              <div className="bg-gray-200 h-4 w-16 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente de skeleton para listas
export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
            </div>
            <div className="bg-gray-200 h-6 w-16 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
