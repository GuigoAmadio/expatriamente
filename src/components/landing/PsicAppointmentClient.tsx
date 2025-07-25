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
    <>
      <Calendar appointments={appointments} onSelect={handleSelect} />
      <AnimatePresence>
        {selecionado && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full max-w-5xl flex flex-col items-center gap-6 mt-40"
            style={{ background: "none", boxShadow: "none" }}
          >
            <h3 className="font-akzidens text-2xl md:text-4xl font-bold text-[#01386F] mb-2 text-center">
              Crie uma conta e finalize o appointment
            </h3>
            <form
              className="w-full flex flex-col items-center gap-4 md:gap-6 mb-20"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
                <label className="text-[#01386F] font-semibold w-full md:w-1/3">
                  Nome
                  <input
                    type="text"
                    name="name"
                    className="w-full mt-1 px-3 py-2 border border-[#b7c8b1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01386F]"
                    placeholder="Seu nome"
                  />
                </label>
                <label className="text-[#01386F] font-semibold w-full md:w-1/3">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="w-full mt-1 px-3 py-2 border border-[#b7c8b1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01386F]"
                    placeholder="Seu email"
                  />
                </label>
                <label className="text-[#01386F] font-semibold w-full md:w-1/3">
                  Senha
                  <input
                    type="password"
                    name="password"
                    className="w-full mt-1 px-3 py-2 border border-[#b7c8b1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01386F]"
                    placeholder="Crie uma senha"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 px-8 py-3 rounded-lg bg-[#01386F] text-white font-akzidens font-bold shadow hover:bg-[#012a52] transition-all text-lg mx-auto"
              >
                Finalizar Appointment
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
