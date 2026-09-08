export default function Sobre() {
  return (
    <main className="min-h-screen bg-fundo text-creme font-sans">

      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          Sobre
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-creme mb-4">
          SoulUp
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
          Cidades brasileiras enfrentam dois desafios urgentes e interligados: a
          necessidade de mudança de hábitos para reduzir o impacto ambiental e a
          dificuldade de tornar o transporte público mais acessível e atraente.
        </p>
        <p className="text-texto-muted text-sm leading-relaxed mb-8">
          Comportamentos sustentáveis raramente recebem qualquer tipo de
          recompensa tangível. Ao mesmo tempo, o custo do transporte representa
          uma barreira real para boa parte da população. A SoulUp e a Rotta
          resolvem esses dois problemas juntos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="text-3xl mb-4">😞</div>
            <h3 className="text-creme text-sm font-medium mb-2">Falta de incentivo real</h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Mesmo com maior conscientização ambiental, a falta de benefícios
              concretos ainda torna a adesão a hábitos sustentáveis baixa e
              inconsistente.
            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="text-3xl mb-4">🚌</div>
            <h3 className="text-creme text-sm font-medium mb-2">Transporte como barreira</h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Milhões de brasileiros enfrentam diariamente o alto custo do
              transporte público para trabalhar e estudar, tornando a mobilidade
              urbana um dos grandes desafios das cidades atuais.
            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="text-3xl mb-4">🔓</div>
            <h3 className="text-creme text-sm font-medium mb-2">Sistemas desconectados</h3>
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
              titulo: "Registro da ação sustentável",
              texto:
                "O usuário documenta uma ação cotidiana — separar recicláveis, usar transporte alternativo, evitar descarte incorreto — por foto ou vídeo diretamente pelo app.",
            },
            {
              titulo: "Validação por inteligência artificial",
              texto:
                "Um sistema de IA analisa o conteúdo enviado, confirma a autenticidade da ação e aprova a pontuação. Essa etapa é fundamental para evitar fraudes e manter a credibilidade junto aos parceiros.",
            },
            {
              titulo: "Acúmulo de pontos e engajamento",
              texto:
                "Após validação, os pontos são somados ao perfil. O app conta com ranking, níveis de progressão e streak diário para estimular a consistência dos hábitos.",
            },
            {
              titulo: "Conversão em crédito de transporte",
              texto:
                "Os pontos acumulados são convertidos em créditos para o transporte público, integrados diretamente com as operadoras parceiras via APIs de mobilidade.",
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
          <h3 className="text-verde-claro text-sm font-medium mb-2">Carteira</h3>
          <p className="text-texto-muted text-xs leading-relaxed">
            A plataforma contará com uma carteira digital onde o usuário poderá
            acompanhar sua quantidade de pontos, visualizar o histórico de ações
            sustentáveis realizadas e converter seus créditos em passagens para
            transporte público.
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
          O SoulUp é construído sobre tecnologias modernas que garantem
          performance, segurança e experiência de uso fluida. A IA ocupa o
          centro da arquitetura como peça estrutural.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-creme text-sm font-medium mb-2">Aplicativo mobile</h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Interface para registrar ações, acompanhar pontuação e usar os
              créditos de transporte — tudo em um único app.
            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-creme text-sm font-medium mb-2">Inteligência artificial</h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Validação automática de fotos e vídeos e chatbot integrado para
              suporte ao usuário em tempo real.
            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-creme text-sm font-medium mb-2">APIs de mobilidade</h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Integração com sistemas de transporte público para exibição de
              ônibus em tempo real e conversão de pontos em créditos de
              bilhetagem.
            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-creme text-sm font-medium mb-2">Segurança e autenticação</h3>
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