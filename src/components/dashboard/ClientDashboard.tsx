"use client";

import { Appointment } from "@/types/backend";

interface ClientDashboardProps {
  appointments: Appointment[];
}

export function ClientDashboard({ appointments }: ClientDashboardProps) {
  const upcomingAppointments = appointments
    .filter((apt) => {
      const now = new Date();
      const aptDate = new Date(apt.startTime);
      return aptDate > now;
    })
    .slice(0, 5);

  const pastAppointments = appointments
    .filter((apt) => {
      const now = new Date();
      const aptDate = new Date(apt.startTime);
      return aptDate < now;
    })
    .slice(0, 3);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Próxima Sessão
              </p>
              <p className="text-lg font-bold text-gray-900">
                {upcomingAppointments.length > 0
                  ? new Date(
                      upcomingAppointments[0].startTime
                    ).toLocaleDateString("pt-BR")
                  : "Nenhuma agendada"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Sessões
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Próximas Sessões
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {appointment.service?.name || "Serviço"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.employee?.name || "Psicólogo"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(appointment.startTime).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(appointment.startTime).toLocaleTimeString(
                        "pt-BR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {appointment.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhuma sessão agendada
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Sessões Anteriores
          </h3>
          <div className="space-y-3">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {appointment.service?.name || "Serviço"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.employee?.name || "Psicólogo"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(appointment.startTime).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(appointment.startTime).toLocaleTimeString(
                        "pt-BR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {appointment.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhuma sessão anterior
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Notas da Última Sessão
        </h3>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-gray-600">
            {pastAppointments.length > 0
              ? `Sua última sessão foi em ${new Date(
                  pastAppointments[0].startTime
                ).toLocaleDateString("pt-BR")} com ${
                  pastAppointments[0].employee?.name || "seu psicólogo"
                }.`
              : "Você ainda não teve sessões. Suas notas aparecerão aqui após sua primeira consulta."}
          </p>
        </div>
      </div>
    </div>
  );
}
