"use client";

import { FormEvent, useState } from "react";
import AdSlot from "../components/AdSlot";

export default function JurosCompostosPage() {
  const [valorInicial, setValorInicial] = useState("");
  const [aporteMensal, setAporteMensal] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [tipoTaxa, setTipoTaxa] = useState<"mes" | "ano">("mes");

  const [periodo, setPeriodo] = useState("");
  const [tipoPeriodo, setTipoPeriodo] = useState<"meses" | "anos">("meses");

  const [erro, setErro] = useState("");

  const [resultado, setResultado] = useState<{
    valorFinal: number;
    totalInvestido: number;
    totalJuros: number;
    resumo: string;
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

  function formatarTaxa(valor: string) {
    const limpo = valor.replace(/[^\d,]/g, "");
    const partes = limpo.split(",");

    let inteira = partes[0] || "";
    let decimal = partes[1];

    if (inteira.length > 3) {
      inteira = inteira.slice(0, 3);
    }

    if (decimal !== undefined) {
      decimal = decimal.slice(0, 4);
      return `${inteira},${decimal}`;
    }

    return inteira;
  }

  function converterNumero(valor: string) {
    const valorLimpo = valor.replace(/\./g, "").replace(",", ".");
    return Number(valorLimpo);
  }

  function formatarDinheiro(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  function calcular(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");

    const inicial = Math.max(0, converterNumero(valorInicial) || 0);
    const aporte = Math.max(0, converterNumero(aporteMensal) || 0);
    const taxaInformada = converterNumero(taxaJuros);
    const periodoInformado = Math.floor(converterNumero(periodo) || 0);

    if (inicial <= 0 && aporte <= 0) {
      setResultado(null);
      setErro(
        "Informe um valor inicial ou um valor que será investido por mês."
      );
      return;
    }

    if (taxaJuros.trim() === "" || Number.isNaN(taxaInformada)) {
      setResultado(null);
      setErro("Informe a taxa de rendimento.");
      return;
    }

    if (taxaInformada < 0) {
      setResultado(null);
      setErro("A taxa de rendimento não pode ser negativa.");
      return;
    }

    if (periodoInformado <= 0) {
      setResultado(null);
      setErro("Informe por quanto tempo o dinheiro ficará investido.");
      return;
    }

    const meses =
      tipoPeriodo === "anos" ? periodoInformado * 12 : periodoInformado;

    let taxaMensal: number;

    if (tipoTaxa === "ano") {
      const taxaAnualDecimal = taxaInformada / 100;

      taxaMensal = Math.pow(1 + taxaAnualDecimal, 1 / 12) - 1;
    } else {
      taxaMensal = taxaInformada / 100;
    }

    let saldo = inicial;

    for (let mes = 0; mes < meses; mes++) {
      saldo = saldo * (1 + taxaMensal);
      saldo = saldo + aporte;
    }

    const investido = inicial + aporte * meses;
    const juros = saldo - investido;

    const textoTaxa =
      tipoTaxa === "ano"
        ? `${taxaJuros}% ao ano`
        : `${taxaJuros}% ao mês`;

    const textoPeriodo =
      tipoPeriodo === "anos"
        ? `${periodoInformado} ${
            periodoInformado === 1 ? "ano" : "anos"
          }`
        : `${periodoInformado} ${
            periodoInformado === 1 ? "mês" : "meses"
          }`;

    setResultado({
      valorFinal: saldo,
      totalInvestido: investido,
      totalJuros: juros,
      resumo: `${textoTaxa} • ${textoPeriodo}`,
    });
  }

  function limpar() {
    setValorInicial("");
    setAporteMensal("");
    setTaxaJuros("");
    setTipoTaxa("mes");
    setPeriodo("");
    setTipoPeriodo("meses");
    setErro("");
    setResultado(null);
  }

  const calculadorasRelacionadas = [
    {
      nome: "Porcentagem",
      descricao: "Calcule aumentos, descontos e porcentagens.",
      href: "/porcentagem",
      disponivel: true,
    },
    {
      nome: "Financiamento",
      descricao: "Simule parcelas e o custo de um financiamento.",
      href: "#",
      disponivel: false,
    },
    {
      nome: "Desconto",
      descricao: "Descubra rapidamente o valor após um desconto.",
      href: "#",
      disponivel: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] sm:text-sm">
            Finanças
          </p>

          <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl">
            Calculadora de Juros Compostos
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-black/60 sm:mt-4 sm:text-lg sm:leading-8">
            Veja quanto seu dinheiro pode crescer ao longo do tempo.
          </p>
        </div>

        <form
          onSubmit={calcular}
          className="mt-7 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm sm:mt-10 sm:rounded-3xl"
        >
          <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-2 md:gap-6 md:p-8">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Quanto você já tem para investir?
              </span>

              <div className="flex min-h-14 items-center rounded-xl border border-black/10 bg-[#f7f8fa] px-4 transition focus-within:border-[#2563EB]">
                <span className="shrink-0 text-sm text-black/40 sm:text-base">
                  R$
                </span>

                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 10.000"
                  value={valorInicial}
                  onChange={(e) =>
                    setValorInicial(formatarCampoDinheiro(e.target.value))
                  }
                  className="min-w-0 w-full bg-transparent px-2 py-4 text-base outline-none placeholder:text-black/30"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Quanto você vai investir por mês?
              </span>

              <div className="flex min-h-14 items-center rounded-xl border border-black/10 bg-[#f7f8fa] px-4 transition focus-within:border-[#2563EB]">
                <span className="shrink-0 text-sm text-black/40 sm:text-base">
                  R$
                </span>

                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 500"
                  value={aporteMensal}
                  onChange={(e) =>
                    setAporteMensal(formatarCampoDinheiro(e.target.value))
                  }
                  className="min-w-0 w-full bg-transparent px-2 py-4 text-base outline-none placeholder:text-black/30"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Quanto o investimento rende?
              </span>

              <div className="flex min-h-14 items-center overflow-hidden rounded-xl border border-black/10 bg-[#f7f8fa] transition focus-within:border-[#2563EB]">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 1,0"
                  value={taxaJuros}
                  onChange={(e) =>
                    setTaxaJuros(formatarTaxa(e.target.value))
                  }
                  className="min-w-0 w-full bg-transparent px-4 py-4 text-base outline-none placeholder:text-black/30"
                />

                <select
                  value={tipoTaxa}
                  onChange={(e) =>
                    setTipoTaxa(e.target.value as "mes" | "ano")
                  }
                  className="h-14 shrink-0 cursor-pointer border-l border-black/10 bg-transparent px-3 text-sm font-medium outline-none sm:px-4 sm:text-base"
                >
                  <option value="mes">% ao mês</option>
                  <option value="ano">% ao ano</option>
                </select>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Por quanto tempo você vai investir?
              </span>

              <div className="flex min-h-14 items-center overflow-hidden rounded-xl border border-black/10 bg-[#f7f8fa] transition focus-within:border-[#2563EB]">
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  placeholder="Ex: 24"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="min-w-0 w-full bg-transparent px-4 py-4 text-base outline-none placeholder:text-black/30"
                />

                <select
                  value={tipoPeriodo}
                  onChange={(e) =>
                    setTipoPeriodo(e.target.value as "meses" | "anos")
                  }
                  className="h-14 shrink-0 cursor-pointer border-l border-black/10 bg-transparent px-3 text-sm font-medium outline-none sm:px-4 sm:text-base"
                >
                  <option value="meses">meses</option>
                  <option value="anos">anos</option>
                </select>
              </div>
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
                Calcular quanto vou ter
              </button>

              <button
                type="button"
                onClick={limpar}
                className="min-h-14 w-full rounded-xl border border-black/15 bg-white px-5 py-4 text-base font-bold text-[#0F172A] transition hover:bg-black/5 active:scale-[0.99]"
              >
                Limpar
              </button>
            </div>
          </div>

          {resultado && (
            <div className="bg-[#0F172A] p-5 text-white sm:p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 sm:text-sm">
                Você terá aproximadamente
              </p>

              <p className="mt-2 break-words text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                {formatarDinheiro(resultado.valorFinal)}
              </p>

              <p className="mt-3 text-sm font-medium text-white/50 sm:text-base">
                Simulação:{" "}
                <span className="text-[#60A5FA]">
                  {resultado.resumo}
                </span>
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-white/55">
                    Dinheiro colocado por você
                  </p>

                  <p className="mt-1 break-words text-lg font-bold sm:text-xl">
                    {formatarDinheiro(resultado.totalInvestido)}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-white/55">
                    Dinheiro ganho com juros
                  </p>

                  <p className="mt-1 break-words text-lg font-bold text-[#22C55E] sm:text-xl">
                    {formatarDinheiro(resultado.totalJuros)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="my-8 sm:my-10">
          <AdSlot nome="Espaço para anúncio" />
        </div>

        <section className="rounded-2xl bg-white p-5 sm:rounded-3xl sm:p-7 md:p-8">
          <h2 className="text-xl font-bold leading-tight text-[#0F172A] sm:text-2xl">
            Como funciona a calculadora de juros compostos?
          </h2>

          <p className="mt-4 text-base leading-7 text-black/60">
            Informe o valor inicial, quanto pretende investir por mês, a taxa
            de rendimento e o período da simulação.
          </p>

          <p className="mt-4 text-base leading-7 text-black/60">
            Você pode informar o rendimento ao mês ou ao ano. Quando a taxa
            anual é selecionada, o ResultaAí converte automaticamente para uma
            taxa mensal equivalente.
          </p>

          <p className="mt-4 text-base leading-7 text-black/60">
            O resultado mostra quanto você terá aproximadamente, quanto foi
            colocado por você e quanto desse valor foi acumulado através dos
            juros.
          </p>

          <div className="my-8 sm:my-10">
            <AdSlot nome="Espaço para anúncio" />
          </div>

          <h2 className="text-xl font-bold leading-tight text-[#0F172A] sm:text-2xl">
            O que são juros compostos?
          </h2>

          <p className="mt-4 text-base leading-7 text-black/60">
            Juros compostos são juros calculados sobre o valor acumulado. Isso
            significa que os rendimentos obtidos anteriormente também passam a
            fazer parte do saldo e podem gerar novos rendimentos.
          </p>

          <p className="mt-4 text-base leading-7 text-black/60">
            Esse efeito costuma ficar mais evidente conforme o tempo passa. Por
            isso, prazo, taxa de rendimento e frequência dos aportes fazem
            diferença no resultado de uma simulação.
          </p>

          <h2 className="mt-8 text-xl font-bold leading-tight text-[#0F172A] sm:text-2xl">
            Como os aportes mensais entram no cálculo?
          </h2>

          <p className="mt-4 text-base leading-7 text-black/60">
            Nesta calculadora, o aporte mensal é considerado no final de cada
            mês. Primeiro é aplicado o rendimento daquele mês sobre o saldo
            acumulado e, em seguida, o novo aporte é adicionado.
          </p>

          <p className="mt-4 text-base leading-7 text-black/60">
            Dessa forma, o resultado permite visualizar separadamente quanto
            dinheiro foi colocado por você e quanto foi obtido através dos
            juros.
          </p>

          <p className="mt-6 text-sm leading-6 text-black/45">
            Esta ferramenta apresenta uma simulação matemática. O resultado
            real de um investimento pode variar devido a impostos, taxas,
            mudanças de rentabilidade e outras condições.
          </p>

          <div className="mt-10 border-t border-black/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] sm:text-sm">
              Perguntas frequentes
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              Dúvidas sobre juros compostos
            </h2>

            <div className="mt-6 divide-y divide-black/10">
              <details className="group py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>Como calcular juros compostos?</span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-3xl text-base leading-7 text-black/60">
                  Os juros compostos são calculados sobre o valor acumulado ao
                  longo do tempo. Os juros de cada período entram no saldo e
                  também podem gerar novos juros nos períodos seguintes.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Qual a diferença entre juros simples e juros compostos?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-3xl text-base leading-7 text-black/60">
                  Nos juros simples, os juros são calculados sempre sobre uma
                  base fixa. Nos juros compostos, eles são incorporados ao saldo
                  acumulado, fazendo com que os rendimentos anteriores também
                  possam gerar novos rendimentos.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>Como converter uma taxa anual para mensal?</span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-3xl text-base leading-7 text-black/60">
                  Em juros compostos, dividir uma taxa anual por 12 não produz
                  necessariamente a taxa mensal equivalente. A calculadora faz
                  automaticamente a conversão considerando o efeito da
                  capitalização.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>Posso fazer aportes mensais na simulação?</span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-3xl text-base leading-7 text-black/60">
                  Sim. Informe quanto pretende adicionar todos os meses. A
                  calculadora inclui esses aportes durante todo o período da
                  simulação.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0F172A]">
                  <span>O resultado da calculadora é garantido?</span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-3xl text-base leading-7 text-black/60">
                  Não. O resultado é uma simulação matemática baseada nos
                  valores informados. Investimentos reais podem ter variações de
                  rentabilidade, impostos, taxas e outras condições.
                </p>
              </details>
            </div>
          </div>
        </section>

        <div className="my-8 sm:my-10">
          <AdSlot nome="Espaço para anúncio" />
        </div>

        <section>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] sm:text-sm">
              Continue calculando
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              Calculadoras relacionadas
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {calculadorasRelacionadas.map((calculadora) => (
              <a
                key={calculadora.nome}
                href={calculadora.href}
                className="rounded-2xl border border-black/10 bg-white p-5 transition hover:border-[#2563EB]/30"
              >
                <div className="flex items-start justify-between gap-3 sm:block">
                  <h3 className="font-bold text-[#0F172A]">
                    {calculadora.nome}
                  </h3>

                  {!calculadora.disponivel && (
                    <span className="shrink-0 rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-semibold text-black/40 sm:mt-4 sm:inline-block">
                      Em breve
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-black/55">
                  {calculadora.descricao}
                </p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}