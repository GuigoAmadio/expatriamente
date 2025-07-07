"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import PsychologistCard from "./PsychologistCard";

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
  const [selectedPsychologist, setSelectedPsychologist] =
    useState<Psychologist | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // const [expandLeft, setExpandLeft] = useState(false);

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

  const filteredPsychologists =
    selectedCategory === "all"
      ? psychologists
      : psychologists.filter((p) => p.categories.includes(selectedCategory));

  return (
    <section
      className={`py-20 transition-colors duration-300 bg-background text-primary ${
        darkMode === "dark" ? "dark" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-heading"
          >
            {t("title", "psychologists")}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-xl leading-relaxed"
          >
            {t("subtitle", "psychologists")}
          </motion.p>
        </div>

        {/* Filtros por Especialidade */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {specialtyCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.key
                    ? darkMode === "dark"
                      ? "bg-accent text-surface shadow-lg"
                      : "bg-botao-primary text-secondary shadow-lg"
                    : darkMode === "dark"
                    ? "bg-primary text-surface hover:bg-secondary"
                    : "bg-background-weak text-primary hover:bg-botao-primary"
                }`}
              >
                {t(category.label, "psychologists")}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de Psicanalistas - VERSÃO COM SOBREPOSIÇÃO */}
        <div className="flex flex-wrap gap-6 mb-12 w-full mx-auto justify-center">
          {filteredPsychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              data={psychologist}
              onClick={() => setSelectedPsychologist(psychologist)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button
            className={`rounded-xl mt-10 px-8 py-3 font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl ${
              darkMode === "dark"
                ? "bg-accent hover:bg-accent text-surface"
                : "bg-botao-primary hover:bg-botao-primary/80 text-secondary"
            }`}
          >
            {t("viewProfile", "psychologists")}
          </button>
        </motion.div>
      </div>

      {/* Modal de Detalhes do Psicanalista */}
      <AnimatePresence>
        {selectedPsychologist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPsychologist(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`rounded-3xl max-w-4xl w-full max-h-[70vh] ${
                darkMode === "dark" ? "bg-secondary" : "bg-background"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="relative h-60 rounded-t-3xl">
                <img
                  src={selectedPsychologist.image}
                  alt={selectedPsychologist.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 ${
                    darkMode === "dark"
                      ? "bg-gradient-to-t from-accent/80 to-accent/40"
                      : "bg-gradient-to-t from-primary/80 to-primary/40"
                  }`}
                ></div>

                <button
                  onClick={() => setSelectedPsychologist(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-surface/20 backdrop-blur-sm rounded-full flex items-center justify-center text-surface hover:bg-surface/30 transition-colors"
                >
                  ✕
                </button>

                <div className="absolute bottom-6 left-6 text-surface">
                  <h3 className="text-3xl font-bold mb-2">
                    {selectedPsychologist.name}
                  </h3>
                  <p className="text-lg opacity-90">
                    {selectedPsychologist.specialty}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="bg-surface/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                      ⭐ {selectedPsychologist.rating}
                    </span>
                    <span className="bg-surface/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                      {selectedPsychologist.experience}{" "}
                      {t("yearsExperience", "psychologists")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-8 space-y-8">
                {/* Informações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4
                      className={`text-lg font-semibold ${
                        darkMode === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("about", "psychologists")}
                    </h4>
                    <div className="space-y-3">
                      <div
                        className={`flex items-center gap-3 ${
                          darkMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        <span
                          className={
                            darkMode === "dark" ? "text-accent" : "text-primary"
                          }
                        >
                          🎓
                        </span>
                        <span>{selectedPsychologist.education}</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 ${
                          darkMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        <span
                          className={
                            darkMode === "dark" ? "text-accent" : "text-primary"
                          }
                        >
                          🧠
                        </span>
                        <span>{selectedPsychologist.approach}</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 ${
                          darkMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        <span
                          className={
                            darkMode === "dark" ? "text-accent" : "text-primary"
                          }
                        >
                          📍
                        </span>
                        <span>{selectedPsychologist.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4
                      className={`text-lg font-semibold ${
                        darkMode === "dark" ? "text-surface" : "text-primary"
                      }`}
                    >
                      {t("availability", "psychologists")}
                    </h4>
                    <div className="space-y-3">
                      <div
                        className={`flex items-center gap-3 ${
                          darkMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        <span
                          className={
                            darkMode === "dark" ? "text-accent" : "text-primary"
                          }
                        >
                          💰
                        </span>
                        <span>
                          {t("startingFrom", "psychologists")}{" "}
                          {selectedPsychologist.price}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-3 ${
                          darkMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        <span
                          className={
                            darkMode === "dark" ? "text-accent" : "text-primary"
                          }
                        >
                          🗣️
                        </span>
                        <span>
                          {t("languages", "psychologists")}:{" "}
                          {selectedPsychologist.languages.join(", ")}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-3 ${
                          darkMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        <span
                          className={
                            darkMode === "dark" ? "text-accent" : "text-primary"
                          }
                        >
                          ⏰
                        </span>
                        <span>{selectedPsychologist.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-4">
                  <h4
                    className={`text-lg font-semibold ${
                      darkMode === "dark" ? "text-surface" : "text-primary"
                    }`}
                  >
                    {t("about", "psychologists")}
                  </h4>
                  <p
                    className={`leading-relaxed ${
                      darkMode === "dark" ? "text-surface" : "text-primary"
                    }`}
                  >
                    {selectedPsychologist.bio}
                  </p>
                </div>

                {/* Especialidades */}
                <div className="space-y-4">
                  <h4
                    className={`text-lg font-semibold ${
                      darkMode === "dark" ? "text-surface" : "text-primary"
                    }`}
                  >
                    {t("specialties", "psychologists")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPsychologist.categories.map((category) => (
                      <span
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          darkMode === "dark"
                            ? "bg-accent/20 text-accent"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div
                  className={`flex flex-col sm:flex-row gap-4 pt-6 border-t ${
                    darkMode === "dark" ? "border-primary" : "border-primary/20"
                  }`}
                >
                  <button
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                      darkMode === "dark"
                        ? "bg-accent hover:bg-accent text-surface"
                        : "bg-primary hover:bg-primary text-surface"
                    }`}
                  >
                    {t("bookConsultation", "psychologists")}
                  </button>
                  <button
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all border-2 ${
                      darkMode === "dark"
                        ? "border-accent text-accent hover:bg-accent hover:text-surface"
                        : "border-primary text-primary hover:bg-primary hover:text-surface"
                    }`}
                  >
                    {t("chat", "psychologists")}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
