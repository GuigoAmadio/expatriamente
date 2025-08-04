"use client";
import { useState, useEffect } from "react";
import { RoleGuard } from "@/components/guards/RoleGuard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import {
  getAppointmentsByPeriod,
  getAppointmentsCount,
} from "@/actions/appointments";
import { getUsers } from "@/actions/users";
import { getActiveEmployeeCount } from "@/actions/employees";
import { getClientsCount } from "@/actions/clients";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      setError(null);

      try {
        // Obter data de hoje
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        // Obter data de início da semana (domingo)
        const weekStart = new Date(today);
        const dayOfWeek = today.getDay();
        weekStart.setDate(today.getDate() - dayOfWeek);
        const weekStartStr = weekStart.toISOString().split("T")[0];

        // Obter data de fim da semana (sábado)
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        const weekEndStr = weekEnd.toISOString().split("T")[0];

        // Buscar dados em paralelo
        const [
          appointmentsToday,
          appointmentsWeek,
          appointmentsCount,
          employeesCount,
          clientsCount,
        ] = await Promise.all([
          getAppointmentsByPeriod(todayStr, todayStr),
          getAppointmentsByPeriod(weekStartStr, weekEndStr),
          getAppointmentsCount({ startDate: todayStr, endDate: todayStr }),
          getActiveEmployeeCount(), // Apenas employees ativos
          getClientsCount(),
        ]);

        // Obter usuários cadastrados hoje (simulado - você pode implementar uma função específica se necessário)
        const usersToday = 0; // Por enquanto, deixamos como 0

        // Calcular receita (valor fixo de R$ 200 por sessão)
        const VALOR_SESSAO = 200;
        const receitaSemana = appointmentsCount * VALOR_SESSAO;

        const data = {
          // Cards principais
          cards: {
            consultasSemana: appointmentsCount,
            usuariosTotal: clientsCount,
            psicanalistasTotal: employeesCount,
            receitaSemana: receitaSemana,
          },
          // Listas
          appointmentsToday: appointmentsToday.data || [],
          usersToday: usersToday,
        };

        setDashboardData(data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
      {loading ? (
        <div className="p-8 text-center text-gray-500">Carregando...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : (
        <AdminDashboard data={dashboardData} />
      )}
    </RoleGuard>
  );
}
