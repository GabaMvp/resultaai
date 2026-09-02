import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos",

  description:
    "Calcule juros compostos gratuitamente. Simule valor inicial, aportes mensais, taxa de juros e período para descobrir o valor final e quanto seu dinheiro pode render.",

  keywords: [
    "calculadora de juros compostos",
    "juros compostos",
    "calcular juros compostos",
    "cálculo de juros compostos",
    "simulador de juros compostos",
    "simulador de investimentos",
    "calculadora de investimentos",
    "juros compostos com aportes mensais",
    "rendimento de investimentos",
    "simulação de investimentos",
    "quanto meu dinheiro vai render",
  ],

  openGraph: {
    title: "Calculadora de Juros Compostos | ResultaAí",
    description:
      "Simule gratuitamente quanto seu dinheiro pode crescer com juros compostos e aportes mensais.",
    type: "website",
    locale: "pt_BR",
    siteName: "ResultaAí",
  },

  twitter: {
    card: "summary",
    title: "Calculadora de Juros Compostos | ResultaAí",
    description:
      "Simule gratuitamente quanto seu dinheiro pode crescer com juros compostos e aportes mensais.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function JurosCompostosLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}