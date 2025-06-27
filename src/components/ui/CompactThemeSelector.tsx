"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/config/design/themes";

const themeOptions = [
  { key: "theme1", name: "Opção 1 - Terroso", preview: "#5F6F52" },
  { key: "theme2", name: "Opção 2 - Azul/Cinza", preview: "#071739" },
  { key: "theme3", name: "Opção 3 - Marrom/Azul", preview: "#75564d" },
] as const;

export default function CompactThemeSelector() {
  const { colorTheme, setColorTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    themeOptions.find((option) => option.key === colorTheme) || themeOptions[0];

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
        left: rect.left + window.scrollX, // Alinha à esquerda para mobile
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

  const handleThemeChange = (themeKey: typeof colorTheme) => {
    setColorTheme(themeKey);
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
        aria-label={`Tema atual: ${currentOption.name}. Clique para alterar`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="p-2 rounded-lg transition-all duration-200 hover:bg-surface-elevated flex-shrink-0"
      >
        {/* Ícone de paleta de cores com preview da cor atual */}
        <div className="relative">
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
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V5z"
            />
          </svg>
          {/* Pequeno preview da cor atual */}
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
            style={{ backgroundColor: currentOption.preview }}
          />
        </div>
      </button>

      {/* Dropdown renderizado via portal */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Selecionar tema de cores"
            className="fixed bg-surface-elevated border border-border rounded-lg shadow-xl min-w-[200px] py-1 animate-in fade-in-0 zoom-in-95 duration-200"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 99999,
            }}
          >
            {themeOptions.map((option) => (
              <button
                key={option.key}
                onClick={() =>
                  handleThemeChange(option.key as typeof colorTheme)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleThemeChange(option.key as typeof colorTheme);
                  }
                }}
                role="option"
                aria-selected={option.key === colorTheme}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-200 ${
                  option.key === colorTheme
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-primary hover:bg-hover"
                }`}
              >
                {/* Preview da cor */}
                <div
                  className="w-5 h-5 rounded-full border border-border-strong flex-shrink-0"
                  style={{ backgroundColor: option.preview }}
                />

                {/* Nome do tema */}
                <div className="flex flex-col flex-1">
                  <span className="font-medium">{option.name}</span>
                </div>

                {/* Indicador de seleção */}
                {option.key === colorTheme && (
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
