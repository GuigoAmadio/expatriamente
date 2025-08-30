import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações de compilação
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Configurações de imagens
  images: {
    domains: [],
    unoptimized: false,
  },

  // Configuração para produção
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  // Configurações específicas para o Vercel
  serverExternalPackages: [],

  // ✅ ADICIONAR HEADERS PARA EVITAR CACHE
  async headers() {
    return [
      {
        source: "/funcionarios/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      {
        source: "/psicanalistas.json",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  // Configurações de webpack (se necessário)
  webpack: (config, { dev, isServer }) => {
    // Configurações customizadas do webpack aqui
    return config;
  },
};

export default nextConfig;
