import { RoleGuard } from "@/components/guards/RoleGuard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import FirstTimeCheck from "@/components/auth/FirstTimeCheck";
import { getAppointments } from "@/actions/appointments";
import { getAuthUser } from "@/actions/auth";

export default async function EmployeeDashboardPage() {
  const user = await getAuthUser();
  const appointmentsResult = user
    ? await getAppointments({ employeeId: user.employeeId })
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
