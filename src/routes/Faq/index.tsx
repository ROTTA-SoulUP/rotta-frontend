
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
  const [aberta, setAberta] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const toggle = (id: string) => {
    setAberta((anterior) => (anterior === id ? null : id));
  };

  const totalPerguntas = secoes.reduce(
    (total, secao) => total + secao.itens.length,
    0,
  );

  const handleBuscaChange = (valor: string) => {
    setBusca(valor);
    setAberta(null);
  };

  return (
    <main className="min-h-screen bg-fundo font-sans text-creme">
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <span className="mb-4 text-sm uppercase tracking-widest text-verde-claro">
          FAQ
        </span>

        <h1 className="mb-4 font-serif text-4xl text-creme md:text-5xl">
          Perguntas Frequentes
        </h1>

        <p className="max-w-xl text-xl font-light text-verde-claro">
          Tire suas dúvidas sobre a Rotta e a SoulUp — como funciona, como
          participar e como as recompensas são distribuídas.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-8">
        <div className="relative">
          <input
            type="text"
            value={busca}
            onChange={(evento) => handleBuscaChange(evento.target.value)}
            placeholder="Buscar pergunta..."
            aria-label="Buscar perguntas frequentes"
            className="w-full rounded-full border border-borda bg-fundo-card px-6 py-3 text-creme placeholder:text-texto-muted/50 transition-colors focus:border-verde-claro focus:outline-none"
          />

          {busca && (
            <button
              type="button"
              onClick={() => handleBuscaChange("")}
              aria-label="Limpar busca"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-texto-muted transition-colors hover:text-verde-claro"
            >
              ×
            </button>
          )}
        </div>

        <p className="mt-3 text-center text-xs text-texto-muted">
          {totalPerguntas} perguntas disponíveis
          {busca && secoesFiltradas.length === 0 &&
            " — nenhum resultado encontrado"}
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-24">
        {secoesFiltradas.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-texto-muted">
              Nenhuma pergunta encontrada para "{busca}".
            </p>

            <button
              type="button"
              onClick={() => handleBuscaChange("")}
              className="mt-4 rounded-full border border-verde/30 px-5 py-2 text-sm text-verde-claro transition-colors duration-300 hover:bg-verde/10"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          secoesFiltradas.map((secao) => (
            <div key={secao.titulo} className="mb-10">
              <h3 className="mb-4 font-serif text-lg text-verde-claro">
                {secao.titulo}
              </h3>

              <div className="flex flex-col gap-3">
                {secao.itens.map((item) => {
                  const id = `${secao.titulo}-${item.pergunta}`;
                  const isOpen = aberta === id;

                  return (
                    <article
                      key={id}
                      className={`overflow-hidden rounded-xl border bg-fundo-card transition-colors duration-300 ${
                        isOpen
                          ? "border-verde-claro/50"
                          : "border-borda"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-300 hover:bg-verde/5"
                      >
                        <span className="pr-4 text-sm font-medium text-creme">
                          {item.pergunta}
                        </span>

                        <span
                          aria-hidden="true"
                          className={`shrink-0 text-xl text-verde-claro transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="px-6 pb-4 text-sm leading-relaxed text-texto-muted">
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
