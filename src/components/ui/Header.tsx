"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigation } from "@/context/NavigationContext";
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
import { FiUser, FiMenu, FiX, FiChevronDown, FiLogIn } from "react-icons/fi";
import { LoadingSpinner } from "./LoadingSpinner";

export default function Header({
  backgroundColor,
}: {
  backgroundColor?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const { t } = useLanguage();
  const { currentSection, setCurrentSection } = useNavigation();
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
    // Se estamos na landing page (pathname === "/"), usar setCurrentSection
    if (pathname === "/") {
      if (path === "/") {
        setCurrentSection("home");
      } else if (path === "/sobre") {
        setCurrentSection("about");
      } else if (path === "/servicos") {
        setCurrentSection("services");
      } else if (path === "/intercambio") {
        setCurrentSection("intercambio");
      } else if (path === "/expatriados") {
        setCurrentSection("expatriados");
      }
    } else {
      // Se estamos em outra página (como página dinâmica), redirecionar para home com componente específico
      if (path === "/sobre") {
        router.push("/?section=about");
      } else if (path === "/servicos") {
        router.push("/?section=services");
      } else if (path === "/intercambio") {
        router.push("/?section=intercambio");
      } else if (path === "/expatriados") {
        router.push("/?section=expatriados");
      } else {
        router.push(path);
      }
    }

    setIsMobileMenuOpen(false); // Fecha o menu mobile após navegação
    setIsServicesDropdownOpen(false); // Fecha o dropdown após navegação
  };

  const handleLoginClick = async () => {
    setIsLoginLoading(true);

    // Simular um pequeno delay para mostrar o loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (user) {
      if (user.role === "ADMIN") router.push("/dashboard/admin");
      else if (user.role === "EMPLOYEE") router.push("/dashboard/employee");
      else router.push("/dashboard/client");
    } else {
      router.push("/auth/signin");
    }

    setIsLoginLoading(false);
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
      className={`bg-transparent shadow-none h-20 md:h-24 xl:h-28 z-50 relative pt-4 md:pt-8 xl:pt-12`}
    >
      <div className="flex items-start gap-5 h-full px-4 md:px-8 lg:px-20">
        {/* Esquerda: Logo */}
        <div className="flex items-center">
          <Image
            src="/logoFinal.svg"
            alt="Expatriamente Logo"
            width={100}
            height={100}
            className="object-contain w-[14vw] h-[14vw] lg:w-[10vw] lg:h-[10vw]"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-col flex-1">
          <div className="flex flex-row items-center">
            <span className="font-akzidens text-[2.8vw] text-[#587861] leading-none tracking-tight">
              Expatriamente
            </span>
            <nav className="font-akzidens text-[1.2vw] font-medium text-[#587861] flex-1 flex justify-around items-center gap-[2vw] ml-[2vw]">
              <button
                onClick={() => handleNavigation("/")}
                className={`hover:text-[#ffffff] hover:scale-105 bg-transparent border-none cursor-pointer transition-all duration-300 ease-in-out ${
                  currentSection === "home"
                    ? "font-bold text-[#587861] scale-105"
                    : ""
                }`}
              >
                Início
              </button>
              <button
                onClick={() => handleNavigation("/sobre")}
                className={`hover:text-[#ffffff] hover:scale-105 bg-transparent border-none cursor-pointer transition-all duration-300 ease-in-out ${
                  currentSection === "about"
                    ? "font-bold text-[#587861] scale-105"
                    : ""
                }`}
              >
                Sobre Nós
              </button>

              {/* Dropdown Serviços */}
              <div className="relative group">
                <button
                  onClick={() => handleNavigation("/servicos")}
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  className={`hover:text-[#ffffff] hover:scale-105 bg-transparent border-none cursor-pointer transition-all duration-300 ease-in-out flex items-center gap-1 ${
                    currentSection === "services" ||
                    currentSection === "intercambio" ||
                    currentSection === "expatriados"
                      ? "font-bold text-[#587861] scale-105"
                      : ""
                  }`}
                >
                  Serviços
                  <FiChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[220px] z-50 overflow-hidden backdrop-blur-sm"
                      onMouseLeave={() => setIsServicesDropdownOpen(false)}
                    >
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 }}
                        onClick={() => handleNavigation("/intercambio")}
                        className="w-full px-5 py-4 text-left hover:bg-gradient-to-r hover:from-[#587861] hover:to-[#587861] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out font-akzidens text-[1.1vw] text-[#587861] border-b border-gray-50 last:border-b-0 relative group"
                      >
                        <span className="relative z-10">Intercâmbio</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#587861]/5 to-[#587861]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => handleNavigation("/expatriados")}
                        className="w-full px-5 py-4 text-left hover:bg-gradient-to-r hover:from-[#587861] hover:to-[#587861] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out font-akzidens text-[1.1vw] text-[#587861] border-b border-gray-50 last:border-b-0 relative group"
                      >
                        <span className="relative z-10">Expatriados</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#587861]/5 to-[#587861]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => handleNavigation("/psicanalistas")}
                className="hover:text-[#ffffff] hover:scale-105 bg-transparent border-none cursor-pointer transition-all duration-300 ease-in-out"
              >
                Psicanalistas
              </button>
            </nav>

            {/* Ícone de login à extrema direita com loading */}
            <button
              className="ml-auto flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full hover:bg-gradient-to-r hover:from-[#587861]/10 hover:to-[#587861]/10 hover:scale-110 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
              title={user ? "Ir para o dashboard" : "Entrar"}
              onClick={handleLoginClick}
              disabled={isLoginLoading}
            >
              {isLoginLoading ? (
                <LoadingSpinner size="sm" color="blue" />
              ) : user ? (
                <FiUser
                  size={24}
                  className="lg:w-7 lg:h-7 text-[#587861] transition-colors duration-300"
                />
              ) : (
                <FiLogIn
                  size={24}
                  className="lg:w-7 lg:h-7 text-[#587861] transition-colors duration-300"
                />
              )}
            </button>
          </div>

          {/* Linha horizontal alinhada apenas com textos e menu */}
          <div className="w-full flex flex-row">
            <div className="border-b border-[#587861] flex-1" />
          </div>
          <span className="font-akzidens text-[1.04vw] ml-[0.2vw] text-[#ffffff] text-opacity-50 leading-none tracking-tight mt-[0.5vw] font-medium">
            Psicanálise para brasileiros no exterior
          </span>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex flex-col flex-1">
          <div className="flex flex-row items-center justify-between">
            <span className="font-akzidens text-[5.4vw] sm:text-[4vw] text-[#4F200D] leading-none tracking-tight">
              Expatriamente
            </span>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center pb-1 rounded-full hover:bg-white/20 transition-colors"
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
              className="absolute top-full left-0 right-0 bg-[#E8F4F8] shadow-lg border-t border-white/20"
            >
              <nav className="flex flex-col py-4">
                <button
                  onClick={() => handleNavigation("/")}
                  className={`px-6 py-3 text-left font-akzidens text-base font-medium text-[#587861] hover:bg-white/10 transition-colors ${
                    currentSection === "home" ? "bg-white/20" : ""
                  }`}
                >
                  Início
                </button>
                <button
                  onClick={() => handleNavigation("/sobre")}
                  className={`px-6 py-3 text-left font-akzidens text-base font-medium text-[#587861] hover:bg-white/10 transition-colors ${
                    currentSection === "about" ? "bg-white/20" : ""
                  }`}
                >
                  Sobre Nós
                </button>

                {/* Mobile Serviços com submenu */}
                <div className="border-t border-white/10">
                  <button
                    onClick={() => handleNavigation("/servicos")}
                    className={`w-full px-6 py-3 text-left font-akzidens text-base font-medium text-[#587861] hover:bg-white/10 transition-colors ${
                      currentSection === "services" ? "bg-white/20" : ""
                    }`}
                  >
                    Serviços
                  </button>
                  <div className="bg-white/5">
                    <button
                      onClick={() => handleNavigation("/intercambio")}
                      className={`w-full px-8 py-2 text-left font-akzidens text-sm font-medium text-[#587861] hover:bg-white/10 transition-colors ${
                        currentSection === "intercambio" ? "bg-white/20" : ""
                      }`}
                    >
                      Intercâmbio
                    </button>
                    <button
                      onClick={() => handleNavigation("/expatriados")}
                      className={`w-full px-8 py-2 text-left font-akzidens text-sm font-medium text-[#587861] hover:bg-white/10 transition-colors ${
                        currentSection === "expatriados" ? "bg-white/20" : ""
                      }`}
                    >
                      Expatriados
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleNavigation("/psicanalistas")}
                  className="px-6 py-3 text-left font-akzidens text-base font-medium text-[#587861] hover:bg-white/10 transition-colors"
                >
                  Psicanalistas
                </button>

                {/* Login button no mobile menu */}
                <div className="border-t border-white/10">
                  <button
                    onClick={handleLoginClick}
                    disabled={isLoginLoading}
                    className="w-full px-6 py-3 text-left font-akzidens text-base font-medium text-[#587861] hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    {isLoginLoading ? (
                      <>
                        <LoadingSpinner size="sm" color="blue" />
                        <span>Carregando...</span>
                      </>
                    ) : (
                      <>
                        <FiUser size={16} />
                        <span>{user ? "Dashboard" : "Entrar"}</span>
                      </>
                    )}
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
