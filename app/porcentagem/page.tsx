"use client";

import { FormEvent, ReactNode, useState } from "react";
import AdSlot from "../components/AdSlot";

type TipoCalculo =
  | "percentual-de-valor"
  | "qual-percentual"
  | "aumento"
  | "desconto";

type Resultado = {
  titulo: string;
  valorPrincipal: number;
  prefixo?: string;
  sufixo?: string;
  resumo: string;
  formula: string;
  detalhes: {
    nome: string;
    valor: string;
  }[];
};

type CamposCalculo = {
  label1: string;
  placeholder1: string;
  prefixo1: string;
  sufixo1: string;

  label2: string;
  placeholder2: string;
  prefixo2: string;
  sufixo2: string;
};

export default function PorcentagemPage() {
  const [tipo, setTipo] =
    useState<TipoCalculo>("percentual-de-valor");

  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");

  const [erro, setErro] = useState("");

  const [resultado, setResultado] =
    useState<Resultado | null>(null);

  function formatarCampoNumero(valor: string) {
  const limpo = valor.replace(/[^\d,]/g, "");
  const partes = limpo.split(",");

  let inteira = partes[0] || "";
  const temVirgula = limpo.includes(",");
  const decimal = partes.slice(1).join("").slice(0, 4);

  inteira = inteira.replace(/^0+(?=\d)/, "");

  if (inteira) {
    inteira = Number(inteira).toLocaleString("pt-BR");
  }

  if (temVirgula) {
    return `${inteira},${decimal}`;
  }

  return inteira;
}

  function converterNumero(valor: string) {
    return Number(
      valor
        .replace(/\./g, "")
        .replace(",", ".")
    );
  }

  function formatarNumero(
    valor: number,
    maximoCasas = 2
  ) {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maximoCasas,
    }).format(valor);
  }

  function limparCampos() {
    setValor1("");
    setValor2("");
    setErro("");
    setResultado(null);
  }

  function trocarTipo(novoTipo: TipoCalculo) {
    setTipo(novoTipo);
    limparCampos();
  }

  function calcular(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErro("");
    setResultado(null);

    const numero1 = converterNumero(valor1);
    const numero2 = converterNumero(valor2);

    if (
      !valor1.trim() ||
      !valor2.trim() ||
      Number.isNaN(numero1) ||
      Number.isNaN(numero2)
    ) {
      setErro(
        "Preencha os dois campos para fazer o cálculo."
      );
      return;
    }

    if (tipo === "percentual-de-valor") {
      const percentual = numero1;
      const valor = numero2;

      const resultadoCalculo =
        (percentual / 100) * valor;

      setResultado({
        titulo: `${formatarNumero(
          percentual
        )}% de ${formatarNumero(valor)} é`,

        valorPrincipal: resultadoCalculo,

        resumo: `${formatarNumero(
          percentual
        )}% de ${formatarNumero(
          valor
        )} corresponde a ${formatarNumero(
          resultadoCalculo
        )}.`,

        formula: `${formatarNumero(
          percentual
        )} ÷ 100 × ${formatarNumero(
          valor
        )} = ${formatarNumero(
          resultadoCalculo
        )}`,

        detalhes: [
          {
            nome: "Porcentagem informada",
            valor: `${formatarNumero(
              percentual
            )}%`,
          },
          {
            nome: "Valor base",
            valor: formatarNumero(valor),
          },
          {
            nome: "Resultado",
            valor: formatarNumero(
              resultadoCalculo
            ),
          },
        ],
      });

      return;
    }

    if (tipo === "qual-percentual") {
      const parte = numero1;
      const total = numero2;

      if (total === 0) {
        setErro(
          "O valor total precisa ser maior que zero."
        );
        return;
      }

      const percentual =
        (parte / total) * 100;

      setResultado({
        titulo: `${formatarNumero(
          parte
        )} representa`,

        valorPrincipal: percentual,

        sufixo: "%",

        resumo: `${formatarNumero(
          parte
        )} corresponde a ${formatarNumero(
          percentual
        )}% de ${formatarNumero(total)}.`,

        formula: `${formatarNumero(
          parte
        )} ÷ ${formatarNumero(
          total
        )} × 100 = ${formatarNumero(
          percentual
        )}%`,

        detalhes: [
          {
            nome: "Valor parcial",
            valor: formatarNumero(parte),
          },
          {
            nome: "Valor total",
            valor: formatarNumero(total),
          },
          {
            nome: "Percentual",
            valor: `${formatarNumero(
              percentual
            )}%`,
          },
        ],
      });

      return;
    }

    if (tipo === "aumento") {
      const valorOriginal = numero1;
      const percentual = numero2;

      const valorAumento =
        (percentual / 100) *
        valorOriginal;

      const novoValor =
        valorOriginal + valorAumento;

      setResultado({
        titulo: "Novo valor após o aumento",

        valorPrincipal: novoValor,

        resumo: `Um aumento de ${formatarNumero(
          percentual
        )}% sobre ${formatarNumero(
          valorOriginal
        )} adiciona ${formatarNumero(
          valorAumento
        )} ao valor original.`,

        formula: `${formatarNumero(
          valorOriginal
        )} + (${formatarNumero(
          percentual
        )}% × ${formatarNumero(
          valorOriginal
        )}) = ${formatarNumero(
          novoValor
        )}`,

        detalhes: [
          {
            nome: "Valor original",
            valor: formatarNumero(
              valorOriginal
            ),
          },
          {
            nome: "Percentual de aumento",
            valor: `${formatarNumero(
              percentual
            )}%`,
          },
          {
            nome: "Valor do aumento",
            valor: formatarNumero(
              valorAumento
            ),
          },
          {
            nome: "Novo valor",
            valor: formatarNumero(
              novoValor
            ),
          },
        ],
      });

      return;
    }

    if (tipo === "desconto") {
      const valorOriginal = numero1;
      const percentual = numero2;

      if (percentual > 100) {
        setErro(
          "Para desconto, informe uma porcentagem de até 100%."
        );
        return;
      }

      const valorDesconto =
        (percentual / 100) *
        valorOriginal;

      const novoValor =
        valorOriginal - valorDesconto;

      setResultado({
        titulo: "Valor após o desconto",

        valorPrincipal: novoValor,

        resumo: `Um desconto de ${formatarNumero(
          percentual
        )}% sobre ${formatarNumero(
          valorOriginal
        )} reduz o valor em ${formatarNumero(
          valorDesconto
        )}.`,

        formula: `${formatarNumero(
          valorOriginal
        )} - (${formatarNumero(
          percentual
        )}% × ${formatarNumero(
          valorOriginal
        )}) = ${formatarNumero(
          novoValor
        )}`,

        detalhes: [
          {
            nome: "Valor original",
            valor: formatarNumero(
              valorOriginal
            ),
          },
          {
            nome: "Percentual de desconto",
            valor: `${formatarNumero(
              percentual
            )}%`,
          },
          {
            nome: "Valor do desconto",
            valor: formatarNumero(
              valorDesconto
            ),
          },
          {
            nome: "Valor final",
            valor: formatarNumero(
              novoValor
            ),
          },
        ],
      });
    }
  }

  function obterCampos(): CamposCalculo {
    if (tipo === "percentual-de-valor") {
      return {
        label1: "Qual é a porcentagem?",
        placeholder1: "Ex: 20",
        prefixo1: "",
        sufixo1: "%",

        label2: "De qual valor?",
        placeholder2: "Ex: 500",
        prefixo2: "",
        sufixo2: "",
      };
    }

    if (tipo === "qual-percentual") {
      return {
        label1: "Qual é o valor parcial?",
        placeholder1: "Ex: 50",
        prefixo1: "",
        sufixo1: "",

        label2: "Qual é o valor total?",
        placeholder2: "Ex: 200",
        prefixo2: "",
        sufixo2: "",
      };
    }

    if (tipo === "aumento") {
      return {
        label1: "Qual é o valor original?",
        placeholder1: "Ex: 1.000",
        prefixo1: "",
        sufixo1: "",

        label2: "Qual é o aumento?",
        placeholder2: "Ex: 10",
        prefixo2: "",
        sufixo2: "%",
      };
    }

    return {
      label1: "Qual é o valor original?",
      placeholder1: "Ex: 250",
      prefixo1: "",
      sufixo1: "",

      label2: "Qual é o desconto?",
      placeholder2: "Ex: 15",
      prefixo2: "",
      sufixo2: "%",
    };
  }

  const campos = obterCampos();

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
          Matemática
        </p>

        <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.03em] text-[#0F172A] sm:text-4xl md:text-5xl">
          Calculadora de Porcentagem
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-[#64748B] sm:mt-4 sm:text-lg sm:leading-8">
          Calcule porcentagens, aumentos e descontos de forma rápida e
          simples.
        </p>

        <section className="mt-7 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm sm:mt-10 sm:rounded-3xl">
          <div className="border-b border-[#E2E8F0] p-4 sm:p-6 md:p-8">
            <p className="mb-3 text-sm font-semibold text-[#0F172A]">
              O que você quer calcular?
            </p>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <BotaoTipo
                ativo={
                  tipo ===
                  "percentual-de-valor"
                }
                onClick={() =>
                  trocarTipo(
                    "percentual-de-valor"
                  )
                }
              >
                X% de um valor
              </BotaoTipo>

              <BotaoTipo
                ativo={
                  tipo ===
                  "qual-percentual"
                }
                onClick={() =>
                  trocarTipo(
                    "qual-percentual"
                  )
                }
              >
                Qual é a %
              </BotaoTipo>

              <BotaoTipo
                ativo={tipo === "aumento"}
                onClick={() =>
                  trocarTipo("aumento")
                }
              >
                Aumento
              </BotaoTipo>

              <BotaoTipo
                ativo={tipo === "desconto"}
                onClick={() =>
                  trocarTipo("desconto")
                }
              >
                Desconto
              </BotaoTipo>
            </div>
          </div>

          <form
            onSubmit={calcular}
            className="grid grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-2 md:gap-6 md:p-8"
          >
            <CampoNumero
              label={campos.label1}
              placeholder={
                campos.placeholder1
              }
              valor={valor1}
              onChange={(valor) =>
                setValor1(
                  formatarCampoNumero(valor)
                )
              }
              prefixo={campos.prefixo1}
              sufixo={campos.sufixo1}
            />

            <CampoNumero
              label={campos.label2}
              placeholder={
                campos.placeholder2
              }
              valor={valor2}
              onChange={(valor) =>
                setValor2(
                  formatarCampoNumero(valor)
                )
              }
              prefixo={campos.prefixo2}
              sufixo={campos.sufixo2}
            />

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
                className="min-h-14 rounded-xl bg-[#2563EB] px-5 py-4 text-base font-bold text-white transition hover:bg-[#1D4ED8] active:scale-[0.99]"
              >
                Calcular porcentagem
              </button>

              <button
                type="button"
                onClick={limparCampos}
                className="min-h-14 rounded-xl border border-[#E2E8F0] bg-white px-5 py-4 text-base font-bold text-[#0F172A] transition hover:bg-[#F8FAFC]"
              >
                Limpar
              </button>
            </div>
          </form>
        </section>

        {resultado && (
          <section className="mt-8 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white sm:mt-10 sm:rounded-3xl">
            <div className="bg-[#0F172A] px-5 py-6 text-white sm:px-7 md:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                {resultado.titulo}
              </p>

              <p className="mt-3 break-words text-4xl font-black text-[#60A5FA] sm:text-5xl">
                {resultado.prefixo}
                {formatarNumero(
                  resultado.valorPrincipal
                )}
                {resultado.sufixo}
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                {resultado.resumo}
              </p>
            </div>

            <div className="p-5 sm:p-7 md:p-8">
              <div>
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <h2 className="text-lg font-black text-[#0F172A]">
                    Detalhes do cálculo
                  </h2>

                  <span className="text-sm font-bold text-[#64748B]">
                    Valores
                  </span>
                </div>

                {resultado.detalhes.map(
                  (item) => (
                    <div
                      key={item.nome}
                      className="flex items-center justify-between gap-5 border-b border-[#E2E8F0] py-4"
                    >
                      <p className="text-sm font-medium text-[#334155] sm:text-base">
                        {item.nome}
                      </p>

                      <p className="shrink-0 text-sm font-bold text-[#0F172A] sm:text-base">
                        {item.valor}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">
                  Conta utilizada
                </p>

                <p className="mt-3 break-words text-base font-bold leading-7 text-[#0F172A]">
                  {resultado.formula}
                </p>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
                  Entenda o resultado
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#0F172A]">
                  Como chegamos a esse valor?
                </h2>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  {tipo ===
                    "percentual-de-valor" &&
                    "Primeiro transformamos a porcentagem em número decimal dividindo por 100. Depois multiplicamos esse valor pelo número informado."}

                  {tipo ===
                    "qual-percentual" &&
                    "Dividimos o valor parcial pelo valor total e multiplicamos o resultado por 100. Assim descobrimos qual porcentagem uma quantidade representa da outra."}

                  {tipo === "aumento" &&
                    "Calculamos primeiro o percentual de aumento sobre o valor original. Depois somamos esse aumento ao valor inicial."}

                  {tipo === "desconto" &&
                    "Calculamos primeiro quanto representa o percentual de desconto. Depois subtraímos esse valor do preço ou número original."}
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="my-8 sm:my-10">
          <AdSlot />
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:rounded-3xl sm:p-7 md:p-8">
          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            Como calcular porcentagem?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Porcentagem representa uma parte de um total dividido em 100
            partes. Por exemplo, 20% significa 20 partes de cada 100.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Para descobrir quanto é 20% de 500, basta dividir 20 por 100 e
            multiplicar o resultado por 500. Nesse caso, o resultado é 100.
          </p>

          <div className="my-8 sm:my-10">
            <AdSlot />
          </div>

          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            Como calcular desconto percentual?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Para calcular um desconto, descubra primeiro quanto a porcentagem
            representa do valor original e depois subtraia esse resultado.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Um produto de 200 com desconto de 10%, por exemplo, recebe uma
            redução de 20 e passa a custar 180.
          </p>

          <h2 className="mt-8 text-xl font-bold text-[#0F172A] sm:text-2xl">
            Como calcular aumento percentual?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            O raciocínio é semelhante ao desconto. Primeiro calculamos a
            porcentagem sobre o valor original e depois adicionamos o resultado
            ao valor inicial.
          </p>

          <div className="mt-10 border-t border-black/10 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
              Perguntas frequentes
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
              Dúvidas sobre porcentagem
            </h2>

            <div className="mt-6 divide-y divide-black/10">
              <details className="group py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Quanto é 10% de 100?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  10% de 100 é 10. Basta fazer 10 ÷ 100 × 100.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Como saber quantos por cento um número representa de outro?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Divida o valor parcial pelo valor total e multiplique por 100.
                  Por exemplo, 50 ÷ 200 × 100 = 25%.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Como calcular 30% de desconto?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Multiplique o valor original por 0,30 para descobrir o
                  desconto. Depois subtraia esse resultado do valor original.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Porcentagem pode ser maior que 100%?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Sim. Uma porcentagem maior que 100% representa uma quantidade
                  maior do que o valor usado como referência. Um aumento de
                  150%, por exemplo, acrescenta uma vez e meia o valor original.
                </p>
              </details>
            </div>
          </div>
        </section>

        <div className="my-8 sm:my-10">
          <AdSlot />
        </div>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
            Continue calculando
          </p>

          <h2 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
            Calculadoras relacionadas
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a
              href="/juros-compostos"
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#2563EB]/40"
            >
              <h3 className="font-bold text-[#0F172A]">
                Juros compostos
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Simule o crescimento de um investimento ao longo do tempo.
              </p>

              <p className="mt-4 text-sm font-bold text-[#2563EB]">
                Abrir calculadora →
              </p>
            </a>

            <a
              href="/salario-liquido"
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#2563EB]/40"
            >
              <h3 className="font-bold text-[#0F172A]">
                Salário líquido
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Descubra quanto sobra depois dos principais descontos.
              </p>

              <p className="mt-4 text-sm font-bold text-[#2563EB]">
                Abrir calculadora →
              </p>
            </a>

            <a
              href="/ferias"
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#2563EB]/40"
            >
              <h3 className="font-bold text-[#0F172A]">
                Férias
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Calcule quanto você pode receber nas suas férias.
              </p>

              <p className="mt-4 text-sm font-bold text-[#2563EB]">
                Abrir calculadora →
              </p>
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}

function BotaoTipo({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-12 rounded-xl border px-3 py-2 text-sm font-bold transition ${
        ativo
          ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
          : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
      }`}
    >
      {children}
    </button>
  );
}

function CampoNumero({
  label,
  placeholder,
  valor,
  onChange,
  prefixo,
  sufixo,
}: {
  label: string;
  placeholder: string;
  valor: string;
  onChange: (valor: string) => void;
  prefixo?: string;
  sufixo?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
        {label}
      </span>

      <div className="flex min-h-14 items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 transition focus-within:border-[#2563EB]">
        {prefixo && (
          <span className="shrink-0 text-sm text-[#64748B] sm:text-base">
            {prefixo}
          </span>
        )}

        <input
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          value={valor}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="min-w-0 w-full bg-transparent px-2 py-4 text-base text-[#0F172A] outline-none placeholder:text-black/30"
        />

        {sufixo && (
          <span className="shrink-0 text-sm font-semibold text-[#64748B] sm:text-base">
            {sufixo}
          </span>
        )}
      </div>
    </label>
  );
}