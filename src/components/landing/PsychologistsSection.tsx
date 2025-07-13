"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import PsychologistCard from "./PsychologistCard";
import { useRouter } from "next/navigation";

interface Psychologist {
  id: number;
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

export default function PsychologistsSection() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);
  const router = useRouter();

  const psychologists: Psychologist[] = [
    {
      id: 1,
      name: "Dr. Ana Silva",
      specialty: "Ansiedade e Depressão",
      categories: ["Ansiedade e Depressão", "Burnout e Estresse"],
      experience: "8 anos",
      rating: 4.9,
      price: "R$ 120",
      location: "São Paulo, SP",
      languages: ["Português", "Inglês"],
      bio: "Especialista em terapia cognitivo-comportamental com foco em transtornos de ansiedade e depressão. Atendimento humanizado e baseado em evidências científicas.",
      education: "Mestrado em Psicologia Clínica - USP",
      approach: "Terapia Cognitivo-Comportamental",
      availability: "Seg-Sex: 8h às 18h",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Dr. Carlos Mendes",
      specialty: "Relacionamentos",
      categories: ["Relacionamentos", "Família e Maternidade"],
      experience: "12 anos",
      rating: 4.8,
      price: "R$ 150",
      location: "Rio de Janeiro, RJ",
      languages: ["Português", "Espanhol"],
      bio: "Terapeuta especializado em terapia de casal e relacionamentos. Ajudo pessoas a construírem vínculos mais saudáveis e duradouros.",
      education: "PhD em Psicologia - UFRJ",
      approach: "Terapia Sistêmica Familiar",
      availability: "Ter-Sáb: 9h às 19h",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Dra. Maria Santos",
      specialty: "Trauma e PTSD",
      categories: ["Trauma e PTSD", "Ansiedade e Depressão"],
      experience: "15 anos",
      rating: 5.0,
      price: "R$ 180",
      location: "Brasília, DF",
      languages: ["Português", "Francês"],
      bio: "Especialista em trauma e transtorno de estresse pós-traumático. Utilizo técnicas avançadas como EMDR para tratamento eficaz.",
      education: "Doutorado em Neuropsicologia - UnB",
      approach: "EMDR e Terapia do Trauma",
      availability: "Seg-Qui: 10h às 20h",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=faces",
    },
    {
      id: 4,
      name: "Dr. João Oliveira",
      specialty: "Adolescentes",
      categories: ["Desenvolvimento", "Ansiedade e Depressão"],
      experience: "10 anos",
      rating: 4.7,
      price: "R$ 110",
      location: "Belo Horizonte, MG",
      languages: ["Português"],
      bio: "Psicólogo especializado no atendimento de adolescentes e jovens adultos. Experiência em questões de identidade e desenvolvimento.",
      education: "Mestrado em Psicologia do Desenvolvimento - UFMG",
      approach: "Terapia Humanística",
      availability: "Seg-Sex: 14h às 22h",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Dra. Lucia Costa",
      specialty: "Burnout Profissional",
      categories: ["Burnout e Estresse", "Ansiedade e Depressão"],
      experience: "9 anos",
      rating: 4.8,
      price: "R$ 140",
      location: "Porto Alegre, RS",
      languages: ["Português", "Inglês"],
      bio: "Especialista em burnout e estresse profissional. Ajudo executivos e profissionais a encontrarem equilíbrio entre vida pessoal e carreira.",
      education: "Especialização em Psicologia Organizacional - PUCRS",
      approach: "Terapia Cognitiva e Mindfulness",
      availability: "Seg-Sex: 7h às 17h",
      image:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Dr. Rafael Lima",
      specialty: "Vícios e Dependências",
      categories: ["Vícios e Dependências", "Trauma e PTSD"],
      experience: "11 anos",
      rating: 4.9,
      price: "R$ 160",
      location: "Salvador, BA",
      languages: ["Português", "Inglês"],
      bio: "Terapeuta especializado em dependência química e comportamental. Abordagem compassiva e baseada em evidências para recuperação.",
      education: "Mestrado em Psiquiatria - UFBA",
      approach: "Terapia Motivacional",
      availability: "Ter-Sáb: 8h às 18h",
      image:
        "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 7,
      name: "Dra. Patricia Rocha",
      specialty: "Maternidade e Família",
      categories: ["Família e Maternidade", "Relacionamentos"],
      experience: "7 anos",
      rating: 4.8,
      price: "R$ 130",
      location: "Fortaleza, CE",
      languages: ["Português"],
      bio: "Psicóloga especializada em questões relacionadas à maternidade, pós-parto e dinâmicas familiares. Atendimento acolhedor e empático.",
      education: "Especialização em Psicologia Perinatal - UFC",
      approach: "Terapia Integrativa",
      availability: "Seg-Sex: 9h às 18h",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 8,
      name: "Dr. Fernando Alves",
      specialty: "Transtornos Alimentares",
      categories: ["Transtornos Alimentares", "Ansiedade e Depressão"],
      experience: "13 anos",
      rating: 4.9,
      price: "R$ 170",
      location: "Curitiba, PR",
      languages: ["Português", "Italiano"],
      bio: "Especialista em transtornos alimentares e imagem corporal. Trabalho integrado com nutricionistas para tratamento completo.",
      education: "PhD em Psicologia da Saúde - UFPR",
      approach: "Terapia Cognitivo-Comportamental",
      availability: "Seg-Sex: 8h às 19h",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 9,
      name: "Dra. Camila Ferreira",
      specialty: "Autismo e Neurodivergência",
      categories: ["Neurodivergência", "Desenvolvimento"],
      experience: "6 anos",
      rating: 4.7,
      price: "R$ 125",
      location: "Recife, PE",
      languages: ["Português", "Libras"],
      bio: "Psicóloga especializada em autismo e neurodivergência. Atendimento inclusivo e personalizado para todas as idades.",
      education: "Mestrado em Neuropsicologia - UFPE",
      approach: "ABA e Terapia Comportamental",
      availability: "Seg-Sex: 13h às 21h",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 10,
      name: "Dr. Roberto Dias",
      specialty: "Terceira Idade",
      categories: ["Terceira Idade", "Luto e Perdas"],
      experience: "16 anos",
      rating: 5.0,
      price: "R$ 135",
      location: "Goiânia, GO",
      languages: ["Português"],
      bio: "Especialista em psicologia do envelhecimento e cuidados com idosos. Experiência em demências e adaptação a mudanças de vida.",
      education: "Doutorado em Gerontologia - UFG",
      approach: "Terapia Reminiscência",
      availability: "Seg-Qui: 8h às 16h",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 11,
      name: "Dra. Juliana Moreira",
      specialty: "LGBTQIA+ e Identidade",
      categories: ["LGBTQIA+ e Identidade", "Desenvolvimento"],
      experience: "8 anos",
      rating: 4.9,
      price: "R$ 140",
      location: "Florianópolis, SC",
      languages: ["Português", "Inglês"],
      bio: "Psicóloga especializada em questões de identidade de gênero e sexualidade. Atendimento afirmativo e respeitoso à diversidade.",
      education: "Mestrado em Psicologia Social - UFSC",
      approach: "Terapia Afirmativa",
      availability: "Ter-Sáb: 10h às 20h",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 12,
      name: "Dr. Marcos Barbosa",
      specialty: "Luto e Perdas",
      categories: ["Luto e Perdas", "Trauma e PTSD"],
      experience: "14 anos",
      rating: 4.8,
      price: "R$ 155",
      location: "Manaus, AM",
      languages: ["Português", "Espanhol"],
      bio: "Terapeuta especializado em processos de luto e perdas significativas. Acompanhamento compassivo em momentos difíceis da vida.",
      education: "PhD em Tanatologia - UFAM",
      approach: "Terapia do Luto",
      availability: "Seg-Sex: 9h às 19h",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    },
  ];

  // Filtro por nome ou disponibilidade
  const filteredPsychologists = psychologists.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.availability.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 bg-[#9EB7AA] text-primary">
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
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center relative cursor-pointer group"
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => router.push(`/psicanalistas/${p.id}`)}
              style={{ minHeight: 260 }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-[#01386F]"
              />
              <div className="font-akzidens text-xl text-[#01386F] font-bold mb-1">
                {p.name}
              </div>
              <div className="text-base text-[#5a5427] mb-2">{p.specialty}</div>
              <div className="text-sm text-[#6B3F1D] mb-4">
                {p.availability}
              </div>
              <button
                className="px-6 py-2 rounded-lg bg-[#01386F] text-white font-akzidens font-bold shadow hover:bg-[#012a52] transition-all"
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
                      className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-[#01386F]"
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
                    <div className="text-sm text-[#01386F] mb-2">{p.bio}</div>
                    <div className="text-xs text-[#5a5427] mb-1">
                      {p.education}
                    </div>
                    <div className="text-xs text-[#5a5427] mb-2">
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
