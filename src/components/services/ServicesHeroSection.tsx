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
      color: "text-[#1a75ce]",
      bgColor: "bg-[#9dc9e2]",
      onClick: () => setCurrentSection("intercambio"),
    },
    {
      title: "EXPATRIADOS",
      icon: "/icones/expatriados.svg",
      color: "text-[#6B3F1D]",
      bgColor: "bg-[#ded1c0]",
      onClick: () => setCurrentSection("expatriados"),
    },
  ];

  return (
    <div className="w-full md:max-w-[60%] md:mr-12 pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col justify-center items-center md:items-end z-20 px-4">
      <div className="flex gap-8 xl:gap-24 items-center justify-center md:justify-end w-full max-w-6xl">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-all duration-300 w-full max-w-sm md:max-w-xs lg:max-w-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.3 + index * 0.2,
            }}
            onClick={service.onClick}
          >
            {/* Título */}
            <motion.h2
              className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold font-body mb-4 lg:mb-6 ${service.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            >
              {service.title}
            </motion.h2>

            {/* Ícone */}
            <motion.div
              className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 xl:w-40 xl:h-40 mb-4 lg:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={service.icon}
                alt={service.title}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Caixa de descrição */}
            <motion.div
              className={`${service.bgColor} rounded-xl px-3 py-4 lg:px-4 lg:py-5 shadow-lg font-body text-center w-full max-w-xs lg:max-w-sm`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {service.title === "INTERCÂMBIO" ? (
                <p className="text-white text-[8px] sm:text-xs xl:text-sm leading-relaxed text-center">
                  Programa de{" "}
                  <span className="font-semibold text-[#1a75ce]">
                    Bem-estar Emocional <br />
                  </span>{" "}
                  para{" "}
                  <span className="font-semibold text-[#1a75ce]">
                    Estudantes{" "}
                  </span>
                  de
                  <span className="font-semibold"> Intercâmbio</span>
                </p>
              ) : service.title === "EXPATRIADOS" ? (
                <p className="text-[#6B3F1D] text-[8px] sm:text-xs xl:text-sm leading-relaxed text-center">
                  Programa de <span className="font-semibold">Cuidados </span>
                  com <br />
                  <span className="font-semibold"> Saúde Mental</span> para{" "}
                  <span className="font-semibold">Expatriados</span>
                </p>
              ) : null}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
