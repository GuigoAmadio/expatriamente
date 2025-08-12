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
      color: "text-[#0A4C8A]",
      bgColor: "bg-[#0A4C8A]",
      onClick: () => setCurrentSection("intercambio"),
    },
    {
      title: "EXPATRIADOS",
      icon: "/icones/expatriados.svg",
      color: "text-[#8B4513]",
      bgColor: "bg-[#8B4513]",
      onClick: () => setCurrentSection("expatriados"),
    },
  ];

  return (
    <div className="mr-40 pt-10 md:pt-12 xl:pt-20 pb-10 flex flex-col justify-center items-center z-20 px-4 w-1/2">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center justify-center w-full max-w-4xl">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-all duration-300"
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
              className={`text-2xl font-bold font-body mb-6 ${service.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            >
              {service.title}
            </motion.h2>

            {/* Ícone */}
            <motion.div
              className="relative w-32 h-32 md:w-[17vw] md:h-[17vw] mb-6"
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
              className={`${service.bgColor} rounded-xl px-2 py-3 shadow-lg font-body text-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {service.title === "INTERCÂMBIO" ? (
                <p className="text-white text-sm md:text-base leading-relaxed text-nowrap text-center">
                  Programa de{" "}
                  <span className="font-semibold">
                    Bem-estar Emocional <br />
                  </span>{" "}
                  para <span className="font-semibold">Estudantes </span>
                  de
                  <span className="font-semibold"> Intercâmbio</span>
                </p>
              ) : service.title === "EXPATRIADOS" ? (
                <p className="text-white text-sm md:text-base leading-relaxed text-nowrap text-center">
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
