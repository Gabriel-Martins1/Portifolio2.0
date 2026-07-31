const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50";

const VARIANTES = {
  primary:
    "bg-flame text-ink shadow-[0_8px_24px_-10px_rgba(255,85,0,0.7)] hover:brightness-110 hover:shadow-[0_12px_32px_-10px_rgba(255,85,0,0.85)]",
  secondary:
    "border border-hairline bg-white/[0.03] text-chalk hover:border-flame/40 hover:bg-flame/10 hover:text-flame",
  danger:
    "border border-red-500/25 bg-red-500/10 text-red-300 hover:border-red-500/50 hover:bg-red-500/20",
};

/**
 * Botão utilitário (formulários e painel admin).
 * Para CTAs da landing, use o MagneticButton.
 */
function Button({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  const classes = `${BASE} ${VARIANTES[variant] ?? VARIANTES.primary} ${className}`;

  if (href) {
    const externo = /^(https?:|mailto:|tel:)/.test(href);
    return (
      <a
        href={href}
        className={classes}
        target={externo ? "_blank" : undefined}
        rel={externo ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
