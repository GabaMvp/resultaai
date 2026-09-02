import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o ResultaAí, um site de calculadoras online criado para tornar cálculos do dia a dia mais simples, rápidos e fáceis de entender.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
            Sobre o ResultaAí
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0F172A] sm:text-4xl md:text-5xl">
            Contas importantes não precisam ser complicadas.
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
            O ResultaAí foi criado para tornar cálculos do dia a dia mais
            simples, rápidos e fáceis de entender.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
              O que é o ResultaAí?
            </h2>

            <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
              <p>
                O ResultaAí é um site de calculadoras online gratuitas criado
                para ajudar você a fazer contas relacionadas a trabalho,
                dinheiro, investimentos e outras situações do cotidiano.
              </p>

              <p>
                A ideia é simples: você informa os dados necessários, faz o
                cálculo e recebe um resultado apresentado de maneira clara,
                acompanhado de informações que ajudam a entender como aquele
                valor foi obtido.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
              Calcule rápido. Resolva fácil.
            </h2>

            <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
              <p>
                Esse é o objetivo do ResultaAí. Em vez de apresentar apenas um
                número, buscamos organizar os resultados de uma forma que seja
                fácil de consultar e compreender.
              </p>

              <p>
                As ferramentas são desenvolvidas pensando principalmente em
                simplicidade, velocidade e boa experiência tanto no celular
                quanto no computador.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
              Nossas calculadoras
            </h2>

            <p className="mt-4 text-base leading-7 text-[#475569]">
              Atualmente, o ResultaAí oferece ferramentas para cálculos
              trabalhistas, financeiros e matemáticos, incluindo:
            </p>

            <ul className="mt-4 grid gap-3 text-sm font-semibold text-[#334155] sm:grid-cols-2 sm:text-base">
              <li className="rounded-xl bg-[#F8FAFC] px-4 py-3">
                13º salário
              </li>

              <li className="rounded-xl bg-[#F8FAFC] px-4 py-3">
                Rescisão trabalhista
              </li>

              <li className="rounded-xl bg-[#F8FAFC] px-4 py-3">
                Férias
              </li>

              <li className="rounded-xl bg-[#F8FAFC] px-4 py-3">
                Salário líquido
              </li>

              <li className="rounded-xl bg-[#F8FAFC] px-4 py-3">
                Juros compostos
              </li>

              <li className="rounded-xl bg-[#F8FAFC] px-4 py-3">
                Porcentagem
              </li>
            </ul>

            <p className="mt-5 text-base leading-7 text-[#475569]">
              Novas ferramentas poderão ser adicionadas conforme o ResultaAí
              evoluir.
            </p>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
              Como tratamos os resultados
            </h2>

            <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
              <p>
                Trabalhamos para que as fórmulas, regras e informações
                utilizadas nas calculadoras sejam apresentadas da maneira mais
                clara possível.
              </p>

              <p>
                Algumas ferramentas, principalmente as relacionadas a cálculos
                trabalhistas, tributários e financeiros, fornecem estimativas.
                Regras, alíquotas e situações individuais podem alterar o valor
                final.
              </p>

              <p>
                Por isso, os resultados apresentados pelo ResultaAí têm caráter
                informativo e não substituem a análise de um profissional
                qualificado quando ela for necessária.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
              Gratuito e fácil de usar
            </h2>

            <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
              <p>
                As calculadoras do ResultaAí podem ser utilizadas gratuitamente
                e foram desenvolvidas para funcionar sem exigir cadastro para
                realizar os cálculos disponíveis no site.
              </p>

              <p>
                Nosso objetivo é continuar ampliando o conjunto de ferramentas
                e conteúdos para ajudar cada vez mais pessoas a encontrar
                respostas para contas do dia a dia.
              </p>
            </div>
          </section>

          <section
            id="criador"
            className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">
              Sobre o criador
            </p>

            <h2 className="mt-2 text-xl font-black text-[#0F172A] sm:text-2xl">
              Quem está por trás do ResultaAí
            </h2>

            <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
              <p>
                O ResultaAí é um projeto criado e desenvolvido por{" "}
                <strong className="font-bold text-[#0F172A]">
                  Gabriel Gadelha
                </strong>
                , com o objetivo de tornar cálculos do dia a dia mais simples,
                claros e acessíveis.
              </p>

              <p>
                O projeto busca reunir ferramentas úteis em um só lugar,
                combinando tecnologia, simplicidade e informações que ajudam a
                compreender os resultados apresentados.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/gabriel-gadelha-7377b1214/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-bold text-[#0F172A] transition hover:border-[#2563EB] hover:text-[#2563EB] sm:text-base"
            >
              Ver perfil no LinkedIn →
            </a>
          </section>

          <div className="rounded-2xl bg-[#0F172A] p-6 text-white sm:p-8">
            <p className="text-sm font-bold text-[#60A5FA]">ResultaAí</p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Calcule rápido. Resolva fácil.
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-[#CBD5E1]">
              Escolha uma de nossas calculadoras e encontre o resultado que
              você precisa.
            </p>

            <a
              href="/#calculadoras"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              Ver calculadoras
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}