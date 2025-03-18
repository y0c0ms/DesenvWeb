import React from 'react';
import cartaz from "../../imgs/cartaz.png";

function Header() {
  return (
    <header>
      <h1>Festival Vilar de Mouros 2025</h1>
      <img
        id="festivalImage"
        src={cartaz}
        alt="Imagem do Festival Vilar de Mouros"
      />
    </header>
  );
}

export default Header; 