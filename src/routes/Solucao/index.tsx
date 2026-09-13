import ValidacaoFoto from "../../components/ValidacaoFoto";
import { useState } from "react";

const acoes = [
  { id: "reciclaveis", label: "Separar recicláveis", pontos: 15, icon: "♻️" },
  { id: "garrafa", label: "Usar garrafa reutilizável", pontos: 20, icon: "🍶" },
  { id: "bike", label: "Ir a pé ou de bicicleta", pontos: 40, icon: "🚲" },
  {
    id: "descarte",
    label: "Evitar descarte incorreto",
    pontos: 25,
    icon: "🗑️",
  },
  { id: "sacola", label: "Usar sacola reutilizável", pontos: 30, icon: "🛍️" },
  {
    id: "energia",
    label: "Economizar energia em casa",
    pontos: 20,
    icon: "💡",
  },
];

export default function Solucao() {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  const ptsDia = acoes
    .filter((a) => selecionadas.includes(a.id))
    .reduce((soma, a) => soma + a.pontos, 0);
    const ptsMes = ptsDia * 30;  
  const passagens = Math.floor(ptsDia / 150);


  const toggle = (id: string) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <main className="min-h-screen bg-fundo text-creme font-sans">

      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          A Solução
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-creme mb-4">
          Como a Rotta funciona
        </h1>
        <p className="text-xl text-verde-claro font-light max-w-xl">
          Da ação sustentável ao crédito no ônibus — em 4 passos simples.
        </p>
      </section>

      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-verde-claro text-sm uppercase tracking-widest mb-4">
            Simulador interativo
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-creme mb-4">
            Simule suas rottas (pontos)
          </h2>
          <p className="text-texto-muted max-w-lg mx-auto">
            Selecione as ações sustentáveis que você realiza e veja quantas rottas você pode acumular. 

          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          <div className="space-y-3">
            <p className="text-texto-muted text-sm mb-4">
              Selecione suas ações sustentáveis:
            </p>

            {acoes.map((acao) => {
              const ativa = selecionadas.includes(acao.id);
              return (
                <button
                  key={acao.id}
                  onClick={() => toggle(acao.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors duration-300 text-left ${
                    ativa
                      ? "border-verde-claro bg-verde/10"
                      : "border-borda bg-fundo-card hover:border-verde-claro/40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-lg ${
                      ativa
                        ? "bg-verde text-creme"
                        : "bg-verde/10 text-verde-claro"
                    }`}
                  >
                    {acao.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-creme text-sm font-medium">
                      {acao.label}
                    </p>
                    <p className="text-texto-muted text-xs">
                      +{acao.pontos} pts / dia
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      ativa
                        ? "border-verde-claro bg-verde-claro"
                        : "border-texto-muted"
                    }`}
                  >
                    {ativa && <span className="text-fundo text-xs">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        
          <aside className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center h-fit  ">
            <p className="text-texto-muted text-sm uppercase tracking-widest mb-2">
              Pontos por dia
            </p>
            <p className="text-4xl font-serif text-verde-claro mb-6">
              {ptsDia}
            </p>

            <p className="text-texto-muted text-sm uppercase tracking-widest mb-2">
              Pontos por mês (30 dias)
            </p>
            <p className="text-4xl font-serif text-verde-claro mb-6">
              {ptsMes}
            </p>

            <hr className="border-borda w-full mb-6" />

            <p className="text-texto-muted text-sm uppercase tracking-widest mb-2">
              Rottas acumuladas 
            </p>
            <p className="text-3xl font-serif text-creme mb-2">
              {passagens} {passagens === 1 ? "passagem" : "passagens"}
            </p>
            <p className="text-texto-muted text-xs mb-6">
              150 rtt = 1 passagem de transporte público
            </p>
          </aside>
        </div>
      </section>

      <section className="px-4 py-16 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-verde-claro text-sm uppercase tracking-widest mb-4">
            Passo a passo
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-creme mb-4">
            O fluxo completo da Rotta
          </h2>
          <p className="text-texto-muted max-w-lg mx-auto">
            Veja como cada etapa funciona, desde o registro da ação até o uso do
            crédito no transporte.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <article className="bg-fundo-card border border-borda hover:border-verde-claro/50 rounded-xl p-6 flex gap-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-verde text-creme text-xl font-serif shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg font-medium text-creme mb-2">
                Escolha um desafio
              </h3>
              <p className="text-texto-muted text-sm leading-relaxed mb-3">
                O usuário escolhe uma ação sustentável disponível no aplicativo e verifica a pontuação correspondente.

              </p>
            </div>
          </article>

          <div className="text-verde-claro text-2xl text-center">↓</div>

          <article className="bg-fundo-card border border-borda hover:border-verde-claro/50 rounded-xl p-6 flex gap-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-verde text-creme text-xl font-serif shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-medium text-creme mb-2">
                Registre a ação
              </h3>
              <p className="text-texto-muted text-sm leading-relaxed mb-3">
                A ação é registrada por foto ou vídeo diretamente pelo aplicativo, vinculada ao desafio escolhido.
              </p>
            </div>
          </article>

          <div className="text-verde-claro text-2xl text-center">↓</div>

          <article className="bg-fundo-card border border-borda hover:border-verde-claro/50 rounded-xl p-6 flex gap-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-verde text-creme text-xl font-serif shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-medium text-creme mb-2">
                Validação da comprovação
              </h3>
              <p className="text-texto-muted text-sm leading-relaxed mb-3">
                A comprovação é analisada para verificar se atende aos requisitos do desafio. Nesta versão, a validação por inteligência artificial é simulada.
              </p>
            </div>
          </article>

          <div className="text-verde-claro text-2xl text-center">↓</div>

          <article className="bg-fundo-card border border-borda hover:border-verde-claro/50 rounded-xl p-6 flex gap-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-verde text-creme text-xl font-serif shrink-0">
              4
            </div>
            <div>
              <h3 className="text-lg font-medium text-creme mb-2">
                Receba seus pontos
              </h3>
              <p className="text-texto-muted text-sm leading-relaxed mb-3">
               Após a aprovação, os pontos são adicionados à carteira e contribuem para a evolução do Capi e da sequência de dias.
              </p>
            </div>
          </article>

          <div className="text-verde-claro text-2xl text-center">↓</div>

          <article className="bg-fundo-card border border-borda hover:border-verde-claro/50 rounded-xl p-6 flex gap-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-verde text-creme text-xl font-serif shrink-0">
              5
            </div>
            <div>
              <h3 className="text-lg font-medium text-creme mb-2">
                Resgate sua passagem
              </h3>
              <p className="text-texto-muted text-sm leading-relaxed mb-3">
               Ao atingir múltiplos de 150 pontos, o usuário pode resgatar uma passagem utilizando o Rotta Card por NFC ou um QR Code.
              </p>
            </div>
          </article>
        </div>
      </section>

            {/* ===== IMPACTO ===== */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-verde-claro text-sm uppercase tracking-widest mb-4">
            Impacto
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-creme mb-4">
            O que a Rotta gera na prática
          </h2>
          <p className="text-texto-muted max-w-lg mx-auto">
            Cada ação registrada gera impacto para o usuário, na cidade e ao meio ambiente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center hover:border-verde-claro/50 transition-colors duration-300">
            <p className="text-4xl font-serif text-verde-claro mb-4">3x</p>
            <p className="text-texto-muted text-sm leading-relaxed">
              mais engajamento com sustentabilidade quando há recompensa concreta
            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center hover:border-verde-claro/50 transition-colors duration-300">
            <p className="text-4xl font-serif text-verde-claro mb-4">150</p>
            <p className="text-texto-muted text-sm leading-relaxed">
              rottas para transformar sustentabilidade em mobilidade no seu dia a dia.  

            </p>
          </article>

          <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center hover:border-verde-claro/50 transition-colors duration-300">
            <p className="text-4xl font-serif text-verde-claro mb-4">0</p>
            <p className="text-texto-muted text-sm leading-relaxed">
              fraudes graças à validação por IA em 100% das ações registradas
            </p>
          </article>
        </div>
      </section>

       <section className="px-4 py-12">
        <h2 className="text-creme text-2xl font-bold text-center mb-8">
          Validação com IA
        </h2>
      </section>
        <ValidacaoFoto />
    </main>
  );
}
