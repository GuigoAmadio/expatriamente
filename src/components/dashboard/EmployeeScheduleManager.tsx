"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  CalendarDays,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSchedule } from "@/context/ScheduleContext";
import { type TimeSlot, type TimeOff } from "@/actions/employees";
import { TimePicker } from "@/components/ui/TimePicker";
import { DatePicker } from "@/components/ui/DatePicker";

interface EmployeeScheduleManagerProps {
  employeeId: string;
}

const DAYS_OF_WEEK = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// Funções utilitárias para manipular datas e semanas
const getWeekDates = (date: Date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day; // Ajuste para começar na segunda-feira
  startOfWeek.setDate(diff);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(currentDate);
  }
  return weekDates;
};

const formatDate = (date: Date) => {
  return date.getDate().toString().padStart(2, "0");
};

const formatMonthYear = (date: Date) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isCurrentWeek = (weekDates: Date[]) => {
  const today = new Date();
  return weekDates.some((date) => date.toDateString() === today.toDateString());
};

export function EmployeeScheduleManager({
  employeeId,
}: EmployeeScheduleManagerProps) {
  const {
    timeSlots,
    timeOffs,
    loading,
    error,
    loadWorkingHours,
    addTimeSlot,
    removeTimeSlot,
    addTimeOff,
    removeTimeOff,
    getTimeSlotsByDay,
    getTimeSlotsByDayAndWeek,
    hasOverlap,
  } = useSchedule();

  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [isAddingTimeOff, setIsAddingTimeOff] = useState(false);
  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [editingTimeOff, setEditingTimeOff] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1); // Segunda-feira por padrão
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

  // Estados para formulários
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:00",
    isRecurring: true,
    isActive: true,
  });

  const [newTimeOff, setNewTimeOff] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    isActive: true,
  });

  // Carregar dados do backend
  useEffect(() => {
    if (employeeId) {
      loadWorkingHours(employeeId);
    }
  }, [employeeId, loadWorkingHours]);

  const handleAddTimeSlot = async () => {
    if (isProcessing) return; // Prevenir múltiplos cliques

    if (newSlot.startTime >= newSlot.endTime) {
      alert("Horário de início deve ser anterior ao horário de fim!");
      return;
    }

    setIsProcessing(true);
    try {
      // Obter a data específica para horários não recorrentes
      const specificDate = newSlot.isRecurring
        ? undefined
        : weekDates[newSlot.dayOfWeek].toISOString().split("T")[0];

      const success = await addTimeSlot(employeeId, newSlot, specificDate);

      if (success) {
        setNewSlot({
          dayOfWeek: 1,
          startTime: "09:00",
          endTime: "17:00",
          isRecurring: true,
          isActive: true,
        });
        setIsAddingSlot(false);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (isProcessing) return; // Prevenir múltiplos cliques

    setIsProcessing(true);
    try {
      await removeTimeSlot(employeeId, slotId);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddTimeOff = async () => {
    if (isProcessing) return; // Prevenir múltiplos cliques

    if (newTimeOff.startDate >= newTimeOff.endDate) {
      alert("Data de início deve ser anterior à data de fim!");
      return;
    }

    setIsProcessing(true);
    try {
      const success = await addTimeOff(employeeId, newTimeOff);

      if (success) {
        setNewTimeOff({
          startDate: "",
          endDate: "",
          reason: "",
          isActive: true,
        });
        setIsAddingTimeOff(false);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteTimeOff = async (timeOffId: string) => {
    if (isProcessing) return; // Prevenir múltiplos cliques

    setIsProcessing(true);
    try {
      await removeTimeOff(employeeId, timeOffId);
    } finally {
      setIsProcessing(false);
    }
  };

  const getSlotsForDay = (dayOfWeek: number) => {
    return getTimeSlotsByDayAndWeek(dayOfWeek, weekDates);
  };

  const handleDayClick = (dayIndex: number) => {
    setSelectedDay(dayIndex);
    setNewSlot((prev) => ({ ...prev, dayOfWeek: dayIndex }));
    setIsAddingSlot(true);
  };

  // Funções de navegação entre semanas
  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  // Obter datas da semana atual
  const weekDates = getWeekDates(currentWeek);
  const isCurrentWeekActive = isCurrentWeek(weekDates);

  // Verificar se há sobreposição para validação em tempo real
  const hasOverlapError = hasOverlap(
    newSlot.dayOfWeek,
    newSlot.startTime,
    newSlot.endTime
  );
  const hasTimeError = newSlot.startTime >= newSlot.endTime;
  const hasEmptyTimeError = !newSlot.startTime || !newSlot.endTime;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a8b093]"></div>
        <span className="ml-2 text-stone-600">Carregando horários...</span>
      </div>
    );
  }

  return (
    <div className="mt-10">
      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Seção de Horários Semanais */}
      <div className="bg-white rounded-2xl shadow-sm border-0 p-4 md:p-8">
        {/* Header com navegação */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={goToPreviousWeek}
                className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-stone-600" />
              </button>
              <button
                onClick={goToNextWeek}
                className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-stone-600" />
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-[#453706]">
                {formatMonthYear(weekDates[0])}
              </h2>
              <p className="text-stone-500 text-sm">
                {weekDates[0].getDate()} - {weekDates[6].getDate()} de{" "}
                {formatMonthYear(weekDates[0])}
              </p>
            </div>
            {!isCurrentWeekActive && (
              <button
                onClick={goToCurrentWeek}
                className="px-4 py-2 bg-[#a8b093] text-white rounded-lg hover:bg-[#8a9a7a] transition-colors text-sm"
              >
                Semana Atual
              </button>
            )}
          </div>
          <button
            onClick={() => setIsAddingSlot(true)}
            disabled={isProcessing}
            className="flex items-center justify-center px-4 py-3 bg-amber-100 text-neutral-800 rounded-xl hover:bg-[#8a9a7a] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            {isProcessing ? "Processando..." : "Adicionar Horário"}
          </button>
        </div>

        {/* Calendário semanal */}
        <div className="flex flex-wrap justify-center gap-12">
          {DAYS_OF_WEEK.map((day, index) => {
            const daySlots = getSlotsForDay(index);
            const hasSlots = daySlots.length > 0;
            const currentDate = weekDates[index];
            const isTodayDate = isToday(currentDate);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-2xl transition-all duration-200 cursor-pointer h-full min-h-60 w-60 ${
                  hasSlots
                    ? "bg-white shadow-sm hover:shadow-lg border border-neutral-200"
                    : isTodayDate
                    ? "bg-white border border-blue-200 shadow-sm hover:shadow-lg"
                    : "bg-stone-100 sm:bg-stone-50 hover:shadow-xl"
                }`}
                onClick={() => handleDayClick(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-[#ba9e3e]">{day}</h3>
                  <div
                    className={`text-2xl font-bold ${
                      isTodayDate ? "text-blue-600" : "text-stone-600"
                    }`}
                  >
                    {formatDate(currentDate)}
                  </div>
                </div>
                {isTodayDate && (
                  <div className="text-xs text-blue-600 font-medium mb-2">
                    Hoje
                  </div>
                )}

                {hasSlots ? (
                  <div className="">
                    {daySlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="p-3 rounded-lg bg-[#dae1c8] bg-opacity-70 border border-lime-200 mb-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-neutral-800" />
                            <span className="font-medium text-neutral-800">
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSlot(slot.id);
                            }}
                            disabled={isProcessing}
                            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        {slot.isRecurring && (
                          <div className="text-xs mt-2 opacity-75 flex items-center text-neutral-800">
                            <CheckCircle className="h-3 w-3 mr-1 text-neutral-800" />
                            Recorrente
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="absolute inset-0 text-center text-stone-500 text-sm flex flex-col items-center justify-center h-full">
                    <Calendar className="h-8 w-8 mb-2 opacity-50" />
                    <div className="font-medium">Sem horários</div>
                    <div className="text-xs mt-1">Clique para adicionar</div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Seção de Folgas */}
      <div className="bg-white rounded-2xl shadow-sm border-0 p-4 md:p-8 mt-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
              <CalendarDays className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#453706]">
                Períodos de Folga
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Registre seus períodos de ausência
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddingTimeOff(true)}
            disabled={isProcessing}
            className="flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            {isProcessing ? "Processando..." : "Adicionar Folga"}
          </button>
        </div>

        {timeOffs.length > 0 ? (
          <div className="space-y-4">
            {timeOffs.map((timeOff) => (
              <div
                key={timeOff.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl hover:shadow-md transition-all duration-200 space-y-4 sm:space-y-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#453706] text-base sm:text-lg">
                      {new Date(timeOff.startDate).toLocaleDateString("pt-BR")}{" "}
                      - {new Date(timeOff.endDate).toLocaleDateString("pt-BR")}
                    </div>
                    {timeOff.reason && (
                      <div className="text-sm text-stone-600 mt-1 break-words">
                        {timeOff.reason}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTimeOff(timeOff.id)}
                  disabled={isProcessing}
                  className="p-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed self-start sm:self-auto"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-stone-500 py-12">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="h-8 w-8 text-stone-400" />
            </div>
            <p className="text-lg font-medium">
              Nenhum período de folga cadastrado
            </p>
            <p className="text-sm mt-1">
              Clique em "Adicionar Folga" para começar
            </p>
          </div>
        )}
      </div>

      {/* Modal para Adicionar Horário */}
      <AnimatePresence>
        {isAddingSlot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black overflow-hidden bg-opacity-50 flex items-start pt-10 justify-center z-50"
            onClick={() => setIsAddingSlot(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4 md:p-8 w-full max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#a8b093] bg-opacity-10 rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-[#a8b093]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#453706]">
                    Adicionar Horário
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">
                    Configure um novo horário de trabalho
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-base md:text-lg font-semibold text-[#453706] mb-3 md:mb-4">
                    Dia da Semana
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                    {DAYS_OF_WEEK.map((day, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setNewSlot({
                            ...newSlot,
                            dayOfWeek: index,
                          })
                        }
                        className={`p-3 md:p-4 rounded-xl text-center transition-all duration-200 ${
                          newSlot.dayOfWeek === index
                            ? "bg-[#a8b093] text-white shadow-lg"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                        }`}
                      >
                        <div className="font-medium text-xs">{day}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-base md:text-lg font-semibold text-[#453706] mb-3 md:mb-4">
                    Horários de Trabalho
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <TimePicker
                      value={newSlot.startTime}
                      onChange={(time) =>
                        setNewSlot({ ...newSlot, startTime: time })
                      }
                      label="Horário de Início"
                      disabled={isProcessing}
                    />
                    <TimePicker
                      value={newSlot.endTime}
                      onChange={(time) =>
                        setNewSlot({ ...newSlot, endTime: time })
                      }
                      label="Horário de Fim"
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="flex items-center p-4 bg-stone-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={newSlot.isRecurring}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, isRecurring: e.target.checked })
                    }
                    className="w-4 h-4 text-[#a8b093] border-1 rounded-md border-stone-300 hover:cursor-pointer"
                  />
                  <label
                    htmlFor="isRecurring"
                    className="ml-3 text-base font-medium text-stone-700"
                  >
                    Horário recorrente (semanal)
                  </label>
                </div>

                {/* Validação em tempo real */}
                {hasEmptyTimeError && (
                  <div className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Preencha os horários de início e fim
                  </div>
                )}
                {!hasEmptyTimeError && hasTimeError && (
                  <div className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Horário de início deve ser anterior ao fim
                  </div>
                )}
                {!hasEmptyTimeError && !hasTimeError && hasOverlapError && (
                  <div className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Este horário sobrepõe com outro existente
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-stone-200">
                <button
                  onClick={() => setIsAddingSlot(false)}
                  className="px-6 py-3 text-stone-600 hover:text-stone-800 font-medium transition-colors order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddTimeSlot}
                  disabled={
                    hasOverlapError ||
                    hasTimeError ||
                    hasEmptyTimeError ||
                    isProcessing
                  }
                  className="px-6 md:px-8 py-3 bg-[#a8b093] text-white rounded-xl hover:bg-[#8a9a7a] disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-sm hover:shadow-md order-1 sm:order-2"
                >
                  {isProcessing ? "Salvando..." : "Salvar Horário"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para Adicionar Folga */}
      <AnimatePresence>
        {isAddingTimeOff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsAddingTimeOff(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <CalendarDays className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#453706]">
                    Adicionar Período de Folga
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">
                    Registre um período de ausência
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <DatePicker
                    value={newTimeOff.startDate}
                    onChange={(date) =>
                      setNewTimeOff({ ...newTimeOff, startDate: date })
                    }
                    label="Data de Início"
                    disabled={isProcessing}
                    minDate={new Date().toISOString().split("T")[0]}
                  />
                  <DatePicker
                    value={newTimeOff.endDate}
                    onChange={(date) =>
                      setNewTimeOff({ ...newTimeOff, endDate: date })
                    }
                    label="Data de Fim"
                    disabled={isProcessing}
                    minDate={
                      newTimeOff.startDate ||
                      new Date().toISOString().split("T")[0]
                    }
                  />
                </div>

                <div>
                  <label className="block text-base md:text-lg font-semibold text-[#453706] mb-3">
                    Motivo (opcional)
                  </label>
                  <textarea
                    value={newTimeOff.reason}
                    onChange={(e) =>
                      setNewTimeOff({ ...newTimeOff, reason: e.target.value })
                    }
                    placeholder="Ex: Férias, consulta médica, licença..."
                    className="w-full p-4 text-base md:text-lg border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-stone-50 focus:bg-white resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-stone-200">
                <button
                  onClick={() => setIsAddingTimeOff(false)}
                  className="px-6 py-3 text-stone-600 hover:text-stone-800 font-medium transition-colors order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddTimeOff}
                  disabled={isProcessing}
                  className="px-6 md:px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-sm hover:shadow-md order-1 sm:order-2"
                >
                  {isProcessing ? "Salvando..." : "Salvar Folga"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
