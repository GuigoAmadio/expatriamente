import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--color-background)",
          secondary: "var(--color-background-secondary)",
          oposite: "var(--color-background-oposite)",
          weak: "var(--color-background-weak)",
        },
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        textClaro: "var(--color-text-claro)",
        textEscuro: "var(--color-text-escuro)",
        textStrong: "var(--color-text-strong)",
        botaoPrimary: "var(--color-botao-primary)",
        botaoSecondary: "var(--color-botao-secondary)",
        botaoSublime: "var(--color-botao-sublime)",
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        divider: "var(--color-divider)",
        hover: "var(--color-hover)",
        pressed: "var(--color-pressed)",
        focus: "var(--color-focus)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        elevated:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-left": "fadeInLeft 0.6s ease-out",
        "fade-in-right": "fadeInRight 0.6s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
} satisfies Config;
