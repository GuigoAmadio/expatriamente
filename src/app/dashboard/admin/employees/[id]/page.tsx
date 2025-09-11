"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToasts, Toast } from "@/components/ui/Toast";
import { Employee } from "@/types/backend";
import { getEmployeeById, deleteEmployee } from "@/actions/employees";
import { EmployeeScheduleManager } from "@/components/dashboard/EmployeeScheduleManager";
import { ScheduleProvider } from "@/context/ScheduleContext";
import {
  FiEdit,
  FiTrash2,
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiClock,
} from "react-icons/fi";

export default function EmployeeDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { toasts, addToast } = useToasts();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeId = params.id as string;
        const employeeData = await getEmployeeById(employeeId);

        if (employeeData) {
          setEmployee(employeeData);
        } else {
          addToast({
            message: "Funcionário não encontrado.",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar funcionário:", error);
        addToast({
          message: "Erro ao carregar dados do funcionário.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEmployee();
    }
  }, [params.id, addToast]);

  const handleDelete = async () => {
    if (!employee) return;

    if (!window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteEmployee(employee.id);

      addToast({
        message: "Funcionário excluído com sucesso!",
        type: "success",
      });

      router.push("/dashboard/admin/employees");
    } catch (error: any) {
      console.error("Erro ao excluir funcionário:", error);

      // Verificar se é erro de foreign key constraint
      if (
        error.message?.includes("agendamentos") ||
        error.message?.includes("foreign key")
      ) {
        addToast({
          message:
            "Não é possível excluir funcionário com agendamentos ativos. Desative o funcionário ao invés de excluí-lo.",
          type: "error",
        });
      } else {
        addToast({
          message: "Erro ao excluir funcionário.",
          type: "error",
        });
      }
    } finally {
      setDeleting(false);
    }
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

  if (!employee) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">
              Funcionário não encontrado
            </h2>
            <button
              onClick={() => router.push("/dashboard/admin/employees")}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              ← Voltar para a lista
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard/admin/employees")}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <h1 className="text-2xl font-bold">Detalhes do Funcionário</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(`/dashboard/admin/employees/${employee.id}/edit`)
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 cursor-pointer transition-colors w-full sm:w-auto justify-center"
            >
              <FiEdit className="w-4 h-4" />
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer transition-colors w-full sm:w-auto justify-center"
            >
              <FiTrash2 className="w-4 h-4" />
              {deleting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>

        {/* Informações principais */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center ring-4 ring-gray-50">
                <FiUser className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {employee.name}
              </h2>
              <p className="text-gray-600">
                {employee.position || "Cargo não informado"}
              </p>
              <p
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  employee.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {employee.isActive ? "Ativo" : "Inativo"}
              </p>
              <p className="text-sm text-gray-500">ID: {employee.id}</p>
            </div>
          </div>

          {/* Informações detalhadas */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Informações de contato */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiMail className="w-5 h-5" />
                  Informações de Contato
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-3">
                    <FiMail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{employee.email}</span>
                  </div>
                  {employee.phone && (
                    <div className="flex items-center gap-3">
                      <FiPhone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{employee.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Informações do sistema */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiCalendar className="w-5 h-5" />
                  Informações do Sistema
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      Criado em:{" "}
                      {new Date(employee.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      Última atualização:{" "}
                      {new Date(employee.updatedAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição */}
            {employee.description && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Descrição
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {employee.description}
                </p>
              </div>
            )}

            {/* Horários de trabalho */}
            {employee.workingHours && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Horários de Trabalho
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {Object.entries(employee.workingHours).map(([day, hours]) => (
                    <div key={day} className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 capitalize">
                        {day === "monday"
                          ? "Segunda"
                          : day === "tuesday"
                          ? "Terça"
                          : day === "wednesday"
                          ? "Quarta"
                          : day === "thursday"
                          ? "Quinta"
                          : day === "friday"
                          ? "Sexta"
                          : day === "saturday"
                          ? "Sábado"
                          : "Domingo"}
                      </h4>
                      <div className="space-y-1">
                        {Array.isArray(hours) && hours.length > 0 ? (
                          hours.map((hour, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {typeof hour === "string"
                                ? hour
                                : `${hour.startTime} - ${hour.endTime}`}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500 italic">
                            Não disponível
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card de Edição de Horários */}
      <div className="mt-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <FiClock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Gerenciar Horários de Trabalho
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Configure os horários de disponibilidade do funcionário
              </p>
            </div>
          </div>

          <ScheduleProvider>
            <EmployeeScheduleManager employeeId={employee.id} />
          </ScheduleProvider>
        </div>
      </div>

      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
