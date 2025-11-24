// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <main className="center-page">
      <h1>HUERTO HOGAR PARA TODOS</h1>

      <p className="texto">
        Somos una empresa de primer nivel para llevar tus frutas y verduras en la mejor
        calidad para tu hogar, te invitamos a que descubras un mundo lleno de ellas.
      </p>

      {/* Imagen principal del home */}
      <img
        src="/fotos/huerto.jpg"
        alt="Huerto hogar imagen"
        className="imagen-bajo-texto"
      />

      <section id="productos">
        <h2>CONOCE NUESTROS PRODUCTOS DESTACADOS</h2>

        <div className="productos">

          {/* Producto 1 */}
          <div className="producto">
            <img 
              src="/fotos/man.webp" 
              alt="Manzanas" 
              className="producto-home-img"
            />
            <h3>Manzanas rojas y verdes</h3>
            <p>$1,000 pesos por kilo</p>
          </div>

          {/* Producto 2 */}
          <div className="producto">
            <img 
              src="/fotos/tomate.webp" 
              alt="Tomate" 
              className="producto-home-img"
            />
            <h3>Tomate</h3>
            <p>$800 pesos por kilo</p>
          </div>

          {/* Producto 3 */}
          <div className="producto">
            <img 
              src="/fotos/platano.jpg" 
              alt="Plátanos" 
              className="producto-home-img"
            />
            <h3>Plátanos</h3>
            <p>$900 pesos por kilo</p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Home;
