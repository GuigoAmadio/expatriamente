import { RoleGuard } from "@/components/guards/RoleGuard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import { getAppointments } from "@/actions/dashboard";
import { getAuthUser } from "@/actions/auth";

export default async function EmployeeDashboardPage() {
  const user = await getAuthUser();
  const appointmentsResult = user
    ? await getAppointments({ employeeId: user.id })
    : { data: [] };
  return (
    <RoleGuard allowedRoles={["EMPLOYEE"]}>
      <EmployeeDashboard appointments={appointmentsResult.data || []} />
    </RoleGuard>
  );
}
