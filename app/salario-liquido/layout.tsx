import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Calculadora de Salário Líquido 2026",

  description:
    "Calcule seu salário líquido em 2026. Veja uma estimativa dos descontos de INSS, IRRF e outros descontos para saber quanto você pode receber.",

  keywords: [
    "calculadora salário líquido",
    "calculadora de salário líquido",
    "calculadora salário líquido 2026",
    "salário líquido 2026",
    "calcular salário líquido",
    "cálculo salário líquido",
    "quanto vou receber líquido",
    "quanto vou receber de salário",
    "desconto INSS salário",
    "desconto IRRF salário",
    "INSS 2026",
    "IRRF 2026",
    "salário bruto para líquido",
  ],

  openGraph: {
    title: "Calculadora de Salário Líquido 2026 | ResultaAí",
    description:
      "Calcule gratuitamente seu salário líquido em 2026 e veja uma estimativa dos descontos de INSS e IRRF.",
    type: "website",
    locale: "pt_BR",
    siteName: "ResultaAí",
  },

  twitter: {
    card: "summary",
    title: "Calculadora de Salário Líquido 2026 | ResultaAí",
    description:
      "Calcule gratuitamente seu salário líquido em 2026 e veja uma estimativa dos descontos de INSS e IRRF.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function SalarioLiquidoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}