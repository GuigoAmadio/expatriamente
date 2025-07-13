"use client";

import { RoleGuard } from "@/components/guards/RoleGuard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
      <AdminDashboard />
    </RoleGuard>
  );
}
