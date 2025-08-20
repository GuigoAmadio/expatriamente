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
      alert("Erro ao registrar usuário!");
      return;
    }
    const userId = userResp.user.id;
    // O usuário já está logado automaticamente após o registro
    // Agora vamos criar o appointment
    // Buscar o serviceId do backend
    // 2. Montar startTime e endTime ISO
    const hoje = new Date();
    const diaSemana = selecionado.dia;
    // Encontrar a próxima data correspondente ao dia da semana selecionado
    const diff = (diaSemana + 7 - hoje.getDay()) % 7;
    const dataBase = new Date(hoje);
    dataBase.setDate(hoje.getDate() + diff);
    const [hora, minuto] = selecionado.hora.split(":");
    dataBase.setHours(Number(hora), Number(minuto), 0, 0);
    const startTime = dataBase.toISOString();
    // Supondo duração de 1h
    const endDate = new Date(dataBase);
    endDate.setHours(endDate.getHours() + 1);
    const endTime = endDate.toISOString();
    console.log("[Appointment] Dados do appointment:", {
      userId,
      employeeId,
      serviceId,
      startTime,
      endTime,
      status: "SCHEDULED",
    });
    // 3. Criar appointment
    const appointmentResp = await createAppointment({
      userId,
      employeeId,
      serviceId,
      startTime,
      endTime,
    });
    console.log(
      "[Appointment] Resposta do createAppointment:",
      appointmentResp
    );
    if (!appointmentResp.success) {
      console.error(
        `❌ [Agendamento] Erro ao criar appointment:`,
        appointmentResp
      );
      alert("Erro ao criar appointment!");
      return;
    }

    console.log(`✅ [Agendamento] Appointment criado com sucesso!`);
    console.log(`🎉 [Agendamento] Processo finalizado com sucesso!`);

    // 4. Redirecionar para o dashboard de appointments
    window.location.href = "/dashboard/client/appointments";
  };

  return (
    <div className="w-full">
      <Calendar appointments={appointments} onSelect={handleSelect} />
      <AnimatePresence>
        {selecionado && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full max-w-4xl mx-auto mt-8"
          >
            <div className="bg-gradient-to-br from-white to-[#f8f6f2] rounded-2xl shadow-xl p-6 lg:p-8 border border-[#e4ded2]">
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-akzidens text-xl lg:text-2xl font-bold text-[#5b7470] mb-3">
                  Crie uma conta e finalize o agendamento
                </h3>
                <p className="text-[#6B3F1D] text-sm">
                  Preencha seus dados para confirmar a sessão
                </p>
              </motion.div>

              <form
                className="w-full flex flex-col gap-6"
                onSubmit={handleSubmit}
              >
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="text-[#5b7470] font-akzidens font-semibold text-sm">
                    Nome Completo
                    <input
                      type="text"
                      name="name"
                      className="w-full mt-2 px-4 py-3 border-2 border-[#e4ded2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9dc9e2] focus:border-[#9dc9e2] bg-white transition-all duration-300 hover:border-[#c5b2a1] text-sm"
                      placeholder="Seu nome completo"
                      required
                    />
                  </label>
                  <label className="text-[#5b7470] font-akzidens font-semibold text-sm">
                    Email
                    <input
                      type="email"
                      name="email"
                      className="w-full mt-2 px-4 py-3 border-2 border-[#e4ded2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9dc9e2] focus:border-[#9dc9e2] bg-white transition-all duration-300 hover:border-[#c5b2a1] text-sm"
                      placeholder="seu@email.com"
                      required
                    />
                  </label>
                  <label className="text-[#5b7470] font-akzidens font-semibold text-sm sm:col-span-2 lg:col-span-1">
                    Senha
                    <input
                      type="password"
                      name="password"
                      className="w-full mt-2 px-4 py-3 border-2 border-[#e4ded2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9dc9e2] focus:border-[#9dc9e2] bg-white transition-all duration-300 hover:border-[#c5b2a1] text-sm"
                      placeholder="Mínimo 6 caracteres"
                      required
                      minLength={6}
                    />
                  </label>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.button
                    type="submit"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#987b6b] to-[#587861] text-white font-akzidens font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-base hover:from-[#587861] hover:to-[#987b6b]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✓ Finalizar Agendamento
                  </motion.button>

                  <div className="mt-4 text-xs text-[#6B3F1D]">
                    <p>
                      Ao criar sua conta, você concorda com nossos termos de uso
                    </p>
                    <p className="mt-1">
                      Sua primeira sessão é{" "}
                      <span className="font-semibold text-[#587861]">
                        gratuita
                      </span>
                      !
                    </p>
                  </div>
                </motion.div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
