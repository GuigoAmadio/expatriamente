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
      <section className="relative h-screen flex items-center transition-colors duration-300 bg-[#b7c8b1] overflow-hidden">
        {/* Fundo contínuo */}
        <div className="absolute inset-0 w-full h-full bg-[#9EB7AA] z-0" />
        {/* Gradiente para próxima seção */}
        <div
          className="absolute left-0 bottom-0 w-full h-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #9EB7AA 0%, #d6cfae 100%)",
          }}
        />
        {/* Imagem da mulher sem fundo */}
        <div className="flex-1 flex items-center justify-start relative z-20 h-full">
          <Image
            src="/heroMulher.png"
            alt="Hero Mulher"
            width={900}
            height={1200}
            className="object-contain object-left-bottom w-full h-full pointer-events-none select-none"
            priority
          />
        </div>
        {/* Conteúdo à direita */}
        <div className="flex-1 flex flex-col justify-start items-start pr-8 md:pr-16 z-20 h-full">
          <div className="max-w-xl text-left flex flex-col justify-start pt-20 h-full">
            <h1 className="font-akzidens text-5xl leading-tight mb-8 font-medium tracking-tight">
              <span className="text-white">CUIDADO </span>
              <span className="text-[#01386F]">EMOCIONAL</span>
              <br />
              <span className="text-white">PARA </span>
              <span className="text-[#01386F]">BRASILEIROS</span>
              <br />
              <span className="text-white">NO EXTERIOR</span>
            </h1>
            <p
              className="text-white text-lg md:text-2xl font-normal mb-12"
              style={{ textShadow: "2px 2px 8px #0008" }}
            >
              Encontre acolhimento e compreensão em sua jornada como expatriado.
              Sessões de psicanálise online com profissionais que entendem sua
              realidade.
            </p>
            <div className="flex flex-row gap-6 justify-center w-full items-center">
              <a
                href="#"
                className="px-5 py-4 rounded-lg bg-[#01386F] text-white font-akzidens font-bold shadow-lg hover:scale-105 hover:bg-[#012a52] focus:ring-4 focus:ring-[#01386F]/30 transition-all duration-200 outline-none border-none min-w-[220px] text-center"
              >
                Agendar Consulta
              </a>
              <a
                href="#"
                className="px-5 py-4 rounded-lg bg-white text-[#01386F] font-akzidens font-bold border-2 border-[#01386F] shadow-lg hover:scale-105 hover:bg-[#f3f7fa] focus:ring-4 focus:ring-[#01386F]/20 transition-all duration-200 outline-none text-center"
              >
                Conhecer Psicanalistas
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
