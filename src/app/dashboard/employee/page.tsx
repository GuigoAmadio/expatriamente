"use client";

import { RoleGuard } from "@/components/guards/RoleGuard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";

export default function EmployeeDashboardPage() {
  return (
    <RoleGuard allowedRoles={["EMPLOYEE"]}>
      <EmployeeDashboard />
    </RoleGuard>
  );
}
