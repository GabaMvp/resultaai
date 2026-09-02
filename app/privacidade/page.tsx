import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Conheça a Política de Privacidade do ResultaAí e saiba como tratamos informações, cookies e tecnologias utilizadas no site.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
            ResultaAí
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0F172A] sm:text-4xl md:text-5xl">
            Política de Privacidade
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
            Esta Política de Privacidade explica como informações podem ser
            coletadas, utilizadas e protegidas durante o uso do ResultaAí.
          </p>

          <p className="mt-3 text-sm text-[#94A3B8]">
            Última atualização: setembro de 2026.
          </p>
        </div>

        <div className="space-y-6">
          <Secao titulo="1. Sobre esta Política">
            <p>
              O ResultaAí disponibiliza calculadoras e conteúdos informativos
              destinados a facilitar cálculos relacionados a trabalho,
              finanças, matemática e situações do dia a dia.
            </p>

            <p>
              Esta Política descreve como informações e tecnologias de
              armazenamento, como cookies e identificadores semelhantes, podem
              ser utilizadas durante a navegação pelo site.
            </p>
          </Secao>

          <Secao titulo="2. Dados informados nas calculadoras">
            <p>
              As calculadoras podem solicitar informações necessárias para
              realizar determinado cálculo, como valores monetários, datas,
              períodos, percentuais e outras informações relacionadas à
              operação escolhida.
            </p>

            <p>
              Os dados digitados nos campos das calculadoras são utilizados
              para gerar os resultados apresentados ao usuário. As
              calculadoras foram desenvolvidas para realizar esses cálculos
              diretamente durante a utilização da página.
            </p>

            <p>
              Recomendamos que você não informe dados pessoais desnecessários,
              documentos, senhas ou outras informações confidenciais nos
              campos das calculadoras.
            </p>
          </Secao>

          <Secao titulo="3. Informações coletadas automaticamente">
            <p>
              Durante a navegação, determinadas informações técnicas podem ser
              coletadas automaticamente pelo site ou por serviços utilizados
              nele. Essas informações podem incluir dados sobre navegador,
              dispositivo, páginas acessadas, interações, data e hora de acesso,
              localização geográfica aproximada e informações técnicas
              relacionadas à conexão.
            </p>

            <p>
              Essas informações podem ser utilizadas para funcionamento,
              segurança, medição de audiência, análise de desempenho e
              melhoria da experiência oferecida pelo ResultaAí.
            </p>
          </Secao>

          <Secao titulo="4. Google Analytics">
            <p>
              O ResultaAí utiliza o Google Analytics, serviço de análise de
              audiência fornecido pelo Google, para compreender de forma
              agregada como o site é utilizado e melhorar suas páginas,
              conteúdos e ferramentas.
            </p>

            <p>
              O Google Analytics pode utilizar cookies e outros
              identificadores para coletar informações relacionadas à
              utilização do site, como páginas acessadas, interações,
              informações do navegador e do dispositivo, estatísticas de
              sessão e localização geográfica aproximada.
            </p>

            <p>
              Essas informações são utilizadas para gerar estatísticas e
              relatórios sobre a utilização do ResultaAí. Não solicitamos que
              usuários forneçam informações de identificação pessoal ao Google
              Analytics por meio das calculadoras.
            </p>

            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-bold text-[#2563EB] transition hover:text-[#1D4ED8]"
            >
              Consultar a Política de Privacidade do Google →
            </a>
          </Secao>

          <Secao titulo="5. Cookies e tecnologias semelhantes">
            <p>
              Cookies são pequenos arquivos ou identificadores utilizados por
              sites e serviços online para permitir determinadas
              funcionalidades, lembrar preferências, medir utilização e
              oferecer outros recursos.
            </p>

            <p>
              O ResultaAí e serviços de terceiros utilizados no site podem
              utilizar cookies, web beacons, endereços IP e outros
              identificadores para análise de audiência, funcionamento,
              segurança, desempenho e, quando aplicável, publicidade.
            </p>

            <p>
              Dependendo do navegador utilizado, você pode visualizar,
              bloquear ou excluir cookies por meio das configurações do
              próprio navegador. A desativação de determinados cookies poderá
              afetar algumas funcionalidades ou medições do site.
            </p>
          </Secao>

          <Secao titulo="6. Publicidade e Google AdSense">
            <p>
              O ResultaAí poderá utilizar o Google AdSense e outros serviços de
              publicidade para exibir anúncios em suas páginas.
            </p>

            <p>
              Quando a publicidade estiver ativa, terceiros, incluindo o
              Google, poderão colocar e ler cookies no navegador do usuário ou
              utilizar web beacons, endereços IP e outros identificadores como
              consequência da veiculação de anúncios no site.
            </p>

            <p>
              Terceiros, incluindo o Google, podem utilizar cookies para
              veicular anúncios com base em visitas anteriores do usuário ao
              ResultaAí ou a outros sites. O uso de cookies de publicidade
              permite ao Google e aos seus parceiros exibir anúncios de acordo
              com as configurações aplicáveis ao usuário.
            </p>

            <p>
              Os usuários podem gerenciar a personalização de anúncios por
              meio das configurações disponibilizadas pelo Google.
            </p>

            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-bold text-[#2563EB] transition hover:text-[#1D4ED8]"
            >
              Acessar as configurações de anúncios do Google →
            </a>
          </Secao>

          <Secao titulo="7. Serviços de terceiros">
            <p>
              O ResultaAí poderá utilizar serviços de terceiros para
              hospedagem, análise de tráfego, desempenho, segurança,
              publicidade e outras funcionalidades necessárias à operação do
              site.
            </p>

            <p>
              Esses serviços podem possuir suas próprias políticas de
              privacidade e realizar tratamentos de dados de acordo com seus
              respectivos termos e obrigações legais.
            </p>
          </Secao>

          <Secao titulo="8. Links para outros sites">
            <p>
              Algumas páginas poderão conter links para sites externos. O
              ResultaAí não controla as práticas de privacidade, conteúdos ou
              serviços oferecidos por sites de terceiros.
            </p>

            <p>
              Ao acessar um site externo, recomendamos consultar a política de
              privacidade e os termos aplicáveis ao respectivo serviço.
            </p>
          </Secao>

          <Secao titulo="9. Segurança">
            <p>
              Buscamos adotar medidas razoáveis para manter o site seguro e
              reduzir riscos relacionados a acesso não autorizado, alteração,
              divulgação ou destruição indevida de informações.
            </p>

            <p>
              Entretanto, nenhum sistema conectado à internet pode garantir
              segurança absoluta.
            </p>
          </Secao>

          <Secao titulo="10. Privacidade de crianças e adolescentes">
            <p>
              O ResultaAí não é desenvolvido com o objetivo de coletar
              intencionalmente dados pessoais de crianças. As ferramentas são
              destinadas ao uso geral e não exigem que o usuário informe sua
              identidade para realizar os cálculos disponíveis.
            </p>
          </Secao>

          <Secao titulo="11. Direitos e solicitações">
            <p>
              Dependendo da legislação aplicável e da forma como os dados
              forem tratados, o usuário poderá possuir direitos relacionados
              às suas informações pessoais.
            </p>

            <p>
              Solicitações relacionadas à privacidade poderão ser encaminhadas
              pelos meios disponibilizados na página de contato do ResultaAí.
            </p>
          </Secao>

          <Secao titulo="12. Alterações nesta Política">
            <p>
              Esta Política de Privacidade poderá ser atualizada para refletir
              mudanças no funcionamento do site, nos serviços utilizados ou em
              requisitos legais e regulatórios.
            </p>

            <p>
              Quando houver alterações relevantes, a data de atualização
              apresentada nesta página poderá ser modificada.
            </p>
          </Secao>

          <Secao titulo="13. Contato">
            <p>
              Em caso de dúvidas sobre esta Política de Privacidade ou sobre o
              funcionamento do ResultaAí, utilize os canais indicados em nossa
              página de contato.
            </p>

            <a
              href="/contato"
              className="inline-flex font-bold text-[#2563EB] transition hover:text-[#1D4ED8]"
            >
              Acessar página de contato →
            </a>
          </Secao>

          <div className="rounded-2xl bg-[#0F172A] p-6 text-white sm:p-8">
            <p className="text-sm font-bold text-[#60A5FA]">ResultaAí</p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Calcule rápido. Resolva fácil.
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-[#CBD5E1]">
              Transparência e simplicidade também fazem parte da experiência
              que queremos oferecer.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-7">
      <h2 className="text-xl font-black text-[#0F172A] sm:text-2xl">
        {titulo}
      </h2>

      <div className="mt-4 space-y-4 text-base leading-7 text-[#475569]">
        {children}
      </div>
    </section>
  );
}