"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
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
    <section className="hero-section relative min-h-[calc(100vh-110px)] flex flex-col lg:flex-row items-center justify-center transition-colors duration-300 overflow-hidden w-full">
      {/* Imagem da mulher sem fundo */}
      <motion.div
        className="flex-1 flex items-center justify-center relative z-20 px-4 sm:px-8 lg:px-12 xl:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/heroMulher.png"
          alt="Hero Mulher"
          width={400}
          height={600}
          className="object-contain w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] max-h-[250px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px] xl:max-h-[450px] pointer-events-none select-none"
          priority
        />
      </motion.div>

      {/* Conteúdo à direita */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-start px-4 sm:px-8 lg:px-12 xl:px-16 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-xl text-left flex flex-col justify-center">
          <motion.h1
            className="font-akzidens text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-3 sm:mb-4 md:mb-6 lg:mb-8 font-semibold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
            className="text-blue-900 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Encontre acolhimento e compreensão em sua jornada como expatriado.
            Sessões de psicanálise online com profissionais que entendem sua
            realidade.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-start sm:justify-center w-full items-stretch sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.a
              href="#"
              className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 rounded-lg bg-[#01386F] text-white font-akzidens font-bold shadow-lg hover:scale-105 hover:bg-[#012a52] focus:ring-4 focus:ring-[#01386F]/30 transition-all duration-200 outline-none border-none text-center text-sm sm:text-base md:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Consulta
            </motion.a>
            <motion.a
              href="#"
              className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 rounded-lg bg-white text-[#01386F] font-akzidens font-bold border-2 border-[#01386F] shadow-lg hover:scale-105 hover:bg-[#f3f7fa] focus:ring-4 focus:ring-[#01386F]/20 transition-all duration-200 outline-none text-center text-sm sm:text-base md:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conhecer Psicanalistas
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
