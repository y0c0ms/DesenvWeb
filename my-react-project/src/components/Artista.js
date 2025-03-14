import React from 'react';

function Artista({ nome, imagem, estilo, descricao, urlVideo, data, hora }) {
  const toggleVideo = (event) => {
    const artistaCard = event.target.closest('.artista-card');
    const videoContainer = artistaCard.querySelector('.video-container');
    
    if (videoContainer) {
      if (videoContainer.style.display === 'none' || videoContainer.style.display === '') {
        videoContainer.style.display = 'block';
        artistaCard.classList.add('video-expanded');
        
        // Scroll para o vídeo com uma pequena animação
        setTimeout(() => {
          videoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        videoContainer.style.display = 'none';
        artistaCard.classList.remove('video-expanded');
      }
    }
  };

  return (
    <div className="artista-card">
      <div className="artista-info">
        <h3>{nome}</h3>
        <p>Atuação: {data} às {hora}</p>
        <div className="artista-imagem-container">
          <img 
            src={imagem} 
            alt={`Foto de ${nome}`} 
            className="artista-imagem" 
            onClick={toggleVideo}
          />
        </div>
        <p>Estilo musical: {estilo}</p>
        <p className="artista-descricao">{descricao}</p>
      </div>
      {urlVideo && (
        <div className="video-container" style={{ display: 'none' }}>
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