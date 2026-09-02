import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[#E2E8F0] bg-white sm:mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          <div>
            <a href="/" className="inline-flex text-lg sm:text-xl">
              <Logo />
            </a>

            <p className="mt-3 max-w-xs text-sm leading-6 text-[#64748B]">
              Calcule rápido. Resolva fácil.
            </p>

            <p className="mt-2 max-w-xs text-sm leading-6 text-[#94A3B8]">
              Calculadoras simples e gratuitas para ajudar nas contas do dia a
              dia.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">
              Calculadoras
            </h2>

            <nav className="mt-3 flex flex-col items-start gap-2.5 text-sm">
              <a
                href="/decimo-terceiro"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                13º salário
              </a>

              <a
                href="/rescisao"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Rescisão
              </a>

              <a
                href="/ferias"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Férias
              </a>

              <a
                href="/salario-liquido"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Salário líquido
              </a>

              <a
                href="/juros-compostos"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Juros compostos
              </a>

              <a
                href="/porcentagem"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Porcentagem
              </a>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">
              ResultaAí
            </h2>

            <nav className="mt-3 flex flex-col items-start gap-2.5 text-sm">
              <a
                href="/sobre"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Sobre
              </a>

              <a
                href="/contato"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Contato
              </a>

              <a
                href="/privacidade"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Política de Privacidade
              </a>

              <a
                href="/termos"
                className="text-[#64748B] transition hover:text-[#2563EB]"
              >
                Termos de Uso
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E2E8F0] pt-5 sm:mt-10 sm:pt-6">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#94A3B8] sm:text-sm">
              © {new Date().getFullYear()} ResultaAí. Todos os direitos
              reservados.
            </p>

            <p className="text-xs text-[#94A3B8] sm:text-sm">
              Calcule rápido. Resolva fácil.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}