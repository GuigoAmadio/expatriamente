"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaGlobe, FaUsers, FaChartLine } from "react-icons/fa";

export default function IntercambioSection() {
  const stats = [
    {
      number: "57%",
      description: "dos intercambistas relatam sofrimento emocional¹",
      color: "text-white",
      bgColor: "bg-[#0A4C8A]",
    },
    {
      number: "DOBRO",
      description: "Duas vezes mais risco de ansiedade severa e depressão²",
      color: "text-[#10B981]",
      bgColor: "bg-[#0A4C8A]",
    },
    {
      number: "VULNERÁVEL",
      description:
        "Isolamento social, barreiras linguísticas e choque cultural aumentam a vulnerabilidade³",
      color: "text-[#F59E0B]",
      bgColor: "bg-[#0A4C8A]",
    },
  ];

  const phases = [
    {
      number: "1",
      title: "Pré-Intercâmbio",
      subtitle: "Preparação Proativa",
      description:
        "Avaliação psicológica, preparação cultural e estratégias de adaptação",
    },
    {
      number: "2",
      title: "Durante o Intercâmbio",
      subtitle: "Acompanhamento Contínuo",
      description:
        "Suporte emocional, resolução de conflitos e desenvolvimento de resiliência",
    },
    {
      number: "3",
      title: "Pós-Intercâmbio",
      subtitle: "Reintegração Saudável",
      description:
        "Processamento da experiência, integração de aprendizados e planejamento futuro",
    },
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
          <span className="text-[#0A4C8A]">
            Programa de Bem-estar Emocional para{" "}
          </span>
          <span className="text-white">Estudantes de Intercâmbio</span>
        </h1>

        <p className="text-[#0A4C8A] text-base sm:text-lg md:text-xl max-w-4xl leading-relaxed px-4">
          Investir no bem-estar emocional não é custo, é diferencial: aumenta
          retenção, satisfação e fortalece sua reputação internacional.
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
                className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 ${stat.color}`}
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

      {/* Seção do Programa */}
      <motion.div
        className="w-full max-w-6xl px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-[#0A4C8A] text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
          Programa Expatriamente para estudantes de intercâmbio:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <div className="flex items-center mb-3 md:mb-4">
                <div className="bg-[#0A4C8A] text-white rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-sm md:text-xl font-bold mr-3 md:mr-4 flex-shrink-0">
                  {phase.number}
                </div>
                <div>
                  <h3 className="text-[#0A4C8A] text-sm md:text-lg font-bold text-nowrap">
                    {phase.title}
                  </h3>
                  <p className="text-[#0A4C8A] text-xs md:text-sm font-medium">
                    {phase.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-[#0A4C8A] text-xs md:text-sm leading-relaxed">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
