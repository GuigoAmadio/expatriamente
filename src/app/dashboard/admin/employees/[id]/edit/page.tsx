"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToasts, Toast } from "@/components/ui/Toast";
import { Employee, WorkingHours } from "@/types/backend";
import { getEmployeeById, updateEmployee } from "@/actions/employees";
import {
  FiClock,
  FiMapPin,
  FiPhone,
  FiUser,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const { toasts, addToast } = useToasts();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [employee, setEmployee] = useState<Employee | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    description: "",
    isActive: true,
  });

  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const emptyWorkingHours = useMemo(
    () => ({
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    }),
    []
  );

  const daysOfWeek = [
    { key: "monday", label: "Segunda-feira" },
    { key: "tuesday", label: "Terça-feira" },
    { key: "wednesday", label: "Quarta-feira" },
    { key: "thursday", label: "Quinta-feira" },
    { key: "friday", label: "Sexta-feira" },
    { key: "saturday", label: "Sábado" },
    { key: "sunday", label: "Domingo" },
  ];

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeId = params.id as string;
        const employeeData = await getEmployeeById(employeeId);
        console.log("employeeData", employeeData);
        if (employeeData) {
          setEmployee(employeeData);
          setFormData({
            name: employeeData.name || "",
            email: employeeData.email || "",
            phone: employeeData.phone || "",
            position: employeeData.position || "",
            description: employeeData.description || "",
            isActive: employeeData.isActive ?? true,
          });

          // Garantir que workingHours seja inicializado corretamente
          if (
            employeeData.workingHours &&
            typeof employeeData.workingHours === "object" &&
            !Array.isArray(employeeData.workingHours)
          ) {
            setWorkingHours({
              ...emptyWorkingHours,
              ...employeeData.workingHours,
            });
          } else {
            // Inicializar com arrays vazios se não houver dados
            setWorkingHours(emptyWorkingHours);
          }
        } else {
          addToast({
            message: "Funcionário não encontrado.",
            type: "error",
          });
          router.push("/dashboard/admin/employees");
        }
      } catch (error) {
        console.error("Erro ao carregar funcionário:", error);
        addToast({
          message: "Erro ao carregar dados do funcionário.",
          type: "error",
        });
        router.push("/dashboard/admin/employees");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEmployee();
    }
  }, [params.id, addToast, router, emptyWorkingHours]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const employeeId = params.id as string;
      const updateData = {
        ...formData,
        workingHours: { ...emptyWorkingHours, ...workingHours },
      };

      console.log("📦 Dados sendo enviados:", updateData);
      console.log("📦 workingHours:", workingHours);
      console.log("📦 typeof workingHours:", typeof workingHours);

      await updateEmployee(employeeId, updateData);

      addToast({
        type: "success",
        message: "Funcionário atualizado com sucesso.",
      });
      router.push("/dashboard/admin/employees");
    } catch (error: any) {
      console.error("Erro ao atualizar funcionário:", error);
      addToast({
        type: "error",
        message: error.message || "Erro ao atualizar funcionário.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleWorkingHoursChange = (
    day: keyof WorkingHours,
    time: string,
    checked: boolean
  ) => {
    setWorkingHours((prev) => {
      const currentDayHours = Array.isArray(prev[day]) ? prev[day] : [];
      const updatedDayHours = checked
        ? [...currentDayHours, time]
        : currentDayHours.filter((t) => t !== time);

      return {
        ...prev,
        [day]: updatedDayHours,
      };
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-2xl font-bold">Editar Funcionário</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
          >
            ← Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              Informações Básicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Funcionário ativo
                </span>
              </label>
            </div>
          </div>

          {/* Horários de Trabalho */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiClock className="w-5 h-5" />
              Horários de Trabalho
            </h2>
            <div className="space-y-4">
              {daysOfWeek.map(({ key, label }) => (
                <div
                  key={key}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <h3 className="font-medium text-gray-900 mb-3">{label}</h3>
                  <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-2">
                    {timeSlots.map((time) => {
                      const dayHours = workingHours[key as keyof WorkingHours];
                      const isAvailable = Array.isArray(dayHours)
                        ? dayHours.includes(time)
                        : false;
                      return (
                        <label
                          key={time}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isAvailable}
                            onChange={(e) =>
                              handleWorkingHoursChange(
                                key as keyof WorkingHours,
                                time,
                                e.target.checked
                              )
                            }
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{time}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>

      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
