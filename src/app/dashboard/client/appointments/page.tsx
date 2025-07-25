import { getAppointments } from "@/actions/dashboard";
import { getAuthUser } from "@/actions/auth";
import ClientAppointmentsClient from "@/components/dashboard/ClientAppointmentsClient";
import { RoleGuard } from "@/components/guards/RoleGuard";
import { RefreshButton } from "@/components/ui/RefreshButton";

export default async function ClientAppointmentsPage() {
  const user = await getAuthUser();
  const result = user
    ? await getAppointments({ userId: user.id })
    : { data: [] };
  const appointments = result.data || [];

  return (
    <RoleGuard allowedRoles={["CLIENT"]}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
          <RefreshButton clearAllCache={true} className="ml-auto">
            🔄 Atualizar Agendamentos
          </RefreshButton>
        </div>
        <ClientAppointmentsClient appointments={appointments} />
      </div>
    </RoleGuard>
  );
}
