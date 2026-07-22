import { motion } from "motion/react";

function ProjectCard({ titulo, descricao, stack, link_repo, link_demo, imagem_url, arquivo_url }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
    >
      {imagem_url && <img src={imagem_url} alt={titulo} className="project-card-img" />}
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <span className="project-card-stack">{stack}</span>

      <div className="project-card-links">
        <a href={link_repo} target="_blank" rel="noopener noreferrer">Repositório</a>
        {link_demo && <a href={link_demo} target="_blank" rel="noopener noreferrer">Demo</a>}
        {arquivo_url && <a href={arquivo_url} target="_blank" rel="noopener noreferrer">Download</a>}
      </div>
    </motion.div>
  );
}

export default ProjectCard;