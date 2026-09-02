import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Calculadora de 13º Salário 2026",

  description:
    "Calcule seu 13º salário de 2026 gratuitamente. Veja o valor bruto, primeira parcela, descontos estimados de INSS e IRRF e o valor da segunda parcela.",

  keywords: [
    "calculadora de 13 salário",
    "calculadora de 13 salário 2026",
    "calculadora décimo terceiro",
    "décimo terceiro 2026",
    "calcular décimo terceiro",
    "cálculo 13 salário",
    "primeira parcela 13 salário",
    "segunda parcela 13 salário",
    "quanto vou receber de décimo terceiro",
  ],

  openGraph: {
    title: "Calculadora de 13º Salário 2026 | ResultaAí",
    description:
      "Calcule gratuitamente seu décimo terceiro salário de 2026 e veja uma estimativa das parcelas e descontos.",
    type: "website",
    locale: "pt_BR",
    siteName: "ResultaAí",
  },

  twitter: {
    card: "summary",
    title: "Calculadora de 13º Salário 2026 | ResultaAí",
    description:
      "Calcule gratuitamente seu décimo terceiro salário de 2026 e veja uma estimativa das parcelas e descontos.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function DecimoTerceiroLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}