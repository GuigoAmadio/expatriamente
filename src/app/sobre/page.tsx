"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/ui";
import FooterSection from "@/components/landing/FooterSection";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiHeart,
  FiUsers,
  FiGlobe,
  FiAward,
  FiTarget,
  FiShield,
  FiStar,
} from "react-icons/fi";

const equipe = [
  {
    nome: "Dra. Anita Careli",
    cargo: "Psicanalista Fundadora",
    foto: "/funcionarios/Anita Careli - psicanalista Clínica.jpeg.jpg",
    descricao:
      "Especialista em atendimento a expatriados, 15 anos de experiência clínica.",
  },
  {
    nome: "Dr. Carlos Henrique Mathias",
    cargo: "Psicanalista Clínico",
    foto: "/funcionarios/Carlos Henrique Mathias - Psicanalista Clínico.jpeg.jpg",
    descricao: "Atendimento multicultural, foco em adaptação e identidade.",
  },
  {
    nome: "Dra. Gabriela Reis",
    cargo: "Psicanalista Associada",
    foto: "/funcionarios/Gabriela Reis - Psicanalista Clínica.jpeg.jpg",
    descricao:
      "Experiência internacional, apoio a brasileiros em diversos países.",
  },
];

export default function SobrePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-white">
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#f5f6f3] via-[#f9fbe7] to-[#deefff] flex flex-col items-center pt-20 pb-32 px-4 md:px-0">
        {/* Hero Section */}
        <motion.div
          className="w-full max-w-6xl text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-akzidens text-4xl md:text-5xl lg:text-6xl font-bold text-[#01386F] mb-6 drop-shadow-lg">
            Sobre Nós
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#1a3a4a] max-w-3xl mx-auto leading-relaxed">
            Uma clínica de psicanálise dedicada exclusivamente ao cuidado
            emocional de brasileiros que vivem no exterior.
          </p>
        </motion.div>

        {/* Seção 1: Nossa Essência */}
        <motion.section
          className="w-full max-w-6xl mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="font-akzidens text-3xl md:text-4xl font-bold text-[#01386F] mb-4">
              Nossa Essência
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#01386F] to-[#13a89e] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#01386F] mb-6 font-akzidens">
                  Cuidado Especializado para Brasileiros no Exterior
                </h3>
                <p className="text-lg md:text-xl text-[#1a3a4a] leading-relaxed mb-6">
                  Na{" "}
                  <span className="font-bold text-[#b86a1a]">
                    Expatriamente
                  </span>
                  , oferecemos um espaço acolhedor, seguro e culturalmente
                  sensível, onde você e sua família possam se adaptar física e
                  emocionalmente à nova realidade.
                </p>
                <p className="text-base md:text-lg text-[#1a3a4a] leading-relaxed">
                  Nossa abordagem única integra história de vida, traços
                  culturais e o contexto do país de acolhimento, proporcionando
                  um cuidado verdadeiramente personalizado.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 text-center border-2 border-[#01386F]">
                  <FiUsers className="text-3xl text-[#01386F] mx-auto mb-3" />
                  <h4 className="font-bold text-[#01386F] mb-2">
                    20+ Psicanalistas
                  </h4>
                  <p className="text-sm text-[#1a3a4a]">
                    Especializados em dinâmica intercultural
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 text-center border-2 border-[#13a89e]">
                  <FiGlobe className="text-3xl text-[#13a89e] mx-auto mb-3" />
                  <h4 className="font-bold text-[#01386F] mb-2">
                    Atendimento Global
                  </h4>
                  <p className="text-sm text-[#1a3a4a]">
                    Online e personalizado para diferentes fusos
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 text-center border-2 border-[#1a7f3a]">
                  <FiAward className="text-3xl text-[#1a7f3a] mx-auto mb-3" />
                  <h4 className="font-bold text-[#01386F] mb-2">
                    Respaldo CFPC
                  </h4>
                  <p className="text-sm text-[#1a3a4a]">
                    Supervisão técnica especializada
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 text-center border-2 border-[#b86a1a]">
                  <FiHeart className="text-3xl text-[#b86a1a] mx-auto mb-3" />
                  <h4 className="font-bold text-[#01386F] mb-2">
                    Cuidado Integral
                  </h4>
                  <p className="text-sm text-[#1a3a4a]">
                    História de vida e contexto cultural
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Seção 2: Nossa Abordagem */}
        <motion.section
          className="w-full max-w-6xl mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="font-akzidens text-3xl md:text-4xl font-bold text-[#01386F] mb-4">
              Nossa Abordagem
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#b86a1a] to-[#c26711] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 border-2 border-[#b86a1a]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#b86a1a] text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#b86a1a] font-akzidens">
                  Encontro Inicial
                </h3>
              </div>
              <p className="text-[#1a3a4a] text-lg leading-relaxed">
                Primeira conversa para mapear expectativas, histórico emocional
                e seus desafios atuais.
                <span className="font-semibold text-[#b86a1a]">
                  {" "}
                  Totalmente gratuito.
                </span>
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 border-2 border-[#c26711]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#c26711] text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#c26711] font-akzidens">
                  Planejamento Terapêutico
                </h3>
              </div>
              <p className="text-[#1a3a4a] text-lg leading-relaxed">
                Abordagem terapêutica personalizada voltada para o atendimento
                das diversas demandas oriundas de sua realidade pessoal e
                familiar.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Seção 3: Missão, Visão e Valores */}
        <motion.section
          className="w-full max-w-6xl mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="font-akzidens text-3xl md:text-4xl font-bold text-[#01386F] mb-4">
              Nossos Pilares
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#01386F] to-[#13a89e] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 text-center border-2 border-[#01386F] hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-[#01386F] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FiTarget className="text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#01386F] mb-4 font-akzidens">
                Missão
              </h3>
              <p className="text-[#1a3a4a] text-base md:text-lg leading-relaxed">
                Proporcionar suporte psicanalítico de excelência a brasileiros
                no exterior, fortalecendo seu bem-estar e sua confiança para
                viver com plenitude.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl shadow-xl p-8 text-center border-2 border-[#13a89e] hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-[#13a89e] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FiStar className="text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#13a89e] mb-4 font-akzidens">
                Visão
              </h3>
              <p className="text-[#1a3a4a] text-base md:text-lg leading-relaxed">
                Ser referência internacional em psicanálise intercultural,
                reconhecida pela qualidade, ética e inovação no cuidado à saúde
                mental.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-8 text-center border-2 border-[#1a7f3a] hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-[#1a7f3a] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FiHeart className="text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1a7f3a] mb-4 font-akzidens">
                Valores
              </h3>
              <p className="text-[#1a3a4a] text-base md:text-lg leading-relaxed">
                Nosso maior valor é auxiliá-los em uma jornada de transformação
                pessoal, transformando sua experiência no exterior em
                oportunidade de autoconhecimento.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Seção 4: Nossa Equipe */}
        <motion.section
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="font-akzidens text-3xl md:text-4xl font-bold text-[#01386F] mb-4">
              Nossa Equipe
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#b86a1a] to-[#c26711] mx-auto rounded-full"></div>
            <p className="text-lg md:text-xl text-[#1a3a4a] mt-6 max-w-2xl mx-auto">
              Conheça alguns dos profissionais especializados que fazem parte da
              nossa equipe
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {equipe.map((prof, idx) => (
              <motion.div
                key={prof.nome}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.15 + 0.3,
                  ease: "easeOut",
                }}
              >
                <div className="mb-6 relative">
                  <Image
                    src={prof.foto}
                    alt={prof.nome}
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-[#01386F]/20 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#01386F] to-[#13a89e] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <FiShield className="text-sm" />
                  </div>
                </div>
                <h3 className="font-akzidens text-xl text-[#01386F] mb-2 font-bold">
                  {prof.nome}
                </h3>
                <span className="text-[#b86a1a] text-base font-semibold mb-3 px-3 py-1 bg-amber-50 rounded-full border border-[#b86a1a]/20">
                  {prof.cargo}
                </span>
                <p className="text-[#1a3a4a] text-sm leading-relaxed">
                  {prof.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <FooterSection />
    </div>
  );
}
