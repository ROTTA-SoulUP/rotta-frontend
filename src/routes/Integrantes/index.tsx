import { FaLinkedin, FaGithub, FaJava, FaPython, FaRobot, FaDatabase, FaBriefcase } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import CardIntegrante from "../../components/CardIntegrante";
import { useState, useEffect } from "react";
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
    foto: "../../public/images/leonardo.jpeg",
    github: "https://github.com/LeonardoSilva1203",
    linkedin: "https://www.linkedin.com/in/leonardo-cerqueira-12a400400/",
  },
  {
    nome: "Guilherme Matheus Magalhães Almeida",
    cargo: "Java",
    turma: "1TDSPJ — RM: 571713",
    foto: "../../public/images/guilherme.jpeg",
    github: "https://github.com/GuilhermeAlmeida0207",
    linkedin: "http://www.linkedin.com/in/guimmalmeida",
  },
  {
    nome: "Thiago Rodrigues Santa Rosa",
    cargo: "Python & Business Model",
    turma: "1TDSPJ — RM: 572616",
    foto: "../../public/images/thiago.jpeg",
    github: "https://github.com/Thiagordsr",
    linkedin: "https://www.linkedin.com/in/thiago-rodrigues-santa-rosa-39b3b3305/",
  },
  {
    nome: "Beatriz Urbano Marques de Oliveira",
    cargo: "AI & Chatbot",
    turma: "1TDSPJ — RM: 569341",
    foto: "../../public/images/beatriz.jpeg",
    github: "https://github.com/BeaUrbano",
    linkedin: "https://www.linkedin.com/in/beatriz-urbano-5a9bab254",
  },
  {
    nome: "Geovanna Secchi Egea",
    cargo: "Banco de Dados & Business Model",
    turma: "1TDSPJ — RM: 573452",
    foto: "../../public/images/geovanna.jpeg",
    github: "https://github.com/geovannasecchi",
    linkedin: "https://www.linkedin.com/in/geovanna-secchi-egea-3194553b5",
  },
];

const divisao = [
  { area: "Front-End", nome: "Leonardo Cerqueira", tech: "HTML · CSS · JavaScript", icon: <MdComputer/> },
  { area: "Java", nome: "Guilherme Almeida", tech: "Domain Driven Design", icon: <FaJava/> },
  { area: "Python", nome: "Thiago Santa Rosa", tech: "Computational Thinking", icon: <FaPython/> },
  { area: "AI & Chatbot", nome: "Beatriz Urbano", tech: "Watson Assistant", icon: <FaRobot/> },
  { area: "Banco de Dados", nome: "Geovanna Secchi", tech: "Oracle · SQL · MER", icon: <FaDatabase/> },
  { area: "Business Model", nome: "Thiago & Geovanna", tech: "BMC · Pitch · Inovação", icon: <FaBriefcase /> },
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
  const [modalAberto, setModalAberto] = useState(false);
  const [integranteSelecionado, setIntegranteSelecionado] = useState<Integrante | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const abrirModal = (integrante: Integrante) => {
    setIntegranteSelecionado(integrante);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setIntegranteSelecionado(null);
    navigate("/integrantes", { replace: true });
  };

  useEffect(() => {
    if (id) {
      const integrante = integrantes[parseInt(id)];
      if (integrante) {
        abrirModal(integrante);
      }
    }
  }, [id]);

  useEffect(() => {
    if (integranteSelecionado) {
      localStorage.setItem("ultimoPerfil", integranteSelecionado.nome);
    }
  }, [integranteSelecionado]);

  return (
    <main className="min-h-screen bg-fundo text-creme font-sans">

      {/* ===== HERO ===== */}
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          Equipe
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-creme mb-4">
          Quem somos
        </h1>
        <p className="text-xl text-verde-claro font-light max-w-xl">
          Conheça os integrantes do grupo responsável pelo desenvolvimento da Rotta no Challenge FIAP 2026.
        </p>
      </section>

      <section className="px-4 py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {numeros.map((num, i) => (
            <article key={i} className="flex flex-col items-center text-center">
              <p className="text-4xl md:text-5xl font-serif text-verde-claro mb-2">
                {num.valor}
              </p>
              <p className="text-texto-muted text-sm uppercase tracking-widest">
                {num.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="flex flex-col gap-12">
          <div>
            <span className="text-verde-claro text-sm uppercase tracking-widest mb-4 block">
              O projeto
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-creme mb-6">
              O que desenvolvemos
            </h2>
            <p className="text-texto-muted text-sm leading-relaxed mb-4">
              A Rotta é a solução desenvolvida pelo grupo para o Challenge FIAP
              2026, em parceria com a plataforma SoulUp. O desafio escolhido foi o{" "}
              <strong className="text-creme">
                Desafio 2 — Utilização de Pontos para Transporte Público
              </strong>
              .
            </p>
            <p className="text-texto-muted text-sm leading-relaxed">
              O projeto conecta sustentabilidade e mobilidade urbana: o usuário
              registra ações sustentáveis pelo app, acumula pontos validados por
              inteligência artificial e converte esses pontos em créditos reais
              para usar no transporte público.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs text-texto-muted border border-borda rounded-full px-3 py-1 hover:border-verde-claro hover:text-verde-claro transition-colors duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-verde-claro text-sm uppercase tracking-widest mb-4">
            Organização
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-creme mb-4">
            Como nos dividimos
          </h2>
          <p className="text-texto-muted max-w-lg mx-auto">
            Cada integrante ficou responsável por uma área técnica do projeto,
            garantindo que todas as disciplinas fossem cobertas com dedicação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisao.map((item, i) => (
            <article
              key={i}
              className="bg-fundo-card border border-borda rounded-xl p-6 flex items-center gap-4 hover:border-verde-claro/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-verde text-creme text-xl shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-verde-claro text-xs uppercase tracking-widest mb-1">
                  {item.area}
                </p>
                <p className="text-creme text-sm font-medium mb-1">{item.nome}</p>
                <p className="text-texto-muted text-xs">{item.tech}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

            {/* ===== CARDS DOS INTEGRANTES ===== */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrantes.map((integrante, i) => (
            <CardIntegrante
              key={i}
              nome={integrante.nome}
              cargo={integrante.cargo}
              foto={integrante.foto}
              onClick={() => navigate(`/integrantes/${i}`, { replace: true })}
            />
          ))}
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {modalAberto && integranteSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={fecharModal}
        >
          <div
            className="bg-fundo-card border border-borda rounded-xl max-w-md w-full p-8 flex flex-col items-center text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 text-creme text-2xl hover:text-verde-claro transition-colors"
            >
              &times;
            </button>

            <img
              src={integranteSelecionado.foto}
              alt={`Foto de ${integranteSelecionado.nome}`}
              className="w-40 h-40 rounded-full object-cover border-4 border-verde/20 mb-6"
            />

            <h2 className="text-xl font-serif text-creme mb-2">
              {integranteSelecionado.nome}
            </h2>

            <span className="inline-block text-verde-claro text-xs uppercase tracking-widest mb-2">
              {integranteSelecionado.cargo}
            </span>

            <p className="text-texto-muted text-sm mb-6">
              {integranteSelecionado.turma}
            </p>

            <div className="flex justify-center gap-4">
              <a
                href={integranteSelecionado.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-creme border border-borda rounded-full px-4 py-2 hover:border-verde-claro hover:text-verde-claro transition-colors duration-300"
              >
                <FaGithub /> GitHub
              </a>

              <a
                href={integranteSelecionado.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-creme border border-borda rounded-full px-4 py-2 hover:border-verde-claro hover:text-verde-claro transition-colors duration-300"
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