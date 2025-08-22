"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import PsychologistCard from "./PsychologistCard";
import { useRouter } from "next/navigation";
import { getPsicanalistas } from "@/actions/psicanalistas";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

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
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loadingCardId, setLoadingCardId] = useState<string | null>(null);
  const router = useRouter();
  const { trackViewContent } = useFacebookPixel();

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

  // Responsividade para definir tamanho de página
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Recalcular/ajustar página quando filtros ou breakpoint mudarem
  const itemsPerPage = isMobile ? 4 : 12;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPsychologists.length / itemsPerPage)
  );
  useEffect(() => {
    setCurrentPage((prev) => (prev > totalPages ? totalPages : 1));
  }, [search, isMobile, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPsychologists = filteredPsychologists.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCardClick = async (psychologist: Psychologist) => {
    setLoadingCardId(psychologist.id);
    console.log(`🔵 [Psicanalistas] Card clicado:`, psychologist.name);

    trackViewContent({
      content_name: psychologist.name,
      content_category: "Psychologist Card",
      content_type: "card_click",
      psychologist_id: psychologist.id,
      psychologist_specialty: psychologist.specialty,
      psychologist_price: psychologist.price,
    });

    // Simular um pequeno delay para mostrar o loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    router.push(`/psicanalistas/${psychologist.id}`);
  };

  const handleButtonClick = async (
    e: React.MouseEvent,
    psychologist: Psychologist
  ) => {
    e.stopPropagation();
    setLoadingCardId(psychologist.id);

    console.log(
      `🔵 [Psicanalistas] Botão "Ver horários" clicado:`,
      psychologist.name
    );

    trackViewContent({
      content_name: `${psychologist.name} - Ver Horários`,
      content_category: "Psychologist Card",
      content_type: "button_click",
      psychologist_id: psychologist.id,
      psychologist_specialty: psychologist.specialty,
      psychologist_price: psychologist.price,
    });

    // Simular um pequeno delay para mostrar o loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    router.push(`/psicanalistas/${psychologist.id}`);
  };

  return (
    <section id="psicanalistas" className="pt-10 text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-akzidens text-3xl md:text-4xl font-bold mb-4 text-[#987b6b]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Conheça nossos Psicanalistas e veja horários disponíveis
          </motion.h2>
          <motion.p
            className="text-lg text-[#935a3c] font-medium mb-8"
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
            className="w-full max-w-md mx-auto rounded-lg bg-white border border-[#987b6b] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#987b6b]"
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
          {paginatedPsychologists.map((p, idx) => (
            <motion.div
              key={p.id}
              className="bg-white relative rounded-2xl shadow-lg hover:shadow-xl p-6 flex flex-col items-center text-center cursor-pointer group transition-all duration-300 ease-in-out"
              onClick={() => handleCardClick(p)}
              style={{ minHeight: 400 }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#987b6b] shadow-md"
                style={{
                  width: "96px",
                  height: "96px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div className="font-akzidens text-xl text-[#987b6b] font-bold mb-1">
                {p.name}
              </div>
              <div
                className="text-sm text-[#6B3F1D] mb-4 overflow-hidden space-y-1"
                style={{
                  maxHeight: "80px",
                  lineHeight: "1.3",
                }}
              >
                {p.bio && p.bio !== "Formação não especificada" ? (
                  p.bio
                    .split("\n")
                    .slice(0, 3)
                    .map((linha, idx) => (
                      <div key={idx} className="text-xs">
                        • {linha}
                      </div>
                    ))
                ) : (
                  <div className="text-xs">• Formação não especificada</div>
                )}
              </div>
              <button
                className="absolute bottom-10 px-8 py-3 rounded-xl bg-[#987b6b] text-white font-akzidens font-bold shadow-lg hover:bg-gradient-to-r hover:from-[#9ca995] hover:to-[#9bb18e] hover:scale-110 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-white/20 disabled:opacity-75 disabled:cursor-not-allowed disabled:scale-100"
                onClick={(e) => handleButtonClick(e, p)}
                disabled={loadingCardId === p.id}
              >
                {loadingCardId === p.id ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Ver horários</span>
                  </div>
                ) : (
                  "Ver horários"
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 rounded-full bg-[#987b6b] text-white disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                Anterior
              </button>
              <button
                className="px-4 py-2 rounded-full bg-[#987b6b] text-white disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
              >
                Próxima
              </button>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Ir para página ${page}`}
                    className={`transition-all duration-200 rounded-full border border-[#987b6b]/30 ${
                      isActive
                        ? "bg-[#c59c4a] scale-110 w-3.5 h-3.5"
                        : "bg-white/80 w-3 h-3 hover:scale-105"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
