import { motion } from "motion/react";

const SPRING = { type: "spring", stiffness: 100, damping: 20 };

const containerVariants = (stagger, delay) => ({
  oculto: {},
  visivel: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const palavraVariants = {
  oculto: { y: "115%" },
  visivel: { y: "0%", transition: SPRING },
};

/**
 * Revelação cinética por máscara: cada palavra sobe de dentro de um
 * container com overflow-hidden, com física de mola.
 *
 * `texto` aceita uma string (quebra automática) ou um array de strings,
 * onde cada item vira uma linha própria — útil pra controlar o ritmo do H1.
 */
function KineticText({
  texto,
  as: Tag = "span",
  className = "",
  linhaClassName = "",
  delay = 0,
  stagger = 0.045,
  once = true,
}) {
  const linhas = Array.isArray(texto) ? texto : [texto];

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={containerVariants(stagger, delay)}
        initial="oculto"
        whileInView="visivel"
        viewport={{ once, margin: "-12% 0px" }}
      >
        {linhas.map((linha, indiceLinha) => (
          <span
            key={indiceLinha}
            className={`block ${linhaClassName}`}
          >
            {linha.split(" ").map((palavra, indicePalavra) => (
              <span
                key={`${indiceLinha}-${indicePalavra}`}
                className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom"
              >
                <motion.span
                  className="inline-block will-change-transform"
                  variants={palavraVariants}
                >
                  {palavra}
                </motion.span>
                <span className="inline-block w-[0.26em]" />
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export default KineticText;
