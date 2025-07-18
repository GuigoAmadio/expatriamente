"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAppointments } from "@/actions/dashboard";
import { Appointment } from "@/types/backend";

export function EmployeeDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await getAppointments({ employeeId: user?.id });
        if (response.success) {
          setAppointments(response.data || []);
        }
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadAppointments();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Agendamentos Hoje
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {todayAppointments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <span className="text-2xl">⏰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Próximos Agendamentos
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingAppointments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Clientes
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(appointments.map((apt) => apt.userId)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Agendamentos de Hoje
          </h3>
          <div className="space-y-3">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {appointment.user?.name || "Cliente"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.service?.name || "Serviço"}
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
                Nenhum agendamento para hoje
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Próximos Agendamentos
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {appointment.user?.name || "Cliente"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.service?.name || "Serviço"}
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
                Nenhum agendamento futuro
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
