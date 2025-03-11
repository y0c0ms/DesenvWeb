import React, { useState, useEffect } from 'react';

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

export default Slideshow; 