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

export default function Header({
  backgroundColor,
}: {
  backgroundColor?: string;
}) {
  const [mounted, setMounted] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  // const { darkMode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-14 sm:min-h-16 bg-[#9EB7AA] animate-pulse" />;
  }

  return (
    <header
      className={`${
        backgroundColor === "white" ? "bg-white" : "bg-[#9EB7AA]"
      } shadow-none h-[110px] z-50`}
    >
      <div className="flex items-center h-full px-8 md:px-20">
        {/* Esquerda: Logo */}
        <div
          className="flex items-center flex-shrink-0"
          style={{ height: "90px" }}
        >
          <Image
            src="/logoFinal.svg"
            alt="Expatriamente Logo"
            width={90}
            height={90}
            className="object-contain"
            priority
          />
        </div>
        {/* Textos e menu */}
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center">
            <span className="font-akzidens text-4xl text-[#6B3F1D] leading-none tracking-tight">
              Expatriamente
            </span>
            <nav className="flex-1 flex justify-center items-center gap-12 ml-16">
              <button
                onClick={() => handleNav("hero")}
                className="font-akzidens text-lg text-[#01386F] hover:underline bg-transparent border-none cursor-pointer"
              >
                Início
              </button>
              <button
                onClick={() => handleNav("sobre")}
                className="font-akzidens text-lg text-[#01386F] hover:underline bg-transparent border-none cursor-pointer"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => handleNav("servicos")}
                className="font-akzidens text-lg text-[#01386F] hover:underline bg-transparent border-none cursor-pointer"
              >
                Serviços
              </button>
              <button
                onClick={() => handleNav("psicanalistas")}
                className="font-akzidens text-lg text-[#01386F] hover:underline bg-transparent border-none cursor-pointer"
              >
                Psicanalistas
              </button>
              <button
                onClick={() => handleNav("blog")}
                className="font-akzidens text-lg text-[#01386F] hover:underline bg-transparent border-none cursor-pointer"
              >
                Blog
              </button>
            </nav>
          </div>
          {/* Linha horizontal alinhada apenas com textos e menu */}
          <div className="w-full flex flex-row">
            <div className="border-b border-[#01386F] flex-1" />
          </div>
          <span className="font-akzidens text-base text-[#01386F] leading-none tracking-tight mt-1">
            Psicanálise para brasileiros no exterior
          </span>
        </div>
      </div>
    </header>
  );
}
