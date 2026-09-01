import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Integrantes from './pages/Integrantes';
import Sobre from './pages/Sobre';
import Faq from './pages/Faq';
import Contato from './pages/Contato';
import Solucao from './pages/Solucao';
import Carteira from './pages/Carteira';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/solucao" element={<Solucao />} />
        <Route path="/Carteira" element={<Carteira />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;