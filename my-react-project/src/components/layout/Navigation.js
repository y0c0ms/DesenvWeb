import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navigation component for the site header
 * Contains the main navigation links
 */
function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/voluntario">Candidatura a Voluntário</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation; 