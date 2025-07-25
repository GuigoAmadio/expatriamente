"use client";
import { Appointment } from "@/types/backend";
import { useState, useMemo, useCallback } from "react";
import { FixedSizeList as List } from "react-window";

const DIAS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const HORAS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const HORAS_COMPACTAS = ["09:00", "11:00", "13:00", "15:00", "17:00"];

interface ClientAppointmentsProps {
  appointments: Appointment[];
  onSelectAppointment?: (apt: Appointment) => void;
  onEditAppointment?: (apt: Appointment) => void;
  onDeleteAppointment?: (id: string) => void;
}

export function ClientAppointments({
  appointments,
  onSelectAppointment = () => {},
  onEditAppointment = () => {},
  onDeleteAppointment = () => {},
}: ClientAppointmentsProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      return (
        aptDate.getDate() === date.getDate() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getAppointmentsForDayAndHour = (date: Date, hour: string) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      const aptHour = aptDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return (
        aptDate.getDate() === date.getDate() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getFullYear() === date.getFullYear() &&
        aptHour === hour
      );
    });
  };

  const formatTime = (dateInput: string | Date) => {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (direction === "prev") {
      newDate.setDate(selectedDate.getDate() - 7);
    } else {
      newDate.setDate(selectedDate.getDate() + 7);
    }
    setSelectedDate(newDate);
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Minha Agenda
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateWeek("prev")}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            ←
          </button>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {weekDays[0] instanceof Date
              ? weekDays[0].toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })
              : ""}{" "}
            -{" "}
            {weekDays[6] instanceof Date
              ? weekDays[6].toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : ""}
          </span>
          <button
            onClick={() => navigateWeek("next")}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendário com horários da semana */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden max-h-[60vh]">
        <div className="overflow-x-auto overflow-y-auto max-h-[55vh]">
          <table className="w-full border-separate border-spacing-y-1 border-spacing-x-0">
            <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10">
              <tr>
                <th className="bg-transparent text-gray-900 dark:text-white font-medium text-sm p-2">
                  Hora
                </th>
                {DIAS.map((dia, i) => (
                  <th
                    key={dia}
                    className="bg-transparent text-gray-900 dark:text-white font-medium text-sm p-2 text-center"
                  >
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum agendamento encontrado.
                  </td>
                </tr>
              ) : (
                <List
                  height={400}
                  itemCount={appointments.length}
                  itemSize={56}
                  width="100%"
                  style={{ minWidth: "100%" }}
                >
                  {({ index, style }) => {
                    const appointment = appointments[index];
                    return (
                      <tr
                        key={appointment.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => onSelectAppointment(appointment)}
                        style={style}
                      >
                        {/* Renderize as células da linha conforme já está no seu código */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appointment.service?.name || "Serviço"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appointment.employee?.name || "Psicólogo"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appointment.startTime
                            ? new Date(
                                appointment.startTime
                              ).toLocaleDateString("pt-BR")
                            : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appointment.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditAppointment(appointment);
                            }}
                            className="text-blue-600 hover:underline mr-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteAppointment(appointment.id);
                            }}
                            className="text-red-600 hover:underline"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    );
                  }}
                </List>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
