function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {anoAtual} Gabriel Martins. Todos os direitos reservados.</p>
      <div className="footer-links">
        <a href="https://github.com/Gabriel-Martins1" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/gabriel-martins-a9b426402/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:martinslinke@gmail.com">E-mail</a>
      </div>
    </footer>
  );
}

export default Footer;