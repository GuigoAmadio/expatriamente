"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaUsers, FaChartLine } from "react-icons/fa";

export default function ExpatriadosSection() {
  const stats = [
    {
      number: "25%",
      description:
        "dos expatriados brasileiros retornam precocemente por falta de suporte¹",
      color: "text-[#3B82F6]",
      bgColor: "bg-[#8B4513]",
    },
    {
      number: "45%",
      description: "apresentam estresse moderado a severo antes do retorno¹",
      color: "text-[#3B82F6]",
      bgColor: "bg-[#8B4513]",
    },
    {
      number: "30%",
      description: "Turnover de até 30% em 18 meses²",
      color: "text-[#3B82F6]",
      bgColor: "bg-[#8B4513]",
    },
  ];

  const benefits = [
    "Redução de até 40% nos efeitos negativos do choque cultural reverso.",
    "Menos retornos prematuros e turnover, gerando economia em recrutamento.",
    "Colaboradores mais engajados, produtivos e preparados para desafios locais.",
  ];

  return (
    <div className="pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col justify-center items-center z-20 px-4 w-full md:w-2/3 lg:w-3/4 xl:w-2/3">
      {/* Título Principal */}
      <motion.div
        className="text-center mb-8 md:mb-12 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4">
          <span className="text-[#4A4A4A]">Programa de cuidados com </span>
          <span className="text-[#3B82F6]">Saúde Mental para Expatriado</span>
        </h1>

        <p className="text-[#4A4A4A] text-base sm:text-lg md:text-xl max-w-4xl leading-relaxed px-4">
          Ofereça aos seus talentos um suporte completo antes, durante e após a
          missão internacional, reduzindo custos, impactos com familiares e
          aumentando engajamento:
        </p>
      </motion.div>

      {/* Cards de Estatísticas */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 w-full max-w-6xl px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`${stat.bgColor} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="text-center">
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 ${stat.color}`}
              >
                {stat.number}
              </h3>
              <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Seção de Benefícios Tangíveis */}
      <motion.div
        className="w-full max-w-6xl px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-[#F97316] text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
          Benefícios Tangíveis
        </h2>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-white/20">
          <div className="space-y-3 md:space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="bg-[#F97316] rounded-full w-2 h-2 md:w-3 md:h-3 mt-2 md:mt-3 mr-3 md:mr-4 flex-shrink-0"></div>
                <p className="text-[#4A4A4A] text-sm md:text-base lg:text-lg leading-relaxed">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
