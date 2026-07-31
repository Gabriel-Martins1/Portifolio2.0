import { useEffect, useState } from "react";
import { perfil } from "../data/site";

const formatador = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: perfil.fuso,
});

/** Relógio do meu fuso, atualizado a cada segundo. */
function LocalTime({ className = "" }) {
  const [hora, setHora] = useState(() => formatador.format(new Date()));

  useEffect(() => {
    const intervalo = setInterval(
      () => setHora(formatador.format(new Date())),
      1000
    );
    return () => clearInterval(intervalo);
  }, []);

  return (
    <time className={`font-mono tabular-nums ${className}`}>{hora}</time>
  );
}

export default LocalTime;
