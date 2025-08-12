"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className,
  ...props
}) => {
  const baseClasses = clsx(
    "relative inline-flex items-center justify-center font-medium",
    "transition-all duration-300 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    {
      // Tamanhos - apenas se não houver classes customizadas
      "px-3 py-2 text-sm rounded-md":
        size === "sm" && !className?.includes("px-"),
      "px-4 py-2.5 text-base rounded-lg":
        size === "md" && !className?.includes("px-"),
      "px-6 py-3 text-lg rounded-xl":
        size === "lg" && !className?.includes("px-"),

      // Variantes - apenas se não houver classes customizadas de background
      "btn-cta-primary": variant === "primary" && !className?.includes("bg-"),
      "btn-cta-secondary":
        variant === "secondary" && !className?.includes("bg-"),
      "btn-cta-tertiary": variant === "outline" && !className?.includes("bg-"),

      // Variantes especiais - apenas se não houver classes customizadas
      "bg-transparent text-primary dark:text-surface hover:bg-surface-elevated dark:hover:bg-secondary focus:ring-primary border-0":
        variant === "ghost" && !className?.includes("bg-"),
      "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 focus:ring-red-500 rounded-lg":
        variant === "danger" && !className?.includes("bg-"),
    }
  );

  return (
    <motion.button
      type={type}
      className={clsx(baseClasses, className)}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      <span
        className={clsx("flex items-center gap-2", { "opacity-0": loading })}
      >
        {children}
      </span>

      {/* Efeito de brilho sutil - apenas se não houver classes customizadas */}
      {!className?.includes("bg-") && (
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.button>
  );
};

export default Button;
