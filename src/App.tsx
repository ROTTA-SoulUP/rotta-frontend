import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import Sobre from "./pages/Sobre";
import Faq from "./pages/Faq";
import Contato from "./pages/Contato";
import Solucao from "./pages/Solucao";
import Carteira from "./pages/Carteira";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}><Route path="/home" element={<Home />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/solucao" element={<Solucao />} />
        <Route path="/carteira" element={<Carteira />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
