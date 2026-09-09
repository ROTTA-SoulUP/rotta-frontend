import CardIntegrante from "../components/CardIntegrante";
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
  { area: "Front-End", nome: "Leonardo Cerqueira", tech: "HTML · CSS · JavaScript", icon: "💻" },
  { area: "Java", nome: "Guilherme Almeida", tech: "Domain Driven Design", icon: "☕" },
  { area: "Python", nome: "Thiago Santa Rosa", tech: "Computational Thinking", icon: "🐍" },
  { area: "AI & Chatbot", nome: "Beatriz Urbano", tech: "Watson Assistant", icon: "🤖" },
  { area: "Banco de Dados", nome: "Geovanna Secchi", tech: "Oracle · SQL · MER", icon: "🗄️" },
  { area: "Business Model", nome: "Thiago & Geovanna", tech: "BMC · Pitch · Inovação", icon: "💼" },
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