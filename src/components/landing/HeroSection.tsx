"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  LanguageSelector,
  ThemeToggle,
  ThemeSelector,
  CompactThemeSelector,
} from "@/components/ui";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Todos os hooks devem ser chamados no topo da função
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Aguarda a hidratação antes de renderizar o conteúdo completo
  if (!mounted) {
    return <div className="min-h-screen bg-surface animate-pulse" />;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-primary transition-colors duration-300">
      {/* Header fixo - Estrutura otimizada com Flexbox */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 z-50 w-full backdrop-blur-md shadow-sm bg-surface/90 border-b border-divider overflow-visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          {/* Flexbox principal do header */}
          <div className="flex items-center justify-between min-h-14 sm:min-h-16 py-2 gap-2 sm:gap-4">
            {/* Seção esquerda: Logo e controles de tema */}
            <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink-0">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text whitespace-nowrap">
                  Expatriamente
                </h1>
              </Link>

              {/* Controles de tema - Mobile e Tablet: paleta e claro/escuro */}
              <div className="flex xl:hidden items-center gap-1 ml-1">
                <CompactThemeSelector />
                <div className="scale-75">
                  <ThemeToggle />
                </div>
              </div>

              {/* Controles de tema - Desktop: completo */}
              <div className="hidden xl:flex items-center gap-1 ml-1">
                <div className="scale-75">
                  <ThemeToggle />
                </div>
                <div className="scale-90">
                  <ThemeSelector />
                </div>
              </div>
            </div>

            {/* Seção central: Navegação principal (centro flexível) */}
            <nav className="hidden md:flex flex-1 justify-center max-w-md lg:max-w-lg">
              <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 lg:gap-x-3">
                <Link
                  href="#"
                  className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("home", "navbar")}
                </Link>
                <Link
                  href="#"
                  className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("aboutUs", "navbar")}
                </Link>
                <Link
                  href="#"
                  className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("services", "navbar")}
                </Link>
                <Link
                  href="#"
                  className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("psychologists", "navbar")}
                </Link>
                <Link
                  href="#"
                  className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("blog", "navbar")}
                </Link>
              </div>
            </nav>

            {/* Seção direita: CTAs e seletores */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Seletor de idioma - sempre visível */}
              <div className="scale-90 flex-shrink-0">
                <LanguageSelector />
              </div>

              {/* Login padrão - visível em todas as telas exceto mobile */}
              <Link
                href="/auth/signin"
                className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 text-primary hover:text-accent hover:bg-surface-elevated"
                aria-label="Fazer login"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden md:inline">Entrar</span>
              </Link>

              {/* Menu hamburger - móvel */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-surface-elevated transition-colors flex-shrink-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu mobile - dropdown */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-divider bg-surface/95 backdrop-blur-sm"
            >
              <div className="py-4 space-y-2">
                {/* Links de navegação */}
                <div className="space-y-1">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-surface-elevated rounded-md transition-colors"
                  >
                    {t("home", "navbar")}
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-surface-elevated rounded-md transition-colors"
                  >
                    {t("aboutUs", "navbar")}
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-surface-elevated rounded-md transition-colors"
                  >
                    {t("services", "navbar")}
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-surface-elevated rounded-md transition-colors"
                  >
                    {t("psychologists", "navbar")}
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-surface-elevated rounded-md transition-colors"
                  >
                    {t("blog", "navbar")}
                  </Link>
                </div>

                {/* Divisor */}
                <div className="border-t border-divider my-3"></div>

                {/* Controles de tema - móvel */}
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm font-medium text-primary">Tema</span>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <ThemeSelector />
                  </div>
                </div>

                {/* Botões de ação - móvel */}
                <div className="px-4 pt-2 space-y-2">
                  <Link
                    href="/auth/signin"
                    className="block w-full px-4 py-2 text-center border rounded-md text-sm font-medium transition-all text-primary border-divider hover:border-accent hover:bg-surface-elevated"
                  >
                    {t("signIn", "navbar")}
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="block w-full px-4 py-2 text-center rounded-md text-sm font-medium transition-all bg-accent hover:bg-accent/90 text-surface"
                  >
                    {t("register", "navbar")}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Background com gradiente e imagem */}
      <div className="absolute inset-0">
        {/* Gradiente de fundo */}
        <div className="absolute inset-0 bg-background" />

        {/* Formas geométricas decorativas */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-accent/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-32 right-20 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-accent/25 rounded-full blur-xl animate-pulse delay-2000" />

        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-surface/10" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 pt-16">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge de confiança */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-surface backdrop-blur-sm rounded-full px-4 py-2 text-sm text-primary border border-divider mb-8 mt-8"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            {t("trustBadge", "hero")}
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 w-3/4 sm:w-1/2 text-center"
          >
            <span className="text-secondary">{t("title", "hero")}</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-primary leading-relaxed mb-8 w-2/3 mx-auto"
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
              className="bg-accent hover:bg-accent/90 text-surface px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl border border-accent"
            >
              {t("cta", "hero")}
            </Link>
            <Link
              href="#psychologists"
              className="bg-surface hover:bg-surface/80 text-primary backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-md border border-accent"
            >
              {t("ctaSecondary", "hero")}
            </Link>
          </motion.div>

          {/* Features destacados */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-4xl mx-auto my-14"
          >
            <div className="flex items-center justify-center gap-3 bg-surface backdrop-blur-sm rounded-lg px-4 py-3 border border-divider">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-primary">
                Sessões Online Seguras
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-surface backdrop-blur-sm rounded-lg px-4 py-3 border border-divider">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary"
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
              <span className="text-sm font-medium text-primary">
                Especialistas em Expatriação
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-surface backdrop-blur-sm rounded-lg px-4 py-3 border border-divider">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-accent"
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
              <span className="text-sm font-medium text-primary">
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
        className="absolute bottom-72 sm:bottom-32 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-primary">Deslize para saber mais</span>
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
