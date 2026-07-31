import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

/** Variantes estáticas — criar o componente em render remontaria o card. */
const COMPONENTES = {
  div: motion.div,
  article: motion.article,
  li: motion.li,
};

/**
 * Card de vidro escuro com holofote laranja seguindo o cursor.
 * São duas camadas: o brilho difuso interno e um anel de 1px na borda,
 * recortado por mask-composite pra iluminar só o contorno.
 */
function SpotlightCard({
  children,
  className = "",
  as = "div",
  raio = 380,
  ...resto
}) {
  const Componente = COMPONENTES[as] ?? COMPONENTES.div;

  const referencia = useRef(null);
  const caixaRef = useRef(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const alvoBrilho = useMotionValue(0);
  const brilho = useSpring(alvoBrilho, { stiffness: 180, damping: 26 });

  const holofote = useMotionTemplate`radial-gradient(${raio}px circle at ${x}px ${y}px, rgba(255, 85, 0, 0.15), transparent 70%)`;
  const anel = useMotionTemplate`radial-gradient(${
    raio * 0.62
  }px circle at ${x}px ${y}px, rgba(255, 85, 0, 0.6), transparent 68%)`;

  function handleEnter() {
    caixaRef.current = referencia.current?.getBoundingClientRect() ?? null;
    alvoBrilho.set(1);
  }

  function handleMove(evento) {
    const caixa =
      caixaRef.current ?? referencia.current?.getBoundingClientRect();
    if (!caixa) return;
    x.set(evento.clientX - caixa.left);
    y.set(evento.clientY - caixa.top);
  }

  function handleLeave() {
    alvoBrilho.set(0);
  }

  return (
    <Componente
      ref={referencia}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative isolate overflow-hidden rounded-3xl border border-hairline bg-surface/70 backdrop-blur-xl transition-colors duration-300 ease-out ${className}`}
      {...resto}
    >
      {/* brilho difuso interno */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
        style={{ background: holofote, opacity: brilho }}
      />

      {/* anel iluminado de 1px */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px"
        style={{
          background: anel,
          opacity: brilho,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {children}
    </Componente>
  );
}

export default SpotlightCard;
