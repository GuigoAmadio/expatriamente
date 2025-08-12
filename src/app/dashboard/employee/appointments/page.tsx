import { getAuthUser } from "@/actions/auth";
import { getAppointments } from "@/actions/appointments";
import { RoleGuard } from "@/components/guards/RoleGuard";
import AdminAppointmentsListClient from "@/components/dashboard/AdminAppointmentsListClient";

export default async function EmployeeAppointmentsPage() {
  const user = await getAuthUser();
  const result = user
    ? await getAppointments({ employeeId: user.employeeId })
    : { data: [] };
  const appointments = (result.data || []) as any[];

  const now = new Date();
  const upcoming = [...appointments]
    .filter((a) => new Date(a.startTime) > now)
    .sort((a, b) => +new Date(a.startTime) - +new Date(b.startTime))
    .slice(0, 3);

  const meta = {
    page: 1,
    limit: 10,
    total: appointments.length,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  };

  return (
    <RoleGuard allowedRoles={["EMPLOYEE"]}>
      <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Próximos agendamentos */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Próximos agendamentos
          </h2>
          {upcoming.length === 0 ? (
            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-gray-500">
              Nenhum agendamento futuro
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {upcoming.map((apt) => (
                <div
                  key={apt.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(apt.startTime).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-xl font-semibold text-gray-900">
                        {new Date(apt.startTime).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {apt.status}
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-gray-700">
                    <p className="font-medium">{apt.user?.name ?? "Cliente"}</p>
                    <p className="text-gray-500">
                      {apt.service?.name ?? "Serviço"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Calendário/lista existente */}
        <AdminAppointmentsListClient
          appointments={appointments as any}
          meta={meta}
          loading={false}
          error={null}
          searchTerm={""}
          statusFilter={""}
        />
      </div>
    </RoleGuard>
  );
}
