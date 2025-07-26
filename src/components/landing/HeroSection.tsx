"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/ui/Header";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  const { t } = useLanguage();
  const { darkMode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-surface animate-pulse" />;
  }

  return (
    <section className="relative min-h-screen flex flex-col transition-colors duration-300 overflow-visible w-full bg-gradient-to-br from-[#A6C0B3] to-[#85A899]">
      <Header />
      <div className="flex flex-col lg:flex-row items-start justify-center flex-1 relative">
        {/* Imagem da mulher - POSICIONAMENTO ORIGINAL mas com overflow */}
        <motion.div
          className="flex items-center justify-center relative z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/heroMulher.png"
            alt="Hero Mulher"
            width={500}
            height={700}
            className="object-contain w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[550px] pointer-events-none select-none"
            priority
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              transform: "translateY(120px)", // AUMENTADO para sobrepor naturalmente
            }}
          />
        </motion.div>

        {/* Conteúdo à direita */}
        <motion.div
          className="pt-28 flex flex-col justify-center items-center lg:items-start z-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
            <motion.h1
              className="font-akzidens text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-3 sm:mb-4 md:mb-6 lg:mb-8 font-medium tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-col items-start">
                <div className="flex justify-start gap-4 text-nowrap">
                  <span className="text-white font-extrabold">CUIDADO</span>
                  <span className="text-blue-900">EMOCIONAL</span>
                </div>
                <div className="flex justify-start gap-4 text-nowrap">
                  <span className="text-white">PARA </span>
                  <span className="text-blue-900">BRASILEIROS</span>
                </div>
                <div className="flex justify-start gap-4 text-nowrap">
                  <span className="text-white">NO </span>
                  <span className="text-white font-extrabold">EXTERIOR</span>
                </div>
              </div>
            </motion.h1>
            <motion.p
              className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 leading-relaxed text-center lg:text-left max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Encontre acolhimento e compreensão em sua jornada como expatriado.
              Sessões de psicanálise online com profissionais que entendem sua
              realidade.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center lg:justify-start w-full items-center lg:items-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.a
                href="#"
                className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 rounded-lg bg-blue-900 text-white font-akzidens font-bold shadow-lg hover:scale-105 hover:text-blue-900 hover:bg-gray-50 focus:ring-4 focus:ring-white/30 transition-all duration-400 outline-none border-none text-center text-sm sm:text-base md:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Agendar Consulta
              </motion.a>
              <motion.a
                href="#"
                className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 rounded-lg bg-white text-blue-900 font-akzidens font-bold border-2 border-white shadow-lg hover:scale-105 hover:bg-blue-900 hover:text-white focus:ring-4 focus:ring-white/20 transition-all duration-400 outline-none text-center text-sm sm:text-base md:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conhecer Psicanalistas
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
