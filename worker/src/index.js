// worker/src/index.js — Worker do portfólio (D1 + R2 + login admin)

const LIMITE_SEGURANCA_BYTES = 9 * 1024 * 1024 * 1024; // 9GB (folga de 1GB do limite grátis de 10GB)
const TAMANHO_MAX_ARQUIVO = 50 * 1024 * 1024; // 50MB por arquivo

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const method = request.method;

    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders() });

    // ---------- Rotas públicas ----------
    if (pathname === "/api/projetos" && method === "GET") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM projetos ORDER BY criado_em DESC"
      ).all();
      return json(results);
    }

    if (pathname === "/api/login" && method === "POST") {
      return login(request, env);
    }

    // ---------- A partir daqui, exige token válido ----------
    const rotaProtegida =
      (pathname === "/api/projetos" && method === "POST") ||
      (pathname.startsWith("/api/projetos/") && (method === "PUT" || method === "DELETE")) ||
      (pathname === "/api/upload" && method === "POST");

    if (rotaProtegida) {
      const autorizado = await validarToken(request, env);
      if (!autorizado) return json({ erro: "Não autorizado" }, 401);
    }

    if (pathname === "/api/projetos" && method === "POST") {
      return criarProjeto(request, env);
    }

    if (pathname.startsWith("/api/projetos/") && method === "PUT") {
      const id = pathname.split("/")[3];
      return editarProjeto(id, request, env);
    }

    if (pathname.startsWith("/api/projetos/") && method === "DELETE") {
      const id = pathname.split("/")[3];
      return deletarProjeto(id, env);
    }

    if (pathname === "/api/upload" && method === "POST") {
      return handleUpload(request, env);
    }

    return json({ erro: "Rota não encontrada" }, 404);
  }
};

// ---------------- Projetos (CRUD) ----------------

async function criarProjeto(request, env) {
  const d = await request.json();
  const erro = validarProjeto(d);
  if (erro) return json(erro.body, erro.status);

  const r = await env.DB.prepare(
    `INSERT INTO projetos (titulo, descricao, stack, link_repo, link_demo, imagem_url, video_url, arquivo_url, arquivo_tipo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    d.titulo, d.descricao, d.stack, d.link_repo,
    d.link_demo || null, d.imagem_url || null, d.video_url || null,
    d.arquivo_url || null, d.arquivo_tipo || null
  ).run();

  return json({ sucesso: true, id: r.meta.last_row_id }, 201);
}

async function editarProjeto(id, request, env) {
  const d = await request.json();
  const erro = validarProjeto(d);
  if (erro) return json(erro.body, erro.status);

  const existente = await env.DB.prepare("SELECT id FROM projetos WHERE id = ?").bind(id).first();
  if (!existente) return json({ erro: "Projeto não encontrado" }, 404);

  await env.DB.prepare(
    `UPDATE projetos SET titulo=?, descricao=?, stack=?, link_repo=?, link_demo=?, imagem_url=?, video_url=?, arquivo_url=?, arquivo_tipo=? WHERE id=?`
  ).bind(
    d.titulo, d.descricao, d.stack, d.link_repo,
    d.link_demo || null, d.imagem_url || null, d.video_url || null,
    d.arquivo_url || null, d.arquivo_tipo || null, id
  ).run();

  return json({ sucesso: true });
}

async function deletarProjeto(id, env) {
  const existente = await env.DB.prepare("SELECT id FROM projetos WHERE id = ?").bind(id).first();
  if (!existente) return json({ erro: "Projeto não encontrado" }, 404);

  await env.DB.prepare("DELETE FROM projetos WHERE id = ?").bind(id).run();
  return json({ sucesso: true });
}

function validarProjeto(d) {
  if (!d.titulo || d.titulo.trim() === "")
    return { status: 400, body: { erro: "Título é obrigatório" } };
  if (!d.descricao || d.descricao.trim() === "")
    return { status: 400, body: { erro: "Descrição é obrigatória" } };
  if (!d.stack || d.stack.trim() === "")
    return { status: 400, body: { erro: "Stack é obrigatória" } };
  if (!validarLink(d.link_repo) || !d.link_repo)
    return { status: 400, body: { erro: "Link do repositório inválido ou ausente" } };
  if (d.link_demo && !validarLink(d.link_demo))
    return { status: 400, body: { erro: "Link de demo inválido" } };
  if (d.imagem_url && !validarLinkOuCaminhoLocal(d.imagem_url))
    return { status: 400, body: { erro: "Link de imagem inválido" } };
  if (d.video_url && !validarLink(d.video_url))
    return { status: 400, body: { erro: "Link de vídeo inválido" } };
  if (d.arquivo_url && !validarLink(d.arquivo_url))
    return { status: 400, body: { erro: "Link de arquivo inválido" } };
  return null;
}

// Só aceita http(s) — bloqueia javascript:, data:, etc (proteção contra XSS via link)
function validarLink(url) {
  if (!url) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

// Imagens podem ser um link http(s) OU um caminho local tipo /projetos/foo.png
function validarLinkOuCaminhoLocal(url) {
  if (!url) return true;
  if (url.startsWith("/")) return true;
  return validarLink(url);
}

// ---------------- Upload (R2 + limite de armazenamento) ----------------

async function handleUpload(request, env) {
  const formData = await request.formData();
  const arquivo = formData.get("arquivo");

  if (!arquivo) return json({ erro: "Nenhum arquivo enviado" }, 400);

  if (arquivo.size > TAMANHO_MAX_ARQUIVO) {
    return json({ erro: "Arquivo muito grande. Máximo de 50MB." }, 413);
  }

  const controle = await env.DB.prepare(
    "SELECT bytes_usados FROM controle_armazenamento WHERE id = 1"
  ).first();

  if (controle.bytes_usados + arquivo.size > LIMITE_SEGURANCA_BYTES) {
    return json({ erro: "Limite de armazenamento seguro atingido. Upload bloqueado." }, 507);
  }

  const nomeArquivo = `${Date.now()}-${arquivo.name}`;
  await env.BUCKET.put(nomeArquivo, arquivo.stream());

  await env.DB.prepare(
    "UPDATE controle_armazenamento SET bytes_usados = bytes_usados + ? WHERE id = 1"
  ).bind(arquivo.size).run();

  return json({
    url: `${env.R2_PUBLIC_URL}/${nomeArquivo}`,
    nomeArquivo,
    tamanho: arquivo.size
  });
}

// ---------------- Login / autenticação ----------------

async function login(request, env) {
  const { senha } = await request.json();
  if (!senha) return json({ erro: "Senha é obrigatória" }, 400);

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(senha), "PBKDF2", false, ["deriveBits"]
  );
  const hashBuffer = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(env.ADMIN_SALT), iterations: 100000, hash: "SHA-512" },
    key, 512
  );
  const hashCalculado = [...new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2, "0")).join("");

  if (hashCalculado !== env.ADMIN_HASH) {
    return json({ erro: "Senha incorreta" }, 401);
  }

  const token = await gerarToken(env.JWT_SECRET);
  return json({ token });
}

async function gerarToken(secret) {
  const payload = { exp: Date.now() + 1000 * 60 * 60 * 4 }; // expira em 4h
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const payloadStr = JSON.stringify(payload);
  const assinatura = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadStr));
  const assinaturaHex = [...new Uint8Array(assinatura)]
    .map(b => b.toString(16).padStart(2, "0")).join("");
  return btoa(payloadStr) + "." + assinaturaHex;
}

async function validarToken(request, env) {
  const auth = request.headers.get("Authorization");
  if (!auth) return false;

  const token = auth.replace("Bearer ", "");
  const [payloadB64, assinatura] = token.split(".");
  if (!payloadB64 || !assinatura) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(env.JWT_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const assinaturaEsperada = await crypto.subtle.sign("HMAC", key, encoder.encode(atob(payloadB64)));
  const assinaturaHex = [...new Uint8Array(assinaturaEsperada)]
    .map(b => b.toString(16).padStart(2, "0")).join("");

  if (assinaturaHex !== assinatura) return false;

  const payload = JSON.parse(atob(payloadB64));
  return payload.exp > Date.now();
}

// ---------------- Helpers ----------------

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() }
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
}