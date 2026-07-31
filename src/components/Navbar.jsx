import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { navegacao, perfil } from "../data/site";
import { useLenis } from "../context/lenis";
import MagneticButton from "./MagneticButton";

function Navbar() {
  const [secaoAtiva, setSecaoAtiva] = useState("inicio");
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const lenisRef = useLenis();

  const { scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Marca o link ativo conforme a seção cruza a faixa central da tela.
  useEffect(() => {
    const alvos = ["inicio", ...navegacao.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setSecaoAtiva(visivel.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6, 1] }
    );

    alvos.forEach((alvo) => observador.observe(alvo));
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    function aoRolar() {
      setRolou(window.scrollY > 24);
    }
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Trava a rolagem enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!menuAberto) return;
    const lenis = lenisRef.current;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuAberto, lenisRef]);

  useEffect(() => {
    function aoTeclar(evento) {
      if (evento.key === "Escape") setMenuAberto(false);
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out ${
          rolou
            ? "border-b border-hairline bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="shell flex h-[72px] items-center justify-between gap-6">
          {/* Monograma + status */}
          <a
            href="#inicio"
            className="group flex items-center gap-3"
            aria-label={`${perfil.nome} — início`}
          >
            <span className="relative grid size-9 place-items-center rounded-xl border border-hairline bg-surface/70 text-[0.8rem] font-extrabold tracking-tight transition-colors duration-300 group-hover:border-flame/50 group-hover:text-flame">
              {perfil.monograma}
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="mono-label text-mist">{perfil.status}</span>
            </span>
          </a>

          {/* Links desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navegacao.map((item) => {
              const ativo = secaoAtiva === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300 ease-out ${
                      ativo ? "text-chalk" : "text-mist hover:text-chalk"
                    }`}
                  >
                    <span
                      className={`font-mono text-[0.62rem] transition-colors duration-300 ${
                        ativo ? "text-flame" : "text-ash"
                      }`}
                    >
                      {item.indice}
                    </span>
                    {item.rotulo}
                    {ativo && (
                      <motion.span
                        layoutId="nav-ativo"
                        className="absolute inset-x-2.5 -bottom-px h-px bg-flame"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 32,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* O wrapper controla a visibilidade: o botão já traz
                `inline-flex` na base e venceria um `hidden` na mesma classe. */}
            <span className="hidden sm:block">
              <MagneticButton
                href="#contato"
                variant="primary"
                className="px-5 py-2.5 text-[0.82rem]"
                intensidade={0.28}
              >
                Fale comigo
              </MagneticButton>
            </span>

            <button
              type="button"
              onClick={() => setMenuAberto((aberto) => !aberto)}
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuAberto}
              className="grid size-10 place-items-center rounded-xl border border-hairline bg-surface/60 text-chalk transition-colors duration-300 hover:border-flame/40 hover:text-flame lg:hidden"
            >
              {menuAberto ? (
                <X className="size-4.5" strokeWidth={1.7} />
              ) : (
                <Menu className="size-4.5" strokeWidth={1.7} />
              )}
            </button>
          </div>
        </nav>

        {/* Progresso de leitura */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progresso }}
          className="h-px origin-left bg-linear-to-r from-flame to-ember"
        />
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {navegacao.map((item, indice) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.06 * indice,
                  }}
                  className="border-b border-hairline"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuAberto(false)}
                    className="flex items-baseline gap-4 py-5 text-3xl font-extrabold tracking-tight transition-colors duration-300 hover:text-flame"
                  >
                    <span className="font-mono text-[0.7rem] font-normal text-flame">
                      {item.indice}
                    </span>
                    {item.rotulo}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
