import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Calculadora de Férias 2026",

  description:
    "Calcule suas férias em 2026. Veja uma estimativa do valor bruto, adicional de 1/3, venda de férias, INSS, IRRF e valor líquido a receber.",

  keywords: [
    "calculadora de férias",
    "calculadora de férias 2026",
    "calcular férias",
    "cálculo de férias",
    "férias 2026",
    "quanto vou receber de férias",
    "venda de férias",
    "vender 10 dias de férias",
    "abono pecuniário",
    "um terço de férias",
    "1/3 de férias",
    "férias com abono pecuniário",
    "férias líquidas",
    "INSS férias",
    "IRRF férias",
  ],

  openGraph: {
    title: "Calculadora de Férias 2026 | ResultaAí",
    description:
      "Calcule gratuitamente quanto você pode receber nas férias em 2026, incluindo adicional de 1/3 e venda de férias.",
    type: "website",
    locale: "pt_BR",
    siteName: "ResultaAí",
  },

  twitter: {
    card: "summary",
    title: "Calculadora de Férias 2026 | ResultaAí",
    description:
      "Calcule gratuitamente quanto você pode receber nas férias em 2026, incluindo adicional de 1/3 e venda de férias.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function FeriasLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}