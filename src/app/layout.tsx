import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { ToastProvider } from "@/components/ui/Toast";
import { Playfair_Display, Montserrat, Bebas_Neue } from "next/font/google";
import Script from "next/script";

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
      <head>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1456405978885544');
            fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=620735734130587&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
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
