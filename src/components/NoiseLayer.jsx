/**
 * Textura de grão fixa sobre toda a página. Um SVG de feTurbulence embutido
 * evita requisição extra e mantém o ruído nítido em telas retina.
 */
const RUIDO = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#g)"/></svg>`
)}`;

function NoiseLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay"
      style={{ backgroundImage: `url("${RUIDO}")`, backgroundSize: "160px" }}
    />
  );
}

export default NoiseLayer;
