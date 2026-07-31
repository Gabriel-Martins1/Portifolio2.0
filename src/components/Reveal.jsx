import { motion } from "motion/react";

/**
 * Entrada genérica pra blocos que não são texto (cards, listas, imagens).
 * Mesma física de mola do KineticText, pra manter a página coesa.
 */
function Reveal({ children, delay = 0, y = 26, className = "", once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
