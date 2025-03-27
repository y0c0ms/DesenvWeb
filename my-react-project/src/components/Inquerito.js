import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inquerito.css';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import { saveInquerito } from '../services/inqueritoService';
import artistasData from '../data/artistas.json';

function Inquerito() {
  const navigate = useNavigate();
  
  // Agrupar artistas por data de apresentação
  const artistasPorDia = {};
  artistasData.forEach(artista => {
    if (!artistasPorDia[artista.data]) {
      artistasPorDia[artista.data] = [];
    }
    artistasPorDia[artista.data].push(artista);
  });

  // Extrair os dias disponíveis
  const diasDisponiveis = Object.keys(artistasPorDia);
  
  // Inicializar o estado dos artistas selecionados
  const initialArtistasState = {};
  artistasData.forEach(artista => {
    initialArtistasState[artista.id] = false;
  });
  
  // Extrair e ordenar todos os horários únicos
  const todosHorarios = [...new Set(artistasData.map(artista => artista.hora))];
  
  // Ordenar horários em ordem crescente
  const horariosOrdenados = todosHorarios.sort((a, b) => {
    // Converter para apenas horas e minutos em formato número
    const getHoraMinutos = (hora) => {
      const [h, m] = hora.split(':').map(Number);
      // Tratar horários após meia-noite (formato 00:XX)
      return h < 6 ? (h + 24) * 60 + m : h * 60 + m;
    };
    
    return getHoraMinutos(a) - getHoraMinutos(b);
  });
  
  // Estado para os campos do inquérito
  const [artistasSelecionados, setArtistasSelecionados] = useState(initialArtistasState);
  const [horarioPreferido, setHorarioPreferido] = useState(horariosOrdenados[0]);
  const [criticas, setCriticas] = useState('');
  const [diaAtual, setDiaAtual] = useState(diasDisponiveis[0]);
  
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
  
  // Função para navegar para o dia anterior
  const navegarDiaAnterior = () => {
    const indexAtual = diasDisponiveis.indexOf(diaAtual);
    if (indexAtual > 0) {
      setDiaAtual(diasDisponiveis[indexAtual - 1]);
    } else {
      // Voltar para o último dia (circular)
      setDiaAtual(diasDisponiveis[diasDisponiveis.length - 1]);
    }
  };
  
  // Função para navegar para o próximo dia
  const navegarProximoDia = () => {
    const indexAtual = diasDisponiveis.indexOf(diaAtual);
    if (indexAtual < diasDisponiveis.length - 1) {
      setDiaAtual(diasDisponiveis[indexAtual + 1]);
    } else {
      // Voltar para o primeiro dia (circular)
      setDiaAtual(diasDisponiveis[0]);
    }
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
              
              <div className="dia-navegacao">
                <button 
                  type="button" 
                  className="seta-navegacao seta-esquerda" 
                  onClick={navegarDiaAnterior}
                >
                  &lt;
                </button>
                <h4 className="dia-atual">{diaAtual}</h4>
                <button 
                  type="button" 
                  className="seta-navegacao seta-direita" 
                  onClick={navegarProximoDia}
                >
                  &gt;
                </button>
              </div>
              
              <div className="checkbox-group">
                {artistasPorDia[diaAtual].map(artista => (
                  <label className="checkbox-label" key={artista.id}>
                    <input 
                      type="checkbox" 
                      name={artista.id.toString()} 
                      checked={artistasSelecionados[artista.id] || false}
                      onChange={handleArtistaChange}
                      className="checkbox-custom"
                    />
                    {artista.nome}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Qual o seu horário preferido para os concertos?</h3>
              <div className="radio-group">
                {horariosOrdenados.map(horario => (
                  <label className="radio-label" key={horario}>
                    <input 
                      type="radio" 
                      name="horario" 
                      value={horario} 
                      checked={horarioPreferido === horario}
                      onChange={handleHorarioChange}
                    />
                    {horario}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Críticas (o que não correu bem no festival):</h3>
              <textarea 
                rows="5" 
                value={criticas}
                onChange={handleCriticasChange}
                placeholder="Conte-nos o que não correu bem no festival..."
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">Submeter inquérito</button>
              <button type="button" className="results-btn" onClick={handleVerResultados}>
                Ver Resultados dos Inquéritos
              </button>
            </div>
          </form>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default Inquerito; 