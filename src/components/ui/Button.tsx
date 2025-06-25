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
    "relative inline-flex items-center justify-center font-medium rounded-xl",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transform hover:scale-105 active:scale-95",
    {
      // Tamanhos
      "px-3 py-2 text-sm": size === "sm",
      "px-4 py-2.5 text-base": size === "md",
      "px-6 py-3 text-lg": size === "lg",

      // Variantes
      "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 focus:ring-primary-500":
        variant === "primary",
      "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg shadow-secondary-500/25 hover:shadow-secondary-500/40 focus:ring-secondary-500":
        variant === "secondary",
      "bg-white/10 backdrop-blur-md border border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/20 focus:ring-gray-500":
        variant === "outline",
      "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500":
        variant === "ghost",
      "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 focus:ring-red-500":
        variant === "danger",
    }
  );

  return (
    <motion.button
      type={type}
      className={clsx(baseClasses, className)}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
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

      {/* Efeito de brilho */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

export default Button;
