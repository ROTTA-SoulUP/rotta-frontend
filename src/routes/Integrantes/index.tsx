import {
  FaLinkedin,
  FaGithub,
  FaJava,
  FaPython,
  FaRobot,
  FaDatabase,
  FaBriefcase,
} from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import CardIntegrante from "../../components/CardIntegrante";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Integrante = {
  nome: string;
  cargo: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
};

const integrantes: Integrante[] = [
  {
    nome: "Leonardo Arnaldo Cerqueira Da Silva",
    cargo: "Front-End",
    turma: "1TDSPJ — RM: 573188",
    foto: "../../images/img05-leonardo.jpeg",
    github: "https://github.com/LeonardoSilva1203",
    linkedin: "https://www.linkedin.com/in/leonardo-cerqueira-12a400400/",
  },
  {
    nome: "Guilherme Matheus Magalhães Almeida",
    cargo: "Java",
    turma: "1TDSPJ — RM: 571713",
    foto: "../../images/img06-guilherme.jpeg",
    github: "https://github.com/GuilhermeAlmeida0207",
    linkedin: "http://www.linkedin.com/in/guimmalmeida",
  },
  {
    nome: "Thiago Rodrigues Santa Rosa",
    cargo: "Python & Business Model",
    turma: "1TDSPJ — RM: 572616",
    foto: "../../images/img07-thiago.jpeg",
    github: "https://github.com/Thiagordsr",
    linkedin:
      "https://www.linkedin.com/in/thiago-rodrigues-santa-rosa-39b3b3305/",
  },
  {
    nome: "Beatriz Urbano Marques de Oliveira",
    cargo: "AI & Chatbot",
    turma: "1TDSPJ — RM: 569341",
    foto: "../../images/img08-beatriz.jpeg",
    github: "https://github.com/BeaUrbano",
    linkedin: "https://www.linkedin.com/in/beatriz-urbano-5a9bab254",
  },
  {
    nome: "Geovanna Secchi Egea",
    cargo: "Banco de Dados & Business Model",
    turma: "1TDSPJ — RM: 573452",
    foto: "../../images/img09-geovanna.jpeg",
    github: "https://github.com/geovannasecchi",
    linkedin: "https://www.linkedin.com/in/geovanna-secchi-egea-3194553b5",
  },
];

const divisao = [
  {
    area: "Front-End",
    nome: "Leonardo Cerqueira",
    tech: "HTML · CSS · JavaScript",
    icon: <MdComputer />,
  },
  {
    area: "Java",
    nome: "Guilherme Almeida",
    tech: "Domain Driven Design",
    icon: <FaJava />,
  },
  {
    area: "Python",
    nome: "Thiago Santa Rosa",
    tech: "Computational Thinking",
    icon: <FaPython />,
  },
  {
    area: "AI & Chatbot",
    nome: "Beatriz Urbano",
    tech: "Watson Assistant",
    icon: <FaRobot />,
  },
  {
    area: "Banco de Dados",
    nome: "Geovanna Secchi",
    tech: "Oracle · SQL · MER",
    icon: <FaDatabase />,
  },
  {
    area: "Business Model",
    nome: "Thiago & Geovanna",
    tech: "BMC · Pitch · Inovação",
    icon: <FaBriefcase />,
  },
];

const numeros = [
  { valor: "5", desc: "integrantes" },
  { valor: "2", desc: "semestre" },
  { valor: "6", desc: "disciplinas" },
  { valor: "1", desc: "projeto" },
];

const tags = [
  "Challenge FIAP 2026",
  "SoulUp",
  "Desafio 2",
  "Sustentabilidade",
  "Transporte Público",
  "IA",
  "1TDSPJ",
];

export default function Integrantes() {
  const { id } = useParams();
  const navigate = useNavigate();

  // O integrante selecionado é derivado da URL, sem precisar
  // atualizar o estado dentro de um useEffect.
  const indice = id !== undefined ? Number(id) : -1;

  const integranteSelecionado =
    Number.isInteger(indice) && indice >= 0 && indice < integrantes.length
      ? integrantes[indice]
      : null;

  const modalAberto = integranteSelecionado !== null;

  const fecharModal = () => {
    navigate("/integrantes", { replace: true });
  };

  // Salva o último perfil visualizado no armazenamento local.
  useEffect(() => {
    if (integranteSelecionado) {
      localStorage.setItem("ultimoPerfil", integranteSelecionado.nome);
    }
  }, [integranteSelecionado]);

  return (
    <main className="min-h-screen bg-fundo font-sans text-creme">
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <span className="mb-4 text-sm uppercase tracking-widest text-verde-claro">
          Equipe
        </span>

        <h1 className="mb-4 font-serif text-4xl text-creme md:text-5xl">
          Quem somos
        </h1>

        <p className="max-w-xl text-xl font-light text-verde-claro">
          Conheça os integrantes do grupo responsável pelo desenvolvimento da
          Rotta no Challenge FIAP 2026.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {numeros.map((num) => (
            <article
              key={num.desc}
              className="flex flex-col items-center text-center"
            >
              <p className="mb-2 font-serif text-4xl text-verde-claro md:text-5xl">
                {num.valor}
              </p>

              <p className="text-sm uppercase tracking-widest text-texto-muted">
                {num.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex flex-col gap-12">
          <div>
            <span className="mb-4 block text-sm uppercase tracking-widest text-verde-claro">
              O projeto
            </span>

            <h2 className="mb-6 font-serif text-3xl text-creme md:text-4xl">
              O que desenvolvemos
            </h2>

            <p className="mb-4 text-sm leading-relaxed text-texto-muted">
              A Rotta é a solução desenvolvida pelo grupo para o Challenge FIAP
              2026, em parceria com a plataforma SoulUp. O desafio escolhido foi
              o{" "}
              <strong className="text-creme">
                Desafio 2 — Utilização de Pontos para Transporte Público
              </strong>
              .
            </p>

            <p className="text-sm leading-relaxed text-texto-muted">
              O projeto conecta sustentabilidade e mobilidade urbana: o usuário
              registra ações sustentáveis pelo app, acumula pontos validados por
              inteligência artificial e converte esses pontos em créditos reais
              para usar no transporte público.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-verde/30 px-3 py-1 text-xs text-verde-claro transition-colors hover:border-verde-claro/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm uppercase tracking-widest text-verde-claro">
            Organização
          </p>

          <h2 className="mb-4 font-serif text-3xl text-creme md:text-4xl">
            Como nos dividimos
          </h2>

          <p className="mx-auto max-w-lg text-texto-muted">
            Cada integrante ficou responsável por uma área técnica do projeto,
            garantindo que todas as disciplinas fossem cobertas com dedicação.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {divisao.map((item) => (
            <article
              key={item.area}
              className="flex items-center gap-4 rounded-xl border border-borda bg-fundo-card p-6 transition-colors duration-300 hover:border-verde-claro/50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-verde text-xl text-creme">
                {item.icon}
              </div>

              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-verde-claro">
                  {item.area}
                </p>

                <p className="mb-1 text-sm font-medium text-creme">
                  {item.nome}
                </p>

                <p className="text-xs text-texto-muted">{item.tech}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((integrante, i) => (
            <CardIntegrante
              key={integrante.nome}
              nome={integrante.nome}
              cargo={integrante.cargo}
              foto={integrante.foto}
              onClick={() => navigate(`/integrantes/${i}`)}
            />
          ))}
        </div>
      </section>

      {modalAberto && integranteSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={fecharModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-integrante"
            className="relative flex w-full max-w-md flex-col items-center rounded-xl border border-borda bg-fundo-card p-8 text-center"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              onClick={fecharModal}
              aria-label="Fechar perfil"
              className="absolute right-4 top-4 text-2xl text-creme transition-colors hover:text-verde-claro"
            >
              &times;
            </button>

            <img
              src={integranteSelecionado.foto}
              alt={`Foto de ${integranteSelecionado.nome}`}
              className="mb-6 h-40 w-40 rounded-full border-4 border-verde/20 object-cover"
            />

            <h2
              id="titulo-integrante"
              className="mb-2 font-serif text-xl text-creme"
            >
              {integranteSelecionado.nome}
            </h2>

            <span className="mb-2 inline-block text-xs uppercase tracking-widest text-verde-claro">
              {integranteSelecionado.cargo}
            </span>

            <p className="mb-6 text-sm text-texto-muted">
              {integranteSelecionado.turma}
            </p>

            <div className="flex justify-center gap-4">
              <a
                href={integranteSelecionado.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-borda px-4 py-2 text-xs text-creme transition-colors duration-300 hover:border-verde-claro hover:text-verde-claro"
              >
                <FaGithub /> GitHub
              </a>

              <a
                href={integranteSelecionado.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-borda px-4 py-2 text-xs text-creme transition-colors duration-300 hover:border-verde-claro hover:text-verde-claro"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}