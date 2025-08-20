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
        #81a7bd 79.5%,         /* azul médio */
        #d9cdbf 80%,         /* transição para bege (mesmo inicio do bloco abaixo) */
        #ccb8a6 100%         /* bege do próximo bloco */
      )`;
    }
    return `linear-gradient(
      to bottom,
      #9ca995 0%,          /* verde acinzentado claro */
      #9ca995 15%,         /* verde acinzentado claro */
      #9ca995 30%,         /* verde acinzentado claro */
      #9ca995 45%,         /* verde acinzentado claro */
      #9ca995 60%,         /* verde acinzentado claro */
      #9ca995 75%,         /* verde acinzentado claro */
      #9ca995 85%,         /* verde acinzentado claro */
      #9ca995 90%,         /* verde acinzentado claro */
      #9ca995 95%,         /* verde acinzentado claro - mantém uniforme */
      #e4ded2 98%,         /* transição suave para bege mais claro */
      #e4ded2 100%         /* bege mais claro uniforme no final */
    ), linear-gradient(
      to right,
      rgba(156, 169, 149, 0.7) 0%,   /* sombra verde acinzentado na esquerda */
      rgba(156, 169, 149, 0.5) 30%,  /* sombra verde acinzentado médio */
      rgba(156, 169, 149, 0.3) 60%,  /* sombra verde acinzentado claro */
      rgba(156, 169, 149, 0) 100%    /* transparente na direita */
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
        <Header
          backgroundColor={
            currentSection === "intercambio" ? "#ded1c0" : undefined
          }
          textColor={currentSection === "intercambio" ? "#587861" : undefined}
        />
        <div className="relative flex items-start justify-end">
          {/* Imagem da mulher - POSICIONAMENTO ORIGINAL mas com overflow */}

          <Image
            src="/heroMulher.png"
            alt="Hero Mulher"
            width={500}
            height={80}
            className="absolute left-[118px] md:left-20 drop-shadow-2xl z-10 top-48 md:top-0 object-contain w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[550px] pointer-events-none select-none translate-y-5 sm:translate-y-6 md:translate-y-8 lg:translate-y-10 xl:translate-y-12"
            priority
          />

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
