"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/ui";
import FooterSection from "@/components/landing/FooterSection";
import { useEffect, useState } from "react";
import { FaUserMd, FaComments, FaBrain, FaGlobeAmericas } from "react-icons/fa";
import {
  FiUser,
  FiMenu,
  FiX,
  FiGlobe,
  FiUsers,
  FiHome,
  FiTrendingUp,
  FiShield,
  FiHeart,
  FiTarget,
  FiAward,
  FiClock,
  FiMapPin,
  FiZap,
} from "react-icons/fi";

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
    <div className="bg-white">
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#f5f6f3] via-[#f9fbe7] to-[#deefff] flex flex-col items-center pt-32 pb-32 px-4 md:px-0">
        <div className="w-full max-w-6xl flex flex-col gap-16 mb-20">
          {/* Estudantes de Intercâmbio */}
          <div className="w-full flex flex-col gap-12 items-center">
            {/* Texto à esquerda */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#01386F] mb-10 font-akzidens text-center">
                Programa de Bem-estar Emocional para Estudantes de Intercâmbio
              </h2>
              <p className="text-base md:text-lg text-[#3a2d1a] mb-6  text-center">
                Investir no bem-estar emocional não é custo, é{" "}
                <span className="font-semibold text-black">diferencial:</span>{" "}
                <span className="font-semibold text-[#b86a1a]">
                  aumenta retenção, satisfação e fortalece sua reputação
                  internacional.
                </span>
              </p>
            </div>
            {/* Cards à direita: estatísticas */}
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
              <div className="text-center text-xl max-w-md">
                <span className="font-bold italic text-[#b86a1a]">
                  <span className="text-4xl text-black">57%</span> <br />
                  <br /> dos intercambistas relatam sofrimento emocional
                </span>
              </div>
              <div className="text-center text-xl max-w-md">
                <span className="text-[#b86a1a] font-bold italic">
                  <span className="text-4xl text-black">2X</span>
                  <br />
                  <br /> mais risco de ansiedade severa e depressão
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0e37aa] to-[#c26711] rounded-xl shadow p-6 flex items-center w-1/2 mx-auto text-center">
            <span className="text-white font-bold text-lg">
              <span className="italic">
                Isolamento social, barreiras linguísticas e choque cultural
                aumentam a vulnerabilidade
              </span>
            </span>
          </div>
          {/* Passo a passo embaixo */}
          <div className="w-full pt-10">
            <h3 className="text-xl md:text-2xl font-bold text-[#01386F] mb-12 font-akzidens">
              Confira nossos programas:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-blue-900 rounded-xl shadow-xl p-8">
                <h3 className="text-[#01386F] font-bold text-xl  mb-6">
                  1. Pré-Intercâmbio: <br /> Preparação Proativa
                </h3>
                <ul className="list-disc pl-6 text-[#1a3a4a] text-base leading-8 space-y-4">
                  <li>Avaliação de bem-estar e plano personalizado</li>
                  <li>
                    Workshops de adaptação cultural, gestão de expectativas e
                    autocuidado
                  </li>
                  <li>Cartilha digital com dicas práticas</li>
                  <li>Canal de acolhimento psicanalítico pré-embarque</li>
                </ul>
              </div>

              <div className="bg-white shadow-amber-900 rounded-xl shadow-xl p-8">
                <h3 className="text-[#01386F] font-bold text-xl mb-6">
                  2. Durante o Intercâmbio: <br /> Acompanhamento Contínuo
                </h3>
                <ul className="list-disc pl-6 text-[#1a3a4a] text-base leading-8 space-y-3">
                  <li>
                    Sessões mensais (ou sob demanda) com psicanalista online
                  </li>
                  <li>Grupos de apoio locais e virtuais</li>
                  <li>Campanhas temáticas de bem-estar por e-mail/WhatsApp</li>
                  <li>Atendimento 24h em crises</li>
                  <li>Check-ins automáticos para detecção precoce de riscos</li>
                </ul>
              </div>

              <div className="bg-white shadow-blue-900 rounded-xl shadow-xl p-8">
                <h3 className="text-[#01386F] font-bold text-xl mb-6">
                  3. Pós-Intercâmbio: <br /> Reintegração Saudável
                </h3>
                <ul className="list-disc pl-6 text-[#1a3a4a] text-base leading-8 space-y-3">
                  <li>Sessões de readaptação ao choque reverso</li>
                  <li>Painel de troca de experiências entre intercambistas</li>
                  <li>Guia de reintegração e autocuidado pós-retorno</li>
                  <li>Acompanhamento por até 3 meses</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Expatriados */}
          <div className="w-full mt-32 flex flex-col gap-12 items-center">
            {/* Texto centralizado */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#01386F] mb-10 font-akzidens text-center">
                Programa de Cuidados com Saúde Mental para Expatriados
              </h2>
              <p className="text-base md:text-lg text-[#3a2d1a] mb-6 text-center">
                Ofereça aos seus talentos um suporte completo antes, durante e
                após a missão internacional, reduzindo custos, impactos com
                familiares e aumentando engajamento:
              </p>
            </div>
            {/* Estatísticas centralizadas */}
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-start">
              <div className="text-center text-xl flex-1">
                <span className="font-bold italic text-[#b86a1a]">
                  <span className="text-4xl text-black">25%</span> <br />
                  <br /> dos expatriados brasileiros retornam precocemente por
                  falta de suporte
                </span>
              </div>
              <div className="text-center text-xl flex-1">
                <span className="text-[#b86a1a] font-bold italic">
                  <span className="text-4xl text-black">45%</span>
                  <br />
                  <br /> apresentam estresse moderado a severo antes do retorno
                </span>
              </div>
              <div className="text-center text-xl flex-1">
                <span className="text-[#b86a1a] font-bold italic">
                  <span className="text-4xl text-black">30%</span>
                  <br />
                  <br /> turnover em 18 meses
                </span>
              </div>
            </div>
          </div>

          {/* Seção 1: Estrutura Ágil e Eficaz - Ovals */}
          <div className="w-full">
            <h3 className="text-xl md:text-2xl font-bold text-[#01386F] mb-8 font-akzidens text-center flex items-center justify-center gap-3">
              <FiTarget className="text-2xl text-[#01386F]" />
              Estrutura Ágil e Eficaz
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-white to-blue-50 border-2 border-[#01386F] rounded-full px-8 py-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#01386F] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <FiGlobe className="text-xl" />
                </div>
                <span className="text-[#01386F] font-bold text-lg block mb-2">
                  1. Pré-Expatriação
                </span>
                <p className="text-[#1a3a4a] text-sm leading-relaxed">
                  Avaliação psicossocial, workshops interculturais e psicanálise
                  clínica
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-white to-cyan-50 border-2 border-[#13a89e] rounded-full px-8 py-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-[#13a89e] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <FiUsers className="text-xl" />
                </div>
                <span className="text-[#01386F] font-bold text-lg block mb-2">
                  2. Missão no Exterior
                </span>
                <p className="text-[#1a3a4a] text-sm leading-relaxed">
                  Suporte psicanalítico contínuo, grupos de apoio e atendimento
                  24h
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-white to-green-50 border-2 border-[#1a7f3a] rounded-full px-8 py-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-[#1a7f3a] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <FiHome className="text-xl" />
                </div>
                <span className="text-[#01386F] font-bold text-lg block mb-2">
                  3. Repatriação
                </span>
                <p className="text-[#1a3a4a] text-sm leading-relaxed">
                  Acompanhamento de até 3 meses
                </p>
              </motion.div>
            </div>
          </div>

          {/* Seção 2: Principais Desafios - Texto Direto */}
          <div className="w-full">
            <h3 className="text-xl md:text-2xl font-bold text-[#01386F] mb-8 font-akzidens text-center flex items-center justify-center gap-3">
              <FiShield className="text-2xl text-[#01386F]" />
              Principais Desafios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-400 text-center w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                  <FiHeart className="text-lg" />
                </div>
                <span className="text-[#01386F] font-semibold text-lg block mb-2">
                  Psicológicos:
                </span>
                <p className="text-[#1a3a4a] text-base leading-relaxed">
                  Ansiedade, depressão e "choque reverso" cultural
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400 text-center w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                  <FiTrendingUp className="text-lg" />
                </div>
                <span className="text-[#01386F] font-semibold text-lg block mb-2">
                  Comportamentais:
                </span>
                <p className="text-[#1a3a4a] text-base leading-relaxed">
                  Queda de desempenho e insatisfação no novo cargo
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-400 text-center w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-auto mb-3">
                  <FiUsers className="text-lg" />
                </div>
                <span className="text-[#01386F] font-semibold text-lg block mb-2">
                  Familiares:
                </span>
                <p className="text-[#1a3a4a] text-base leading-relaxed">
                  Isolamento de cônjuges e filhos, dificuldades escolares e
                  sociais
                </p>
              </motion.div>
            </div>
          </div>

          {/* Seção 3: Benefícios Tangíveis - Cards Quadrados */}
          <div className="w-full">
            <h3 className="text-xl md:text-2xl font-bold text-[#01386F] mb-8 font-akzidens text-center flex items-center justify-center gap-3">
              <FiAward className="text-2xl text-[#01386F]" />
              Benefícios Tangíveis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-white to-blue-50 border-2 border-[#01386F] rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 w-full"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#01386F] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="text-xl" />
                </div>
                <h4 className="text-[#01386F] font-bold text-lg mb-3">
                  Redução de Impactos
                </h4>
                <p className="text-[#1a3a4a] text-base leading-relaxed">
                  Redução de até 40% nos efeitos negativos do choque cultural
                  reverso
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-white to-cyan-50 border-2 border-[#13a89e] rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 w-full"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-[#13a89e] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <FiZap className="text-xl" />
                </div>
                <h4 className="text-[#01386F] font-bold text-lg mb-3">
                  Economia em Recrutamento
                </h4>
                <p className="text-[#1a3a4a] text-base leading-relaxed">
                  Menos retornos prematuros e turnover, gerando economia em
                  recrutamento
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-white to-green-50 border-2 border-[#1a7f3a] rounded-2xl p-6 shadow-lg text-center relative hover:shadow-xl transition-all duration-300 w-full"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-0 border-2 border-dashed border-[#1a7f3a] rounded-2xl"></div>
                <div className="bg-[#1a7f3a] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <FiAward className="text-xl" />
                </div>
                <h4 className="text-[#01386F] font-bold text-lg mb-3">
                  Colaboradores Engajados
                </h4>
                <p className="text-[#1a7f3a] text-base leading-relaxed">
                  Colaboradores mais engajados, produtivos e preparados para
                  desafios locais
                </p>
                <p className="italic text-[#01386F] text-sm mt-4 leading-relaxed">
                  *Invista na saúde mental dos seus expatriados e suas famílias.
                  Transforme cada experiência internacional em investimento
                  seguro, performance elevada e retenção de talentos-chave.*
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
