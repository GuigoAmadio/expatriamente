"use client";
import { Appointment } from "@/types/backend";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";

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

interface ClientAppointmentsProps {
  appointments: Appointment[];
  onSelectAppointment?: (apt: Appointment) => void;
}

export function ClientAppointments({
  appointments,
  onSelectAppointment = () => {},
}: ClientAppointmentsProps) {
  const router = useRouter();
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Função para obter o início da semana
  const getWeekStart = useCallback((date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  }, []);

  // Função para navegar entre semanas
  const navigateWeek = useCallback((direction: "prev" | "next") => {
    setCurrentWeek((prev) => {
      const newWeek = new Date(prev);
      newWeek.setDate(prev.getDate() + (direction === "next" ? 7 : -7));
      return newWeek;
    });
  }, []);

  const currentWeekStart = getWeekStart(currentWeek);

  // Filtrar agendamentos da semana atual
  const weekAppointments = useMemo(() => {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(currentWeekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    return appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      return aptDate >= currentWeekStart && aptDate <= weekEnd;
    });
  }, [appointments, currentWeekStart]);

  // Gerar dados do calendário
  const calendarData = useMemo(() => {
    const data: Array<{
      day: string;
      hour: string;
      count: number;
      appointments: Appointment[];
    }> = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(currentWeekStart.getDate() + i);
      const dayString = `${day.getFullYear()}-${(day.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`;

      for (const hour of HORAS) {
        const hourAppointments = weekAppointments.filter((apt) => {
          const aptDate = new Date(apt.startTime);
          const aptDayString = `${aptDate.getFullYear()}-${(
            aptDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${aptDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;
          const aptHour = aptDate.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return aptDayString === dayString && aptHour === hour;
        });

        data.push({
          day: dayString,
          hour,
          count: hourAppointments.length,
          appointments: hourAppointments,
        });
      }
    }

    return data;
  }, [weekAppointments, currentWeekStart]);

  const formatTime = (dateInput: string | Date) => {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateInput: string | Date) => {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });
  };

  const hasAppointments = appointments.length > 0;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      {/* Header do Calendário */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Meus Agendamentos
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Visualize seus agendamentos da semana
        </p>
      </div>

      {/* Navegação Semanal */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateWeek("prev")}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
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
            <h2 className="text-lg font-semibold text-gray-900">
              {currentWeekStart.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })}{" "}
              -{" "}
              {new Date(
                currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </h2>
            <button
              onClick={() => navigateWeek("next")}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
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
          <div className="text-gray-600 text-sm">
            {hasAppointments
              ? `${appointments.length} agendamento${
                  appointments.length !== 1 ? "s" : ""
                }`
              : "Nenhum agendamento"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden px-2 sm:px-0">
        {/* Vista semanal compacta (mobile) */}
        <div className="w-full max-w-full mx-auto grid grid-cols-7 gap-1 pt-3 pb-3 sm:hidden">
          {Array.from({ length: 7 }, (_, i) => {
            const day = new Date(currentWeekStart);
            day.setDate(currentWeekStart.getDate() + i);
            const dayString = `${day.getFullYear()}-${(day.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`;
            const dayCount = calendarData.reduce((sum, c) => {
              return c.day === dayString ? sum + (c.count || 0) : sum;
            }, 0);
            const isToday = day.toDateString() === new Date().toDateString();
            const dayName = day.toLocaleDateString("pt-BR", {
              weekday: "short",
            });
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg text-[10px] flex flex-col items-center justify-center relative transition-all duration-200 font-medium ${
                  isToday
                    ? "bg-blue-50 text-blue-700 ring-2 ring-blue-400"
                    : dayCount > 0
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : "bg-gray-50 text-gray-600 ring-1 ring-gray-200"
                }`}
              >
                <span className="text-[8px] opacity-75 leading-tight">
                  {dayName}
                </span>
                <span className="font-bold text-[12px] leading-tight">
                  {day.getDate()}
                </span>
                {dayCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[16px] h-4 rounded-full text-[8px] font-bold ${
                      isToday
                        ? "bg-blue-600 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {dayCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Grid completo (desktop) */}
        <table className="min-w-full hidden sm:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Horário
                </div>
              </th>
              {Array.from({ length: 7 }, (_, i) => {
                const day = new Date(currentWeekStart);
                day.setDate(currentWeekStart.getDate() + i);
                const dayName = day.toLocaleDateString("pt-BR", {
                  weekday: "short",
                });
                const dayNumber = day.getDate();
                const isToday =
                  day.toDateString() === new Date().toDateString();
                const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                return (
                  <th
                    key={i}
                    className={`p-4 text-center text-xs font-semibold uppercase tracking-wider border-r border-gray-200 ${
                      isToday
                        ? "bg-blue-50 border-b-2 border-blue-500"
                        : isWeekend
                        ? "bg-gray-50"
                        : ""
                    }`}
                  >
                    <div
                      className={`${
                        isToday
                          ? "text-blue-700 font-bold"
                          : isWeekend
                          ? "text-gray-500"
                          : "text-gray-700"
                      }`}
                    >
                      {dayName}
                    </div>
                    <div
                      className={`text-xl font-bold mt-1 ${
                        isToday
                          ? "text-blue-700"
                          : isWeekend
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {dayNumber}
                    </div>
                    {isToday && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white">
            {HORAS.map((hour, hourIndex) => (
              <tr
                key={hour}
                className={`${
                  hourIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-50 transition-colors`}
              >
                <td className="p-4 text-sm font-medium text-gray-700 border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    {hour}
                  </div>
                </td>
                {Array.from({ length: 7 }, (_, i) => {
                  const day = new Date(currentWeekStart);
                  day.setDate(currentWeekStart.getDate() + i);
                  const dayString = `${day.getFullYear()}-${(day.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${day
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                  const cellData = calendarData.find(
                    (cell) => cell.day === dayString && cell.hour === hour
                  );

                  const count = cellData?.count || 0;
                  const appointments = cellData?.appointments || [];

                  return (
                    <td
                      key={i}
                      className={`p-4 text-center border-r border-gray-200 ${
                        isWeekend ? "bg-gray-50" : ""
                      }`}
                    >
                      {count > 0 ? (
                        <div className="space-y-1">
                          {appointments.map((apt, aptIndex) => (
                            <div
                              key={aptIndex}
                              className="inline-flex items-center justify-center w-full py-1 px-2 rounded-lg font-medium text-xs shadow-sm transition-all duration-200 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:shadow-md cursor-pointer"
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
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
                          <div className="text-gray-300 text-xs">-</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legenda */}
      <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600"></div>
              <span>Meus Agendamentos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-dashed border-gray-300"></div>
              <span>Disponível</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Clique para ver detalhes</span>
          </div>
        </div>
      </div>

      {/* Mensagem quando não há agendamentos */}
      {!hasAppointments && (
        <div className="p-8 text-center">
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
          <button
            onClick={() => router.push("/dashboard/client/psychologists")}
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
          </button>
        </div>
      )}
    </div>
  );
}
