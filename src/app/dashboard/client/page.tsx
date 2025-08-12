import { RoleGuard } from "@/components/guards/RoleGuard";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { getAppointments } from "@/actions/appointments";
import { getAuthUser } from "@/actions/auth";

export default async function ClientDashboardPage() {
  const user = await getAuthUser();

  const { data: appointments, meta: rawMeta } = await getAppointments({
    userId: user?.id,
  });

  return (
    <RoleGuard allowedRoles={["CLIENT"]}>
      <ClientDashboard appointments={appointments || []} />
    </RoleGuard>
  );
}
