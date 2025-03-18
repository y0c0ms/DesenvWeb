import React, { useState } from 'react';

function Artista({ nome, imagem, estilo, descricao, urlVideo, data, hora }) {
  const [videoVisible, setVideoVisible] = useState(false);
  
  const toggleVideo = (event) => {
    const artistaCard = event.target.closest('.artista-card');
    
    if (videoVisible) {
      artistaCard.classList.remove('video-expanded');
    } else {
      artistaCard.classList.add('video-expanded');
      
      // Scroll para o vídeo com uma pequena animação
      setTimeout(() => {
        const videoContainer = artistaCard.querySelector('.video-container');
        if (videoContainer) {
          videoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
    
    setVideoVisible(!videoVisible);
  };

  return (
    <div className={`artista-card ${videoVisible ? 'video-expanded' : ''}`}>
      <div className="artista-info">
        <h3>{nome}</h3>
        
        <div className="artista-imagem-container">
          <img 
            src={imagem} 
            alt={`Foto de ${nome}`} 
            className="artista-imagem" 
            onClick={urlVideo ? toggleVideo : undefined}
            style={urlVideo ? { cursor: 'pointer' } : { cursor: 'default' }}
          />
        </div>
        
        <div className="artista-detalhes">
          <p className="artista-hora"><strong>Atuação:</strong> {data} às {hora}</p>
          <p className="artista-estilo"><strong>Estilo musical:</strong> {estilo}</p>
          <div className="artista-descricao">
            <p>{descricao}</p>
          </div>
          
          {urlVideo && (
            <button 
              className="ver-video-btn" 
              onClick={toggleVideo}
            >
              {videoVisible ? 'Esconder Vídeo' : 'Ver Vídeo'}
            </button>
          )}
        </div>
      </div>
      
      {urlVideo && videoVisible && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src={urlVideo}
            title={`Vídeo de ${nome}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Artista;