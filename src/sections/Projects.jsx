import { useState, useMemo } from 'react';
import useProjects from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";
import Reveal from '../components/Reveal';

function Projects() {
  const { projetos, carregando, erro } = useProjects();
  const [busca, setBusca] = useState('');
  const [techAtiva, setTechAtiva] = useState(null);

  // lista única de tecnologias, extraída de todos os projetos
const tecnologias = useMemo(() => {
  const todas = projetos.flatMap((p) => p.stack.split(',').map((t) => t.trim()));
  const unicas = new Map();
  todas.forEach((t) => unicas.set(t.toLowerCase(), t));
  return [...unicas.values()].sort();
}, [projetos]);

  const projetosFiltrados = useMemo(() => {
    return projetos.filter((p) => {
      const buscaOk = (p.titulo + p.descricao)
        .toLowerCase()
        .includes(busca.toLowerCase());
      const techOk = !techAtiva || p.stack.toLowerCase().includes(techAtiva.toLowerCase());
      return buscaOk && techOk;
    });
  }, [projetos, busca, techAtiva]);

  return (
    <section id="projects">
      <Reveal>
        <h2>Projetos</h2>
      </Reveal>

      {!carregando && !erro && projetos.length > 0 && (
        <Reveal delay={0.1}>
          <div className="projects-filters">
            <input
              type="text"
              placeholder="Buscar projeto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="projects-search"
            />
            <div className="projects-tech-filters">
              <button
                className={`tech-filter-pill ${!techAtiva ? 'ativo' : ''}`}
                onClick={() => setTechAtiva(null)}
              >
                Todos
              </button>
              {tecnologias.map((tech) => (
                <button
                  key={tech}
                  className={`tech-filter-pill ${techAtiva === tech ? 'ativo' : ''}`}
                  onClick={() => setTechAtiva(techAtiva === tech ? null : tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {carregando && <p>Carregando projetos...</p>}
      {erro && <p className="erro">{erro}</p>}

      {!carregando && !erro && projetos.length === 0 && (
        <p>Nenhum projeto cadastrado ainda.</p>
      )}

      {!carregando && !erro && projetos.length > 0 && projetosFiltrados.length === 0 && (
        <p>Nenhum projeto encontrado com esse filtro.</p>
      )}

      <div className="projects-grid">
        {projetosFiltrados.map((projeto) => (
          <ProjectCard key={projeto.id} {...projeto} />
        ))}
      </div>
    </section>
  );
}

export default Projects;