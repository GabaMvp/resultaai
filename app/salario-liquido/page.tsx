"use client";

import { FormEvent, useState } from "react";
import AdSlot from "../components/AdSlot";

type LinhaResultado = {
  nome: string;
  valor: number;
  explicacao: string;
};

export default function SalarioLiquidoPage() {
  const [salarioBruto, setSalarioBruto] = useState("");
  const [dependentes, setDependentes] = useState("0");
  const [outrosDescontos, setOutrosDescontos] = useState("");

  const [erro, setErro] = useState("");

  const [resultado, setResultado] = useState<{
    salarioBruto: number;
    inss: number;
    irrf: number;
    outrosDescontos: number;
    totalDescontos: number;
    salarioLiquido: number;
    fgts: number;
    descontos: LinhaResultado[];
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
    const limpo = valor
      .replace(/\./g, "")
      .replace(",", ".");

    return Number(limpo);
  }

  function formatarDinheiro(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  function calcularINSS(valor: number) {
    if (valor <= 0) {
      return 0;
    }

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
    salario: number,
    inss: number,
    numeroDependentes: number
  ) {
    if (salario <= 0) {
      return 0;
    }

    const deducaoPorDependente = 189.59;

    const deducoesLegais =
      inss +
      numeroDependentes * deducaoPorDependente;

    const descontoSimplificado = 607.2;

    const deducaoUtilizada = Math.max(
      deducoesLegais,
      descontoSimplificado
    );

    const baseCalculo = Math.max(
      0,
      salario - deducaoUtilizada
    );

    let imposto = 0;

    if (baseCalculo <= 2428.8) {
      imposto = 0;
    } else if (baseCalculo <= 2826.65) {
      imposto =
        baseCalculo * 0.075 -
        182.16;
    } else if (baseCalculo <= 3751.05) {
      imposto =
        baseCalculo * 0.15 -
        394.16;
    } else if (baseCalculo <= 4664.68) {
      imposto =
        baseCalculo * 0.225 -
        675.49;
    } else {
      imposto =
        baseCalculo * 0.275 -
        908.73;
    }

    imposto = Math.max(
      0,
      imposto
    );

    let reducao = 0;

    if (salario <= 5000) {
      reducao = imposto;
    } else if (salario <= 7350) {
      reducao =
        978.62 -
        0.133145 * salario;

      reducao = Math.max(
        0,
        Math.min(
          imposto,
          reducao
        )
      );
    }

    return Math.max(
      0,
      imposto - reducao
    );
  }

  function adicionarLinha(
    lista: LinhaResultado[],
    nome: string,
    valor: number,
    explicacao: string
  ) {
    if (valor > 0.005) {
      lista.push({
        nome,
        valor,
        explicacao,
      });
    }
  }

  function calcular(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErro("");

    const bruto =
      converterNumero(
        salarioBruto
      );

    const numeroDependentes =
      Math.max(
        0,
        Math.floor(
          Number(dependentes) || 0
        )
      );

    const descontosExtras =
      Math.max(
        0,
        converterNumero(
          outrosDescontos
        ) || 0
      );

    if (
      !salarioBruto.trim() ||
      bruto <= 0
    ) {
      setResultado(null);
      setErro(
        "Informe seu salário bruto."
      );
      return;
    }

    if (
      descontosExtras > bruto
    ) {
      setResultado(null);
      setErro(
        "Os outros descontos não podem ser maiores que o salário bruto."
      );
      return;
    }

    const inss =
      calcularINSS(bruto);

    const irrf =
      calcularIRRF(
        bruto,
        inss,
        numeroDependentes
      );

    const totalDescontos =
      inss +
      irrf +
      descontosExtras;

    const salarioLiquido =
      Math.max(
        0,
        bruto -
          totalDescontos
      );

    const fgts =
      bruto * 0.08;

    const descontos: LinhaResultado[] =
      [];

    adicionarLinha(
      descontos,
      "INSS",
      inss,
      "Contribuição previdenciária calculada de forma progressiva sobre o salário, respeitando as faixas e o teto utilizados pela calculadora."
    );

    adicionarLinha(
      descontos,
      "IRRF",
      irrf,
      numeroDependentes > 0
        ? `Estimativa do Imposto de Renda considerando ${numeroDependentes} dependente(s) e a forma de dedução mais vantajosa entre as opções consideradas pela calculadora.`
        : "Estimativa do Imposto de Renda considerando as regras mensais utilizadas pela calculadora."
    );

    adicionarLinha(
      descontos,
      "Outros descontos",
      descontosExtras,
      "Valor informado por você para representar descontos como consignado CLT, plano de saúde, empréstimos, sindicato, faltas ou outros itens da folha."
    );

    setResultado({
      salarioBruto: bruto,
      inss,
      irrf,
      outrosDescontos:
        descontosExtras,
      totalDescontos,
      salarioLiquido,
      fgts,
      descontos,
    });
  }

  function limpar() {
    setSalarioBruto("");
    setDependentes("0");
    setOutrosDescontos("");
    setErro("");
    setResultado(null);
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
          Trabalho
        </p>

        <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.03em] text-[#0F172A] sm:text-4xl md:text-5xl">
          Calculadora de Salário Líquido
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-[#64748B] sm:mt-4 sm:text-lg sm:leading-8">
          Descubra quanto pode sobrar do seu salário depois dos principais
          descontos.
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
                  placeholder="Ex: 4.500"
                  value={salarioBruto}
                  onChange={(e) =>
                    setSalarioBruto(
                      formatarCampoDinheiro(
                        e.target.value
                      )
                    )
                  }
                  className="min-w-0 w-full bg-transparent px-2 py-4 text-base text-[#0F172A] outline-none placeholder:text-black/30"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Quantos dependentes você tem?
              </span>

              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={dependentes}
                onChange={(e) =>
                  setDependentes(
                    e.target.value
                  )
                }
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-base text-[#0F172A] outline-none transition focus:border-[#2563EB]"
              />

              <p className="mt-2 text-sm leading-5 text-[#64748B]">
                Usado na estimativa do Imposto de Renda.
              </p>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Você possui outros descontos?
              </span>

              <p className="mb-2 text-sm leading-5 text-[#64748B]">
                Ex: consignado CLT, plano de saúde ou outros descontos.
              </p>

              <div className="flex min-h-14 items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 transition focus-within:border-[#2563EB]">
                <span className="shrink-0 text-sm text-[#64748B] sm:text-base">
                  R$
                </span>

                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 250"
                  value={
                    outrosDescontos
                  }
                  onChange={(e) =>
                    setOutrosDescontos(
                      formatarCampoDinheiro(
                        e.target.value
                      )
                    )
                  }
                  className="min-w-0 w-full bg-transparent px-2 py-4 text-base text-[#0F172A] outline-none placeholder:text-black/30"
                />
              </div>

              <p className="mt-2 text-sm leading-5 text-[#64748B]">
                Campo opcional.
              </p>
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
                className="min-h-14 rounded-xl bg-[#2563EB] px-5 py-4 text-base font-bold text-white transition hover:bg-[#1D4ED8] active:scale-[0.99]"
              >
                Calcular salário líquido
              </button>

              <button
                type="button"
                onClick={limpar}
                className="min-h-14 rounded-xl border border-[#E2E8F0] bg-white px-5 py-4 text-base font-bold text-[#0F172A] transition hover:bg-[#F8FAFC]"
              >
                Limpar
              </button>
            </div>
          </div>
        </form>

        {resultado && (
          <section className="mt-8 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white sm:mt-10 sm:rounded-3xl">
            <div className="bg-[#0F172A] px-5 py-6 text-white sm:px-7 md:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                Seu salário líquido estimado
              </p>

              <p className="mt-3 break-words text-4xl font-black text-[#60A5FA] sm:text-5xl">
                {formatarDinheiro(
                  resultado.salarioLiquido
                )}
              </p>

              <p className="mt-3 text-sm text-white/55 sm:text-base">
                Salário bruto de{" "}
                {formatarDinheiro(
                  resultado.salarioBruto
                )}
              </p>
            </div>

            <div className="p-5 sm:p-7 md:p-8">
              <div>
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <h3 className="text-lg font-black text-[#0F172A]">
                    Resumo
                  </h3>

                  <span className="text-sm font-bold text-[#64748B]">
                    Valores
                  </span>
                </div>

                <div className="flex items-start justify-between gap-5 border-b border-[#E2E8F0] py-4">
                  <p className="text-sm font-medium text-[#334155] sm:text-base">
                    Salário bruto
                  </p>

                  <p className="shrink-0 text-sm font-bold text-[#0F172A] sm:text-base">
                    {formatarDinheiro(
                      resultado.salarioBruto
                    )}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-5 border-b border-[#E2E8F0] py-4">
                  <p className="text-sm font-medium text-[#334155] sm:text-base">
                    INSS
                  </p>

                  <p className="shrink-0 text-sm font-bold text-red-600 sm:text-base">
                    -{" "}
                    {formatarDinheiro(
                      resultado.inss
                    )}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-5 border-b border-[#E2E8F0] py-4">
                  <p className="text-sm font-medium text-[#334155] sm:text-base">
                    IRRF
                  </p>

                  <p className="shrink-0 text-sm font-bold text-red-600 sm:text-base">
                    -{" "}
                    {formatarDinheiro(
                      resultado.irrf
                    )}
                  </p>
                </div>

                {resultado.outrosDescontos > 0 && (
                  <div className="flex items-start justify-between gap-5 border-b border-[#E2E8F0] py-4">
                    <p className="text-sm font-medium text-[#334155] sm:text-base">
                      Outros descontos
                    </p>

                    <p className="shrink-0 text-sm font-bold text-red-600 sm:text-base">
                      -{" "}
                      {formatarDinheiro(
                        resultado.outrosDescontos
                      )}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-5 pt-5">
                  <p className="font-black uppercase text-red-600">
                    Total de descontos
                  </p>

                  <p className="font-black text-red-600">
                    -{" "}
                    {formatarDinheiro(
                      resultado.totalDescontos
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-2 border-y border-[#E2E8F0] py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                <p className="text-lg font-black uppercase text-[#0F172A]">
                  Salário líquido
                </p>

                <p className="text-2xl font-black text-[#2563EB]">
                  {formatarDinheiro(
                    resultado.salarioLiquido
                  )}
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                  <p className="font-bold text-[#0F172A]">
                    FGTS estimado do mês
                  </p>

                  <p className="font-black text-[#2563EB]">
                    {formatarDinheiro(
                      resultado.fgts
                    )}
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  O FGTS não é descontado do seu salário. Esse valor é uma
                  estimativa do depósito feito pelo empregador.
                </p>
              </div>

              <div className="mt-10">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
                  Entenda o resultado
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#0F172A]">
                  Como chegamos ao seu salário líquido?
                </h2>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  O salário líquido é o valor restante depois que os descontos
                  são retirados do salário bruto.
                </p>

                <div className="mt-6 divide-y divide-[#E2E8F0]">
                  {resultado.descontos.length > 0 ? (
                    resultado.descontos.map(
                      (item) => (
                        <ExplicacaoResultado
                          key={item.nome}
                          nome={item.nome}
                          valor={item.valor}
                          explicacao={
                            item.explicacao
                          }
                          formatar={
                            formatarDinheiro
                          }
                        />
                      )
                    )
                  ) : (
                    <p className="py-5 text-sm text-[#64748B]">
                      Nenhum desconto foi calculado.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="my-8 sm:my-10">
          <AdSlot />
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:rounded-3xl sm:p-7 md:p-8">
          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            O que é salário líquido?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Salário líquido é o valor que sobra depois que os descontos
            aplicáveis são retirados do salário bruto.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Entre os descontos mais comuns estão a contribuição para o INSS e,
            dependendo da renda, o Imposto de Renda Retido na Fonte.
          </p>

          <div className="my-8 sm:my-10">
            <AdSlot />
          </div>

          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            Como é calculado o INSS?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            A contribuição previdenciária é progressiva. Isso significa que o
            salário é dividido entre faixas, e cada parte é tributada por uma
            alíquota diferente.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Por isso, estar em uma faixa de 14% não significa que 14% de todo o
            salário será descontado.
          </p>

          <h2 className="mt-8 text-xl font-bold text-[#0F172A] sm:text-2xl">
            Como funciona o IRRF?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            O Imposto de Renda utiliza uma base de cálculo depois das deduções
            aplicáveis. Dependentes e outras regras podem modificar o valor
            efetivamente retido.
          </p>

          <h2 className="mt-8 text-xl font-bold text-[#0F172A] sm:text-2xl">
            FGTS é descontado do salário?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Não. Para o trabalhador empregado nas condições usuais, o FGTS é
            uma obrigação do empregador e não deve ser subtraído do salário
            líquido.
          </p>

          <p className="mt-6 text-sm leading-6 text-black/45">
            Esta calculadora apresenta uma estimativa. Benefícios, pensão,
            vale-transporte, plano de saúde, adicionais, horas extras,
            comissões, empréstimos e outras situações podem alterar o valor
            real da folha.
          </p>

          <div className="mt-10 border-t border-black/10 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
              Perguntas frequentes
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
              Dúvidas sobre salário líquido
            </h2>

            <div className="mt-6 divide-y divide-black/10">
              <details className="group py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Qual a diferença entre salário bruto e líquido?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  O salário bruto é o valor antes dos descontos. O salário
                  líquido é o valor restante depois da retirada dos descontos
                  aplicáveis.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Todo salário tem desconto de Imposto de Renda?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Não. Dependendo do valor do salário e das deduções
                  consideradas, o IRRF pode ser igual a zero.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Dependentes podem diminuir o Imposto de Renda?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Dependentes podem gerar dedução na base utilizada para o
                  cálculo do Imposto de Renda, conforme as regras aplicáveis.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    O valor mostrado é exatamente o que vou receber?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Não necessariamente. A calculadora fornece uma estimativa.
                  Sua folha pode possuir outros créditos e descontos que não
                  foram informados.
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
              href="/decimo-terceiro"
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#2563EB]/40"
            >
              <h3 className="font-bold text-[#0F172A]">
                13º salário
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Calcule seu décimo terceiro.
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
                Calcule quanto você pode receber nas férias.
              </p>

              <p className="mt-4 text-sm font-bold text-[#2563EB]">
                Abrir calculadora →
              </p>
            </a>

            <a
              href="/rescisao"
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#2563EB]/40"
            >
              <h3 className="font-bold text-[#0F172A]">
                Rescisão
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Estime os valores da sua rescisão.
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

function ExplicacaoResultado({
  nome,
  valor,
  explicacao,
  formatar,
}: {
  nome: string;
  valor: number;
  explicacao: string;
  formatar: (valor: number) => string;
}) {
  return (
    <div className="py-5 first:pt-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <h3 className="font-bold text-[#0F172A]">
          {nome}
        </h3>

        <p className="shrink-0 text-sm font-bold text-red-600">
          - {formatar(valor)}
        </p>
      </div>

      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B]">
        {explicacao}
      </p>
    </div>
  );
}