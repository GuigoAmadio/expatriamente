import { CalendarDays, Users, UserRound, DollarSign } from "lucide-react";
import { StatCard } from "@/components/ui/cards/StatCard";
import { SectionCard } from "@/components/ui/cards/SectionCard";
import { EmptyState } from "@/components/ui/EmptyState";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="Consultas na Semana"
          value={data?.cards?.consultasSemana || 0}
          icon={<CalendarDays className="w-6 h-6 text-stone-600" />}
        />
        <StatCard
          label="Usuários Totais"
          value={data?.cards?.usuariosTotal || 0}
          icon={<Users className="w-6 h-6 text-stone-600" />}
        />
        <StatCard
          label="Psicanalistas Totais"
          value={data?.cards?.psicanalistasTotal || 0}
          icon={<UserRound className="w-6 h-6 text-stone-600" />}
        />
        <StatCard
          label="Receita da Semana"
          value={`R$ ${(data?.cards?.receitaSemana || 0).toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-stone-600" />}
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
            {data?.appointmentsToday?.length > 0 ? (
              data.appointmentsToday.map((appointment) => (
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

        {/* Usuários que se cadastraram hoje */}
        <SectionCard
          title="Usuários Cadastrados Hoje"
          icon={<Users className="w-5 h-5 text-stone-600" />}
        >
          <div className="space-y-3">
            {data?.usersToday?.length > 0 ? (
              data.usersToday.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200"
                >
                  <div>
                    <p className="font-medium text-stone-900">
                      {user.name || "Usuário"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {user.email || "Email não informado"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-stone-900">
                      {new Date(user.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-stone-500">{user.role}</p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState subtitle="Nenhum usuário cadastrado hoje" />
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
