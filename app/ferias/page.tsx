"use client";

import { FormEvent, useState } from "react";
import AdSlot from "../components/AdSlot";

type LinhaResultado = {
  nome: string;
  valor: number;
  explicacao: string;
};

export default function FeriasPage() {
  const [salario, setSalario] = useState("");
  const [diasDireito, setDiasDireito] = useState("30");
  const [venderFerias, setVenderFerias] = useState(false);
  const [dependentes, setDependentes] = useState("0");

  const [erro, setErro] = useState("");

  const [resultado, setResultado] = useState<{
    proventos: LinhaResultado[];
    descontos: LinhaResultado[];

    diasGozados: number;
    diasVendidos: number;

    totalBruto: number;
    totalDescontos: number;
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
    rendimento: number,
    inss: number,
    numeroDependentes: number
  ) {
    if (rendimento <= 0) {
      return 0;
    }

    const deducaoDependentes =
      numeroDependentes * 189.59;

    const deducoesLegais =
      inss + deducaoDependentes;

    const descontoSimplificado = 607.2;

    const deducaoUtilizada = Math.max(
      deducoesLegais,
      descontoSimplificado
    );

    const base = Math.max(
      0,
      rendimento - deducaoUtilizada
    );

    let imposto = 0;

    if (base <= 2428.8) {
      imposto = 0;
    } else if (base <= 2826.65) {
      imposto =
        base * 0.075 - 182.16;
    } else if (base <= 3751.05) {
      imposto =
        base * 0.15 - 394.16;
    } else if (base <= 4664.68) {
      imposto =
        base * 0.225 - 675.49;
    } else {
      imposto =
        base * 0.275 - 908.73;
    }

    imposto = Math.max(0, imposto);

    let reducao = 0;

    if (rendimento <= 5000) {
      reducao = imposto;
    } else if (rendimento <= 7350) {
      reducao =
        978.62 -
        0.133145 * rendimento;

      reducao = Math.max(
        0,
        Math.min(imposto, reducao)
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

    const salarioInformado =
      converterNumero(salario);

    const dias =
      Number(diasDireito);

    const numeroDependentes = Math.max(
      0,
      Math.floor(
        Number(dependentes) || 0
      )
    );

    if (
      !salario.trim() ||
      salarioInformado <= 0
    ) {
      setResultado(null);
      setErro(
        "Informe seu salário bruto."
      );
      return;
    }

    if (
      ![30, 24, 18, 12].includes(dias)
    ) {
      setResultado(null);
      setErro(
        "Selecione a quantidade de dias de férias."
      );
      return;
    }

    const diasVendidos =
      venderFerias
        ? dias / 3
        : 0;

    const diasGozados =
      dias - diasVendidos;

    const valorDia =
      salarioInformado / 30;

    const remuneracaoFerias =
      valorDia * diasGozados;

    const tercoFerias =
      remuneracaoFerias / 3;

    const abonoPecuniario =
      valorDia * diasVendidos;

    const tercoAbono =
      abonoPecuniario / 3;

    /*
      O abono pecuniário é tratado separadamente
      porque não entra na mesma base tributável
      das férias gozadas.
    */

    const baseTributavel =
      remuneracaoFerias +
      tercoFerias;

    const inss =
      calcularINSS(baseTributavel);

    const irrf =
      calcularIRRF(
        baseTributavel,
        inss,
        numeroDependentes
      );

    const proventos: LinhaResultado[] =
      [];

    adicionarLinha(
      proventos,
      "Remuneração das férias",
      remuneracaoFerias,
      `Valor correspondente a ${diasGozados} dia(s) de férias efetivamente gozadas, considerando o salário informado.`
    );

    adicionarLinha(
      proventos,
      "1/3 constitucional sobre as férias",
      tercoFerias,
      "A Constituição garante um adicional de pelo menos um terço sobre a remuneração das férias."
    );

    adicionarLinha(
      proventos,
      "Abono pecuniário",
      abonoPecuniario,
      `Valor referente à conversão de ${diasVendidos} dia(s) de férias em dinheiro.`
    );

    adicionarLinha(
      proventos,
      "1/3 sobre o abono pecuniário",
      tercoAbono,
      "Parcela correspondente ao adicional de um terço relacionado aos dias convertidos em abono."
    );

    const descontos: LinhaResultado[] =
      [];

    adicionarLinha(
      descontos,
      "INSS estimado",
      inss,
      "Estimativa da contribuição previdenciária incidente sobre a remuneração tributável das férias gozadas."
    );

    adicionarLinha(
      descontos,
      "IRRF estimado",
      irrf,
      "Estimativa do Imposto de Renda calculada separadamente sobre a remuneração tributável das férias, utilizando as regras de 2026."
    );

    const totalBruto =
      proventos.reduce(
        (total, item) =>
          total + item.valor,
        0
      );

    const totalDescontos =
      descontos.reduce(
        (total, item) =>
          total + item.valor,
        0
      );

    const liquido = Math.max(
      0,
      totalBruto -
        totalDescontos
    );

    setResultado({
      proventos,
      descontos,
      diasGozados,
      diasVendidos,
      totalBruto,
      totalDescontos,
      liquido,
    });
  }

  function limpar() {
    setSalario("");
    setDiasDireito("30");
    setVenderFerias(false);
    setDependentes("0");
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
          Calculadora de Férias
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-[#64748B] sm:mt-4 sm:text-lg sm:leading-8">
          Descubra quanto você pode receber nas férias e veja os valores
          detalhados.
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
                Quantos dias de férias você tem direito?
              </span>

              <select
                value={diasDireito}
                onChange={(e) =>
                  setDiasDireito(
                    e.target.value
                  )
                }
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-base text-[#0F172A] outline-none transition focus:border-[#2563EB]"
              >
                <option value="30">
                  30 dias
                </option>

                <option value="24">
                  24 dias
                </option>

                <option value="18">
                  18 dias
                </option>

                <option value="12">
                  12 dias
                </option>
              </select>
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
            </label>

            <div className="md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Você pretende vender 1/3 das férias?
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setVenderFerias(true)
                  }
                  className={`min-h-12 rounded-xl border px-4 font-semibold transition ${
                    venderFerias
                      ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#64748B]"
                  }`}
                >
                  Sim
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setVenderFerias(false)
                  }
                  className={`min-h-12 rounded-xl border px-4 font-semibold transition ${
                    !venderFerias
                      ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#64748B]"
                  }`}
                >
                  Não
                </button>
              </div>

              {venderFerias && (
                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  Com {diasDireito} dias de direito, a calculadora considerará
                  a venda de {Number(diasDireito) / 3} dia(s).
                </p>
              )}
            </div>

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
                Calcular minhas férias
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
                Você receberá aproximadamente
              </p>

              <p className="mt-3 break-words text-4xl font-black text-[#60A5FA] sm:text-5xl">
                {formatarDinheiro(
                  resultado.liquido
                )}
              </p>

              <p className="mt-3 text-sm text-white/55">
                {resultado.diasGozados} dia(s) de descanso
                {resultado.diasVendidos > 0
                  ? ` • ${resultado.diasVendidos} dia(s) vendidos`
                  : ""}
              </p>
            </div>

            <div className="p-5 sm:p-7 md:p-8">
              <TabelaResultado
                titulo="Proventos"
                itens={
                  resultado.proventos
                }
                totalTitulo="Total bruto"
                total={
                  resultado.totalBruto
                }
                formatar={
                  formatarDinheiro
                }
              />

              <div className="my-10 border-t border-[#E2E8F0]" />

              <TabelaResultado
                titulo="Descontos"
                itens={
                  resultado.descontos
                }
                totalTitulo="Total de descontos"
                total={
                  resultado.totalDescontos
                }
                formatar={
                  formatarDinheiro
                }
                desconto
              />

              <div className="mt-10 flex flex-col gap-2 border-y border-[#E2E8F0] py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                <p className="text-lg font-black uppercase text-[#0F172A]">
                  Férias líquidas
                </p>

                <p className="text-2xl font-black text-[#2563EB]">
                  {formatarDinheiro(
                    resultado.liquido
                  )}
                </p>
              </div>

              <div className="mt-10">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
                  Entenda o resultado
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#0F172A]">
                  Como chegamos a esses valores?
                </h2>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Veja abaixo o que representa cada valor da sua simulação.
                </p>

                <div className="mt-6 divide-y divide-[#E2E8F0]">
                  {resultado.proventos.map(
                    (item) => (
                      <ExplicacaoResultado
                        key={`provento-${item.nome}`}
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
                  )}

                  {resultado.descontos.map(
                    (item) => (
                      <ExplicacaoResultado
                        key={`desconto-${item.nome}`}
                        nome={item.nome}
                        valor={item.valor}
                        explicacao={
                          item.explicacao
                        }
                        formatar={
                          formatarDinheiro
                        }
                        desconto
                      />
                    )
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
            Como calcular as férias?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Durante as férias, o trabalhador recebe a remuneração
            correspondente ao período de descanso acrescida do adicional
            constitucional de um terço.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Para quem possui direito aos 30 dias completos, por exemplo, o
            valor bruto das férias normalmente parte de um salário mensal mais
            o adicional de um terço.
          </p>

          <div className="my-8 sm:my-10">
            <AdSlot />
          </div>

          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            O que significa vender as férias?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            O trabalhador pode converter até um terço do período de férias em
            dinheiro. Esse valor é chamado de abono pecuniário.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Quem possui 30 dias de férias, por exemplo, pode converter 10 dias
            em abono e descansar os outros 20 dias.
          </p>

          <h2 className="mt-8 text-xl font-bold text-[#0F172A] sm:text-2xl">
            Por que existem descontos nas férias?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            As férias gozadas e o adicional constitucional podem ter incidência
            previdenciária e tributária. Por isso, o valor líquido recebido
            pode ser menor do que o total bruto mostrado no recibo.
          </p>

          <p className="mt-6 text-sm leading-6 text-black/45">
            Esta calculadora apresenta uma estimativa. Médias de horas extras,
            comissões, adicionais, pensão alimentícia, outros vínculos e regras
            específicas da folha podem alterar o resultado real.
          </p>

          <div className="mt-10 border-t border-black/10 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
              Perguntas frequentes
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
              Dúvidas sobre férias
            </h2>

            <div className="mt-6 divide-y divide-black/10">
              <details className="group py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Quanto recebo em 30 dias de férias?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Para 30 dias completos, a remuneração bruta normalmente
                  corresponde ao salário do período acrescido do adicional
                  constitucional de um terço, antes dos descontos aplicáveis.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Posso vender 10 dias de férias?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  Quem tem direito a 30 dias pode converter um terço do
                  período, ou seja, 10 dias, em abono pecuniário.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    O abono pecuniário paga Imposto de Renda?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  O abono pecuniário decorrente da conversão de parte das
                  férias possui tratamento tributário diferente da remuneração
                  das férias gozadas e, nas condições previstas pela legislação,
                  não é tributado pelo Imposto de Renda.
                </p>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#0F172A]">
                  <span>
                    Quando as férias devem ser pagas?
                  </span>

                  <span className="text-xl font-normal text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-base leading-7 text-[#64748B]">
                  A remuneração das férias deve ser paga até dois dias antes do
                  início do período de descanso.
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

            <a
              href="/salario-liquido"
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:border-[#2563EB]/40"
            >
              <h3 className="font-bold text-[#0F172A]">
                Salário líquido
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Descubra quanto sobra depois dos descontos.
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

function TabelaResultado({
  titulo,
  itens,
  totalTitulo,
  total,
  formatar,
  desconto = false,
}: {
  titulo: string;
  itens: LinhaResultado[];
  totalTitulo: string;
  total: number;
  formatar: (valor: number) => string;
  desconto?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <h3 className="text-lg font-black text-[#0F172A]">
          {titulo}
        </h3>

        <span className="text-sm font-bold text-[#64748B]">
          Valores
        </span>
      </div>

      <div>
        {itens.length === 0 ? (
          <p className="py-5 text-sm text-[#94A3B8]">
            Nenhum valor nesta seção.
          </p>
        ) : (
          itens.map((item) => (
            <div
              key={item.nome}
              className="flex items-start justify-between gap-5 border-b border-[#E2E8F0] py-4"
            >
              <p className="text-sm font-medium text-[#334155] sm:text-base">
                {item.nome}
              </p>

              <p
                className={`shrink-0 text-sm font-bold sm:text-base ${
                  desconto
                    ? "text-red-600"
                    : "text-[#0F172A]"
                }`}
              >
                {desconto ? "- " : ""}
                {formatar(item.valor)}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between gap-5 pt-5">
        <p
          className={`font-black uppercase ${
            desconto
              ? "text-red-600"
              : "text-[#0F172A]"
          }`}
        >
          {totalTitulo}
        </p>

        <p
          className={`font-black ${
            desconto
              ? "text-red-600"
              : "text-[#0F172A]"
          }`}
        >
          {desconto ? "- " : ""}
          {formatar(total)}
        </p>
      </div>
    </div>
  );
}

function ExplicacaoResultado({
  nome,
  valor,
  explicacao,
  formatar,
  desconto = false,
}: {
  nome: string;
  valor: number;
  explicacao: string;
  formatar: (valor: number) => string;
  desconto?: boolean;
}) {
  return (
    <div className="py-5 first:pt-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <h3 className="font-bold text-[#0F172A]">
          {nome}
        </h3>

        <p
          className={`shrink-0 text-sm font-bold ${
            desconto
              ? "text-red-600"
              : "text-[#2563EB]"
          }`}
        >
          {desconto ? "- " : ""}
          {formatar(valor)}
        </p>
      </div>

      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B]">
        {explicacao}
      </p>
    </div>
  );
}