"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  // Garantir que está montado no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calcular posição do dropdown
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 160 + window.scrollX, // Alinha à direita
      });
    }
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      updateDropdownPosition();
      window.addEventListener("scroll", updateDropdownPosition);
      window.addEventListener("resize", updateDropdownPosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", updateDropdownPosition);
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [isOpen]);

  // Fechar com Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-label={`Idioma atual: ${currentLanguage.nativeName}. Clique para alterar`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-surface
          ${
            language === "pt" || language === "en" || language === "es"
              ? document.documentElement.classList.contains("dark")
                ? "bg-accent/90 hover:bg-accent"
                : "bg-primary/90 hover:bg-primary"
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

      {/* Dropdown renderizado via portal */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Selecionar idioma"
            className="fixed bg-background dark:bg-secondary border border-tertiary dark:border-secondary rounded-lg shadow-xl min-w-[160px] py-1 animate-in fade-in-0 zoom-in-95 duration-200"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 99999,
            }}
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
                    ? "bg-primary/10 dark:bg-accent/20 text-primary dark:text-accent"
                    : "text-primary dark:text-surface hover:bg-surface dark:hover:bg-secondary"
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
                    <span className="text-xs text-primary/60 dark:text-surface/60">
                      {lang.name}
                    </span>
                  )}
                </div>
                {lang.code === language && (
                  <div className="ml-auto">
                    <svg
                      className="w-4 h-4 text-primary"
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
          </div>,
          document.body
        )}
    </>
  );
}
