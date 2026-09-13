import { useState, useEffect, useRef } from "react";
import { FaBrain, FaCamera, FaVideo, FaStop, FaMobileScreen, FaXmark, FaQrcode, FaCreditCard, FaCircleCheck, FaClock, FaArrowLeft, FaStore, FaRegTrashCan} from "react-icons/fa6";
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
  icone: React.ReactNode; 
  pontos: number;
};

const desafios: Desafio[] = [
  {
    id: 1,
    titulo: "Jogue o lixo no lixo",
    descricao: "Mostre você descartando o lixo corretamente na lixeira",
    formato: "video",
    icone: <FaRegTrashCan className="text-2xl text-verde-claro"/>,
    pontos: 50,
  },
  {
    id: 2,
    titulo: "Use uma ecobag",
    descricao: "Mostre você usando uma sacola ecológica nas compras",
    formato: "foto",
    icone: <BiSolidShoppingBags className="text-2xl text-verde-claro"/>,
    pontos: 30
  },
];

const exemplosFixos = [
  {
    id: "exemplo-foto",
    tipo: "foto" as const,
    dados: "../../images/img10-ecobag.png",
    desafio: "Use uma ecobag",
    timestamp: 0, 
  },
  {
    id: "exemplo-video",
    tipo: "video" as const,
    dados: "../../videos/vid01-capi.mp4",
    desafio: "Jogue o lixo no lixo",
    timestamp: 0, 
  },
];

export default function ValidacaoFoto() {
  const [etapa, setEtapa] = useState<"desafios" | "camera" | "escolha" | "validando" | "opcoes" | "qrcode" | "cartao" | "armazenado" | "galeria">("desafios");
  const [desafioSelecionado, setDesafioSelecionado] = useState<Desafio | null>(null);
  const [itemCapturado, setItemCapturado] = useState<string | null>(null);
  const [itensSalvos, setItensSalvos] = useState<ItemSalvo[]>([]);
  const [gravando, setGravando] = useState(false);
  const [ehMobile, setEhMobile] = useState(false);
  const [erroCamera, setErroCamera] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Detecta mobile
  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setEhMobile(mobile);
  }, []);

  // Carrega itens e remove expirados (24hrs)
  useEffect(() => {
    const agora = Date.now();
    const limite = 24 * 60 * 60 * 1000;
    const salvo = localStorage.getItem("itens-validados");
    if (salvo) {
      const itens: ItemSalvo[] = JSON.parse(salvo);
      const validos = itens.filter((i) => agora - i.timestamp < limite);
      if (validos.length !== itens.length) {
        localStorage.setItem("itens-validados", JSON.stringify(validos));
      }
      setItensSalvos(validos);
    }
  }, []);

  // Inicia/para câmera
  useEffect(() => {
    if (etapa === "camera" && ehMobile && desafioSelecionado) iniciarCamera();
    return () => pararCamera();
  }, [etapa, ehMobile]);

  const iniciarCamera = async () => {
    setErroCamera("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setErroCamera("Não foi possível acessar a câmera. Verifique as permissões.");
    }
  };

  const pararCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const tirarFoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      setItemCapturado(canvas.toDataURL("image/jpeg", 0.8));
      pararCamera();
    }
  };

  const iniciarGravacao = () => {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const reader = new FileReader();
      reader.onload = () => setItemCapturado(reader.result as string);
      reader.readAsDataURL(blob);
    };
    recorder.start();
    setGravando(true);
  };

  const pararGravacao = () => {
    if (mediaRecorderRef.current && gravando) {
      mediaRecorderRef.current.stop();
      setGravando(false);
      pararCamera();
    }
  };

  const salvarInterno = () => {
    if (!itemCapturado || !desafioSelecionado) return;
    const novo: ItemSalvo = {
      id: Date.now().toString(),
      tipo: desafioSelecionado.formato,
      dados: itemCapturado,
      desafio: desafioSelecionado.titulo,
      timestamp: Date.now(),
    };
    const novos = [...itensSalvos, novo];
    setItensSalvos(novos);
    localStorage.setItem("itens-validados", JSON.stringify(novos));
    setEtapa("armazenado");
  };

  const limparTudo = () => {
    setItensSalvos([]);
    localStorage.removeItem("itens-validados");
  };

  const removerItem = (id: string) => {
    const novos = itensSalvos.filter((i) => i.id !== id);
    setItensSalvos(novos);
    localStorage.setItem("itens-validados", JSON.stringify(novos));
  };

  const validarIA = () => {
    setEtapa("validando");
    setTimeout(() => setEtapa("opcoes"), 2500);
  };

  const voltarInicio = () => {
    setEtapa("desafios");
    setDesafioSelecionado(null);
    setItemCapturado(null);
  };

  const tempoRestante = (timestamp: number) => {
    const limite = 24 * 60 * 60 * 1000;
    const restante = limite - (Date.now() - timestamp);
    const h = Math.floor(restante / (60 * 60 * 1000));
    const m = Math.floor((restante % (60 * 60 * 1000)) / (60 * 1000));
    return `${h}h ${m}min`;
  };

  const selecionarDesafio = (d: Desafio) => {
    setDesafioSelecionado(d);
    setItemCapturado(null);
    setEtapa("camera");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-fundo-card border border-borda rounded-2xl p-6 md:p-8">

      {/* Botão da galeria */}
      {etapa !== "galeria" && (
        <button onClick={() => setEtapa("galeria")} className="text-verde-claro text-sm hover:underline mb-4 block mx-auto">
          Itens salvos ({itensSalvos.length})
        </button>
      )}

      {/* ===== ETAPA: DESAFIOS ===== */}
      {etapa === "desafios" && (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-creme text-xl font-bold text-center">Escolha um Desafio</h3>
          <p className="text-creme/60 text-sm text-center">Complete o desafio e ganhe pontos!</p>

          <div className="w-full flex flex-col gap-3">
            {desafios.map((d) => (
              <button
                key={d.id}
                onClick={() => selecionarDesafio(d)}
                className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
              >
                <div className="w-14 h-14 rounded-lg bg-verde/10 flex items-center justify-center shrink-0 text-2xl">
                  {d.icone}
                </div>
                <div className="flex-1">
                  <p className="text-creme font-medium">{d.titulo}</p>
                  <p className="text-creme/50 text-sm">{d.descricao}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-verde/10 text-verde-claro text-xs font-medium rounded-full px-2 py-0.5">
                      {d.formato === "foto" ? (<><FaCamera className="inline mr-1 text-xs" /> Foto</>) : (<><FaVideo className="inline mr-1 text-xs" /> Vídeo</>)}
                    </span>
                    <span className="bg-verde/10 text-verde-claro text-xs font-medium rounded-full px-2 py-0.5">
                      +{d.pontos} pontos
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== ETAPA: CÂMERA (MOBILE) ===== */}
      {etapa === "camera" && ehMobile && desafioSelecionado && (
        <div className="flex flex-col items-center gap-4">
          {/* Info do desafio */}
          <div className="w-full bg-verde/5 border border-verde/20 rounded-lg p-3 flex items-center gap-3">
            <span className="text-2xl">{desafioSelecionado.icone}</span>
            <div>
              <p className="text-creme text-sm font-medium">{desafioSelecionado.titulo}</p>
              <p className="text-verde-claro text-xs">
                {desafioSelecionado.formato === "foto" ? "Formato: Foto" : "Formato: Vídeo"}
              </p>
            </div>
          </div>

          {erroCamera && <p className="text-red-400 text-sm text-center">{erroCamera}</p>}

          {/* Preview da câmera */}
          {!itemCapturado && (
            <div className="w-full relative rounded-xl overflow-hidden border border-borda aspect-video bg-fundo">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            </div>
          )}

          {/* Item capturado */}
          {itemCapturado && (
            <div className="w-full flex flex-col items-center gap-3">
              {desafioSelecionado.formato === "foto" ? (
                <img src={itemCapturado} alt="Capturada" className="w-full max-w-xs rounded-xl border border-verde-claro/50" />
              ) : (
                <video src={itemCapturado} controls className="w-full max-w-xs rounded-xl border border-verde-claro/50" />
              )}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => { setItemCapturado(null); iniciarCamera(); }}
                  className="flex-1 border border-borda text-creme rounded-lg py-3 hover:border-verde-claro transition-colors"
                >
                  Refazer
                </button>
                <button
                  onClick={() => setEtapa("escolha")}
                  className="flex-1 bg-verde text-fundo font-semibold rounded-lg py-3 hover:bg-verde-claro transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Botões de captura */}
          {!itemCapturado && !erroCamera && (
            <div className="flex gap-3 w-full">
              {desafioSelecionado.formato === "foto" && (
                <button onClick={tirarFoto} className="flex-1 bg-verde text-fundo font-semibold rounded-lg py-3 hover:bg-verde-claro transition-colors flex items-center justify-center gap-2">
                  <FaCamera /> Tirar Foto
                </button>
              )}
              {desafioSelecionado.formato === "video" && (
                !gravando ? (
                  <button onClick={iniciarGravacao} className="flex-1 bg-verde text-fundo font-semibold rounded-lg py-3 hover:bg-verde-claro transition-colors flex items-center justify-center gap-2">
                    <FaVideo /> Gravar Vídeo
                  </button>
                ) : (
                  <button onClick={pararGravacao} className="flex-1 bg-red-500 text-white font-semibold rounded-lg py-3 animate-pulse flex items-center justify-center gap-2">
                    <FaStop /> Parar Gravação
                  </button>
                )
              )}
            </div>
          )}

          <button onClick={voltarInicio} className="text-creme/50 text-sm hover:text-verde-claro flex items-center gap-1">
            <FaArrowLeft className="text-xs" /> Voltar aos desafios
          </button>
        </div>
      )}

      {/* ===== ETAPA: CÂMERA (DESKTOP) ===== */}
      {/* ===== ETAPA: CÂMERA (DESKTOP) ===== */}
{etapa === "camera" && !ehMobile && desafioSelecionado && (
  <div className="flex flex-col items-center gap-5 py-8">
    <div className="w-16 h-16 rounded-full bg-verde/10 flex items-center justify-center">
      <FaMobileScreen className="text-2xl text-verde-claro" />
    </div>
    <h3 className="text-creme text-lg font-bold text-center">Disponível apenas no celular</h3>
    <p className="text-creme/60 text-sm text-center max-w-xs">
      A captura de fotos e vídeos só pode ser feita pelo celular. Mas você pode usar nossos exemplos para testar:
    </p>

    {/* Exemplos clicáveis no desktop */}
    <div className="w-full mt-2">
      <p className="text-verde-claro text-xs font-medium mb-3 text-center flex items-center justify-center gap-1">
        <FaCircleCheck className="text-[10px]" /> Exemplos disponíveis:
      </p>
      <div className="flex flex-col gap-3">
        {exemplosFixos
          .filter((ex) => ex.tipo === desafioSelecionado.formato)
          .map((ex) => (
            <button
              key={ex.id}
              onClick={() => {
                setItemCapturado(ex.dados);
                setEtapa("escolha");
              }}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              {ex.tipo === "foto" ? (
                <img src={ex.dados} alt="Exemplo" className="w-16 h-16 object-cover rounded-lg border border-verde-claro/30 shrink-0" />
              ) : (
                <video src={ex.dados} className="w-16 h-16 object-cover rounded-lg border border-verde-claro/30 shrink-0" muted />
              )}
              <div className="flex-1">
                <p className="text-creme font-medium">Exemplo de {ex.tipo === "foto" ? "foto" : "vídeo"}</p>
                <p className="text-creme/50 text-sm">{ex.desafio}</p>
              </div>
              <span className="bg-verde/10 text-verde-claro text-xs font-medium rounded-full px-3 py-1">
                Usar
              </span>
            </button>
          ))}
      </div>
    </div>

    {/* Itens salvos pelo celular */}
    {itensSalvos.length > 0 && (
      <div className="w-full mt-4">
        <p className="text-creme/50 text-xs text-center mb-3">Itens salvos pelo celular:</p>
        <div className="grid grid-cols-3 gap-2">
          {itensSalvos.map((item) => (
            <div key={item.id} className="relative">
              {item.tipo === "foto" ? (
                <img src={item.dados} alt="Foto" className="w-full h-20 object-cover rounded-lg border border-verde-claro/30" />
              ) : (
                <video src={item.dados} className="w-full h-20 object-cover rounded-lg border border-verde-claro/30" />
              )}
              <span className="absolute bottom-1 right-1 bg-fundo/80 text-creme/60 text-xs px-1 py-0.5 rounded flex items-center gap-1">
                <FaClock className="text-[10px]" />{tempoRestante(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}

    <button onClick={voltarInicio} className="text-creme/50 text-sm hover:text-verde-claro flex items-center gap-1">
      <FaArrowLeft className="text-xs" /> Voltar aos desafios
    </button>
  </div>
)}

      {/* ===== ETAPA: ESCOLHA (Armazenar ou Validar) ===== */}
      {etapa === "escolha" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-creme text-lg font-bold text-center">O que você quer fazer?</h3>

          {/* Preview do item */}
          {itemCapturado && (
            desafioSelecionado.formato === "foto" ? (
              <img src={itemCapturado} alt="Capturada" className="w-32 h-32 object-cover rounded-xl border border-verde-claro" />
            ) : (
              <video src={itemCapturado} className="w-32 h-32 object-cover rounded-xl border border-verde-claro" controls />
            )
          )}

          <div className="w-full flex flex-col gap-3">
            {/* Armazenar interno */}
            <button
              onClick={salvarInterno}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-verde/10 flex items-center justify-center shrink-0">
                <FaStore className="text-2xl text-verde-claro" />
              </div>
              <div>
                <p className="text-creme font-medium">Armazenar Interno</p>
                <p className="text-creme/50 text-sm">Salvar no site por 24hrs</p>
              </div>
            </button>

            {/* Enviar pra IA */}
            <button
              onClick={validarIA}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-verde/10 flex items-center justify-center shrink-0">
                <FaBrain className="text-2xl text-verde-claro" />
              </div>
              <div>
                <p className="text-creme font-medium">Enviar para IA</p>
                <p className="text-creme/50 text-sm">Validar e ganhar pontos</p>
              </div>
            </button>
          </div>

          <button onClick={() => { setEtapa("camera"); setItemCapturado(null); }} className="text-creme/50 text-sm hover:text-verde-claro flex items-center gap-1">
            <FaArrowLeft className="text-xs" /> Refazer captura
          </button>
        </div>
      )}

      {/* ===== ETAPA: VALIDANDO ===== */}
      {etapa === "validando" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5 py-8">
          {itemCapturado && (
            <div className="relative">
              {desafioSelecionado.formato === "foto" ? (
                <img src={itemCapturado} alt="Validando" className="w-32 h-32 object-cover rounded-xl border border-verde-claro/50 opacity-60" />
              ) : (
                <video src={itemCapturado} className="w-32 h-32 object-cover rounded-xl border border-verde-claro/50 opacity-60" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-verde-claro border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          )}
          <p className="text-creme text-sm flex items-center gap-2">
            <FaBrain className="text-verde-claro" /> IA validando seu {desafioSelecionado.formato === "foto" ? "foto" : "vídeo"}...
          </p>
        </div>
      )}

      {/* ===== ETAPA: OPÇÕES (QR Code ou Cartão) ===== */}
      {etapa === "opcoes" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-2 bg-verde/10 border border-verde/30 rounded-full px-4 py-2">
            <FaCircleCheck className="text-verde-claro" />
            <span className="text-verde-claro text-sm font-medium">Validado! +{desafioSelecionado.pontos} pontos</span>
          </div>

          {itemCapturado && (
            desafioSelecionado.formato === "foto" ? (
              <img src={itemCapturado} alt="Validado" className="w-24 h-24 object-cover rounded-xl border border-verde-claro" />
            ) : (
              <video src={itemCapturado} className="w-24 h-24 object-cover rounded-xl border border-verde-claro" />
            )
          )}

          <h3 className="text-creme text-lg font-bold text-center">Escolha como usar os pontos</h3>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => setEtapa("qrcode")}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-verde/10 flex items-center justify-center shrink-0">
                <FaQrcode className="text-2xl text-verde-claro" />
              </div>
              <div>
                <p className="text-creme font-medium">QR Code</p>
                <p className="text-creme/50 text-sm">Gere um QR Code para usar na hora</p>
              </div>
            </button>

            <button
              onClick={() => setEtapa("cartao")}
              className="w-full flex items-center gap-4 bg-fundo border border-borda rounded-xl p-4 hover:border-verde-claro transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-verde/10 flex items-center justify-center shrink-0">
                <FaCreditCard className="text-2xl text-verde-claro" />
              </div>
              <div>
                <p className="text-creme font-medium">Enviar pro Cartão</p>
                <p className="text-creme/50 text-sm">Pontos vão direto pro ROTTA Card</p>
              </div>
            </button>
          </div>

          <button onClick={voltarInicio} className="text-creme/50 text-sm hover:text-verde-claro">
            Voltar aos desafios
          </button>
        </div>
      )}

      {/* ===== ETAPA: QR CODE ===== */}
      {etapa === "qrcode" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-creme text-lg font-bold">Seu QR Code</h3>
          <div className="w-48 h-48 bg-creme rounded-xl p-4 flex items-center justify-center">
            <div className="grid grid-cols-8 gap-1 w-full h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? "bg-fundo" : "bg-transparent"}`} />
              ))}
            </div>
          </div>
          <p className="text-creme/60 text-sm text-center">Apresente este QR Code no local de coleta</p>
          <p className="text-verde-claro text-sm font-medium">+{desafioSelecionado.pontos} pontos</p>
          <button onClick={voltarInicio} className="text-verde-claro text-sm hover:underline">Voltar aos desafios</button>
        </div>
      )}

      {/* ===== ETAPA: CARTÃO ===== */}
      {etapa === "cartao" && desafioSelecionado && (
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-creme text-lg font-bold">Pontos Enviados!</h3>

          <div className="w-full max-w-xs bg-linear-to-br from-verde to-verde-claro rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-8">
              <div className="w-10 h-8 bg-fundo/20 rounded" />
              <span className="text-fundo text-xl"><PiPlant /></span>
            </div>
            <p className="text-fundo text-lg font-mono tracking-widest mb-4">•••• •••• •••• 2026</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-fundo/60 text-xs uppercase">Titular</p>
                <p className="text-fundo text-sm font-medium">Rotta User</p>
              </div>
              <div>
                <p className="text-fundo/60 text-xs uppercase">Pontos</p>
                <p className="text-fundo text-sm font-medium">{desafioSelecionado.pontos}</p>
              </div>
            </div>
          </div>

          <p className="text-creme/60 text-sm text-center">Pontos adicionados ao seu ROTTA Card</p>
          <button onClick={voltarInicio} className="text-verde-claro text-sm hover:underline">Voltar aos desafios</button>
        </div>
      )}

      {/* ===== ETAPA: ARMAZENADO ===== */}
      {etapa === "armazenado" && (
        <div className="flex flex-col items-center gap-5 py-8">
          <div className="w-16 h-16 rounded-full bg-verde/10 flex items-center justify-center">
            <FaStore className="text-3xl text-verde-claro" />
          </div>
          <h3 className="text-creme text-lg font-bold text-center">Salvo no Armazenamento Interno!</h3>
          <p className="text-creme/60 text-sm text-center max-w-xs">
            Seu {desafioSelecionado?.formato === "foto" ? "foto" : "vídeo"} foi salvo e ficará disponível por <span className="text-verde-claro font-medium">24 horas</span>. Após esse tempo, será apagado automaticamente.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setEtapa("galeria")} className="text-verde-claro text-sm hover:underline">Ver itens salvos</button>
            <button onClick={voltarInicio} className="text-creme/50 text-sm hover:text-verde-claro">Voltar aos desafios</button>
          </div>
        </div>
      )}

      {etapa === "galeria" && (
  <div className="flex flex-col items-center gap-4">
    <h3 className="text-creme text-lg font-bold">Itens Salvos</h3>
    <p className="text-creme/40 text-xs text-center flex items-center gap-1">
      <FaClock className="text-[10px]" /> Itens expiram automaticamente após 24hrs
    </p>

    {/* ===== EXEMPLOS FIXOS ===== */}
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

    {/* ===== ITENS DO USUÁRIO ===== */}
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
                <img src={item.dados} alt="Foto" className="w-full h-28 object-cover rounded-lg border border-verde-claro/30" />
              ) : (
                <video src={item.dados} className="w-full h-28 object-cover rounded-lg border border-verde-claro/30" controls />
              )}
              <span className="absolute top-1 left-1 bg-fundo/80 text-creme/60 text-xs px-1.5 py-0.5 rounded">
                {item.desafio}
              </span>
              <span className="absolute bottom-1 right-1 bg-fundo/80 text-creme/60 text-xs px-1 py-0.5 rounded flex items-center gap-1">
                <FaClock className="text-[10px]" />{tempoRestante(item.timestamp)}
              </span>
              <button
                onClick={() => removerItem(item.id)}
                className="absolute top-1 right-1 bg-fundo/80 text-red-400 w-6 h-6 rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                aria-label="Remover"
              >
                <FaXmark className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="flex gap-3">
      <button onClick={voltarInicio} className="text-verde-claro text-sm hover:underline">Voltar aos desafios</button>
      {itensSalvos.length > 0 && <button onClick={limparTudo} className="text-red-400 text-sm hover:underline">Limpar tudo</button>}
    </div>
  </div>
)}
    </div>
  );
}