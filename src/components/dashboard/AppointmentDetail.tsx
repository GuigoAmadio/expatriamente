import { Appointment } from "@/types/backend";
export default function AppointmentDetail({
  appointment,
}: {
  appointment: Appointment;
}) {
  return (
    <div>
      <h1>Detalhes do Agendamento</h1>
      <pre>{JSON.stringify(appointment, null, 2)}</pre>
    </div>
  );
}
