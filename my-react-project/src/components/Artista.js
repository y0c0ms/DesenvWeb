import React from 'react';

function Artista({ nome, imagem, estilo, descricao, urlVideo, data, hora }) {
  const toggleVideo = (event) => {
    const artistaCard = event.target.closest('.artista-card');
    const videoContainer = artistaCard.querySelector('.video-container');
    
    if (videoContainer) {
      if (videoContainer.style.display === 'none' || videoContainer.style.display === '') {
        videoContainer.style.display = 'block';
      } else {
        videoContainer.style.display = 'none';
      }
    }
  };

  return (
    <div className="artista-card">
      <h3>{nome}</h3>
      <p>Atuação: {data} às {hora}</p>
      <img 
        src={imagem} 
        alt={`Foto de ${nome}`} 
        className="artista-imagem" 
        onClick={toggleVideo}
        style={{ cursor: 'pointer' }}
      />
      <p>Estilo musical: {estilo}</p>
      <p>{descricao}</p>
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