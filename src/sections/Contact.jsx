import Reveal from '../components/Reveal';

function Contact() {
  return (
    <section id="contact">
      <Reveal>
        <h2>Contato</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p>Tem um projeto em mente? Me chama por aqui:</p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="contact-links">
          <a href="mailto:martinslinke@gmail.com">E-mail</a>
          <a href="https://wa.me/5579991592322?text=Ol%C3%A1%2C%20vi%20o%20seu%20portif%C3%B3lio!" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://www.linkedin.com/in/gabriel-martins-a9b426402/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Gabriel-Martins1" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.instagram.com/mart.insdev/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </Reveal>
    </section>
  );
}

export default Contact;