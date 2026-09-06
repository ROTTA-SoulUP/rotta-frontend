import { useState } from "react";

const acoes = [
  { id: "reciclaveis", label: "Separar recicláveis", pontos: 15, icon: "♻️" },
  { id: "garrafa", label: "Usar garrafa reutilizável", pontos: 20, icon: "🍶" },
  { id: "bike", label: "Ir a pé ou de bicicleta", pontos: 40, icon: "🚲" },
  { id: "descarte", label: "Evitar descarte incorreto", pontos: 25, icon: "🗑️" },
  { id: "sacola", label: "Usar sacola reutilizável", pontos: 30, icon: "🛍️" },
  { id: "energia", label: "Economizar energia em casa", pontos: 20, icon: "💡" },
];

export default function Solucao() {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  const ptsDia = acoes
    .filter((a) => selecionadas.includes(a.id))
    .reduce((soma, a) => soma + a.pontos, 0);
  const ptsMes = ptsDia * 30;
  const creditos = (ptsMes / 150) * 5.3;
  const porcentagem = Math.min((creditos / 150) * 100, 100);

  const toggle = (id: string) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
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
            Calcule seus créditos de transporte
          </h2>
          <p className="text-texto-muted max-w-lg mx-auto">
            Selecione as ações que você faz no dia a dia e veja quantos créditos
            acumularia por mês.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

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
                      ativa ? "bg-verde text-creme" : "bg-verde/10 text-verde-claro"
                    }`}
                  >
                    {acao.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-creme text-sm font-medium">{acao.label}</p>
                    <p className="text-texto-muted text-xs">+{acao.pontos} pts / dia</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      ativa ? "border-verde-claro bg-verde-claro" : "border-texto-muted"
                    }`}
                  >
                    {ativa && <span className="text-fundo text-xs">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

          <aside className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center h-fit lg:sticky lg:top-8">
            <p className="text-texto-muted text-sm uppercase tracking-widest mb-2">
              Pontos por dia
            </p>
            <p className="text-4xl font-serif text-verde-claro mb-6">{ptsDia}</p>

            <p className="text-texto-muted text-sm uppercase tracking-widest mb-2">
              Pontos por mês (30 dias)
            </p>
            <p className="text-4xl font-serif text-verde-claro mb-6">{ptsMes}</p>

            <hr className="border-borda w-full mb-6" />

            <p className="text-texto-muted text-sm uppercase tracking-widest mb-2">
              Créditos de transporte
            </p>
            <p className="text-3xl font-serif text-creme mb-2">
              R$ {creditos.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-texto-muted text-xs mb-6">
              150 pts = R$ 5,30 em crédito
            </p>

            <div className="w-full bg-fundo rounded-full h-3 mb-2">
              <div
                className="bg-verde-claro h-3 rounded-full transition-all duration-500"
                style={{ width: `${porcentagem}%` }}
              />
            </div>
            <p className="text-texto-muted text-xs">
              {porcentagem.toFixed(0)}% da passagem mensal (R$ 150)
            </p>
          </aside>

      </section>
    </main>
  );
}