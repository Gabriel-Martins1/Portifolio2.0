



# Portfólio — Gabriel Martins

Portfólio pessoal construído como projeto de conclusão do módulo de Computação em Nuvem. O site reúne meus projetos já desenvolvidos, com uma área administrativa própria para gerenciar esse conteúdo sem precisar mexer em código.

**Site publicado:** https://portifolio2-0-c6p.pages.dev

---

## Por que essa arquitetura

A restrição do módulo era usar Cloudflare como provedor de nuvem. Em vez de só hospedar um site estático, o objetivo foi usar os serviços da Cloudflare de forma que cada um resolvesse um problema real:

- **Cloudflare Pages** hospeda o front-end (React), com deploy automático a cada push.
- **Cloudflare Workers** funciona como o back-end serverless — só "liga" quando alguém faz uma requisição, sem servidor fixo pra manter no ar.
- **Cloudflare D1** guarda os dados dos projetos, permitindo que a seção "Projetos" seja alimentada dinamicamente por um banco em vez de conteúdo fixo escrito no código.
- **Cloudflare R2** armazena os arquivos (imagens dos projetos e APKs/instaladores para download), evitando subir arquivos binários pesados no repositório Git.

O resultado: adicionar um projeto novo no portfólio vira um cadastro no painel administrativo, não uma alteração de código.


## Como rodar localmente

```bash
# Front-end
cd portfolio
npm install
npm run dev

# Worker (em outro terminal)
cd worker
npm install
npx wrangler dev
```

---

## Arquitetura

```
Visitante do site
      │
      ▼
Cloudflare Pages (React) ──── serve o HTML/CSS/JS estático
      │
      │ fetch (GET público)
      ▼
Cloudflare Worker ──── recebe a requisição, valida, consulta o banco
      │
      ├──▶ Cloudflare D1 (dados dos projetos)
      └──▶ Cloudflare R2 (imagens e arquivos para download)

Painel /admin
      │
      │ login (senha) → token assinado
      ▼
Cloudflare Worker ──── valida o token em toda rota de escrita (POST/PUT/DELETE)
      │
      ├──▶ D1 (criar/editar/excluir projeto)
      └──▶ R2 (upload de imagem/arquivo)
```

O front nunca acessa o banco ou o bucket diretamente — tudo passa pelo Worker, que é o único ponto com permissão de leitura/escrita nesses serviços.

---

## Estrutura de pastas

```
portfolio/
├── src/
│   ├── assets/          → imagens estáticas do projeto
│   ├── data/
│   │   └── site.js           conteúdo estático (perfil, contatos, stack, trajetória)
│   │                          em um só lugar — as seções só consomem
│   ├── context/
│   │   └── lenis.js          contexto que expõe a instância do smooth scroll
│   ├── components/      → peças reutilizáveis de UI
│   │   ├── SmoothScroll.jsx  liga o Lenis e intercepta os links âncora da página
│   │   ├── NoiseLayer.jsx    camada fixa de grão sobre todo o site
│   │   ├── KineticText.jsx   revelação por máscara: cada palavra sobe de dentro
│   │   │                      de um container com overflow-hidden (spring)
│   │   ├── Reveal.jsx        mesma entrada, para blocos que não são texto
│   │   ├── SpotlightCard.jsx card de vidro com holofote laranja seguindo o cursor
│   │   ├── MagneticButton.jsx botão que é atraído pelo cursor (CTAs da landing)
│   │   ├── Button.jsx        botão utilitário (formulários e painel admin)
│   │   ├── MonoLabel.jsx     etiqueta mono no padrão `[ 01 // SOBRE ]`
│   │   ├── SectionHeading.jsx cabeçalho padrão das seções
│   │   ├── BrandIcon.jsx     ícones de marca (GitHub, LinkedIn, WhatsApp…)
│   │   ├── LocalTime.jsx     relógio do meu fuso, usado no hero e no rodapé
│   │   ├── Navbar.jsx        barra fixa com glassmorphism, seção ativa e progresso
│   │   ├── Footer.jsx        rodapé com navegação, localização e fuso
│   │   ├── ProjectCard.jsx   "molde" que renderiza qualquer projeto vindo do banco
│   │   ├── ProjectCardSkeleton.jsx  esqueleto de carregamento do bento
│   │   └── ProjectForm.jsx   formulário de criar/editar projeto (usado só no admin)
│   ├── hooks/            → lógica de dados, separada da UI
│   │   ├── useProjects.js      busca os projetos publicados (rota pública)
│   │   ├── useAdminProjects.js CRUD dos projetos (rotas protegidas por token)
│   │   └── useAuth.js          login, logout e persistência do token (localStorage)
│   ├── pages/            → páginas com lógica própria de acesso
│   │   ├── LoginAdmin.jsx    formulário de senha do painel
│   │   └── Admin.jsx         decide entre mostrar o login ou o painel, conforme autenticação
│   ├── sections/         → cada bloco visual da página inicial
│   │   ├── Hero.jsx, About.jsx, Projects.jsx, Skills.jsx, Timeline.jsx, Contact.jsx
│   ├── App.jsx           → monta as seções na ordem final e decide a rota /admin
│   └── index.css          → tokens do design system (@theme), base e utilitários
│
├── worker/               → back-end serverless (Cloudflare Worker)
│   ├── src/index.js         todas as rotas da API: projetos (CRUD), login, upload
│   ├── schema.sql           definição das tabelas do D1
│   └── wrangler.toml        configuração do Worker (bindings de D1, R2, variáveis)
│
└── public/               → arquivos servidos como estão (favicon, ícones)
```

O CSS solto (`App.css`) foi removido: o estilo hoje mora nos tokens do
`index.css` e em classes utilitárias do Tailwind dentro de cada componente.

---

## Tecnologias usadas e por quê

| Camada | Tecnologia | Motivo da escolha |
|---|---|---|
| Front-end | React + Vite | Build rápido, e já era a stack usada nos projetos que o portfólio exibe |
| Estilo | Tailwind CSS v4 | Design system declarado como tokens (`@theme`) no próprio CSS; o estilo vive junto do componente, sem folha global crescendo sem controle |
| Animações | Motion (Framer Motion) | Biblioteca padrão de animação em React; resolve revelação por máscara, holofote nos cards e botões magnéticos com pouco código |
| Rolagem | Lenis | Scroll inercial suave, com o mesmo easing aplicado à navegação por âncora |
| Ícones | lucide-react | Traço fino e consistente; os logos de marca são SVGs próprios (`BrandIcon`) |
| Hospedagem do front | Cloudflare Pages | Deploy automático a cada push, CDN global, gratuito |
| Back-end | Cloudflare Workers | Serverless — sem servidor fixo pra manter, escala automaticamente |
| Banco de dados | Cloudflare D1 | SQL relacional, gratuito, acessível só pelo Worker (sem exposição direta à internet) |
| Armazenamento de arquivos | Cloudflare R2 | Guarda imagens e instaladores/APKs sem custo de saída de dados (egress gratuito) |
| Autenticação do admin | PBKDF2 (Web Crypto API nativa do Worker) | bcrypt não roda bem no runtime de Workers; PBKDF2 é nativo, sem dependência externa, e cumpre a mesma função de hash seguro com salt |

---

## Segurança implementada

- **Senha do admin nunca é armazenada em texto puro** — só o hash (PBKDF2 + salt), guardado como *secret* do Worker, fora do código e fora do Git.
- **Rotas de escrita (criar/editar/excluir projeto, upload) exigem um token assinado** (HMAC), gerado no login e enviado em todo request subsequente. Sem token válido, o Worker recusa com `401`.
- **Validação de links contra XSS**: qualquer campo de URL (repositório, demo, imagem, arquivo) passa por uma checagem que só aceita `http://` ou `https://`, bloqueando protocolos como `javascript:` que poderiam executar código malicioso se clicados.
- **Limite de armazenamento no R2**: o Worker mantém um contador de bytes usados no D1 e recusa novos uploads antes de estourar o plano gratuito (limite de segurança configurado abaixo do teto real, com folga).
- **Limite de tamanho por arquivo** (upload individual), evitando um único arquivo consumir todo o espaço disponível de uma vez.

---

## Funcionalidades

- Site público com Hero, Sobre, Projetos (bento assimétrico carregado do banco), Stack, Trajetória e Contato.
- Busca e filtro por tecnologia nos projetos, com reordenação animada do grid.
- Painel `/admin` protegido por senha, com CRUD completo dos projetos: criar, editar, excluir, upload de imagem e de arquivo para download (APK/instalador).
- Design responsivo (desktop e mobile).

---

## Design system

Tudo sai de tokens declarados em `src/index.css`, dentro de `@theme`:

| Token | Valor | Uso |
|---|---|---|
| `ink` / `ink-2` | `#08080a` / `#0c0d10` | fundo da página (nunca preto puro) |
| `surface` | `#121318` a 70% + `backdrop-blur` | cards, modais e a navbar |
| `hairline` | `rgba(255,255,255,0.07)` | bordas ultrafinas |
| `flame` / `ember` | `#ff5500` / `#f97316` | acento, com brilho âmbar em `rgba(255,85,0,0.15)` |
| `chalk` / `mist` / `ash` | `#f5f5f7` / `#8b8f9c` / `#5b5f6b` | hierarquia de texto |

Tipografia: **Plus Jakarta Sans** nos títulos (peso 700/800, `tracking-tight`)
e **JetBrains Mono** nas etiquetas — `text-xs`, caixa alta e `tracking-widest`,
sempre no formato `[ 01 // SOBRE ]`.

### Interações

- **Smooth scroll inercial** (Lenis) aplicado no componente raiz, inclusive nos links âncora.
- **Kinetic text reveal**: no Hero e nos H2, cada palavra sobe de um container com `overflow-hidden` usando mola (`stiffness: 100, damping: 20`).
- **Spotlight cards**: os cards leem a posição do mouse e desenham um gradiente radial laranja que acompanha o cursor e acende a borda de 1px.
- **Botões magnéticos**: os CTAs são atraídos pelo cursor quando ele chega perto, com o conteúdo interno se deslocando um pouco mais que a casca.
- **Navbar**: glassmorphism, seção ativa marcada em laranja via `IntersectionObserver` e barra de progresso de leitura.
- **Grão**: camada fixa de ruído a 3% de opacidade sobre a página inteira.

Quem tem *reduzir movimento* ligado no sistema não recebe o scroll inercial —
a página cai no comportamento nativo do navegador.

---



O Worker local usa um banco D1 simulado (`--remote` acessa o banco de produção). É necessário um arquivo `worker/.dev.vars` (não versionado) com as variáveis `ADMIN_SALT`, `ADMIN_HASH` e `JWT_SECRET`.

---

