"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createAppointment } from "@/actions/appointments";
import { useToast } from "@/components/ui/Toast";
import Calendar from "@/components/landing/Calendar";

interface Psychologist {
  id: string;
  name: string;
  specialty?: string;
  image?: string;
}

interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
}

interface User {
  id: string;
  name?: string;
  email: string;
}

interface AppointmentSlot {
  data: string;
  horarios: string[];
}

interface CreateAppointmentClientProps {
  psychologist: Psychologist;
  availableSlots: AppointmentSlot[];
  services: Service[];
  currentUser: User;
}

export default function CreateAppointmentClient({
  psychologist,
  availableSlots,
  services,
  currentUser,
}: CreateAppointmentClientProps) {
  const [selectedSlot, setSelectedSlot] = useState<{
    dia: number;
    hora: string;
  } | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  // Auto-selecionar primeiro serviço se houver apenas um
  useEffect(() => {
    if (services.length === 1) {
      setSelectedService(services[0].id);
    }
  }, [services]);

  const handleSlotSelect = (dia: number, hora: string) => {
    setSelectedSlot({ dia, hora });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours}h ${mins > 0 ? `${mins}min` : ""}`
      : `${mins}min`;
  };

  const handleSubmit = async () => {
    if (!selectedSlot || !selectedService) {
      showToast({
        type: "warning",
        title: "Campos obrigatórios",
        message: "Selecione um horário e um serviço",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Calcular a data correta baseada no dia da semana selecionado
      const hoje = new Date();
      const diaSemana = selectedSlot.dia;
      const diff = (diaSemana + 7 - hoje.getDay()) % 7;
      const dataBase = new Date(hoje);
      dataBase.setDate(hoje.getDate() + diff);

      // Definir o horário específico
      const [hora, minuto] = selectedSlot.hora.split(":");
      dataBase.setHours(Number(hora), Number(minuto), 0, 0);
      const startTime = dataBase.toISOString();

      // Encontrar duração do serviço selecionado
      const selectedServiceData = services.find(
        (s) => s.id === selectedService
      );
      const duration = selectedServiceData?.duration || 60; // Default 60 minutos

      // Calcular endTime baseado na duração do serviço
      const endTime = new Date(
        dataBase.getTime() + duration * 60 * 1000
      ).toISOString();

      const appointmentData = {
        userId: currentUser.id,
        employeeId: psychologist.id,
        serviceId: selectedService,
        startTime,
        endTime,
      };

      console.log(
        "🔵 [CreateAppointment] Criando agendamento:",
        appointmentData
      );

      const result = await createAppointment(appointmentData);

      if (result.success) {
        showToast({
          type: "success",
          title: "Agendamento Criado!",
          message: "Sua consulta foi agendada com sucesso",
        });

        // Redirecionar para a lista de agendamentos
        router.push("/dashboard/client/appointments");
      } else {
        showToast({
          type: "error",
          title: "Erro ao Agendar",
          message: result.message || "Erro ao criar agendamento",
        });
      }
    } catch (error) {
      console.error("❌ [CreateAppointment] Erro:", error);
      showToast({
        type: "error",
        title: "Erro Inesperado",
        message: "Algo deu errado. Tente novamente",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Serviços Indisponíveis
        </h3>
        <p className="text-gray-600 mb-4">
          Este psicanalista não possui serviços disponíveis no momento.
        </p>
        <a
          href="/dashboard/client/psychologists"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Escolher Outro Psicanalista
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Seleção de Serviço */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Escolha o Serviço
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedService === service.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {service.name}
                  </h4>
                  {service.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {service.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>⏱️ {formatDuration(service.duration)}</span>
                    <span className="font-semibold text-green-600">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedService === service.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedService === service.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Calendário */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Escolha o Horário
        </h3>
        <Calendar
          appointments={availableSlots}
          workingHours={null}
          onSelect={handleSlotSelect}
        />
      </div>

      {/* Resumo e Confirmação */}
      <AnimatePresence>
        {selectedSlot && selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumo do Agendamento
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Psicanalista:</span>
                <span className="font-semibold">{psychologist.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Serviço:</span>
                <span className="font-semibold">
                  {services.find((s) => s.id === selectedService)?.name}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Data e Hora:</span>
                <span className="font-semibold">
                  {(() => {
                    const hoje = new Date();
                    const diaSemana = selectedSlot.dia;
                    const diff = (diaSemana + 7 - hoje.getDay()) % 7;
                    const dataBase = new Date(hoje);
                    dataBase.setDate(hoje.getDate() + diff);
                    return dataBase.toLocaleDateString("pt-BR");
                  })()}{" "}
                  às {selectedSlot.hora}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Duração:</span>
                <span className="font-semibold">
                  {formatDuration(
                    services.find((s) => s.id === selectedService)?.duration ||
                      60
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Valor:</span>
                <span className="font-semibold text-green-600">
                  {formatPrice(
                    services.find((s) => s.id === selectedService)?.price || 0
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Agendando...
                </div>
              ) : (
                "✅ Confirmar Agendamento"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
