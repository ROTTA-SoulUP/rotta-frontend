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