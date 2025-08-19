"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaUsers, FaChartLine, FaWhatsapp } from "react-icons/fa";

export default function ExpatriadosSection() {
  const stats = [
    {
      number: "25%",
      description:
        "dos expatriados\n brasileiros retornam\n precocemente por\n falta de suporte",
      color: "text-[#9dc9e2]",
      bgColor: "bg-[#ded1c0]",
    },
    {
      number: "45%",
      description: "apresentam estresse\n moderado a severo\n antes do retorno",
      color: "text-[#9dc9e2]",
      bgColor: "bg-[#e4ded2]",
    },
    {
      number: "30%",
      description: "Turnover de até\n 30% em 18 meses",
      color: "text-[#9dc9e2]",
      bgColor: "bg-[#ded1c0]",
    },
  ];

  const benefits = [
    "Redução de até 40% nos efeitos negativos do choque cultural reverso.",
    "Menos retornos prematuros e turnover, gerando economia em recrutamento.",
    "Colaboradores mais engajados, produtivos e preparados para desafios locais.",
  ];

  return (
    <div className="w-full flex flex-col items-center md:items-end">
      <div className="mr-0 xl:mr-20 pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col justify-center items-center z-20 px-4 w-full max-w-full md:max-w-[60%]">
        {/* Título Principal */}
        <motion.div
          className="text-start mb-4 md:mb-6 w-full font-body"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[#987b6b] text-lg sm:text-3xl md:text-[2.3vw] mb-4 md:mb-6 px-4 font-medium text-start md:text-nowrap">
            Programa de cuidados com{" "}
            <span className="text-[#c5b2a1] font-bold">
              Saúde Mental
              <br />
            </span>{" "}
            para <span className="text-[#c5b2a1] font-bold">Expatriados</span>
          </h1>

          <p className="text-[#987b6b] text-sm sm:text-lg md:text-[1.5vw] px-4 whitespace-normal font-medium text-start">
            Ofereça aos seus talentos um suporte completo antes, durante e
            <br className="hidden md:block" /> após a missão internacional,
            reduzindo custos, impactos com
            <br className="hidden md:block" />{" "}
            <span className="font-bold">familiares </span> e aumentando
            engajamento:
          </p>
          {/* Espaço reservado para a imagem no mobile, garantindo a ordem visual: Título, Subtítulo, Mulher, Cards */}
          <div className="block md:hidden h-[320px]" aria-hidden="true" />
        </motion.div>

        {/* Cards de Estatísticas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-10 mb-8 md:max-w-[53vw] md:mb-10 px-4 font-body"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`flex items-center md:items-start md:justify-center ${stat.bgColor} px-1 pt-4 rounded-2xl md:rounded-3xl shadow-lg pb-2 md:shadow-xl hover:shadow-2xl transition-all duration-300`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="text-center flex flex-row sm:flex-col items-center gap-4 md:gap-0 p-2 md:p-0 pt-3 sm:pt-5">
                <h3
                  className={`text-center text-3xl sm:text-4xl md:text-[4.5vw] font-bold ${stat.color}`}
                >
                  {stat.number}
                </h3>
                <p
                  className={`text-sm sm:text-base md:text-[1.2vw] md:whitespace-pre-line text-start text-[#987b6b] italic -mt-2 sm:mt-0${
                    stat.number === "30%" ? " md:mt-4" : ""
                  }`}
                >
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Seção de Benefícios Tangíveis (renderer >= 1000px aqui) */}
        <motion.div
          className="hidden md:block px-4 font-body w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-[#987b6b] text-[2.2vw] font-bold italic text-start mb-1">
            Benefícios Tangíveis:
          </h2>

          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <p className="text-[#987b6b] font-medium text-sm md:text-[1.4vw] text-nowrap  text-center md:text-start">
                - {benefit}
              </p>
            </motion.div>
          ))}
          <motion.div
            className="text-neutral-700 text-[0.8vw] italic text-nowrap mt-8 font-body"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <span className="font-bold not-italic text-black">Fontes: </span>
            Brookfield Global Relocation Services (2019), ²KPMG International
            (2018), Shaffer, Harrison & Gilley (2019), Pesquisa da Fundação Dom
            Cabral (2019).
          </motion.div>
          <motion.div
            className="absolute -bottom-6 w-full right-0 flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4 sm:gap-10 mt-10 font-body pr-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="px-4 py-2 font-bold text-[#987b6b] text-xl rounded-full bg-white underline text-center">
              contato@expatriamente.com
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xl">
              <FaWhatsapp
                className="text-green-500"
                size={24}
                aria-label="WhatsApp"
              />
              <p className="text-[#987b6b] font-bold">+55 11 98221.0290</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="px-4 font-body w-full pl-5 md:pl-20 md:hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-[#987b6b] text-lg min-[1000px]:text-[2.5vw] font-bold italic text-start mb-1">
          Benefícios Tangíveis:
        </h2>

        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex items-start mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
          >
            <p className="text-[#987b6b] font-medium text-[3vw] md:text-[2vw] md:text-start">
              - {benefit}
            </p>
          </motion.div>
        ))}
        <motion.div
          className="text-neutral-700 max-w-5/6 md:max-w-none text-[2vw] italic md:text-nowrap mt-8 font-body"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <span className="font-bold not-italic text-black">Fontes: </span>
          Brookfield Global Relocation Services (2019), ²KPMG International
          (2018), Shaffer, Harrison & Gilley (2019), Pesquisa da Fundação Dom
          Cabral (2019).
        </motion.div>
        <motion.div
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 font-body"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xl">
            <FaWhatsapp
              className="text-green-500"
              size={24}
              aria-label="WhatsApp"
            />
            <p className="text-[#987b6b] font-bold text-base sm:text-lg">
              +55 11 98221.0290
            </p>
          </div>
          <div className="px-4 py-2 font-bold text-[#987b6b] text-base sm:text-lg rounded-full bg-white underline text-center">
            contato@expatriamente.com
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
