import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { ToastProvider } from "@/components/ui/Toast";
import { Playfair_Display, Montserrat, Bebas_Neue } from "next/font/google";

// Import Flickity CSS
import "flickity/css/flickity.css";

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

// Fonte condensada para títulos curtos (cards)
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-condensed",
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
        className={`antialiased ${playfair.variable} ${montserrat.variable} ${bebas.variable}`}
      >
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <NavigationProvider>
                <ToastProvider>{children}</ToastProvider>
              </NavigationProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
