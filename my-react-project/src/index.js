import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import FormVoluntario from './components/FormVoluntario';
import Inquerito from './components/Inquerito';
import InqueritoResposta from './components/InqueritoResposta';
import InqueritoResultados from './components/InqueritoResultados';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/voluntario" element={<FormVoluntario />} />
        <Route path="/inquerito" element={<Inquerito />} />
        <Route path="/inquerito/resposta" element={<InqueritoResposta />} />
        <Route path="/inquerito/resultados" element={<InqueritoResultados />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
