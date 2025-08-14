"use client";

import { Appointment } from "@/types/backend";
import { FiCalendar, FiClock, FiUser, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AppointmentDetail({
  appointment,
}: {
  appointment: Appointment;
}) {
  const router = useRouter();
  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-2xl font-bold">Detalhes do Agendamento</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
          >
            <FiArrowLeft className="inline w-4 h-4 mr-1" /> Voltar
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-900">
            <FiUser className="w-5 h-5 text-blue-600" />
            <span className="font-medium">
              {appointment.user?.name || "Cliente"}
            </span>
            <span className="text-gray-500">·</span>
            <span>{appointment.employee?.name || "Profissional"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-900">
            <FiCalendar className="w-5 h-5 text-blue-600" />
            <span>
              {start.toLocaleDateString("pt-BR")} (
              {start
                .toLocaleDateString("pt-BR", { weekday: "long" })
                .replace(/\b\w/g, (c) => c.toUpperCase())}
              )
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-900">
            <FiClock className="w-5 h-5 text-blue-600" />
            <span>
              {start.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {end.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
