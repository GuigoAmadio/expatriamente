"use client";

import { motion } from "framer-motion";

export default function IntercambioSection() {
  const stats = [
    {
      number: "57%",
      description: "dos intercambistas relatam sofrimento emocional¹",
      color: "text-cyan-300",
      bgColor: "bg-[#0A4C8A]",
    },
    {
      number: "DOBRO",
      description: "Duas vezes mais risco de ansiedade severa e depressão²",
      color: "text-lime-400",
      bgColor: "bg-[#0A4C8A]",
    },
    {
      number: "VULNERÁVEL",
      description:
        "Isolamento social, barreiras linguísticas e choque cultural aumentam a vulnerabilidade³",
      color: "text-yellow-300",
      bgColor: "bg-[#0A4C8A]",
    },
  ];

  return (
    <div className="pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col justify-center items-center z-20 px-4 w-full md:w-1/2">
      {/* Título Principal */}
      <motion.div
        className="text-start mb-8 md:mb-12 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4">
          <span className="text-[#0A4C8A]">Programa de </span>Bem-estar
          Emocional <span className="text-[#0A4C8A]">para </span>
          Estudantes de <span className="text-[#0A4C8A]">Intercâmbio</span>
        </h1>

        <p className="text-[#0A4C8A] text-base sm:text-lg md:text-xl max-w-4xl leading-relaxed px-4">
          Investir no bem-estar emocional{" "}
          <span className="font-bold">não é custo</span> , é{" "}
          <span className="font-bold">diferencial</span>: aumenta retenção,
          satisfação e fortalece sua reputação internacional.
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
                className={`${
                  stat.number.toLowerCase().includes("vulnerável")
                    ? "text-lg sm:text-2xl md:text-3xl"
                    : "text-2xl sm:text-3xl md:text-5xl"
                } font-bold mb-2 md:mb-3 ${stat.color}`}
              >
                {stat.number}
              </h3>
              <p className="text-white text-xs sm:text-base md:text-lg italic font-light">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Seção do Programa - Apenas texto */}
      <motion.div
        className="w-full max-w-6xl px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-[#0A4C8A] text-xl sm:text-2xl lg:text-3xl font-semibold text-start mb-4">
          Programa Expatriamente para estudantes de intercâmbio:
        </h2>

        <div className="space-y-2">
          <motion.div
            className="text-[#0A4C8A] text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="font-bold">1 - Pré-Intercâmbio:</span> Preparação
            Proativa
          </motion.div>

          <motion.div
            className="text-[#0A4C8A] text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <span className="font-bold">2 - Durante o Intercâmbio:</span>{" "}
            Acompanhamento Contínuo
          </motion.div>

          <motion.div
            className="text-[#0A4C8A] text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <span className="font-bold">3 - Pós-Intercâmbio:</span> Reintegração
            Saudável
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
