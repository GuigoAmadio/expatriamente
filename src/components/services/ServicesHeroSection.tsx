"use client";

import { motion } from "framer-motion";
import { useNavigation } from "@/context/NavigationContext";
import Image from "next/image";

export default function ServicesHeroSection() {
  const { setCurrentSection } = useNavigation();

  const services = [
    {
      title: "INTERCÂMBIO",
      icon: "/icones/intercambio.svg",
      description:
        "Programa de Bem-estar Emocional para Estudantes de Intercâmbio",
      color: "text-[#0A4C8A]",
      bgColor: "bg-[#0A4C8A]",
      onClick: () => setCurrentSection("intercambio"),
    },
    {
      title: "EXPATRIADOS",
      icon: "/icones/expatriados.svg",
      description: "Programa de Cuidados com Saúde Mental para Expatriados",
      color: "text-[#8B4513]",
      bgColor: "bg-[#8B4513]",
      onClick: () => setCurrentSection("expatriados"),
    },
  ];

  return (
    <div className="pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col justify-center items-center z-20 px-4 w-1/2">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center w-full max-w-4xl">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="flex flex-col items-center cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.3 + index * 0.2,
            }}
            whileHover={{ scale: 1.05 }}
            onClick={service.onClick}
          >
            {/* Título */}
            <motion.h2
              className={`text-2xl md:text-3xl font-bold mb-6 ${service.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            >
              {service.title}
            </motion.h2>

            {/* Ícone */}
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={service.icon}
                alt={service.title}
                fill
                className="object-contain filter brightness-0 group-hover:brightness-100 transition-all duration-300"
              />
            </motion.div>

            {/* Caixa de descrição */}
            <motion.div
              className={`${service.bgColor} rounded-xl p-4 shadow-lg max-w-[300px] text-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <p className="text-white text-sm md:text-base leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
