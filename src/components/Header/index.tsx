import MascoteCapivara from "../MascoteCapivara.tsx/index";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <header className="border-b border-borda flex items-center justify-between px-4 py-6 bg-fundo">
      <Link to="/home">
        <img src="../../images/Logo.svg" alt="Logo da Rotta" className="h-15" />
      </Link>

      <button className=" md:hidden flex flex-col gap-1  p-2" onClick={() => setMenuAberto(!menuAberto)}>
        <span className="w-6 h-0.5 bg-creme"></span>
        <span className="w-6 h-0.5 bg-creme"></span>
        <span className="w-6 h-0.5 bg-creme"></span>
      </button>

      <nav className={menuAberto? "block":"hidden md:block"}>
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          <li>
            <Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/home" onClick={() => setMenuAberto(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/sobre" onClick={() => setMenuAberto(false)}>
              Sobre
            </Link>
          </li>
          <li>
            <Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/solucao" onClick={() => setMenuAberto(false)}>
              Solução
            </Link>
          </li>
          <li>
            <Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/carteira" onClick={() => setMenuAberto(false)}>
              Carteira
            </Link>
          </li>
          <li>
            <Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/faq" onClick={() => setMenuAberto(false)}>
              FAQ
            </Link>
          </li>
          <li>
            <Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/integrantes" onClick={() => setMenuAberto(false)}>
              Integrantes
            </Link>
          </li>
          <li>
            <Link className="text-creme hover:text-verde-claro transition-colors cursor-pointer" to="/contato" onClick={() => setMenuAberto(false)}>
              Contato
            </Link>
          </li>
          <li>
            <MascoteCapivara />
          </li>
        </ul>
      </nav>
    </header>
  );
}
