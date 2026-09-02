"use client";

import { FormEvent, useEffect, useState } from "react";
import AdSlot from "../components/AdSlot";

type TipoRescisao =
  | "pedido-demissao"
  | "sem-justa-causa"
  | "com-justa-causa"
  | "termino-experiencia"
  | "experiencia-empregador"
  | "experiencia-empregado"
  | "falecimento";

type TipoAviso =
  | "trabalhado"
  | "indenizado"
  | "nao-cumprido"
  | "nao-se-aplica";

type LinhaResultado = {
  nome: string;
  valor: number;
  explicacao: string;
};

export default function RescisaoPage() {
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [dataRescisao, setDataRescisao] = useState("");

  const [salario, setSalario] = useState("");

  const [tipoRescisao, setTipoRescisao] =
    useState<TipoRescisao>("pedido-demissao");

  const [tipoAviso, setTipoAviso] =
    useState<TipoAviso>("trabalhado");

  const [temFeriasVencidas, setTemFeriasVencidas] =
    useState(false);

  const [numeroFilhos, setNumeroFilhos] = useState("0");

  const [saldoFgts, setSaldoFgts] = useState("");

  const [diasRestantesExperiencia, setDiasRestantesExperiencia] =
    useState("");

  const [erro, setErro] = useState("");

  const [resultado, setResultado] = useState<{
    proventos: LinhaResultado[];
    descontos: LinhaResultado[];
    totalProventos: number;
    totalDescontos: number;
    liquido: number;
    avos13: number;
    avosFerias: number;
    avos13Indenizados: number;
    avosFeriasIndenizadas: number;
  } | null>(null);

  useEffect(() => {
    if (tipoRescisao === "sem-justa-causa") {
      setTipoAviso("indenizado");
      return;
    }

    if (tipoRescisao === "pedido-demissao") {
      setTipoAviso("trabalhado");
      return;
    }

    setTipoAviso("nao-se-aplica");
  }, [tipoRescisao]);

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

  function criarData(valor: string) {
    if (!valor) {
      return null;
    }

    const [ano, mes, dia] = valor.split("-").map(Number);

    return new Date(ano, mes - 1, dia);
  }

  function adicionarDias(data: Date, quantidade: number) {
    const novaData = new Date(data);
    novaData.setDate(novaData.getDate() + quantidade);
    return novaData;
  }

  function diasEntre(inicio: Date, fim: Date) {
    const umDia = 1000 * 60 * 60 * 24;

    const inicioUTC = Date.UTC(
      inicio.getFullYear(),
      inicio.getMonth(),
      inicio.getDate()
    );

    const fimUTC = Date.UTC(
      fim.getFullYear(),
      fim.getMonth(),
      fim.getDate()
    );

    return Math.floor((fimUTC - inicioUTC) / umDia);
  }

  function calcularAnosCompletos(admissao: Date, rescisao: Date) {
    let anos =
      rescisao.getFullYear() - admissao.getFullYear();

    const aniversario = new Date(
      rescisao.getFullYear(),
      admissao.getMonth(),
      admissao.getDate()
    );

    if (rescisao < aniversario) {
      anos--;
    }

    return Math.max(0, anos);
  }

  function calcularDiasAviso(anosCompletos: number) {
    return Math.min(
      90,
      30 + Math.max(0, anosCompletos) * 3
    );
  }

  function calcularAvos13(
    admissao: Date,
    fim: Date
  ) {
    let avos = 0;

    const ano = fim.getFullYear();

    for (let mes = 0; mes < 12; mes++) {
      const inicioMes = new Date(ano, mes, 1);

      const fimMes = new Date(
        ano,
        mes + 1,
        0
      );

      if (fimMes < admissao) {
        continue;
      }

      if (inicioMes > fim) {
        continue;
      }

      const inicioPeriodo =
        admissao > inicioMes
          ? admissao
          : inicioMes;

      const fimPeriodo =
        fim < fimMes
          ? fim
          : fimMes;

      const dias =
        diasEntre(
          inicioPeriodo,
          fimPeriodo
        ) + 1;

      if (dias >= 15) {
        avos++;
      }
    }

    return Math.min(12, avos);
  }

  function inicioPeriodoAquisitivoAtual(
    admissao: Date,
    fim: Date
  ) {
    let inicio = new Date(
      fim.getFullYear(),
      admissao.getMonth(),
      admissao.getDate()
    );

    if (inicio > fim) {
      inicio = new Date(
        fim.getFullYear() - 1,
        admissao.getMonth(),
        admissao.getDate()
      );
    }

    if (inicio < admissao) {
      inicio = new Date(admissao);
    }

    return inicio;
  }

  function calcularAvosFerias(
    admissao: Date,
    fim: Date
  ) {
    const inicio =
      inicioPeriodoAquisitivoAtual(
        admissao,
        fim
      );

    let meses =
      (fim.getFullYear() -
        inicio.getFullYear()) *
        12 +
      (fim.getMonth() -
        inicio.getMonth());

    let referencia = new Date(
      inicio.getFullYear(),
      inicio.getMonth() + meses,
      inicio.getDate()
    );

    if (referencia > fim) {
      meses--;

      referencia = new Date(
        inicio.getFullYear(),
        inicio.getMonth() + meses,
        inicio.getDate()
      );
    }

    const diasRestantes =
      diasEntre(referencia, fim) + 1;

    let avos = Math.max(0, meses);

    if (diasRestantes >= 15) {
      avos++;
    }

    return Math.min(12, avos);
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
      return (
        inss +
        (base - faixa1) * 0.09
      );
    }

    inss +=
      (faixa2 - faixa1) * 0.09;

    if (base <= faixa3) {
      return (
        inss +
        (base - faixa2) * 0.12
      );
    }

    inss +=
      (faixa3 - faixa2) * 0.12;

    inss +=
      (base - faixa3) * 0.14;

    return inss;
  }

  function calcularIRRF(
    rendimento: number,
    inss: number
  ) {
    if (rendimento <= 0) {
      return 0;
    }

    const descontoSimplificado = 607.2;

    const deducaoUtilizada = Math.max(
      inss,
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

  function calcularSalarioFamilia(
    salarioMensal: number,
    filhos: number,
    dias: number
  ) {
    const limite2026 = 1980.38;
    const cota2026 = 67.54;

    if (
      salarioMensal > limite2026 ||
      filhos <= 0
    ) {
      return 0;
    }

    const diasConsiderados = Math.min(
      30,
      Math.max(0, dias)
    );

    return (
      cota2026 *
      filhos *
      (diasConsiderados / 30)
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

    const admissao =
      criarData(dataAdmissao);

    const rescisao =
      criarData(dataRescisao);

    const salarioInformado =
      converterNumero(salario);

    const filhos = Math.max(
      0,
      Math.floor(
        Number(numeroFilhos) || 0
      )
    );

    const fgts = Math.max(
      0,
      converterNumero(saldoFgts) || 0
    );

    const diasRestantesContrato =
      Math.max(
        0,
        Math.floor(
          Number(
            diasRestantesExperiencia
          ) || 0
        )
      );

    if (!admissao) {
      setResultado(null);
      setErro(
        "Informe a data de admissão."
      );
      return;
    }

    if (!rescisao) {
      setResultado(null);
      setErro(
        "Informe a data da rescisão."
      );
      return;
    }

    if (rescisao < admissao) {
      setResultado(null);
      setErro(
        "A data da rescisão não pode ser anterior à data de admissão."
      );
      return;
    }

    if (
      !salario.trim() ||
      salarioInformado <= 0
    ) {
      setResultado(null);
      setErro(
        "Informe o último salário bruto."
      );
      return;
    }

    if (
      tipoRescisao ===
        "experiencia-empregador" &&
      diasRestantesContrato <= 0
    ) {
      setResultado(null);
      setErro(
        "Informe quantos dias faltavam para terminar o contrato de experiência."
      );
      return;
    }

    const diasTrabalhadosMes =
      Math.min(
        30,
        Math.max(
          0,
          rescisao.getDate()
        )
      );

    const anosEmpresa =
      calcularAnosCompletos(
        admissao,
        rescisao
      );

    const diasAviso =
      tipoRescisao ===
        "sem-justa-causa" &&
      tipoAviso === "indenizado"
        ? calcularDiasAviso(anosEmpresa)
        : 0;

    const fimProjetado =
      diasAviso > 0
        ? adicionarDias(
            rescisao,
            diasAviso
          )
        : rescisao;

    const avos13Normal =
      calcularAvos13(
        admissao,
        rescisao
      );

    const avos13Projetado =
      calcularAvos13(
        admissao,
        fimProjetado
      );

    const avos13Indenizados =
      Math.max(
        0,
        avos13Projetado -
          avos13Normal
      );

    const avosFeriasNormal =
      calcularAvosFerias(
        admissao,
        rescisao
      );

    const avosFeriasProjetado =
      calcularAvosFerias(
        admissao,
        fimProjetado
      );

    const avosFeriasIndenizadas =
      Math.max(
        0,
        avosFeriasProjetado -
          avosFeriasNormal
      );

    const saldoSalario =
      (salarioInformado / 30) *
      diasTrabalhadosMes;

    const salarioFamilia =
      calcularSalarioFamilia(
        salarioInformado,
        filhos,
        diasTrabalhadosMes
      );

    let decimoTerceiro = 0;
    let decimoTerceiroIndenizado = 0;

    let feriasProporcionais = 0;
    let tercoFeriasProporcionais = 0;

    let feriasIndenizadas = 0;
    let tercoFeriasIndenizadas = 0;

    let feriasVencidas = 0;
    let tercoFeriasVencidas = 0;

    let avisoPrevio = 0;
    let multaFgts = 0;

    let indenizacaoExperiencia = 0;

    let descontoAviso = 0;

    const recebeProporcionais =
      tipoRescisao !==
      "com-justa-causa";

    if (recebeProporcionais) {
      decimoTerceiro =
        (salarioInformado / 12) *
        avos13Normal;

      feriasProporcionais =
        (salarioInformado / 12) *
        avosFeriasNormal;

      tercoFeriasProporcionais =
        feriasProporcionais / 3;
    }

    if (
      tipoRescisao ===
        "sem-justa-causa" &&
      tipoAviso === "indenizado"
    ) {
      avisoPrevio =
        (salarioInformado / 30) *
        diasAviso;

      decimoTerceiroIndenizado =
        (salarioInformado / 12) *
        avos13Indenizados;

      feriasIndenizadas =
        (salarioInformado / 12) *
        avosFeriasIndenizadas;

      tercoFeriasIndenizadas =
        feriasIndenizadas / 3;

      multaFgts = fgts * 0.4;
    }

    if (
      tipoRescisao ===
        "pedido-demissao" &&
      tipoAviso === "nao-cumprido"
    ) {
      descontoAviso =
        salarioInformado;
    }

    if (
      temFeriasVencidas
    ) {
      feriasVencidas =
        salarioInformado;

      tercoFeriasVencidas =
        salarioInformado / 3;
    }

    if (
      tipoRescisao ===
      "experiencia-empregador"
    ) {
      const valorRestante =
        (salarioInformado / 30) *
        diasRestantesContrato;

      indenizacaoExperiencia =
        valorRestante / 2;
    }

    const proventos: LinhaResultado[] =
      [];

    adicionarLinha(
      proventos,
      "Saldo do salário",
      saldoSalario,
      `Corresponde aos ${diasTrabalhadosMes} dias considerados no mês da rescisão.`
    );

    adicionarLinha(
      proventos,
      "Aviso prévio indenizado",
      avisoPrevio,
      `O aviso considerado foi de ${diasAviso} dias, conforme o tempo de serviço informado pelas datas.`
    );

    adicionarLinha(
      proventos,
      "Indenização por término antecipado do contrato",
      indenizacaoExperiencia,
      `Foram considerados ${diasRestantesContrato} dias restantes no contrato. A estimativa corresponde à metade da remuneração referente a esse período.`
    );

    adicionarLinha(
      proventos,
      "Salário-família",
      salarioFamilia,
      `Estimativa proporcional para ${filhos} filho(s) elegível(is), considerando o limite previdenciário de 2026.`
    );

    adicionarLinha(
      proventos,
      "13º salário proporcional",
      decimoTerceiro,
      `Foram considerados ${avos13Normal}/12 avos de décimo terceiro até a data da rescisão.`
    );

    adicionarLinha(
      proventos,
      "13º salário indenizado",
      decimoTerceiroIndenizado,
      `A projeção do aviso prévio acrescentou ${avos13Indenizados} avo(s) ao cálculo do 13º.`
    );

    adicionarLinha(
      proventos,
      "Férias vencidas",
      feriasVencidas,
      "Valor correspondente a um período de férias vencidas informado no formulário."
    );

    adicionarLinha(
      proventos,
      "1/3 sobre férias vencidas",
      tercoFeriasVencidas,
      "Adicional constitucional de um terço sobre as férias vencidas."
    );

    adicionarLinha(
      proventos,
      "Férias proporcionais",
      feriasProporcionais,
      `Foram considerados ${avosFeriasNormal}/12 avos no período aquisitivo atual.`
    );

    adicionarLinha(
      proventos,
      "1/3 sobre férias proporcionais",
      tercoFeriasProporcionais,
      "Adicional constitucional de um terço sobre as férias proporcionais."
    );

    adicionarLinha(
      proventos,
      "Férias indenizadas",
      feriasIndenizadas,
      `A projeção do aviso acrescentou ${avosFeriasIndenizadas} avo(s) de férias.`
    );

    adicionarLinha(
      proventos,
      "1/3 sobre férias indenizadas",
      tercoFeriasIndenizadas,
      "Adicional de um terço incidente sobre as férias decorrentes da projeção do aviso."
    );

    adicionarLinha(
      proventos,
      "Multa estimada de 40% do FGTS",
      multaFgts,
      "Estimativa de 40% calculada sobre o saldo de FGTS informado. O valor real pode usar uma base rescisória diferente do saldo exibido no aplicativo do FGTS."
    );

    const inssSalario =
      calcularINSS(saldoSalario);

    const irrfSalario =
      calcularIRRF(
        saldoSalario,
        inssSalario
      );

    const base13INSS =
      decimoTerceiro +
      decimoTerceiroIndenizado;

    const inss13 =
      calcularINSS(base13INSS);

    const irrf13 =
      calcularIRRF(
        base13INSS,
        inss13
      );

    const descontos: LinhaResultado[] =
      [];

    adicionarLinha(
      descontos,
      "INSS",
      inssSalario,
      "Estimativa da contribuição previdenciária sobre as verbas salariais tributáveis consideradas pela calculadora."
    );

    adicionarLinha(
      descontos,
      "IRRF",
      irrfSalario,
      "Estimativa do Imposto de Renda Retido na Fonte usando a tabela de 2026."
    );

    adicionarLinha(
      descontos,
      "INSS sobre 13º salário",
      inss13,
      "O décimo terceiro possui cálculo previdenciário separado da remuneração mensal."
    );

    adicionarLinha(
      descontos,
      "IRRF sobre 13º salário",
      irrf13,
      "Estimativa do imposto incidente separadamente sobre o décimo terceiro."
    );

    adicionarLinha(
      descontos,
      "Aviso prévio não cumprido",
      descontoAviso,
      "No pedido de demissão, foi considerado um desconto equivalente a um salário por aviso prévio não cumprido."
    );

    const totalProventos =
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
      totalProventos -
        totalDescontos
    );

    setResultado({
      proventos,
      descontos,
      totalProventos,
      totalDescontos,
      liquido,
      avos13: avos13Normal,
      avosFerias:
        avosFeriasNormal,
      avos13Indenizados,
      avosFeriasIndenizadas,
    });
  }

  function limpar() {
    setDataAdmissao("");
    setDataRescisao("");
    setSalario("");

    setTipoRescisao(
      "pedido-demissao"
    );

    setTipoAviso("trabalhado");

    setTemFeriasVencidas(false);

    setNumeroFilhos("0");

    setSaldoFgts("");

    setDiasRestantesExperiencia(
      ""
    );

    setErro("");
    setResultado(null);
  }

  const precisaAviso =
    tipoRescisao ===
      "pedido-demissao" ||
    tipoRescisao ===
      "sem-justa-causa";

  const precisaFgts =
    tipoRescisao ===
    "sem-justa-causa";

  const precisaDiasRestantes =
    tipoRescisao ===
    "experiencia-empregador";

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
          Trabalho
        </p>

        <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.03em] text-[#0F172A] sm:text-4xl md:text-5xl">
          Calculadora de Rescisão
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-[#64748B] sm:mt-4 sm:text-lg sm:leading-8">
          Informe os dados do contrato e veja uma estimativa detalhada da sua
          rescisão.
        </p>

        <form
          onSubmit={calcular}
          className="mt-7 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm sm:mt-10 sm:rounded-3xl"
        >
          <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-2 md:gap-6 md:p-8">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Data da admissão
              </span>

              <input
                type="date"
                value={dataAdmissao}
                onChange={(e) =>
                  setDataAdmissao(
                    e.target.value
                  )
                }
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-base outline-none transition focus:border-[#2563EB]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Data da rescisão
              </span>

              <input
                type="date"
                value={dataRescisao}
                onChange={(e) =>
                  setDataRescisao(
                    e.target.value
                  )
                }
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-base outline-none transition focus:border-[#2563EB]"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Motivo da rescisão
              </span>

              <select
                value={tipoRescisao}
                onChange={(e) =>
                  setTipoRescisao(
                    e.target
                      .value as TipoRescisao
                  )
                }
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-base outline-none transition focus:border-[#2563EB]"
              >
                <option value="pedido-demissao">
                  Pedido de demissão
                </option>

                <option value="sem-justa-causa">
                  Dispensa sem justa causa
                </option>

                <option value="com-justa-causa">
                  Dispensa com justa causa
                </option>

                <option value="termino-experiencia">
                  Término de contrato de experiência
                </option>

                <option value="experiencia-empregador">
                  Rescisão antecipada do contrato de experiência pelo empregador
                </option>

                <option value="experiencia-empregado">
                  Rescisão antecipada do contrato de experiência pelo empregado
                </option>

                <option value="falecimento">
                  Falecimento do empregado
                </option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Último salário bruto
              </span>

              <div className="flex min-h-14 items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 transition focus-within:border-[#2563EB]">
                <span className="text-sm text-[#64748B]">
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
                  className="min-w-0 w-full bg-transparent px-2 py-4 text-base outline-none placeholder:text-black/30"
                />
              </div>
            </label>

            {precisaAviso ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                  Tipo de aviso prévio
                </span>

                <select
                  value={tipoAviso}
                  onChange={(e) =>
                    setTipoAviso(
                      e.target
                        .value as TipoAviso
                    )
                  }
                  className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-base outline-none transition focus:border-[#2563EB]"
                >
                  {tipoRescisao ===
                  "sem-justa-causa" ? (
                    <>
                      <option value="trabalhado">
                        Trabalhado
                      </option>

                      <option value="indenizado">
                        Indenizado
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="trabalhado">
                        Trabalhado
                      </option>

                      <option value="nao-cumprido">
                        Não cumprido
                      </option>
                    </>
                  )}
                </select>
              </label>
            ) : (
              <div />
            )}

            <div className="md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Possui férias vencidas?
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setTemFeriasVencidas(
                      true
                    )
                  }
                  className={`min-h-12 rounded-xl border px-4 font-semibold transition ${
                    temFeriasVencidas
                      ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#64748B]"
                  }`}
                >
                  Sim
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setTemFeriasVencidas(
                      false
                    )
                  }
                  className={`min-h-12 rounded-xl border px-4 font-semibold transition ${
                    !temFeriasVencidas
                      ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#64748B]"
                  }`}
                >
                  Não
                </button>
              </div>
            </div>

            {precisaFgts && (
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                  Saldo aproximado do FGTS neste emprego
                </span>

                <div className="flex min-h-14 items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 transition focus-within:border-[#2563EB]">
                  <span className="text-sm text-[#64748B]">
                    R$
                  </span>

                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Ex: 8.000"
                    value={saldoFgts}
                    onChange={(e) =>
                      setSaldoFgts(
                        formatarCampoDinheiro(
                          e.target.value
                        )
                      )
                    }
                    className="min-w-0 w-full bg-transparent px-2 py-4 text-base outline-none placeholder:text-black/30"
                  />
                </div>
              </label>
            )}

            {precisaDiasRestantes && (
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                  Quantos dias faltavam para terminar o contrato de experiência?
                </span>

                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  placeholder="Ex: 30"
                  value={
                    diasRestantesExperiencia
                  }
                  onChange={(e) =>
                    setDiasRestantesExperiencia(
                      e.target.value
                    )
                  }
                  className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-base outline-none transition focus:border-[#2563EB]"
                />
              </label>
            )}

            <div className="md:col-span-2">
              <div className="border-t border-[#E2E8F0] pt-6">
                <p className="text-lg font-black text-[#0F172A]">
                  Salário-família
                </p>

                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  Informe filhos com menos de 14 anos ou inválidos de qualquer
                  idade que atendam aos requisitos do benefício.
                </p>
              </div>
            </div>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#0F172A] sm:text-base">
                Número de filhos elegíveis
              </span>

              <input
                type="number"
                min="0"
                value={numeroFilhos}
                onChange={(e) =>
                  setNumeroFilhos(
                    e.target.value
                  )
                }
                className="min-h-14 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-base outline-none transition focus:border-[#2563EB]"
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
                className="min-h-14 rounded-xl bg-[#2563EB] px-5 py-4 text-base font-bold text-white transition hover:bg-[#1D4ED8] active:scale-[0.99]"
              >
                Calcular rescisão
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
                Resultado
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Rescisão estimada
              </h2>

              <p className="mt-4 break-words text-4xl font-black text-[#60A5FA] sm:text-5xl">
                {formatarDinheiro(
                  resultado.liquido
                )}
              </p>
            </div>

            <div className="p-5 sm:p-7 md:p-8">
              <TabelaResultado
                titulo="Proventos"
                itens={resultado.proventos}
                totalTitulo="Total de proventos"
                total={
                  resultado.totalProventos
                }
                formatar={formatarDinheiro}
              />

              <div className="my-10 border-t border-[#E2E8F0]" />

              <TabelaResultado
                titulo="Descontos"
                itens={resultado.descontos}
                totalTitulo="Total de descontos"
                total={
                  resultado.totalDescontos
                }
                formatar={formatarDinheiro}
                desconto
              />

              <div className="mt-10 flex items-center justify-between gap-5 border-y border-[#E2E8F0] py-5">
                <p className="text-lg font-black uppercase text-[#0F172A]">
                  Líquido da rescisão
                </p>

                <p className="text-xl font-black text-[#2563EB] sm:text-2xl">
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
                  Abaixo você pode conferir o que significa cada valor que
                  entrou no cálculo da sua rescisão.
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
            Como funciona a calculadora de rescisão?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            A calculadora usa as datas informadas para estimar o saldo de
            salário e os avos de 13º e férias proporcionais. O motivo do
            desligamento define quais verbas entram ou deixam de entrar na
            rescisão.
          </p>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Quando existe aviso prévio indenizado, a calculadora também faz uma
            projeção do período para verificar possíveis reflexos no décimo
            terceiro e nas férias.
          </p>

          <div className="my-8 sm:my-10">
            <AdSlot />
          </div>

          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            Por que o valor real pode ser diferente?
          </h2>

          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Uma rescisão real pode incluir horas extras, adicionais,
            comissões, médias remuneratórias, faltas, pensão alimentícia,
            férias em dobro, convenções coletivas e outros itens que não podem
            ser descobertos apenas pelas informações básicas do formulário.
          </p>

          <p className="mt-6 text-sm leading-6 text-black/45">
            O resultado apresentado pelo ResultaAí é uma estimativa e não
            substitui o termo oficial de rescisão ou a análise da folha de
            pagamento.
          </p>
        </section>

        <div className="my-8 sm:my-10">
          <AdSlot />
        </div>
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