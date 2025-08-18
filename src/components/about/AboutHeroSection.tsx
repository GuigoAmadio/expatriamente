"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHeroSection() {
  const features = [
    {
      icon: "/icones/cerebro.svg",
      title: "+20",
      description:
        "Corpo clínico com\n mais de 20\n psicanalistas\n experientes e\n especializados em dinâmica\n intercultural",
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-pink-400",
      textColor: "text-white",
    },
    {
      icon: "/icones/sinal.svg",
      title: "ONLINE",
      description:
        "Atendimento\n online e\n personalizado,\n ajustado a\n diferentes fusos\n e horários",
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-pink-600",
      textColor: "text-white",
    },
    {
      icon: "/icones/mao.svg",
      title: "ACOLHIMENTO",
      description:
        "Abordagem que\n integra história de\n vida, traços\n culturais e o\n contexto do país\n de acolhimento",
      bgColor: "bg-[#2196F3]",
      titleColor: "text-amber-500",
      textColor: "text-white",
    },
    {
      icon: "/icones/lampada.svg",
      title: "CFPC",
      description: `Supervisão e respaldo técnico\n do CFPC - Centro\n de Formação em\n Psicanálise Clínica`,
      bgColor: "bg-white",
      titleColor: "text-purple-800",
      textColor: "text-purple-700",
    },
  ];

  return (
    <div className="w-full md:max-w-[60%] md:mr-12 pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col items-center md:items-end z-20 px-4">
      {/* Card informativo azul inicial */}
      <motion.div
        className="bg-[#0A4C8A] rounded-4xl p-6 mb-10 shadow-lg z-50 w-full flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <p className="text-white text-[2.5vw] sm:text-[1.3vw] italic leading-relaxed font-body">
          Somos uma <span className="font-bold">Clínica de Psicanálise</span>,
          dedicada exclusivamente ao{" "}
          <span className="font-bold">
            cuidado <br className="hidden md:block" /> emocional de brasileiros
            que vivem no exterior
          </span>
          . Nosso objetivo é <br className="hidden md:block" /> oferecer um
          espaço acolhedor, seguro e culturalmente sensível, onde você{" "}
          <br className="hidden md:block" /> e sua família possam se adaptar
          física e emocionalmente à nova realidade.
        </p>
      </motion.div>

      {/* Espaço para a imagem no mobile: card único -> imagem -> grid de 4 */}
      <div className="block md:hidden h-[320px]" aria-hidden="true" />

      {/* 4 Feature Cards - Layout responsivo melhorado com altura uniforme e topo alinhado */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-20 mb-16 w-full place-items-stretch items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="flex flex-col items-center text-center h-full gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.5 + index * 0.1,
            }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            {/* Container do ícone com altura fixa para alinhamento */}
            <div className="h-[80px] md:h-[8vw] flex items-center justify-center font-body">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={0}
                height={0}
                className="w-[60px] h-[60px] md:w-[7vw] md:h-[7vw]"
              />
            </div>

            {/* Card com altura uniforme e layout flexível */}
            <div
              className={`${feature.bgColor} text-center rounded-4xl p-4 shadow-lg max-w-40 md:max-w-44 h-full flex flex-col justify-between gap-4`}
            >
              <div className="flex-1 flex flex-col justify-start">
                {feature.title === "CFPC" ? (
                  <div className="mb-2 flex items-center justify-center"></div>
                ) : (
                  <h3
                    className={`font-normal text-center mb-2 ${
                      feature.title === "+20"
                        ? "m-0 p-0 text-7xl md:text-[6vw] font-condensed font-normal"
                        : feature.title === "ACOLHIMENTO"
                        ? "pt-6 text-[30px] md:text-[2.2vw] font-condensed"
                        : "pt-3 text-[60px] md:text-[4.2vw] font-condensed"
                    } ${feature.titleColor}`}
                  >
                    {feature.title}
                  </h3>
                )}
              </div>
              <p
                className={`text-xs italic font-lg font-body sm:text-[1.2vw] whitespace-pre-line flex-1 flex items-center justify-center ${
                  feature.title === "CFPC" ? "text-center" : "text-start"
                } ${feature.textColor || "text-white"}`}
              >
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Card informativo azul adicional mais abaixo */}
      <motion.div
        className="bg-[#0A4C8A] rounded-xl p-4 shadow-lg shadow-blue-300 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      >
        <h2 className="text-white text-base sm:text-lg font-bold mb-2">
          Encontro inicial
        </h2>
        <p className="text-white text-xs sm:text-base leading-relaxed">
          -Primeira conversa para mapear expectativas,
          <br /> histórico emocional e seus desafios atuais (gratuito).
        </p>
      </motion.div>
    </div>
  );
}
