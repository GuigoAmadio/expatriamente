import { getAppointments } from "@/actions/appointments";
import { getAuthUser } from "@/actions/auth";
import ClientAppointmentsClient from "@/components/dashboard/ClientAppointmentsClient";
import type { Appointment } from "@/types/backend";
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
      <div className="min-h-screen bg-white bg-dots p-6 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Meus Agendamentos
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2">
                Gerencie seus agendamentos e visualize sua agenda
              </p>
            </div>
          </div>

          {/* Próximos agendamentos (até 3) */}
          <UpcomingAppointments appointments={appointments} />
          <ClientAppointmentsClient appointments={appointments} />
        </div>
      </div>
    </RoleGuard>
  );
}

function UpcomingAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const upcoming = [...appointments]
    .filter((a) => new Date(a.startTime).getTime() >= Date.now())
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )
    .slice(0, 3);

  if (upcoming.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-lg border border-gray-200 p-3 sm:p-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Próximos agendamentos
      </div>
      <ul className="divide-y divide-gray-200">
        {upcoming.map((apt) => (
          <li key={apt.id} className="py-2 flex items-center justify-between">
            <div className="text-sm text-gray-800">
              <span className="font-medium">
                {new Date(apt.startTime).toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                })}
              </span>
              <span className="mx-1">•</span>
              <span>
                {new Date(apt.startTime).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {apt.employee?.name && (
                <span className="ml-2 text-gray-600">
                  com {apt.employee.name}
                </span>
              )}
            </div>
            <span className="text-xs rounded-full bg-gray-900 text-white px-2 py-0.5">
              {apt.status === "CONFIRMED" ? "Confirmado" : "Agendado"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
