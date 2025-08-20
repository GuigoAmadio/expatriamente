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
        <div className="mb-4 bg-white rounded-xl border border-[#e4ded2] overflow-hidden shadow-lg">
          <div className="flex items-center justify-between p-3">
            <button
              onClick={() => navigateWeek("prev")}
              className="flex items-center gap-2 px-3 py-2 bg-[#f8f6f2] hover:bg-[#e4ded2] text-[#5b7470] rounded-lg transition-colors text-sm font-akzidens"
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
              <div className="text-sm font-akzidens font-semibold text-[#5b7470]">
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
                className="text-xs text-[#9dc9e2] hover:text-[#77b2de] transition-colors mt-1 font-akzidens"
              >
                Ir para hoje
              </button>
            </div>

            <button
              onClick={() => navigateWeek("next")}
              className="flex items-center gap-2 px-3 py-2 bg-[#f8f6f2] hover:bg-[#e4ded2] text-[#5b7470] rounded-lg transition-colors text-sm font-akzidens"
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
        <div className="grid grid-cols-8 gap-1 bg-[#f8f6f2] rounded-xl p-2">
          {/* Header */}
          <div className="bg-white p-1 flex items-center justify-center rounded-md shadow-sm border border-[#e4ded2]">
            <span className="text-[8px] font-akzidens font-semibold text-[#5b7470]">
              HORA
            </span>
          </div>
          {Array.from({ length: 7 }, (_, i) => {
            const day = new Date(currentWeekStart);
            day.setDate(currentWeekStart.getDate() + i);
            const isToday = day.toDateString() === new Date().toDateString();
            const dayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
            return (
              <div
                key={i}
                className={`p-2 flex flex-col items-center justify-center text-[10px] font-akzidens font-semibold rounded-md shadow-sm min-h-[32px] border border-[#e4ded2] ${
                  isToday
                    ? "bg-[#9dc9e2] text-white ring-1 ring-[#9dc9e2]"
                    : "bg-white text-[#5b7470]"
                }`}
              >
                <span className="text-[6px] font-medium text-[#987b6b] mb-1">
                  {dayNames[i]}
                </span>
                <span>{day.getDate()}</span>
              </div>
            );
          })}

          {/* Horários */}
          {workingHours.map((hora) => (
            <React.Fragment key={hora}>
              <div className="bg-white p-1 flex items-center justify-center rounded-md shadow-sm border border-[#e4ded2]">
                <span className="text-[8px] font-akzidens font-medium text-[#5b7470]">
                  {hora.substring(0, 2)}
                </span>
              </div>
              {Array.from({ length: 7 }, (_, i) => {
                const day = new Date(currentWeekStart);
                day.setDate(currentWeekStart.getDate() + i);
                const isToday =
                  day.toDateString() === new Date().toDateString();
                const isBooked = agendados[i]?.[hora];
                const isSelected =
                  selecionado?.dia === i && selecionado?.hora === hora;

                return (
                  <motion.button
                    key={i}
                    onClick={() => {
                      if (!isBooked) {
                        setSelecionado({ dia: i, hora });
                        onSelect?.(i, hora);
                      }
                    }}
                    disabled={isBooked}
                    className={`aspect-square flex items-center justify-center transition-all duration-150 rounded-md shadow-sm hover:shadow-md border ${
                      isSelected
                        ? "bg-[#987b6b] text-white ring-2 ring-[#c5b2a1]"
                        : isBooked
                        ? "bg-[#e4ded2] text-[#c5b2a1] cursor-not-allowed"
                        : isToday
                        ? "bg-[#f8f6f2] text-[#5b7470] ring-1 ring-[#9dc9e2] hover:bg-[#e4ded2]"
                        : "bg-white text-[#5b7470] hover:bg-[#f8f6f2] hover:scale-105"
                    }`}
                    whileHover={!isBooked ? { scale: 1.05 } : {}}
                    whileTap={!isBooked ? { scale: 0.95 } : {}}
                    layout
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={
                          isBooked
                            ? "ocupado"
                            : isSelected
                            ? "selecionado"
                            : "disponivel"
                        }
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="text-[8px] font-akzidens font-medium"
                      >
                        {isBooked
                          ? "Ocupado"
                          : isSelected
                          ? "✓ Selecionado"
                          : "Livre"}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Versão desktop do calendário
  const DesktopCalendar = () => {
    const currentWeekStart = getWeekStart(currentWeek);

    return (
      <div>
        {/* Paginação de Semanas */}
        <div className="mb-4 bg-white rounded-xl border border-[#e4ded2] overflow-hidden shadow-lg">
          <div className="flex items-center justify-between p-3">
            <button
              onClick={() => navigateWeek("prev")}
              className="flex items-center gap-2 px-3 py-2 bg-[#f8f6f2] hover:bg-[#e4ded2] text-[#5b7470] rounded-lg transition-colors text-sm font-akzidens"
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
              <div className="text-sm font-akzidens font-semibold text-[#5b7470]">
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
                className="text-xs text-[#9dc9e2] hover:text-[#77b2de] transition-colors mt-1 font-akzidens"
              >
                Ir para hoje
              </button>
            </div>

            <button
              onClick={() => navigateWeek("next")}
              className="flex items-center gap-2 px-3 py-2 bg-[#f8f6f2] hover:bg-[#e4ded2] text-[#5b7470] rounded-lg transition-colors text-sm font-akzidens"
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
                <th className="bg-transparent text-[#5b7470] font-semibold font-akzidens pb-4 text-[10px] xl:text-sm">
                  Horário
                </th>
                {DIAS.map((dia, i) => (
                  <motion.th
                    key={dia}
                    className="bg-transparent text-[#5b7470] font-semibold font-akzidens pb-4 min-w-[120px] text-[10px] xl:text-sm"
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
                  <td className="bg-transparent text-[#5b7470] font-bold px-1 py-2 text-left font-akzidens text-[10px] xl:text-sm">
                    {hora}
                  </td>
                  {DIAS.map((_, diaIdx) => {
                    const isBooked = agendados[diaIdx]?.[hora];
                    const isSelected =
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
                              isBooked
                                ? "bg-[#e4ded2] text-[#c5b2a1] border-[#e4ded2] opacity-60 cursor-not-allowed"
                                : isSelected
                                ? "bg-gradient-to-r from-[#987b6b] to-[#587861] text-white border-[#987b6b] shadow-lg transform scale-105"
                                : "bg-[#f8f6f2] text-[#5b7470] border-[#e4ded2] hover:bg-[#e4ded2] hover:border-[#c5b2a1] hover:shadow-md hover:scale-102"
                            }
                          `}
                          onClick={() => {
                            if (!isBooked) {
                              setSelecionado({ dia: diaIdx, hora });
                              onSelect?.(diaIdx, hora);
                            }
                          }}
                          whileHover={!isBooked ? { scale: 1.05 } : {}}
                          whileTap={!isBooked ? { scale: 0.95 } : {}}
                          layout
                        >
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={
                                isBooked
                                  ? "ocupado"
                                  : isSelected
                                  ? "selecionado"
                                  : "disponivel"
                              }
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {isBooked
                                ? "Ocupado"
                                : isSelected
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
    );
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-4 border border-[#e4ded2]"
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
        <h3 className="text-lg sm:text-xl font-bold text-[#5b7470] mb-2 font-akzidens">
          Selecione seu horário
        </h3>
        <p className="text-xs sm:text-sm text-[#6B3F1D]">
          Clique em um horário disponível para agendar sua sessão
        </p>
      </motion.div>

      {/* Versão Mobile (até 1024px - igual ao admin) */}
      <div className="block lg:hidden">
        <MobileCalendar />
      </div>

      {/* Versão Desktop (1024px+) */}
      <div className="hidden lg:block">
        <DesktopCalendar />
      </div>

      {selecionado && (
        <motion.div
          className="mt-6 p-3 sm:p-4 bg-[#f8f6f2] border border-[#e4ded2] rounded-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[#5b7470] font-semibold text-sm sm:text-base font-akzidens">
            Horário selecionado:{" "}
            <span className="font-bold">
              {DIAS[selecionado.dia]} às {selecionado.hora}
            </span>
          </p>
          <p className="text-[#987b6b] text-xs sm:text-sm mt-1">
            Preencha os dados abaixo para finalizar o agendamento
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
