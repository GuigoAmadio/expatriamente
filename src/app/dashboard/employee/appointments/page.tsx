import { getAuthUser } from "@/actions/auth";
import { getAppointmentsByEmployee } from "@/actions/appointments";
import { RoleGuard } from "@/components/guards/RoleGuard";
import AdminAppointmentsListClient from "@/components/dashboard/AdminAppointmentsListClient";
import { RefreshButton } from "@/components/ui/RefreshButton";

export default async function EmployeeAppointmentsPage() {
  const user = await getAuthUser();
  const result = user ? await getAppointmentsByEmployee(user.id) : { data: [] };
  const appointments = result.data || [];
  const meta = {
    page: 1,
    limit: 10,
    total: appointments.length,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  };
  const loading = false;
  const error = null;
  const searchTerm = "";
  const statusFilter = "";
  return (
    <RoleGuard allowedRoles={["EMPLOYEE"]}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
          <RefreshButton clearAllCache={true} className="ml-auto">
            🔄 Atualizar Agendamentos
          </RefreshButton>
        </div>
        <AdminAppointmentsListClient
          appointments={appointments}
          meta={meta}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
      </div>
    </RoleGuard>
  );
}
