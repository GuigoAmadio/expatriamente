import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Appointment {
  data: string; // yyyy-mm-dd
  horarios: string[];
}

const DIAS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
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

function getDiaSemana(dateStr: string) {
  return new Date(dateStr).getDay();
}

export default function Calendar({
  appointments,
  onSelect,
}: {
  appointments: Appointment[];
  onSelect?: (dia: number, hora: string) => void;
}) {
  const agendados = useMemo(() => {
    const map: Record<number, Record<string, boolean>> = {};
    appointments.forEach((a) => {
      const dia = getDiaSemana(a.data);
      if (!map[dia]) map[dia] = {};
      a.horarios.forEach((h) => {
        map[dia][h] = true;
      });
    });
    return map;
  }, [appointments]);

  const [selecionado, setSelecionado] = useState<{
    dia: number;
    hora: string;
  } | null>(null);

  // Estado para controlar a semana atual
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Função para obter o início da semana
  const getWeekStart = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  };

  // Função para navegar entre semanas
  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeek((prev) => {
      const newWeek = new Date(prev);
      newWeek.setDate(prev.getDate() + (direction === "next" ? 7 : -7));
      return newWeek;
    });
    // Limpar seleção ao mudar de semana
    setSelecionado(null);
  };

  // Função para voltar para a semana atual
  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
    setSelecionado(null);
  };

  // Versão mobile do calendário (exatamente igual ao AdminAppointmentsList)
  const MobileCalendar = () => {
    const currentWeekStart = getWeekStart(currentWeek);

    const workingHours = HORAS.slice(0, 8);

    return (
      <div>
        {/* Paginação de Semanas */}
        <div className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-3">
            <button
              onClick={() => navigateWeek("prev")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Anterior
            </button>

            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">
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
              </div>
              <button
                onClick={goToCurrentWeek}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors mt-1"
              >
                Ir para hoje
              </button>
            </div>

            <button
              onClick={() => navigateWeek("next")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm"
            >
              Próxima
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid de horários ultra-compacto (mobile) - Copiado exatamente do AdminAppointmentsList */}
        <div className="grid grid-cols-8 gap-1 bg-gray-100 rounded-xl p-2">
          {/* Header */}
          <div className="bg-white p-1 flex items-center justify-center rounded-md shadow-sm">
            <span className="text-[8px] font-semibold text-gray-600">HORA</span>
          </div>
          {Array.from({ length: 7 }, (_, i) => {
            const day = new Date(currentWeekStart);
            day.setDate(currentWeekStart.getDate() + i);
            const isToday = day.toDateString() === new Date().toDateString();
            const dayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
            return (
              <div
                key={i}
                className={`p-2 flex flex-col items-center justify-center text-[10px] font-semibold rounded-md shadow-sm min-h-[32px] ${
                  isToday
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                    : "bg-white text-gray-600"
                }`}
              >
                <span className="text-[6px] font-medium text-gray-500 mb-1">
                  {dayNames[i]}
                </span>
                <span>{day.getDate()}</span>
              </div>
            );
          })}

          {/* Horários */}
          {workingHours.map((hora) => (
            <React.Fragment key={hora}>
              <div className="bg-white p-1 flex items-center justify-center rounded-md shadow-sm">
                <span className="text-[8px] font-medium text-gray-700">
                  {hora.substring(0, 2)}
                </span>
              </div>
              {Array.from({ length: 7 }, (_, i) => {
                const day = new Date(currentWeekStart);
                day.setDate(currentWeekStart.getDate() + i);
                const dayString = `${day.getFullYear()}-${(day.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${day
                  .getDate()
                  .toString()
                  .padStart(2, "0")}`;

                const isMarcado = agendados[i]?.[hora];
                const isSelecionado =
                  selecionado &&
                  selecionado.dia === i &&
                  selecionado.hora === hora;
                const count = isMarcado ? 0 : 1; // Invertido: se marcado = ocupado (0), se não = disponível (1)
                const isToday =
                  day.toDateString() === new Date().toDateString();

                return (
                  <button
                    key={i}
                    className={`aspect-square flex items-center justify-center transition-all duration-150 rounded-md shadow-sm hover:shadow-md ${
                      count > 0
                        ? isSelecionado
                          ? "bg-blue-600 text-white ring-2 ring-blue-300"
                          : "bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105"
                        : isSelecionado
                        ? "bg-blue-100 text-blue-700 ring-2 ring-blue-300"
                        : isToday
                        ? "bg-blue-50 hover:bg-blue-100 ring-1 ring-blue-200"
                        : "bg-white hover:bg-gray-50 hover:scale-105"
                    }`}
                    onClick={() => {
                      if (count > 0) {
                        // Só permite clicar se disponível
                        setSelecionado({ dia: i, hora });
                        onSelect?.(i, hora);
                      }
                    }}
                  >
                    {isSelecionado && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          Selecione seu horário
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Clique em um horário disponível para agendar sua sessão
        </p>
      </motion.div>

      {/* Versão Mobile (até 1024px - igual ao admin) */}
      <div className="block lg:hidden">
        <MobileCalendar />
      </div>

      {/* Versão Desktop (1024px+) */}
      <div className="hidden lg:block">
        {/* Paginação de Semanas - Desktop */}
        <div className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-3">
            <button
              onClick={() => navigateWeek("prev")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Anterior
            </button>

            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">
                {getWeekStart(currentWeek).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })}{" "}
                -{" "}
                {new Date(
                  getWeekStart(currentWeek).getTime() + 6 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
              <button
                onClick={goToCurrentWeek}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors mt-1"
              >
                Ir para hoje
              </button>
            </div>

            <button
              onClick={() => navigateWeek("next")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm"
            >
              Próxima
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3 border-spacing-x-1">
            <thead>
              <tr>
                <th className="bg-transparent text-gray-800 font-semibold font-akzidens pb-4 text-[10px] xl:text-sm">
                  Horário
                </th>
                {DIAS.map((dia, i) => (
                  <motion.th
                    key={dia}
                    className="bg-transparent text-gray-800 font-semibold font-akzidens pb-4 min-w-[120px] text-[10px]  xl:text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    {dia}
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HORAS.map((hora, horaIdx) => (
                <motion.tr
                  key={hora}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: horaIdx * 0.02 }}
                >
                  <td className="bg-transparent text-gray-800 font-bold px-1 py-2 text-left font-akzidens text-[10px] xl:text-sm">
                    {hora}
                  </td>
                  {DIAS.map((_, diaIdx) => {
                    const isMarcado = agendados[diaIdx]?.[hora];
                    const isSelecionado =
                      selecionado &&
                      selecionado.dia === diaIdx &&
                      selecionado.hora === hora;
                    return (
                      <td
                        key={diaIdx}
                        className="px-0.5 py-1 text-center align-middle"
                      >
                        <motion.div
                          className={`rounded-xl flex items-center justify-center h-8 w-full font-akzidens select-none border-2 transition-all duration-300 cursor-pointer text-[10px] xl:text-xs
                              ${
                                isMarcado
                                  ? "bg-red-50 text-red-600 border-red-200 opacity-60 cursor-not-allowed"
                                  : isSelecionado
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600 shadow-lg transform scale-105"
                                  : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-md hover:scale-102"
                              }
                            `}
                          onClick={() => {
                            if (!isMarcado) {
                              setSelecionado({ dia: diaIdx, hora });
                              onSelect?.(diaIdx, hora);
                            }
                          }}
                          whileHover={!isMarcado ? { scale: 1.05 } : {}}
                          whileTap={!isMarcado ? { scale: 0.95 } : {}}
                          layout
                        >
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={
                                isMarcado
                                  ? "ocupado"
                                  : isSelecionado
                                  ? "selecionado"
                                  : "disponivel"
                              }
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {isMarcado
                                ? "Ocupado"
                                : isSelecionado
                                ? "✓ Selecionado"
                                : "Disponível"}
                            </motion.span>
                          </AnimatePresence>
                        </motion.div>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selecionado && (
        <motion.div
          className="mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-blue-800 font-semibold text-sm sm:text-base">
            Horário selecionado:{" "}
            <span className="font-bold">
              {DIAS[selecionado.dia]} às {selecionado.hora}
            </span>
          </p>
          <p className="text-blue-600 text-xs sm:text-sm mt-1">
            Preencha os dados abaixo para finalizar o agendamento
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
