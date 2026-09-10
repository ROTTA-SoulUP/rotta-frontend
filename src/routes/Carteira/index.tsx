import { GoGoal } from "react-icons/go";
import { FaBusAlt, FaClock  } from "react-icons/fa";
import {  MdBolt } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";
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

              <span className="text-2xl text-verde-claro"> 
              <RiCoinsLine /></span>
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
              <span className="text-2xl text-verde-claro">  
              <MdBolt/></span>

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
              <span className="text-2xl text-verde-claro"> 
              <FaBusAlt/></span>

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
              <span className="text-2xl text-verde-claro">
               <GoGoal/></span>

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

            {/* ===== REGISTRAR NOVA AÇÃO ===== */}
      <section className="px-4 max-w-5xl mx-auto py-12">

        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4 block">
          Nova Ação
        </span>

        <h2 className="text-3xl font-serif text-creme mb-2">
          Registrar ação sustentável
        </h2>

        <p className="text-texto-muted text-sm mb-8">
          Selecione a ação que você realizou hoje para acumular pontos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {acoesDisponiveis.map((acao, i) => (
            <article
              key={i}
              onClick={() => registrarAcao(acao)}
              className="bg-fundo-card border border-borda rounded-xl p-6 flex items-center gap-4 hover:border-verde-claro/50 hover:bg-verde/5 cursor-pointer transition-all duration-300"
            >
              <span className="text-3xl">
                {acao.icone}
              </span>

              <div>
                <p className="text-creme text-sm font-medium">
                  {acao.nome}
                </p>

                <p className="text-verde-claro text-xs mt-1">
                  +{acao.pontos} pts
                </p>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* ===== HISTÓRICO ===== */}
      <section className="px-4 max-w-5xl mx-auto py-12">

        <div className="flex items-center justify-between mb-6">

          <div>
            <span className="text-verde-claro text-sm uppercase tracking-widest mb-4 block">
              Histórico
            </span>

            <h2 className="text-3xl font-serif text-creme">
              Suas ações sustentáveis
            </h2>
          </div>

          {historico.length > 0 && (
            <button
              onClick={limparHistorico}
              className="flex items-center gap-2 text-xs text-texto-muted border border-borda rounded-full px-4 py-2 hover:border-red-400 hover:text-red-400 transition-colors duration-300"
            >
              <span>🗑️</span>
              <span>Limpar histórico</span>
            </button>
          )}

        </div>

        {historico.length === 0 ? (
          <div className="flex flex-col items-center text-center bg-fundo-card border border-borda rounded-xl p-6 hover:border-verde-claro/50 transition-colors duration-300">
            <p className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl [&>svg]:w-6 [&>svg]:h-6 mb-6"> 
            <FaClock /></p>

            <p className="text-texto-muted text-sm">
              Nenhuma ação registrada ainda.
            </p>

            <p className="text-texto-muted text-xs mt-1">
              Clique em uma ação acima para começar.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">

            {historico.map((item) => (
              <article
                key={item.id}
                className="bg-fundo-card border border-borda rounded-xl p-4 flex items-center justify-between"
              >

                <div className="flex items-center gap-4">

                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro">
                    ✓
                  </span>

                  <div>
                    <p className="text-creme text-sm font-medium">
                      {item.nome}
                    </p>

                    <p className="text-texto-muted text-xs">
                      {item.data}
                    </p>
                  </div>

                </div>

                <span className="text-verde-claro text-sm font-medium">
                  +{item.pontos} pts
                </span>

              </article>
            ))}

          </div>
        )}

      </section>

            {/* ===== MODAL DE CONVERSÃO ===== */}
      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={fecharModal}
        >
          <div
            className="bg-fundo-card border border-borda rounded-xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 text-creme text-2xl hover:text-verde-claro transition-colors"
            >
              &times;
            </button>

            {convertido ? (
              // ===== SUCESSO =====
              <div className="flex flex-col items-center text-center py-8">

                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-verde text-creme text-3xl mb-6">
                  ✓
                </div>

                <h2 className="text-2xl font-serif text-creme mb-2">
                  Convertido!
                </h2>

                <p className="text-texto-muted text-sm mb-6">
                  Seus créditos foram adicionados à sua carteira.
                </p>

                <button
                  onClick={fecharModal}
                  className="text-sm text-creme bg-verde rounded-full px-6 py-3 hover:bg-verde-claro hover:text-fundo transition-colors duration-300"
                >
                  Fechar
                </button>

              </div>
            ) : (
              // ===== FORM DE CONVERSÃO =====
              <div>

                <div className="flex flex-col items-center text-center mb-6">

                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl mb-4">
                    ⇄
                  </div>

                  <h2 className="text-2xl font-serif text-creme mb-2">
                    Converter Pontos
                  </h2>

                  <p className="text-texto-muted text-sm">
                    Escolha quantos pontos deseja converter em créditos de transporte.
                  </p>

                </div>

                {/* Taxa */}
                <div className="flex items-center justify-center gap-3 bg-fundo rounded-lg px-4 py-3 mb-6">
                  <span className="text-creme text-sm">
                    150 pts
                  </span>

                  <span className="text-verde-claro">
                    →
                  </span>

                  <span className="text-creme text-sm">
                    R$ 5,30
                  </span>
                </div>

                {/* Campo */}
                <div className="mb-4">

                  <label className="block text-verde-claro text-xs uppercase tracking-widest mb-2">
                    Pontos a converter
                  </label>

                  <input
                    type="number"
                    min={100}
                    step={100}
                    value={pontosConverter}
                    onChange={(e) => setPontosConverter(e.target.value)}
                    placeholder="Ex: 500"
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors"
                  />

                  {erroConverter && (
                    <span className="text-red-400 text-xs mt-1 block">
                      {erroConverter}
                    </span>
                  )}

                </div>

                {/* Resultado */}
                <div className="flex items-center justify-between bg-fundo rounded-lg px-4 py-3 mb-4">
                  <span className="text-texto-muted text-sm">
                    Você receberá:
                  </span>

                  <strong className="text-creme">
                    R$ {valorReceber}
                  </strong>
                </div>

                {/* Saldo disponível */}
                <div className="text-center text-texto-muted text-sm mb-6">
                  Saldo disponível:{" "}
                  <strong className="text-creme">
                    {saldoPontos} pts
                  </strong>
                </div>

                {/* Botões */}
                <div className="flex gap-4">

                  <button
                    onClick={fecharModal}
                    className="text-sm text-texto-muted border border-borda rounded-full px-6 py-3 hover:border-verde-claro hover:text-verde-claro transition-colors duration-300"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={confirmarConversao}
                    className="flex-1 flex items-center justify-center gap-2 text-sm text-creme bg-verde rounded-full px-6 py-3 hover:bg-verde-claro hover:text-fundo transition-colors duration-300"
                  >
                    <span>✓</span>
                    <span>Confirmar</span>
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* ===== TOAST ===== */}
      {toast.visivel && (
        <div className="fixed bottom-8 right-8 z-50 bg-fundo-card border border-verde-claro rounded-xl px-6 py-4 flex items-center gap-3 shadow-lg animate-fade-in">
          <span className="text-verde-claro text-xl">
            ✓
          </span>

          <span className="text-creme text-sm">
            {toast.texto}
          </span>
        </div>
      )}

    </main>
  );
}