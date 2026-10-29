
import { useState, useRef, type ReactNode } from "react";
import {
  FaRecycle,
  FaBottleWater,
  FaBicycle,
  FaTrashCan,
  FaBagShopping,
  FaLightbulb,
  FaClock,
  FaBus,
} from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { MdBolt, MdMan } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";
import { BiWorld } from "react-icons/bi";

type Acao = {
  nome: string;
  pontos: number;
  icone: ReactNode;
};

type HistoricoItem = {
  id: number;
  nome: string;
  pontos: number;
  data: string;
};

type Toast = {
  visivel: boolean;
  texto: string;
};

const acoesDisponiveis: Acao[] = [
  {
    nome: "Separar recicláveis",
    pontos: 15,
    icone: <FaRecycle className="text-2xl text-verde-claro" />,
  },
  {
    nome: "Usar garrafa reutilizável",
    pontos: 20,
    icone: <FaBottleWater className="text-2xl text-verde-claro" />,
  },
  {
    nome: "Ir a pé ou de bicicleta",
    pontos: 40,
    icone: <FaBicycle className="text-2xl text-verde-claro" />,
  },
  {
    nome: "Usar sacola reutilizável",
    pontos: 25,
    icone: <FaBagShopping className="text-2xl text-verde-claro" />,
  },
  {
    nome: "Economizar energia",
    pontos: 30,
    icone: <FaLightbulb className="text-2xl text-verde-claro" />,
  },
  {
    nome: "Evitar descarte incorreto",
    pontos: 20,
    icone: <FaTrashCan className="text-2xl text-verde-claro" />,
  },
];

const VALOR_POR_PONTO = 5.3 / 150;
const META_SEMANAL = 100;

export default function Carteira() {
  const [saldoPontos, setSaldoPontos] = useState(0);
  const [totalConvertido, setTotalConvertido] = useState(0);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [convertido, setConvertido] = useState(false);
  const [pontosConverter, setPontosConverter] = useState("");
  const [erroConverter, setErroConverter] = useState("");
  const [toast, setToast] = useState<Toast>({
    visivel: false,
    texto: "",
  });

  const proximoId = useRef(0);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saldoReais = (saldoPontos * VALOR_POR_PONTO)
    .toFixed(2)
    .replace(".", ",");

  const metaSemanal = historico.reduce(
    (total, item) => total + item.pontos,
    0,
  );

  const metaProgresso = Math.min(
    (metaSemanal / META_SEMANAL) * 100,
    100,
  );

  const quantidadePontos = Number(pontosConverter);

  const valorReceber =
    pontosConverter !== "" && Number.isFinite(quantidadePontos)
      ? (quantidadePontos * VALOR_POR_PONTO)
          .toFixed(2)
          .replace(".", ",")
      : "0,00";

  const mostrarToast = (texto: string) => {
    if (toastTimeout.current !== null) {
      window.clearTimeout(toastTimeout.current);
    }

    setToast({ visivel: true, texto });

    toastTimeout.current = window.setTimeout(() => {
      setToast({ visivel: false, texto: "" });
      toastTimeout.current = null;
    }, 3000);
  };

  const registrarAcao = (acao: Acao) => {
    proximoId.current += 1;

    const agora = new Date();

    const novoItem: HistoricoItem = {
      id: proximoId.current,
      nome: acao.nome,
      pontos: acao.pontos,
      data: agora.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistorico((anterior) => [novoItem, ...anterior]);
    setSaldoPontos((anterior) => anterior + acao.pontos);

    mostrarToast(`${acao.nome} registrada! +${acao.pontos} pts`);
  };

  const limparHistorico = () => {
    setHistorico([]);
  };

  const abrirModal = () => {
    setModalAberto(true);
    setConvertido(false);
    setPontosConverter("");
    setErroConverter("");
  };

  const fecharModal = () => {
    setModalAberto(false);
    setConvertido(false);
    setPontosConverter("");
    setErroConverter("");
  };

  const confirmarConversao = () => {
    if (pontosConverter.trim() === "") {
      setErroConverter("Digite a quantidade de pontos");
      return;
    }

    if (!Number.isInteger(quantidadePontos)) {
      setErroConverter("Digite uma quantidade válida de pontos");
      return;
    }

    if (quantidadePontos < 100) {
      setErroConverter("O mínimo para conversão é 100 pontos");
      return;
    }

    if (quantidadePontos % 100 !== 0) {
      setErroConverter("Digite uma quantidade em múltiplos de 100");
      return;
    }

    if (quantidadePontos > saldoPontos) {
      setErroConverter("Saldo insuficiente");
      return;
    }

    const valorConvertido = quantidadePontos * VALOR_POR_PONTO;

    setSaldoPontos((anterior) => anterior - quantidadePontos);
    setTotalConvertido((anterior) => anterior + valorConvertido);
    setConvertido(true);
    setErroConverter("");
  };

  return (
    <main className="min-h-screen bg-fundo font-sans text-creme">
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <span className="mb-4 text-sm uppercase tracking-widest text-verde-claro">
          Carteira Digital
        </span>

        <h1 className="mb-4 font-serif text-4xl text-creme md:text-5xl">
          Minha Carteira
        </h1>

        <p className="max-w-xl text-xl font-light text-verde-claro">
          Acompanhe seus pontos, histórico e converta em créditos de transporte.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-xl border border-borda bg-fundo-card p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-verde-claro">
                Saldo de Pontos
              </span>
              <span className="text-2xl text-verde-claro">
                <RiCoinsLine />
              </span>
            </div>

            <p className="mb-1 font-serif text-5xl text-creme">
              {saldoPontos}
            </p>

            <p className="mb-6 text-sm text-texto-muted">
              pontos acumulados
            </p>

            <div className="mb-6 flex items-center gap-2 text-sm text-texto-muted">
              <span>Equivale a</span>
              <strong className="text-creme">R$ {saldoReais}</strong>
              <span>em créditos</span>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              disabled={saldoPontos < 100}
              className="flex items-center justify-center gap-2 rounded-full bg-verde px-6 py-3 text-sm text-creme transition-colors duration-300 hover:bg-verde-claro hover:text-fundo disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span aria-hidden="true">⇄</span>
              <span>Converter Pontos</span>
            </button>
          </article>

          <article className="flex flex-col gap-6 rounded-xl border border-borda bg-fundo-card p-8">
            <div className="flex items-center gap-4">
              <span className="text-2xl text-verde-claro">
                <MdBolt />
              </span>
              <div>
                <p className="font-serif text-2xl text-creme">
                  {historico.length}
                </p>
                <p className="text-xs text-texto-muted">
                  ações registradas
                </p>
              </div>
            </div>

            <hr className="border-borda" />

            <div className="flex items-center gap-4">
              <span className="text-2xl text-verde-claro">
                <FaBus />
              </span>
              <div>
                <p className="font-serif text-2xl text-creme">
                  R$ {totalConvertido.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-xs text-texto-muted">já convertidos</p>
              </div>
            </div>

            <hr className="border-borda" />

            <div className="flex items-center gap-4">
              <span className="text-2xl text-verde-claro">
                <GoGoal />
              </span>
              <div className="flex-1">
                <p className="font-serif text-2xl text-creme">
                  {metaSemanal}/{META_SEMANAL}
                </p>
                <p className="mb-2 text-xs text-texto-muted">
                  meta semanal
                </p>

                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-fundo"
                  role="progressbar"
                  aria-label="Progresso da meta semanal"
                  aria-valuemin={0}
                  aria-valuemax={META_SEMANAL}
                  aria-valuenow={Math.min(metaSemanal, META_SEMANAL)}
                >
                  <div
                    className="h-full rounded-full bg-verde-claro transition-all duration-500"
                    style={{ width: `${metaProgresso}%` }}
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <span className="mb-4 block text-sm uppercase tracking-widest text-verde-claro">
          Nova Ação
        </span>

        <h2 className="mb-2 font-serif text-3xl text-creme">
          Registrar ação sustentável
        </h2>

        <p className="mb-8 text-sm text-texto-muted">
          Selecione a ação que você realizou hoje para acumular pontos.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {acoesDisponiveis.map((acao) => (
            <button
              key={acao.nome}
              type="button"
              onClick={() => registrarAcao(acao)}
              className="flex w-full items-center gap-4 rounded-xl border border-borda bg-fundo-card p-6 text-left transition-all duration-300 hover:border-verde-claro/50 hover:bg-verde/5"
            >
              <span className="text-3xl">{acao.icone}</span>
              <span>
                <span className="block text-sm font-medium text-creme">
                  {acao.nome}
                </span>
                <span className="mt-1 block text-xs text-verde-claro">
                  +{acao.pontos} pts
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="mb-4 block text-sm uppercase tracking-widest text-verde-claro">
              Histórico
            </span>
            <h2 className="font-serif text-3xl text-creme">
              Suas ações sustentáveis
            </h2>
          </div>

          {historico.length > 0 && (
            <button
              type="button"
              onClick={limparHistorico}
              className="flex items-center gap-2 self-start rounded-full border border-borda px-4 py-2 text-xs text-texto-muted transition-colors duration-300 hover:border-red-400 hover:text-red-400 sm:self-auto"
            >
              <span aria-hidden="true">🗑️</span>
              <span>Limpar histórico</span>
            </button>
          )}
        </div>

        {historico.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-borda bg-fundo-card p-6 text-center transition-colors duration-300 hover:border-verde-claro/50">
            <span className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-verde/10 text-2xl text-verde-claro [&>svg]:h-6 [&>svg]:w-6">
              <FaClock />
            </span>
            <p className="text-sm text-texto-muted">
              Nenhuma ação registrada ainda.
            </p>
            <p className="mt-1 text-xs text-texto-muted">
              Clique em uma ação acima para começar.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {historico.map((item) => (
              <article
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-borda bg-fundo-card p-4"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-verde/10 text-verde-claro"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-medium text-creme">
                      {item.nome}
                    </p>
                    <p className="text-xs text-texto-muted">{item.data}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-verde-claro">
                  +{item.pontos} pts
                </span>
              </article>
            ))}
          </div>
        )}
      </section>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Fechar janela de conversão"
            className="absolute inset-0 h-full w-full cursor-default bg-black/70"
            onClick={fecharModal}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-conversao"
            className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-borda bg-fundo-card p-6 sm:p-8"
          >
            <button
              type="button"
              onClick={fecharModal}
              aria-label="Fechar"
              className="absolute right-4 top-4 text-2xl text-creme transition-colors hover:text-verde-claro"
            >
              &times;
            </button>

            {convertido ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-verde text-3xl text-creme">
                  ✓
                </div>
                <h2
                  id="titulo-conversao"
                  className="mb-2 font-serif text-2xl text-creme"
                >
                  Convertido!
                </h2>
                <p className="mb-6 text-sm text-texto-muted">
                  Seus créditos foram adicionados à sua carteira.
                </p>
                <button
                  type="button"
                  onClick={fecharModal}
                  className="rounded-full bg-verde px-6 py-3 text-sm text-creme transition-colors duration-300 hover:bg-verde-claro hover:text-fundo"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-verde/10 text-2xl text-verde-claro">
                    ⇄
                  </div>
                  <h2
                    id="titulo-conversao"
                    className="mb-2 font-serif text-2xl text-creme"
                  >
                    Converter Pontos
                  </h2>
                  <p className="text-sm text-texto-muted">
                    Escolha quantos pontos deseja converter em créditos de
                    transporte.
                  </p>
                </div>

                <div className="mb-6 flex items-center justify-center gap-3 rounded-lg bg-fundo px-4 py-3">
                  <span className="text-sm text-creme">150 pts</span>
                  <span className="text-verde-claro">→</span>
                  <span className="text-sm text-creme">R$ 5,30</span>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="pontos-converter"
                    className="mb-2 block text-xs uppercase tracking-widest text-verde-claro"
                  >
                    Pontos a converter
                  </label>
                  <input
                    id="pontos-converter"
                    type="number"
                    min={100}
                    max={saldoPontos}
                    step={100}
                    value={pontosConverter}
                    onChange={(evento) => {
                      setPontosConverter(evento.target.value);
                      setErroConverter("");
                    }}
                    placeholder="Ex: 500"
                    className="w-full rounded-lg border border-borda bg-fundo px-4 py-3 text-creme transition-colors placeholder:text-texto-muted/50 focus:border-verde-claro focus:outline-none"
                  />
                  {erroConverter && (
                    <p role="alert" className="mt-1 block text-xs text-red-400">
                      {erroConverter}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex items-center justify-between rounded-lg bg-fundo px-4 py-3">
                  <span className="text-sm text-texto-muted">
                    Você receberá:
                  </span>
                  <strong className="text-creme">R$ {valorReceber}</strong>
                </div>

                <div className="mb-6 text-center text-sm text-texto-muted">
                  Saldo disponível:{" "}
                  <strong className="text-creme">{saldoPontos} pts</strong>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <button
                    type="button"
                    onClick={fecharModal}
                    className="rounded-full border border-borda px-6 py-3 text-sm text-texto-muted transition-colors duration-300 hover:border-verde-claro hover:text-verde-claro"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={confirmarConversao}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-verde px-6 py-3 text-sm text-creme transition-colors duration-300 hover:bg-verde-claro hover:text-fundo"
                  >
                    <span aria-hidden="true">✓</span>
                    <span>Confirmar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {toast.visivel && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl border border-verde-claro bg-fundo-card px-6 py-4 shadow-lg sm:bottom-8 sm:right-8"
        >
          <span className="text-xl text-verde-claro" aria-hidden="true">
            ✓
          </span>
          <span className="text-sm text-creme">{toast.texto}</span>
        </div>
      )}

      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <span className="mb-4 text-sm uppercase tracking-widest text-verde-claro">
          ROTTA Card
        </span>
        <h2 className="mb-4 font-serif text-4xl text-creme md:text-5xl">
          Cartão
        </h2>
        <p className="mb-10 max-w-xl text-xl font-light text-verde-claro">
          Apresentamos o nosso cartão ROTTA Card, onde você irá usar os seus
          pontos para economizar no seu transporte público.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <span className="inline-block rounded-full border border-verde/30 px-3 py-1 text-xs text-verde-claro transition-colors hover:border-verde-claro/50">
            Sustentável
          </span>
          <span className="inline-block rounded-full border border-verde/30 px-3 py-1 text-xs text-verde-claro transition-colors hover:border-verde-claro/50">
            Transporte Público
          </span>
          <span className="inline-block rounded-full border border-verde/30 px-3 py-1 text-xs text-verde-claro transition-colors hover:border-verde-claro/50">
            Pontos
          </span>
        </div>

        <div className="group relative mb-10">
          <div className="absolute inset-0 rounded-full bg-verde-claro/20 blur-2xl transition-colors group-hover:bg-verde-claro/30" />
          <img
            src="/images/img04-rotta-card.png"
            alt="Cartão ROTTA Card"
            className="relative w-full max-w-md p-5 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mb-10 max-w-2xl space-y-4">
          <p className="text-lg leading-relaxed text-creme/80">
            Criamos esse cartão com a ideia de ajudar o trabalhador da Grande
            São Paulo que usa o próprio dinheiro para pagar seu transporte de
            casa para o trabalho e do trabalho para casa.
          </p>
          <p className="text-lg leading-relaxed text-creme/80">
            Achamos injusto a pessoa trabalhar e tirar do próprio bolso para
            pagar uma coisa que a empresa deveria pagar. Por isso,
            implementamos essa ideia.
          </p>
          <p className="text-lg font-medium leading-relaxed text-verde-claro">
            Além de ajudar o trabalhador, ajudamos o mundo.
            <BiWorld className="ml-1 inline" />
          </p>
        </div>

        <div className="mb-10 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-borda bg-fundo-card p-6 transition-colors hover:border-verde-claro/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-verde/10 text-verde-claro">
              <RiCoinsLine />
            </div>
            <h3 className="text-base font-medium text-creme">
              Economize Dinheiro
            </h3>
            <p className="text-center text-sm leading-relaxed text-creme/50">
              Use seus pontos acumulados para reduzir o custo do transporte.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border border-borda bg-fundo-card p-6 transition-colors hover:border-verde-claro/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-verde/10 text-verde-claro">
              <MdMan />
            </div>
            <h3 className="text-base font-medium text-creme">
              Para Trabalhadores
            </h3>
            <p className="text-center text-sm leading-relaxed text-creme/50">
              Feito para quem depende do transporte público todos os dias.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border border-borda bg-fundo-card p-6 transition-colors hover:border-verde-claro/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-verde/10 text-verde-claro">
              <BiWorld />
            </div>
            <h3 className="text-base font-medium text-creme">
              Ajuda o Planeta
            </h3>
            <p className="text-center text-sm leading-relaxed text-creme/50">
              Cada ação sustentável contribui para um mundo melhor.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
