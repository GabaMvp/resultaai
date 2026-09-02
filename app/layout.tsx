import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://resultaai.com.br"),

  title: {
    default: "ResultaAí | Calculadoras Online",
    template: "%s | ResultaAí",
  },

  description:
    "Calcule rápido. Resolva fácil. Calculadoras online gratuitas para finanças, trabalho, porcentagens, investimentos e situações do dia a dia.",

  applicationName: "ResultaAí",

  keywords: [
    "calculadora online",
    "calculadoras online",
    "calculadora grátis",
    "calculadora de salário",
    "calculadora de salário líquido",
    "calculadora de férias",
    "calculadora de rescisão",
    "calculadora de décimo terceiro",
    "calculadora de 13º salário",
    "calculadora de juros compostos",
    "calculadora de porcentagem",
    "cálculos trabalhistas",
    "calculadoras financeiras",
  ],

  authors: [{ name: "ResultaAí" }],
  creator: "ResultaAí",
  publisher: "ResultaAí",
  category: "finance",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "ResultaAí | Calculadoras Online",
    description:
      "Calcule rápido. Resolva fácil. Calculadoras online gratuitas para finanças, trabalho e situações do dia a dia.",
    url: "https://resultaai.com.br",
    type: "website",
    locale: "pt_BR",
    siteName: "ResultaAí",
  },

  twitter: {
    card: "summary",
    title: "ResultaAí | Calculadoras Online",
    description:
      "Calcule rápido. Resolva fácil. Calculadoras online gratuitas para finanças, trabalho e situações do dia a dia.",
  },

  icons: {
  icon: "/icon.svg",
},

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />

        {children}

        <Footer />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-41PGCVNFKX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-41PGCVNFKX');
          `}
        </Script>
      </body>
    </html>
  );
}