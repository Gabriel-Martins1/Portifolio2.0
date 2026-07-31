/**
 * Etiqueta monoespaçada no formato `[ 01 // PROJETOS ]`.
 * É o elemento que costura a identidade tipográfica do site inteiro.
 */
function MonoLabel({ indice, children, className = "", tone = "flame" }) {
  const cor = tone === "flame" ? "text-flame" : "text-mist";

  return (
    <span
      className={`mono-label inline-flex items-center gap-[0.5em] ${cor} ${className}`}
    >
      <span className="select-none opacity-40">[</span>
      {indice && (
        <>
          <span className="tabular-nums">{indice}</span>
          <span className="select-none opacity-40">//</span>
        </>
      )}
      <span>{children}</span>
      <span className="select-none opacity-40">]</span>
    </span>
  );
}

export default MonoLabel;
