import React, { useEffect, useRef, useState } from "react";
import "../styles/CarrosselProjetos.css";

interface Projeto {
  titulo: string;
  imagem?: string;
  link: string;
}

interface CarrosselProjetosProps {
  projetos: Projeto[];
  cardWidth?: number;
  gap?: number;
  visibleCount?: number;
}

const CarrosselProjetos: React.FC<CarrosselProjetosProps> = ({
  projetos,
  cardWidth = 280,
  gap = 32,
  visibleCount = 3,
}) => {
  const total = projetos.length;
  if (total === 0) return null;

  const extended = [projetos[total - 1], ...projetos, projetos[0]];
  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const itemWidth = cardWidth + gap;

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((i) => i + 1);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((i) => i - 1);
  };

  // Atualiza o transform sempre que index mudar
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = `translateX(${-index * itemWidth}px)`;

    const onTransitionEnd = () => {
      if (index === total + 1) {
        track.style.transition = "none";
        track.style.transform = `translateX(${-1 * itemWidth}px)`;
        requestAnimationFrame(() => {
          setIndex(1);
          setIsAnimating(false);
        });
      } else if (index === 0) {
        track.style.transition = "none";
        track.style.transform = `translateX(${-(total) * itemWidth}px)`;
        requestAnimationFrame(() => {
          setIndex(total);
          setIsAnimating(false);
        });
      } else {
        setIsAnimating(false);
      }
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [index, total, itemWidth]);

  // Posicionamento inicial
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    requestAnimationFrame(() => {
      track.style.transition = "none";
      track.style.transform = `translateX(${-1 * itemWidth}px)`;
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      });
    });
  }, [itemWidth]);

  // Pré-carregamento de imagens (CORRIGIDO)
  useEffect(() => {
    projetos.forEach((p) => {
      if (p.imagem) {
        new Image().src = p.imagem;
      }
    });
  }, [projetos]);

  return (
    <div className="carrossel-wrapper">
      <button
        className="carrossel-seta esquerda"
        onClick={goToPrev}
        disabled={isAnimating}
        aria-label="Anterior"
      >
        ‹
      </button>

      <div
        className="carrossel-container"
        style={{
          width: `${visibleCount * cardWidth + (visibleCount - 1) * gap}px`,
          overflow: "hidden",
        }}
      >
        <div
          ref={trackRef}
          className="carrossel-track"
          style={{
            display: "flex",
            gap: `${gap}px`,
          }}
        >
          {extended.map((projeto, i) => (
            <a
              key={i}
              href={projeto.link}
              target="_blank"
              rel="noopener noreferrer"
              className="projeto-card"
              style={{ width: cardWidth, flexShrink: 0 }}
            >
              <div
                className="card-imagem"
                style={{
                  backgroundImage: projeto.imagem ? `url(${projeto.imagem})` : "none",
                  backgroundColor: projeto.imagem ? "transparent" : "#405D2D",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "60%",
                }}
              />
              <div className="card-info">
                <h2 className="tech card-titulo">{projeto.titulo}</h2>
                <div className="card-linha" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <button
        className="carrossel-seta direita"
        onClick={goToNext}
        disabled={isAnimating}
        aria-label="Próximo"
      >
        ›
      </button>
    </div>
  );
};

export default CarrosselProjetos;