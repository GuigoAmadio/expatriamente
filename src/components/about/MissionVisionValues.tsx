"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MissionVisionValues() {
  const sections = [
    {
      title: "MISSÃO",
      icon: "/icones/alvo.svg",
      bgGradient:
        "linear-gradient(135deg, #587861 0%, #5b7470 50%, #4a6b55 100%)",
      description:
        "Proporcionar suporte psicanalítico de excelência a brasileiros no exterior, fortalecendo seu bem-estar e sua confiança para viver com plenitude.",
    },
    {
      title: "VISÃO",
      icon: "/icones/olho.svg",
      bgGradient:
        "linear-gradient(135deg, #81a7bd 0%, #77b2de 50%, #6ba8d9 100%)",
      description:
        "Ser referência internacional em psicanálise intercultural, reconhecida pela qualidade, ética e inovação no cuidado à saúde mental.",
    },
    {
      title: "VALORES",
      icon: "/icones/diamante.svg",
      bgGradient:
        "linear-gradient(135deg, #987b6b 0%, #a68b7b 50%, #8c7060 100%)",
      description:
        "Nosso maior valor é de auxiliá-los em uma jornada de transformação pessoal. Compromisso com o crescimento pessoal, para transformar sua jornada no exterior em uma oportunidade de autoconhecimento e fortalecimento emocional.",
    },
  ];

  return (
    <section
      className="py-10 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(
            to bottom,
            #ccb8a6 0%,
            #ccb8a6 35%,
            #ccb8a6 70%,
            #ccb8a6 100%
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
              <div className="p-6 md:p-8 text-center bg-white/95 backdrop-blur-sm h-full rounded-b-2xl shadow-lg">
                <h3 className="text-[#5b7470] font-bold text-lg md:text-xl mb-4 uppercase tracking-wide">
                  {section.title}
                </h3>
                <p className="text-[#6B3F1D] leading-relaxed text-sm md:text-sm">
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
