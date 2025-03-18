import React from 'react';
import Artista from './Artista';
import artistasData from '../data/artistas.json';

function Programacao() {
  // Agrupar artistas por data
  const artistasPorData = {};
  
  artistasData.forEach(artista => {
    if (!artistasPorData[artista.data]) {
      artistasPorData[artista.data] = [];
    }
    artistasPorData[artista.data].push(artista);
  });

  return (
    <div className="programacao">
      {Object.keys(artistasPorData).map(data => (
        <div key={data} className="dia-programacao">
          <h3>{data}</h3>
          <div className="artistas-grid">
            {artistasPorData[data].map(artista => (
              <Artista 
                key={artista.id}
                nome={artista.nome}
                imagem={artista.imagem}
                estilo={artista.estilo}
                descricao={artista.descricao}
                urlVideo={artista.urlVideo}
                data={artista.data}
                hora={artista.hora}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Programacao; 