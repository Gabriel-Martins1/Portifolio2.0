import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { LenisContext } from "../context/lenis";

const OFFSET_ANCORA = -88; // altura da navbar fixa

/**
 * Rolagem inercial global. Intercepta qualquer <a href="#..."> da página
 * para que a navegação entre seções use a mesma física do scroll.
 */
function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const semMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (semMovimento) return;

    const instancia = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = instancia;

    let frame;
    function loop(tempo) {
      instancia.raf(tempo);
      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      instancia.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    function handleClick(evento) {
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey) return;

      const link = evento.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const alvo = document.querySelector(href);
      if (!alvo) return;

      evento.preventDefault();

      if (lenisRef.current) {
        lenisRef.current.scrollTo(alvo, { offset: OFFSET_ANCORA });
      } else {
        alvo.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.replaceState(null, "", href);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}

export default SmoothScroll;
