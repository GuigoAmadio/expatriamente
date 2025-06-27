// Arquivo central de temas para o projeto Expatriamente
// Cada tema contém paleta de cores e fontes associadas

export type Theme = {
  name: string;
  colors: {
    // Paleta principal
    primary: string;
    secondary: string;
    accent: string;

    // Fundos
    background: string;
    surface: string;
    surfaceElevated: string;
    surfaceSubtle: string;

    // Texto
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textOnPrimary: string;

    // Bordas, divisores e estados
    border: string;
    borderStrong: string;
    divider: string;
    hover: string;
    pressed: string;
    focus: string;

    // Estados de feedback
    success: string;
    warning: string;
    error: string;
    info: string;

    [key: string]: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
};

export const themes: Theme[] = [
  // Tema 1  – Terroso Renovado (Natural, profissional, com mais contraste)
  {
    name: "theme1",
    colors: {
      primary: "#2F5233", // Verde escuro mais profundo - para CTAs importantes
      secondary: "#D4761A", // Laranja vibrante - para botões de ação
      accent: "#7BA05B", // Verde médio - para destaques

      background: "#F8F6F1", // Bege muito claro - fundo principal (60%)
      surface: "#EFEBE2", // Bege médio - cartões e seções (30%)
      surfaceElevated: "#FFFFFF", // Branco puro - cartões importantes
      surfaceSubtle: "#F2EFE7", // Bege sutil - áreas alternadas

      textPrimary: "#1A2E1D", // Verde escuro quase preto - texto principal
      textSecondary: "#4A5D4E", // Verde médio - texto secundário
      textMuted: "#6B7B6F", // Verde acinzentado - texto terciário
      textOnPrimary: "#FFFFFF", // Branco em cima de primário

      border: "#D6D3C4", // Bege médio para bordas
      borderStrong: "#B8B3A1", // Bege escuro para bordas fortes
      divider: "#E8E4D9", // Bege claro para divisores

      hover: "#D4761A", // Laranja para hover (mesma cor secondary)
      pressed: "#B8611A", // Laranja escuro para pressed
      focus: "#2F5233", // Verde escuro para focus

      success: "#2D7A2D",
      warning: "#E8A317",
      error: "#C53030",
      info: "#3182CE",
    },
    fonts: {
      heading: "Mikela, serif",
      body: "Montserrat, sans-serif",
    },
  },

  // Tema 2 – Azul Corporativo + Âmbar (Versão Clara)
  {
    name: "theme2",
    colors: {
      primary: "#1E40AF", // Azul escuro para CTAs
      secondary: "#F59E0B", // Âmbar vibrante para botões de ação
      accent: "#3B82F6", // Azul médio para destaques

      background: "#F8FAFC", // Azul muito claro - fundo principal (60%)
      surface: "#F1F5F9", // Azul claro - cartões e seções (30%)
      surfaceElevated: "#FFFFFF", // Branco puro - cartões importantes
      surfaceSubtle: "#E2E8F0", // Azul sutil - áreas alternadas

      textPrimary: "#0F172A", // Azul navy escuro - texto principal
      textSecondary: "#334155", // Azul médio - texto secundário
      textMuted: "#64748B", // Azul acinzentado - texto terciário
      textOnPrimary: "#FFFFFF", // Branco sobre botões escuros

      border: "#CBD5E1", // Azul claro para bordas
      borderStrong: "#94A3B8", // Azul médio para bordas fortes
      divider: "#E2E8F0", // Azul sutil para divisores

      hover: "#F59E0B", // Âmbar para hover
      pressed: "#D97706", // Âmbar escuro para pressed
      focus: "#1E40AF", // Azul escuro para focus

      success: "#059669",
      warning: "#D97706",
      error: "#DC2626",
      info: "#2563EB",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  },

  // Tema 3 – Marrom Âmbar + Azul (Versão Clara)
  {
    name: "theme3",
    colors: {
      primary: "#7C2D12", // Marrom escuro para CTAs
      secondary: "#3B82F6", // Azul vivo para botões de ação
      accent: "#D97706", // Dourado/âmbar para destaques

      background: "#FEF7ED", // Bege muito claro - fundo principal (60%)
      surface: "#FED7AA", // Bege dourado claro - cartões e seções (30%)
      surfaceElevated: "#FFFFFF", // Branco puro - cartões importantes
      surfaceSubtle: "#FDBA74", // Bege médio sutil - áreas alternadas

      textPrimary: "#451A03", // Marrom muito escuro - texto principal
      textSecondary: "#7C2D12", // Marrom escuro - texto secundário
      textMuted: "#A16207", // Marrom médio - texto terciário
      textOnPrimary: "#FFFFFF", // Branco sobre botões escuros

      border: "#FDBA74", // Bege médio para bordas
      borderStrong: "#F59E0B", // Âmbar para bordas fortes
      divider: "#FED7AA", // Bege claro para divisores

      hover: "#3B82F6", // Azul para hover
      pressed: "#2563EB", // Azul escuro para pressed
      focus: "#7C2D12", // Marrom escuro para focus

      success: "#059669",
      warning: "#D97706",
      error: "#DC2626",
      info: "#2563EB",
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Montserrat, sans-serif",
    },
  },

  // ==================== VERSÕES ESCURAS ====================

  // Tema 1 Dark – Terroso Renovado (Versão Escura)
  {
    name: "theme1Dark",
    colors: {
      primary: "#7BA05B", // Verde médio mais claro para CTAs no escuro
      secondary: "#F59E0B", // Laranja mais vibrante para contraste
      accent: "#9BB86F", // Verde claro para destaques

      background: "#1A2E1D", // Verde escuro quase preto - fundo principal
      surface: "#2A3F2D", // Verde escuro médio - cartões e seções
      surfaceElevated: "#354039", // Verde médio - cartões importantes
      surfaceSubtle: "#243529", // Verde escuro sutil - áreas alternadas

      textPrimary: "#F8F6F1", // Bege claro - texto principal
      textSecondary: "#D6D3C4", // Bege médio - texto secundário
      textMuted: "#B8B3A1", // Bege escuro - texto terciário
      textOnPrimary: "#1A2E1D", // Verde escuro sobre botões claros

      border: "#4A5D4E", // Verde médio para bordas
      borderStrong: "#6B7B6F", // Verde claro para bordas fortes
      divider: "#354039", // Verde médio para divisores

      hover: "#F59E0B", // Laranja para hover
      pressed: "#D4761A", // Laranja escuro para pressed
      focus: "#7BA05B", // Verde médio para focus

      success: "#22C55E",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
    },
    fonts: {
      heading: "Mikela, serif",
      body: "Montserrat, sans-serif",
    },
  },

  // Tema 2 Dark – Azul Corporativo + Âmbar (Versão Escura)
  {
    name: "theme2Dark",
    colors: {
      primary: "#FFB300", // Âmbar mais claro para CTAs no escuro
      secondary: "#0F172A", // Azul navy muito escuro
      accent: "#60A5FA", // Azul claro para destaques

      background: "#0F172A", // Azul navy muito escuro - fundo principal
      surface: "#1E293B", // Azul navy escuro - cartões e seções
      surfaceElevated: "#334155", // Azul médio - cartões importantes
      surfaceSubtle: "#1A2332", // Azul escuro sutil

      textPrimary: "#F8FAFC", // Branco puro - texto principal
      textSecondary: "#CBD5E1", // Cinza azulado claro - texto secundário
      textMuted: "#94A3B8", // Cinza azulado médio - texto terciário
      textOnPrimary: "#0F172A", // Azul navy escuro sobre botões claros

      border: "#334155", // Azul médio para bordas
      borderStrong: "#475569", // Azul claro para bordas fortes
      divider: "#1E293B", // Azul navy escuro para divisores

      hover: "#FCD34D", // Âmbar claro para hover
      pressed: "#D97706", // Âmbar escuro para pressed
      focus: "#60A5FA", // Azul claro para focus

      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  },

  // Tema 3 Dark – Marrom Âmbar + Azul (Versão Escura)
  {
    name: "theme3Dark",
    colors: {
      primary: "#60A5FA", // Azul claro para CTAs no escuro
      secondary: "#451A03", // Marrom muito escuro
      accent: "#FCD34D", // Dourado claro para destaques

      background: "#451A03", // Marrom muito escuro - fundo principal
      surface: "#7C2D12", // Marrom escuro - cartões e seções
      surfaceElevated: "#A16207", // Marrom médio - cartões importantes
      surfaceSubtle: "#5C1A0B", // Marrom escuro sutil

      textPrimary: "#FEF7ED", // Bege muito claro - texto principal
      textSecondary: "#FED7AA", // Bege dourado - texto secundário
      textMuted: "#FDBA74", // Bege médio - texto terciário
      textOnPrimary: "#451A03", // Marrom escuro sobre botões claros

      border: "#7C2D12", // Marrom escuro para bordas
      borderStrong: "#A16207", // Marrom médio para bordas fortes
      divider: "#5C1A0B", // Marrom escuro sutil para divisores

      hover: "#93C5FD", // Azul claro para hover
      pressed: "#3B82F6", // Azul médio para pressed
      focus: "#FCD34D", // Dourado para focus

      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#60A5FA",
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Montserrat, sans-serif",
    },
  },
];

// Exporta o tema padrão (Theme 1)
export const defaultTheme = themes[0];
