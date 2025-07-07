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
import Image from "next/image";

export default function Header() {
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
    return <div className="min-h-14 sm:min-h-16 bg-surface animate-pulse" />;
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 z-50 w-screen backdrop-blur-md shadow-sm bg-surface/90 border-b border-divider overflow-visible"
    >
      <div className="px-4 sm:px-6 overflow-visible">
        {/* Flexbox principal do header */}
        <div className="flex items-center justify-between py-1 gap-2 sm:gap-4">
          {/* Seção esquerda: Navegação principal OU Menu hamburger */}
          <div className="flex flex-1 justify-start">
            {/* Menu hamburger - aparece quando não há espaço para os links */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-surface-elevated transition-colors flex-shrink-0"
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

            {/* Links de navegação - visíveis apenas em telas grandes onde cabem */}
            <nav className="hidden lg:flex items-center justify-start">
              <div className="flex items-center justify-start gap-x-3">
                <Link
                  href="#"
                  className="px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("home", "navbar")}
                </Link>
                <Link
                  href="#"
                  className="px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("aboutUs", "navbar")}
                </Link>
                <Link
                  href="#"
                  className="px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("services", "navbar")}
                </Link>
                <Link
                  href="#"
                  className="px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("psychologists", "navbar")}
                </Link>
                <Link
                  href="#"
                  className="px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md text-primary hover:text-accent hover:bg-surface-elevated whitespace-nowrap"
                >
                  {t("blog", "navbar")}
                </Link>
              </div>
            </nav>
          </div>

          {/* Logo centralizada */}
          <div className="flex flex-1 justify-center items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/expatriamente_logo.png"
                alt="Expatriamente Logo"
                width={60}
                height={20}
                className="object-contain mx-auto"
                priority
              />
            </Link>
          </div>

          {/* Seção direita: Seletores e CTAs */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
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
          </div>
        </div>

        {/* Menu mobile - dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-divider bg-surface/95 backdrop-blur-sm"
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
  );
}
