import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Playfair_Display, Montserrat } from "next/font/google";

// Configuração da fonte Playfair Display para títulos
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Configuração da fonte Montserrat para corpo do texto
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Expatriamente - Saúde Mental para Brasileiros no Exterior",
  description:
    "Plataforma dedicada ao bem-estar emocional de brasileiros no exterior. Atendimento humanizado, seguro e acolhedor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`antialiased ${playfair.variable} ${montserrat.variable}`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
