CREATE TABLE projetos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  stack TEXT NOT NULL,
  link_repo TEXT NOT NULL,
  link_demo TEXT,
  imagem_url TEXT,
  video_url TEXT,
  arquivo_url TEXT,
  arquivo_tipo TEXT,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE controle_armazenamento (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  bytes_usados INTEGER NOT NULL DEFAULT 0
);
INSERT INTO controle_armazenamento (id, bytes_usados) VALUES (1, 0);
