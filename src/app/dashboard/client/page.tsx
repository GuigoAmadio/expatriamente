"use client";

import { RoleGuard } from "@/components/guards/RoleGuard";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";

export default function ClientDashboardPage() {
  return (
    <RoleGuard allowedRoles={["CLIENT"]}>
      <ClientDashboard />
    </RoleGuard>
  );
}
