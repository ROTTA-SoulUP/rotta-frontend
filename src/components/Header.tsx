import { Link } from "react-router-dom";
import Logo from '../assets/Logo.svg'
export default function Header() {
  return (
 <header className="header">
        
        <Link to="/home">
            <img src={Logo} alt="Logo da Rotta"  className="logo"/>
        </Link>

        <button className="menu-btn" id="menu-btn" aria-label="Abrir menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <nav id="menu-nav">
            <ul>
                <li><Link to="/home" className="cabecalho">Home</Link></li>
                <li><Link to="/sobre" className="cabecalho">Sobre</Link></li>
                <li><Link to="/solucao" className="cabecalho">Solução</Link></li>
                <li><Link to="/carteira" className="cabecalho">Carteira</Link></li>
                <li><Link to="/faq" className="cabecalho">FAQ</Link></li>
                <li><Link to="/integrantes" className="cabecalho">Integrantes</Link></li>
                <li><Link to="/contato" className="cabecalho">Contato</Link></li>
            </ul>
        </nav>
    </header>
  )    
}