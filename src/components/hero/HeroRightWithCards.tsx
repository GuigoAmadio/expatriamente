"use client";

import { motion } from "framer-motion";
import {
  FaBrain,
  FaWifi,
  FaHandHoldingHeart,
  FaLightbulb,
} from "react-icons/fa";

export default function HeroRightWithCards() {
  const features = [
    {
      icon: FaBrain,
      title: "+20",
      description:
        "Corpo clínico com mais de 20 psicanalistas experientes e especializados em dinâmica intercultural",
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-[#EC4899]",
    },
    {
      icon: FaWifi,
      title: "ONLINE",
      description:
        "Atendimento online e personalizado, ajustado a diferentes fusos e horários",
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-[#EC4899]",
    },
    {
      icon: FaHandHoldingHeart,
      title: "ACOLHIMENTO",
      description:
        "Abordagem que integra história de vida, traços culturais e o contexto do país de acolhimento",
      bgColor: "bg-[#2196F3]",
      titleColor: "text-[#F97316]",
    },
    {
      icon: FaLightbulb,
      title: "CFPC",
      subtitle: "Centro de Formação em Psicanálise Clínica",
      description:
        "Supervisão e respaldo técnico do CFPC - Centro de Formação em Psicanálise Clínica",
      bgColor: "bg-white",
      titleColor: "text-[#8B5CF6]",
      textColor: "text-[#374151]",
    },
  ];

  return (
    <div className="pt-10 md:pt-12 xl:pt-0 pb-10 flex flex-col justify-center items-center lg:items-start z-20 px-4 w-2/3">
      <motion.h1
        className="font-akzidens text-[5vw] sm:text-[4vw] md:text-[3vw] leading-tight mb-[1vw] font-medium tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center md:items-start">
          <div className="flex justify-center md:justify-start gap-2 md:gap-4 text-nowrap">
            <span className="text-white font-extrabold">CUIDADO</span>
            <span className="text-blue-900">EMOCIONAL</span>
          </div>
          <div className="flex justify-center md:justify-start gap-2 md:gap-4 text-nowrap">
            <span className="text-white">PARA </span>
            <span className="text-blue-900">BRASILEIROS</span>
          </div>
          <div className="flex justify-center md:justify-start gap-2 md:gap-4 text-nowrap">
            <span className="text-white">NO </span>
            <span className="text-white font-extrabold">EXTERIOR</span>
          </div>
        </div>
      </motion.h1>
      <motion.p
        className="py-[2vw] text-white text-[2.8vw] sm:text-[1.8vw]  font-normal mb-[2vw] leading-relaxed text-center lg:text-left max-w-[80vw] sm:max-w-[50vw]"
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
          className="px-[3vw] py-[2.5vw] lg:px-[2vw] lg:py-[1vw] rounded-lg bg-blue-900 text-white font-akzidens font-bold shadow-lg hover:scale-105 hover:text-blue-900 hover:bg-gray-50 focus:ring-4 focus:ring-white/30 transition-all duration-400 outline-none border-none text-center text-[3.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.2vw]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Agendar Consulta
        </motion.a>
        <motion.a
          href="#"
          className="px-[3vw] py-[2.5vw] lg:px-[2vw] lg:py-[1vw] rounded-lg bg-white text-blue-900 font-akzidens font-bold border-2 border-white shadow-lg hover:scale-105 hover:bg-blue-900 hover:text-white focus:ring-4 focus:ring-white/20 transition-all duration-400 outline-none text-center text-[3.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.2vw]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Conhecer Psicanalistas
        </motion.a>
      </motion.div>
    </div>
  );
}
