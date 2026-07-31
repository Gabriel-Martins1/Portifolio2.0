import { motion } from "motion/react";
import KineticText from "./KineticText";
import MonoLabel from "./MonoLabel";

/**
 * Cabeçalho padrão das seções: etiqueta mono numerada, régua que se
 * estende ao entrar na tela e o H2 com revelação cinética.
 */
function SectionHeading({ indice, etiqueta, titulo, descricao, alinhamento = "left" }) {
  const centralizado = alinhamento === "center";

  return (
    <header
      className={`flex flex-col gap-5 ${
        centralizado ? "items-center text-center" : "items-start"
      }`}
    >
      <div className="flex items-center gap-4">
        <MonoLabel indice={indice}>{etiqueta}</MonoLabel>
        <motion.span
          aria-hidden="true"
          className="h-px bg-linear-to-r from-flame/50 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "5rem", opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>

      <KineticText
        as="h2"
        texto={titulo}
        className="max-w-3xl text-4xl leading-[1.02] sm:text-5xl lg:text-[3.5rem]"
        stagger={0.04}
      />

      {descricao && (
        <motion.p
          className={`max-w-xl text-[0.975rem] leading-relaxed text-mist ${
            centralizado ? "mx-auto" : ""
          }`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          {descricao}
        </motion.p>
      )}
    </header>
  );
}

export default SectionHeading;
