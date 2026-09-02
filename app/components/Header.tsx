import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          aria-label="Ir para a página inicial do ResultaAí"
          className="text-lg sm:text-2xl"
        >
          <Logo />
        </a>

        <nav
          aria-label="Navegação principal"
          className="flex items-center gap-3 sm:gap-7"
        >
          <a
            href="/#calculadoras"
            className="text-sm font-semibold text-[#475569] transition hover:text-[#2563EB]"
          >
            Calculadoras
          </a>

          <a
            href="/#sobre"
            className="hidden text-sm font-semibold text-[#475569] transition hover:text-[#2563EB] sm:block"
          >
            Sobre
          </a>

          <a
            href="/sobre#criador"
            aria-label="Conheça o criador do ResultaAí"
            title="Sobre o criador"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-[#EFF6FF] hover:text-[#2563EB] sm:h-8 sm:w-8"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[18px] w-[18px] fill-current"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}