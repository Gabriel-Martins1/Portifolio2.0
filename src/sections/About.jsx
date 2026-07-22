import Reveal from '../components/Reveal';

function About() {
  return (
    <section id="about">
      <Reveal>
        <h2>Sobre mim</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p>
          Sou um dev junior, faço um curso de programação na cajuhub e pretendo cursar algo na area de tecnologia!
        </p>
      </Reveal>
    </section>
  );
}

export default About;