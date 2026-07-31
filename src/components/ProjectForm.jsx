import { useState } from "react";
import { Check, Upload } from "lucide-react";
import Button from "./Button";

const CAMPOS_VAZIOS = {
  titulo: "",
  descricao: "",
  stack: "",
  link_repo: "",
  link_demo: "",
  imagem_url: "",
  video_url: "",
  arquivo_url: "",
  arquivo_tipo: "",
};

const UPLOAD_URL =
  "https://portfolio-worker.gabrielzinnskk.workers.dev/api/upload";

const CAMPO =
  "w-full rounded-xl border border-hairline bg-ink px-4 py-2.5 text-sm text-chalk placeholder:text-ash transition-colors duration-300 focus:border-flame/50 focus:outline-none";

function Campo({ rotulo, children, dica }) {
  return (
    <label className="block">
      <span className="mono-label mb-2 block text-ash">{rotulo}</span>
      {children}
      {dica && <span className="mt-1.5 block text-xs text-ash">{dica}</span>}
    </label>
  );
}

/**
 * O Admin remonta este formulário via `key` ao trocar de projeto,
 * então o estado inicial já nasce certo — sem efeito de sincronização.
 */
function ProjectForm({ projetoEditando, onSalvar, onCancelar, token }) {
  const [dados, setDados] = useState(() =>
    projetoEditando ? { ...CAMPOS_VAZIOS, ...projetoEditando } : CAMPOS_VAZIOS
  );
  const [enviandoImagem, setEnviandoImagem] = useState(false);
  const [enviandoArquivo, setEnviandoArquivo] = useState(false);
  const [erroUpload, setErroUpload] = useState(null);

  function handleChange(evento) {
    setDados({ ...dados, [evento.target.name]: evento.target.value });
  }

  async function handleUpload(evento, campoDestino) {
    const arquivo = evento.target.files[0];
    if (!arquivo) return;

    setErroUpload(null);
    const setEnviando =
      campoDestino === "imagem_url" ? setEnviandoImagem : setEnviandoArquivo;
    setEnviando(true);

    try {
      const formData = new FormData();
      formData.append("arquivo", arquivo);

      const resposta = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const resultado = await resposta.json();

      if (!resposta.ok) {
        setErroUpload(resultado.erro || "Erro ao enviar arquivo");
        return;
      }

      setDados((anterior) => ({
        ...anterior,
        [campoDestino]: resultado.url,
        ...(campoDestino === "arquivo_url"
          ? { arquivo_tipo: arquivo.name.split(".").pop().toUpperCase() }
          : {}),
      }));
    } catch {
      setErroUpload("Erro ao enviar arquivo.");
    } finally {
      setEnviando(false);
    }
  }

  function handleSubmit(evento) {
    evento.preventDefault();
    onSalvar(dados);
  }

  const enviando = enviandoImagem || enviandoArquivo;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-hairline bg-surface/60 p-6 backdrop-blur-xl sm:p-8"
    >
      <h2 className="text-lg font-bold tracking-tight">
        {projetoEditando ? "Editar projeto" : "Novo projeto"}
      </h2>

      <Campo rotulo="Título">
        <input
          name="titulo"
          value={dados.titulo}
          onChange={handleChange}
          required
          className={CAMPO}
        />
      </Campo>

      <Campo rotulo="Descrição">
        <textarea
          name="descricao"
          value={dados.descricao}
          onChange={handleChange}
          required
          rows={3}
          className={`${CAMPO} resize-y`}
        />
      </Campo>

      <Campo rotulo="Stack" dica="Separe por vírgula — vira as tags do card.">
        <input
          name="stack"
          value={dados.stack}
          onChange={handleChange}
          required
          placeholder="React, Node.js, PostgreSQL"
          className={CAMPO}
        />
      </Campo>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo rotulo="Repositório">
          <input
            name="link_repo"
            value={dados.link_repo}
            onChange={handleChange}
            required
            className={CAMPO}
          />
        </Campo>

        <Campo rotulo="Demo (opcional)">
          <input
            name="link_demo"
            value={dados.link_demo}
            onChange={handleChange}
            className={CAMPO}
          />
        </Campo>
      </div>

      <Campo rotulo="Imagem do projeto (opcional)">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-hairline-2 bg-ink px-4 py-3 text-sm text-mist transition-colors duration-300 hover:border-flame/50 hover:text-chalk">
          <Upload className="size-4 shrink-0" strokeWidth={1.8} />
          <span>
            {enviandoImagem ? "Enviando imagem..." : "Escolher imagem"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(evento) => handleUpload(evento, "imagem_url")}
            className="sr-only"
          />
        </label>
        {dados.imagem_url && (
          <span className="mt-2 flex items-center gap-1.5 text-xs text-flame">
            <Check className="size-3.5" strokeWidth={2.2} />
            {dados.imagem_url.split("/").pop()}
          </span>
        )}
      </Campo>

      <Campo rotulo="URL do vídeo (opcional)">
        <input
          name="video_url"
          value={dados.video_url}
          onChange={handleChange}
          className={CAMPO}
        />
      </Campo>

      <Campo rotulo="Arquivo — APK/instalador (opcional)">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-hairline-2 bg-ink px-4 py-3 text-sm text-mist transition-colors duration-300 hover:border-flame/50 hover:text-chalk">
          <Upload className="size-4 shrink-0" strokeWidth={1.8} />
          <span>
            {enviandoArquivo ? "Enviando arquivo..." : "Escolher arquivo"}
          </span>
          <input
            type="file"
            onChange={(evento) => handleUpload(evento, "arquivo_url")}
            className="sr-only"
          />
        </label>
        {dados.arquivo_url && (
          <span className="mt-2 flex items-center gap-1.5 text-xs text-flame">
            <Check className="size-3.5" strokeWidth={2.2} />
            {dados.arquivo_url.split("/").pop()}
          </span>
        )}
      </Campo>

      {erroUpload && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-2.5 text-sm text-red-300">
          {erroUpload}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={enviando}>
          Salvar
        </Button>
        {projetoEditando && (
          <Button type="button" variant="secondary" onClick={onCancelar}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
