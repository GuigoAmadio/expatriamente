"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHeroSection() {
  const features = [
    {
      icon: "/icones/cerebro.svg",
      title: "+20",
      description:
        "Corpo clínico com mais de 20 psicanalistas experientes e especializados em dinâmica intercultural",
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-[#EC4899]",
    },
    {
      icon: "/icones/sinal.svg",
      title: "ONLINE",
      description:
        "Atendimento online e personalizado, ajustado a diferentes fusos e horários",
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-[#EC4899]",
    },
    {
      icon: "/icones/mao.svg",
      title: "ACOLHIMENTO",
      description:
        "Abordagem que integra história de vida, traços culturais e o contexto do país de acolhimento",
      bgColor: "bg-[#2196F3]",
      titleColor: "text-[#F97316]",
    },
    {
      icon: "/icones/lampada.svg",
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
    <div className="pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col justify-center items-center z-20 px-4 w-full md:w-1/2">
      {/* Card informativo azul inicial */}
      <motion.div
        className="bg-[#0A4C8A] rounded-xl p-6 mb-10 shadow-lg max-w-[900px] w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <p className="text-white text-sm sm:text-lg leading-relaxed">
          Somos uma <span className="font-bold">Clínica de Psicanálise</span>,
          dedicada exclusivamente ao{" "}
          <span className="font-bold">
            cuidado emocional de brasileiros que vivem no exterior
          </span>
          . Nosso objetivo é oferecer um espaço acolhedor, seguro e
          culturalmente sensível, onde você e sua família possam se adaptar
          física e emocionalmente à nova realidade.
        </p>
      </motion.div>

      {/* 4 Feature Cards - Layout responsivo melhorado */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.5 + index * 0.1,
            }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            {/* Ícone em cima do card */}
            <div className="mb-4 flex items-center justify-center">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={64}
                height={64}
                style={{
                  width: feature.title === "ONLINE" ? "64px" : "64px",
                  height: feature.title === "ONLINE" ? "64px" : "64px",
                }}
              />
            </div>

            {/* Card com altura fixa e width automático */}
            <div
              className={`${feature.bgColor} rounded-xl p-4 shadow-lg w-full h-full flex flex-col justify-start gap-4`}
            >
              <div>
                <h3
                  className={`font-bold mb-2 ${
                    feature.title === "+20"
                      ? "text-2xl sm:text-4xl lg:text-5xl"
                      : feature.title === "ACOLHIMENTO"
                      ? "text-lg sm:text-xl"
                      : "text-xl sm:text-2xl lg:text-3xl"
                  } ${feature.titleColor}`}
                >
                  {feature.title}
                </h3>
                {feature.subtitle && (
                  <p
                    className={`text-xs sm:text-sm mb-2 ${
                      feature.textColor || "text-white"
                    }`}
                  >
                    {feature.subtitle}
                  </p>
                )}
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  feature.textColor || "text-white"
                }`}
              >
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Card informativo azul adicional mais abaixo */}
      <motion.div
        className="bg-[#0A4C8A] rounded-xl p-6 shadow-lg max-w-[900px] w-full mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      >
        <h2 className="text-white text-lg sm:text-2xl font-bold mb-4">
          Encontro inicial
        </h2>
        <p className="text-white text-sm sm:text-lg leading-relaxed">
          -Primeira conversa para mapear expectativas, histórico emocional e
          seus desafios atuais (gratuito).
        </p>
      </motion.div>
    </div>
  );
}
