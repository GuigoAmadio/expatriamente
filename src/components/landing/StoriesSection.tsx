"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useNavigation } from "@/context/NavigationContext";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function StoriesSection() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  const { currentSection } = useNavigation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const commentsPerPage = 6;

  // Depoimentos da imagem de referência
  const depoimentos = [
    "Viver no exterior trouxe desafios que eu não esperava. A terapia me ajudou a entender que é normal sentir saudades e que posso criar minha nova identidade sem perder minhas raízes.",
    "Adaptação parecia só uma questão de tempo, mas me peguei sobrecarregado entre costumes diferentes, exigências acadêmicas e saudade de casa. Conversar na terapia foi essencial para organizar meus sentimentos, respeitar meus limites e perceber que me reinventar em outro país também é um ato de coragem.",
    "Quando cheguei no exterior, achava que só precisava me adaptar ao idioma e à rotina. Mas, aos poucos, comecei a sentir um peso, uma tristeza constante que não conseguia explicar. A terapia me fez compreender que depressão não é fraqueza e que pedir ajuda foi o primeiro passo para resgatar meu bem-estar.",
    "Antes de me mudar, minha maior preocupação era encaixar as malas no avião. Depois que cheguei, percebi que o medo e a ansiedade estavam em cada pequena decisão do dia a dia — desde pedir um café até socializar no trabalho. As sessões de terapia me ajudaram a respirar, priorizar o presente e entender que errar faz parte do processo.",
  ];

  // Determina o gradiente baseado na seção ativa
  const getBackground = () => {
    if (currentSection === "about") {
      // Gradiente invertido para "Sobre Nós"
      return `linear-gradient(
        to bottom,
        #e8dcc0 0%,
        #e4d9ae 15%,
        #d5caa1 30%,
        #c6bb94 45%,
        #b7ac87 60%,
        #a89d7a 75%,
        #c2b494 100%
      )`;
    }
    // Gradiente normal para outras seções
    return `linear-gradient(
      to bottom,
      #c2b494 0%,
      #a89d7a 15%,
      #b7ac87 30%,
      #c6bb94 45%,
      #d5caa1 60%,
      #e4d9ae 75%,
      #e8dcc0 100%
    )`;
  };

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 px-4 md:px-0 flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: getBackground(),
      }}
    >
      <div className="w-full max-w-6xl flex flex-col items-center pt-8 sm:pt-12 md:pt-16 relative z-10">
        {/* Desktop layout com título no meio */}
        <div className="hidden md:flex flex-col gap-16 w-full items-center">
          {/* Layout responsivo: coluna em telas menores que xl, grid em xl+ */}
          <div className="flex flex-col xl:grid xl:grid-cols-2 gap-8 w-3/4 xl:w-full">
            <motion.div
              className="relative bg-[#BFE0F4] rounded-2xl shadow-lg shadow-amber-300 p-5 text-base text-[#00000] font-medium leading-relaxed h-[200px] flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(237, 215, 120, 0.3)",
              }}
            >
              <img
                src="/logoFinal.svg"
                alt="Logo Expatriamente"
                className="absolute w-20 h-20 -top-10 -left-10"
              />
              <span className="italic text-start">"{depoimentos[0]}"</span>
            </motion.div>
            <motion.div
              className="bg-[#C5F3E6] rounded-2xl shadow-lg shadow-amber-300 p-5 text-base text-[#00000] font-medium leading-relaxed h-[200px] flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(237, 215, 120, 0.3)",
              }}
            >
              <span className="italic text-start">"{depoimentos[1]}"</span>
            </motion.div>
          </div>

          {/* Título no meio */}
          <motion.div
            className="font-akzidens text-3xl text-[#ffffff] font-bold italic text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2>
              Conheça <span className="text-[#B2412D]">histórias reais </span>
              de brasileiros que encontraram acolhimento e crescimento pessoal
              através da psicanálise,{" "}
              <span className="text-[#B2412D]">
                mesmo estando longe de casa.
              </span>
            </h2>
          </motion.div>

          {/* Segunda linha: dois cards */}
          <div className="flex flex-col xl:grid xl:grid-cols-2 gap-8 w-3/4 xl:w-full  ">
            <motion.div
              className="bg-[#C5F3E6] rounded-2xl shadow-lg shadow-amber-300 p-5 text-base text-[#00000] font-medium leading-relaxed h-[200px] flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(237, 215, 120, 0.3)",
              }}
            >
              <span className="italic text-start">"{depoimentos[2]}"</span>
            </motion.div>
            <motion.div
              className="bg-[#BFE0F4] rounded-2xl shadow-lg shadow-amber-300 p-5 text-base text-[#00000] font-medium leading-relaxed h-[200px] flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(237, 215, 120, 0.3)",
              }}
            >
              <span className="italic text-start">"{depoimentos[3]}"</span>
            </motion.div>
          </div>
        </div>

        {/* Mobile: layout otimizado */}
        <div className="md:hidden flex flex-col gap-6 w-full">
          <motion.div
            className="font-akzidens text-xl sm:text-2xl text-[#ffffff] font-bold italic text-center leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2>
              Conheça <span className="text-[#B2412D]">histórias reais </span>
              de brasileiros que encontraram acolhimento e crescimento pessoal
              através da psicanálise,{" "}
              <span className="text-[#B2412D]">
                mesmo estando longe de casa.
              </span>
            </h2>
          </motion.div>
          {depoimentos.map((texto, idx) => {
            const bgColors = ["#BFE0F4", "#C5F3E6", "#C5F3E6", "#BFE0F4"]; // segue a ordem dos cards no desktop
            const bg = bgColors[idx % bgColors.length];
            return (
              <motion.div
                key={idx}
                className="rounded-2xl shadow-lg p-6 sm:p-8 text-sm sm:text-base font-medium leading-relaxed w-full min-h-[200px] flex items-center justify-center"
                style={{
                  backgroundColor: bg,
                  color: "#00000",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(237, 215, 120, 0.3)",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: idx * 0.2,
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <span className="italic text-center">
                  "{texto.length > 300 ? texto.slice(0, 300) + "…" : texto}"
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
