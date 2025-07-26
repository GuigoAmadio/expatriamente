import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desabilitar Turbopack para resolver problemas com fontes
  experimental: {
    // turbo: false, // Comentado para evitar erro de tipo
  },

  // Configurações de otimização
  swcMinify: true,

  // Configurações de imagens
  images: {
    domains: [],
    unoptimized: false,
  },

  // Configurações de compilação
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Configurações de webpack (se necessário)
  webpack: (config, { dev, isServer }) => {
    // Configurações customizadas do webpack aqui
    return config;
  },
};

export default nextConfig;
