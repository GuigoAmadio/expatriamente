"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { TimeSlot, TimeOff, WorkingHoursData } from "@/actions/employees";
import {
  getEmployeeWorkingHours,
  addEmployeeTimeSlot,
  removeEmployeeTimeSlot,
  addEmployeeTimeOff,
  removeEmployeeTimeOff,
} from "@/actions/employees";

interface ScheduleContextType {
  // Estado
  timeSlots: TimeSlot[];
  timeOffs: TimeOff[];
  loading: boolean;
  error: string | null;

  // Ações
  loadWorkingHours: (employeeId: string) => Promise<void>;
  addTimeSlot: (
    employeeId: string,
    timeSlot: Omit<TimeSlot, "id">,
    specificDate?: string
  ) => Promise<boolean>;
  removeTimeSlot: (employeeId: string, timeSlotId: string) => Promise<boolean>;
  addTimeOff: (
    employeeId: string,
    timeOff: Omit<TimeOff, "id">
  ) => Promise<boolean>;
  removeTimeOff: (employeeId: string, timeOffId: string) => Promise<boolean>;

  // Utilitários
  getTimeSlotsByDay: (dayOfWeek: number) => TimeSlot[];
  getTimeSlotsByDayAndWeek: (
    dayOfWeek: number,
    weekDates: Date[]
  ) => TimeSlot[];
  hasOverlap: (
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    excludeId?: string
  ) => boolean;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

interface ScheduleProviderProps {
  children: ReactNode;
  employeeId?: string; // Adicionado para passar o employeeId
}

export function ScheduleProvider({
  children,
  employeeId,
}: ScheduleProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [timeOffs, setTimeOffs] = useState<TimeOff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingSlots, setProcessingSlots] = useState<Set<string>>(
    new Set()
  );

  // ✅ Log de montagem
  useEffect(() => {
    console.log("🔧 [ScheduleContext] Componente montado");
    console.log("🔧 [ScheduleContext] EmployeeId:", employeeId);
    setMounted(true);
  }, []);

  // ✅ Log de mudança de employeeId
  useEffect(() => {
    console.log("🔧 [ScheduleContext] EmployeeId mudou:", employeeId);
    if (mounted && employeeId) {
      console.log("🔧 [ScheduleContext] Iniciando loadWorkingHours...");
      loadWorkingHours(employeeId);
    }
  }, [employeeId, mounted]);

  // Carregar horários do backend
  const loadWorkingHours = useCallback(async (employeeId: string) => {
    try {
      console.log("🔄 [ScheduleContext] === INÍCIO loadWorkingHours ===");
      console.log("🔄 [ScheduleContext] EmployeeId:", employeeId);

      setLoading(true);
      setError(null);

      const workingHours = await getEmployeeWorkingHours(employeeId, true);

      console.log("✅ [ScheduleContext] === DADOS RECEBIDOS ===");
      console.log("✅ [ScheduleContext] WorkingHours:", workingHours);

      setTimeSlots(workingHours.timeSlots);
      setTimeOffs(workingHours.timeOffs);

      console.log("✅ [ScheduleContext] === ESTADO ATUALIZADO ===");
    } catch (err) {
      console.error("❌ [ScheduleContext] === ERRO ===");
      console.error("❌ [ScheduleContext] Erro:", err);
      setError("Erro ao carregar horários");
    } finally {
      setLoading(false);
      console.log("🔧 [ScheduleContext] === FIM loadWorkingHours ===");
    }
  }, []);

  // Utilitários
  const getTimeSlotsByDay = useCallback(
    (dayOfWeek: number): TimeSlot[] => {
      return timeSlots.filter((slot) => slot.dayOfWeek === dayOfWeek);
    },
    [timeSlots]
  );

  const getTimeSlotsByDayAndWeek = useCallback(
    (dayOfWeek: number, weekDates: Date[]): TimeSlot[] => {
      const targetDate = weekDates[dayOfWeek];
      const targetDateString = targetDate.toISOString().split("T")[0]; // YYYY-MM-DD

      return timeSlots.filter((slot) => {
        // Se o slot é para o dia da semana correto
        if (slot.dayOfWeek !== dayOfWeek) return false;

        // Se é recorrente, sempre mostra
        if (slot.isRecurring) return true;

        // Se não é recorrente, só mostra se a data específica corresponde
        return slot.specificDate === targetDateString;
      });
    },
    [timeSlots]
  );

  const hasOverlap = useCallback(
    (
      dayOfWeek: number,
      startTime: string,
      endTime: string,
      excludeId?: string
    ): boolean => {
      const daySlots = getTimeSlotsByDay(dayOfWeek).filter(
        (slot) => slot.id !== excludeId && slot.isActive
      );

      const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const newStart = timeToMinutes(startTime);
      const newEnd = timeToMinutes(endTime);

      // Validação básica: horário de início deve ser anterior ao fim
      if (newStart >= newEnd) {
        return true; // Considera como "sobreposição" para bloquear
      }

      return daySlots.some((slot) => {
        const slotStart = timeToMinutes(slot.startTime);
        const slotEnd = timeToMinutes(slot.endTime);

        // Verifica se há sobreposição real
        return newStart < slotEnd && newEnd > slotStart;
      });
    },
    [getTimeSlotsByDay]
  );

  // Adicionar horário
  const addTimeSlot = useCallback(
    async (
      employeeId: string,
      timeSlot: Omit<TimeSlot, "id">,
      specificDate?: string
    ): Promise<boolean> => {
      const slotKey = `${timeSlot.dayOfWeek}-${timeSlot.startTime}-${
        timeSlot.endTime
      }-${specificDate || "recurring"}`;

      // Prevenir múltiplos cliques
      if (processingSlots.has(slotKey)) {
        console.log(
          "⏳ [ScheduleContext] Operação já em andamento para este horário"
        );
        return false;
      }

      try {
        setProcessingSlots((prev) => new Set(prev).add(slotKey));
        console.log(
          "➕ [ScheduleContext] Adicionando horário:",
          timeSlot,
          "Data específica:",
          specificDate
        );

        // Verificar sobreposição antes de enviar
        if (
          hasOverlap(timeSlot.dayOfWeek, timeSlot.startTime, timeSlot.endTime)
        ) {
          setError("Horário sobrepõe com outro existente ou horário inválido");
          return false;
        }

        // Adicionar ao backend
        await addEmployeeTimeSlot(employeeId, timeSlot, specificDate);

        // Atualizar estado local imediatamente
        const newTimeSlot: TimeSlot = {
          id: Date.now().toString(),
          ...timeSlot,
          isActive: true,
          specificDate: timeSlot.isRecurring ? undefined : specificDate,
        };

        setTimeSlots((prev) => [...prev, newTimeSlot]);
        setError(null);

        console.log("✅ [ScheduleContext] Horário adicionado com sucesso");
        return true;
      } catch (err) {
        console.error("❌ [ScheduleContext] Erro ao adicionar horário:", err);
        setError("Erro ao adicionar horário");
        return false;
      } finally {
        setProcessingSlots((prev) => {
          const newSet = new Set(prev);
          newSet.delete(slotKey);
          return newSet;
        });
      }
    },
    [hasOverlap, processingSlots]
  );

  // Remover horário
  const removeTimeSlot = useCallback(
    async (employeeId: string, timeSlotId: string): Promise<boolean> => {
      // Prevenir múltiplos cliques
      if (processingSlots.has(timeSlotId)) {
        console.log(
          "⏳ [ScheduleContext] Operação já em andamento para este horário"
        );
        return false;
      }

      try {
        setProcessingSlots((prev) => new Set(prev).add(timeSlotId));
        console.log("🗑️ [ScheduleContext] Removendo horário:", timeSlotId);

        await removeEmployeeTimeSlot(employeeId, timeSlotId);

        // Atualizar estado local imediatamente
        setTimeSlots((prev) => prev.filter((slot) => slot.id !== timeSlotId));
        setError(null);

        console.log("✅ [ScheduleContext] Horário removido com sucesso");
        return true;
      } catch (err) {
        console.error("❌ [ScheduleContext] Erro ao remover horário:", err);
        setError("Erro ao remover horário");
        return false;
      } finally {
        setProcessingSlots((prev) => {
          const newSet = new Set(prev);
          newSet.delete(timeSlotId);
          return newSet;
        });
      }
    },
    [processingSlots]
  );

  // Toggle horário - REMOVIDO para simplificar interface
  // Agora apenas deletar e recriar se necessário

  // Adicionar folga
  const addTimeOff = useCallback(
    async (
      employeeId: string,
      timeOff: Omit<TimeOff, "id">
    ): Promise<boolean> => {
      try {
        console.log("➕ [ScheduleContext] Adicionando folga:", timeOff);

        await addEmployeeTimeOff(employeeId, timeOff);

        // Atualizar estado local imediatamente
        const newTimeOff: TimeOff = {
          id: Date.now().toString(),
          ...timeOff,
        };

        setTimeOffs((prev) => [...prev, newTimeOff]);
        setError(null);

        console.log("✅ [ScheduleContext] Folga adicionada com sucesso");
        return true;
      } catch (err) {
        console.error("❌ [ScheduleContext] Erro ao adicionar folga:", err);
        setError("Erro ao adicionar folga");
        return false;
      }
    },
    []
  );

  // Remover folga
  const removeTimeOff = useCallback(
    async (employeeId: string, timeOffId: string): Promise<boolean> => {
      try {
        console.log("🗑️ [ScheduleContext] Removendo folga:", timeOffId);

        await removeEmployeeTimeOff(employeeId, timeOffId);

        // Atualizar estado local imediatamente
        setTimeOffs((prev) =>
          prev.filter((timeOff) => timeOff.id !== timeOffId)
        );
        setError(null);

        console.log("✅ [ScheduleContext] Folga removida com sucesso");
        return true;
      } catch (err) {
        console.error("❌ [ScheduleContext] Erro ao remover folga:", err);
        setError("Erro ao remover folga");
        return false;
      }
    },
    []
  );

  const value: ScheduleContextType = {
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
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule deve ser usado dentro de um ScheduleProvider");
  }
  return context;
}
