"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function IntercambioSection() {
  const stats = [
    {
      number: "57%",
      description: "dos intercambistas\n relatam sofrimento\n emocional",
      color: "text-[#ffffff]",
      bgColor: "bg-[#7A9B8C]",
    },
    {
      number: "DOBRO",
      description: "Duas vezes mais\n risco de ansiedade\n severa e depressão",
      color: "text-[#ffffff]",
      bgColor: "bg-[#A6C0B3]",
    },
    {
      number: "VULNERÁVEL",
      description:
        "Isolamento social,\n barreiras linguísticas\n e choque cultural\n aumentam a\n vulnerabilidade",
      color: "text-[#ffffff]",
      bgColor: "bg-[#6B8E7F]",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center md:items-end bg-[#e4ded2]">
      <div className="lg:mr-20 pt-10 md:pt-12 pb-10 flex flex-col justify-center items-center z-20 px-4 w-full max-w-full md:max-w-[60%]">
        {/* Título Principal */}
        <motion.div
          className="text-start mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[#6B8E7F] text-lg sm:text-3xl md:text-[2.3vw] mb-4 md:mb-6 px-4 md:text-nowrap">
            <span className="text-[#6B8E7F]">Programa de </span>
            <span className="font-bold">Bem estar Emocional </span>
            <span className="text-[#7A9B8C]">
              para <br className="hidden md:inline" />
            </span>
            <span className="font-bold">Estudantes de </span>
            <span className="text-[#7A9B8C]">Intercâmbio</span>
          </h1>

          <p className="text-[#7A6B5D] text-sm sm:text-lg md:text-[1.5vw] px-4 md:text-nowrap font-medium">
            Investir no bem-estar emocional{" "}
            <span className="font-bold">não é custo,</span> é{" "}
            <span className="font-bold">
              diferencial:
              <br />
            </span>
            aumenta retenção, satisfação e fortalece sua reputação
            internacional.
          </p>
          {/* Espaço reservado para a imagem no mobile, garantindo a ordem visual: Título, Subtítulo, Mulher, Cards */}
          <div className="block md:hidden h-[320px]" aria-hidden="true" />
        </motion.div>

        {/* Cards de Estatísticas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10 font-condensed w-full px-4 place-items-stretch items-start max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center justify-start max-w-xs md:max-w-sm ${stat.bgColor} rounded-xl md:rounded-2xl px-3 py-3  shadow-md hover:shadow-lg transition-all duration-300 h-full`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
            >
              <div className="text-center flex flex-col items-center justify-start gap-2 md:gap-1 p-1 md:p-2 h-full w-full">
                <h3
                  className={`${
                    stat.number.toLowerCase().includes("vulnerável")
                      ? "text-lg sm:text-xl md:text-2xl pt-1"
                      : "text-2xl sm:text-3xl md:text-4xl"
                  } mb-1 md:mb-2 ${stat.color} font-bold`}
                >
                  {stat.number}
                </h3>
                <p className="text-center font-body text-white text-xs sm:text-sm md:text-base italic md:whitespace-pre-line flex-1 flex items-center justify-center leading-tight">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Seção do Programa - Desktop (>=1000px) */}
        <motion.div
          className="hidden md:block w-full max-w-6xl px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-[#6B8E7F] text-xl font-bold text-start mb-4 text-nowrap">
            Programa Expatriamente para estudantes de intercâmbio:
          </h2>

          <div className="">
            <motion.div
              className="text-[#7A6B5D] text-base md:text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="font-bold">1 - Pré-Intercâmbio:</span> Preparação
              Proativa
            </motion.div>

            <motion.div
              className="text-[#7A6B5D] text-base md:text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <span className="font-bold">2 - Durante o Intercâmbio:</span>{" "}
              Acompanhamento Contínuo
            </motion.div>

            <motion.div
              className="text-[#7A6B5D] text-base md:text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <span className="font-bold">3 - Pós-Intercâmbio:</span>{" "}
              Reintegração Saudável
            </motion.div>
            <motion.div
              className="text-neutral-700 text-[10px] italic text-nowrap mt-8 font-body"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <span className="font-bold not-italic text-black">Fontes: </span>
              Association of International Educators (NAFSA), ²relatório 2023 do
              Journal of American College Health, ³American Psychological
              Association, 2022
            </motion.div>
            <motion.div
              className="absolute -bottom-6 w-full right-0 flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4 sm:gap-10 mt-10 font-body pr-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="px-4 py-2 font-bold text-[#6B8E7F] text-xl rounded-full bg-white underline">
                contato@expatriamente.com
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xl">
                <FaWhatsapp
                  className="text-white bg-green-500 rounded-full p-1"
                  size={24}
                  aria-label="WhatsApp"
                />
                <p className="text-[#6B8E7F] font-bold text-nowrap">
                  +55 11 98221.0290
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Seção do Programa - Mobile (<1000px) */}
      <motion.div
        className="w-full max-w-6xl px-4 md:hidden pl-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-[#6B8E7F] text-[3.5vw] font-bold text-start mb-4">
          Programa Expatriamente para estudantes de intercâmbio:
        </h2>

        <div className="">
          <motion.div
            className="text-[#7A6B5D] text-[2.5vw] sm:text-[2vw]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="font-bold">1 - Pré-Intercâmbio:</span> Preparação
            Proativa
          </motion.div>

          <motion.div
            className="text-[#7A6B5D] text-[2.5vw] sm:text-[2vw]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <span className="font-bold">2 - Durante o Intercâmbio:</span>{" "}
            Acompanhamento Contínuo
          </motion.div>

          <motion.div
            className="text-[#7A6B5D] text-[2.5vw] sm:text-[2vw]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <span className="font-bold">3 - Pós-Intercâmbio:</span> Reintegração
            Saudável
          </motion.div>
          <motion.div
            className="text-neutral-700 max-w-5/6 md:max-w-none text-[2vw] italic md:text-nowrap mt-8 font-body"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <span className="font-bold not-italic text-black">Fontes: </span>
            Association of International Educators (NAFSA), ²relatório 2023 do
            Journal of American College Health, ³American Psychological
            Association, 2022
          </motion.div>
          <motion.div
            className="w-full flex flex-col items-center justify-center gap-4 sm:gap-6 mt-8 font-body"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-base sm:text-lg">
              <FaWhatsapp
                className="text-white bg-green-500 rounded-full p-1"
                size={20}
                aria-label="WhatsApp"
              />
              <p className="text-[#6B8E7F] font-bold">+55 11 98221.0290</p>
            </div>
            <div className="px-4 py-2 font-bold text-[#6B8E7F] text-base sm:text-lg rounded-full bg-white underline">
              contato@expatriamente.com
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
