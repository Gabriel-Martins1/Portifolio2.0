import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import KineticText from "../components/KineticText";
import MonoLabel from "../components/MonoLabel";
import MagneticButton from "../components/MagneticButton";
import SpotlightCard from "../components/SpotlightCard";
import LocalTime from "../components/LocalTime";
import { perfil } from "../data/site";

const FICHA = [
  { chave: "Nome", valor: perfil.nome },
  { chave: "Base", valor: perfil.local },
  { chave: "Foco", valor: "React · React Native" },
  { chave: "Infra", valor: "Cloudflare Workers · D1 · R2" },
];

const fade = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 100, damping: 20, delay },
});

function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden pt-32 pb-20"
    >
      {/* Malha técnica de fundo — estrutura, não decoração aleatória */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(115% 80% at 12% 0%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(115% 80% at 12% 0%, #000 20%, transparent 78%)",
        }}
      />
      {/* Lavagem âmbar ancorada no canto do título, pra dar hierarquia */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-32 -z-10 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,85,0,0.13),transparent_65%)]"
      />

      <div className="shell grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div {...fade(0.05)}>
            <MonoLabel>{perfil.papel}</MonoLabel>
          </motion.div>

          <KineticText
            as="h1"
            texto={["Gabriel Martins —", "do protótipo", "ao deploy."]}
            className="mt-7 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1]"
            linhaClassName="last:text-flame"
            stagger={0.055}
            delay={0.15}
          />

          <motion.p
            {...fade(0.55)}
            className="mt-8 max-w-xl text-base leading-relaxed text-mist sm:text-[1.05rem]"
          >
            {perfil.resumo}
          </motion.p>

          <motion.div
            {...fade(0.68)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contato" variant="primary">
              Vamos conversar
              <ArrowUpRight className="size-4" strokeWidth={2.4} />
            </MagneticButton>
            <MagneticButton href="#projetos" variant="secondary">
              Ver projetos
            </MagneticButton>
          </motion.div>
        </div>

        {/* Ficha técnica */}
        <motion.div
          {...fade(0.8)}
          className="lg:col-span-5 lg:justify-self-end lg:pl-6"
        >
          <SpotlightCard className="w-full max-w-sm p-6" raio={320}>
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <MonoLabel indice="00" tone="mist">
                Ficha técnica
              </MonoLabel>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <LocalTime className="text-[0.7rem] text-mist" />
              </span>
            </div>

            <dl className="mt-5 space-y-3.5">
              {FICHA.map((linha) => (
                <div
                  key={linha.chave}
                  className="flex items-baseline justify-between gap-6"
                >
                  <dt className="mono-label shrink-0 text-ash">{linha.chave}</dt>
                  <dd className="text-right text-[0.83rem] font-medium text-chalk/90">
                    {linha.valor}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-flame/20 bg-flame/[0.07] px-4 py-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame/60" />
                <span className="relative inline-flex size-2 rounded-full bg-flame" />
              </span>
              <span className="text-[0.8rem] font-semibold text-flame">
                {perfil.status}
              </span>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Indicador de rolagem */}
      <motion.a
        href="#sobre"
        aria-label="Ir para a seção sobre"
        {...fade(1)}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-mist transition-colors duration-300 hover:text-flame md:flex"
      >
        <span className="mono-label">Role</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-3.5" strokeWidth={2} />
        </motion.span>
      </motion.a>
    </section>
  );
}

export default Hero;
