"use client";

import { FiCalendar, FiUsers, FiUser, FiDollarSign } from "react-icons/fi";

interface AdminDashboardProps {
  data: {
    cards: {
      consultasSemana: number;
      usuariosTotal: number;
      psicanalistasTotal: number;
      receitaSemana: number;
    };
    appointmentsToday: any[];
    usersToday: any[];
  };
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  return (
    <div className="p-5 space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Consultas Totais na Semana
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.cards?.consultasSemana || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <FiUsers className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Usuários Totais
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.cards?.usuariosTotal || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100">
              <FiUser className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Psicanalistas Totais
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.cards?.psicanalistasTotal || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100">
              <FiDollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Receita da Semana
              </p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {(data?.cards?.receitaSemana || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Listas lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agendamentos de hoje */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiCalendar className="w-5 h-5" />
            Agendamentos de Hoje
          </h3>
          <div className="space-y-3">
            {data?.appointmentsToday?.length > 0 ? (
              data.appointmentsToday.map((appointment) => (
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

        {/* Usuários que se cadastraram hoje */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiUsers className="w-5 h-5" />
            Usuários Cadastrados Hoje
          </h3>
          <div className="space-y-3">
            {data?.usersToday?.length > 0 ? (
              data.usersToday.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.name || "Usuário"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user.email || "Email não informado"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(user.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhum usuário cadastrado hoje
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
