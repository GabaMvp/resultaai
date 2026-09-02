import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Calculadora de Rescisão Trabalhista 2026",

  description:
    "Calcule sua rescisão trabalhista em 2026. Estime saldo de salário, 13º proporcional, férias, aviso prévio, descontos e multa do FGTS.",

  keywords: [
    "calculadora de rescisão",
    "calculadora de rescisão 2026",
    "calculadora rescisão trabalhista",
    "calcular rescisão trabalhista",
    "cálculo de rescisão",
    "cálculo rescisório",
    "rescisão 2026",
    "demissão sem justa causa",
    "demissão com justa causa",
    "pedido de demissão",
    "aviso prévio",
    "multa de 40 do FGTS",
    "férias proporcionais rescisão",
    "13 salário proporcional rescisão",
    "quanto vou receber de rescisão",
  ],

  openGraph: {
    title: "Calculadora de Rescisão Trabalhista 2026 | ResultaAí",
    description:
      "Estime gratuitamente os principais valores da sua rescisão trabalhista em 2026.",
    type: "website",
    locale: "pt_BR",
    siteName: "ResultaAí",
  },

  twitter: {
    card: "summary",
    title: "Calculadora de Rescisão Trabalhista 2026 | ResultaAí",
    description:
      "Estime gratuitamente os principais valores da sua rescisão trabalhista em 2026.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RescisaoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}