"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector, ThemeToggle } from "@/components/ui";
import { useState, useEffect } from "react";
import { useColors } from "@/hooks/useColors";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  // Todos os hooks devem ser chamados no topo da função
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  const colors = useColors();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Aguarda a hidratação antes de renderizar o conteúdo completo
  if (!mounted) {
    return <div className="min-h-screen bg-gray-100 animate-pulse" />;
  }

  // Estilo inline para teste
  const sectionStyle = {
    backgroundColor: darkMode === "dark" ? "#111827" : "#ffffff",
    color: darkMode === "dark" ? "#ffffff" : "#000000",
    transition: "all 0.3s ease",
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={sectionStyle}
    >
      {/* Navbar fixo */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 z-50 w-full backdrop-blur-md shadow-md ${
          darkMode === "dark"
            ? "text-white hover:text-teal-400 bg-gray-800"
            : "text-gray-900 hover:text-orange-500 bg-white"
        }`}
      >
        <div className="mx-20 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Esquerda: Logo + ThemeToggle + LanguageSelector */}
            <div className="flex items-center gap-4 min-w-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
                Expatriamente
              </h1>
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {/* Centro: Menu de navegação centralizado */}
            <div className="flex-1 flex justify-center min-w-0">
              <div className="flex items-center space-x-8 flex-wrap justify-center w-full">
                <Link
                  href="#"
                  className={`px-3 py-2 text-sm font-medium transition-colors break-words text-center ${
                    darkMode === "dark"
                      ? "text-white hover:text-teal-400"
                      : "text-gray-900 hover:text-orange-500"
                  }`}
                >
                  {t("home", "navbar")}
                </Link>
                <Link
                  href="#"
                  className={`px-3 py-2 text-sm font-medium transition-colors break-words text-center ${
                    darkMode === "dark"
                      ? "text-white hover:text-teal-400"
                      : "text-gray-900 hover:text-orange-500"
                  }`}
                >
                  {t("aboutUs", "navbar")}
                </Link>
                <Link
                  href="#"
                  className={`px-3 py-2 text-sm font-medium transition-colors break-words text-center ${
                    darkMode === "dark"
                      ? "text-white hover:text-teal-400"
                      : "text-gray-900 hover:text-orange-500"
                  }`}
                >
                  {t("services", "navbar")}
                </Link>
                <Link
                  href="#"
                  className={`px-3 py-2 text-sm font-medium transition-colors break-words text-center ${
                    darkMode === "dark"
                      ? "text-white hover:text-teal-400"
                      : "text-gray-900 hover:text-orange-500"
                  }`}
                >
                  {t("psychologists", "navbar")}
                </Link>
                <Link
                  href="#"
                  className={`px-3 py-2 text-sm font-medium transition-colors break-words text-center ${
                    darkMode === "dark"
                      ? "text-white hover:text-teal-400"
                      : "text-gray-900 hover:text-orange-500"
                  }`}
                >
                  {t("blog", "navbar")}
                </Link>
              </div>
            </div>

            {/* Direita: Botões de ação */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                  darkMode === "dark"
                    ? "text-white border-gray-600 hover:border-teal-400"
                    : "text-gray-900 border-gray-300 hover:border-orange-500"
                }`}
              >
                {t("signIn", "navbar")}
              </Link>
              <Link
                href="/auth/signin"
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-md w-full text-center ${
                  darkMode === "dark"
                    ? "bg-teal-500 hover:bg-teal-600 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {t("register", "navbar")}
              </Link>
            </div>

            {/* Menu mobile */}
            <div className="md:hidden">
              <button
                className={`text-gray-900 dark:text-gray-100 ${colors.primaryText} p-2`}
                style={{ color: darkMode === "dark" ? "#ffffff" : "#000000" }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Background com gradiente e imagem */}
      <div className="absolute inset-0">
        {/* Gradiente de fundo */}
        <div
          className={`absolute inset-0 ${
            colors.isDark
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
              : "bg-white"
          }`}
        />

        {/* Formas geométricas decorativas */}
        <div
          className={`absolute top-10 left-10 w-20 h-20 ${
            colors.isDark ? "bg-teal-200/30" : "bg-orange-200/30"
          } rounded-full blur-xl animate-pulse`}
        />
        <div
          className={`absolute top-32 right-20 w-32 h-32 ${
            colors.isDark ? "bg-blue-200/20" : "bg-amber-200/20"
          } rounded-full blur-2xl animate-pulse delay-1000`}
        />
        <div
          className={`absolute bottom-20 left-20 w-28 h-28 ${
            colors.isDark ? "bg-indigo-200/25" : "bg-yellow-200/25"
          } rounded-full blur-xl animate-pulse delay-2000`}
        />

        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge de confiança */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 mb-8"
            style={{ color: darkMode === "dark" ? "#d1d5db" : "#000000" }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {t("trustBadge", "hero")}
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6"
          >
            <span
              className={`${colors.gradient.full} bg-clip-text text-transparent`}
            >
              {t("title", "hero")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto"
            style={{ color: darkMode === "dark" ? "#d1d5db" : "#000000" }}
          >
            {t("subtitle", "hero")}
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/auth/signin"
              className={`${colors.button.primary} px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              {t("cta", "hero")}
            </Link>
            <Link
              href="#psychologists"
              className={`${colors.button.secondary} backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-md`}
            >
              {t("ctaSecondary", "hero")}
            </Link>
          </motion.div>

          {/* Features destacados */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-200/50 dark:border-gray-700/50">
              <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-teal-600 dark:text-teal-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sessões Online Seguras
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-200/50 dark:border-gray-700/50">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Especialistas em Expatriação
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-200/50 dark:border-gray-700/50">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Primera Consulta Grátis
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Deslize para saber mais
          </span>
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
