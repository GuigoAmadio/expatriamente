import { getAppointment } from "@/actions/appointments";
// Certifique-se de que o componente existe neste caminho:
import AppointmentDetail from "@/components/dashboard/AppointmentDetail";

export default async function AppointmentDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  // Busca server-side dos detalhes do agendamento
  const result = await getAppointment(id);
  if (!result || typeof result !== "object" || !("id" in result)) {
    return <div>Agendamento não encontrado</div>;
  }
  return <AppointmentDetail appointment={result} />;
}
