import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InqueritoResposta.css';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import { getRespostaAtual } from '../services/inqueritoService';
import artistasData from '../data/artistasInquerito.json';

function InqueritoResposta() {
  const navigate = useNavigate();
  const [resposta, setResposta] = useState(null);
  const [artistasSelecionados, setArtistasSelecionados] = useState([]);

  useEffect(() => {
    const respostaAtual = getRespostaAtual();
    
    if (!respostaAtual) {
      // Redirecionar para a página de inquérito se não houver resposta
      navigate('/inquerito');
      return;
    }
    
    setResposta(respostaAtual);
    
    // Mapear IDs dos artistas selecionados para seus nomes completos
    const artistas = [];
    Object.entries(respostaAtual.artistasSelecionados).forEach(([artistaId, selected]) => {
      if (selected) {
        const artista = artistasData.find(a => a.id === artistaId);
        if (artista) {
          artistas.push(artista.nome);
        }
      }
    });
    
    setArtistasSelecionados(artistas);
  }, [navigate]);

  if (!resposta) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      
      <div className="content-area">
        <main className="resposta-container">
          <div className="resposta-header">
            <h2>Exercício da semana 6</h2>
            <h3>Alínea 3</h3>
          </div>
          
          <div className="resposta-content">
            <h2>Inquérito ao público do Festival de Vilar de Mouros</h2>
            
            <div className="resposta-secao">
              <h3>Artistas Preferidos:</h3>
              <ul className="artistas-list">
                {artistasSelecionados.map((artista, index) => (
                  <li key={index}>• {artista}</li>
                ))}
              </ul>
            </div>
            
            <div className="resposta-secao">
              <h3>Horário Preferido: {resposta.horarioPreferido}</h3>
            </div>
            
            <div className="resposta-secao">
              <h3>Críticas:</h3>
              <p>{resposta.criticas || 'Nenhuma crítica foi fornecida.'}</p>
            </div>
            
            <div className="resposta-botoes">
              <button onClick={() => navigate('/')}>Voltar à Página Inicial</button>
              <button onClick={() => navigate('/inquerito/resultados')}>Ver Resultados</button>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default InqueritoResposta; 