import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './style.css'; // Main site styling

// Image imports - organized in an array for better maintainability
import img1 from "./imgs/fotoFestival1.jpg";
import img2 from "./imgs/fotoFestival2.jpg";
import img3 from "./imgs/fotoFestival3.jpg";
import img4 from "./imgs/fotoFestival4.jpg";
import img5 from "./imgs/fotoFestival5.jpg";
import img6 from "./imgs/fotoFestival6.jpg";
import img7 from "./imgs/fotoFestival7.jpg";
import img8 from "./imgs/fotoFestival8.jpg";

// Component imports - grouped by type
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import AsideNoticias from './components/layout/AsideNoticias';
import Slideshow from './components/sections/Slideshow';
import Programacao from './components/Programacao';

/**
 * Festival images array
 */
const festivalImages = [img1, img2, img3, img4, img5, img6, img7, img8];

/**
 * Main App component that renders the entire application
 */
function App() {
  const navigate = useNavigate();
  const [showAuthors, setShowAuthors] = useState(false);
  
  // Toggle para mostrar autores no footer
  const toggleFooter = () => {
    setShowAuthors(!showAuthors);
  };
  
  return (
    <div className="container">
      <Header />
      <Navigation />
      <Slideshow images={festivalImages} />
      
      <div className="content-area">
        <main>
          <h2>Programação do Festival</h2>
          <Programacao />
          
          <div className="volunteer-button-container">
            <button 
              className="volunteer-button"
              onClick={() => navigate('/voluntario')}
            >
              Inscreva-se como Voluntário
            </button>
          </div>
        </main>
        
        <AsideNoticias />
      </div>
      
      <div className="footer-wrapper" onClick={toggleFooter}>
        {showAuthors ? (
          <div className="authors">
            <h3>Autores do Site</h3>
            <p>Alexandre Mendes - 111026</p>
            <p>Manuel Santos - 111087</p>
            <p>Vlad Ganta - 110672</p>
          </div>
        ) : (
          <Footer />
        )}
      </div>
    </div>
  );
}

export default App;
