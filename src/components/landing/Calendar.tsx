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
  } | null>({ dia: 0, hora: "" }); // Primeiro dia selecionado por default

  // Estado para controlar a semana atual
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Função para obter o início da semana (a partir do dia atual)
  const getWeekStart = (date: Date) => {
    const today = new Date();
    const start = new Date(date);

    // Se a data for anterior ao dia atual, começar do dia atual
    if (start < today) {
      start.setTime(today.getTime());
    } else {
      // Se não, começar do domingo da semana selecionada
      start.setDate(date.getDate() - date.getDay());
    }

    return start;
  };

  // Função para navegar entre semanas
  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeek((prev) => {
      const newWeek = new Date(prev);
      newWeek.setDate(prev.getDate() + (direction === "next" ? 7 : -7));
      return newWeek;
    });
    // Manter seleção do primeiro dia ao mudar de semana
    setSelecionado({ dia: 0, hora: "" });
  };

  // Função para voltar para a semana atual
  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
    setSelecionado({ dia: 0, hora: "" });
  };

  // Função para selecionar um dia
  const handleDaySelect = (dia: number) => {
    setSelecionado({ dia, hora: "" });
  };

  // Função para selecionar um horário
  const handleTimeSelect = (hora: string) => {
    if (selecionado) {
      setSelecionado({ ...selecionado, hora });
      onSelect?.(selecionado.dia, hora);
    }
  };

  // Versão mobile do calendário redesenhada
  const MobileCalendar = () => {
    const currentWeekStart = getWeekStart(currentWeek);

    // Obter horários disponíveis para o dia selecionado
    const getAvailableHours = (dia: number) => {
      if (!agendados[dia]) return HORAS;
      return HORAS.filter((hora) => !agendados[dia][hora]);
    };

    const availableHours = selecionado
      ? getAvailableHours(selecionado.dia)
      : [];

    // Obter o mês atual para exibição
    const getCurrentMonth = () => {
      return currentWeekStart.toLocaleDateString("pt-BR", {
        month: "long",
      });
    };

    return (
      <div className="space-y-4">
        {/* Mês atual - grande e destacado */}
        <div className="text-center">
          <h2 className="text-2xl font-akzidens font-bold capitalize bg-gradient-to-r from-[#99ae55] via-[#9ca995] to-[#408f57] bg-clip-text text-transparent">
            {getCurrentMonth()}
          </h2>
        </div>

        {/* Paginação de Semanas - mais clara */}
        <div className="flex w-full items-center justify-between gap-2 mb-10">
          <button
            onClick={() => navigateWeek("prev")}
            className="flex items-center gap-2 px-2 py-2 min-w-28 bg-[#ffffff] shadow-lg hover:bg-[#e4ded2] text-[#5b7470] rounded-lg transition-colors text-xs font-body font-medium border-[0.5px] border-lime-200"
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
            Semana Anterior
          </button>

          <button
            onClick={() => navigateWeek("next")}
            className="flex items-center gap-2 px-2 py-2 min-w-28 bg-[#ffffff] shadow-lg hover:bg-[#e4ded2] text-[#5b7470] rounded-lg transition-colors text-xs font-body font-medium border-[0.5px] border-lime-300"
          >
            Próxima Semana
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

        {/* Grid de dias da semana - 2 linhas (4+3) */}
        <div className="flex flex-wrap gap-3">
          {/* Primeira linha - 4 dias */}
          {Array.from({ length: 4 }, (_, i) => {
            const day = new Date(currentWeekStart);
            day.setDate(currentWeekStart.getDate() + i);
            const today = new Date();
            const isToday = day.toDateString() === today.toDateString();
            const isSelected = selecionado?.dia === i;
            const dayNames = ["DOM", "SEG", "TER", "QUA"];

            // Só mostrar se o dia não for passado
            if (day < today && !isToday) {
              return null;
            }

            return (
              <motion.button
                key={i}
                onClick={() => handleDaySelect(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square w-16 flex flex-col items-center justify-center rounded-xl shadow-md transition-all duration-200 border-2 ${
                  isSelected
                    ? "bg-[#81ba95] text-white border-[#81ba95]"
                    : "bg-white text-[#5b7470] border-[#e4ded2] hover:border-[#9ca995]"
                }`}
              >
                <span className="text-xs font-akzidens font-medium mb-1">
                  {dayNames[i]}
                </span>
                <span className="text-lg font-akzidens font-bold">
                  {day.getDate()}
                </span>
              </motion.button>
            );
          })}

          {/* Segunda linha - 3 dias */}
          {Array.from({ length: 3 }, (_, i) => {
            const dayIndex = i + 4; // 4, 5, 6
            const day = new Date(currentWeekStart);
            day.setDate(currentWeekStart.getDate() + dayIndex);
            const today = new Date();
            const isToday = day.toDateString() === today.toDateString();
            const isSelected = selecionado?.dia === dayIndex;
            const dayNames = ["QUI", "SEX", "SÁB"];

            // Só mostrar se o dia não for passado
            if (day < today && !isToday) {
              return null;
            }

            return (
              <motion.button
                key={dayIndex}
                onClick={() => handleDaySelect(dayIndex)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square w-16 flex flex-col items-center justify-center rounded-xl shadow-md transition-all duration-200 border-2 ${
                  isSelected
                    ? "bg-[#587861] text-white border-[#587861]"
                    : "bg-white text-[#5b7470] border-[#e4ded2] hover:border-[#9ca995]"
                }`}
              >
                <span className="text-xs font-akzidens font-medium mb-1">
                  {dayNames[i]}
                </span>
                <span className="text-lg font-akzidens font-bold">
                  {day.getDate()}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Horários disponíveis para o dia selecionado */}
        {selecionado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-[#e4ded2] p-4 shadow-lg"
          >
            <h3 className="text-sm font-akzidens font-semibold text-[#5b7470] mb-3 text-center">
              Horários disponíveis para {DIAS[selecionado.dia]}
            </h3>

            {/* Lista horizontal de horários */}
            <div className="flex flex-wrap gap-2 justify-center">
              {availableHours.length > 0 ? (
                availableHours.map((hora) => {
                  const isSelected = selecionado.hora === hora;
                  return (
                    <motion.button
                      key={hora}
                      onClick={() => handleTimeSelect(hora)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-3 rounded-lg font-akzidens font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-[#987b6b] text-white shadow-lg"
                          : "bg-[#f8f6f2] text-[#587861] border-2 border-[#e4ded2] hover:border-[#9ca995] hover:bg-[#e4ded2]"
                      }`}
                    >
                      {hora}
                    </motion.button>
                  );
                })
              ) : (
                <div className="text-center text-[#9ca995] font-akzidens text-sm py-4">
                  Nenhum horário disponível para este dia
                </div>
              )}
            </div>
          </motion.div>
        )}
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

            {/* Range de datas da semana */}
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
                className="text-xs text-[#9dc9e2] hover:text-[#77b2de] transition-colors font-akzidens"
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

      {/* Versão Mobile (até 1024px) */}
      <div className="block lg:hidden">
        <MobileCalendar />
      </div>

      {/* Versão Desktop (1024px+) */}
      <div className="hidden lg:block">
        <DesktopCalendar />
      </div>

      {selecionado && selecionado.hora && (
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
