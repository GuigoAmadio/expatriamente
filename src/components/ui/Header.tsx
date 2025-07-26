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
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiUser, FiMenu, FiX } from "react-icons/fi";

export default function Header({
  backgroundColor,
}: {
  backgroundColor?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  function handleNav(sectionId: string) {
    if (pathname === "/") {
      // Já na landing, scroll suave
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Em outra rota, navega para home e scrolla após carregar
      router.push(`/#${sectionId}`);
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Fecha o menu mobile após navegação
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fecha o menu mobile quando a tela é redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-14 sm:min-h-16 bg-transparent animate-pulse" />
    );
  }

  return (
    <header
      className={`bg-transparent shadow-none h-[110px] z-50 relative pt-20`}
    >
      <div className="flex items-start gap-5 h-full px-4 md:px-8 lg:px-20">
        {/* Esquerda: Logo */}
        <div className="flex items-center">
          <Image
            src="/logoFinal.svg"
            alt="Expatriamente Logo"
            width={160}
            height={160}
            className="object-contain"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-col flex-1">
          <div className="flex flex-row items-center">
            <span className="font-akzidens text-[28px] lg:text-[38px] text-[#4F200D] leading-none tracking-tight">
              Expatriamente
            </span>
            <nav className="font-akzidens text-sm lg:text-base font-medium text-blue-900 flex-1 flex justify-center items-center gap-8 lg:gap-12 ml-8 lg:ml-16">
              <button
                onClick={() => handleNavigation("/")}
                className="hover:underline bg-transparent border-none cursor-pointer transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => handleNavigation("/sobre")}
                className="hover:underline bg-transparent border-none cursor-pointer transition-colors"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => handleNavigation("/servicos")}
                className="hover:underline bg-transparent border-none cursor-pointer transition-colors"
              >
                Serviços
              </button>
              <button
                onClick={() => handleNavigation("/psicanalistas")}
                className="hover:underline bg-transparent border-none cursor-pointer transition-colors"
              >
                Psicanalistas
              </button>
            </nav>
            {/* Ícone de login à extrema direita */}
            <button
              className="ml-auto flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full hover:bg-white/20 transition-colors"
              title={user ? "Ir para o dashboard" : "Entrar"}
              onClick={() => {
                if (user) {
                  if (user.role === "ADMIN") router.push("/dashboard/admin");
                  else if (user.role === "EMPLOYEE")
                    router.push("/dashboard/employee");
                  else router.push("/dashboard/client");
                } else {
                  router.push("/auth/signin");
                }
              }}
            >
              <FiUser size={24} className="lg:w-7 lg:h-7 text-blue-900" />
            </button>
          </div>
          {/* Linha horizontal alinhada apenas com textos e menu */}
          <div className="w-full flex flex-row">
            <div className="border-b border-blue-900 flex-1" />
          </div>
          <span className="font-akzidens text-[14px] ml-1 text-blue-900 leading-none tracking-tight mt-1 font-medium">
            Psicanálise para brasileiros no exterior
          </span>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex flex-col flex-1">
          <div className="flex flex-row items-center justify-between">
            <span className="font-akzidens text-xl text-[#4F200D] leading-none tracking-tight">
              Expatriamente
            </span>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX size={24} className="text-white" />
              ) : (
                <FiMenu size={24} className="text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-[#A6C0B3] shadow-lg border-t border-white/20"
            >
              <nav className="flex flex-col py-4">
                <button
                  onClick={() => handleNavigation("/")}
                  className="px-6 py-3 text-left font-akzidens text-base font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Início
                </button>
                <button
                  onClick={() => handleNavigation("/sobre")}
                  className="px-6 py-3 text-left font-akzidens text-base font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Sobre Nós
                </button>
                <button
                  onClick={() => handleNavigation("/servicos")}
                  className="px-6 py-3 text-left font-akzidens text-base font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Serviços
                </button>
                <button
                  onClick={() => handleNavigation("/psicanalistas")}
                  className="px-6 py-3 text-left font-akzidens text-base font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Psicanalistas
                </button>
                <div className="border-t border-white/20 mt-2 pt-2">
                  <button
                    className="px-6 py-3 text-left font-akzidens text-base font-medium text-blue-900 hover:bg-white/10 transition-colors flex items-center gap-2"
                    onClick={() => {
                      if (user) {
                        if (user.role === "ADMIN")
                          router.push("/dashboard/admin");
                        else if (user.role === "EMPLOYEE")
                          router.push("/dashboard/employee");
                        else router.push("/dashboard/client");
                      } else {
                        router.push("/auth/signin");
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <FiUser size={20} />
                    {user ? "Dashboard" : "Entrar"}
                  </button>
                </div>
              </nav>
            </motion.div>
          )}

          {/* Linha horizontal e subtítulo para mobile */}
          <div className="w-full flex flex-row">
            <div className="border-b border-blue-900 flex-1" />
          </div>
          <span className="font-akzidens text-sm text-blue-900 leading-none tracking-tight mt-1 font-medium">
            Psicanálise para brasileiros no exterior
          </span>
        </div>
      </div>
    </header>
  );
}
