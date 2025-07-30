"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import PsychologistCard from "./PsychologistCard";
import { useRouter } from "next/navigation";
import { getPsicanalistas } from "@/actions/psicanalistas";

interface Psychologist {
  id: string;
  name: string;
  specialty: string;
  categories: string[];
  experience: string;
  rating: number;
  price: string;
  location: string;
  languages: string[];
  bio: string;
  education: string;
  approach: string;
  availability: string;
  image: string;
  shortBio?: string; // Bio resumida para o card normal
  fullBio?: string; // Bio completa para o hover
}

const specialtyCategories = [
  { key: "all", label: "categories.all" },
  { key: "Ansiedade e Depressão", label: "categories.anxiety" },
  { key: "Relacionamentos", label: "categories.relationships" },
  { key: "Trauma e PTSD", label: "categories.trauma" },
  { key: "Desenvolvimento", label: "categories.development" },
  { key: "Burnout e Estresse", label: "categories.burnout" },
  { key: "Vícios e Dependências", label: "categories.addictions" },
  { key: "Família e Maternidade", label: "categories.family" },
  { key: "Transtornos Alimentares", label: "categories.eating" },
  { key: "Neurodivergência", label: "categories.neurodivergence" },
  { key: "Terceira Idade", label: "categories.elderly" },
  { key: "LGBTQIA+ e Identidade", label: "categories.lgbtqia" },
  { key: "Luto e Perdas", label: "categories.grief" },
];

// Função para dividir as observações em bio resumida e completa
function splitBio(observacoes: string): { shortBio: string; fullBio: string } {
  if (!observacoes) {
    return {
      shortBio: "Psicanalista Clínico",
      fullBio: "Psicanalista Clínico",
    };
  }

  // Se as observações são curtas, usar como bio resumida
  if (observacoes.length <= 100) {
    return { shortBio: observacoes, fullBio: observacoes };
  }

  // Dividir em frases
  const sentences = observacoes
    .split(/[.!?]/)
    .filter((s) => s.trim().length > 0);

  if (sentences.length <= 2) {
    // Se tem poucas frases, dividir pela metade
    const midPoint = Math.floor(observacoes.length / 2);
    return {
      shortBio: observacoes.substring(0, midPoint).trim(),
      fullBio: observacoes,
    };
  }

  // Pegar a primeira frase como bio resumida
  const shortBio = sentences[0].trim();
  return {
    shortBio:
      shortBio.length > 80 ? shortBio.substring(0, 80) + "..." : shortBio,
    fullBio: observacoes,
  };
}

export default function PsychologistsSection() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const router = useRouter();

  useEffect(() => {
    getPsicanalistas().then((data) => {
      console.log("[PsychologistsSection] Dados recebidos:", data);
      // Processar os dados para dividir as observações
      const processedData = data.map((psychologist: Psychologist) => {
        const { shortBio, fullBio } = splitBio(psychologist.bio);
        return {
          ...psychologist,
          shortBio,
          fullBio,
        };
      });
      setPsychologists(processedData);
    });
  }, []);

  // Filtro por nome ou disponibilidade
  const filteredPsychologists = psychologists.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.availability.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-akzidens text-3xl md:text-4xl font-bold mb-4 text-[#01386F]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Conheça nossos Psicanalistas e veja horários disponíveis
          </motion.h2>
          <motion.p
            className="text-lg text-white font-medium mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            Profissionais qualificados que entendem as particularidades da
            experiência brasileira no exterior
          </motion.p>
          <motion.input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou horário disponível..."
            className="w-full max-w-md mx-auto rounded-lg bg-white border border-[#01386F] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#01386F]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          {filteredPsychologists.map((p, idx) => (
            <motion.div
              key={p.id}
              className="bg-white relative rounded-2xl shadow p-6 flex flex-col items-center text-center cursor-pointer group"
              onClick={() => router.push(`/psicanalistas/${p.id}`)}
              style={{ minHeight: 400 }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#01386F] shadow-md"
                style={{
                  width: "96px",
                  height: "96px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div className="font-akzidens text-xl text-[#01386F] font-bold mb-1">
                {p.name}
              </div>
              <div className="text-base text-[#5a5427] mb-2">{p.specialty}</div>
              <div
                className="text-sm text-[#6B3F1D] mb-4 overflow-hidden"
                style={{
                  maxHeight: "80px",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                }}
              >
                {p.shortBio || p.availability}
              </div>
              <button
                className="absolute bottom-10 px-6 py-2 rounded-lg bg-[#01386F] text-white font-akzidens font-bold shadow hover:bg-[#012a52] transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/psicanalistas/${p.id}`);
                }}
              >
                Ver horários
              </button>
              {/* Hover detalhado animado */}
              <AnimatePresence>
                {hovered === p.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/95 rounded-2xl shadow-2xl z-30 flex flex-col items-center justify-center p-6 border-2 border-[#01386F]"
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ pointerEvents: "auto" }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-[#01386F] shadow-md"
                      style={{
                        width: "96px",
                        height: "96px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <div className="font-akzidens text-lg text-[#01386F] font-bold mb-1">
                      {p.name}
                    </div>
                    <div className="text-base text-[#5a5427] mb-1">
                      {p.specialty}
                    </div>
                    <div className="text-xs text-[#6B3F1D] mb-2">
                      {p.availability}
                    </div>
                    <div 
                      className="text-sm text-[#01386F] mb-2 overflow-hidden"
                      style={{ 
                        maxHeight: '120px',
                        display: '-webkit-box',
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {p.fullBio || p.bio}
                    </div>
                    <div 
                      className="text-xs text-[#5a5427] mb-1 overflow-hidden"
                      style={{ 
                        maxHeight: '40px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {p.education}
                    </div>
                    <div 
                      className="text-xs text-[#5a5427] mb-2 overflow-hidden"
                      style={{ 
                        maxHeight: '40px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {p.approach}
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 mb-2">
                      {p.languages.map((lang) => (
                        <span
                          key={lang}
                          className="bg-[#b7c8b1] text-[#01386F] rounded px-2 py-1 text-xs font-semibold"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                    <button
                      className="mt-2 px-6 py-2 rounded-lg bg-[#01386F] text-white font-akzidens font-bold shadow hover:bg-[#012a52] transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/psicanalistas/${p.id}`);
                      }}
                    >
                      Ver agenda e marcar sessão
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
