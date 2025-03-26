import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InqueritoResultados.css';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import { getEstatisticas } from '../services/inqueritoService';
import artistasData from '../data/artistasInquerito.json';

function InqueritoResultados() {
  const navigate = useNavigate();
  const [estatisticas, setEstatisticas] = useState(null);
  const [artistasRanking, setArtistasRanking] = useState([]);
  const [horariosRanking, setHorariosRanking] = useState([]);

  useEffect(() => {
    const stats = getEstatisticas();
    setEstatisticas(stats);
    
    // Processar estatísticas de artistas
    const artistasProcessados = Object.entries(stats.artistasStats).map(([artistaId, count]) => {
      const artista = artistasData.find(a => a.id === artistaId);
      return {
        id: artistaId,
        nome: artista ? artista.nome : artistaId,
        count
      };
    }).sort((a, b) => b.count - a.count);
    
    setArtistasRanking(artistasProcessados);
    
    // Processar estatísticas de horários
    const horariosProcessados = Object.entries(stats.horariosStats).map(([horario, count]) => ({
      horario,
      count
    })).sort((a, b) => b.count - a.count);
    
    setHorariosRanking(horariosProcessados);
  }, []);

  if (!estatisticas) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      
      <div className="content-area">
        <main className="resultados-container">
          <h2>Resultados dos Inquéritos</h2>
          
          <div className="resultados-secao">
            <h3>Artistas Preferidos</h3>
            {artistasRanking.length > 0 ? (
              <div className="ranking-container">
                <table className="ranking-table">
                  <thead>
                    <tr>
                      <th>Artista</th>
                      <th>Votos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artistasRanking.map((artista) => (
                      <tr key={artista.id}>
                        <td>{artista.nome}</td>
                        <td>{artista.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-data">Ainda não há dados suficientes.</p>
            )}
          </div>
          
          <div className="resultados-secao">
            <h3>Horários Preferidos</h3>
            {horariosRanking.length > 0 ? (
              <div className="ranking-container">
                <table className="ranking-table">
                  <thead>
                    <tr>
                      <th>Horário</th>
                      <th>Votos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horariosRanking.map((horario) => (
                      <tr key={horario.horario}>
                        <td>{horario.horario}</td>
                        <td>{horario.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-data">Ainda não há dados suficientes.</p>
            )}
          </div>
          
          <div className="resultados-secao">
            <h3>Críticas Submetidas</h3>
            {estatisticas.criticasList.length > 0 ? (
              <div className="criticas-container">
                <ul className="criticas-list">
                  {estatisticas.criticasList.map((critica, index) => (
                    <li key={index} className="critica-item">
                      {critica}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="no-data">Ainda não foram submetidas críticas.</p>
            )}
          </div>
          
          <div className="resultados-botoes">
            <button onClick={() => navigate('/')}>Voltar à Página Inicial</button>
            <button onClick={() => navigate('/inquerito')}>Novo Inquérito</button>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default InqueritoResultados; 