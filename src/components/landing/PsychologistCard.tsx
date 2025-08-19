import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

type Psychologist = {
  id: number;
  name: string;
  specialty: string;
  categories: string[];
  experience: string;
  rating: number;
  price: string;
  location: string;
  languages: string[];
  bio: string;
  education: string;
  approach: string;
  availability: string;
  image: string;
};

type Props = {
  data: Psychologist;
  onClick?: () => void;
};

export default function PsychologistCard({ data, onClick }: Props) {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [position, setPosition] = useState<"right" | "left" | "top" | "bottom">(
    "right"
  );

  // Detecta a melhor posição para o painel
  const calculatePosition = () => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const spaceRight = viewport.width - rect.right;
    const spaceLeft = rect.left;
    // const spaceTop = rect.top;
    const spaceBottom = viewport.height - rect.bottom;

    // Prioriza direita, depois esquerda, depois baixo, por último cima
    if (spaceRight >= 360) {
      setPosition("right");
    } else if (spaceLeft >= 360) {
      setPosition("left");
    } else if (spaceBottom >= 280) {
      setPosition("bottom");
    } else {
      setPosition("top");
    }
  };

  const handleShowDetails = () => {
    calculatePosition();
    setShowDetails(true);
  };

  // Fecha o painel ao clicar fora (mobile)
  useEffect(() => {
    if (!showDetails) return;
    function handleClick(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowDetails(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDetails]);

  return (
    <div
      ref={cardRef}
      className={`relative card-elevated cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
        darkMode === "dark" ? "dark" : ""
      }`}
      onClick={() => {
        if (onClick) onClick();
        if (window.innerWidth <= 768) handleShowDetails();
      }}
      style={{
        width: "200px",
        height: "180px",
      }}
    >
      {/* Card principal */}
      <div className="flex flex-col items-center h-full justify-around p-4">
        <img
          src={data.image}
          alt={data.name}
          className={`w-16 h-16 rounded-full object-cover border-2 mb-2 shadow-sm ${
            darkMode === "dark" ? "border-accent" : "border-primary"
          }`}
        />
        <div className="font-semibold text-lg text-center text-heading">
          {data.name}
        </div>
      </div>

      {/* Painel de detalhes absoluto */}
      <div
        className={`
          absolute z-50 w-[340px] card-elevated p-6
          transition-all duration-300 ease-in-out
          ${darkMode === "dark" ? "dark" : ""}
          ${
            showDetails
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
          ${position === "right" ? "left-full ml-4 top-0" : ""}
          ${position === "left" ? "right-full mr-4 top-0" : ""}
          ${
            position === "bottom"
              ? "top-full mt-4 left-1/2 transform -translate-x-1/2"
              : ""
          }
          ${
            position === "top"
              ? "bottom-full mb-4 left-1/2 transform -translate-x-1/2"
              : ""
          }
        `}
        style={{
          minHeight: "280px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        }}
      >
        {/* Seta indicadora */}
        <div
          className={`
            absolute w-3 h-3 border transform rotate-45
            ${
              darkMode === "dark"
                ? "bg-secondary border-primary"
                : "bg-background border-primary/20"
            }
            ${position === "right" ? "-left-1.5 top-6" : ""}
            ${position === "left" ? "-right-1.5 top-6" : ""}
            ${
              position === "bottom"
                ? "-top-1.5 left-1/2 transform -translate-x-1/2 rotate-45"
                : ""
            }
            ${
              position === "top"
                ? "-bottom-1.5 left-1/2 transform -translate-x-1/2 rotate-45"
                : ""
            }
          `}
        />

        {/* Botão de fechar para mobile */}
        <button
          className={`absolute top-2 right-2 text-primary text-xl font-bold md:hidden transition-colors ${
            darkMode === "dark" ? "hover:text-accent" : "hover:text-accent"
          }`}
          onClick={() => setShowDetails(false)}
          aria-label={t("close", "common")}
        >
          ×
        </button>

        <div
          className={`font-bold text-lg mb-1 ${
            darkMode === "dark" ? "text-surface" : "text-primary"
          }`}
        >
          {data.name}
        </div>
        <div
          className={`mb-3 ${
            darkMode === "dark" ? "text-accent" : "text-primary"
          }`}
        >
          {data.specialty}
        </div>

        <div
          className={`space-y-2 text-sm ${
            darkMode === "dark" ? "text-surface" : "text-primary"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={darkMode === "dark" ? "text-accent" : "text-primary"}
            >
              ⭐
            </span>
            <span>
              {data.rating} • {data.experience}{" "}
              {t("yearsExperience", "psychologists")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={darkMode === "dark" ? "text-accent" : "text-primary"}
            >
              📍
            </span>
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={darkMode === "dark" ? "text-accent" : "text-primary"}
            >
              💰
            </span>
            <span>
              {t("startingFrom", "psychologists")} {data.price}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={darkMode === "dark" ? "text-accent" : "text-primary"}
            >
              🗣️
            </span>
            <span>
              {t("languages", "psychologists")}: {data.languages.join(", ")}
            </span>
          </div>
        </div>

        <div
          className={`mt-4 pt-4 border-t ${
            darkMode === "dark" ? "border-primary" : "border-primary/20"
          }`}
        >
          <p
            className={`text-sm mb-3 line-clamp-3 ${
              darkMode === "dark" ? "text-surface" : "text-primary"
            }`}
          >
            {data.bio}
          </p>
          <button
            className={`w-full px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow-md text-surface ${
              darkMode === "dark"
                ? "bg-accent hover:bg-accent"
                : "bg-primary hover:bg-primary"
            }`}
          >
            {t("bookConsultation", "psychologists")}
          </button>
        </div>
      </div>
    </div>
  );
}
