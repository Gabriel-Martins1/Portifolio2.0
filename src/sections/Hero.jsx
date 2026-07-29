import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import Button from '../components/Button';

const TEXTO = "Desenvolvedor...";
const VELOCIDADE = 90; // ms entre cada letra

function Hero() {
  const [textoDigitado, setTextoDigitado] = useState('');
  const [terminouDigitar, setTerminouDigitar] = useState(false);

  useEffect(() => {
    let i = 0;
    const intervalo = setInterval(() => {
      i++;
      setTextoDigitado(TEXTO.slice(0, i));
      if (i >= TEXTO.length) {
        clearInterval(intervalo);
        setTerminouDigitar(true);
      }
    }, VELOCIDADE);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section id="hero">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Olá, sou o Gabriel
      </motion.h1>

      <p className="hero-typewriter">
        {textoDigitado}
        <span className={`hero-cursor ${terminouDigitar ? 'piscando' : ''}`}>|</span>
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ marginTop: 24, display: 'flex', gap: 16 }}
      >
        <Button href="#projects" variant="primary">Ver projetos</Button>
        <Button href="#contact" variant="secondary">Fale comigo</Button>
      </motion.div>
    </section>
  );
}

export default Hero;