import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, TriangleAlert } from "lucide-react";
import useProjects from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import BrandIcon from "../components/BrandIcon";
import Reveal from "../components/Reveal";
import { contatos } from "../data/site";

/**
 * Bento assimétrico: a largura muda a cada linha (4+2, 2+4, 3+3), então
 * o grid nunca fica simétrico. Como ninguém ocupa duas linhas, a altura
 * é sempre ditada pelo conteúdo — sem buraco embaixo do texto.
 */
const LARGURA_LG = [4, 2, 2, 4, 3, 3];
const LARGURA_MD = [2, 1, 1, 2, 1, 1];

// Escritas por extenso porque o Tailwind lê as classes do código-fonte.
const COLUNAS_LG = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
};
const COLUNAS_MD = { 1: "md:col-span-1", 2: "md:col-span-2" };

const larguraLg = (indice) => LARGURA_LG[indice] ?? 2;
const larguraMd = (indice) => LARGURA_MD[indice] ?? 1;

/** Colunas livres na linha onde o item cai. */
function sobra(indice, largura, colunas) {
  let ocupado = 0;
  for (let i = 0; i < indice; i++) ocupado = (ocupado + largura(i)) % colunas;
  return colunas - ocupado;
}

/**
 * O último card estica até o fim da linha, pra lista de qualquer
 * tamanho terminar reta em vez de deixar meia linha vazia.
 */
function areaDe(indice, total) {
  const ultimo = indice === total - 1;
  const lg = ultimo ? sobra(indice, larguraLg, 6) : larguraLg(indice);
  const md = ultimo ? sobra(indice, larguraMd, 2) : larguraMd(indice);
  return `${COLUNAS_MD[md]} ${COLUNAS_LG[lg]}`;
}

function Projects() {
  const { projetos, carregando, erro } = useProjects();
  const [busca, setBusca] = useState("");
  const [techAtiva, setTechAtiva] = useState(null);

  const tecnologias = useMemo(() => {
    const todas = projetos.flatMap((projeto) =>
      String(projeto.stack || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    );
    const unicas = new Map();
    todas.forEach((tecnologia) =>
      unicas.set(tecnologia.toLowerCase(), tecnologia)
    );
    return [...unicas.values()].sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [projetos]);

  const projetosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return projetos.filter((projeto) => {
      const buscaOk = `${projeto.titulo} ${projeto.descricao}`
        .toLowerCase()
        .includes(termo);
      const techOk =
        !techAtiva ||
        String(projeto.stack || "")
          .toLowerCase()
          .includes(techAtiva.toLowerCase());
      return buscaOk && techOk;
    });
  }, [projetos, busca, techAtiva]);

  const temProjetos = !carregando && !erro && projetos.length > 0;

  return (
    <section id="projetos" className="shell scroll-mt-24 py-28 lg:py-36">
      <SectionHeading
        indice="02"
        etiqueta="Projetos"
        titulo={["O que já está", "rodando por aí."]}
        descricao="Carregados em tempo real da minha API na Cloudflare — o mesmo painel que uso pra publicar alimenta esta seção."
      />

      {/* Filtros */}
      {temProjetos && (
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-5 border-y border-hairline py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="group relative w-full max-w-xs">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ash transition-colors duration-300 group-focus-within:text-flame"
                strokeWidth={1.8}
              />
              <input
                type="search"
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
                placeholder="Buscar projeto"
                aria-label="Buscar projeto"
                className="w-full rounded-full border border-hairline bg-surface/60 py-2.5 pr-4 pl-11 text-sm text-chalk placeholder:text-ash focus:border-flame/50 focus:outline-none"
              />
            </div>

            <ul className="flex flex-wrap items-center gap-1.5">
              <li>
                <button
                  type="button"
                  onClick={() => setTechAtiva(null)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[0.63rem] tracking-widest uppercase transition-all duration-300 ease-out ${
                    !techAtiva
                      ? "bg-flame text-ink"
                      : "border border-hairline text-mist hover:border-flame/40 hover:text-flame"
                  }`}
                >
                  Todos
                </button>
              </li>
              {tecnologias.map((tecnologia) => {
                const ativa = techAtiva === tecnologia;
                return (
                  <li key={tecnologia}>
                    <button
                      type="button"
                      onClick={() => setTechAtiva(ativa ? null : tecnologia)}
                      aria-pressed={ativa}
                      className={`rounded-full px-3.5 py-1.5 font-mono text-[0.63rem] tracking-widest uppercase transition-all duration-300 ease-out ${
                        ativa
                          ? "bg-flame text-ink"
                          : "border border-hairline text-mist hover:border-flame/40 hover:text-flame"
                      }`}
                    >
                      {tecnologia}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      )}

      {/* Carregando */}
      {carregando && (
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <ProjectCardSkeleton
            destaque
            className="md:col-span-2 lg:col-span-4"
          />
          <ProjectCardSkeleton className="lg:col-span-2" />
          <ProjectCardSkeleton className="lg:col-span-2" />
        </div>
      )}

      {/* Erro */}
      {erro && (
        <div className="mt-10 flex items-center gap-4 rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-6">
          <TriangleAlert className="size-5 shrink-0 text-red-400" strokeWidth={1.8} />
          <p className="text-sm text-red-200/90">{erro}</p>
        </div>
      )}

      {/* Vazio */}
      {!carregando && !erro && projetos.length === 0 && (
        <p className="mt-10 rounded-3xl border border-hairline bg-surface/50 p-8 text-center text-sm text-mist">
          Nenhum projeto cadastrado ainda.
        </p>
      )}

      {temProjetos && projetosFiltrados.length === 0 && (
        <p className="mt-10 rounded-3xl border border-hairline bg-surface/50 p-8 text-center text-sm text-mist">
          Nada encontrado com esse filtro.{" "}
          <button
            type="button"
            onClick={() => {
              setBusca("");
              setTechAtiva(null);
            }}
            className="font-semibold text-flame underline-offset-4 hover:underline"
          >
            Limpar busca
          </button>
        </p>
      )}

      {/* Bento */}
      {temProjetos && projetosFiltrados.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {projetosFiltrados.map((projeto, indice) => (
              <motion.div
                key={projeto.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: Math.min(indice, 5) * 0.06,
                }}
                className={areaDe(indice, projetosFiltrados.length)}
              >
                <ProjectCard
                  {...projeto}
                  indice={indice + 1}
                  destaque={indice === 0}
                  className="h-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Reveal delay={0.1}>
        <div className="mt-12 flex justify-center">
          <MagneticButton href={contatos.github} variant="secondary">
            <BrandIcon marca="github" className="size-4" />
            Todo o resto no GitHub
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}

export default Projects;
