import { useState } from 'react';

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <nav className="navbar">
      <a href="#hero" className="navbar-logo" onClick={fecharMenu}>Gabriel Martins</a>

      <button
        className="navbar-toggle"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Abrir menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${menuAberto ? 'aberto' : ''}`}>
        <a href="#hero" onClick={fecharMenu}>Home</a>
        <a href="#about" onClick={fecharMenu}>Sobre</a>
        <a href="#skills" onClick={fecharMenu}>Habilidades</a>
        <a href="#projects" onClick={fecharMenu}>Projetos</a>
        <a href="#contact" onClick={fecharMenu}>Contato</a>
      </div>
    </nav>

    
  );
}

export default Navbar;