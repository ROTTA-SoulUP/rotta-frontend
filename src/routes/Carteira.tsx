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

    return (
    <main className="min-h-screen bg-fundo text-creme font-sans">

      {/* ===== HERO ===== */}
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          Carteira Digital
        </span>

        <h1 className="text-4xl md:text-5xl font-serif text-creme mb-4">
          Minha Carteira
        </h1>

        <p className="text-xl text-verde-claro font-light max-w-xl">
          Acompanhe seus pontos, histórico e converta em créditos de transporte.
        </p>
      </section>

      {/* ===== PAINEL PRINCIPAL ===== */}
      <section className="px-4 max-w-5xl mx-auto pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card de saldo */}
          <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-verde-claro text-xs uppercase tracking-widest">
                Saldo de Pontos
              </span>

              <span className="text-2xl">🌿</span>
            </div>

            <p className="text-5xl font-serif text-creme mb-1">
              {saldoPontos}
            </p>

            <p className="text-texto-muted text-sm mb-6">
              pontos acumulados
            </p>

            <div className="flex items-center gap-2 text-texto-muted text-sm mb-6">
              <span>Equivale a</span>
              <strong className="text-creme">R$ {saldoReais}</strong>
              <span>em créditos</span>
            </div>

            <button
              onClick={abrirModal}
              disabled={saldoPontos < 100}
              className="flex items-center justify-center gap-2 text-sm text-creme bg-verde rounded-full px-6 py-3 hover:bg-verde-claro hover:text-fundo transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>⇄</span>
              <span>Converter Pontos</span>
            </button>
          </article>

          {/* Card de resumo */}
          <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col gap-6">

            <div className="flex items-center gap-4">
              <span className="text-2xl">⚡</span>

              <div>
                <p className="text-creme text-2xl font-serif">
                  {historico.length}
                </p>

                <p className="text-texto-muted text-xs">
                  ações registradas
                </p>
              </div>
            </div>

            <hr className="border-borda" />

            <div className="flex items-center gap-4">
              <span className="text-2xl">🚌</span>

              <div>
                <p className="text-creme text-2xl font-serif">
                  R$ {totalConvertido.toFixed(2).replace(".", ",")}
                </p>

                <p className="text-texto-muted text-xs">
                  já convertidos
                </p>
              </div>
            </div>

            <hr className="border-borda" />

            <div className="flex items-center gap-4">
              <span className="text-2xl">🎯</span>

              <div className="flex-1">
                <p className="text-creme text-2xl font-serif">
                  {metaSemanal}/{metaLimite}
                </p>

                <p className="text-texto-muted text-xs mb-2">
                  meta semanal
                </p>

                <div className="w-full h-2 bg-fundo rounded-full overflow-hidden">
                  <div
                    className="h-full bg-verde-claro rounded-full transition-all duration-500"
                    style={{ width: `${metaProgresso}%` }}
                  />
                </div>
              </div>
            </div>

          </article>

        </div>
      </section>