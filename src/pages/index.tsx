import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Terminal from '../components/Terminal';
import BlocoNotas from '../components/BlocoNotas';
import BlocoAnotacoes from '../components/BlocoAnotacoes';
import CarrosselProjetos from '../components/CarrosselProjetos';
import EmailForm from '../components/EmailForm';
import '../styles/Contato.css';
import '../styles/Projetos.css';
import '../styles/Home.css';
import '../styles/Sobre.css';

const Home: React.FC = () => {
  useEffect(() => {
    const animateSection = (sectionId: string, selectors: string[]) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const elements = section.querySelectorAll(selectors.join(','));
      elements.forEach(el => {
        el.classList.add('section--hidden');
        el.style.transitionDelay = '0s';
      });

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              elements.forEach((el, i) => {
                (el as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
                el.classList.remove('section--hidden');
                el.classList.add('section--visible');
              });
            } else {
              elements.forEach(el => {
                el.classList.remove('section--visible');
                el.classList.add('section--hidden');
                (el as HTMLElement).style.transitionDelay = '0s';
              });
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(section);
      return observer;
    };


    const animateElementsInSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const elements = Array.from(section.children);
      
      elements.forEach((el) => {
        el.classList.remove('section--visible');
        el.classList.add('section--hidden');
      });

      elements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.remove('section--hidden');
          el.classList.add('section--visible');
        }, i * 80); // delay entre os elementos
      });
    };

    const observers: IntersectionObserver[] = [];

    // Sobre Mim
    observers.push(
      animateSection('sobre', [
        'h1', 'p', 'img', '.sobre-photo', '.sobre-photo-text', '.bloco-container'
      ])!
    );

    // Projetos
    observers.push(
      animateSection('projetos', [
        'h1', '.projetos-container > *', '.projetos-secundarios-container > *', '.trajetoria-texto > *', '.projetos-triangulos'
      ])!
    );

    // Contato
    observers.push(
      animateSection('contato', [
        '.contato-title',
        '.email-form',
        '.redes-sociais',
        '.redes-cards > *'
      ])!
    );

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

    useEffect(() => {
    const setNavbarHeightVar = () => {
      const navbar = document.querySelector('nav.navbar') as HTMLElement | null;
      const height = navbar ? navbar.getBoundingClientRect().height : 72; // fallback
      // define a variável CSS na raiz
      document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      // também aplica padding-top direto na home-section caso queira fallback extra
      const homeSection = document.querySelector('.home-section') as HTMLElement | null;
      if (homeSection) {
        homeSection.style.paddingTop = `${height}px`;
      }
    };

    // executa ao montar
    setNavbarHeightVar();

    // atualiza quando redimensiona (ex.: rotações de celular)
    window.addEventListener('resize', setNavbarHeightVar);

    // cleanup
    return () => {
      window.removeEventListener('resize', setNavbarHeightVar);
    };
  }, []);

  return (
    <div className="page-container">
      <Navbar />

      {/* HOME */}
      <section id="home" className="section home-section">
        <main>
          <div className="home-title-container">
            <h1 className="title tech">
              <span className="typing-animation tech home-title">
                Bem-vindo ao meu Portfólio!
              </span>
            </h1>
          </div>

          <div className="content-container">
            <div className="terminal-container">
              <Terminal />
            </div>
            <div className="home-photo-container">
              <div className="photo-wrapper">
                {/* Borda da foto */}
                <div className="photo-border"></div>

                {/* Radars nos cantos da borda */}
                <div className="photo-radar-corner radar-top-left"></div>
                <div className="photo-radar-corner radar-bottom-right"></div>

                {/* Foto */}
                <img src="/eu.jpeg" alt="Eber" className="home-photo" />
                
                {/* Cantos decorativos */}
                <div className="photo-corners photo-corner-bl"></div>
                <div className="photo-corners photo-corner-tr"></div>
              </div>

            </div>
          </div>
        </main>
      </section>

      {/* SOBRE MIM */}
      <section id="sobre" className="section sobre-section">
        <div className="sobre-content">
          <div className="sobre-text">
            <h1 className="title">
              <span className="tech">Prazer, Eber!</span>
            </h1>

            <p>
              Tenho 20 anos e atualmente estudo Desenvolvimento de Software
              Multiplataforma na Fatec de São José dos Campos. Escolhi esse curso
              porque sou apaixonado por tecnologia e inovação, e quero compartilhar
              um pouco desse entusiasmo aqui.
            </p>

            <p>
              Além do universo tech, tenho um grande interesse por arte, comunicação
              e moda. Acredito que entender como símbolos, cores e formas se
              conectam com as pessoas é essencial para criar experiências
              significativas.
            </p>

            <p>
              Sou fã de cultura pop e valorizo muito a comunicação como ponte, seja
              para colaborar em projetos acadêmicos e profissionais, seja para
              fortalecer conexões no meu dia a dia.
            </p>

            <p>
              Obrigado por chegar até aqui! Espero que o que você encontrar nesse
              portfólio faça sentido pra você tanto quanto faz pra mim.
            </p>
            <img
              src="/bolinhas.png"
              alt="Decoração bolinhas"
              className="sobre-bolinhas"
            />
          </div>

          <div className="sobre-photo-container">
            <img src="/hirono.png" alt="Eber" className="sobre-photo section--hidden" />
            <p className="tech sobre-photo-text section--hidden">Esse sou eu, btw! :p</p>
            <BlocoNotas />
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="section projetos-section">
        <h1 className="title tech projetos-title">Projetos Principais</h1>

        <div className="projetos-container">
          <CarrosselProjetos
            projetos={[
              { titulo: "Site de Gestão de Chamadas de Serviços", imagem: "/woodpacker.png", link: "https://github.com/TeamHiveAPI/API-2024.01/tree/main" },
              { titulo: "Sistema IoT de monitoramento meteorológico", imagem: "/tecsus.png", link: "https://github.com/TeamHiveAPI/API-2025.01" },
              { titulo: " Aplicação de Almoxarifado Para as Forças Armadas", imagem: "/almox.jpeg", link: "https://github.com/TeamHiveAPI/API-2025.02" },
              { titulo: "Echo App - Personal Finance Tracker", imagem: "/echo.jpeg", link: "https://github.com/eberssj/Echo-Mobile" },
              { titulo: "Site de conscientização sobre Nefrologia Pediátrica", imagem: "/criancarenal.png", link: "https://github.com/TeamHiveAPI/API-2023.2?tab=readme-ov-file" }
            ]}
          />
        </div>
          {/* PARTE INFERIOR DE PROJETOS */}
        <section className="section projetos-secundarios-section" data-parent="projetos">
          <div className="projetos-secundarios-container">
            {/* LADO ESQUERDO: texto */}
            <div className="trajetoria-texto">
              <h1 className="title tech titulo-trajetoria">Trajetória acadêmica e formação</h1>
              <p>
                Concluí o ensino médio em 2022 na instituição UNIVAP Aquarius e, logo em seguida, iniciei o curso superior de Desenvolvimento de Software Multiplataforma na FATEC de São José dos Campos, onde estudo atualmente.
              </p>
              <p>
                Nesse período, também decidi me dedicar ao aprendizado de idiomas: aprofundei meus conhecimentos em inglês e realizei um ano de curso de conversação em francês, o que contribuiu muito para minha confiança ao me comunicar e para a ampliação da rede de contatos.
              </p>
              <p>
                A comunicação, de forma geral, sempre teve grande importância para mim. Acredito que saber transmitir e receber ideias de maneira clara e eficaz é essencial para que elas sejam compreendidas e gerem resultados. Por isso, busco constantemente aprimorar minhas habilidades comunicativas, fortalecendo minha capacidade de conexão com as pessoas.
              </p>
              <img
              src="/triangulos.svg"
              alt="Decoração triangulos"
              className="projetos-triangulos"
            />
            </div>

            {/* LADO DIREITO: bloco de anotações */}
            <BlocoAnotacoes
              projetos={[
                { titulo: "Atlantis", link: "https://github.com/eberssj/atlantis" },
                { titulo: "Python Para Zumbis", link: "https://github.com/eberssj/PPZ" },
                { titulo: "Autobots", link: "https://github.com/eberssj/autobots" },
                { titulo: "ChatBot Telegram - Stardew", link: "https://github.com/eberssj/bertoti" },
                { titulo: "Echo - Website", link: "https://github.com/eberssj/echo" },
                { titulo: "Flutter 3.0", link: "https://github.com/eberssj/flutter3.0" },
              ]}
            />
          </div>
        </section>
      
        </section>
          {/* CONTATO */}
        <section id="contato" className="section section--visible contato-section">
          <h1 className="title tech contato-title">
            <span className="tech">Principais formas <br /> de contato</span>
          </h1>

          <div className="contato-content">
            <div className="email-form">
              <EmailForm />
            </div>
            
            {/* BLOCO DE REDES SOCIAIS */}
            <div className="redes-sociais">
              <h1 className="title tech redes-title">Redes sociais:</h1>
              <div className="redes-cards tech">
                <a
                  href="https://www.instagram.com/myspaceberr?igsh=amo1amxwcmZrazls&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rede-card instagram"
                >
                  <span>Instagram</span>
                </a>
                <a
                  href="https://github.com/eberssj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rede-card github"
                >
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/eber-junior-b2a4a3211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rede-card linkedin"
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>
              </div>
            );
          };

export default Home;
