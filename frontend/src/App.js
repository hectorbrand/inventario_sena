import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Historial from './Historial'; // 1. Importamos la nueva ventana que creaste

function App() {
  return (
    <Router>
      <Routes>
        {/* La primera pantalla que aparece es el Login */}
        <Route path="/" element={<Login />} />
        
        {/* La pantalla del inventario */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 2. Nueva ruta para la ventana de reportes/historial */}
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </Router>
  );
}

export default App;