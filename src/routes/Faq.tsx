import { useState, useEffect } from "react";

type Pergunta = {
  pergunta: string;
  resposta: string;
};

type Secao = {
  titulo: string;
  itens: Pergunta[];
};

const secoes: Secao[] = [
  {
    titulo: "Sobre o projeto",
    itens: [
      {
        pergunta: "O que é a SoulUp?",
        resposta:
          "O SoulUp é um aplicativo mobile que recompensa ações sustentáveis do dia a dia com créditos para o transporte público. O usuário registra suas ações por foto ou vídeo, acumula pontos validados por inteligência artificial e converte esses pontos em créditos para usar no ônibus.",
      },
      {
        pergunta: "O app é gratuito?",
        resposta:
          "Sim. O SoulUp é gratuito para o usuário final. O modelo de negócio é baseado em parcerias com empresas privadas que patrocinam categorias de ações sustentáveis e com o poder público que incentiva a integração com a mobilidade urbana.",
      },
    ],
  },
  {
    titulo: "Pontos e recompensas",
    itens: [
      {
        pergunta: "Que tipo de ação gera ponto?",
        resposta:
          "Ações sustentáveis cotidianas como separar o lixo reciclável, usar garrafas ou sacolas reutilizáveis, andar a pé ou de bicicleta, entre outras. Cada categoria tem uma pontuação definida e pode ser patrocinada por empresas parceiras.",
      },
      {
        pergunta: "Como sei se minha ação foi aprovada?",
        resposta:
          "Após enviar a foto ou vídeo, a inteligência artificial analisa o conteúdo e retorna a validação diretamente no app. Nenhuma ação gera pontos sem passar por essa etapa — isso garante que apenas ações reais sejam recompensadas.",
      },
      {
        pergunta: "Os pontos expiram?",
        resposta:
          "As regras de expiração de pontos ainda estão sendo definidas. O objetivo é garantir que os créditos sejam utilizados dentro de um prazo razoável para manter o ciclo de engajamento ativo.",
      },
      {
        pergunta: "Como os pontos viram créditos de transporte?",
        resposta:
          "Dentro do app, o usuário pode solicitar a conversão dos pontos em créditos de transporte. Esses créditos são integrados diretamente ao sistema de bilhetagem das operadoras parceiras por meio de APIs de mobilidade urbana.",
      },
    ],
  },
  {
    titulo: "Segurança e privacidade",
    itens: [
      {
        pergunta: "Como a SoulUp evita fraudes?",
        resposta:
          "A validação por inteligência artificial é a principal barreira contra fraudes. O sistema analisa o conteúdo para confirmar que a ação é real e condizente com o que foi declarado. Além disso, todas as atividades são registradas em logs para rastreabilidade.",
      },
      {
        pergunta: "Meus dados estão seguros?",
        resposta:
          "Sim. A SoulUp foi projetada com requisitos de segurança desde o início: autenticação de usuários, controle de acesso e registro de atividades. A proteção dos dados é uma prioridade do projeto, em conformidade com as diretrizes de privacidade vigentes.",
      },
    ],
  },
];

export default function Faq() {
  // USESTATE — controla qual pergunta está aberta (guarda o índice)
  const [aberta, setAberta] = useState<number | null>(null);

  // USESTATE — termo de busca digitado pelo usuário
  const [busca, setBusca] = useState("");

  // USEEFFECT — scroll pro topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // USEEFFECT — fecha o accordion se o usuário digitar na busca
  useEffect(() => {
    if (busca) {
      setAberta(null);
    }
  }, [busca]);

  // Filtra as perguntas com base no termo de busca
  const secoesFiltradas = secoes
    .map((secao) => ({
      ...secao,
      itens: secao.itens.filter(
        (item) =>
          item.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
          item.resposta.toLowerCase().includes(busca.toLowerCase()),
      ),
    }))
    .filter((secao) => secao.itens.length > 0);

  // Abre ou fecha a pergunta clicada
  const toggle = (index: number) => {
    setAberta(aberta === index ? null : index);
  };

  // Conta o total de perguntas
  const totalPerguntas = secoes.reduce((acc, s) => acc + s.itens.length, 0);

  return (
    <main className="min-h-screen bg-fundo text-creme font-sans">
      {/* ===== HERO ===== */}
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          FAQ
        </span>

        <h1 className="text-4xl md:text-5xl font-serif text-creme mb-4">
          Perguntas Frequentes
        </h1>

        <p className="text-xl text-verde-claro font-light max-w-xl">
          Tire suas dúvidas sobre a Rotta e a SoulUp — como funciona, como
          participar e como as recompensas são distribuídas.
        </p>
      </section>

      {/* ===== BARRA DE BUSCA ===== */}
      <section className="px-4 max-w-2xl mx-auto pb-8">
        <div className="relative">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar pergunta..."
            className="w-full bg-fundo-card border border-borda rounded-full px-6 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors"
          />

          {busca && (
            <button
              onClick={() => setBusca("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-texto-muted hover:text-verde-claro transition-colors text-lg"
            >
              ×
            </button>
          )}
        </div>

        <p className="text-texto-muted text-xs mt-3 text-center">
          {totalPerguntas} perguntas disponíveis
          {busca &&
            secoesFiltradas.length === 0 &&
            " — nenhuma resultado encontrado"}
        </p>
      </section>

      {/* ===== ACCORDION ===== */}
      <section className="px-4 max-w-2xl mx-auto pb-24">
        {secoesFiltradas.length === 0 ? (
          // Nenhum resultado
          <div className="text-center py-12">
            <p className="text-texto-muted text-sm">
              Nenhuma pergunta encontrada para "{busca}".
            </p>

            <button
              onClick={() => setBusca("")}
              className="mt-4 text-sm text-verde-claro border border-verde/30 rounded-full px-5 py-2 hover:bg-verde/10 transition-colors duration-300"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          secoesFiltradas.map((secao, sIndex) => (
            <div key={sIndex} className="mb-10">
              <h3 className="text-lg font-serif text-verde-claro mb-4">
                {secao.titulo}
              </h3>

              <div className="flex flex-col gap-3">
                {secao.itens.map((item, iIndex) => {
                  // Índice único = seção * 100 + item
                  const index = sIndex * 100 + iIndex;
                  const isOpen = aberta === index;

                  return (
                    <article
                      key={index}
                      className={`bg-fundo-card border rounded-xl overflow-hidden transition-colors duration-300 ${
                        isOpen ? "border-verde-claro/50" : "border-borda"
                      }`}
                    >
                      <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between text-left px-6 py-4 hover:bg-verde/5 transition-colors duration-300"
                      >
                        <span className="text-creme text-sm font-medium pr-4">
                          {item.pergunta}
                        </span>

                        <span
                          className={`text-verde-claro text-xl shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="px-6 pb-4 text-texto-muted text-sm leading-relaxed">
                          {item.resposta}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
