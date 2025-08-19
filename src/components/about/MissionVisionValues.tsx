"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MissionVisionValues() {
  const sections = [
    {
      title: "MISSÃO",
      icon: "/icones/alvo.svg",
      bgGradient:
        "linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #388e3c 100%)",
      description:
        "Proporcionar suporte psicanalítico de excelência a brasileiros no exterior, fortalecendo seu bem-estar e sua confiança para viver com plenitude.",
    },
    {
      title: "VISÃO",
      icon: "/icones/olho.svg",
      bgGradient:
        "linear-gradient(135deg, #4DD0E1 0%, #26c6da 50%, #00bcd4 100%)",
      description:
        "Ser referência internacional em psicanálise intercultural, reconhecida pela qualidade, ética e inovação no cuidado à saúde mental.",
    },
    {
      title: "VALORES",
      icon: "/icones/diamante.svg",
      bgGradient:
        "linear-gradient(135deg, #42A5F5 0%, #2196F3 50%, #1976D2 100%)",
      description:
        "Nosso maior valor é de auxiliá-los em uma jornada de transformação pessoal. Compromisso com o crescimento pessoal, para transformar sua jornada no exterior em uma oportunidade de autoconhecimento e fortalecimento emocional.",
    },
  ];

  return (
    <section
      className="py-10 px-4 relative overflow-hidden min-h-screen"
      style={{
        background: `linear-gradient(
            to bottom,
            #e4ded2 0%,
            #e4ded2 15%,
            #e4ded2 30%,
            #e4ded2 45%,
            #e4ded2 60%,
            #e4ded2 75%,
            #e4ded2 100%
          )`,
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Layout responsivo: mobile empilhado, desktop lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-full">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              {/* Ícone colorido no topo */}
              <div
                className="p-8 md:p-12 flex items-center justify-center rounded-t-2xl"
                style={{
                  background: section.bgGradient,
                }}
              >
                <Image
                  src={section.icon}
                  alt={section.title}
                  width={60}
                  height={60}
                  className="text-white"
                />
              </div>

              {/* Texto abaixo */}
              <div className="p-6 md:p-8 text-center bg-white h-full">
                <h3 className="text-[#0A4C8A] font-bold text-lg md:text-xl mb-4 uppercase tracking-wide">
                  {section.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-sm">
                  {section.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
