"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type NavigationType =
  | "home"
  | "about"
  | "services"
  | "intercambio"
  | "expatriados";

interface NavigationContextType {
  currentSection: NavigationType;
  setCurrentSection: (section: NavigationType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<NavigationType>("home");

  return (
    <NavigationContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
