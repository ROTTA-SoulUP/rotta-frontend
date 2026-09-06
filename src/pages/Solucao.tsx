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
      
    </main>
  );
}