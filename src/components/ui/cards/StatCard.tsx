"use client";

import React from "react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="card-elevated p-4 flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-[#453706]">{label}</p>
        <p className="text-2xl font-bold text-[#453706]">{value}</p>
      </div>
      {icon && <div className="p-2 rounded-full bg-[#ebebd7]">{icon}</div>}
    </div>
  );
}
