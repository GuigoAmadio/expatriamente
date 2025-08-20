// Arquivo central de temas para o projeto Expatriamente
// Cada tema contém paleta de cores e fontes associadas

export type Theme = {
  name: string;
  isDefault?: boolean;
  colors: {
    // Fundos
    background: string;
    backgroundSecondary: string;
    backgroundOposite: string;
    backgroundWeak: string;

    // Textos
    textPrimary: string;
    textSecondary: string;
    textClaro: string;
    textEscuro: string;
    textStrong: string;

    // Botões
    botaoPrimary: string;
    botaoSecondary: string;
    botaoSublime: string;

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

    // Novas cores específicas do projeto
    begeRosado: string;
    verdeAcinzentadoClaro: string;
    verdeMusgoMedio: string;
    verdePetroleoAcinzentado: string;
    azulClaroSuave: string;
    azulForteMedio: string;
    azulClaroMedio: string;
    begeClaro: string;
    begeQuaseOffWhite: string;
    marromAcinzentado: string;

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
    isDefault: true,
    colors: {
      background: "#f9ebc7", // bege médio
      backgroundSecondary: "#fefae0", // bege muito claro
      backgroundOposite: "#5f6f52", // marrom oliva escuro
      backgroundWeak: "#fffbe6", // bege claríssimo
      textPrimary: "#5f6f52", // marrom oliva escuro
      textSecondary: "#fefae0", // bege muito claro
      textClaro: "#fff", // branco
      textEscuro: "#5A5427", // marrom oliva escuro
      textStrong: "#ffae00", // marrom avermelhado escuro
      botaoPrimary: "#ffae00", // laranja vibrante
      botaoSecondary: "#5f6f52", // marrom claro
      botaoSublime: "#F5CD62", // amarelo vibrante
      border: "#A79057", // marrom claro
      borderStrong: "#ffae00", // marrom oliva escuro
      divider: "#D3BD99", // bege médio
      hover: "#D16708", // laranja queimado
      pressed: "#A04E07", // marrom avermelhado escuro
      focus: "#5A5427", // marrom oliva escuro
      success: "#6B8E23", // verde oliva
      warning: "#D16708", // laranja queimado
      error: "#B22222", // vermelho escuro
      info: "#F5CD62", // amarelo vibrante

      // Novas cores específicas
      begeRosado: "#c5b2a1",
      verdeAcinzentadoClaro: "#9ca995",
      verdeMusgoMedio: "#587861",
      verdePetroleoAcinzentado: "#5b7470",
      azulClaroSuave: "#9dc9e2",
      azulForteMedio: "#1a75ce",
      azulClaroMedio: "#77b2de",
      begeClaro: "#ded1c0",
      begeQuaseOffWhite: "#e4ded2",
      marromAcinzentado: "#987b6b",
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
      background: "#F8F9FA", // cinza muito claro
      backgroundSecondary: "#E9ECEF", // cinza claríssimo
      backgroundOposite: "#203A58", // azul petróleo escuro
      backgroundWeak: "#ffffff", // branco
      textPrimary: "#203A58", // azul petróleo escuro
      textSecondary: "#495057", // cinza escuro
      textClaro: "#FFFFFF", // branco
      textEscuro: "#203A58", // azul petróleo escuro
      textStrong: "#071739", // azul marinho profundo
      botaoPrimary: "#203A58", // azul petróleo escuro
      botaoSecondary: "#C4661F", // laranja queimado
      botaoSublime: "#6F8CA4", // azul acinzentado
      border: "#DEE2E6", // cinza claro
      borderStrong: "#ADB5BD", // cinza médio
      divider: "#E9ECEF", // cinza claríssimo
      hover: "#C4661F", // laranja queimado
      pressed: "#A0541A", // marrom alaranjado escuro
      focus: "#203A58", // azul petróleo escuro
      success: "#28A745", // verde médio
      warning: "#FFC107", // amarelo
      error: "#DC3545", // vermelho
      info: "#17A2B8", // azul piscina

      // Novas cores específicas
      begeRosado: "#c5b2a1",
      verdeAcinzentadoClaro: "#9ca995",
      verdeMusgoMedio: "#587861",
      verdePetroleoAcinzentado: "#5b7470",
      azulClaroSuave: "#9dc9e2",
      azulForteMedio: "#1a75ce",
      azulClaroMedio: "#77b2de",
      begeClaro: "#ded1c0",
      begeQuaseOffWhite: "#e4ded2",
      marromAcinzentado: "#987b6b",
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
      background: "#FAF7F3", // bege muito claro
      backgroundSecondary: "#EBE4DC", // bege médio
      backgroundOposite: "#783D19", // marrom avermelhado escuro
      backgroundWeak: "#FFFFFF", // branco
      textPrimary: "#783D19", // marrom avermelhado escuro
      textSecondary: "#75564D", // marrom médio
      textClaro: "#FFFFFF", // branco
      textEscuro: "#75564D", // marrom médio
      textStrong: "#783D19", // marrom avermelhado escuro
      botaoPrimary: "#75564D", // marrom médio
      botaoSecondary: "#016708", // verde escuro
      botaoSublime: "#DBAF8A", // bege rosado
      border: "#E0D5C7", // bege médio
      borderStrong: "#B99470", // bege amarelado
      divider: "#EBE4DC", // bege médio
      hover: "#016708", // verde escuro
      pressed: "#014506", // verde muito escuro
      focus: "#75564D", // marrom médio
      success: "#016708", // verde escuro
      warning: "#F59E0B", // amarelo alaranjado
      error: "#DC2626", // vermelho escuro
      info: "#6366F1", // azul violeta

      // Novas cores específicas
      begeRosado: "#c5b2a1",
      verdeAcinzentadoClaro: "#9ca995",
      verdeMusgoMedio: "#587861",
      verdePetroleoAcinzentado: "#5b7470",
      azulClaroSuave: "#9dc9e2",
      azulForteMedio: "#1a75ce",
      azulClaroMedio: "#77b2de",
      begeClaro: "#ded1c0",
      begeQuaseOffWhite: "#e4ded2",
      marromAcinzentado: "#987b6b",
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
      background: "#783D19", // marrom avermelhado escuro
      backgroundSecondary: "#4A5544", // verde oliva muito escuro
      backgroundOposite: "#f9ebc7", // bege médio
      backgroundWeak: "#A9B388", // verde claro acinzentado
      textPrimary: "#FEFAE0", // amarelo claríssimo
      textSecondary: "#F9EBC7", // amarelo claro
      textClaro: "#FEFAE0", // amarelo claríssimo
      textEscuro: "#783D19", // marrom avermelhado escuro
      textStrong: "#A9B388", // verde claro acinzentado
      botaoPrimary: "#A9B388", // verde claro acinzentado
      botaoSecondary: "#F59E0B", // amarelo alaranjado
      botaoSublime: "#C4D1AD", // verde amarelado claro
      border: "#6B7A5E", // verde oliva médio
      borderStrong: "#A9B388", // verde claro acinzentado
      divider: "#5F6F52", // verde oliva escuro
      hover: "#F59E0B", // amarelo alaranjado
      pressed: "#C4661F", // laranja queimado
      focus: "#A9B388", // verde claro acinzentado
      success: "#22C55E", // verde claro
      warning: "#F59E0B", // amarelo alaranjado
      error: "#EF4444", // vermelho vivo
      info: "#A9B388", // verde claro acinzentado

      // Novas cores específicas
      begeRosado: "#c5b2a1",
      verdeAcinzentadoClaro: "#9ca995",
      verdeMusgoMedio: "#587861",
      verdePetroleoAcinzentado: "#5b7470",
      azulClaroSuave: "#9dc9e2",
      azulForteMedio: "#1a75ce",
      azulClaroMedio: "#77b2de",
      begeClaro: "#ded1c0",
      begeQuaseOffWhite: "#e4ded2",
      marromAcinzentado: "#987b6b",
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
      background: "#071739", // azul marinho profundo
      backgroundSecondary: "#203A58", // azul petróleo escuro
      backgroundOposite: "#F8F9FA", // cinza muito claro
      backgroundWeak: "#334155", // cinza azulado escuro
      textPrimary: "#F8F9FA", // cinza muito claro
      textSecondary: "#ADB5BD", // cinza médio
      textClaro: "#FFFFFF", // branco
      textEscuro: "#071739", // azul marinho profundo
      textStrong: "#203A58", // azul petróleo escuro
      botaoPrimary: "#C4661F", // laranja queimado
      botaoSecondary: "#203A58", // azul petróleo escuro
      botaoSublime: "#6F8CA4", // azul acinzentado
      border: "#203A58", // azul petróleo escuro
      borderStrong: "#6F8CA4", // azul acinzentado
      divider: "#203A58", // azul petróleo escuro
      hover: "#C4661F", // laranja queimado
      pressed: "#A0541A", // marrom alaranjado escuro
      focus: "#203A58", // azul petróleo escuro
      success: "#28A745", // verde médio
      warning: "#FFC107", // amarelo
      error: "#DC3545", // vermelho
      info: "#17A2B8", // azul piscina

      // Novas cores específicas
      begeRosado: "#c5b2a1",
      verdeAcinzentadoClaro: "#9ca995",
      verdeMusgoMedio: "#587861",
      verdePetroleoAcinzentado: "#5b7470",
      azulClaroSuave: "#9dc9e2",
      azulForteMedio: "#1a75ce",
      azulClaroMedio: "#77b2de",
      begeClaro: "#ded1c0",
      begeQuaseOffWhite: "#e4ded2",
      marromAcinzentado: "#987b6b",
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
      background: "#2D1B0E", // marrom escuro
      backgroundSecondary: "#3E2723", // marrom muito escuro
      backgroundOposite: "#FAF7F3", // bege muito claro
      backgroundWeak: "#3E2723", // marrom muito escuro
      textPrimary: "#FFFFFF", // branco
      textSecondary: "#BCAAA4", // bege acinzentado
      textClaro: "#FFFFFF", // branco
      textEscuro: "#2D1B0E", // marrom escuro
      textStrong: "#BCAAA4", // bege acinzentado
      botaoPrimary: "#DBAF8A", // bege rosado
      botaoSecondary: "#016708", // verde escuro
      botaoSublime: "#75564D", // marrom médio
      border: "#6D4C41", // marrom médio escuro
      borderStrong: "#BCAAA4", // bege acinzentado
      divider: "#3E2723", // marrom muito escuro
      hover: "#016708", // verde escuro
      pressed: "#014506", // verde muito escuro
      focus: "#75564D", // marrom médio
      success: "#016708", // verde escuro
      warning: "#F59E0B", // amarelo alaranjado
      error: "#DC2626", // vermelho escuro
      info: "#6366F1", // azul violeta

      // Novas cores específicas
      begeRosado: "#c5b2a1",
      verdeAcinzentadoClaro: "#9ca995",
      verdeMusgoMedio: "#587861",
      verdePetroleoAcinzentado: "#5b7470",
      azulClaroSuave: "#9dc9e2",
      azulForteMedio: "#1a75ce",
      azulClaroMedio: "#77b2de",
      begeClaro: "#ded1c0",
      begeQuaseOffWhite: "#e4ded2",
      marromAcinzentado: "#987b6b",
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Montserrat, sans-serif",
    },
  },
];

// Exporta o tema padrão (Theme 1)
export const defaultTheme = themes[0];
