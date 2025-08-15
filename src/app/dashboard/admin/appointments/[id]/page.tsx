import { getAppointment, getAppointments } from "@/actions/appointments";
import AppointmentDetail from "@/components/dashboard/AppointmentDetail";
import AdminAppointmentsListClient from "@/components/dashboard/AdminAppointmentsListClient";

export default async function AppointmentDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  // Busca server-side dos detalhes do agendamento
  const result = await getAppointment(id);
  // Normaliza formato: pode vir como { success, data: {..apt..} } ou direto o objeto do agendamento
  const appointment: any = (result as any)?.data?.id
    ? (result as any).data
    : result;

  if (!appointment || !appointment.id) {
    return <div>Agendamento não encontrado</div>;
  }
  // Calcular a semana do agendamento para carregar calendário + lista dessa janela
  const startDateObj = new Date(appointment.startTime);
  const weekStart = new Date(startDateObj);
  weekStart.setDate(startDateObj.getDate() - startDateObj.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const toLocalYMD = (d: Date) =>
    `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
      .getDate()
      .toString()
      .padStart(2, "0")}`;

  const { data: appointments, meta: rawMeta } = await getAppointments({
    startDate: toLocalYMD(weekStart),
    endDate: toLocalYMD(weekEnd),
    limit: 1000,
    page: 1,
    orderBy: "startTime",
    orderDirection: "asc",
  });

  const metaDefaults = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  };
  const meta = { ...metaDefaults, ...rawMeta };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 md:px-6 lg:px-8 py-6 w-full max-w-6xl mx-auto space-y-6">
        <AppointmentDetail appointment={appointment} />
      </div>
    </div>
  );
}
