import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const MOLA = { stiffness: 220, damping: 18, mass: 0.6 };

const VARIANTES = {
  primary:
    "bg-flame text-ink font-bold shadow-[0_10px_30px_-8px_rgba(255,85,0,0.55)] hover:shadow-[0_16px_44px_-8px_rgba(255,85,0,0.7)]",
  secondary:
    "border border-hairline bg-surface/60 text-chalk backdrop-blur-md hover:border-hairline-2 hover:bg-surface",
  ghost: "text-mist hover:text-chalk",
};

/**
 * Botão magnético: acompanha o cursor dentro de um raio, com mola.
 * O conteúdo interno se desloca um pouco mais que a casca, criando
 * a sensação de paralaxe que dá o "peso" do efeito.
 */
function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  intensidade = 0.35,
  className = "",
  disabled = false,
  ...resto
}) {
  const referencia = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const molaX = useSpring(x, MOLA);
  const molaY = useSpring(y, MOLA);
  const conteudoX = useTransform(molaX, (valor) => valor * 0.45);
  const conteudoY = useTransform(molaY, (valor) => valor * 0.45);

  function handleMouseMove(evento) {
    const elemento = referencia.current;
    if (!elemento) return;
    const caixa = elemento.getBoundingClientRect();
    x.set((evento.clientX - (caixa.left + caixa.width / 2)) * intensidade);
    y.set((evento.clientY - (caixa.top + caixa.height / 2)) * intensidade);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = [
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5",
    "text-sm tracking-tight transition-colors duration-300 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTES[variant] ?? VARIANTES.primary,
    className,
  ].join(" ");

  const propsMovimento = {
    ref: referencia,
    style: { x: molaX, y: molaY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.96 },
    className: classes,
  };

  const conteudo = (
    <motion.span
      style={{ x: conteudoX, y: conteudoY }}
      className="pointer-events-none inline-flex items-center gap-2.5 font-semibold"
    >
      {children}
    </motion.span>
  );

  if (href) {
    const externo = /^(https?:|mailto:|tel:)/.test(href);
    return (
      <motion.a
        {...propsMovimento}
        href={href}
        target={externo ? "_blank" : undefined}
        rel={externo ? "noopener noreferrer" : undefined}
        {...resto}
      >
        {conteudo}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...propsMovimento}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...resto}
    >
      {conteudo}
    </motion.button>
  );
}

export default MagneticButton;
