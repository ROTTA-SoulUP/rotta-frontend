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
          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center">
            <div className="text-3xl mb-4">😞</div>
            <h3 className="text-creme text-sm font-medium mb-2">Falta de incentivo real</h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Mesmo com maior conscientização ambiental, a falta de benefícios
              concretos ainda torna a adesão a hábitos sustentáveis baixa e
              inconsistente.
            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center">
            <div className="text-3xl mb-4">🚌</div>
            <h3 className="text-creme text-sm font-medium mb-2">Transporte como barreira</h3>
            <p className="text-texto-muted text-xs leading-relaxed">
              Milhões de brasileiros enfrentam diariamente o alto custo do
              transporte público para trabalhar e estudar, tornando a mobilidade
              urbana um dos grandes desafios das cidades atuais.
            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-6 text-center">
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

    </main>
  );
}