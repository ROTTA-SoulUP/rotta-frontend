import { useState } from "react";
import { Link } from "react-router-dom";
import MascoteCapivara from "../MascoteCapivara.tsx/index";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="border-b border-borda flex items-center justify-between px-4 py-6 bg-fundo relative z-50">

      {/* ===== LOGO — some quando menu abre no mobile ===== */}
      <Link to="/home" className={menuAberto ? "hidden md:block" : "block"}>
        <img src="../../images/Logo.svg" alt="Logo da Rotta" className="h-15" />
      </Link>

      {/* ===== HAMBURGUER (3 barras) — some quando menu abre ===== */}
      <button
        className={`md:hidden flex flex-col gap-1 p-2 ${menuAberto ? "hidden" : "flex"}`}
        onClick={() => setMenuAberto(true)}
        aria-label="Abrir menu"
      >
        <span className="w-6 h-0.5 bg-creme"></span>
        <span className="w-6 h-0.5 bg-creme"></span>
        <span className="w-6 h-0.5 bg-creme"></span>
      </button>

      {/* ===== X (fechar) — aparece quando menu abre no mobile ===== */}
      <button
        className={`md:hidden fixed top-6 right-4 z-50 ${menuAberto ? "flex" : "hidden"}`}
        onClick={() => setMenuAberto(false)}
        aria-label="Fechar menu"
      >
        <svg className="w-7 h-7 text-creme" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* ===== MENU DESKTOP (sempre visível no desktop) ===== */}
      <nav className="hidden md:block">
        <ul className="flex flex-row gap-6 items-center">
          <li><Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/home">Home</Link></li>
          <li><Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/sobre">Sobre</Link></li>
          <li><Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/solucao">Solução</Link></li>
          <li><Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/carteira">Carteira</Link></li>
          <li><Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/faq">FAQ</Link></li>
          <li><Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/integrantes">Integrantes</Link></li>
          <li><Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/contato">Contato</Link></li>
          <li><MascoteCapivara /></li>
        </ul>
      </nav>

      {/* ===== MENU MOBILE OVERLAY (tela cheia) ===== */}
      {menuAberto && (
        <div className="md:hidden fixed inset-0 bg-fundo z-40 flex flex-col">

          {/* Links — do meio pra esquerda, maiores */}
          <ul className="flex flex-col gap-6 items-start justify-center flex-1 pl-8">
            <li>
              <Link
                className="text-creme hover:text-verde-claro transition-colors text-2xl font-medium"
                to="/home"
                onClick={() => setMenuAberto(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-creme hover:text-verde-claro transition-colors text-2xl font-medium"
                to="/sobre"
                onClick={() => setMenuAberto(false)}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                className="text-creme hover:text-verde-claro transition-colors text-2xl font-medium"
                to="/solucao"
                onClick={() => setMenuAberto(false)}
              >
                Solução
              </Link>
            </li>
            <li>
              <Link
                className="text-creme hover:text-verde-claro transition-colors text-2xl font-medium"
                to="/carteira"
                onClick={() => setMenuAberto(false)}
              >
                Carteira
              </Link>
            </li>
            <li>
              <Link
                className="text-creme hover:text-verde-claro transition-colors text-2xl font-medium"
                to="/faq"
                onClick={() => setMenuAberto(false)}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                className="text-creme hover:text-verde-claro transition-colors text-2xl font-medium"
                to="/integrantes"
                onClick={() => setMenuAberto(false)}
              >
                Integrantes
              </Link>
            </li>
            <li>
              <Link
                className="text-creme hover:text-verde-claro transition-colors text-2xl font-medium"
                to="/contato"
                onClick={() => setMenuAberto(false)}
              >
                Contato
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-8 right-8">
            <MascoteCapivara direcao="cima" />
          </div>
        </div>
      )}
    </header>
  );
}