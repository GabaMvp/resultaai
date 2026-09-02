"use client";

import { FormEvent, useState } from "react";
import AdSlot from "../components/AdSlot";

export default function DecimoTerceiroPage() {
  const [salario, setSalario] = useState("");
  const [meses, setMeses] = useState("12");
  const [dependentes, setDependentes] = useState("0");
  const [erro, setErro] = useState("");

  const [resultado, setResultado] = useState<{
    bruto: number;
    primeiraParcela: number;
    inss: number;
    irrf: number;
    segundaParcela: number;
    liquido: number;
  } | null>(null);

  function formatarCampoDinheiro(valor: string) {
    const limpo = valor.replace(/[^\d,]/g, "");
    const partes = limpo.split(",");

    let inteira = partes[0] || "";
    let decimal = partes[1];

    inteira = inteira.replace(/^0+(?=\d)/, "");

    if (inteira) {
      inteira = Number(inteira).toLocaleString("pt-BR");
    }

    if (decimal !== undefined) {
      decimal = decimal.slice(0, 2);
      return `${inteira},${decimal}`;
    }

    return inteira;
  }

  function converterNumero(valor: string) {
    const limpo = valor.replace(/\./g, "").replace(",", ".");
    return Number(limpo);
  }

  function formatarDinheiro(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  function calcularINSS(valor: number) {
    const faixa1 = 1621;
    const faixa2 = 2902.84;
    const faixa3 = 4354.27;
    const teto = 8475.55;

    const base = Math.min(valor, teto);

    let inss = 0;

    if (base <= faixa1) {
      return base * 0.075;
    }

    inss += faixa1 * 0.075;

    if (base <= faixa2) {
      inss += (base - faixa1) * 0.09;
      return inss;
    }

    inss += (faixa2 - faixa1) * 0.09;

    if (base <= faixa3) {
      inss += (base - faixa2) * 0.12;
      return inss;
    }

    inss += (faixa3 - faixa2) * 0.12;

    inss += (base - faixa3) * 0.14;

    return inss;
  }

  function calcularIRRF(
    rendimentoBruto: number,
    inss: number,
    numeroDependentes: number
  ) {
    const deducaoDependentes = numeroDependentes * 189.59;

    const deducoesLegais = inss + deducaoDependentes;
    const descontoSimplificado = 607.2;

    const melhorDeducao = Math.max(
      deducoesLegais,
      descontoSimplificado
    );

    const base = Math.max(0, rendimentoBruto - melhorDeducao);

    let imposto = 0;

    if (base <= 2428.8) {
      imposto = 0;
    } else if (base <= 2826.65) {
      imposto = base * 0.075 - 182.16;
    } else if (base <= 3751.05) {
      imposto = base * 0.15 - 394.16;
    } else if (base <= 4664.68) {
      imposto = base * 0.225 - 675.49;
    } else {
      imposto = base * 0.275 - 908.73;
    }

    imposto = Math.max(0, imposto);

    let reducao = 0;

    if (rendimentoBruto <= 5000) {
      reducao = Math.min(imposto, 312.89);
    } else if (rendimentoBruto <= 7350) {
      reducao =
        978.62 - 0.133145 * rendimentoBruto;

      reducao = Math.max(0, Math.min(imposto, reducao));
    }

    return Math.max(0, imposto - reducao);
  }

  function calcular(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");

    const salarioInformado = converterNumero(salario);
    const mesesInformados = Math.floor(Number(meses));
    const dependentesInformados = Math.max(
      0,
      Math.floor(Number(dependentes))
    );

    if (!salario.trim() || salarioInformado <= 0) {
      setResultado(null);
      setErro("Informe seu salário bruto.");
      return;
    }

    if (
      Number.isNaN(mesesInformados) ||
      mesesInformados < 1 ||
      mesesInformados > 12
    ) {
      setResultado(null);
      setErro("Informe uma quantidade de meses entre 1 e 12.");
      return;
    }

    const bruto =
      (salarioInformado / 12) * mesesInformados;

    const primeiraParcela = bruto / 2;

    const inss = calcularINSS(bruto);

    const irrf = calcularIRRF(
      bruto,
      inss,
      dependentesInformados
    );

    const liquido = Math.max(
      0,
      bruto - inss - irrf
    );

    const segundaParcela = Math.max(
      0,
      bruto - primeiraParcela - inss - irrf
    );

    setResultado({
      bruto,
      primeiraParcela,
      inss,
      irrf,
      segundaParcela,
      liquido,
    });
  }

  function limpar() {
    setSalario("");
    setMeses("12");
    setDependentes("0");
    setErro("");
    setResultado(null);
  }

  const calculadorasRelacionadas = [
    {
      nome: "Rescisão",
      descricao:
        "Estime os valores que você pode receber ao encerrar um contrato de trabalho.",
      href: "/rescisao",
    },
    {
      nome: "Férias",
      descricao:
        "Calcule quanto você pode receber no período de férias.",
      href: "/ferias",
    },
    {
      nome: "Salário líquido",
      descricao:
        "Descubra quanto sobra do salário depois dos descontos.",
      href: "/salario-liquido",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
          Trabalho
        </p>

        <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.03em] text-[#0F172A] sm:text-4xl md:text-5xl">
          Calculadora de 13º Salário
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-[#64748B] sm:mt-4 sm:text-lg sm:leading-8">
          Descubra quanto você pode receber de décimo terceiro em 2026.
        </p>

        <form
          onSubmit={calcular}
          className="mt-7 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm sm:mt-10 sm:rounded-3xl"
        >
          <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-2 md:gap-6 md:p-8">
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Qual é o seu salário bruto?
              </span>

              <div className="flex min-h-14 items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 transition focus-within:border-[#2563EB]">
                <span className="shrink-0 text-sm text-[#64748B] sm:text-base">
                  R$
                </span>

                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 3.500"
                  value={salario}
                  onChange={(e) =>
                    setSalario(
                      formatarCampoDinheiro(e.target.value)
                    )
                  }
                  className="min-w-0 w-full bg-transparent px-2 py-4 text-base text-[#0F172A] outline-none placeholder:text-black/30"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Quantos meses você trabalhou no ano?
              </span>

              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="12"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-base text-[#0F172A] outline-none transition focus:border-[#2563EB]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Quantos dependentes você tem?
              </span>

              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={dependentes}
                onChange={(e) =>
                  setDependentes(e.target.value)
                }
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-base text-[#0F172A] outline-none transition focus:border-[#2563EB]"
              />
            </label>

            {erro && (
              <div
                aria-live="polite"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 md:col-span-2"
              >
                {erro}
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-2">
              <button
                type="submit"
                className="min-h-14 w-full rounded-xl bg-[#2563EB] px-5 py-4 text-base font-bold text-white transition hover:bg-[#1D4ED8] active:scale-[0.99]"
              >
                Calcular meu 13º
              </button>

              <button
                type="button"
                onClick={limpar}
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-white px-5 py-4 text-base font-bold text-[#0F172A] transition hover:bg-[#F8FAFC] active:scale-[0.99]"
              >
                Limpar
              </button>
            </div>
          </div>

          {resultado && (
            <div className="bg-[#0F172A] p-5 text-white sm:p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 sm:text-sm">
                Seu 13º líquido estimado
              </p>

              <p className="mt-2 break-words text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                {formatarDinheiro(resultado.liquido)}
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-white/55">
                    13º bruto
                  </p>

                  <p className="mt-1 text-lg font-bold sm:text-xl">
                    {formatarDinheiro(resultado.bruto)}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-white/55">
                    1ª parcela
                  </p>

                  <p className="mt-1 text-lg font-bold sm:text-xl">
                    {formatarDinheiro(
                      resultado.primeiraParcela
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-white/55">
                    INSS estimado
                  </p>

                  <p className="mt-1 text-lg font-bold sm:text-xl">
                    - {formatarDinheiro(resultado.inss)}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-white/55">
                    IRRF estimado
                  </p>

                  <p className="mt-1 text-lg font-bold sm:text-xl">
                    - {formatarDinheiro(resultado.irrf)}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-[#60A5FA]/20 bg-[#2563EB]/20 p-4">
                <p className="text-sm text-white/60">
                  2ª parcela estimada
                </p>

                <p className="mt-1 text-xl font-black text-[#60A5FA] sm:text-2xl">
                  {formatarDinheiro(
                    resultado.segundaParcela
                  )}
                </p>
              </div>
            </div>
          )}
        </form>

        <div className="my-8 sm:my-10">
          <AdSlot />
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:rounded-3xl sm:p-7 md:p-8">
          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            Como é calculado o 13º salário?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            O décimo terceiro corresponde a 1/12 da remuneração para cada mês
            trabalhado no ano. Quando o trabalhador completa pelo menos 15 dias
            de trabalho em determinado mês, esse período normalmente conta como
            um mês inteiro para o cálculo.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Quem trabalhou durante os 12 meses do ano recebe, em regra, o
            equivalente a uma remuneração mensal de 13º bruto.
          </p>

          <div className="my-8 sm:my-10">
            <AdSlot />
          </div>

          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            Como funcionam a primeira e a segunda parcela?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            A primeira parcela funciona como um adiantamento. Os descontos
            referentes ao valor total do décimo terceiro, como contribuição
            previdenciária e eventual Imposto de Renda, normalmente aparecem
            na segunda parcela.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Por isso, a segunda parcela geralmente é menor do que a primeira
            quando existem descontos.
          </p>

          <h2 className="mt-8 text-xl font-bold text-[#0F172A] sm:text-2xl">
            Quando o 13º deve ser pago?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            O adiantamento deve ser pago até 30 de novembro e a segunda parcela
            deve ser quitada até 20 de dezembro.
          </p>

          <p className="mt-6 text-sm leading-6 text-black/45">
            Esta calculadora apresenta uma estimativa com base nas tabelas de
            INSS e Imposto de Renda de 2026. Valores reais podem variar por
            verbas adicionais, médias de horas extras, comissões, pensão
            alimentícia e outras situações específicas.
          </p>

          <div className="mt-10 border-t border-black/10 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
              Perguntas frequentes
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              Dúvidas sobre o 13º salário
            </h2>

            <div className="mt-6 divide-y divide-black/10">
              <details className="group py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Quem trabalhou menos de um ano recebe 13º?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Sim. Nesse caso, o décimo terceiro normalmente é calculado de
                  forma proporcional aos meses trabalhados.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Trabalhei 15 dias no mês. Esse mês conta?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Em regra, sim. Uma fração igual ou superior a 15 dias de
                  trabalho é considerada como mês integral para o cálculo do
                  décimo terceiro.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    O INSS é descontado na primeira parcela?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Normalmente não. Os descontos referentes ao valor total do
                  décimo terceiro são feitos na segunda parcela.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    O 13º pode ter desconto de Imposto de Renda?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Sim. Dependendo do valor do décimo terceiro e das deduções
                  aplicáveis, pode existir retenção de Imposto de Renda.
                </p>
              </details>
            </div>
          </div>
        </section>

        <div className="my-8 sm:my-10">
          <AdSlot />
        </div>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
            Continue calculando
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
            Calculadoras relacionadas
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {calculadorasRelacionadas.map((calculadora) => (
              <a
                key={calculadora.nome}
                href={calculadora.href}
                className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:shadow-md"
              >
                <h3 className="font-bold text-[#0F172A]">
                  {calculadora.nome}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {calculadora.descricao}
                </p>

                <p className="mt-4 text-sm font-bold text-[#2563EB]">
                  Abrir calculadora →
                </p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}