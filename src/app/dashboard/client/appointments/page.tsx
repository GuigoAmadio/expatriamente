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
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Meus Agendamentos
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie seus agendamentos e visualize sua agenda
              </p>
            </div>
            <RefreshButton clearAllCache={true} className="ml-auto">
              🔄 Atualizar Agendamentos
            </RefreshButton>
          </div>
          <ClientAppointmentsClient appointments={appointments} />
        </div>
      </div>
    </RoleGuard>
  );
}
