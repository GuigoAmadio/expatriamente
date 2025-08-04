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
  const hasAppointments = appointments.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header do Calendário */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateWeek("prev")}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-lg hover:bg-blue-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-white">
              {weekDays[0].toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })}{" "}
              -{" "}
              {weekDays[6].toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </h2>
            <button
              onClick={() => navigateWeek("next")}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-lg hover:bg-blue-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="text-white text-sm">
            {hasAppointments
              ? `${appointments.length} agendamento${
                  appointments.length !== 1 ? "s" : ""
                }`
              : "Nenhum agendamento"}
          </div>
        </div>
      </div>

      {/* Grid do Calendário */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header dos dias */}
          <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
            <div className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200">
              Hora
            </div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`p-4 text-center border-r border-gray-200 ${
                  isToday(day)
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <div className="text-sm font-medium">{DIAS[day.getDay()]}</div>
                <div className="text-lg font-bold">{day.getDate()}</div>
              </div>
            ))}
          </div>

          {/* Linhas de horários */}
          {HORAS.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="p-4 text-center font-medium text-gray-600 border-r border-gray-200 bg-gray-50">
                {hour}
              </div>
              {weekDays.map((day, dayIndex) => {
                const dayAppointments = getAppointmentsForDayAndHour(day, hour);
                return (
                  <div
                    key={dayIndex}
                    className={`p-4 text-center border-r border-gray-200 min-h-[80px] flex items-center justify-center ${
                      isToday(day) ? "bg-blue-50" : ""
                    }`}
                  >
                    {dayAppointments.length > 0 ? (
                      <div className="space-y-1">
                        {dayAppointments.map((apt, aptIndex) => (
                          <div
                            key={aptIndex}
                            className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                            onClick={() => onSelectAppointment(apt)}
                            title={`${
                              apt.employee?.name || "Psicólogo"
                            } - ${formatTime(apt.startTime)}`}
                          >
                            {apt.employee?.name || "Psicólogo"}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-xs">
                        {hasAppointments ? "Livre" : "—"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mensagem quando não há agendamentos */}
      {!hasAppointments && (
        <div className="p-8 text-center bg-gray-50 border-t border-gray-200">
          <div className="text-gray-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Nenhum agendamento encontrado
          </h3>
          <p className="text-gray-500 mb-4">
            Você ainda não possui agendamentos para esta semana.
          </p>
          <a
            href="/dashboard/client/psychologists"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Agendar Consulta
          </a>
        </div>
      )}
    </div>
  );
}
