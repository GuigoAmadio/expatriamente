import { RoleGuard } from "@/components/guards/RoleGuard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import FirstTimeCheck from "@/components/auth/FirstTimeCheck";
import { getAppointments } from "@/actions/dashboard";
import { getAuthUser } from "@/actions/auth";

export default async function EmployeeDashboardPage() {
  const user = await getAuthUser();
  const appointmentsResult = user
    ? await getAppointments({ employeeId: user.id })
    : { data: [] };

  if (!user) {
    return null; // RoleGuard vai redirecionar
  }

  return (
    <RoleGuard allowedRoles={["EMPLOYEE"]}>
      <FirstTimeCheck user={user as any}>
        <EmployeeDashboard appointments={appointmentsResult.data || []} />
      </FirstTimeCheck>
    </RoleGuard>
  );
}
