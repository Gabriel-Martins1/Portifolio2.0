import Button from '../components/Button';

function Hero() {
  return (
    <section id="hero">
      <h1>Olá, sou o Gabriel</h1>
      <p>Desenvolvedor</p>
      <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
        <Button href="#projects" variant="primary">Ver projetos</Button>
        <Button href="#contact" variant="secondary">Fale comigo</Button>
      </div>
    </section>
  );
}

export default Hero;