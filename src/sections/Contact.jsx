import { motion } from "motion/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import KineticText from "../components/KineticText";
import MonoLabel from "../components/MonoLabel";
import MagneticButton from "../components/MagneticButton";
import BrandIcon from "../components/BrandIcon";
import Reveal from "../components/Reveal";
import { contatos, redes } from "../data/site";

function Contact() {
  const [copiado, setCopiado] = useState(false);

  async function copiarEmail() {
    try {
      await navigator.clipboard.writeText(contatos.email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${contatos.email}`;
    }
  }

  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden py-28 lg:py-36"
    >
      {/* Brilho âmbar ancorado no CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[380px] w-[900px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,85,0,0.13),transparent_68%)]"
      />

      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <MonoLabel indice="05">Contato</MonoLabel>
        </Reveal>

        <KineticText
          as="h2"
          texto={["Vamos construir algo", "incrível juntos?"]}
          className="mt-7 max-w-4xl text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02]"
          linhaClassName="last:text-flame"
          stagger={0.05}
        />

        <Reveal delay={0.2}>
          <p className="mt-7 max-w-xl text-mist">
            Tem uma ideia, uma vaga ou um freela em mente? Me chama — respondo
            rápido e sem enrolação.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href={contatos.whatsapp} variant="primary">
              Chamar no WhatsApp
              <ArrowUpRight className="size-4" strokeWidth={2.4} />
            </MagneticButton>

            <button
              type="button"
              onClick={copiarEmail}
              className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 px-6 py-3.5 text-sm font-semibold text-chalk backdrop-blur-md transition-all duration-300 ease-out hover:border-flame/40 hover:text-flame"
            >
              <span className="font-mono text-[0.8rem] tracking-tight">
                {contatos.email}
              </span>
              {copiado ? (
                <Check className="size-4 text-flame" strokeWidth={2.2} />
              ) : (
                <Copy
                  className="size-4 text-ash transition-colors duration-300 group-hover:text-flame"
                  strokeWidth={2}
                />
              )}
              <span className="sr-only">
                {copiado ? "E-mail copiado" : "Copiar e-mail"}
              </span>
            </button>
          </div>
        </Reveal>

        {/* Redes */}
        <ul className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {redes.map((rede, indice) => (
            <motion.li
              key={rede.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: indice * 0.07,
              }}
            >
              <a
                href={rede.href}
                target={rede.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-2xl border border-hairline bg-surface/50 px-5 py-3 text-sm text-mist transition-all duration-300 ease-out hover:-translate-y-1 hover:border-flame/40 hover:bg-flame/[0.08] hover:text-flame hover:shadow-[0_12px_30px_-14px_rgba(255,85,0,0.8)]"
              >
                <BrandIcon marca={rede.marca} className="size-4" />
                <span className="font-medium">{rede.nome}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
