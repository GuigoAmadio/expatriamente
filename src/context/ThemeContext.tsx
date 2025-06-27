"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, Theme } from "@/config/design/themes";

type ThemeMode = "light" | "dark";
type ColorTheme = "theme1" | "theme2" | "theme3";

interface ThemeContextType {
  darkMode: ThemeMode;
  toggleDarkMode: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  currentTheme: Theme;
  getColors: () => Record<string, string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<ThemeMode>("light");
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("theme1");

  // Função para obter o tema atual baseado na combinação de colorTheme + darkMode
  const getCurrentTheme = (): Theme => {
    const themeName = darkMode === "dark" ? `${colorTheme}Dark` : colorTheme;
    const theme = themes.find((t) => t.name === themeName);

    if (!theme) {
      console.warn(`Tema ${themeName} não encontrado, usando tema padrão`);
      return themes[0]; // Fallback para o primeiro tema
    }

    return theme;
  };

  const currentTheme = getCurrentTheme();

  // Carrega as preferências salvas
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") as ThemeMode;
    const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme;

    if (savedDarkMode) {
      setDarkMode(savedDarkMode);
    }
    if (savedColorTheme) {
      setColorThemeState(savedColorTheme);
    }
  }, []);

  // Aplica o modo escuro/claro no HTML
  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Aplica as variáveis CSS do tema selecionado
  useEffect(() => {
    const root = document.documentElement;

    // Aplica dinamicamente todas as variáveis de cor presentes no tema
    Object.entries(currentTheme.colors).forEach(([token, value]) => {
      root.style.setProperty(
        `--color-${token.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`,
        value
      );
    });

    // Aplica fontes
    root.style.setProperty("--font-heading", currentTheme.fonts.heading);
    root.style.setProperty("--font-body", currentTheme.fonts.body);
  }, [currentTheme]);

  const toggleDarkMode = () => {
    const newMode = darkMode === "light" ? "dark" : "light";
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem("colorTheme", theme);
  };

  const getColors = () => currentTheme.colors;

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        colorTheme,
        setColorTheme,
        currentTheme,
        getColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
