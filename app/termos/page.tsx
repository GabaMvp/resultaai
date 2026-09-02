import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Conheça os Termos de Uso do ResultaAí e as condições aplicáveis ao uso de nossas calculadoras e conteúdos.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB] sm:text-sm">
            ResultaAí
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0F172A] sm:text-4xl md:text-5xl">
            Termos de Uso
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
            Estes Termos estabelecem as condições para utilização das
            calculadoras, conteúdos e demais recursos disponibilizados pelo
            ResultaAí.
          </p>

          <p className="mt-3 text-sm text-[#94A3B8]">
            Última atualização: setembro de 2026.
          </p>
        </div>

        <div className="space-y-6">
          <Secao titulo="1. Aceitação dos Termos">
            <p>
              Ao acessar e utilizar o ResultaAí, você declara estar ciente
              destes Termos de Uso e concorda em utilizar o site de acordo com
              as condições aqui apresentadas e com a legislação aplicável.
            </p>

            <p>
              Caso não concorde com alguma das condições, recomendamos que não
              utilize os serviços disponibilizados pelo site.
            </p>
          </Secao>

          <Secao titulo="2. Sobre o ResultaAí">
            <p>
              O ResultaAí é um site que disponibiliza calculadoras online e
              conteúdos informativos relacionados a trabalho, finanças,
              matemática e outras situações do dia a dia.
            </p>

            <p>
              Nosso objetivo é facilitar cálculos e apresentar seus resultados
              de maneira simples e compreensível.
            </p>
          </Secao>

          <Secao titulo="3. Uso das calculadoras">
            <p>
              Para utilizar determinadas calculadoras, o usuário deverá
              informar os valores e demais dados necessários para a realização
              do cálculo escolhido.
            </p>

            <p>
              É responsabilidade do usuário verificar se as informações
              inseridas estão corretas antes de utilizar o resultado.
            </p>

            <p>
              Os resultados podem variar de acordo com os dados fornecidos,
              regras aplicáveis, arredondamentos, particularidades individuais
              e eventuais alterações legislativas ou regulatórias.
            </p>
          </Secao>

          <Secao titulo="4. Caráter informativo dos resultados">
            <p>
              Os resultados fornecidos pelo ResultaAí possuem caráter
              informativo e estimativo.
            </p>

            <p>
              Embora busquemos desenvolver e atualizar nossas ferramentas com
              cuidado, não garantimos que determinado resultado corresponda
              exatamente ao valor apurado por empregadores, instituições
              financeiras, órgãos públicos, sistemas oficiais ou profissionais
              especializados.
            </p>

            <p>
              Situações individuais podem envolver regras e informações que
              não são consideradas por uma calculadora de uso geral.
            </p>
          </Secao>

          <Secao titulo="5. Cálculos trabalhistas e tributários">
            <p>
              Calculadoras relacionadas a salário, férias, décimo terceiro,
              rescisão e outros temas trabalhistas ou tributários fornecem
              estimativas com base nas informações consideradas pela
              ferramenta.
            </p>

            <p>
              Valores reais podem ser influenciados por fatores como acordos e
              convenções coletivas, benefícios, adicionais, comissões, horas
              extras, faltas, decisões judiciais, regras específicas da
              relação de trabalho e outras circunstâncias.
            </p>

            <p>
              Para decisões importantes ou situações específicas, recomendamos
              consultar um contador, advogado, profissional de recursos humanos
              ou outro profissional qualificado, conforme o caso.
            </p>
          </Secao>

          <Secao titulo="6. Cálculos financeiros">
            <p>
              Simulações financeiras, incluindo juros compostos e outros
              cálculos relacionados a dinheiro ou investimentos, são
              apresentadas para fins informativos.
            </p>

            <p>
              Os resultados não representam promessa de rentabilidade,
              recomendação de investimento, oferta de produto financeiro ou
              garantia de resultado futuro.
            </p>

            <p>
              Taxas, impostos, custos, inflação e outras condições podem fazer
              com que resultados reais sejam diferentes das simulações.
            </p>
          </Secao>

          <Secao titulo="7. Atualização das informações">
            <p>
              Buscamos manter as informações e ferramentas atualizadas.
              Entretanto, leis, alíquotas, limites, regras e outros parâmetros
              utilizados em determinados cálculos podem sofrer alterações.
            </p>

            <p>
              Por esse motivo, recomendamos verificar informações relevantes
              em fontes oficiais quando o cálculo for utilizado para uma
              decisão importante.
            </p>
          </Secao>

          <Secao titulo="8. Disponibilidade do site">
            <p>
              Podemos modificar, atualizar, adicionar ou remover calculadoras,
              conteúdos e funcionalidades a qualquer momento.
            </p>

            <p>
              Também poderão ocorrer períodos de indisponibilidade causados por
              manutenção, atualizações, falhas técnicas ou situações fora do
              nosso controle.
            </p>

            <p>
              Não garantimos que o site estará disponível de forma
              ininterrupta ou livre de erros em todos os momentos.
            </p>
          </Secao>

          <Secao titulo="9. Uso adequado do site">
            <p>
              O usuário se compromete a utilizar o ResultaAí de maneira lícita
              e compatível com a finalidade das ferramentas disponibilizadas.
            </p>

            <p>
              Não é permitido tentar prejudicar o funcionamento do site,
              explorar vulnerabilidades, realizar acessos não autorizados ou
              utilizar os serviços para atividades ilícitas.
            </p>
          </Secao>

          <Secao titulo="10. Propriedade intelectual">
            <p>
              A identidade visual, marca, textos, organização das páginas,
              elementos gráficos e conteúdos próprios do ResultaAí são
              protegidos pela legislação aplicável, quando cabível.
            </p>

            <p>
              O acesso ao site não concede ao usuário direito de propriedade
              sobre esses elementos.
            </p>
          </Secao>

          <Secao titulo="11. Links e serviços de terceiros">
            <p>
              O ResultaAí poderá apresentar links, anúncios ou recursos
              fornecidos por terceiros.
            </p>

            <p>
              Não controlamos o conteúdo, disponibilidade, políticas ou
              práticas adotadas por sites e serviços externos. O acesso a
              esses serviços estará sujeito aos respectivos termos e políticas.
            </p>
          </Secao>

          <Secao titulo="12. Publicidade">
            <p>
              O ResultaAí poderá ser financiado por publicidade exibida em
              determinadas áreas do site.
            </p>

            <p>
              Anúncios poderão ser fornecidos por plataformas de publicidade
              de terceiros. A presença de um anúncio não significa,
              necessariamente, recomendação ou endosso do produto, serviço ou
              anunciante pelo ResultaAí.
            </p>
          </Secao>

          <Secao titulo="13. Privacidade">
            <p>
              Informações sobre privacidade, cookies e tratamento de dados
              durante a utilização do site estão disponíveis em nossa Política
              de Privacidade.
            </p>

            <a
              href="/privacidade"
              className="inline-flex font-bold text-[#2563EB] transition hover:text-[#1D4ED8]"
            >
              Consultar Política de Privacidade →
            </a>
          </Secao>

          <Secao titulo="14. Limitação de responsabilidade">
            <p>
              O ResultaAí não deve ser utilizado como única fonte para decisões
              jurídicas, trabalhistas, tributárias, contábeis, financeiras ou
              de investimento.
            </p>

            <p>
              O usuário é responsável por avaliar as informações apresentadas
              e, quando necessário, buscar confirmação em fontes oficiais ou
              orientação profissional antes de tomar decisões com base nos
              resultados.
            </p>
          </Secao>

          <Secao titulo="15. Alterações destes Termos">
            <p>
              Estes Termos de Uso poderão ser alterados para acompanhar
              mudanças no ResultaAí, em nossas ferramentas ou em requisitos
              legais e regulatórios.
            </p>

            <p>
              A versão disponível nesta página será considerada a versão
              vigente dos Termos.
            </p>
          </Secao>

          <Secao titulo="16. Contato">
            <p>
              Caso tenha dúvidas, encontre algum problema em uma calculadora ou
              queira falar conosco sobre estes Termos, utilize os canais
              disponibilizados em nossa página de contato.
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
              Ferramentas simples para ajudar você a entender melhor suas
              contas e encontrar os resultados que procura.
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