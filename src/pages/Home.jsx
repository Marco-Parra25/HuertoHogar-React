// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <main className="home-main">
      <div className="hero-section">
        <h1 className="home-title">Huerto Hogar para Todos</h1>
        <p className="home-subtitle">
          Somos una empresa de primer nivel para llevar tus frutas y verduras en la mejor
          calidad para tu hogar. Te invitamos a que descubras un mundo lleno de ellas.
        </p>
      </div>

      {/* Imagen principal del home */}
      <img
        src="/fotos/huerto.jpg"
        alt="Huerto hogar imagen"
        className="imagen-bajo-texto"
      />

      <section id="productos" className="productos-section">
        <h2 className="productos-title">Conoce Nuestros Productos Destacados</h2>

        <div className="productos">
          {/* Producto 1 */}
          <div className="producto-card">
            <div className="producto-image-container">
              <img 
                src="/fotos/man.webp" 
                alt="Manzanas" 
                className="producto-home-img"
              />
            </div>
            <div className="producto-content">
              <h3>Manzanas Rojas y Verdes</h3>
              <p className="producto-precio">$1,000 pesos por kilo</p>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="producto-card">
            <div className="producto-image-container">
              <img 
                src="/fotos/tomate.webp" 
                alt="Tomate" 
                className="producto-home-img"
              />
            </div>
            <div className="producto-content">
              <h3>Tomate</h3>
              <p className="producto-precio">$800 pesos por kilo</p>
            </div>
          </div>

          {/* Producto 3 */}
          <div className="producto-card">
            <div className="producto-image-container">
              <img 
                src="/fotos/platano.webp" 
                alt="Plátanos" 
                className="producto-home-img"
              />
            </div>
            <div className="producto-content">
              <h3>Plátanos</h3>
              <p className="producto-precio">$900 pesos por kilo</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
