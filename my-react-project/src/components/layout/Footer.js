import React, { useState } from 'react';

/**
 * Footer component with toggle functionality to show authors
 * @returns {JSX.Element} Footer component
 */
function Footer() {
  const [showAuthors, setShowAuthors] = useState(false);
  
  // Toggle para mostrar autores no footer
  const toggleAuthors = () => {
    setShowAuthors(!showAuthors);
  };

  return (
    <div className="footer-wrapper" onClick={toggleAuthors}>
      {showAuthors ? (
        <div className="authors">
          <h3>Autores do Site</h3>
          <p>Alexandre Mendes - 111026</p>
          <p>Manuel Santos - 111087</p>
          <p>Vlad Ganta - 110672</p>
        </div>
      ) : (
        <footer>
          <p>Contactos: Email: info@vilardemouros.com | Telefone: 1234-5678</p>
          <p>&copy; 2025 Festival Vilar de Mouros. Todos os direitos reservados.</p>
        </footer>
      )}
    </div>
  );
}

export default Footer; 