"use client";

import React from "react";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="text-center py-6">
      {title && <p className="text-stone-700 font-medium">{title}</p>}
      {subtitle && <p className="text-stone-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}
