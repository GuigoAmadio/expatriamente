"use client";

import React from "react";

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold text-[#453706] mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}
