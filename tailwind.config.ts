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
        // Cores Principais com melhor hierarquia
        primary: {
          DEFAULT: "var(--color-primary)",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "var(--color-primary)",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e0",
          400: "#94a3b8",
          500: "var(--color-secondary)",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "var(--color-accent)",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },

        // Sistema de Fundos Hierárquico
        background: {
          DEFAULT: "var(--color-background)",
          elevated: "var(--color-surface-elevated)",
          subtle: "var(--color-surface-subtle)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          elevated: "var(--color-surface-elevated)",
          subtle: "var(--color-surface-subtle)",
        },

        // Sistema de Textos
        text: {
          DEFAULT: "var(--color-text-primary)",
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          "on-primary": "var(--color-text-on-primary)",
        },

        // Bordas e Divisores
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        divider: "var(--color-divider)",

        // Estados Interativos
        hover: "var(--color-hover)",
        pressed: "var(--color-pressed)",
        focus: "var(--color-focus)",

        // Cores de Status
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",

        // Compatibilidade com Shadcn/UI
        card: {
          DEFAULT: "var(--color-surface-elevated)",
          foreground: "var(--color-text-primary)",
        },
        popover: {
          DEFAULT: "var(--color-surface-elevated)",
          foreground: "var(--color-text-primary)",
        },
        muted: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text-muted)",
        },
        destructive: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-text-on-primary)",
        },
        input: "var(--color-surface-elevated)",
        ring: "var(--color-focus)",

        // Charts
        chart: {
          "1": "var(--color-primary)",
          "2": "var(--color-accent)",
          "3": "var(--color-secondary)",
          "4": "var(--color-info)",
          "5": "var(--color-success)",
        },

        // Compatibilidade (cores antigas - deprecated)
        tertiary: "var(--color-border)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
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
