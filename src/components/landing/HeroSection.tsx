"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigation } from "@/context/NavigationContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/ui/Header";
import HeroRightSection from "@/components/hero/HeroRightSection";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import ServicesHeroSection from "@/components/services/ServicesHeroSection";
import IntercambioSection from "@/components/services/IntercambioSection";
import ExpatriadosSection from "@/components/services/ExpatriadosSection";
import MissionVisionValues from "@/components/about/MissionVisionValues";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { currentSection } = useNavigation();

  const { t } = useLanguage();
  const { darkMode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-surface animate-pulse" />;
  }

  // Definindo o background baseado na seção
  const getBackground = () => {
    if (currentSection === "about") {
      return `linear-gradient(
        to bottom,
        #96bfd4 0%,          /* azul muito claro */
        #92bacf 15%,         /* azul bem claro */
        #8eb5cb 30%,         /* azul mais claro */
        #89b0c6 45%,         /* azul claro */
        #85acc1 60%,         /* azul médio-claro */
        #81a7bd 75%,         /* azul médio */
        rgba(122, 158, 179, 0.7) 75.1%, /* sombra azul escuro */
        rgba(129, 167, 189, 0.8) 75.2%, /* sombra azul médio */
        rgba(133, 172, 193, 0.9) 75.3%, /* sombra azul médio-claro */
        rgba(137, 176, 198, 0.95) 75.4%, /* sombra azul claro */
        #9e9470 75.5%,         /* início do chão */
        #b0a480 80%,         /* chão escuro */
        #c2b494 100%         /* chão ainda mais escuro */
      ), linear-gradient(
        to right,
        rgba(122, 158, 179, 0.6) 0%,   /* sombra azul escuro na esquerda */
        rgba(129, 167, 189, 0.4) 30%,  /* sombra azul médio */
        rgba(133, 172, 193, 0.2) 60%,  /* sombra azul médio-claro */
        rgba(137, 176, 198, 0) 100%    /* transparente na direita */
      ), linear-gradient(
        to bottom left,
        transparent 0%,
        transparent 70%,
        rgba(0,0,0,0.1) 80%,
        rgba(0,0,0,0.2) 90%,
        rgba(0,0,0,0.3) 100%
      )`;
    }
    return `linear-gradient(
      to bottom,
      #96b6a3 0%,          /* verde muito claro */
      #99b8a7 15%,         /* verde bem claro */
      #9ab9a8 30%,         /* verde mais claro */
      #9fbcab 45%,         /* verde claro */
      #9cbba9 60%,         /* verde médio-claro */
      #8cae99 75%,         /* verde médio */
      rgba(131, 166, 145, 1.5) 75.1%, /* sombra verde escuro */
      rgba(0, 0, 0, 0.35) 75.2%, /* sombra verde escuro */
      #9e9470 75.3%,         /* início do chão */
      #b0a480 80%,         /* chão escuro */
      #c2b494 100%         /* chão ainda mais escuro */
    ), linear-gradient(
      to right,
      rgba(131, 166, 145, 0.7) 0%,   /* sombra verde escuro na esquerda */
      rgba(140, 174, 153, 0.5) 30%,  /* sombra verde médio */
      rgba(156, 187, 169, 0.3) 60%,  /* sombra verde médio-claro */
      rgba(159, 188, 171, 0) 100%    /* transparente na direita */
    ), linear-gradient(
      to bottom left,
      transparent 0%,
      transparent 70%,
      rgba(0,0,0,0.1) 80%,
      rgba(0,0,0,0.2) 90%,
      rgba(0,0,0,0.3) 100%
    )`;
  };

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col transition-colors duration-300 overflow-visible w-full"
        style={{
          background: getBackground(),
        }}
      >
        <Header />
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center relative">
          {/* Imagem da mulher - POSICIONAMENTO ORIGINAL mas com overflow */}
          <motion.div
            className="flex items-center justify-center relative z-30 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/heroMulher.png"
              alt="Hero Mulher"
              width={500}
              height={80}
              className="object-contain w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[550px] pointer-events-none select-none translate-y-5 sm:translate-y-6 md:translate-y-8 lg:translate-y-10 xl:translate-y-12"
              priority
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              }}
            />
          </motion.div>

          {/* Conteúdo à direita - Alternando entre componentes */}
          {currentSection === "home" ? (
            <HeroRightSection />
          ) : currentSection === "about" ? (
            <AboutHeroSection />
          ) : currentSection === "services" ? (
            <ServicesHeroSection />
          ) : currentSection === "intercambio" ? (
            <IntercambioSection />
          ) : currentSection === "expatriados" ? (
            <ExpatriadosSection />
          ) : (
            <HeroRightSection />
          )}
        </div>
      </section>

      {/* Seção Mission Vision Values - apenas para about */}
      {currentSection === "about" && <MissionVisionValues />}
    </>
  );
}
