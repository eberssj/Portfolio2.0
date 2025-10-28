import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>('home');

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    const navbar = document.querySelector('nav.navbar');
    if (!section) return;

    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    const y = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });

    // Animação de entrada apenas em elementos SEGUROS (não toca no carrossel)
    setTimeout(() => {
      let selectors = '';
      if (id === 'sobre') {
        selectors = 'h1, p, .sobre-photo, .sobre-photo-text, .bloco-container';
      } else if (id === 'projetos') {
        selectors = 'h1, .projetos-secundarios-container > *';
      } else if (id === 'contato') {
        selectors = '.contato-title, .email-form, .redes-sociais, .redes-cards > *';
      }

      if (selectors) {
        const elements = section.querySelectorAll(selectors);
        elements.forEach((el, i) => {
          const element = el as HTMLElement;
          element.classList.add('section--hidden');
          setTimeout(() => {
            element.classList.remove('section--hidden');
            element.classList.add('section--visible');
          }, i * 80);
        });
      }
    }, 300);
  };

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    const handleScroll = () => {
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;

        if (
          sectionTop <= window.innerHeight * 0.5 &&
          sectionTop + sectionHeight > window.innerHeight * 0.5
        ) {
          const parent = section.dataset.parent;
          current = parent || section.getAttribute('id') || 'home';
        }
      });

      setActive(current);
    };

    const initActiveSection = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', initActiveSection);
    initActiveSection(); // Chama imediatamente

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', initActiveSection);
    };
  }, []);

  return (
    <nav className="navbar tech">
      <div className="navbar-logo tech">EJ</div>

      <div className="navbar-links tech">
        <button
          onClick={() => scrollToSection('home')}
          className={`navbar-link tech ${active === 'home' ? 'active' : ''}`}
        >
          Home
        </button>

        <button
          onClick={() => scrollToSection('sobre')}
          className={`navbar-link tech ${active === 'sobre' ? 'active' : ''}`}
        >
          Sobre Mim
        </button>

        <button
          onClick={() => scrollToSection('projetos')}
          className={`navbar-link tech ${active === 'projetos' ? 'active' : ''}`}
        >
          Projetos
        </button>

        <button
          onClick={() => scrollToSection('contato')}
          className={`navbar-link tech ${active === 'contato' ? 'active' : ''}`}
        >
          Contato
        </button>
      </div>
    </nav>
  );
};

export default Navbar;