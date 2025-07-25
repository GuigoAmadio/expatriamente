"use client";
import { Appointment } from "@/types/backend";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Pagination } from "@/components/ui/Pagination";
import { useState, useMemo, useCallback } from "react";
import { FixedSizeList as List } from "react-window";

interface AppointmentCount {
  hour: string;
  count: number;
  appointments: Appointment[];
}

interface DayAppointments {
  date: string;
  dayName: string;
  appointments: AppointmentCount[];
}

interface AdminAppointmentsListProps {
  appointments: Appointment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;
  onSearchChange?: (value: string) => void;
  onStatusFilterChange?: (value: string) => void;
  onPageChange?: (page: number) => void;
  onEditAppointment: (apt: Appointment) => void;
  onDeleteAppointment?: (id: string) => void;
  onConfirmAppointment?: (id: string) => void;
  onCancelAppointment?: (id: string) => void;
  deletingId?: string;
  confirmingId?: string;
  cancellingId?: string;
  confirmDeleteId?: string;
  onSelectAppointment: (apt: Appointment) => void;
}

export function AdminAppointmentsList(props: AdminAppointmentsListProps) {
  const {
    appointments,
    meta,
    loading,
    error,
    searchTerm,
    statusFilter,
    onSearchChange,
    onStatusFilterChange,
    onPageChange,
    onEditAppointment,
    onDeleteAppointment,
    onConfirmAppointment,
    onCancelAppointment,
    deletingId,
    confirmingId,
    cancellingId,
    confirmDeleteId,
    onSelectAppointment,
  } = props;

  const handlePageChange = onPageChange ?? (() => {});
  const [selectedDay, setSelectedDay] = useState<string>("");

  // Gerar dias da semana
  const getWeekDays = useCallback(
    (date: Date): DayAppointments[] => {
      const days: DayAppointments[] = [];
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay()); // Domingo
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const dayString = day.toISOString().split("T")[0];
        const dayName = day.toLocaleDateString("pt-BR", { weekday: "short" });
        const dayAppointments = appointments.filter((apt) => {
          const aptDate = new Date(apt.startTime);
          return aptDate.toISOString().split("T")[0] === dayString;
        });
        const hourGroups: { [key: string]: Appointment[] } = {};
        dayAppointments.forEach((apt) => {
          const hour =
            new Date(apt.startTime).getHours().toString().padStart(2, "0") +
            ":00";
          if (!hourGroups[hour]) hourGroups[hour] = [];
          hourGroups[hour].push(apt);
        });
        const appointmentsByHour: AppointmentCount[] = Object.keys(
          hourGroups
        ).map((hour) => ({
          hour,
          count: hourGroups[hour].length,
          appointments: hourGroups[hour],
        }));
        days.push({
          date: dayString,
          dayName,
          appointments: appointmentsByHour,
        });
      }
      return days;
    },
    [appointments]
  );

  const currentWeek = new Date();
  const weekDays = getWeekDays(currentWeek);
  const barChartData = useMemo(
    () =>
      weekDays.map((day) => ({
        name: day.dayName.charAt(0).toUpperCase() + day.dayName.slice(1),
        total: day.appointments.reduce((sum, a) => sum + a.count, 0),
      })),
    [weekDays]
  );
  const filteredAppointments = useMemo(
    () =>
      selectedDay
        ? appointments.filter((apt) => {
            const aptDate = new Date(apt.startTime);
            return aptDate.toISOString().split("T")[0] === selectedDay;
          })
        : appointments,
    [appointments, selectedDay]
  );

  let tableBody: React.ReactNode;
  if (loading) {
    tableBody = (
      <tr>
        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
          Carregando...
        </td>
      </tr>
    );
  } else if (filteredAppointments.length === 0) {
    tableBody = (
      <tr>
        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
          Nenhum agendamento encontrado
        </td>
      </tr>
    );
  } else {
    tableBody = filteredAppointments.map((appointment) => (
      <tr
        key={appointment.id}
        className="hover:bg-gray-50 cursor-pointer"
        onClick={() => onSelectAppointment(appointment)}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {new Date(appointment.startTime).toLocaleDateString("pt-BR")}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(appointment.startTime).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {appointment.user?.name || "Cliente"}
          </div>
          <div className="text-sm text-gray-500">
            {appointment.user?.email || "Email não disponível"}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {appointment.employee?.name || "Psicólogo"}
          </div>
          <div className="text-sm text-gray-500">
            {appointment.employee?.email || "Email não disponível"}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {appointment.service?.name || "Serviço"}
          </div>
          <div className="text-sm text-gray-500">
            R$ {appointment.service?.price?.toLocaleString() || "0"}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              appointment.status === "CONFIRMED"
                ? "bg-green-100 text-green-800"
                : appointment.status === "SCHEDULED"
                ? "bg-yellow-100 text-yellow-800"
                : appointment.status === "COMPLETED"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {appointment.status === "CONFIRMED"
              ? "Confirmado"
              : appointment.status === "SCHEDULED"
              ? "Agendado"
              : appointment.status === "COMPLETED"
              ? "Concluído"
              : appointment.status === "CANCELLED"
              ? "Cancelado"
              : appointment.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex gap-2">
            <button
              className="text-blue-600 hover:text-blue-900"
              onClick={(e) => {
                e.stopPropagation();
                onEditAppointment?.(appointment);
              }}
            >
              Editar
            </button>
            {appointment.status === "SCHEDULED" && (
              <button
                className="text-green-600 hover:text-green-900"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirmAppointment?.(appointment.id);
                }}
                disabled={confirmingId === appointment.id}
              >
                {confirmingId === appointment.id
                  ? "Confirmando..."
                  : "Confirmar"}
              </button>
            )}
            {(appointment.status === "SCHEDULED" ||
              appointment.status === "CONFIRMED") && (
              <button
                className="text-yellow-600 hover:text-yellow-900"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancelAppointment?.(appointment.id);
                }}
                disabled={cancellingId === appointment.id}
              >
                {cancellingId === appointment.id ? "Cancelando..." : "Cancelar"}
              </button>
            )}
            {confirmDeleteId === appointment.id ? (
              <>
                <button
                  className="text-red-600 font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteAppointment?.(appointment.id);
                  }}
                  disabled={deletingId === appointment.id}
                >
                  {deletingId === appointment.id ? "Excluindo..." : "Confirmar"}
                </button>
                <button
                  className="text-gray-500 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteAppointment?.("");
                  }}
                  disabled={deletingId === appointment.id}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                className="text-red-600 hover:text-red-900"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteAppointment?.(appointment.id);
                }}
                disabled={deletingId === appointment.id}
              >
                {deletingId === appointment.id ? "Excluindo..." : "Excluir"}
              </button>
            )}
          </div>
        </td>
      </tr>
    ));
  }

  function handleSelectAppointment(appointment: Appointment) {
    onSelectAppointment(appointment);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agendamentos da Semana</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por cliente, psicólogo ou serviço..."
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange?.(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Todos os status</option>
            <option value="SCHEDULED">Agendado</option>
            <option value="CONFIRMED">Confirmado</option>
            <option value="COMPLETED">Concluído</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 font-semibold text-gray-900">Horário</div>
          {weekDays.map((day) => (
            <div
              key={day.date}
              className={`p-4 font-semibold text-gray-900 text-center cursor-pointer ${
                selectedDay === day.date
                  ? "bg-blue-100 border-b-4 border-blue-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() =>
                setSelectedDay(day.date === selectedDay ? "" : day.date)
              }
            >
              <div className="text-sm text-gray-500">{day.dayName}</div>
              <div className="text-lg">{new Date(day.date).getDate()}</div>
            </div>
          ))}
        </div>
        {Array.from({ length: 11 }, (_, i) => i + 8).map((hour) => {
          const hourStr = hour.toString().padStart(2, "0") + ":00";
          return (
            <div key={hour} className="grid grid-cols-8 border-b">
              <div className="p-4 text-sm text-gray-600 font-medium">
                {hourStr}
              </div>
              {weekDays.map((day) => {
                const hourAppointments = day.appointments.find(
                  (apt) => apt.hour === hourStr
                );
                const count = hourAppointments?.count || 0;
                return (
                  <div key={day.date} className="p-4 text-center border-l">
                    {count > 0 ? (
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mx-auto font-semibold">
                        {count}
                      </div>
                    ) : (
                      <div className="text-gray-300">-</div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-bold mb-2">Agendamentos por Dia</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="total"
                fill="#2563eb"
                name="Total de Agendamentos"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Detalhes dos Agendamentos</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Psicólogo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
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
                        {/* Exemplo: */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(appointment.startTime).toLocaleDateString(
                              "pt-BR"
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(appointment.startTime).toLocaleTimeString(
                              "pt-BR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.user?.name || "Cliente"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.user?.email || "Email não disponível"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.employee?.name || "Psicólogo"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.employee?.email ||
                              "Email não disponível"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.service?.name || "Serviço"}
                          </div>
                          <div className="text-sm text-gray-500">
                            R${" "}
                            {appointment.service?.price?.toLocaleString() ||
                              "0"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              appointment.status === "CONFIRMED"
                                ? "bg-green-100 text-green-800"
                                : appointment.status === "SCHEDULED"
                                ? "bg-yellow-100 text-yellow-800"
                                : appointment.status === "COMPLETED"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {appointment.status === "CONFIRMED"
                              ? "Confirmado"
                              : appointment.status === "SCHEDULED"
                              ? "Agendado"
                              : appointment.status === "COMPLETED"
                              ? "Concluído"
                              : appointment.status === "CANCELLED"
                              ? "Cancelado"
                              : appointment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditAppointment(appointment);
                              }}
                            >
                              Editar
                            </button>
                            {appointment.status === "SCHEDULED" && (
                              <button
                                className="text-green-600 hover:text-green-900"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onConfirmAppointment?.(appointment.id);
                                }}
                                disabled={confirmingId === appointment.id}
                              >
                                {confirmingId === appointment.id
                                  ? "Confirmando..."
                                  : "Confirmar"}
                              </button>
                            )}
                            {(appointment.status === "SCHEDULED" ||
                              appointment.status === "CONFIRMED") && (
                              <button
                                className="text-yellow-600 hover:text-yellow-900"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onCancelAppointment?.(appointment.id);
                                }}
                                disabled={cancellingId === appointment.id}
                              >
                                {cancellingId === appointment.id
                                  ? "Cancelando..."
                                  : "Cancelar"}
                              </button>
                            )}
                            {confirmDeleteId === appointment.id ? (
                              <>
                                <button
                                  className="text-red-600 font-bold"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteAppointment?.(appointment.id);
                                  }}
                                  disabled={deletingId === appointment.id}
                                >
                                  {deletingId === appointment.id
                                    ? "Excluindo..."
                                    : "Confirmar"}
                                </button>
                                <button
                                  className="text-gray-500 ml-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteAppointment?.("");
                                  }}
                                  disabled={deletingId === appointment.id}
                                >
                                  Cancelar
                                </button>
                              </>
                            ) : (
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteAppointment?.(appointment.id);
                                }}
                                disabled={deletingId === appointment.id}
                              >
                                {deletingId === appointment.id
                                  ? "Excluindo..."
                                  : "Excluir"}
                              </button>
                            )}
                          </div>
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
      {meta.total > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <Pagination
            totalItems={meta.total}
            itemsPerPage={meta.limit}
            currentPage={meta.page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
