import { useTheme } from "@/context/ThemeContext";

export function useColors() {
  const { darkMode, getColors } = useTheme();
  const colors = getColors();

  return {
    // Cores primárias
    primary: `bg-${colors.primary}`,
    primaryHover: `hover:bg-${colors.primaryHover}`,
    primaryText: `text-${colors.primary}`,
    primaryBorder: `border-${colors.primary}`,

    // Combinações comuns para botões
    button: {
      primary: `bg-${colors.primary} hover:bg-${colors.primaryHover} text-white`,
      secondary: `bg-${colors.secondary} hover:bg-${colors.primary} hover:text-white text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700`,
      outline: `border border-${colors.primary} text-${colors.primary} hover:bg-${colors.primary} hover:text-white`,
    },

    // Para gradientes
    gradient: {
      from: colors.primary,
      to: colors.primaryHover,
      full: `bg-gradient-to-r from-${colors.primary} to-${colors.primaryHover}`,
    },

    // Para cards e elementos interativos
    card: {
      border: `border-${colors.primaryLight}`,
      hover: `hover:border-${colors.primary}`,
      ring: `ring-${colors.primary}`,
    },

    // Para ícones e acentos
    accent: `text-${colors.accent}`,
    accentBg: `bg-${colors.accent}`,

    // Para dark mode específico
    isDark: darkMode === "dark",
    isLight: darkMode === "light",
  };
}
