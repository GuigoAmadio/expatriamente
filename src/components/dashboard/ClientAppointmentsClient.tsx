"use client";
import { ClientAppointments } from "./ClientAppointments";
import type { Appointment } from "@/types/backend";

export default function ClientAppointmentsClient({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <ClientAppointments
      appointments={appointments}
      onSelectAppointment={() => {}}
    />
  );
}
