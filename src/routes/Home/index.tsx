import { useNavigate } from "react-router-dom";
import { FaCamera, FaBus, FaBrain } from "react-icons/fa6";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className=" min-h-screen bg-fundo text-creme font-sans">
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-20">
        <span className="inline-block border border-verde/40 rounded-full px-5 py-1.5 text-xs uppercase tracking-widest text-verde-claro mb-10">
          Sustentabilidade & Mobilidade Urbana
        </span>

        <div className="flex items-baseline gap-3">
          <h1 className="text-7xl md:text-8xl font-serif text-creme">Rotta</h1>
          <span className="text-lg text-texto-muted italic">from SoulUp</span>
        </div>

        <p className="text-xl md:text-2xl text-verde-claro mt-6 font-light">
          Seu caminho, nossa rotta.
        </p>

        <p className="text-texto-muted max-w-lg mt-6 leading-relaxed">
          Uma empresa da Soul Up que, por meio de um aplicativo, incentiva
          hábitos sustentáveis e transforma essas ações em pontos para
          utilização no transporte público.
        </p>

        <button
          onClick={() => navigate("/sobre")}
          className="mt-10 inline-flex items-center gap-2 text-sm text-creme bg-verde rounded-full px-8 py-3 hover:bg-verde-claro hover:text-fundo transition-colors duration-300"
        >
          Conheça mais
        </button>
      </section>

      <section className="flex flex-col items-center text-center px-4 py-20 max-w-3xl mx-auto">
        <p className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          O projeto
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-creme mb-6">
          Qual é o projeto da Rotta?
        </h2>
        <p className="text-texto-muted leading-relaxed">
          A Rotta foi criada para tornar o transporte público na Grande São
          Paulo mais acessível enquanto promove ações sustentáveis no cotidiano
          urbano. O usuário registra uma ação pelo aplicativo, envia uma
          comprovação por foto ou vídeo e, após a validação, recebe pontos que
          podem ser utilizados em passagens de transporte público via cartão NFC
          ou QR Code.
        </p>
      </section>

      {/* ===== FUNCIONALIDADES ===== */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-verde-claro text-sm uppercase tracking-widest mb-4">
            Funcionalidades
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-creme">
            O que a Rotta oferece?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl mb-5">
              <FaCamera />
            </div>
            <h3 className="text-lg font-medium text-creme mb-3">
              Registro por foto ou vídeo (MOBILE)
            </h3>
            <p className="text-texto-muted text-sm leading-relaxed">
              Registre sua ação sustentável por foto ou vídeo diretamente pela
              câmera do aplicativo mobile.
            </p>
          </article>

          {/* Card 2 */}
          <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl mb-5">
              <FaBus />
            </div>
            <h3 className="text-lg font-medium text-creme mb-3">
              Passagens de Transporte
            </h3>
            <p className="text-texto-muted text-sm leading-relaxed">
              Utilize seus pontos acumulados para resgatar passagens de
              transporte público.
            </p>
          </article>

          {/* Card 3 */}
          <article className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-center text-center hover:border-verde-claro/50 transition-colors duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-verde/10 text-verde-claro text-2xl mb-5">
              <FaBrain />
            </div>
            <h3 className="text-lg font-medium text-creme mb-3">
              Validação por IA
            </h3>
            <p className="text-texto-muted text-sm leading-relaxed">
              A validação analisa a comprovação enviada antes que os pontos
              sejam liberados.
            </p>
          </article>
        </div>
      </section>

      {/* ===== PARCERIAS ===== */}
      <section className="flex flex-col items-center text-center px-4 py-20 max-w-3xl mx-auto">
        <p className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          Parcerias
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-creme mb-6">
          Quem faz isso acontecer?
        </h2>
        <p className="text-texto-muted leading-relaxed mb-8">
          A SoulUp e a Rotta funcionam em colaboração com o setor público,
          empresas privadas e operadoras de transporte — cada um com um papel
          diferente para viabilizar as recompensas aos usuários através de ações
          sustentáveis.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <span className="inline-block text-xs text-verde-claro border hover:border-verde-claro/50 border-verde/30 rounded-full px-3 py-1">
            Empresas de transporte público
          </span>
          <span className="inline-block text-xs text-verde-claro border hover:border-verde-claro/50 border-verde/30 rounded-full px-3 py-1">
            Prefeitura
          </span>
          <span className="inline-block text-xs text-verde-claro border hover:border-verde-claro/50 border-verde/30 rounded-full px-3 py-1">
            Patrocinadores privados
          </span>
        </div>
      </section>
    </main>
  );
}
