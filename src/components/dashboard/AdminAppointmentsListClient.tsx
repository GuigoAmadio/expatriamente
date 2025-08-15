"use client";
import { AdminAppointmentsList } from "./AdminAppointmentsList";
import type { Appointment } from "@/types/backend";
import {
  confirmAppointment,
  cancelAppointment,
  deleteAppointment,
} from "@/actions/appointments";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAppointmentsListClient(props: any) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");
  const [confirmingId, setConfirmingId] = useState<string>("");
  const [cancellingId, setCancellingId] = useState<string>("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string>("");

  // Funções para lidar com filtros
  const handleSearchChange = (value: string) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("search", value);
    } else {
      url.searchParams.delete("search");
    }
    url.searchParams.delete("page"); // Reset para primeira página
    router.push(url.pathname + url.search);
  };

  const handleStatusFilterChange = (value: string) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("status", value);
    } else {
      url.searchParams.delete("status");
    }
    url.searchParams.delete("page"); // Reset para primeira página
    router.push(url.pathname + url.search);
  };

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    router.push(url.pathname + url.search);
  };

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
      onSearchChange={handleSearchChange}
      onStatusFilterChange={handleStatusFilterChange}
      onPageChange={handlePageChange}
      onSelectAppointment={(appointment: Appointment) => {
        if (!appointment?.id) return;
        router.push(`/dashboard/admin/appointments/${appointment.id}`);
      }}
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
