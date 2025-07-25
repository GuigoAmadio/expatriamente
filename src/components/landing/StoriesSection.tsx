"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function StoriesSection() {
  const { t } = useLanguage();
  // const colors = useColors();
  const { darkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Novo estado para paginação
  const [page, setPage] = useState(0);
  const commentsPerPage = 6;

  // Vídeos mockados para a seção
  const videos = [
    {
      id: 1,
      title: "Como a terapia me ajudou a lidar com a solidão",
      category: "Adaptação Cultural",
      duration: "3:45",
      thumbnail:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop",
      gradient: "from-teal-500 to-cyan-400",
    },
    {
      id: 2,
      title: "Ser mãe longe da família: minha jornada",
      category: "Maternidade",
      duration: "5:12",
      thumbnail:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Superando a síndrome do impostor no exterior",
      category: "Vida Profissional",
      duration: "4:28",
      thumbnail:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Mantendo vínculos familiares à distância",
      category: "Relacionamentos",
      duration: "6:15",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      id: 5,
      title: "Reconstruindo identidade em nova cultura",
      category: "Identidade",
      duration: "4:52",
      thumbnail:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=600&fit=crop",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 6,
      title: "Enfrentando o isolamento na pandemia",
      category: "Saúde Mental",
      duration: "7:23",
      thumbnail:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      id: 7,
      title: "Amor internacional: desafios e aprendizados",
      category: "Relacionamentos",
      duration: "5:47",
      thumbnail:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=600&fit=crop",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      id: 8,
      title: "De startup no Brasil para corporação no exterior",
      category: "Carreira",
      duration: "8:12",
      thumbnail:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  // Depoimentos da imagem de referência
  const depoimentos = [
    "Viver no exterior trouxe desafios que eu não esperava. A terapia me ajudou a entender que é normal sentir saudades e que posso criar minha nova identidade sem perder minhas raízes.",
    "Adaptação parecia só uma questão de tempo, mas me peguei sobrecarregado entre costumes diferentes, exigências acadêmicas e saudade de casa. Conversar na terapia foi essencial para organizar meus sentimentos, respeitar meus limites e perceber que me reinventar em outro país também é um ato de coragem.",
    "Antes de me mudar, minha maior preocupação era encaixar as malas no avião. Depois que cheguei, percebi que o medo e a ansiedade estavam em cada pequena decisão do dia a dia — desde pedir um café até socializar no trabalho. As sessões de terapia me ajudaram a respirar, priorizar o presente e entender que errar faz parte do processo.",
    "Quando cheguei no exterior, achava que só precisava me adaptar ao idioma e à rotina. Mas, aos poucos, comecei a sentir um peso, uma tristeza constante que não conseguia explicar. A terapia me fez compreender que depressão não é fraqueza e que pedir ajuda foi o primeiro passo para resgatar meu bem-estar e minha autoestima no novo país.",
  ];

  return (
    <section className="w-full py-20 px-4 md:px-0 flex flex-col items-center justify-center bg-white">
      <div className="w-full px-28 flex flex-col items-center pt-16">
        {/* Desktop layout especial */}
        <div className="hidden md:flex flex-col gap-16 w-full">
          {/* Primeira linha: título e depoimento 0 */}
          <div className="flex gap-10 w-full items-start justify-between">
            <div className="flex flex-col gap-6 items-start w-2/3">
              <motion.div
                className="font-akzidens text-3xl text-[#DBD1A4] font-bold italic text-left items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2>
                  Conheça{" "}
                  <span className="text-orange-400">histórias reais </span>
                  de brasileiros que encontraram acolhimento e crescimento
                  pessoal através da psicanálise,{" "}
                  <span className="text-orange-400">
                    mesmo estando longe de casa.
                  </span>
                </h2>
              </motion.div>
              <div className="flex justify-end">
                <motion.div
                  className="bg-[#DBD1A4] rounded-2xl shadow-xl shadow-orange-400/50 p-8 text-lg text-[#5a5427] font-medium leading-relaxed items-center w-2/3"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <span className="italic">"{depoimentos[0]}"</span>
                </motion.div>
              </div>
            </div>
            <motion.div
              className="bg-[#DBD1A4] rounded-2xl shadow-xl shadow-orange-400/50 p-8 text-lg text-[#5a5427] font-medium leading-relaxed w-1/3 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <span className="italic">"{depoimentos[2]}"</span>
            </motion.div>
          </div>
          {/* Segunda linha: dois depoimentos lado a lado */}
          <div className="flex justify-end w-full">
            <h2 className="text-3xl text-[#DBD1A4] font-bold italic text-right w-2/3">
              Conheça <span className="text-orange-400">histórias reais </span>
              de brasileiros que encontraram acolhimento e crescimento pessoal
              através da psicanálise,{" "}
              <span className="text-orange-400">
                mesmo estando longe de casa.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-8 w-full items-start">
            <motion.div
              className="bg-[#DBD1A4] rounded-2xl shadow-xl shadow-orange-400/50 p-8 text-lg text-[#5a5427] font-medium leading-relaxed w-4/5 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <span className="italic">"{depoimentos[1]}"</span>
            </motion.div>
            <motion.div
              className="bg-[#DBD1A4] rounded-2xl shadow-xl shadow-orange-400/50 p-8 text-lg text-[#5a5427] font-medium leading-relaxed w-4/5 items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <span className="italic">"{depoimentos[3]}"</span>
            </motion.div>
          </div>
          {/* Subtítulo centralizado */}
        </div>
        {/* Mobile: coluna única */}
        <div className="md:hidden grid grid-cols-1 gap-8 w-full">
          <motion.div
            className="font-akzidens text-2xl text-[#DBD1A4] font-bold italic text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2>
              Conheça <span className="text-orange-400">histórias reais </span>
              de brasileiros que encontraram acolhimento e crescimento pessoal
              através da psicanálise,{" "}
              <span className="text-orange-400">
                mesmo estando longe de casa.
              </span>
            </h2>
          </motion.div>
          {depoimentos.map((texto, idx) => (
            <motion.div
              key={idx}
              className="bg-[#DBD1A4] rounded-2xl shadow p-8 text-lg text-[#5a5427] font-medium leading-relaxed mx-auto"
              style={{ minHeight: 120 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <span className="italic">
                "{texto.length > 350 ? texto.slice(0, 350) + "…" : texto}"
              </span>
            </motion.div>
          ))}
          <div className="w-full flex justify-center my-4">
            <span className="font-akzidens text-xl text-[#6B3F1D] font-semibold text-center">
              Subtítulo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
