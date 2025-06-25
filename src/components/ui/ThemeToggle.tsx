"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="p-0 m-0 bg-transparent border-none outline-none focus:outline-none"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={darkMode === "light" ? "Modo escuro" : "Modo claro"}
      style={{ boxShadow: "none" }}
    >
      <div className="relative w-6 h-6">
        {/* Ícone do Sol */}
        <motion.div
          initial={false}
          animate={{
            scale: darkMode === "light" ? 1 : 0,
            opacity: darkMode === "light" ? 1 : 0,
            rotate: darkMode === "light" ? 0 : 180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-orange-500"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
        {/* Ícone da Lua */}
        <motion.div
          initial={false}
          animate={{
            scale: darkMode === "dark" ? 1 : 0,
            opacity: darkMode === "dark" ? 1 : 0,
            rotate: darkMode === "dark" ? 0 : -180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-teal-400"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
}
