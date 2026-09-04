import { FaCamera, FaBus, FaBrain } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="">

      <section className="">
        <span className="">
          Sustentabilidade & Mobilidade Urbana
        </span>

        <div className="">
          <h1 className="">Rotta</h1>
          <span className="">from SoulUp</span>
        </div>

        <p className="">
          Ações sustentáveis que movem a cidade.
        </p>

        <p className="">
          Uma empresa da SoulUp que, por meio de um aplicativo mobile, incentiva
          hábitos sustentáveis ao oferecer créditos reais para utilização no
          transporte público.
        </p>
      </section>

      <section className="">
        <p className="">
          O projeto
        </p>
        <h2 className="">
          Qual é o projeto da Rotta?
        </h2>
        <p className="">
          A Rotta foi criada para tornar o transporte público mais acessível
          enquanto promove ações sustentáveis no dia a dia urbano. O usuário
          registra ações do dia a dia pelo app da SoulUp, acumula pontos e
          converte em créditos reais para andar de ônibus.
        </p>
      </section>

      {/* ===== FUNCIONALIDADES ===== */}
      <section className="">
        <div className="">
          <p className="">
            Funcionalidades
          </p>
          <h2 className="">
            O que o app da Rotta oferece
          </h2>
        </div>

        <div className="">
          {/* Card 1 */}
          <article className="">
            <div className="">
              <FaCamera />
            </div>
            <h3 className="">
              Registro por foto ou vídeo
            </h3>
            <p className="">
              Documente suas ações sustentáveis diretamente pelo app.
            </p>
          </article>

          {/* Card 2 */}
          <article className="">
            <div className="">
              <FaBus />
            </div>
            <h3 className="">
              Créditos de transporte
            </h3>
            <p className="">
              Converta seus pontos em créditos para o transporte público.
            </p>
          </article>

          {/* Card 3 */}
          <article className="">
            <div className="">
              <FaBrain />
            </div>
            <h3 className="">
              Validação por IA
            </h3>
            <p className="">
              Inteligência artificial garante que só ações reais sejam pontuadas.
            </p>
          </article>
        </div>
      </section>

      {/* ===== PARCERIAS ===== */}
      <section className="">
        <p className="">
          Parcerias
        </p>
        <h2 className="">
          Quem faz isso acontecer?
        </h2>
        <p className="">
          A SoulUp e a Rotta funcionam em colaboração com o setor público,
          empresas privadas e operadoras de transporte — cada um com um papel
          diferente para viabilizar as recompensas aos usuários através de ações
          sustentáveis.
        </p>

        <div className="">
          <span className="">
            Empresas de transporte público
          </span>
          <span className="">
            Prefeitura
          </span>
          <span className="">
            Patrocinadores privados
          </span>
          <span className="">
            APIs de mobilidade
          </span>
        </div>
      </section>
    </main>
  );
}