import React from 'react';
import './App.css';
import './style.css';

// Image imports
import img1 from "./imgs/fotoFestival1.jpg";
import img2 from "./imgs/fotoFestival2.jpg";
import img3 from "./imgs/fotoFestival3.jpg";
import img4 from "./imgs/fotoFestival4.jpg";
import img5 from "./imgs/fotoFestival5.jpg";
import img6 from "./imgs/fotoFestival6.jpg";
import img7 from "./imgs/fotoFestival7.jpg";
import img8 from "./imgs/fotoFestival8.jpg";

// Component imports
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Slideshow from './components/sections/Slideshow';
import SectionSobreFestival from './components/sections/SectionSobreFestival';
import Programacao from './components/Programacao';
import SectionFestivaisRecomendados from './components/sections/SectionFestivaisRecomendados';
import AsideNoticias from './components/layout/AsideNoticias';
import Footer from './components/layout/Footer';

const imagens = [img1, img2, img3, img4, img5, img6, img7, img8];

// Main Content component
function MainContent() {
  return (
    <article>
      <SectionSobreFestival />
      <Programacao />
      <SectionFestivaisRecomendados />
    </article>
  );
}

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Navigation />
        <Slideshow images={imagens} />
        <MainContent />
        <AsideNoticias />
        <Footer />
      </div>
    );
  }
}

export default App;
