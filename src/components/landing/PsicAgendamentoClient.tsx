"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Calendar from "@/components/landing/Calendar";

interface Agendamento {
  data: string;
  horarios: string[];
}

export default function PsicAgendamentoClient({
  agendamentos,
}: {
  agendamentos: Agendamento[];
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

  return (
    <>
      <Calendar agendamentos={agendamentos} onSelect={handleSelect} />
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
              Crie uma conta e finalize o agendamento
            </h3>
            <form className="w-full flex flex-col items-center gap-4 md:gap-6 mb-20">
              <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
                <label className="text-[#01386F] font-semibold w-full md:w-1/3">
                  Nome
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border border-[#b7c8b1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01386F]"
                    placeholder="Seu nome"
                  />
                </label>
                <label className="text-[#01386F] font-semibold w-full md:w-1/3">
                  Email
                  <input
                    type="email"
                    className="w-full mt-1 px-3 py-2 border border-[#b7c8b1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01386F]"
                    placeholder="Seu email"
                  />
                </label>
                <label className="text-[#01386F] font-semibold w-full md:w-1/3">
                  Senha
                  <input
                    type="password"
                    className="w-full mt-1 px-3 py-2 border border-[#b7c8b1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01386F]"
                    placeholder="Crie uma senha"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 px-8 py-3 rounded-lg bg-[#01386F] text-white font-akzidens font-bold shadow hover:bg-[#012a52] transition-all text-lg mx-auto"
              >
                Finalizar Agendamento
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
