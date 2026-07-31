import { ArrowUpRight, Download, ExternalLink } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import BrandIcon from "./BrandIcon";
import MonoLabel from "./MonoLabel";

function separarStack(stack) {
  return String(stack || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function TechPill({ children }) {
  return (
    <li className="rounded-full border border-hairline bg-white/[0.03] px-3 py-1 font-mono text-[0.63rem] tracking-widest text-mist uppercase transition-colors duration-300 hover:border-flame/40 hover:bg-flame/10 hover:text-flame">
      {children}
    </li>
  );
}

function LinkAcao({ href, children, icone: Icone, primario = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-all duration-300 ease-out ${
        primario
          ? "bg-flame/10 text-flame hover:bg-flame hover:text-ink"
          : "border border-hairline text-mist hover:border-hairline-2 hover:text-chalk"
      }`}
    >
      <Icone className="size-3.5" strokeWidth={2} />
      {children}
    </a>
  );
}

/** Placeholder tipográfico pra projeto sem imagem cadastrada. */
function Vitrine({ titulo, imagem, indice, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-hairline bg-ink-2 ${className}`}
    >
      {imagem ? (
        <img
          src={imagem}
          alt={titulo}
          loading="lazy"
          className="size-full object-cover brightness-[0.85] saturate-[0.9] transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
        />
      ) : (
        <div
          className="grid size-full place-items-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 9px)",
          }}
        >
          <span className="font-mono text-5xl font-medium text-white/10 select-none">
            {String(indice).padStart(2, "0")}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
    </div>
  );
}

function ProjectCard({
  titulo,
  descricao,
  stack,
  link_repo,
  link_demo,
  imagem_url,
  arquivo_url,
  arquivo_tipo,
  indice = 1,
  destaque = false,
  className = "",
}) {
  const tecnologias = separarStack(stack);
  const visiveis = destaque ? tecnologias : tecnologias.slice(0, 4);
  const restantes = tecnologias.length - visiveis.length;

  return (
    <SpotlightCard
      as="article"
      className={`flex flex-col ${destaque ? "p-6 sm:p-8" : "p-6"} ${className}`}
      raio={destaque ? 520 : 340}
    >
      {/* Alturas fixas: a vitrine é apoio visual, não o assunto do card. */}
      <Vitrine
        titulo={titulo}
        imagem={imagem_url}
        indice={indice}
        className={
          destaque ? "h-44 shrink-0 lg:h-52" : "h-28 shrink-0 sm:h-32"
        }
      />

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <MonoLabel indice={String(indice).padStart(2, "0")} tone="mist">
              {destaque ? "Destaque" : "Projeto"}
            </MonoLabel>
            <h3
              className={`mt-3 font-extrabold tracking-tight transition-colors duration-300 group-hover:text-flame ${
                destaque ? "text-3xl sm:text-[2.1rem]" : "text-xl"
              }`}
            >
              {titulo}
            </h3>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 text-ash transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame"
            strokeWidth={2}
          />
        </div>

        <p
          className={`mt-3 leading-relaxed text-mist ${
            destaque ? "max-w-2xl text-[0.98rem]" : "text-[0.88rem]"
          }`}
        >
          {descricao}
        </p>

        {tecnologias.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {visiveis.map((tecnologia) => (
              <TechPill key={tecnologia}>{tecnologia}</TechPill>
            ))}
            {restantes > 0 && (
              <li className="rounded-full border border-hairline px-3 py-1 font-mono text-[0.63rem] tracking-widest text-ash uppercase">
                +{restantes}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {link_demo && (
            <LinkAcao href={link_demo} icone={ExternalLink} primario>
              Live demo
            </LinkAcao>
          )}
          {link_repo && (
            <a
              href={link_repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3.5 py-1.5 text-[0.78rem] font-semibold text-mist transition-all duration-300 ease-out hover:border-hairline-2 hover:text-chalk"
            >
              <BrandIcon marca="github" className="size-3.5" />
              Código
            </a>
          )}
          {arquivo_url && (
            <LinkAcao href={arquivo_url} icone={Download}>
              {arquivo_tipo || "Download"}
            </LinkAcao>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

export default ProjectCard;
