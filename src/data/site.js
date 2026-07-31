/**
 * Fonte única de verdade do conteúdo estático do portfólio.
 * Os projetos NÃO ficam aqui — vêm do Worker/D1 via useProjects().
 */

export const perfil = {
  nome: "Gabriel Martins",
  monograma: "GM",
  papel: "Desenvolvedor Frontend & UI/UX",
  status: "Disponível para projetos",
  resumo:
    "Construo interfaces em React e React Native e coloco elas no ar com back-end serverless. Este portfólio, por exemplo, roda inteiro na Cloudflare — front em Pages, API em Workers, dados em D1 e arquivos em R2 — com um painel próprio pra publicar projeto sem tocar em código.",
  local: "Brasil",
  fuso: "America/Sao_Paulo",
};

export const contatos = {
  email: "martinslinke@gmail.com",
  whatsapp:
    "https://wa.me/5579991592322?text=Ol%C3%A1%2C%20vi%20o%20seu%20portif%C3%B3lio!",
  linkedin: "https://www.linkedin.com/in/gabriel-martins-a9b426402/",
  github: "https://github.com/Gabriel-Martins1",
  instagram: "https://www.instagram.com/mart.insdev/",
};

export const navegacao = [
  { id: "sobre", rotulo: "Sobre", indice: "01" },
  { id: "projetos", rotulo: "Projetos", indice: "02" },
  { id: "stack", rotulo: "Stack", indice: "03" },
  { id: "trajetoria", rotulo: "Trajetória", indice: "04" },
  { id: "contato", rotulo: "Contato", indice: "05" },
];

export const redes = [
  { nome: "GitHub", marca: "github", href: contatos.github },
  { nome: "LinkedIn", marca: "linkedin", href: contatos.linkedin },
  { nome: "WhatsApp", marca: "whatsapp", href: contatos.whatsapp },
  { nome: "E-mail", marca: "email", href: `mailto:${contatos.email}` },
  { nome: "Instagram", marca: "instagram", href: contatos.instagram },
];

/** Números da seção "Sobre" — todos verificáveis no próprio repositório. */
export const metricas = [
  { valor: "4", rotulo: "Serviços Cloudflare em produção" },
  { valor: "100%", rotulo: "Do conteúdo servido por API própria" },
  { valor: "0", rotulo: "Deploys manuais — tudo por push" },
];

/**
 * Stack agrupada por camada. `slug` alimenta o CDN da SimpleIcons;
 * quando não existe logo de marca, `slug: null` renderiza um marcador.
 */
export const stack = [
  {
    categoria: "Interface",
    icone: "MonitorSmartphone",
    resumo: "Onde a maior parte do meu tempo é gasta.",
    itens: [
      { nome: "React", slug: "react" },
      { nome: "React Native", slug: "react" },
      { nome: "JavaScript", slug: "javascript" },
      { nome: "Vite", slug: "vite" },
    ],
  },
  {
    categoria: "Back-end",
    icone: "Server",
    resumo: "APIs e regras de negócio.",
    itens: [
      { nome: "Node.js", slug: "nodedotjs" },
      { nome: "Express", slug: "express" },
      { nome: "C#", slug: null },
      { nome: "Cloudflare Workers", slug: "cloudflare" },
    ],
  },
  {
    categoria: "Dados & Infra",
    icone: "Database",
    resumo: "Persistência, arquivos e entrega.",
    itens: [
      { nome: "PostgreSQL", slug: "postgresql" },
      { nome: "Cloudflare D1", slug: "cloudflare" },
      { nome: "Cloudflare R2", slug: "cloudflare" },
      { nome: "Cloudflare Pages", slug: "cloudflare" },
    ],
  },
  {
    categoria: "Fluxo",
    icone: "GitBranch",
    resumo: "Versionamento e deploy.",
    itens: [
      { nome: "Git", slug: "git" },
      { nome: "GitHub", slug: "github" },
      { nome: "Wrangler", slug: "cloudflare" },
      { nome: "SQL", slug: null },
    ],
  },
];

/** Trajetória — marcos reais, sem datas inventadas. */
export const trajetoria = [
  {
    marcador: "Agora",
    titulo: "Desenvolvedor Frontend",
    entidade: "Freelance & projetos próprios",
    descricao:
      "Aberto a projetos e à primeira oportunidade como dev. Foco em interfaces React que não param no protótipo — vão até o deploy.",
    destaque: true,
  },
  {
    marcador: "Concluído",
    titulo: "Portfólio 2.0 — projeto de conclusão do módulo de Cloud",
    entidade: "Cloudflare Pages · Workers · D1 · R2",
    descricao:
      "Site full-stack com painel administrativo: cadastro, edição e exclusão de projetos, além de upload de imagens e instaladores. A senha do admin nunca é guardada em texto puro, e só quem está logado consegue alterar dados — o site público apenas lê.",
  },
  {
    marcador: "Em curso",
    titulo: "Formação em Programação",
    entidade: "CajuHub",
    descricao:
      "Curso de programação com módulos práticos — o de Computação em Nuvem foi o que originou a arquitetura serverless deste portfólio.",
  },
  {
    marcador: "Próximo",
    titulo: "Graduação na área de tecnologia",
    entidade: "Planejado",
    descricao:
      "Aprofundar a base teórica enquanto continuo entregando projeto de verdade em produção.",
  },
];
