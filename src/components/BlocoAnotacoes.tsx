import React from "react";
import "../styles/BlocoAnotacoes.css";

interface ProjetoSecundario {
  titulo: string;
  link: string;
}

interface BlocoAnotacoesProps {
  projetos: ProjetoSecundario[];
}

const BlocoAnotacoes: React.FC<BlocoAnotacoesProps> = ({ projetos }) => {
  return (
    <div className="bloco-anotacoes-container">
      <h2 className="tech bloco-anotacoes-titulo">Projetos Secundários</h2>
      <div className="bloco-itens">
        {projetos.slice(0, 9).map((projeto, index) => (
          <div key={index} className="bloco-item">
            <span className="tech">{projeto.titulo}</span>
            <a
              href={projeto.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/LINKSEXTERNOS.svg"
                alt="Link Externo"
                className="bloco-icon"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlocoAnotacoes;
