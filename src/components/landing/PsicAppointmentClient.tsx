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
  const { trackCompleteRegistration } = useFacebookPixel();

  function handleSelect(dia: number, hora: string) {
    setSelecionado({ dia, hora });
  }

  useEffect(() => {
    if (selecionado && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selecionado]);

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
    // Calcular a data correta baseada no dia da semana selecionado
    const hoje = new Date();
    const diaSemana = selecionado.dia;
    const diff = (diaSemana + 7 - hoje.getDay()) % 7;
    const dataBase = new Date(hoje);
    dataBase.setDate(hoje.getDate() + diff);

    // Definir o horário específico
    const [hora, minuto] = selecionado.hora.split(":");
    dataBase.setHours(Number(hora), Number(minuto), 0, 0);
    const startTime = dataBase.toISOString();

    // Calcular endTime (1 hora depois)
    const endTime = new Date(dataBase.getTime() + 60 * 60 * 1000).toISOString();

    const appointmentResp = await createAppointment({
      userId: userResp.user.id,
      employeeId: employeeId,
      serviceId: service.id,
      startTime: startTime,
      endTime: endTime,
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
    <div className="space-y-8 mt-10">
      <Calendar appointments={appointments} onSelect={handleSelect} />

      {/* Formulário de Agendamento */}
      <AnimatePresence>
        {selecionado && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f6f2] via-[#e4ded2] to-[#f8f6f2] rounded-2xl blur-sm opacity-50"></div>

            {/* Card principal */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e4ded2]/50 overflow-hidden">
              {/* Header com gradiente */}
              <div className="bg-gradient-to-r from-[#987b6b] via-[#9ca995] to-[#587861] p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-7 0h8m-8 0V21a1 1 0 001 1h6a1 1 0 001-1V7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-akzidens font-bold mb-1">
                      Finalizar Agendamento
                    </h3>
                    <p className="text-white/90 text-xs">
                      Crie sua conta e confirme o horário selecionado
                    </p>
                  </div>
                </div>

                {/* Info do agendamento */}
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
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
                    </div>
                    <div>
                      <p className="text-white font-akzidens font-semibold text-base">
                        {(() => {
                          const hoje = new Date();
                          const diaSemana = selecionado.dia;
                          const diff = (diaSemana + 7 - hoje.getDay()) % 7;
                          const dataBase = new Date(hoje);
                          dataBase.setDate(hoje.getDate() + diff);
                          return dataBase.toLocaleDateString("pt-BR");
                        })()}{" "}
                        às {selecionado.hora}
                      </p>
                      <p className="text-white/80 text-xs">
                        Sessão de 60 minutos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="name"
                        className="block text-xs font-akzidens font-semibold text-[#587861] mb-1"
                      >
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-3 py-2 bg-[#f8f6f2] border-2 border-[#e4ded2] rounded-lg font-akzidens text-sm
                                 focus:outline-none focus:border-[#987b6b] focus:bg-white 
                                 transition-all duration-300 hover:border-[#9ca995]"
                        placeholder="Digite seu nome completo"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-akzidens font-semibold text-[#587861] mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 bg-[#f8f6f2] border-2 border-[#e4ded2] rounded-lg font-akzidens text-sm
                                 focus:outline-none focus:border-[#987b6b] focus:bg-white 
                                 transition-all duration-300 hover:border-[#9ca995]"
                        placeholder="Digite seu email"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-xs font-akzidens font-semibold text-[#587861] mb-1"
                      >
                        Senha
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        minLength={6}
                        className="w-full px-3 py-2 bg-[#f8f6f2] border-2 border-[#e4ded2] rounded-lg font-akzidens text-sm
                                 focus:outline-none focus:border-[#987b6b] focus:bg-white 
                                 transition-all duration-300 hover:border-[#9ca995]"
                        placeholder="Mínimo 6 caracteres"
                      />
                    </div>
                  </div>

                  {/* Info adicional */}
                  <div className="bg-[#f8f6f2] rounded-xl p-3 border border-[#e4ded2]/50">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-[#9ca995] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
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
                      </div>
                      <div className="text-xs text-[#587861]">
                        <p className="font-akzidens font-semibold mb-1">
                          Informações importantes:
                        </p>
                        <ul className="space-y-0.5 text-xs">
                          <li>• Você receberá um email de confirmação</li>
                          <li>
                            • O link da sessão será enviado 15 minutos antes
                          </li>
                          <li>• Primeira consulta gratuita</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Botão */}
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#987b6b] via-[#9ca995] to-[#587861] 
                             text-white font-akzidens font-bold py-3 px-6 rounded-lg
                             shadow-md hover:shadow-lg transition-all duration-300
                             hover:scale-[1.01] active:scale-[0.99]
                             focus:outline-none focus:ring-2 focus:ring-[#987b6b]/30"
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <div className="flex items-center justify-center gap-2">
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
                      <span className="text-sm">Confirmar Agendamento</span>
                    </div>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
