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
              Esta Política descreve de forma geral como informações e
              tecnologias de armazenamento, como cookies, podem ser utilizadas
              durante a navegação pelo site.
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
              nele. Essas informações podem incluir, por exemplo, tipo de
              navegador, dispositivo utilizado, páginas acessadas, data e hora
              de acesso e informações técnicas relacionadas à conexão.
            </p>

            <p>
              Essas informações podem ser utilizadas para funcionamento,
              segurança, medição de audiência, análise de desempenho e
              melhoria da experiência oferecida pelo ResultaAí.
            </p>
          </Secao>

          <Secao titulo="4. Cookies e tecnologias semelhantes">
            <p>
              Cookies são pequenos arquivos ou identificadores utilizados por
              sites e serviços online para permitir determinadas
              funcionalidades, lembrar preferências, medir utilização e
              oferecer outros recursos.
            </p>

            <p>
              O ResultaAí poderá utilizar cookies próprios ou de terceiros
              necessários para funcionamento, análise de audiência,
              desempenho e publicidade.
            </p>

            <p>
              Dependendo do navegador utilizado, você pode visualizar,
              bloquear ou excluir cookies por meio das configurações do
              próprio navegador. A desativação de determinados cookies poderá
              afetar algumas funcionalidades do site.
            </p>
          </Secao>

          <Secao titulo="5. Publicidade e Google AdSense">
            <p>
              O ResultaAí poderá exibir anúncios fornecidos por plataformas de
              publicidade de terceiros, incluindo o Google AdSense.
            </p>

            <p>
              Quando serviços de publicidade estiverem ativos, o Google e
              outros fornecedores poderão utilizar cookies ou tecnologias
              semelhantes para exibir, medir e personalizar anúncios de acordo
              com as configurações aplicáveis e com o consentimento exigido
              pela legislação.
            </p>

            <p>
              O uso de dados por serviços do Google está sujeito às políticas
              e aos termos próprios do Google. As opções disponíveis para
              controle e personalização de anúncios podem variar conforme o
              serviço, a região e as configurações do usuário.
            </p>
          </Secao>

          <Secao titulo="6. Serviços de terceiros">
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

          <Secao titulo="7. Links para outros sites">
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

          <Secao titulo="8. Segurança">
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

          <Secao titulo="9. Privacidade de crianças e adolescentes">
            <p>
              O ResultaAí não é desenvolvido com o objetivo de coletar
              intencionalmente dados pessoais de crianças. As ferramentas são
              destinadas ao uso geral e não exigem que o usuário informe sua
              identidade para realizar os cálculos disponíveis.
            </p>
          </Secao>

          <Secao titulo="10. Direitos e solicitações">
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

          <Secao titulo="11. Alterações nesta Política">
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

          <Secao titulo="12. Contato">
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