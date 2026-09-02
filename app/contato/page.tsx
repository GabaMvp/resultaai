import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o ResultaAí para enviar dúvidas, sugestões, correções ou falar sobre nossas calculadoras.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
            Contato
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0F172A] sm:text-4xl md:text-5xl">
            Fale com o ResultaAí
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
            Encontrou algum problema, tem uma sugestão de calculadora ou quer
            falar com a gente? Entre em contato por e-mail.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">
              E-mail
            </p>

            <h2 className="mt-2 text-xl font-black text-[#0F172A] sm:text-2xl">
              Nosso canal de contato
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#475569]">
              Para dúvidas, sugestões, correções ou outros assuntos
              relacionados ao ResultaAí, envie uma mensagem para:
            </p>

            <a
              href="mailto:resultaicontato@gmail.com"
              className="mt-5 inline-flex break-all text-lg font-black text-[#2563EB] transition hover:text-[#1D4ED8] sm:text-xl"
            >
              resultaicontato@gmail.com
            </a>

            <div className="mt-6">
              <a
                href="mailto:resultaicontato@gmail.com"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1D4ED8] sm:text-base"
              >
                Enviar e-mail
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
              Encontrou um erro?
            </h2>

            <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
              <p>
                Se uma calculadora apresentou um resultado que parece
                incorreto, uma informação desatualizada ou algum problema de
                funcionamento, queremos saber.
              </p>

              <p>
                Ao entrar em contato, informe qual calculadora estava
                utilizando e descreva o problema encontrado. Se possível,
                explique quais valores foram informados e qual resultado
                apareceu.
              </p>

              <p className="font-semibold text-[#334155]">
                Não envie documentos, senhas, dados bancários ou outras
                informações pessoais sensíveis.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
              Sugira uma calculadora
            </h2>

            <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
              <p>
                Sentiu falta de alguma ferramenta? Você também pode enviar
                sugestões de novas calculadoras para o ResultaAí.
              </p>

              <p>
                Sugestões de melhorias nas ferramentas existentes também são
                bem-vindas e poderão ser consideradas em futuras atualizações.
              </p>
            </div>

            <a
              href="mailto:resultaicontato@gmail.com?subject=Sugestão%20para%20o%20ResultaAí"
              className="mt-5 inline-flex font-bold text-[#2563EB] transition hover:text-[#1D4ED8]"
            >
              Enviar uma sugestão →
            </a>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
              Sobre os resultados das calculadoras
            </h2>

            <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
              <p>
                As calculadoras do ResultaAí possuem caráter informativo e
                algumas ferramentas apresentam estimativas.
              </p>

              <p>
                Para situações específicas envolvendo decisões jurídicas,
                trabalhistas, tributárias, contábeis, financeiras ou de
                investimento, procure orientação profissional quando
                necessário.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/termos"
                className="rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-bold text-[#334155] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Termos de Uso
              </a>

              <a
                href="/privacidade"
                className="rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-bold text-[#334155] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Política de Privacidade
              </a>
            </div>
          </section>

          <div className="rounded-2xl bg-[#0F172A] p-6 text-white sm:p-8">
            <p className="text-sm font-bold text-[#60A5FA]">
              ResultaAí
            </p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Calcule rápido. Resolva fácil.
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-[#CBD5E1]">
              Ferramentas simples, resultados claros e informações para ajudar
              nas contas do dia a dia.
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