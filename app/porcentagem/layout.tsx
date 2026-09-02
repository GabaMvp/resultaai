import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Calculadora de Porcentagem",

  description:
    "Calcule porcentagens gratuitamente. Descubra quanto é uma porcentagem de um valor, qual percentual um número representa, aumentos e descontos percentuais.",

  keywords: [
    "calculadora de porcentagem",
    "calcular porcentagem",
    "cálculo de porcentagem",
    "quanto é porcentagem",
    "porcentagem de um valor",
    "quantos por cento",
    "aumento percentual",
    "desconto percentual",
    "calcular desconto",
    "calcular aumento percentual",
    "regra de três porcentagem",
  ],

  openGraph: {
    title: "Calculadora de Porcentagem | ResultaAí",
    description:
      "Calcule porcentagens, aumentos e descontos de forma simples, rápida e gratuita.",
    type: "website",
    locale: "pt_BR",
    siteName: "ResultaAí",
  },

  twitter: {
    card: "summary",
    title: "Calculadora de Porcentagem | ResultaAí",
    description:
      "Calcule porcentagens, aumentos e descontos de forma simples, rápida e gratuita.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PorcentagemLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}