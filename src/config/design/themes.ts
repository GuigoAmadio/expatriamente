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
  // Tema 1 – Paleta Verde Oliva (baseada na imagem "Expatriamente")
  {
    name: "theme1",
    colors: {
      primary: "#5f6f52", // Marrom escuro
      secondary: "#a9b388", // Bege claro
      accent: "#ffae00", // Laranja vibrante

      background: "#f9ebc7", // Bege médio
      surface: "#A79057", // Marrom claro
      surfaceElevated: "#F5CD62", // Amarelo vibrante
      surfaceSubtle: "#fefae0", // Bege muito claro

      textPrimary: "#5f6f52", // Marrom oliva escuro
      textSecondary: "#fefae0", // Marrom claro
      textMuted: "#c4661f", // Marrom acinzentado
      textOnPrimary: "#783d19", // Branco

      border: "#A79057", // Marrom claro
      borderStrong: "#5A5427", // Marrom oliva escuro
      divider: "#D3BD99", // Bege médio

      hover: "#D16708", // Laranja queimado
      pressed: "#A04E07", // Marrom avermelhado escuro
      focus: "#5A5427", // Marrom oliva escuro

      success: "#6B8E23", // Verde oliva
      warning: "#D16708", // Laranja queimado
      error: "#B22222", // Vermelho escuro
      info: "#F5CD62", // Amarelo vibrante
    },
    fonts: {
      heading: "Mikela, serif",
      body: "Montserrat, sans-serif",
    },
  },

  // Tema 2 – Paleta Azul Corporativo (baseada na primeira imagem - tons azuis)
  {
    name: "theme2",
    colors: {
      primary: "#203A58", // Azul petróleo escuro
      secondary: "#C4661F", // Laranja queimado
      accent: "#6F8CA4", // Azul acinzentado

      background: "#F8F9FA", // Cinza muito claro
      surface: "#F1F3F5", // Cinza claro
      surfaceElevated: "#FFFFFF", // Branco
      surfaceSubtle: "#E9ECEF", // Cinza claríssimo

      textPrimary: "#203A58", // Azul petróleo escuro
      textSecondary: "#495057", // Cinza escuro
      textMuted: "#6C757D", // Cinza médio
      textOnPrimary: "#FFFFFF", // Branco

      border: "#DEE2E6", // Cinza claro
      borderStrong: "#ADB5BD", // Cinza médio
      divider: "#E9ECEF", // Cinza claríssimo

      hover: "#C4661F", // Laranja queimado
      pressed: "#A0541A", // Marrom alaranjado escuro
      focus: "#203A58", // Azul petróleo escuro

      success: "#28A745", // Verde médio
      warning: "#FFC107", // Amarelo
      error: "#DC3545", // Vermelho
      info: "#17A2B8", // Azul piscina
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  },

  // Tema 3 – Paleta Terrosa Camel (baseada nas cores camel e russet)
  {
    name: "theme3",
    colors: {
      primary: "#75564D", // Marrom médio
      secondary: "#016708", // Verde escuro
      accent: "#DBAF8A", // Bege rosado

      background: "#FAF7F3", // Bege muito claro
      surface: "#F2EDE6", // Bege claro
      surfaceElevated: "#FFFFFF", // Branco
      surfaceSubtle: "#EBE4DC", // Bege médio

      textPrimary: "#783D19", // Marrom avermelhado escuro
      textSecondary: "#75564D", // Marrom médio
      textMuted: "#9A8B7A", // Marrom acinzentado
      textOnPrimary: "#FFFFFF", // Branco

      border: "#E0D5C7", // Bege médio
      borderStrong: "#B99470", // Bege amarelado
      divider: "#EBE4DC", // Bege médio

      hover: "#016708", // Verde escuro
      pressed: "#014506", // Verde muito escuro
      focus: "#75564D", // Marrom médio

      success: "#016708", // Verde escuro
      warning: "#F59E0B", // Amarelo alaranjado
      error: "#DC2626", // Vermelho escuro
      info: "#6366F1", // Azul violeta
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Montserrat, sans-serif",
    },
  },

  // ==================== VERSÕES ESCURAS (INVERTIDAS) ====================

  // Tema 1 Dark – Paleta Verde Oliva (Versão Escura Invertida)
  {
    name: "theme1Dark",
    colors: {
      primary: "#A9B388", // Verde claro acinzentado
      secondary: "#F59E0B", // Amarelo alaranjado
      accent: "#C4D1AD", // Verde amarelado claro

      background: "#783D19", // Marrom avermelhado escuro
      surface: "#5F6F52", // Verde oliva escuro
      surfaceElevated: "#6B7A5E", // Verde oliva médio
      surfaceSubtle: "#4A5544", // Verde oliva muito escuro

      textPrimary: "#FEFAE0", // Amarelo claríssimo
      textSecondary: "#F9EBC7", // Amarelo claro
      textMuted: "#E8DCC9", // Bege claro
      textOnPrimary: "#783D19", // Marrom avermelhado escuro

      border: "#6B7A5E", // Verde oliva médio
      borderStrong: "#A9B388", // Verde claro acinzentado
      divider: "#5F6F52", // Verde oliva escuro

      hover: "#F59E0B", // Amarelo alaranjado
      pressed: "#C4661F", // Laranja queimado
      focus: "#A9B388", // Verde claro acinzentado

      success: "#22C55E", // Verde claro
      warning: "#F59E0B", // Amarelo alaranjado
      error: "#EF4444", // Vermelho vivo
      info: "#A9B388", // Verde claro acinzentado
    },
    fonts: {
      heading: "Mikela, serif",
      body: "Montserrat, sans-serif",
    },
  },

  // Tema 2 Dark – Paleta Azul Corporativo (Versão Escura Invertida)
  {
    name: "theme2Dark",
    colors: {
      primary: "#A2AEB3", // Cinza azulado claro
      secondary: "#F59E0B", // Amarelo alaranjado
      accent: "#6F8CA4", // Azul acinzentado

      background: "#203A58", // Azul petróleo escuro
      surface: "#2A4A68", // Azul escuro
      surfaceElevated: "#3A5A78", // Azul médio
      surfaceSubtle: "#1A3048", // Azul muito escuro

      textPrimary: "#F8F9FA", // Cinza muito claro
      textSecondary: "#E9ECEF", // Cinza claríssimo
      textMuted: "#DEE2E6", // Cinza claro
      textOnPrimary: "#203A58", // Azul petróleo escuro

      border: "#3A5A78", // Azul médio
      borderStrong: "#6F8CA4", // Azul acinzentado
      divider: "#2A4A68", // Azul escuro

      hover: "#FCD34D", // Amarelo claro
      pressed: "#D97706", // Laranja escuro
      focus: "#A2AEB3", // Cinza azulado claro

      success: "#10B981", // Verde claro
      warning: "#F59E0B", // Amarelo alaranjado
      error: "#EF4444", // Vermelho vivo
      info: "#6F8CA4", // Azul acinzentado
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  },

  // Tema 3 Dark – Paleta Terrosa Camel (Versão Escura Invertida)
  {
    name: "theme3Dark",
    colors: {
      primary: "#DBAF8A", // Bege rosado claro
      secondary: "#22C55E", // Verde claro
      accent: "#E8C4A0", // Bege claro

      background: "#783D19", // Marrom avermelhado escuro
      surface: "#75564D", // Marrom médio
      surfaceElevated: "#8B6B62", // Marrom médio escuro
      surfaceSubtle: "#5D4037", // Marrom escuro

      textPrimary: "#FAF7F3", // Bege muito claro
      textSecondary: "#F2EDE6", // Bege claro
      textMuted: "#E0D5C7", // Bege médio
      textOnPrimary: "#783D19", // Marrom avermelhado escuro

      border: "#8B6B62", // Marrom médio escuro
      borderStrong: "#DBAF8A", // Bege rosado claro
      divider: "#75564D", // Marrom médio

      hover: "#34D399", // Verde claro
      pressed: "#16A34A", // Verde médio
      focus: "#DBAF8A", // Bege rosado claro

      success: "#22C55E", // Verde claro
      warning: "#F59E0B", // Amarelo alaranjado
      error: "#EF4444", // Vermelho vivo
      info: "#DBAF8A", // Bege rosado claro
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Montserrat, sans-serif",
    },
  },
];

// Exporta o tema padrão (Theme 1)
export const defaultTheme = themes[0];
