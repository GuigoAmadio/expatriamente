"use client";
import { AdminAppointmentsList } from "./AdminAppointmentsList";
import type { Appointment } from "@/types/backend";

export default function AdminAppointmentsListClient(props: any) {
  return (
    <AdminAppointmentsList
      {...props}
      onSelectAppointment={() => {}}
      onEditAppointment={() => {}}
    />
  );
}
