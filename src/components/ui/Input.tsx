"use client";

import React from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // Classes base que sempre devem ser aplicadas
    const baseClasses = clsx(
      "flex w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      {
        // Classes condicionais - apenas se não houver classes customizadas
        "h-10 rounded-md border border-tertiary bg-background px-3 py-2 text-primary placeholder:text-primary/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-secondary dark:bg-secondary dark:text-surface dark:placeholder:text-surface/60 dark:focus-visible:ring-accent":
          !className?.includes("h-") &&
          !className?.includes("rounded-") &&
          !className?.includes("border-") &&
          !className?.includes("bg-") &&
          !className?.includes("px-") &&
          !className?.includes("py-"),
      }
    );

    return (
      <input
        type={type}
        className={clsx(baseClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
