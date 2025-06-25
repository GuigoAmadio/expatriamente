"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "bars";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  variant = "spinner",
  color = "primary",
  className,
  text,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-primary-500",
    secondary: "text-secondary-500",
    white: "text-white",
    gray: "text-gray-500",
  };

  if (variant === "spinner") {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-3",
          className
        )}
      >
        <motion.div
          className={clsx(
            "border-2 border-current border-t-transparent rounded-full",
            sizeClasses[size],
            colorClasses[color]
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={clsx("text-sm font-medium", colorClasses[color])}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-3",
          className
        )}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={clsx(
                "rounded-full",
                size === "sm"
                  ? "w-2 h-2"
                  : size === "md"
                  ? "w-3 h-3"
                  : size === "lg"
                  ? "w-4 h-4"
                  : "w-5 h-5",
                colorClasses[color].replace("text-", "bg-")
              )}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={clsx("text-sm font-medium", colorClasses[color])}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-3",
          className
        )}
      >
        <motion.div
          className={clsx(
            "rounded-full",
            sizeClasses[size],
            colorClasses[color].replace("text-", "bg-")
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={clsx("text-sm font-medium", colorClasses[color])}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-3",
          className
        )}
      >
        <div className="flex gap-1 items-end">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={clsx(
                "rounded-sm",
                size === "sm"
                  ? "w-1"
                  : size === "md"
                  ? "w-1.5"
                  : size === "lg"
                  ? "w-2"
                  : "w-3",
                colorClasses[color].replace("text-", "bg-")
              )}
              animate={{
                height: [
                  size === "sm"
                    ? 8
                    : size === "md"
                    ? 12
                    : size === "lg"
                    ? 16
                    : 24,
                  size === "sm"
                    ? 16
                    : size === "md"
                    ? 24
                    : size === "lg"
                    ? 32
                    : 48,
                  size === "sm"
                    ? 8
                    : size === "md"
                    ? 12
                    : size === "lg"
                    ? 16
                    : 24,
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={clsx("text-sm font-medium", colorClasses[color])}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  return null;
};

export default Loading;
