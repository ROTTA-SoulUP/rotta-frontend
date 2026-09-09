type CardIntegranteProps = {
  nome: string;
  cargo: string;
  foto: string;
  onClick: () => void;
};

export default function CardIntegrante({ nome, cargo, foto, onClick }: CardIntegranteProps) {
  return (
    <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center hover:border-verde-claro/50 transition-colors duration-300">
      <img
        src={foto}
        alt={`Foto de ${nome}`}
        className="w-32 h-32 rounded-full object-cover border-4 border-verde/20 mb-6"
      />
      <p className="text-creme text-sm font-medium mb-1">
        {nome.split(" ").slice(0, 2).join(" ")}
      </p>
      <p className="text-texto-muted text-xs mb-4">{cargo}</p>
      <button
        onClick={onClick}
        className="inline-block text-xs text-verde-claro border border-verde/30 rounded-full px-5 py-2 hover:bg-verde/10 transition-colors duration-300"
      >
        Ver perfil
      </button>
    </article>
  );
}