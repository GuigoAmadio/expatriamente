import { RoleGuard } from "@/components/guards/RoleGuard";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { getAppointments } from "@/actions/dashboard";
import { getAuthUser } from "@/actions/auth";

export default async function ClientDashboardPage() {
  const user = await getAuthUser();
  const appointmentsResult = user
    ? await getAppointments({ userId: user.id })
    : { data: [] };
  return (
    <RoleGuard allowedRoles={["CLIENT"]}>
      <ClientDashboard appointments={appointmentsResult.data || []} />
    </RoleGuard>
  );
}
