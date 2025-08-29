import { RoleGuard } from "@/components/guards/RoleGuard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { DashboardCache } from "@/components/dashboard/DashboardCache";
import { getAppointmentsByPeriod } from "@/actions/appointments";
import { getEmployeesWithMeta } from "@/actions/employees";
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

export default async function AdminDashboardPage() {
  // ✅ Server component - busca dados no servidor usando cache
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

    // ✅ USAR CACHE DIRETAMENTE para evitar chamadas repetidas
    const [
      appointmentsToday,
      appointmentsWeek,
      appointmentsCount,
      employeesCount,
      clientsCount,
      employeesWithMeta,
    ] = await Promise.all([
      getAppointmentsByPeriod(todayStr, todayStr),
      getAppointmentsByPeriod(weekStartStr, weekEndStr),
      // ✅ Cache direto para contagem de agendamentos
      cacheUtils.getCachedData(
        `appointments:count:${todayStr}:${todayStr}:all`,
        async () => {
          console.log(
            "🔄 [Dashboard] Cache miss - buscando contagem de agendamentos..."
          );
          const { getAppointmentsCount } = await import(
            "@/actions/appointments"
          );
          return await getAppointmentsCount({
            startDate: todayStr,
            endDate: todayStr,
          });
        },
        CACHE_CONFIG.appointments
      ),
      // ✅ Cache direto para contagem de funcionários ativos
      cacheUtils.getCachedData(
        "employees:count:active",
        async () => {
          console.log(
            "🔄 [Dashboard] Cache miss - buscando contagem de funcionários..."
          );
          const { getActiveEmployeeCount } = await import(
            "@/actions/employees"
          );
          return await getActiveEmployeeCount();
        },
        CACHE_CONFIG.employees
      ),
      // ✅ Cache direto para contagem de clientes
      cacheUtils.getCachedData(
        "clients:count",
        async () => {
          console.log(
            "🔄 [Dashboard] Cache miss - buscando contagem de clientes..."
          );
          const { getClientsCount } = await import("@/actions/clients");
          return await getClientsCount();
        },
        CACHE_CONFIG.clients
      ),
      // ✅ SSR: buscar lista de employees com meta para semear no cliente
      getEmployeesWithMeta(),
    ]);

    // ✅ Corrigido: usersToday deve ser um array, não um número
    // Por enquanto, deixamos como array vazio até implementar a funcionalidade
    const usersToday: any[] = []; // Array vazio para compatibilidade com o componente

    // Calcular receita (valor fixo de R$ 200 por sessão)
    const VALOR_SESSAO = 200;
    const consultasSemana = (appointmentsWeek as any)?.data?.length || 0;
    const receitaSemana = consultasSemana * VALOR_SESSAO;

    const dashboardData = {
      // Cards principais
      cards: {
        consultasSemana: consultasSemana,
        usuariosTotal: clientsCount,
        psicanalistasTotal: employeesCount,
        receitaSemana: receitaSemana,
      },
      // Listas
      appointmentsToday: appointmentsToday.data || [],
      usersToday: usersToday, // ✅ Agora é um array
    };

    return (
      <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
        <DashboardCache
          initial={{
            // Employees ainda não é usado aqui; semeado quando estiver disponível
            clientsCount: clientsCount,
            appointmentsToday: appointmentsToday.data || [],
            weekRange: { start: todayStr, end: todayStr },
            appointmentsCountToday: appointmentsCount,
            employees: (employeesWithMeta as any)?.data || [],
          }}
        >
          <AdminDashboard data={dashboardData} />
        </DashboardCache>
      </RoleGuard>
    );
  } catch (error: any) {
    // ✅ Server component pode tratar erros diretamente
    return (
      <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
        <div className="p-8 text-center text-red-500">
          {error.message || "Erro ao carregar dashboard"}
        </div>
      </RoleGuard>
    );
  }
}
