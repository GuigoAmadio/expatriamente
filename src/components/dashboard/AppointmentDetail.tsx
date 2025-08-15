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
    <div className="p-2 relative">
      <h1 className="text-[5vw] sm:text-xl  font-bold my-10 text-center">
        Detalhes do Agendamento
      </h1>
      <button
        onClick={() => router.back()}
        className="absolute -top-6 left-0 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors text-center"
      >
        <FiArrowLeft className="inline w-4 h-4 mr-1" /> Voltar
      </button>
      <div className="max-w-[500px] mx-auto">
        {/* Container com borda gradiente */}
        <div className="relative p-[1px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl">
          {/* Conteúdo interno */}
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <div className="flex flex-col items-center justify-center gap-1 text-gray-900 mb-6">
              <FiUser className="w-5 h-5 text-blue-600" />
              <span className="font-medium">
                {appointment.user?.name || "Cliente"}
              </span>
              <span className="text-center sm:text-start font-bold">
                {appointment.employee?.name || "Profissional"}
              </span>
            </div>

            <div className="flex flex-wrap items-start justify-around gap-3">
              <div className="flex items-start gap-3 text-gray-900">
                <FiCalendar className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                  <span>{start.toLocaleDateString("pt-BR")}</span>
                  <span className="text-center lg:text-left">
                    {start
                      .toLocaleDateString("pt-BR", { weekday: "long" })
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </div>
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
      </div>
    </div>
  );
}
