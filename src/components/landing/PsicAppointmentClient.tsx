"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Calendar from "@/components/landing/Calendar";
import { registerAction } from "@/actions/auth";
import { createAppointment } from "@/actions/appointments";
import { getServicesByEmployee } from "@/actions/users";

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
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!name || !email || !password || !selecionado) {
      alert("Preencha todos os campos e selecione um horário!");
      return;
    }
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
      alert("Erro ao criar appointment!");
      return;
    }
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
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100">
              <motion.div
                className="text-center mb-6 sm:mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-akzidens text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  Crie uma conta e finalize o agendamento
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Preencha seus dados para confirmar a sessão
                </p>
              </motion.div>

              <form
                className="w-full flex flex-col gap-6"
                onSubmit={handleSubmit}
              >
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="text-gray-700 font-semibold text-sm sm:text-base">
                    Nome Completo
                    <input
                      type="text"
                      name="name"
                      className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300 hover:border-blue-300 text-sm sm:text-base"
                      placeholder="Seu nome completo"
                      required
                    />
                  </label>
                  <label className="text-gray-700 font-semibold text-sm sm:text-base">
                    Email
                    <input
                      type="email"
                      name="email"
                      className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300 hover:border-blue-300 text-sm sm:text-base"
                      placeholder="seu@email.com"
                      required
                    />
                  </label>
                  <label className="text-gray-700 font-semibold text-sm sm:text-base sm:col-span-2 lg:col-span-1">
                    Senha
                    <input
                      type="password"
                      name="password"
                      className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300 hover:border-blue-300 text-sm sm:text-base"
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
                    className="px-6 sm:px-10 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-akzidens font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-lg hover:from-blue-700 hover:to-blue-800"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✓ Finalizar Agendamento
                  </motion.button>

                  <div className="mt-4 text-xs sm:text-sm text-gray-600">
                    <p>
                      Ao criar sua conta, você concorda com nossos termos de uso
                    </p>
                    <p className="mt-1">
                      Sua primeira sessão é{" "}
                      <span className="font-semibold text-green-600">
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
