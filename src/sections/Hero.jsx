import { motion } from "motion/react";
import Button from '../components/Button';

function Hero() {
  return (
    <section id="hero">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Olá, sou o Gabriel
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        Desenvolvedor
      </motion.p>
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