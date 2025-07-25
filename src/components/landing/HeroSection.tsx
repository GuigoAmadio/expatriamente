"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/ui";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  // Todos os hooks devem ser chamados no topo da função
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Aguarda a hidratação antes de renderizar o conteúdo completo
  if (!mounted) {
    return <div className="min-h-screen bg-surface animate-pulse" />;
  }

  return (
    <>
      <Header />
      <section className="relative h-screen flex items-center transition-colors duration-300 overflow-hidden">
        {/* Fundo contínuo */}
        {/* Imagem da mulher sem fundo */}
        <motion.div
          className="flex-1 flex items-center justify-center relative z-20 h-full"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/heroMulher.png"
            alt="Hero Mulher"
            width={400}
            height={600}
            className="object-contain max-w-[400px] max-h-[600px] pointer-events-none select-none"
            priority
          />
        </motion.div>
        {/* Conteúdo à direita */}
        <motion.div
          className="flex-1 flex flex-col justify-start items-start pr-8 md:pr-16 z-20 h-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <div className="max-w-xl text-left flex flex-col justify-start pt-20 h-full">
            <motion.h1
              className="font-akzidens text-5xl leading-tight mb-8 font-semibold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <span className="text-cyan-500">CUIDADO </span>
              <span className="text-[#01386F]">EMOCIONAL</span>
              <br />
              <span className="text-cyan-500">PARA </span>
              <span className="text-cyan-500">BRASILEIROS</span>
              <br />
              <span className="text-[#01386F]">NO EXTERIOR</span>
            </motion.h1>
            <motion.p
              className="text-blue-900 text-lg md:text-2xl font-normal mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
            >
              Encontre acolhimento e compreensão em sua jornada como expatriado.
              Sessões de psicanálise online com profissionais que entendem sua
              realidade.
            </motion.p>
            <motion.div
              className="flex flex-row gap-6 justify-center w-full items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            >
              <motion.a
                href="#"
                className="px-5 py-4 rounded-lg bg-[#01386F] text-white font-akzidens font-bold shadow-lg hover:scale-105 hover:bg-[#012a52] focus:ring-4 focus:ring-[#01386F]/30 transition-all duration-200 outline-none border-none min-w-[220px] text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Agendar Consulta
              </motion.a>
              <motion.a
                href="#"
                className="px-5 py-4 rounded-lg bg-white text-[#01386F] font-akzidens font-bold border-2 border-[#01386F] shadow-lg hover:scale-105 hover:bg-[#f3f7fa] focus:ring-4 focus:ring-[#01386F]/20 transition-all duration-200 outline-none text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conhecer Psicanalistas
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
