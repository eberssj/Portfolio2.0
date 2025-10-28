import React from "react";
import "../styles/BlocoNotas.css";

const BlocoNotas: React.FC = () => {
  return (
    <div className="bloco-container">
      {/* Sombra atrás */}
      <div className="bloco-sombra"></div>

      {/* Bloco da frente */}
      <div className="bloco-frente">
        {/* Buracos */}
        <div className="bloco-buracos">
          <div className="buraco"></div>
          <div className="buraco"></div>
          <div className="buraco"></div>
        </div>

        {/* Corpo do bloco */}
        <div className="bloco-corpo">
          <a
            href="https://open.spotify.com/user/ejzp4trywmu95c1iw0qkfr3m9?si=bce3674ec8ef4260"
            target="_blank"
            rel="noopener noreferrer"
            className="bloco-item"
          >
            <img
              src="/LINKSEXTERNOS.svg"
              alt="Spotify Icon"
              className="bloco-icon"
            />
            <span className="tech">Meu gosto musical :)</span>
          </a>

          <a
            href="#"
            className="bloco-item"
          >
            <img
              src="/LINKSEXTERNOS.svg"
              alt="Icon"
              className="bloco-icon"
            />
            <span className="tech">Meus filmes favoritos!</span>
          </a>

          <a
            href="#"
            className="bloco-item"
          >
            <img
              src="/LINKSEXTERNOS.svg"
              alt="Icon"
              className="bloco-icon"
            />
            <span className="tech">Meu inspo board!</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlocoNotas;
