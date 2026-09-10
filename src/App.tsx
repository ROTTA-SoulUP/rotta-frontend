import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./routes/Home";
import Integrantes from "./routes/Integrantes";
import Sobre from "./routes/Sobre";
import Faq from "./routes/Faq";
import Contato from "./routes/Contato";
import Solucao from "./routes/Solucao";
import Carteira from "./routes/Carteira";
import Login from "./routes/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}><Route path="/home" element={<Home />} />
        <Route path="/integrantes" element={<Integrantes />} />    
        <Route path="integrantes/:id" element={<Integrantes />} />
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
