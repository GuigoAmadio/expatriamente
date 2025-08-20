"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Calendar from "@/components/landing/Calendar";
import { registerAction } from "@/actions/auth";
import { createAppointment } from "@/actions/appointments";
import { getServicesByEmployee } from "@/actions/users";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

interface Appointment {
  data: string;
  horarios: string[];
}

export default function PsicAppointmentClient({
  appointments,
  employeeId,
  serviceId,
}: {
  appointments: Appointment[];
  employeeId: string;
  serviceId: string;
}) {
  const [selecionado, setSelecionado] = useState<{
    dia: number;
    hora: string;
  } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { trackCompleteRegistration, testServerEvent } = useFacebookPixel();

  function handleSelect(dia: number, hora: string) {
    setSelecionado({ dia, hora });
  }

  useEffect(() => {
    if (selecionado && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selecionado]);

  // ✅ NOVA FUNÇÃO: Testar evento do Facebook
  const handleTestFacebookEvent = async () => {
    try {
      await testServerEvent("Schedule", {
        content_name: "Teste de Agendamento",
        content_category: "Psicologia",
        content_type: "test_event",
        psychologist_id: employeeId,
        service_id: serviceId,
        test_mode: true,
        test_timestamp: new Date().toISOString(),
      });

      console.log("🧪 [Teste] Evento de teste enviado com sucesso!");
    } catch (error) {
      console.error("❌ [Teste] Erro ao enviar evento de teste:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`🔵 [Agendamento] Iniciando processo de agendamento`);

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password || !selecionado) {
      console.warn(`⚠️ [Agendamento] Campos obrigatórios não preenchidos`);
      alert("Preencha todos os campos e selecione um horário!");
      return;
    }

    console.log(`🔵 [Agendamento] Dados do formulário:`, {
      name,
      email,
      employeeId,
      serviceId,
    });

    // Rastrear evento de finalização de agendamento
    console.log(`🔵 [Facebook Pixel] Rastreando finalização de agendamento`);
    trackCompleteRegistration({
      content_name: "Finalizar Agendamento",
      content_category: "PsicAppointmentClient",
      content_type: "form_submit",
      psychologist_id: employeeId,
      service_id: serviceId,
      appointment_date: selecionado.dia,
      appointment_time: selecionado.hora,
    });

    // 1. Registrar usuário usando a action de auth
    const userResp = await registerAction({ name, email, password });
    if (!userResp.success || !userResp.user?.id) {
      console.error(`❌ [Agendamento] Erro ao registrar usuário:`, userResp);
      alert("Erro ao criar conta. Tente novamente.");
      return;
    }

    console.log(
      `✅ [Agendamento] Usuário registrado com sucesso:`,
      userResp.user.id
    );

    // 2. Buscar serviços disponíveis para o funcionário
    const servicesResp = await getServicesByEmployee(employeeId);
    if (
      !servicesResp.success ||
      !servicesResp.data ||
      servicesResp.data.length === 0
    ) {
      console.error(`❌ [Agendamento] Erro ao buscar serviços:`, servicesResp);
      alert("Erro ao buscar serviços disponíveis. Tente novamente.");
      return;
    }

    const service = servicesResp.data[0]; // Usar o primeiro serviço disponível
    console.log(`✅ [Agendamento] Serviço encontrado:`, service);

    // 3. Criar agendamento
    const appointmentResp = await createAppointment({
      userId: userResp.user.id,
      employeeId: employeeId,
      serviceId: service.id,
      date: new Date(selecionado.dia),
      time: selecionado.hora,
      status: "scheduled",
    });

    if (!appointmentResp.success) {
      console.error(
        `❌ [Agendamento] Erro ao criar agendamento:`,
        appointmentResp
      );
      alert("Erro ao criar agendamento. Tente novamente.");
      return;
    }

    console.log(
      `✅ [Agendamento] Agendamento criado com sucesso:`,
      appointmentResp.data
    );

    // 4. Sucesso - mostrar mensagem e limpar formulário
    alert(
      "Agendamento realizado com sucesso! Você receberá um email de confirmação."
    );

    // Limpar seleção
    setSelecionado(null);

    // Resetar formulário
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="space-y-8">
      {/* ✅ NOVO: Botão de teste do Facebook */}
      <div className="text-center">
        <button
          onClick={handleTestFacebookEvent}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          title="Testar evento do Facebook Pixel"
        >
          🧪 Testar Evento Facebook
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Use para testar eventos com código TEST24945
        </p>
      </div>

      {/* Calendário */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Selecione uma data e horário
        </h3>
        <Calendar
          appointments={appointments}
          onSelect={handleSelect}
          selected={selecionado}
        />
      </div>

      {/* Formulário de Agendamento */}
      <AnimatePresence>
        {selecionado && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Finalizar Agendamento
            </h3>
            <p className="text-gray-600 mb-4">
              Data: {new Date(selecionado.dia).toLocaleDateString("pt-BR")} às{" "}
              {selecionado.hora}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Crie uma senha (mín. 6 caracteres)"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Confirmar Agendamento
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
