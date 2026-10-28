import { FaBusAlt, FaRobot, FaShieldAlt } from "react-icons/fa";
import { FaNfcSymbol } from "react-icons/fa6";
import { GiPadlockOpen } from "react-icons/gi";
import { PiSmileySad } from "react-icons/pi";
import { MdOutlinePhoneIphone } from "react-icons/md";
export default function Sobre() {
  return (
    <main className="min-h-screen bg-fundo text-creme font-sans">
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          Sobre
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-creme mb-4">
          Rotta
        </h1>
        <p className="text-xl text-verde-claro font-light max-w-xl">
          Contexto do projeto, solução proposta e tecnologias utilizadas.
        </p>
      </section>

      <section className="px-4 max-w-5xl mx-auto py-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4 block">
          Contexto
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-creme mb-6">
          O problema que queremos resolver
        </h2>
        <p className="text-texto-muted text-sm leading-relaxed mb-4">
          A Grande São Paulo enfrenta dois desafios urgentes e interligados: a
          necessidade de mudança de hábitos para reduzir o impacto ambiental e a
          dificuldade de tornar o transporte público mais acessível e atraente.
        </p>
        <p className="text-texto-muted text-sm leading-relaxed mb-8">
          Muitas pessoas enfrentam dificuldades para arcar com seus
          deslocamentos diários, enquanto ações sustentáveis ainda recebem pouco
          incentivo. A Rotta conecta esses dois pontos ao transformar atitudes
          sustentáveis em pontos destinados ao transporte público.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="flex flex-col items-center text-center bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl [&>svg]:w-6 [&>svg]:h-6 mb-6">
              <PiSmileySad />
            </div>
            <h3 className="text-creme text-sm font-medium mb-2">
              Falta de incentivo
            </h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Mesmo com maior conscientização ambiental, a falta de benefícios
              concretos ainda torna a adesão a hábitos sustentáveis baixa e
              inconsistente.
            </p>
          </article>

          <article className="flex flex-col items-center text-center bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl [&>svg]:w-6 [&>svg]:h-6 mb-6">
              <FaBusAlt />
            </div>
            <h3 className="text-creme text-sm font-medium mb-2">
              Transporte como barreira
            </h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Moradores da Grande São Paulo que não possuem vale-transporte ou
              gratuidade podem enfrentar dificuldades para cobrir seus
              deslocamentos diários. A Rotta busca contribuir para essa
              realidade por meio de pontos destinados ao transporte público.
            </p>
          </article>

          <article className="flex flex-col items-center text-center bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl [&>svg]:w-6 [&>svg]:h-6 mb-6">
              <GiPadlockOpen />
            </div>
            <h3 className="text-creme text-sm font-medium mb-2">
              Sistemas desconectados
            </h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              A Rotta transforma sustentabilidade em benefício real ao integrar
              ações sustentáveis ao transporte público, criando impacto contínuo
              e incentivando a participação das pessoas no dia a dia urbano.
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 max-w-5xl mx-auto py-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4 block">
          Solução Proposta
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-creme mb-6">
          Como a Rotta funciona
        </h2>
        <p className="text-texto-muted text-sm leading-relaxed mb-8">
          O SoulUp cria uma ponte direta entre ações sustentáveis e benefícios
          no transporte público. O usuário age, registra, é validado e
          recompensado com créditos reais.
        </p>

        <ol className="flex flex-col gap-4 list-none counter-reset">
          {[
            {
              titulo: "Escolha do desafio",
              texto:
                "O usuário escolhe um desafio sustentável disponível no aplicativo, como caminhada no parque, descarte correto ou redução do uso de sacolas plásticas.",
            },
            {
              titulo: "Registro da ação",
              texto:
                "O usuário registra a ação por foto ou vídeo diretamente pelo aplicativo. A comprovação é vinculada ao desafio escolhido.",
            },
            {
              titulo: "Validação da comprovação",
              texto:
                "A mídia enviada passa por uma etapa de validação, que verifica se a comprovação atende aos requisitos do desafio. Nesta versão do projeto, essa validação é simulada.",
            },
            {
              titulo: "Pontos na carteira",
              texto:
                "Quando a comprovação é aprovada, os pontos do desafio são adicionados à carteira do usuário. A pontuação também contribui para sua sequência de dias e evolução do Capi.",
            },
            {
              titulo: "Resgate da passagem",
              texto:
                "Ao acumular múltiplos de 150 pontos, o usuário pode solicitar uma passagem de transporte público utilizando o Rotta Card, por NFC, ou um QR Code.",
            },
          ].map((passo, i) => (
            <li key={i} className="relative pl-16">
              <span className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-verde text-creme font-serif text-lg">
                {i + 1}
              </span>
              <article className="bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
                <h3 className="text-creme text-sm font-medium mb-2">
                  {passo.titulo}
                </h3>
                <p className="text-texto-muted text-xs leading-relaxed">
                  {passo.texto}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-8 bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
          <h3 className="text-verde-claro text-sm font-medium mb-2">
            Carteira
          </h3>
          <p className="text-texto-muted text-xs leading-relaxed">
            A plataforma contará com uma carteira digital onde o usuário poderá
            acompanhar sua quantidade de pontos, visualizar o histórico de ações
            sustentáveis realizadas e converter seus créditos em passagens para
            transporte público.
          </p>
        </div>
      </section>
      <section className="px-4 max-w-5xl mx-auto py-16">
        <div className="mt-8 bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
          <h2 className="text-verde-claro text-lg font-medium mb-2">
            Armazenamento offline
          </h2>

          <p>
            Caso não queira enviar a comprovação imediatamente, o usuário pode
            salvar temporariamente a foto ou o vídeo no armazenamento offline do
            aplicativo. As mídias ficam disponíveis para envio posterior e são
            excluídas automaticamente ao final do dia.
          </p>
        </div>
      </section>
      <section className="px-4 max-w-5xl mx-auto py-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4 block">
          Tecnologias
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-creme mb-6">
          O que sustenta o projeto
        </h2>
        <p className="text-texto-muted text-sm leading-relaxed mb-8">
          A Rotta é constituída sobre tecnologias modernas que garantem a
          performance, segurança e experiência de uso fluida.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <article className="flex flex-col items-center text-center bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl [&>svg]:w-6 [&>svg]:h-6 mb-6">
              <MdOutlinePhoneIphone />
            </div>
            <h3 className="text-creme text-sm font-medium mb-2">
              Aplicativo mobile
            </h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Interface para registrar ações, acompanhar pontuação e usar os
              créditos de transporte — tudo em um único app.
            </p>
          </article>

          <article className="flex flex-col items-center text-center bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl [&>svg]:w-6 [&>svg]:h-6 mb-6">
              <FaRobot />{" "}
            </div>
            <h3 className="text-creme text-sm font-medium mb-2">
              Inteligência artificial
            </h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Validação automática de fotos e vídeos e chatbot integrado para
              suporte ao usuário em tempo real.
            </p>
          </article>

          <article className="flex flex-col items-center text-center bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl [&>svg]:w-6 [&>svg]:h-6 mb-6">
              <FaNfcSymbol />
            </div>
            <h3 className="text-creme text-sm font-medium mb-2">
              Tecnologia NFC
            </h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Permite utilizar o Rotta Card por aproximação para realizar o
              resgate de pontos e liberar o acesso ao transporte público.
            </p>
          </article>

          <article className="flex flex-col items-center text-center bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl [&>svg]:w-6 [&>svg]:h-6 mb-6">
              <FaShieldAlt />
            </div>
            <h3 className="text-creme text-sm font-medium mb-2">
              Segurança e autenticação
            </h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Autenticação de usuários, controle de acesso e registro de
              atividades garantem proteção dos dados e rastreabilidade das
              ações.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
