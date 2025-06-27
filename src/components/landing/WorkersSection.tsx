"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function WorkersSection() {
  const { t } = useLanguage();
  // const colors = useColors();
  const { darkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Stories com dados mockados para vídeos
  const stories = [
    {
      id: 1,
      name: "Ana Paula",
      title: "Como a terapia me ajudou a lidar com a solidão",
      category: "Adaptação Cultural",
      location: "Londres, Reino Unido",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      gradient: "from-teal-500 to-cyan-400",
      description: "Descobri como criar vínculos mesmo longe de casa",
    },
    {
      id: 2,
      name: "Marina Santos",
      title: "Ser mãe longe da família: minha jornada de autoconhecimento",
      category: "Maternidade",
      location: "Toronto, Canadá",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      gradient: "from-blue-500 to-indigo-500",
      description: "Aprendi a ser mãe sem a rede de apoio tradicional",
    },
    {
      id: 3,
      name: "Carla Mendes",
      title: "Superando a síndrome do impostor em outro país",
      category: "Vida Profissional",
      location: "Berlin, Alemanha",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      gradient: "from-purple-500 to-pink-500",
      description: "Como encontrei confiança no meu trabalho no exterior",
    },
    {
      id: 4,
      name: "Rafael Silva",
      title: "Mantendo vínculos familiares através dos oceanos",
      category: "Relacionamentos",
      location: "Sydney, Austrália",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      gradient: "from-green-500 to-emerald-400",
      description: "Estratégias para manter família unida à distância",
    },
    {
      id: 5,
      name: "Beatriz Costa",
      title: "Reconstruindo identidade em uma nova cultura",
      category: "Identidade",
      location: "Paris, França",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      gradient: "from-orange-500 to-red-500",
      description: "Equilibrando minhas raízes com nova identidade",
    },
  ];

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        darkMode === "dark" ? "bg-secondary" : "bg-surface"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span
              className={`font-semibold text-sm uppercase tracking-wide ${
                darkMode === "dark" ? "text-accent" : "text-primary"
              }`}
            >
              {t("tag", "stories")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode === "dark" ? "text-surface" : "text-primary"
            }`}
          >
            HERE OUR{" "}
            <span
              className={darkMode === "dark" ? "text-accent" : "text-primary"}
            >
              STORIES
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`max-w-3xl mx-auto text-lg leading-relaxed ${
              darkMode === "dark" ? "text-surface" : "text-primary"
            }`}
          >
            Real voices from the front lines of change. These are
            <br />
            the people shaping their communities — and the future.
          </motion.p>
        </div>

        {/* Interactive Stories */}
        <div className="relative mb-16">
          {/* Linha de conexão */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-tertiary dark:bg-secondary transform -translate-y-1/2"></div>

          {/* Stories Cards */}
          <div className="relative flex flex-wrap justify-center md:justify-between items-center gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card principal */}
                <div
                  className={`relative transition-all duration-500 ${
                    hoveredIndex === index
                      ? "w-80 h-48 rounded-2xl"
                      : "w-24 h-24 md:w-32 md:h-32 rounded-full"
                  }`}
                >
                  {/* Imagem de fundo */}
                  <div
                    className={`absolute inset-0 overflow-hidden transition-all duration-500 ${
                      hoveredIndex === index ? "rounded-2xl" : "rounded-full"
                    }`}
                  >
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-80`}
                    ></div>
                  </div>

                  {/* Conteúdo expandido */}
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-surface z-10"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium bg-surface/20 backdrop-blur-sm rounded-full px-3 py-1">
                            {story.category}
                          </span>
                          {/* Play button */}
                          <div className="w-10 h-10 bg-surface/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-surface/30 transition-colors">
                            <svg
                              className="w-5 h-5 ml-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-sm opacity-90 line-clamp-2">
                          {story.description}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm font-medium">{story.name}</p>
                        <p className="text-xs opacity-80">{story.location}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Nome quando não expandido */}
                  {hoveredIndex !== index && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
                      <p
                        className={`text-sm font-medium text-center whitespace-nowrap ${
                          darkMode === "dark" ? "text-surface" : "text-primary"
                        }`}
                      >
                        {story.name.split(" ")[0]}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial destacado com fundo mais claro */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-2xl p-8 shadow-lg mb-16 ${
            darkMode === "dark"
              ? "bg-secondary"
              : "bg-background border border-tertiary"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
                  alt="Marina S."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <blockquote
                className={`text-xl italic mb-4 ${
                  darkMode === "dark" ? "text-surface" : "text-primary"
                }`}
              >
                &ldquo;Viver no exterior trouxe desafios que eu não esperava. A
                terapia me ajudou a entender que é normal sentir saudade e que
                posso criar minha nova identidade sem perder minhas
                raízes.&rdquo;"
              </blockquote>
              <div
                className={`font-semibold ${
                  darkMode === "dark" ? "text-surface" : "text-primary"
                }`}
              >
                Marina S.
              </div>
              <div
                className={`text-sm ${
                  darkMode === "dark" ? "text-surface" : "text-primary"
                }`}
              >
                Brasileira em Londres • 2 anos de terapia
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className={`rounded-xl px-8 py-3 font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl ${
              darkMode === "dark"
                ? "bg-accent hover:bg-accent text-surface"
                : "bg-primary hover:bg-primary text-surface"
            }`}
          >
            Compartilhar Minha História
          </button>
          <button
            className={`rounded-xl px-8 py-3 font-semibold transition-all hover:scale-105 shadow-md border ${
              darkMode === "dark"
                ? "bg-secondary hover:bg-secondary text-surface border-secondary"
                : "bg-secondary hover:bg-secondary text-surface border-secondary"
            }`}
          >
            Ver Mais Histórias
          </button>
        </motion.div>
      </div>
    </section>
  );
}
