import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Hooks/AuthContext';
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicio";
import Contacto from "./pages/Contacto";
import Ingresar from "./components/IngresarSistema/Ingresar";
import Menu from "./components/Dashboard/Menu";
import "./index.css";

function App() {
  return (
    <Router>
    <AuthProvider>
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
    </AuthProvider>
  </Router>
  );
}

export default App;
