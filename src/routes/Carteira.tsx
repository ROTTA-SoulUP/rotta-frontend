import { useState } from "react";

type Acao = {
  nome: string;
  pontos: number;
  icone: string;
};

type HistoricoItem = {
  id: number;
  nome: string;
  pontos: number;
  data: string;
};

const acoesDisponiveis: Acao[] = [
  { nome: "Separar recicláveis", pontos: 15, icone: "♻️" },
  { nome: "Usar garrafa reutilizável", pontos: 20, icone: "💧" },
  { nome: "Ir a pé ou de bicicleta", pontos: 40, icone: "🚶" },
  { nome: "Usar sacola reutilizável", pontos: 25, icone: "🛍️" },
  { nome: "Economizar energia", pontos: 30, icone: "💡" },
  { nome: "Evitar descarte incorreto", pontos: 20, icone: "🗑️" },
];

// Taxa de conversão: 150 pts = R$ 5,30
const VALOR_POR_PONTO = 5.30 / 150;

export default function Carteira() {
  // USESTATE — saldo de pontos
  const [saldoPontos, setSaldoPontos] = useState(0);
  const [totalConvertido, setTotalConvertido] = useState(0);

  // USESTATE — histórico de ações
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);

  // USESTATE — controle do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [convertido, setConvertido] = useState(false);

  // USESTATE — pontos a converter
  const [pontosConverter, setPontosConverter] = useState("");
  const [erroConverter, setErroConverter] = useState("");

  // USESTATE — toast de confirmação
  const [toast, setToast] = useState<{ visivel: boolean; texto: string }>({
    visivel: false,
    texto: "",
  });

  // Cálculos derivados
  const saldoReais = (saldoPontos * VALOR_POR_PONTO)
    .toFixed(2)
    .replace(".", ",");

  const metaSemanal = historico.reduce((acc, h) => acc + h.pontos, 0);
  const metaLimite = 100;
  const metaProgresso = Math.min((metaSemanal / metaLimite) * 100, 100);

  const valorReceber = pontosConverter
    ? (parseInt(pontosConverter) * VALOR_POR_PONTO)
        .toFixed(2)
        .replace(".", ",")
    : "0,00";

  // Registrar nova ação
  const registrarAcao = (acao: Acao) => {
    const novoItem: HistoricoItem = {
      id: Date.now(),
      nome: acao.nome,
      pontos: acao.pontos,
      data: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistorico((prev) => [novoItem, ...prev]);
    setSaldoPontos((prev) => prev + acao.pontos);

    setToast({
      visivel: true,
      texto: `${acao.nome} registrada! +${acao.pontos} pts`,
    });

    // Some com o toast depois de 3 segundos
    setTimeout(() => {
      setToast({ visivel: false, texto: "" });
    }, 3000);
  };

  // Limpar histórico
  const limparHistorico = () => {
    setHistorico([]);
  };

  // Abrir modal de conversão
  const abrirModal = () => {
    setModalAberto(true);
    setConvertido(false);
    setPontosConverter("");
    setErroConverter("");
  };

  // Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    setConvertido(false);
    setPontosConverter("");
    setErroConverter("");
  };

  // Confirmar conversão
  const confirmarConversao = () => {
    const qtd = parseInt(pontosConverter);

    if (!pontosConverter || isNaN(qtd)) {
      setErroConverter("Digite a quantidade de pontos");
      return;
    }

    if (qtd < 100) {
      setErroConverter("O mínimo para conversão é 100 pontos");
      return;
    }

    if (qtd > saldoPontos) {
      setErroConverter("Saldo insuficiente");
      return;
    }

    // Soma o valor convertido ao total
    const valorConvertido = qtd * VALOR_POR_PONTO;

    setSaldoPontos((prev) => prev - qtd);
    setTotalConvertido((prev) => prev + valorConvertido);
    setConvertido(true);
    setErroConverter("");
  };