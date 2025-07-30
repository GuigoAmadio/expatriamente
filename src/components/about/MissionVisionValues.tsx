"use client";

import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaGem } from "react-icons/fa";

export default function MissionVisionValues() {
  const sections = [
    {
      title: "MISSÃO",
      icon: FaBullseye,
      bgColor: "bg-[#4CAF50]",
      description:
        "Proporcionar suporte psicanalítico de excelência a brasileiros no exterior, fortalecendo seu bem-estar e sua confiança para viver com plenitude.",
    },
    {
      title: "VISÃO",
      icon: FaEye,
      bgColor: "bg-gradient-to-r from-[#4DD0E1] to-[#2196F3]",
      description:
        "Ser referência internacional em psicanálise intercultural, reconhecida pela qualidade, ética e inovação no cuidado à saúde mental.",
    },
    {
      title: "VALORES",
      icon: FaGem,
      bgColor: "bg-[#42A5F5]",
      description:
        "Nosso maior valor é de auxiliá-los em uma jornada de transformação pessoal. Compromisso com o crescimento pessoal, para transformar sua jornada no exterior em uma oportunidade de autoconhecimento e desenvolvimento.",
    },
  ];

  return (
    <section
      className="py-28 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(
            to bottom,
            #c2b494 0%,
            #a89d7a 15%,
            #b7ac87 30%,
            #c6bb94 45%,
            #d5caa1 60%,
            #e4d9ae 75%,
            #e8dcc0 100%
          )`,
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Header com ícone - igual à foto */}
              <div
                className={`${section.bgColor} p-6 flex items-center justify-center`}
              >
                <section.icon className="w-8 h-8 text-white" />
              </div>

              {/* Conteúdo - igual à foto */}
              <div className="p-6">
                <h3 className="text-[#0A4C8A] font-bold text-xl mb-4 uppercase tracking-wide">
                  {section.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
