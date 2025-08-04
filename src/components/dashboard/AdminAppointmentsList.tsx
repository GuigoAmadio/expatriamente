"use client";
import { Appointment } from "@/types/backend";
import { Pagination } from "@/components/ui/Pagination";
import { useState, useMemo, useCallback, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { createAppointment, updateAppointment } from "@/actions/appointments";
import { getUsers } from "@/actions/users";
import { getEmployees } from "@/actions/employees";
import { getServices } from "@/actions/services";
import { getClients } from "@/actions/clients";

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

interface CalendarCell {
  day: string;
  dayName: string;
  dayNumber: number;
  hour: string;
  count: number;
  appointments: Appointment[];
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

  // Estados para navegação
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Estados para filtros do calendário
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");

  // Estados para modal de criação
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    userId: "",
    employeeId: "",
    serviceId: "",
    month: "",
    day: "",
    hour: "",
  });

  // Estados para modal de edição
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [editForm, setEditForm] = useState({
    userId: "",
    employeeId: "",
    serviceId: "",
    month: "",
    day: "",
    hour: "",
  });

  // Estados para dados do modal
  const [users, setUsers] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);

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
    // Limpar filtros ao mudar de semana
    setSelectedDay("");
    setSelectedHour("");
  }, []);

  // Função para ir para um mês específico
  const goToMonth = useCallback(
    (month: string) => {
      const [year, monthNum] = month.split("-");
      const newDate = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
      setSelectedMonth(newDate);
      setCurrentWeek(getWeekStart(newDate));
      // Limpar filtros ao mudar de mês
      setSelectedDay("");
      setSelectedHour("");
    },
    [getWeekStart]
  );

  // Gerar semanas baseadas no mês selecionado
  const getWeeksInMonth = useCallback(
    (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const weeks = [];
      let currentWeek = getWeekStart(firstDay);

      while (currentWeek <= lastDay) {
        weeks.push(new Date(currentWeek));
        currentWeek.setDate(currentWeek.getDate() + 7);
      }

      return weeks;
    },
    [getWeekStart]
  );

  // Obter dados da semana atual
  const currentWeekStart = getWeekStart(currentWeek);
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

  // Horários de atendimento (8h às 18h)
  const workingHours = useMemo(() => {
    const hours = [];
    for (let i = 8; i <= 18; i++) {
      hours.push(`${i.toString().padStart(2, "0")}:00`);
    }
    return hours;
  }, []);

  // Gerar dados do calendário
  const calendarData = useMemo(() => {
    const data: CalendarCell[] = [];

    // Gerar dias da semana
    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(currentWeekStart.getDate() + i);
      weekDays.push(day);
    }

    // Para cada horário
    workingHours.forEach((hour) => {
      // Para cada dia da semana
      weekDays.forEach((day) => {
        const dayString = day.toISOString().split("T")[0];
        const dayName = day.toLocaleDateString("pt-BR", { weekday: "short" });
        const dayNumber = day.getDate();

        // Filtrar agendamentos para este dia e horário
        const hourAppointments = appointments.filter((apt) => {
          const aptDate = new Date(apt.startTime);
          const aptDay = aptDate.toISOString().split("T")[0];
          const aptHour =
            aptDate.getHours().toString().padStart(2, "0") + ":00";
          return aptDay === dayString && aptHour === hour;
        });

        data.push({
          day: dayString,
          dayName,
          dayNumber,
          hour,
          count: hourAppointments.length,
          appointments: hourAppointments,
        });
      });
    });

    return data;
  }, [appointments, currentWeekStart, workingHours]);

  // Filtrar agendamentos baseado nos filtros do calendário
  const filteredAppointments = useMemo(() => {
    let filtered = appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      return aptDate >= currentWeekStart && aptDate <= currentWeekEnd;
    });

    // Filtrar por dia selecionado
    if (selectedDay) {
      filtered = filtered.filter((apt) => {
        const aptDate = new Date(apt.startTime);
        return aptDate.toISOString().split("T")[0] === selectedDay;
      });
    }

    // Filtrar por horário selecionado
    if (selectedHour) {
      filtered = filtered.filter((apt) => {
        const aptDate = new Date(apt.startTime);
        const aptHour = aptDate.getHours().toString().padStart(2, "0") + ":00";
        return aptHour === selectedHour;
      });
    }

    return filtered;
  }, [
    appointments,
    currentWeekStart,
    currentWeekEnd,
    selectedDay,
    selectedHour,
  ]);

  // Função para lidar com clique no calendário
  const handleCalendarClick = useCallback(
    (day: string, hour: string) => {
      if (selectedDay === day && selectedHour === hour) {
        // Se clicar no mesmo dia/hora, limpa os filtros
        setSelectedDay("");
        setSelectedHour("");
      } else if (selectedDay === day) {
        // Se clicar no mesmo dia mas horário diferente, muda só o horário
        setSelectedHour(selectedHour === hour ? "" : hour);
      } else if (selectedHour === hour) {
        // Se clicar no mesmo horário mas dia diferente, muda só o dia
        setSelectedDay(selectedDay === day ? "" : day);
      } else {
        // Se clicar em dia e horário diferentes, define ambos
        setSelectedDay(day);
        setSelectedHour(hour);
      }
    },
    [selectedDay, selectedHour]
  );

  // Gerar opções de meses para o filtro (para navegação)
  const navigationMonthOptions = useMemo(() => {
    const months = [];
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear() - 1, 0, 1);

    for (
      let d = new Date(startDate);
      d <= currentDate;
      d.setMonth(d.getMonth() + 1)
    ) {
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const monthName = d.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
      months.push({
        value: `${year}-${month.toString().padStart(2, "0")}`,
        label: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      });
    }

    return months.reverse();
  }, []);

  // Formatar data para exibição
  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  // Formatar hora para exibição
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Obter status em português
  const getStatusText = useCallback((status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "Confirmado";
      case "SCHEDULED":
        return "Agendado";
      case "COMPLETED":
        return "Concluído";
      case "CANCELLED":
        return "Cancelado";
      default:
        return status;
    }
  }, []);

  // Obter classe CSS do status
  const getStatusClass = useCallback((status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "SCHEDULED":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, []);

  // Obter classe CSS para célula do calendário
  const getCalendarCellClass = useCallback(
    (day: string, hour: string, count: number) => {
      let baseClass = "p-2 text-center border cursor-pointer transition-colors";

      // Verificar se está selecionado
      const isSelected =
        (selectedDay === day && selectedHour === hour) ||
        (selectedDay === day && !selectedHour) ||
        (selectedHour === hour && !selectedDay);

      if (isSelected) {
        baseClass += " bg-blue-100 border-blue-300";
      } else if (count > 0) {
        baseClass += " bg-green-50 border-green-200 hover:bg-green-100";
      } else {
        baseClass += " bg-gray-50 border-gray-200 hover:bg-gray-100";
      }

      return baseClass;
    },
    [selectedDay, selectedHour]
  );

  // Carregar dados para o modal
  useEffect(() => {
    const loadModalData = async () => {
      try {
        console.log("Carregando dados do modal...");

        const [usersData, employeesData, servicesData] = await Promise.all([
          getClients(),
          getEmployees(),
          getServices(),
        ]);

        console.log("Dados carregados:", {
          usersData,
          employeesData,
          servicesData,
        });

        // Tratar resposta de usuários (clients)
        if (usersData && usersData.success) {
          const usersList = usersData.data || [];
          console.log("Usuários carregados:", usersList);
          setUsers(usersList);
        }

        // Tratar resposta de funcionários
        if (employeesData && Array.isArray(employeesData)) {
          console.log("Funcionários carregados:", employeesData);
          setEmployees(employeesData);
        }

        // Tratar resposta de serviços
        if (servicesData.data) {
          const servicesList = servicesData.data || [];
          setServices(servicesList);

          // Definir "Psicanalista Clínico" como padrão se existir
          let psicanalistaClinico = servicesList.find(
            (service: any) =>
              service.name?.toLowerCase().includes("psicanalista") &&
              service.name?.toLowerCase().includes("clínico")
          );

          // Fallback: procurar por variações se não encontrar o nome exato
          if (!psicanalistaClinico) {
            psicanalistaClinico = servicesList.find((service: any) =>
              service.name?.toLowerCase().includes("psicanalista")
            );
          }

          // Fallback: usar o primeiro serviço se não encontrar nenhum psicanalista
          if (!psicanalistaClinico && servicesList.length > 0) {
            psicanalistaClinico = servicesList[0];
          }

          if (psicanalistaClinico) {
            setCreateForm((prev) => ({
              ...prev,
              serviceId: psicanalistaClinico.id,
            }));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do modal:", error);
      }
    };

    if (showCreateModal) {
      loadModalData();
    }
  }, [showCreateModal]);

  // Filtrar usuários e funcionários baseado na busca
  useEffect(() => {
    const filteredUsersList =
      userSearch.trim() === ""
        ? users
        : users.filter(
            (user) =>
              user.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
              user.email?.toLowerCase().includes(userSearch.toLowerCase())
          );
    setFilteredUsers(filteredUsersList);
  }, [users, userSearch]);

  useEffect(() => {
    const filteredEmployeesList =
      employeeSearch.trim() === ""
        ? employees
        : employees.filter(
            (employee) =>
              employee.name
                ?.toLowerCase()
                .includes(employeeSearch.toLowerCase()) ||
              employee.email
                ?.toLowerCase()
                .includes(employeeSearch.toLowerCase())
          );
    setFilteredEmployees(filteredEmployeesList);
  }, [employees, employeeSearch]);

  // Definir serviço padrão quando serviços são carregados
  useEffect(() => {
    if (services.length > 0 && !createForm.serviceId) {
      let psicanalistaClinico = services.find(
        (service: any) =>
          service.name?.toLowerCase().includes("psicanalista") &&
          service.name?.toLowerCase().includes("clínico")
      );

      if (!psicanalistaClinico) {
        psicanalistaClinico = services.find((service: any) =>
          service.name?.toLowerCase().includes("psicanalista")
        );
      }

      if (!psicanalistaClinico && services.length > 0) {
        psicanalistaClinico = services[0];
      }

      if (psicanalistaClinico) {
        setCreateForm((prev) => ({
          ...prev,
          serviceId: psicanalistaClinico.id,
        }));
      }
    }
  }, [services, createForm.serviceId]);

  // Função para verificar se um horário está disponível
  const isTimeSlotAvailable = useCallback(
    (employeeId: string, date: string, hour: string) => {
      const startTime = `2025-${date}T${hour}:00`;
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      // Verificar se já existe agendamento neste horário
      const conflictingAppointment = appointments.find((apt) => {
        const aptStart = new Date(apt.startTime);
        const aptEnd = new Date(apt.endTime);
        const newStart = new Date(startTime);
        const newEnd = endTime;

        return (
          apt.employeeId === employeeId &&
          aptStart < newEnd &&
          aptEnd > newStart
        );
      });

      return !conflictingAppointment;
    },
    [appointments]
  );

  // Função para obter horários disponíveis para um funcionário em uma data
  const getAvailableHours = useCallback(
    (employeeId: string, date: string) => {
      const availableHours = [];
      for (let i = 8; i <= 18; i++) {
        const hour = i.toString().padStart(2, "0") + ":00";
        if (isTimeSlotAvailable(employeeId, date, hour)) {
          availableHours.push(hour);
        }
      }
      return availableHours;
    },
    [isTimeSlotAvailable]
  );

  // Função para obter dias disponíveis para um funcionário em um mês
  const getAvailableDays = useCallback(
    (employeeId: string, month: string) => {
      const availableDays = [];
      const daysInMonth = new Date(2025, parseInt(month) - 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = day.toString().padStart(2, "0");
        const date = `${month}-${dayStr}`;
        const availableHours = getAvailableHours(employeeId, date);

        // Se há pelo menos um horário disponível, o dia está disponível
        if (availableHours.length > 0) {
          availableDays.push(dayStr);
        }
      }
      return availableDays;
    },
    [getAvailableHours]
  );

  // Gerar opções de meses, dias e horários
  const monthOptions = useMemo(() => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const monthName = new Date(2025, i - 1, 1).toLocaleDateString("pt-BR", {
        month: "long",
      });
      months.push({
        value: i.toString().padStart(2, "0"),
        label: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      });
    }
    return months;
  }, []);

  const dayOptions = useMemo(() => {
    if (!createForm.month || !createForm.employeeId) return [];

    const availableDays = getAvailableDays(
      createForm.employeeId,
      createForm.month
    );
    return availableDays.map((day) => ({ value: day, label: day }));
  }, [createForm.month, createForm.employeeId, getAvailableDays]);

  const hourOptions = useMemo(() => {
    if (!createForm.month || !createForm.day || !createForm.employeeId)
      return [];

    const date = `${createForm.month}-${createForm.day}`;
    const availableHours = getAvailableHours(createForm.employeeId, date);
    return availableHours.map((hour) => ({ value: hour, label: hour }));
  }, [
    createForm.month,
    createForm.day,
    createForm.employeeId,
    getAvailableHours,
  ]);

  // Função para criar agendamento
  // Função para abrir modal de edição
  const handleEditAppointment = (appointment: Appointment) => {
    const startDate = new Date(appointment.startTime);
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const day = startDate.getDate().toString().padStart(2, "0");
    const hour = startDate.getHours().toString().padStart(2, "0") + ":00";

    setEditingAppointment(appointment);
    setEditForm({
      userId: appointment.userId,
      employeeId: appointment.employeeId,
      serviceId: appointment.serviceId,
      month,
      day,
      hour,
    });
    setShowEditModal(true);
  };

  // Função para salvar edição
  const handleSaveEdit = async () => {
    if (
      !editForm.userId ||
      !editForm.employeeId ||
      !editForm.serviceId ||
      !editForm.month ||
      !editForm.day ||
      !editForm.hour ||
      !editingAppointment
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsEditing(true);
    try {
      const startTime = `2025-${editForm.month}-${editForm.day}T${editForm.hour}:00`;
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      const result = await updateAppointment(editingAppointment.id, {
        startTime: startTime,
        endTime: endTime.toISOString(),
        userId: editForm.userId,
        employeeId: editForm.employeeId,
        serviceId: editForm.serviceId,
      });

      if (result.success) {
        alert("Agendamento atualizado com sucesso!");
        setShowEditModal(false);
        window.location.reload();
      } else {
        alert("Erro ao atualizar agendamento: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      alert("Erro ao atualizar agendamento");
    } finally {
      setIsEditing(false);
    }
  };

  const handleCreateAppointment = async () => {
    if (
      !createForm.userId ||
      !createForm.employeeId ||
      !createForm.serviceId ||
      !createForm.month ||
      !createForm.day ||
      !createForm.hour
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsCreating(true);
    try {
      const startTime = `2025-${createForm.month}-${createForm.day}T${createForm.hour}:00`;
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1); // 1 hora de duração

      const result = await createAppointment({
        startTime: startTime,
        endTime: endTime.toISOString(),
        userId: createForm.userId,
        employeeId: createForm.employeeId,
        serviceId: createForm.serviceId,
      });

      if (result.success) {
        alert("Agendamento criado com sucesso!");
        setShowCreateModal(false);
        setCreateForm({
          userId: "",
          employeeId: "",
          serviceId: "",
          month: "",
          day: "",
          hour: "",
        });
        // Recarregar a página ou atualizar a lista
        // Em vez de reload, vamos emitir um evento para recarregar
        window.location.reload();
      } else {
        alert("Erro ao criar agendamento: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      alert("Erro ao criar agendamento");
    } finally {
      setIsCreating(false);
    }
  };

  // Opções para o modal de edição
  const editDayOptions = useMemo(() => {
    if (!editForm.month || !editForm.employeeId) return [];

    const availableDays = getAvailableDays(editForm.employeeId, editForm.month);
    return availableDays.map((day) => ({ value: day, label: day }));
  }, [editForm.month, editForm.employeeId, getAvailableDays]);

  const editHourOptions = useMemo(() => {
    if (!editForm.month || !editForm.day || !editForm.employeeId) return [];

    const date = `${editForm.month}-${editForm.day}`;
    const availableHours = getAvailableHours(editForm.employeeId, date);
    return availableHours.map((hour) => ({ value: hour, label: hour }));
  }, [editForm.month, editForm.day, editForm.employeeId, getAvailableHours]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalhes dos Agendamentos</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Novo Agendamento
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por cliente, psicólogo ou serviço..."
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange?.(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os status</option>
            <option value="SCHEDULED">Agendado</option>
            <option value="CONFIRMED">Confirmado</option>
            <option value="COMPLETED">Concluído</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
          <select
            value={`${selectedMonth.getFullYear()}-${(
              selectedMonth.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}`}
            onChange={(e) => goToMonth(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {navigationMonthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navegação de Semanas */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigateWeek("prev")}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            ← Semana Anterior
          </button>
          <div className="text-center">
            <h3 className="text-lg font-semibold">
              {formatDate(currentWeekStart)} - {formatDate(currentWeekEnd)}
            </h3>
            <p className="text-sm text-gray-500">
              {filteredAppointments.length} agendamento(s){" "}
              {selectedDay || selectedHour ? "filtrado(s)" : "nesta semana"}
            </p>
            {(selectedDay || selectedHour) && (
              <button
                onClick={() => {
                  setSelectedDay("");
                  setSelectedHour("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 mt-1"
              >
                Limpar filtros
              </button>
            )}
          </div>
          <button
            onClick={() => navigateWeek("next")}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Próxima Semana →
          </button>
        </div>
      </div>

      {/* Calendário Semanal */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-100">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
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
            Calendário Semanal
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Clique em um horário para filtrar os agendamentos
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
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
              {workingHours.map((hour, hourIndex) => (
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
                    const dayString = day.toISOString().split("T")[0];
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                    const cellData = calendarData.find(
                      (cell) => cell.day === dayString && cell.hour === hour
                    );

                    const count = cellData?.count || 0;
                    const isSelected =
                      (selectedDay === dayString && selectedHour === hour) ||
                      (selectedDay === dayString && !selectedHour) ||
                      (selectedHour === hour && !selectedDay);

                    return (
                      <td
                        key={i}
                        className={`p-4 text-center border-r border-gray-200 cursor-pointer transition-all duration-200 ${
                          isWeekend ? "bg-gray-50" : ""
                        }`}
                        onClick={() => handleCalendarClick(dayString, hour)}
                        title={`${day.toLocaleDateString(
                          "pt-BR"
                        )} às ${hour} - ${count} agendamento(s)`}
                      >
                        {count > 0 ? (
                          <div
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm shadow-sm transition-all duration-200 ${
                              isSelected
                                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-110"
                                : "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:shadow-md hover:scale-105"
                            }`}
                          >
                            {count}
                          </div>
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-200 ${
                              isSelected
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
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
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600"></div>
                <span>Agendamentos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
                <span>Selecionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-dashed border-gray-300"></div>
                <span>Disponível</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
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
              <span>Clique para filtrar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
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
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Carregando...
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {selectedDay || selectedHour
                      ? "Nenhum agendamento encontrado para os filtros selecionados"
                      : "Nenhum agendamento encontrado para esta semana"}
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onSelectAppointment(appointment)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(new Date(appointment.startTime))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(new Date(appointment.startTime))}
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
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                          appointment.status
                        )}`}
                      >
                        {getStatusText(appointment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAppointment(appointment);
                          }}
                        >
                          Editar
                        </button>
                        {appointment.status === "SCHEDULED" && (
                          <button
                            className="text-green-600 hover:text-green-900 transition-colors"
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
                            className="text-yellow-600 hover:text-yellow-900 transition-colors"
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
                              className="text-red-600 font-bold transition-colors"
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
                              className="text-gray-500 ml-2 transition-colors"
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
                            className="text-red-600 hover:text-red-900 transition-colors"
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      {meta.total > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mt-6">
          <Pagination
            totalItems={meta.total}
            itemsPerPage={meta.limit}
            currentPage={meta.page}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Modal de Criação de Agendamento */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Novo Agendamento
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cliente * ({users.length} disponíveis)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    onFocus={() => setShowUserDropdown(true)}
                    onBlur={() =>
                      setTimeout(() => setShowUserDropdown(false), 200)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {showUserDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            onClick={() => {
                              setCreateForm((prev) => ({
                                ...prev,
                                userId: user.id,
                              }));
                              setUserSearch(user.name);
                              setShowUserDropdown(false);
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-500">
                          Nenhum cliente encontrado
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Funcionário */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funcionário * ({employees.length} disponíveis)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar funcionário..."
                    value={employeeSearch}
                    onChange={(e) => setEmployeeSearch(e.target.value)}
                    onFocus={() => setShowEmployeeDropdown(true)}
                    onBlur={() =>
                      setTimeout(() => setShowEmployeeDropdown(false), 200)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {showEmployeeDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                          <div
                            key={employee.id}
                            onClick={() => {
                              setCreateForm((prev) => ({
                                ...prev,
                                employeeId: employee.id,
                              }));
                              setEmployeeSearch(employee.name);
                              setShowEmployeeDropdown(false);
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-500">
                          Nenhum funcionário encontrado
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Serviço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serviço * ({services.length} disponíveis)
                </label>
                <select
                  value={createForm.serviceId}
                  onChange={(e) =>
                    setCreateForm((prev) => ({
                      ...prev,
                      serviceId: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um serviço</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - R$ {service.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data e Hora */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mês *
                  </label>
                  <select
                    value={createForm.month}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        month: e.target.value,
                        day: "",
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione o mês</option>
                    {monthOptions.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dia *
                  </label>
                  <select
                    value={createForm.day}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        day: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!createForm.month}
                  >
                    <option value="">Selecione o dia</option>
                    {dayOptions.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário *
                  </label>
                  <select
                    value={createForm.hour}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        hour: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione o horário</option>
                    {hourOptions.map((hour) => (
                      <option key={hour.value} value={hour.value}>
                        {hour.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateAppointment}
                  disabled={isCreating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Criando...
                    </>
                  ) : (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Criar Agendamento
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição de Agendamento */}
      {showEditModal && editingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Editar Agendamento
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cliente *
                </label>
                <select
                  value={editForm.userId}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      userId: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um cliente</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Funcionário */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funcionário *
                </label>
                <select
                  value={editForm.employeeId}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      employeeId: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um funcionário</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Serviço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serviço *
                </label>
                <select
                  value={editForm.serviceId}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      serviceId: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um serviço</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - R$ {service.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data e Hora */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mês *
                  </label>
                  <select
                    value={editForm.month}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        month: e.target.value,
                        day: "", // Reset day when month changes
                        hour: "", // Reset hour when month changes
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione o mês</option>
                    {monthOptions.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dia *
                  </label>
                  <select
                    value={editForm.day}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        day: e.target.value,
                        hour: "", // Reset hour when day changes
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!editForm.month}
                  >
                    <option value="">Selecione o dia</option>
                    {editDayOptions.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário *
                  </label>
                  <select
                    value={editForm.hour}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        hour: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione o horário</option>
                    {editHourOptions.map((hour) => (
                      <option key={hour.value} value={hour.value}>
                        {hour.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isEditing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
