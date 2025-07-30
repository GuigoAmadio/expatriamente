// Utilitário para converter classes de texto para vw
// Este arquivo contém funções para aplicar vw em componentes

export const textSizes = {
  // Títulos principais
  h1: "text-[4vw]",
  h2: "text-[3.5vw]",
  h3: "text-[3vw]",

  // Textos de corpo
  body: "text-[1.8vw]",
  bodySmall: "text-[1.5vw]",
  bodyLarge: "text-[2vw]",

  // Botões
  button: "text-[1.2vw]",
  buttonSmall: "text-[1vw]",

  // Navegação
  nav: "text-[1.2vw]",
  navSmall: "text-[1vw]",

  // Subtítulos
  subtitle: "text-[1.5vw]",
  subtitleSmall: "text-[1.2vw]",

  // FAQ e listas
  faqQuestion: "text-[1.3vw]",
  faqAnswer: "text-[1.1vw]",

  // Cards e elementos menores
  card: "text-[1.4vw]",
  caption: "text-[0.9vw]",
};

export const spacingSizes = {
  // Margens e paddings
  small: "[0.5vw]",
  medium: "[1vw]",
  large: "[2vw]",
  xlarge: "[3vw]",

  // Gaps
  gapSmall: "gap-[1vw]",
  gapMedium: "gap-[2vw]",
  gapLarge: "gap-[3vw]",

  // Padding
  paddingSmall: "px-[1vw] py-[0.5vw]",
  paddingMedium: "px-[2vw] py-[1vw]",
  paddingLarge: "px-[3vw] py-[1.5vw]",
};

// Função para aplicar vw em componentes
export function applyVwToComponent(componentText) {
  // Substituições comuns
  const replacements = {
    "text-sm": "text-[1.2vw]",
    "text-base": "text-[1.5vw]",
    "text-lg": "text-[1.8vw]",
    "text-xl": "text-[2vw]",
    "text-2xl": "text-[2.5vw]",
    "text-3xl": "text-[3vw]",
    "text-4xl": "text-[3.5vw]",
    "text-5xl": "text-[4vw]",
    "text-xs": "text-[1vw]",

    // Margens e paddings
    "mb-2": "mb-[0.5vw]",
    "mb-4": "mb-[1vw]",
    "mb-6": "mb-[1.5vw]",
    "mb-8": "mb-[2vw]",
    "mb-12": "mb-[3vw]",
    "mb-16": "mb-[4vw]",
    "mb-20": "mb-[5vw]",

    "py-2": "py-[0.5vw]",
    "py-4": "py-[1vw]",
    "py-6": "py-[1.5vw]",
    "py-8": "py-[2vw]",
    "py-12": "py-[3vw]",
    "py-16": "py-[4vw]",
    "py-20": "py-[5vw]",

    "px-4": "px-[1vw]",
    "px-6": "px-[1.5vw]",
    "px-8": "px-[2vw]",
    "px-12": "px-[3vw]",
    "px-16": "px-[4vw]",
    "px-20": "px-[5vw]",

    // Gaps
    "gap-2": "gap-[0.5vw]",
    "gap-4": "gap-[1vw]",
    "gap-6": "gap-[1.5vw]",
    "gap-8": "gap-[2vw]",
    "gap-12": "gap-[3vw]",
  };

  let result = componentText;

  for (const [oldClass, newClass] of Object.entries(replacements)) {
    result = result.replace(new RegExp(oldClass, "g"), newClass);
  }

  return result;
}
