import React from 'react';
import cartaz from "../../imgs/cartaz.png";

function Header({ photoOpacity, setPhotoOpacity }) {
  return (
    <header>
      <h1>Festival Vilar de Mouros 2025</h1>
      <img
        id="cartaz"
        src={cartaz}
        alt="Imagem do Festival Vilar de Mouros"
        style={{ opacity: photoOpacity, transition: "opacity 0.4s ease" }}
        onMouseOver={() => setPhotoOpacity(0)}
        onMouseOut={() => setPhotoOpacity(1)}
      />
    </header>
  );
}

export default Header; 