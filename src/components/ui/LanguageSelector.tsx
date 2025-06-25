"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

type Language = "pt" | "en" | "es";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: "pt", name: "Português", flag: "🇧🇷", nativeName: "Português" },
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "es", name: "Español", flag: "🇪🇸", nativeName: "Español" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fechar com Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-label={`Idioma atual: ${currentLanguage.nativeName}. Clique para alterar`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-white
          ${
            language === "pt" || language === "en" || language === "es"
              ? document.documentElement.classList.contains("dark")
                ? "bg-teal-500/90 hover:bg-teal-600/90"
                : "bg-orange-500/90 hover:bg-orange-600/90"
              : ""
          }
        `}
      >
        <span
          className="text-lg"
          role="img"
          aria-label={`Bandeira ${currentLanguage.name}`}
        >
          {currentLanguage.flag}
        </span>
        <span className="text-sm font-medium min-w-[3rem] text-left">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Selecionar idioma"
          className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 min-w-[160px] py-1 animate-in fade-in-0 zoom-in-95 duration-200"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleLanguageChange(lang.code);
                }
              }}
              role="option"
              aria-selected={lang.code === language}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors duration-200 ${
                lang.code === language
                  ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <span
                className="text-lg"
                role="img"
                aria-label={`Bandeira ${lang.name}`}
              >
                {lang.flag}
              </span>
              <div className="flex flex-col">
                <span className="font-medium">{lang.nativeName}</span>
                {lang.name !== lang.nativeName && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {lang.name}
                  </span>
                )}
              </div>
              {lang.code === language && (
                <div className="ml-auto">
                  <svg
                    className="w-4 h-4 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
