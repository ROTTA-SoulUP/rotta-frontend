
import { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import {
  FaBrain,
  FaCamera,
  FaVideo,
  FaStop,
  FaMobileScreen,
  FaXmark,
  FaQrcode,
  FaCreditCard,
  FaCircleCheck,
  FaClock,
  FaArrowLeft,
  FaStore,
  FaRegTrashCan,
} from "react-icons/fa6";
import { BiSolidShoppingBags } from "react-icons/bi";
import { PiPlant } from "react-icons/pi";

type ItemSalvo = {
  id: string;
  tipo: "foto" | "video";
  dados: string;
  desafio: string;
  timestamp: number;
};

type Desafio = {
  id: number;
  titulo: string;
  descricao: string;
  formato: "foto" | "video";
  icone: ReactNode;
  pontos: number;
};

type Etapa =
  | "desafios"
  | "camera"
  | "escolha"
  | "validando"
  | "opcoes"
  | "qrcode"
  | "cartao"
  | "armazenado"
  | "galeria";

const DURACAO_ARMAZENAMENTO = 24 * 60 * 60 * 1000;

const desafios: Desafio[] = [
  {
    id: 1,
    titulo: "Jogue o lixo no lixo",
    descricao: "Mostre você descartando o lixo corretamente na lixeira",
    formato: "video",
    icone: <FaRegTrashCan className="text-2xl text-verde-claro" />,
    pontos: 50,
  },
  {
    id: 2,
    titulo: "Use uma ecobag",
    descricao: "Mostre você usando uma sacola ecológica nas compras",
    formato: "foto",
    icone: <BiSolidShoppingBags className="text-2xl text-verde-claro" />,
    pontos: 30,
  },
];

const exemplosFixos = [
  {
    id: "exemplo-foto",
    tipo: "foto" as const,
    dados: "/images/img10-ecobag.png",
    desafio: "Use uma ecobag",
    timestamp: 0,
  },
  {
    id: "exemplo-video",
    tipo: "video" as const,
    dados: "/videos/vid01-capi.mp4",
    desafio: "Jogue o lixo no lixo",
    timestamp: 0,
  },
];

const padraoQrCode = [
  1, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 1, 1, 0,
  1, 1, 0, 1, 0, 0, 1, 1,
  1, 0, 1, 1, 1, 0, 0, 1,
  0, 1, 0, 1, 1, 1, 0, 0,
  1, 1, 1, 0, 0, 1, 1, 0,
  1, 0, 0, 1, 1, 0, 1, 1,
  0, 1, 1, 0, 1, 1, 0, 1,
];

function detectarMobile() {
  if (typeof navigator === "undefined") return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function carregarItensSalvos(): ItemSalvo[] {
  try {
    const salvo = localStorage.getItem("itens-validados");

    if (!salvo) return [];

    const itens: unknown = JSON.parse(salvo);

    if (!Array.isArray(itens)) {
      localStorage.removeItem("itens-validados");
      return [];
    }

    const agora = Date.now();

    const validos = itens.filter((item): item is ItemSalvo => {
      if (
        typeof item !== "object" ||
        item === null ||
        typeof item.id !== "string" ||
        (item.tipo !== "foto" && item.tipo !== "video") ||
        typeof item.dados !== "string" ||
        typeof item.desafio !== "string" ||
        typeof item.timestamp !== "number"
      ) {
        return false;
      }

      const idade = agora - item.timestamp;

      return idade >= 0 && idade < DURACAO_ARMAZENAMENTO;
    });

    if (validos.length !== itens.length) {
      localStorage.setItem("itens-validados", JSON.stringify(validos));
    }

    return validos;
  } catch {
    localStorage.removeItem("itens-validados");
    return [];
  }
}

export default function ValidacaoFoto() {
  const [etapa, setEtapa] = useState<Etapa>("desafios");
  const [desafioSelecionado, setDesafioSelecionado] =
    useState<Desafio | null>(null);
  const [itemCapturado, setItemCapturado] = useState<string | null>(null);
  const [itensSalvos, setItensSalvos] =
    useState<ItemSalvo[]>(carregarItensSalvos);
  const [gravando, setGravando] = useState(false);
  const [ehMobile] = useState(detectarMobile);
  const [erroCamera, setErroCamera] = useState("");
  const [agora, setAgora] = useState(() => Date.now());

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const cameraSolicitadaRef = useRef(false);

  const pararCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    cameraSolicitadaRef.current = false;
  }, []);

  const iniciarCamera = useCallback(async () => {
    if (
      cameraSolicitadaRef.current ||
      streamRef.current
    ) {
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setErroCamera("Seu navegador não oferece suporte à câmera.");
      return;
    }

    cameraSolicitadaRef.current = true;
    setErroCamera("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      if (etapa !== "camera") {
        stream.getTracks().forEach((track) => track.stop());
        cameraSolicitadaRef.current = false;
        return;
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setErroCamera(
        "Não foi possível acessar a câmera. Verifique as permissões.",
      );
      cameraSolicitadaRef.current = false;
    }
  }, [etapa]);

  // A inicialização é agendada para evitar atualizações síncronas
  // de estado durante a execução do efeito.
  useEffect(() => {
    if (etapa !== "camera" || !ehMobile || !desafioSelecionado) {
      return;
    }

    const temporizador = window.setTimeout(() => {
      void iniciarCamera();
    }, 0);

    return () => {
      window.clearTimeout(temporizador);
      pararCamera();
    };
  }, [
    etapa,
    ehMobile,
    desafioSelecionado,
    iniciarCamera,
    pararCamera,
  ]);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setAgora(Date.now());
    }, 60_000);

    return () => window.clearInterval(intervalo);
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const tirarFoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");

    if (ctx && canvas.width > 0 && canvas.height > 0) {
      ctx.drawImage(videoRef.current, 0, 0);
      setItemCapturado(canvas.toDataURL("image/jpeg", 0.8));
      pararCamera();
    }
  };

  const iniciarGravacao = () => {
    if (!streamRef.current || !("MediaRecorder" in window)) {
      setErroCamera("Seu navegador não oferece suporte à gravação de vídeo.");
      return;
    }

    chunksRef.current = [];

    try {
      const recorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === "string") {
            setItemCapturado(reader.result);
          }
        };

        reader.onerror = () => {
          setErroCamera("Não foi possível processar o vídeo gravado.");
        };

        reader.readAsDataURL(blob);
      };

      recorder.start();
      setGravando(true);
      setErroCamera("");
    } catch {
      setErroCamera("Não foi possível iniciar a gravação.");
    }
  };

  const pararGravacao = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setGravando(false);
      pararCamera();
    }
  };

  const salvarInterno = () => {
    if (!itemCapturado || !desafioSelecionado) return;

    const timestamp = Date.now();

    const novo: ItemSalvo = {
      id: `${timestamp}-${Math.random().toString(36).slice(2, 9)}`,
      tipo: desafioSelecionado.formato,
      dados: itemCapturado,
      desafio: desafioSelecionado.titulo,
      timestamp,
    };

    const novos = [...itensSalvos, novo];

    try {
      localStorage.setItem("itens-validados", JSON.stringify(novos));
      setItensSalvos(novos);
      setEtapa("armazenado");
    } catch {
      setErroCamera(
        "Não foi possível salvar o item. O armazenamento do navegador pode estar cheio.",
      );
    }
  };

  const limparTudo = () => {
    setItensSalvos([]);
    localStorage.removeItem("itens-validados");
  };

  const removerItem = (id: string) => {
    const novos = itensSalvos.filter((item) => item.id !== id);

    setItensSalvos(novos);

    try {
      localStorage.setItem("itens-validados", JSON.stringify(novos));
    } catch {
      setErroCamera("Não foi possível atualizar os itens salvos.");
    }
  };

  const validarIA = () => {
    setEtapa("validando");

    window.setTimeout(() => {
      setEtapa((etapaAtual) =>
        etapaAtual === "validando" ? "opcoes" : etapaAtual,
      );
    }, 2500);
  };

  const voltarInicio = () => {
    pararCamera();
    setGravando(false);
    setEtapa("desafios");
    setDesafioSelecionado(null);
    setItemCapturado(null);
    setErroCamera("");
  };

  const tempoRestante = (timestamp: number) => {
    const restante = Math.max(
      0,
      DURACAO_ARMAZENAMENTO - (agora - timestamp),
    );

    const horas = Math.floor(restante / (60 * 60 * 1000));
    const minutos = Math.floor(
      (restante % (60 * 60 * 1000)) / (60 * 1000),
    );

    return `${horas}h ${minutos}min`;
  };

  const selecionarDesafio = (desafio: Desafio) => {
    setDesafioSelecionado(desafio);
    setItemCapturado(null);
    setErroCamera("");
    setEtapa("camera");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-fundo-card border border-borda rounded-2xl p-6 md:p-8">
      {etapa !== "galeria" && (
        <button
          type="button"
          onClick={() => setEtapa("galeria")}
          className="text-verde-claro text-sm hover:underline mb-4 block mx-auto"
        >
          Itens salvos ({itensSalvos.length})
        </button>
      )}

      {etapa === "desafios" && (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-creme text-xl font-bold text-center">
            Escolha um Desafio
          </h3>

          <p className="text-creme/60 text-sm text-center">
            Complete o desafio e ganhe pontos!
          </p>

          <div className="w-full flex flex-col gap-3">
            {desafios.map((desafio) => (
              <button
                key={desafio.id}
                type="button"
                onClick={() => selecionarDesafio(desafio)}
                className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
              >
                <div className="w-14 h-14 rounded-lg bg-verde/10 flex items-center justify-center shrink-0 text-2xl">
                  {desafio.icone}
                </div>

                <div className="flex-1">
                  <p className="text-creme font-medium">{desafio.titulo}</p>
                  <p className="text-creme/50 text-sm">
                    {desafio.descricao}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-verde/10 text-verde-claro text-xs font-medium rounded-full px-2 py-0.5">
                      {desafio.formato === "foto" ? (
                        <>
                          <FaCamera className="inline mr-1 text-xs" /> Foto
                        </>
                      ) : (
                        <>
                          <FaVideo className="inline mr-1 text-xs" /> Vídeo
                        </>
                      )}
                    </span>

                    <span className="bg-verde/10 text-verde-claro text-xs font-medium rounded-full px-2 py-0.5">
                      +{desafio.pontos} pontos
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {etapa === "camera" && ehMobile && desafioSelecionado && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full bg-verde/5 border border-verde/20 rounded-lg p-3 flex items-center gap-3">
            <span className="text-2xl">{desafioSelecionado.icone}</span>

            <div>
              <p className="text-creme text-sm font-medium">
                {desafioSelecionado.titulo}
              </p>
              <p className="text-verde-claro text-xs">
                {desafioSelecionado.formato === "foto"
                  ? "Formato: Foto"
                  : "Formato: Vídeo"}
              </p>
            </div>
          </div>

          {erroCamera && (
            <p role="alert" className="text-red-400 text-sm text-center">
              {erroCamera}
            </p>
          )}

          {!itemCapturado && (
            <div className="w-full relative rounded-xl overflow-hidden border border-borda aspect-video bg-fundo">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {itemCapturado && (
            <div className="w-full flex flex-col items-center gap-3">
              {desafioSelecionado.formato === "foto" ? (
                <img
                  src={itemCapturado}
                  alt="Foto capturada"
                  className="w-full max-w-xs rounded-xl border border-verde-claro/50"
                />
              ) : (
                <video
                  src={itemCapturado}
                  controls
                  className="w-full max-w-xs rounded-xl border border-verde-claro/50"
                />
              )}

              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setItemCapturado(null);
                    void iniciarCamera();
                  }}
                  className="flex-1 border border-borda text-creme rounded-lg py-3 hover:border-verde-claro transition-colors"
                >
                  Refazer
                </button>

                <button
                  type="button"
                  onClick={() => setEtapa("escolha")}
                  className="flex-1 bg-verde text-fundo font-semibold rounded-lg py-3 hover:bg-verde-claro transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {!itemCapturado && !erroCamera && (
            <div className="flex gap-3 w-full">
              {desafioSelecionado.formato === "foto" && (
                <button
                  type="button"
                  onClick={tirarFoto}
                  className="flex-1 bg-verde text-fundo font-semibold rounded-lg py-3 hover:bg-verde-claro transition-colors flex items-center justify-center gap-2"
                >
                  <FaCamera /> Tirar Foto
                </button>
              )}

              {desafioSelecionado.formato === "video" &&
                (!gravando ? (
                  <button
                    type="button"
                    onClick={iniciarGravacao}
                    className="flex-1 bg-verde text-fundo font-semibold rounded-lg py-3 hover:bg-verde-claro transition-colors flex items-center justify-center gap-2"
                  >
                    <FaVideo /> Gravar Vídeo
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pararGravacao}
                    className="flex-1 bg-red-500 text-white font-semibold rounded-lg py-3 animate-pulse flex items-center justify-center gap-2"
                  >
                    <FaStop /> Parar Gravação
                  </button>
                ))}
            </div>
          )}

          <button
            type="button"
            onClick={voltarInicio}
            className="text-creme/50 text-sm hover:text-verde-claro flex items-center gap-1"
          >
            <FaArrowLeft className="text-xs" /> Voltar aos desafios
          </button>
        </div>
      )}

      {etapa === "camera" && !ehMobile && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5 py-8">
          <div className="w-16 h-16 rounded-full bg-verde/10 flex items-center justify-center">
            <FaMobileScreen className="text-2xl text-verde-claro" />
          </div>

          <h3 className="text-creme text-lg font-bold text-center">
            Disponível apenas no celular
          </h3>

          <p className="text-creme/60 text-sm text-center max-w-xs">
            A captura de fotos e vídeos só pode ser feita pelo celular. Mas
            você pode usar nossos exemplos para testar:
          </p>

          <div className="w-full mt-2">
            <p className="text-verde-claro text-xs font-medium mb-3 text-center flex items-center justify-center gap-1">
              <FaCircleCheck className="text-[10px]" /> Exemplos disponíveis:
            </p>

            <div className="flex flex-col gap-3">
              {exemplosFixos
                .filter(
                  (exemplo) => exemplo.tipo === desafioSelecionado.formato,
                )
                .map((exemplo) => (
                  <button
                    key={exemplo.id}
                    type="button"
                    onClick={() => {
                      setItemCapturado(exemplo.dados);
                      setEtapa("escolha");
                    }}
                    className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
                  >
                    {exemplo.tipo === "foto" ? (
                      <img
                        src={exemplo.dados}
                        alt="Exemplo"
                        className="w-16 h-16 object-cover rounded-lg border border-verde-claro/30 shrink-0"
                      />
                    ) : (
                      <video
                        src={exemplo.dados}
                        className="w-16 h-16 object-cover rounded-lg border border-verde-claro/30 shrink-0"
                        muted
                      />
                    )}

                    <div className="flex-1">
                      <p className="text-creme font-medium">
                        Exemplo de {exemplo.tipo === "foto" ? "foto" : "vídeo"}
                      </p>
                      <p className="text-creme/50 text-sm">
                        {exemplo.desafio}
                      </p>
                    </div>

                    <span className="bg-verde/10 text-verde-claro text-xs font-medium rounded-full px-3 py-1">
                      Usar
                    </span>
                  </button>
                ))}
            </div>
          </div>

          {itensSalvos.length > 0 && (
            <div className="w-full mt-4">
              <p className="text-creme/50 text-xs text-center mb-3">
                Itens salvos pelo celular:
              </p>

              <div className="grid grid-cols-3 gap-2">
                {itensSalvos.map((item) => (
                  <div key={item.id} className="relative">
                    {item.tipo === "foto" ? (
                      <img
                        src={item.dados}
                        alt="Foto"
                        className="w-full h-20 object-cover rounded-lg border border-verde-claro/30"
                      />
                    ) : (
                      <video
                        src={item.dados}
                        className="w-full h-20 object-cover rounded-lg border border-verde-claro/30"
                        muted
                      />
                    )}

                    <span className="absolute bottom-1 right-1 bg-fundo/80 text-creme/60 text-xs px-1 py-0.5 rounded flex items-center gap-1">
                      <FaClock className="text-[10px]" />
                      {tempoRestante(item.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={voltarInicio}
            className="text-creme/50 text-sm hover:text-verde-claro flex items-center gap-1"
          >
            <FaArrowLeft className="text-xs" /> Voltar aos desafios
          </button>
        </div>
      )}

      {etapa === "escolha" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-creme text-lg font-bold text-center">
            O que você quer fazer?
          </h3>

          {itemCapturado &&
            (desafioSelecionado.formato === "foto" ? (
              <img
                src={itemCapturado}
                alt="Capturada"
                className="w-32 h-32 object-cover rounded-xl border border-verde-claro"
              />
            ) : (
              <video
                src={itemCapturado}
                className="w-32 h-32 object-cover rounded-xl border border-verde-claro"
                controls
              />
            ))}

          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={salvarInterno}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-verde/10 flex items-center justify-center shrink-0">
                <FaStore className="text-2xl text-verde-claro" />
              </div>

              <div>
                <p className="text-creme font-medium">Armazenar Interno</p>
                <p className="text-creme/50 text-sm">
                  Salvar no site por 24hrs
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={validarIA}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-verde/10 flex items-center justify-center shrink-0">
                <FaBrain className="text-2xl text-verde-claro" />
              </div>

              <div>
                <p className="text-creme font-medium">Enviar para IA</p>
                <p className="text-creme/50 text-sm">
                  Validar e ganhar pontos
                </p>
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setEtapa("camera");
              setItemCapturado(null);
            }}
            className="text-creme/50 text-sm hover:text-verde-claro flex items-center gap-1"
          >
            <FaArrowLeft className="text-xs" /> Refazer captura
          </button>
        </div>
      )}

      {etapa === "validando" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5 py-8">
          {itemCapturado && (
            <div className="relative">
              {desafioSelecionado.formato === "foto" ? (
                <img
                  src={itemCapturado}
                  alt="Validando"
                  className="w-32 h-32 object-cover rounded-xl border border-verde-claro/50 opacity-60"
                />
              ) : (
                <video
                  src={itemCapturado}
                  className="w-32 h-32 object-cover rounded-xl border border-verde-claro/50 opacity-60"
                />
              )}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-verde-claro border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          )}

          <p className="text-creme text-sm flex items-center gap-2">
            <FaBrain className="text-verde-claro" /> IA validando sua{" "}
            {desafioSelecionado.formato === "foto" ? "foto" : "vídeo"}...
          </p>
        </div>
      )}

      {etapa === "opcoes" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-2 bg-verde/10 border border-verde/30 rounded-full px-4 py-2">
            <FaCircleCheck className="text-verde-claro" />
            <span className="text-verde-claro text-sm font-medium">
              Validado! +{desafioSelecionado.pontos} pontos
            </span>
          </div>

          {itemCapturado &&
            (desafioSelecionado.formato === "foto" ? (
              <img
                src={itemCapturado}
                alt="Validado"
                className="w-24 h-24 object-cover rounded-xl border border-verde-claro"
              />
            ) : (
              <video
                src={itemCapturado}
                className="w-24 h-24 object-cover rounded-xl border border-verde-claro"
                controls
              />
            ))}

          <h3 className="text-creme text-lg font-bold text-center">
            Escolha como usar os pontos
          </h3>

          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setEtapa("qrcode")}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-verde/10 flex items-center justify-center shrink-0">
                <FaQrcode className="text-2xl text-verde-claro" />
              </div>

              <div>
                <p className="text-creme font-medium">QR Code</p>
                <p className="text-creme/50 text-sm">
                  Gere um QR Code para usar na hora
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setEtapa("cartao")}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-verde/10 flex items-center justify-center shrink-0">
                <FaCreditCard className="text-2xl text-verde-claro" />
              </div>

              <div>
                <p className="text-creme font-medium">Enviar pro Cartão</p>
                <p className="text-creme/50 text-sm">
                  Pontos vão direto pro ROTTA Card
                </p>
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={voltarInicio}
            className="text-creme/50 text-sm hover:text-verde-claro"
          >
            Voltar aos desafios
          </button>
        </div>
      )}

      {etapa === "qrcode" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-creme text-lg font-bold">Seu QR Code</h3>

          <div className="w-48 h-48 bg-creme rounded-xl p-4 flex items-center justify-center">
            <div className="grid grid-cols-8 gap-1 w-full h-full">
              {padraoQrCode.map((pixel, indice) => (
                <div
                  key={indice}
                  className={`rounded-sm ${pixel ? "bg-fundo" : "bg-transparent"}`}
                />
              ))}
            </div>
          </div>

          <p className="text-creme/60 text-sm text-center">
            Apresente este QR Code no local de coleta
          </p>

          <p className="text-verde-claro text-sm font-medium">
            +{desafioSelecionado.pontos} pontos
          </p>

          <button
            type="button"
            onClick={voltarInicio}
            className="text-verde-claro text-sm hover:underline"
          >
            Voltar aos desafios
          </button>
        </div>
      )}

      {etapa === "cartao" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-creme text-lg font-bold">Pontos Enviados!</h3>

          <div className="w-full max-w-xs bg-linear-to-br from-verde to-verde-claro rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-8">
              <div className="w-10 h-8 bg-fundo/20 rounded" />
              <span className="text-fundo text-xl">
                <PiPlant />
              </span>
            </div>

            <p className="text-fundo text-lg font-mono tracking-widest mb-4">
              •••• •••• •••• 2026
            </p>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-fundo/60 text-xs uppercase">Titular</p>
                <p className="text-fundo text-sm font-medium">Rotta User</p>
              </div>

              <div>
                <p className="text-fundo/60 text-xs uppercase">Pontos</p>
                <p className="text-fundo text-sm font-medium">
                  {desafioSelecionado.pontos}
                </p>
              </div>
            </div>
          </div>

          <p className="text-creme/60 text-sm text-center">
            Pontos adicionados ao seu ROTTA Card
          </p>

          <button
            type="button"
            onClick={voltarInicio}
            className="text-verde-claro text-sm hover:underline"
          >
            Voltar aos desafios
          </button>
        </div>
      )}

      {etapa === "armazenado" && (
        <div className="flex flex-col items-center gap-5 py-8">
          <div className="w-16 h-16 rounded-full bg-verde/10 flex items-center justify-center">
            <FaStore className="text-3xl text-verde-claro" />
          </div>

          <h3 className="text-creme text-lg font-bold text-center">
            Salvo no Armazenamento Interno!
          </h3>

          <p className="text-creme/60 text-sm text-center max-w-xs">
            Seu {desafioSelecionado?.formato === "foto" ? "foto" : "vídeo"} foi
            salvo e ficará disponível por{" "}
            <span className="text-verde-claro font-medium">24 horas</span>. Após
            esse tempo, será apagado automaticamente.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setEtapa("galeria")}
              className="text-verde-claro text-sm hover:underline"
            >
              Ver itens salvos
            </button>

            <button
              type="button"
              onClick={voltarInicio}
              className="text-creme/50 text-sm hover:text-verde-claro"
            >
              Voltar aos desafios
            </button>
          </div>
        </div>
      )}

      {etapa === "galeria" && (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-creme text-lg font-bold">Itens Salvos</h3>

          <p className="text-creme/40 text-xs text-center flex items-center gap-1">
            <FaClock className="text-[10px]" /> Itens expiram automaticamente
            após 24hrs
          </p>

          <div className="w-full">
            <p className="text-verde-claro text-xs font-medium mb-2 flex items-center gap-1">
              <FaCircleCheck className="text-[10px]" /> Exemplos
            </p>

            <div className="grid grid-cols-2 gap-3">
              {exemplosFixos.map((item) => (
                <div key={item.id} className="relative group">
                  {item.tipo === "foto" ? (
                    <img
                      src={item.dados}
                      alt="Exemplo de foto"
                      className="w-full h-28 object-cover rounded-lg border border-verde-claro/30"
                    />
                  ) : (
                    <video
                      src={item.dados}
                      className="w-full h-28 object-cover rounded-lg border border-verde-claro/30"
                      controls
                    />
                  )}

                  <span className="absolute top-1 left-1 bg-fundo/80 text-creme/60 text-xs px-1.5 py-0.5 rounded">
                    {item.desafio}
                  </span>

                  <span className="absolute bottom-1 right-1 bg-verde/80 text-fundo text-xs px-1.5 py-0.5 rounded font-medium">
                    Exemplo
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mt-2">
            <p className="text-creme/50 text-xs mb-2">Seus itens:</p>

            {itensSalvos.length === 0 ? (
              <p className="text-creme/50 text-sm text-center py-4">
                Nenhum item salvo ainda.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {itensSalvos.map((item) => (
                  <div key={item.id} className="relative group">
                    {item.tipo === "foto" ? (
                      <img
                        src={item.dados}
                        alt="Foto"
                        className="w-full h-28 object-cover rounded-lg border border-verde-claro/30"
                      />
                    ) : (
                      <video
                        src={item.dados}
                        className="w-full h-28 object-cover rounded-lg border border-verde-claro/30"
                        controls
                      />
                    )}

                    <span className="absolute top-1 left-1 bg-fundo/80 text-creme/60 text-xs px-1.5 py-0.5 rounded">
                      {item.desafio}
                    </span>

                    <span className="absolute bottom-1 right-1 bg-fundo/80 text-creme/60 text-xs px-1 py-0.5 rounded flex items-center gap-1">
                      <FaClock className="text-[10px]" />
                      {tempoRestante(item.timestamp)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removerItem(item.id)}
                      className="absolute top-1 right-1 bg-fundo/80 text-red-400 w-6 h-6 rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      aria-label="Remover item"
                    >
                      <FaXmark className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={voltarInicio}
              className="text-verde-claro text-sm hover:underline"
            >
              Voltar aos desafios
            </button>

            {itensSalvos.length > 0 && (
              <button
                type="button"
                onClick={limparTudo}
                className="text-red-400 text-sm hover:underline"
              >
                Limpar tudo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
