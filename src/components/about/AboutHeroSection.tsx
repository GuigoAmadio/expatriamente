"use client";

import { motion } from "framer-motion";
import {
  FaBrain,
  FaWifi,
  FaHandHoldingHeart,
  FaLightbulb,
} from "react-icons/fa";

export default function AboutHeroSection() {
  const features = [
    {
      icon: FaBrain,
      title: "+20",
      description: (
        <>
          Corpo clínico com mais de{" "}
          <span className="font-bold text-pink-400">20 psicanalistas </span>
          experientes e especializados em dinâmica intercultural
        </>
      ),
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-[#EC4899]",
    },
    {
      icon: FaWifi,
      title: "ONLINE",
      description: (
        <>
          Atendimento <span className="font-bold text-blue-400">online</span> e
          personalizado, ajustado a diferentes{" "}
          <span className="font-bold text-blue-400">fusos e horários</span>
        </>
      ),
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-[#EC4899]",
    },
    {
      icon: FaHandHoldingHeart,
      title: "ACOLHIMENTO",
      description: (
        <>
          Abordagem que integra{" "}
          <span className="font-bold text-orange-400">história de vida</span>,{" "}
          <span className="font-bold text-orange-400">traços culturais</span> e
          o contexto do{" "}
          <span className="font-bold text-orange-400">país de acolhimento</span>
        </>
      ),
      bgColor: "bg-[#2196F3]",
      titleColor: "text-[#F97316]",
    },
    {
      icon: FaLightbulb,
      title: "CFPC",
      subtitle: "Centro de Formação em Psicanálise Clínica",
      description: (
        <>
          Supervisão e respaldo técnico do{" "}
          <span className="font-bold text-violet-500">CFPC</span> - Centro de
          Formação em Psicanálise Clínica
        </>
      ),
      bgColor: "bg-white",
      titleColor: "text-[#8B5CF6]",
      textColor: "text-[#374151]",
    },
  ];

  return (
    <div className="pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col justify-center items-center z-20 px-4 w-1/2">
      {/* Card informativo azul único */}
      <motion.div
        className="bg-[#0A4C8A] rounded-xl p-6 mb-10 shadow-lg max-w-[900px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <p className="text-white text-lg leading-relaxed">
          Somos uma <span className="font-bold">Clínica de Psicanálise</span>,
          dedicada exclusivamente ao{" "}
          <span className="font-bodl">
            cuidado emocional de brasileiros que vivem no exterior.
          </span>{" "}
          Nosso objetivo é oferecer um espaço acolhedor, seguro e culturalmente
          sensível, onde você e sua família possam se adaptar física e
          emocionalmente à nova realidade.
        </p>
      </motion.div>

      {/* 4 Feature Cards em linha horizontal */}
      <motion.div
        className="grid grid-cols-2 gap-4 place-items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={`${feature.bgColor} rounded-xl p-4 shadow-lg max-w-[400px]`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.5 + index * 0.1,
            }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="flex gap-4 items-center">
              <h3 className={`text-3xl font-bold mb-2 ${feature.titleColor}`}>
                {feature.title}
              </h3>
              <feature.icon className="w-8 h-8 text-black mb-3" />
            </div>

            <p
              className={`text-xs leading-relaxed ${
                feature.textColor || "text-white"
              }`}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
