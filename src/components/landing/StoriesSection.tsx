"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function StoriesSection() {
  const { t } = useLanguage();
  // const colors = useColors();
  const { darkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        darkMode === "dark" ? "bg-gray-900" : "bg-gray-50"
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
                darkMode === "dark" ? "text-teal-400" : "text-orange-500"
              }`}
            >
              {t("stories.tag")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t("stories.title")}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`max-w-3xl mx-auto text-lg leading-relaxed ${
              darkMode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("stories.subtitle")}
          </motion.p>
        </div>

        {/* Videos Inline */}
        <div className="relative mb-16 overflow-hidden">
          <div className="flex items-center justify-center gap-2 h-80">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative h-full cursor-pointer group overflow-hidden rounded-2xl"
                style={{
                  width: hoveredIndex === index ? "400px" : "120px",
                  transition: "width 0.5s ease-in-out",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${video.gradient} opacity-60`}
                  ></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content quando expandido */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                          {video.category}
                        </span>
                        <span className="text-xs font-medium bg-black/30 backdrop-blur-sm rounded px-2 py-1">
                          {video.duration}
                        </span>
                      </div>
                    </div>

                    {/* Play button centralizado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors group-hover:scale-110 duration-300">
                        <svg
                          className="w-8 h-8 ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>

                    {/* Título na parte inferior */}
                    <div className="mt-auto">
                      <h3 className="text-lg font-bold leading-tight">
                        {video.title}
                      </h3>
                    </div>
                  </motion.div>
                )}

                {/* Categoria label quando não expandido */}
                {hoveredIndex !== index && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-medium whitespace-nowrap">
                        {video.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Play button pequeno quando não expandido */}
                {hoveredIndex !== index && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 ml-0.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                )}
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
              ? "bg-gray-800"
              : "bg-white border border-gray-100"
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
                  darkMode === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("stories.testimonial.text")}
              </blockquote>
              <div
                className={`font-semibold ${
                  darkMode === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("stories.testimonial.name")}
              </div>
              <div
                className={`text-sm ${
                  darkMode === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("stories.testimonial.info")}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex text-yellow-400">
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
                ? "bg-teal-500 hover:bg-teal-600 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {t("stories.tellMyStory")}
          </button>
          <button
            className={`rounded-xl px-8 py-3 font-semibold transition-all hover:scale-105 shadow-md border ${
              darkMode === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                : "bg-gray-700 hover:bg-gray-800 text-white border-gray-700"
            }`}
          >
            {t("stories.seeAllStories")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
