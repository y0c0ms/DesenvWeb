import React, { useState, useEffect } from 'react';
import './App.css';
import './style.css';

import logo from './logo.svg';
import festivalImage from "./imgs/festival.png";
import img1 from "./imgs/1920x1080_1.jpg";
import img2 from "./imgs/1920x1080_2.jpg";
import img3 from "./imgs/1920x1080_3.jpg";
import img4 from "./imgs/1920x1080_4.jpg";
import img5 from "./imgs/1920x1080_5.jpg";
import img6 from "./imgs/1920x1080_6.jpg";
import img7 from "./imgs/1920x1080_7.jpg";
import img8 from "./imgs/1920x1080_8.jpg";

const imagens = [img1, img2, img3, img4, img5, img6, img7, img8];

// 1) Cabeçalho
function Header({ photoOpacity, setPhotoOpacity }) {
  return (
    <header>
      <h1>Festival Vilar de Mouros 2025</h1>
      <img
        id="festivalPhoto"
        src={festivalImage}
        alt="Imagem do Festival Vilar de Mouros"
        style={{ opacity: photoOpacity, transition: "opacity 0.4s ease" }}
        onMouseOver={() => setPhotoOpacity(0)}
        onMouseOut={() => setPhotoOpacity(1)}
      />
    </header>
  );
}

// 2) Menu de navegação
function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="index.html">Início</a></li>
        <li><a href="voluntario.html">Candidatura a Voluntário</a></li>
      </ul>
    </nav>
  );
}

// 3) Componente de Slideshow
function Slideshow({ images }) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div id="slideshow">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          style={{
            display: i === slideIndex ? "block" : "none",
            width: "100%",
          }}
        />
      ))}
    </div>
  );
}

// 4) Conteúdo principal
function MainContent() {
  return (
    <article>
      <SectionSobreFestival />
      <SectionProgramacao />
      <SectionFestivaisRecomendados />
    </article>
  );
}

// 4a) Sobre o Festival
function SectionSobreFestival() {
  return (
    <section>
      <h2>Sobre o Festival</h2>
      <p>
        Bem-vindo ao Festival Vilar de Mouros 2025! Este evento reúne artistas nacionais e internacionais
        e acontecerá de 10 a 12 de agosto. Venha viver momentos inesquecíveis com música, arte e muita energia!
      </p>
    </section>
  );
}

// 4b) Programação
function SectionProgramacao() {
  return (
    <section>
      <h2>Programação</h2>

      <h3>21 de Agosto</h3>
      <table>
        <thead><tr><th>Horário</th><th>Artista/Grupo</th></tr></thead>
        <tbody>
          <tr><td>17:00</td><td>FOGO FRIO</td></tr>
          <tr><td>18:30</td><td>TIGERMAN</td></tr>
          <tr><td>20:00</td><td>THE LEGENDARY</td></tr>
          <tr><td>21:30</td><td>DELFINS - GNR</td></tr>
          <tr><td>23:00</td><td>AMÁLIA HOJE</td></tr>
        </tbody>
      </table>

      <h3>22 de Agosto</h3>
      <table>
        <thead><tr><th>Horário</th><th>Artista/Grupo</th></tr></thead>
        <tbody>
          <tr><td>17:00</td><td>RAMP</td></tr>
          <tr><td>18:30</td><td>MOONSPELL</td></tr>
          <tr><td>20:00</td><td>SOULFLY</td></tr>
          <tr><td>21:30</td><td>XUTOS & PONTAPÉ</td></tr>
          <tr><td>23:00</td><td>THE CULT</td></tr>
        </tbody>
      </table>

      <h3>23 de Agosto</h3>
      <table>
        <thead><tr><th>Horário</th><th>Artista/Grupo</th></tr></thead>
        <tbody>
          <tr><td>17:00</td><td>SULFUR GIANT</td></tr>
          <tr><td>18:30</td><td>CAPITÃO FAUSTO</td></tr>
          <tr><td>20:00</td><td>CRYSTAL FIGHTERS</td></tr>
          <tr><td>21:30</td><td>ORNATOS VIOLETA</td></tr>
          <tr><td>23:00</td><td>DIE ANTWOORD</td></tr>
        </tbody>
      </table>

      <h3>24 de Agosto</h3>
      <table>
        <thead><tr><th>Horário</th><th>Artista/Grupo</th></tr></thead>
        <tbody>
          <tr><td>17:00</td><td>VAPORS OF MORPHINE</td></tr>
          <tr><td>18:30</td><td>DAVID FONSECA</td></tr>
          <tr><td>20:00</td><td>THE WATERBOYS</td></tr>
          <tr><td>21:30</td><td>THE LIBERTINES</td></tr>
          <tr><td>23:00</td><td>THE DARKNESS</td></tr>
        </tbody>
      </table>
    </section>
  );
}

// 4c) Festivais Recomendados
function SectionFestivaisRecomendados() {
  return (
    <section>
      <h2>Festivais Recomendados</h2>
      <ul>
        <li><a href="https://rockinriolisboa.pt/pt" target="_blank">Rock In Rio Lisboa</a></li>
        <li><a href="https://nosalive.com/" target="_blank">NOS Alive</a></li>
        <li><a href="https://superbocksuperrock.pt/" target="_blank">Super Bock Super Rock</a></li>
      </ul>
    </section>
  );
}

// 5) Barra lateral
function AsideNoticias() {
  return (
    <aside>
      <h3>Notícias</h3>
      <p>Novos artistas confirmados para 2025!</p>
      <p>Não perca os workshops e as atividades interativas durante o festival.</p>
    </aside>
  );
}

// 6) Rodapé
function Footer() {
  return (
    <footer>
      <p>Contactos: Email: info@vilardemouros.com | Telefone: 1234-5678</p>
      <p>&copy; 2025 Festival Vilar de Mouros. Todos os direitos reservados.</p>
    </footer>
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
