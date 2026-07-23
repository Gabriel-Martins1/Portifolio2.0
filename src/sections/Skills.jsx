import Reveal from '../components/Reveal';

const skills = [
  { nome: "C#", slug: "sharp" },  
  { nome: "React", slug: "react" },
  { nome: "React Native", slug: "react" },
  { nome: "Node.js", slug: "nodedotjs" },
  { nome: "Express", slug: "express" },
  { nome: "GitHub", slug: "github" },
  { nome: "PostgreSQL", slug: "postgresql" },
];


// duplica a lista pra criar o efeito de loop sem "costura" visível
const linha = [...skills, ...skills];

function Skills() {
  return (
    <section id="skills">
      <Reveal>
        <h2>Habilidades</h2>
      </Reveal>
      <div className="skills-marquee">
        <div className="skills-track">
          {linha.map((skill, i) => (
            <div className="skill-pill" key={`${skill.slug}-${i}`}>
              <img src={`https://cdn.simpleicons.org/${skill.slug}/FF6B4A`} alt={skill.nome} />
              <span>{skill.nome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;