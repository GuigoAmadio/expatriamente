"use client";
import { AdminAppointmentsList } from "./AdminAppointmentsList";
import type { Appointment } from "@/types/backend";
import {
  confirmAppointment,
  cancelAppointment,
  deleteAppointment,
} from "@/actions/appointments";
import { useState } from "react";

export default function AdminAppointmentsListClient(props: any) {
  const [deletingId, setDeletingId] = useState<string>("");
  const [confirmingId, setConfirmingId] = useState<string>("");
  const [cancellingId, setCancellingId] = useState<string>("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string>("");

  const handleConfirmAppointment = async (id: string) => {
    setConfirmingId(id);
    try {
      const result = await confirmAppointment(id);
      if (result.success) {
        window.location.reload();
      } else {
        alert("Erro ao confirmar agendamento: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao confirmar agendamento:", error);
      alert("Erro ao confirmar agendamento");
    } finally {
      setConfirmingId("");
    }
  };

  const handleCancelAppointment = async (id: string) => {
    setCancellingId(id);
    try {
      const result = await cancelAppointment(id);
      if (result.success) {
        window.location.reload();
      } else {
        alert("Erro ao cancelar agendamento: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      alert("Erro ao cancelar agendamento");
    } finally {
      setCancellingId("");
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (id === "") {
      setConfirmDeleteId("");
      return;
    }

    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteAppointment(id);
      if (result.success) {
        window.location.reload();
      } else {
        alert("Erro ao excluir agendamento: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      alert("Erro ao excluir agendamento");
    } finally {
      setDeletingId("");
      setConfirmDeleteId("");
    }
  };

  return (
    <AdminAppointmentsList
      {...props}
      onSelectAppointment={() => {}}
      onEditAppointment={(appointment) => {
        // Esta função será chamada quando o usuário clicar em "Editar"
        // O modal de edição será aberto no componente AdminAppointmentsList
      }}
      onConfirmAppointment={handleConfirmAppointment}
      onCancelAppointment={handleCancelAppointment}
      onDeleteAppointment={handleDeleteAppointment}
      deletingId={deletingId}
      confirmingId={confirmingId}
      cancellingId={cancellingId}
      confirmDeleteId={confirmDeleteId}
    />
  );
}
