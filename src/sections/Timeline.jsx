import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import MonoLabel from "../components/MonoLabel";
import { trajetoria } from "../data/site";

function Timeline() {
  const trilhaRef = useRef(null);

  // A linha guia se preenche conforme a seção passa pela tela.
  const { scrollYProgress } = useScroll({
    target: trilhaRef,
    offset: ["start 70%", "end 65%"],
  });
  const preenchimento = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="trajetoria" className="shell scroll-mt-24 py-28 lg:py-36">
      <SectionHeading
        indice="04"
        etiqueta="Trajetória"
        titulo={["Onde estou e", "de onde vim."]}
      />

      <div ref={trilhaRef} className="relative mt-16 pl-8 sm:pl-12">
        {/* Trilho */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[5px] w-px bg-hairline sm:left-[9px]"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: preenchimento }}
          className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-linear-to-b from-flame to-flame/20 sm:left-[9px]"
        />

        <ol className="space-y-12 sm:space-y-14">
          {trajetoria.map((marco, indice) => (
            <motion.li
              key={marco.titulo}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: indice * 0.06,
              }}
              className="group relative"
            >
              {/* Marcador */}
              <span
                aria-hidden="true"
                className={`absolute top-1.5 -left-8 grid size-[11px] place-items-center rounded-full transition-all duration-300 sm:-left-12 ${
                  marco.destaque
                    ? "bg-flame shadow-[0_0_0_5px_rgba(255,85,0,0.15)]"
                    : "border border-hairline-2 bg-ink group-hover:border-flame"
                }`}
              >
                {marco.destaque && (
                  <span className="absolute size-full animate-ping rounded-full bg-flame/50" />
                )}
              </span>

              {/* Traço horizontal de ligação */}
              <span
                aria-hidden="true"
                className="absolute top-2 -left-6 h-px w-4 bg-hairline transition-colors duration-300 group-hover:bg-flame/50 sm:-left-10 sm:w-7"
              />

              <MonoLabel tone={marco.destaque ? "flame" : "mist"}>
                {marco.marcador}
              </MonoLabel>

              <h3 className="mt-3 text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-flame sm:text-2xl">
                {marco.titulo}
              </h3>
              <p className="mt-1 font-mono text-[0.72rem] tracking-wide text-ash">
                {marco.entidade}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-mist">
                {marco.descricao}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Timeline;
