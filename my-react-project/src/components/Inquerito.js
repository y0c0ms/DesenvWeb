import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inquerito.css';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import { saveInquerito } from '../services/inqueritoService';
import artistasData from '../data/artistasInquerito.json';

function Inquerito() {
  const navigate = useNavigate();
  
  // Estado para os campos do inquérito
  const [artistasSelecionados, setArtistasSelecionados] = useState({});
  const [horarioPreferido, setHorarioPreferido] = useState('22h');
  const [criticas, setCriticas] = useState('');
  
  // Initialize artists from JSON file
  useEffect(() => {
    const initialArtistasState = {};
    artistasData.forEach(artista => {
      initialArtistasState[artista.id] = false;
    });
    setArtistasSelecionados(initialArtistasState);
  }, []);
  
  // Handler para mudanças nos checkboxes de artistas
  const handleArtistaChange = (event) => {
    const { name, checked } = event.target;
    setArtistasSelecionados({
      ...artistasSelecionados,
      [name]: checked
    });
  };
  
  // Handler para mudanças no horário preferido
  const handleHorarioChange = (event) => {
    setHorarioPreferido(event.target.value);
  };
  
  // Handler para mudanças nas críticas
  const handleCriticasChange = (event) => {
    setCriticas(event.target.value);
  };
  
  // Handler para submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Salvar dados do inquérito
    saveInquerito({
      artistasSelecionados,
      horarioPreferido,
      criticas
    });
    
    // Redirecionar para a página de resposta
    navigate('/inquerito/resposta');
  };
  
  // Handler para ver resultados
  const handleVerResultados = () => {
    navigate('/inquerito/resultados');
  };
  
  return (
    <div className="container">
      <Header />
      <Navigation />
      
      <div className="content-area">
        <main className="inquerito-container">
          <h2>Inquérito ao público do Festival de Vilar de Mouros</h2>
          
          <form onSubmit={handleSubmit} className="inquerito-form">
            <div className="form-section">
              <h3>Quais foram os artistas de que gostou no festival?</h3>
              <div className="checkbox-group">
                {artistasData.map(artista => (
                  <label className="checkbox-label" key={artista.id}>
                    <input 
                      type="checkbox" 
                      name={artista.id} 
                      checked={artistasSelecionados[artista.id] || false}
                      onChange={handleArtistaChange}
                    />
                    {artista.nome}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Qual o seu horário preferido para os concertos?</h3>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="horario" 
                    value="18h" 
                    checked={horarioPreferido === '18h'}
                    onChange={handleHorarioChange}
                  />
                  18h
                </label>
                
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="horario" 
                    value="22h" 
                    checked={horarioPreferido === '22h'}
                    onChange={handleHorarioChange}
                  />
                  22h
                </label>
                
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="horario" 
                    value="24h" 
                    checked={horarioPreferido === '24h'}
                    onChange={handleHorarioChange}
                  />
                  24h
                </label>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Críticas (o que não correu bem no festival):</h3>
              <textarea 
                rows="5" 
                value={criticas}
                onChange={handleCriticasChange}
                placeholder="Conte-nos o que poderia ser melhorado nas próximas edições..."
              ></textarea>
            </div>
            
            <div className="form-actions">
              <div className="form-submit">
                <button type="submit">Submeter inquérito</button>
              </div>
              
              <div className="ver-resultados">
                <button type="button" onClick={handleVerResultados}>
                  Ver Resultados dos Inquéritos
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default Inquerito; 