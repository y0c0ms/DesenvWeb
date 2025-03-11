import React, { useState } from 'react';
import './App.css';
import './style.css';

// Image imports
import img1 from "./imgs/1920x1080_1.jpg";
import img2 from "./imgs/1920x1080_2.jpg";
import img3 from "./imgs/1920x1080_3.jpg";
import img4 from "./imgs/1920x1080_4.jpg";
import img5 from "./imgs/1920x1080_5.jpg";
import img6 from "./imgs/1920x1080_6.jpg";
import img7 from "./imgs/1920x1080_7.jpg";
import img8 from "./imgs/1920x1080_8.jpg";

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

function App() {
  const [photoOpacity, setPhotoOpacity] = useState(1);

  return (
    <div className="container">
      <Header photoOpacity={photoOpacity} setPhotoOpacity={setPhotoOpacity} />
      <Navigation />
      <Slideshow images={imagens} />
      <MainContent />
      <AsideNoticias />
      <Footer />
    </div>
  );
}

export default App;
