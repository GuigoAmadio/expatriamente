"use client";

import { Appointment } from "@/types/backend";
import { CalendarDays, Clock, Users } from "lucide-react";
import { StatCard } from "@/components/ui/cards/StatCard";
import { SectionCard } from "@/components/ui/cards/SectionCard";
import { EmptyState } from "@/components/ui/EmptyState";

interface EmployeeDashboardProps {
  appointments: Appointment[];
}

export function EmployeeDashboard({ appointments }: EmployeeDashboardProps) {
  const todayAppointments = appointments.filter((apt) => {
    const today = new Date();
    const aptDate = new Date(apt.startTime);
    return aptDate.toDateString() === today.toDateString();
  });

  const upcomingAppointments = appointments
    .filter((apt) => {
      const now = new Date();
      const aptDate = new Date(apt.startTime);
      return aptDate > now;
    })
    .slice(0, 5);

  return (
    <div className="p-5 space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          label="Agendamentos Hoje"
          value={todayAppointments.length}
          icon={<CalendarDays className="w-6 h-6 text-stone-600" />}
        />
        <StatCard
          label="Próximos Agendamentos"
          value={upcomingAppointments.length}
          icon={<Clock className="w-6 h-6 text-stone-600" />}
        />
        <StatCard
          label="Total de Clientes"
          value={new Set(appointments.map((apt) => apt.userId)).size}
          icon={<Users className="w-6 h-6 text-stone-600" />}
        />
      </div>

      {/* Listas lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agendamentos de hoje */}
        <SectionCard
          title="Agendamentos de Hoje"
          icon={<CalendarDays className="w-5 h-5 text-stone-600" />}
        >
          <div className="space-y-3">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200"
                >
                  <div>
                    <p className="font-medium text-stone-900">
                      {appointment.user?.name || "Cliente"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {appointment.service?.name || "Serviço"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-stone-900">
                      {new Date(appointment.startTime).toLocaleTimeString(
                        "pt-BR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-xs text-stone-500">
                      {appointment.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState subtitle="Nenhum agendamento para hoje" />
            )}
          </div>
        </SectionCard>

        {/* Próximos agendamentos */}
        <SectionCard
          title="Próximos Agendamentos"
          icon={<Clock className="w-5 h-5 text-stone-600" />}
        >
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200"
                >
                  <div>
                    <p className="font-medium text-stone-900">
                      {appointment.user?.name || "Cliente"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {appointment.service?.name || "Serviço"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {new Date(appointment.startTime).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-stone-900">
                      {new Date(appointment.startTime).toLocaleTimeString(
                        "pt-BR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-xs text-stone-500">
                      {appointment.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState subtitle="Nenhum agendamento futuro" />
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
