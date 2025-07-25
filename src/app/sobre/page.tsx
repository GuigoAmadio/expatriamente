"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/ui";
import FooterSection from "@/components/landing/FooterSection";
import FAQSection from "@/components/landing/FAQSection";
import { useEffect, useState } from "react";
import Image from "next/image";

const equipe = [
  {
    nome: "Dra. Ana Souza",
    cargo: "Psicanalista Fundadora",
    foto: "/funcionarios/Anita Careli - psicanalista Clínica.jpeg.jpg",
    descricao:
      "Especialista em atendimento a expatriados, 15 anos de experiência clínica.",
  },
  {
    nome: "Dr. Carlos Mathias",
    cargo: "Psicanalista Clínico",
    foto: "/funcionarios/Carlos Henrique Mathias - Psicanalista Clínico.jpeg.jpg",
    descricao: "Atendimento multicultural, foco em adaptação e identidade.",
  },
  {
    nome: "Dra. Gabriela Reis",
    cargo: "Psicanalista Associada",
    foto: "/funcionarios/Gabriela Reis - Psicanalista Clínica.jpeg.jpg",
    descricao:
      "Experiência internacional, apoio a brasileiros em diversos países.",
  },
];

export default function SobrePage() {
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
          Sobre Nós
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-[#6B3F1D] mb-10 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Somos uma equipe dedicada a oferecer cuidado emocional e psicanálise
          online para brasileiros no exterior. Nossa missão é acolher, orientar
          e fortalecer quem vive o desafio de estar longe do seu país,
          promovendo saúde mental e bem-estar.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <h3 className="font-akzidens text-2xl text-[#01386F] mb-2 font-bold">
              Missão
            </h3>
            <p className="text-[#6B3F1D] text-base font-medium">
              Oferecer suporte emocional de excelência, promovendo saúde mental
              e adaptação cultural para brasileiros expatriados.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          >
            <h3 className="font-akzidens text-2xl text-[#01386F] mb-2 font-bold">
              Valores
            </h3>
            <p className="text-[#6B3F1D] text-base font-medium">
              Empatia, ética, acolhimento, confidencialidade e respeito à
              diversidade cultural.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <h3 className="font-akzidens text-2xl text-[#01386F] mb-2 font-bold">
              Visão
            </h3>
            <p className="text-[#6B3F1D] text-base font-medium">
              Ser referência mundial em psicanálise para brasileiros no
              exterior, inovando no cuidado emocional à distância.
            </p>
          </motion.div>
        </motion.div>
        <motion.h2
          className="font-akzidens text-3xl md:text-4xl font-bold text-[#01386F] mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Nossa Equipe
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mb-16">
          {equipe.map((prof, idx) => (
            <motion.div
              key={prof.nome}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15 + 0.3,
                ease: "easeOut",
              }}
            >
              <div className="mb-4">
                <Image
                  src={prof.foto}
                  alt={prof.nome}
                  width={100}
                  height={100}
                  className="rounded-full object-cover border-4 border-[#01386F]/20"
                />
              </div>
              <h3 className="font-akzidens text-xl text-[#01386F] mb-1 font-bold">
                {prof.nome}
              </h3>
              <span className="text-[#6B3F1D] text-base font-semibold mb-1">
                {prof.cargo}
              </span>
              <p className="text-[#6B3F1D] text-sm font-medium">
                {prof.descricao}
              </p>
            </motion.div>
          ))}
        </div>
        <FAQSection />
      </main>
      <FooterSection />
    </>
  );
}
