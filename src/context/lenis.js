import { createContext, useContext } from "react";

/**
 * Guarda a instância do Lenis num ref estável — assim consumidores
 * (ex.: travar a rolagem com o menu aberto) leem no momento do evento,
 * sem re-render nem estado derivado.
 */
export const LenisContext = createContext({ current: null });

export function useLenis() {
  return useContext(LenisContext);
}
