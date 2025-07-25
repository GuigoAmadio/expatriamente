"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/ui";
import FooterSection from "@/components/landing/FooterSection";
import { useEffect, useState } from "react";
import { FaUserMd, FaComments, FaBrain, FaGlobeAmericas } from "react-icons/fa";

const services = [
  {
    icon: <FaUserMd size={36} className="text-[#01386F]" />,
    title: "Atendimento Psicanalítico",
    description:
      "Sessões online com psicanalistas experientes, focadas nas demandas de brasileiros expatriados.",
  },
  {
    icon: <FaComments size={36} className="text-[#01386F]" />,
    title: "Acolhimento Cultural",
    description:
      "Apoio emocional para adaptação em novos países, enfrentando desafios culturais e de identidade.",
  },
  {
    icon: <FaBrain size={36} className="text-[#01386F]" />,
    title: "Desenvolvimento Pessoal",
    description:
      "Trabalho terapêutico para autoconhecimento, autoestima e superação de dificuldades emocionais.",
  },
  {
    icon: <FaGlobeAmericas size={36} className="text-[#01386F]" />,
    title: "Atendimento em Diversos Fusos",
    description:
      "Flexibilidade de horários para brasileiros em qualquer parte do mundo, respeitando seu fuso horário.",
  },
];

export default function ServicosPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f5f6f3] flex flex-col items-center pt-12 pb-24 px-4">
        <motion.h1
          className="font-akzidens text-4xl md:text-5xl font-bold text-[#01386F] mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Nossos Serviços
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-[#6B3F1D] mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Oferecemos atendimento psicanalítico online, acolhendo brasileiros em
          qualquer lugar do mundo. Conheça nossos principais serviços e encontre
          o suporte ideal para sua jornada.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15 + 0.3,
                ease: "easeOut",
              }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="font-akzidens text-2xl text-[#01386F] mb-2 font-bold">
                {service.title}
              </h3>
              <p className="text-[#6B3F1D] text-base font-medium">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
