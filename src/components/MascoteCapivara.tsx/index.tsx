import { useState } from "react";

const dicas = [
  "Use transporte público pelo menos 3x na semana e acumule pontos na Rotta!",
  "Separar recicláveis corretamente pode render até 50 pontos por ação!",
  "Caminhar trajetos curtos conta como ação sustentável no app!",
  "Mantenha seu streak diário para ganhar pontos em dobro!",
  "Convide amigos para a Rotta e ganhe créditos de transporte!",
];

export default function MascoteCapivara() {
  const [abaAberta, setAbaAberta] = useState(false);
  const [dicaVisivel, setDicaVisivel] = useState(false);
  const [dicaAtual, setDicaAtual] = useState("");

  const mostrarDica = () => {
    const dicaAleatoria = dicas[Math.floor(Math.random() * dicas.length)];
    setDicaAtual(dicaAleatoria);
    setDicaVisivel(true);
  };

  return (
    <div className="relative flex items-center">

      {/* Círculo da capivara */}
      <button
        onClick={() => {
          setAbaAberta(!abaAberta);
          setDicaVisivel(false);
        }}
        className="w-14 h-14 rounded-full border-2 border-verde-claro/50 overflow-hidden hover:border-verde-claro hover:scale-110 transition-all duration-300 shrink-0"
        aria-label="Dica do dia"
      >
        <img
          src="../../public/images/mascote.png"
          alt="Mascote capivara da Rotta"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Aba que desce */}
      {abaAberta && (
        <div className="absolute right-0 top-15 z-50 bg-fundo-card border border-verde-claro/30 rounded-xl p-15 shadow-lg w-80 transition-all duration-300">

          {!dicaVisivel ? (
            <div className="flex flex-col items-center text-center gap-3">
              <p className="text-creme text-sm font-medium">
                Receba a dica do dia! 🦫
              </p>
              <button
                onClick={mostrarDica}
                className="text-xs text-creme bg-verde rounded-full px-5 py-2 hover:bg-verde-claro hover:text-fundo transition-colors duration-300"
              >
                Receber dica
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-3">
              <p className="text-verde-claro text-xs uppercase tracking-widest">
                Dica do dia
              </p>
              <p className="text-creme text-sm leading-relaxed">
                {dicaAtual}
              </p>
              <button
                onClick={mostrarDica}
                className="text-xs text-verde-claro border border-verde/30 rounded-full px-4 py-2 hover:bg-verde/10 transition-colors duration-300"
              >
                Outra dica
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}