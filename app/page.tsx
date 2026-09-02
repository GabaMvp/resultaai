import AdSlot from "./components/AdSlot";

export default function Home() {
  const calculadoras = [
    {
      nome: "13º salário",
      descricao: "Calcule o valor estimado do seu décimo terceiro.",
      href: "/decimo-terceiro",
      disponivel: true,
      categoria: "Trabalho",
    },
    {
      nome: "Rescisão",
      descricao: "Estime os valores da sua rescisão trabalhista.",
      href: "/rescisao",
      disponivel: true,
      categoria: "Trabalho",
    },
    {
      nome: "Férias",
      descricao: "Calcule quanto você pode receber nas suas férias.",
      href: "/ferias",
      disponivel: true,
      categoria: "Trabalho",
    },
    {
      nome: "Salário líquido",
      descricao: "Descubra quanto você recebe depois dos descontos.",
      href: "/salario-liquido",
      disponivel: true,
      categoria: "Trabalho",
    },
    {
      nome: "Juros compostos",
      descricao: "Veja quanto seu dinheiro pode crescer ao longo do tempo.",
      href: "/juros-compostos",
      disponivel: true,
      categoria: "Finanças",
    },
    {
      nome: "Porcentagem",
      descricao: "Calcule porcentagens, aumentos e reduções rapidamente.",
      href: "/porcentagem",
      disponivel: true,
      categoria: "Matemática",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
            Simples, rápido e gratuito
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.04em] text-[#0F172A] sm:text-5xl md:text-6xl">
            Faça suas contas sem complicação.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
            Calculadoras online gratuitas para trabalho, finanças,
            investimentos e contas do dia a dia.
          </p>

          <a
            href="#calculadoras"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1D4ED8] sm:mt-7 sm:text-base"
          >
            Ver calculadoras
          </a>
        </div>
      </section>

      <section
        id="calculadoras"
        className="scroll-mt-20 border-y border-black/5 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12 md:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
              Ferramentas
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl md:text-4xl">
              Calculadoras
            </h2>

            <p className="mt-3 text-base leading-7 text-[#64748B] sm:text-lg">
              Escolha o que você precisa calcular.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {calculadoras.map((calculadora) => {
              const conteudo = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                      {calculadora.categoria}
                    </p>

                    {!calculadora.disponivel && (
                      <span className="shrink-0 rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[10px] font-bold text-[#64748B]">
                        Em breve
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-bold leading-tight text-[#0F172A] sm:mt-4 sm:text-xl">
                    {calculadora.nome}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-base">
                    {calculadora.descricao}
                  </p>

                  {calculadora.disponivel && (
                    <p className="mt-4 text-sm font-bold text-[#2563EB] sm:mt-5">
                      Abrir calculadora →
                    </p>
                  )}
                </>
              );

              if (!calculadora.disponivel) {
                return (
                  <div
                    key={calculadora.nome}
                    className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6"
                  >
                    {conteudo}
                  </div>
                );
              }

              return (
                <a
                  key={calculadora.nome}
                  href={calculadora.href}
                  className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:shadow-md sm:p-6"
                >
                  {conteudo}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <AdSlot />
      </section>

      <section
        id="sobre"
        className="scroll-mt-20 mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 md:pb-20"
      >
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:rounded-3xl sm:p-7 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
            Sobre
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
            Contas do dia a dia, de um jeito mais simples.
          </h2>

          <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-[#64748B]">
            <p>
              O ResultaAí reúne calculadoras gratuitas para ajudar em decisões e
              contas relacionadas a dinheiro, trabalho e situações cotidianas.
            </p>

            <p>
              Nossa proposta é mostrar resultados de forma clara, sem exigir
              cadastro e sem complicar o que pode ser simples.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}