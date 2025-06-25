"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ColorScheme = "orange" | "teal";
type DarkMode = "light" | "dark";

interface ThemeContextType {
  colorScheme: ColorScheme;
  darkMode: DarkMode;
  setColorScheme: (scheme: ColorScheme) => void;
  setDarkMode: (mode: DarkMode) => void;
  toggleDarkMode: () => void;
  // Helper para obter as classes CSS corretas
  getColors: () => {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    secondary: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<DarkMode>("light");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("orange");

  useEffect(() => {
    // Sempre começa em light mode
    const root = document.documentElement;
    root.classList.remove("dark");
    console.log("Iniciando em light mode");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
      setColorScheme("teal");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      setColorScheme("orange");
    }

    console.log(
      "Tema aplicado:",
      darkMode,
      "- Classe dark:",
      root.classList.contains("dark")
    );
    console.log("Body classes:", body.className);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getColors = () => {
    if (darkMode === "dark") {
      return {
        primary: "teal-500",
        primaryHover: "teal-600",
        primaryLight: "teal-400",
        secondary: "teal-900",
        accent: "teal-300",
      };
    } else {
      return {
        primary: "orange-500",
        primaryHover: "orange-600",
        primaryLight: "orange-400",
        secondary: "orange-100",
        accent: "orange-600",
      };
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        darkMode,
        setColorScheme,
        setDarkMode,
        toggleDarkMode,
        getColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
