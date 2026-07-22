import useProjects from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const { projetos, carregando, erro } = useProjects();

  return (
    <section id="projects" className="projects-section">
      <h2>Projetos</h2>

      {carregando && <p>Carregando projetos...</p>}
      {erro && <p className="erro">{erro}</p>}

      {!carregando && !erro && projetos.length === 0 && (
        <p>Nenhum projeto cadastrado ainda.</p>
      )}

      <div className="projects-grid">
        {projetos.map((projeto) => (
          <ProjectCard key={projeto.id} {...projeto} />
        ))}
      </div>
    </section>
  );
}

export default Projects;