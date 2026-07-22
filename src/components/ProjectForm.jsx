import { useState, useEffect } from "react";
import Button from "./Button";

const CAMPOS_VAZIOS = {
  titulo: "", descricao: "", stack: "", link_repo: "",
  link_demo: "", imagem_url: "", video_url: "", arquivo_url: "", arquivo_tipo: "",
};

const UPLOAD_URL = "https://portfolio-worker.gabrielzinnskk.workers.dev/api/upload";

function ProjectForm({ projetoEditando, onSalvar, onCancelar, token }) {
  const [dados, setDados] = useState(CAMPOS_VAZIOS);
  const [enviandoImagem, setEnviandoImagem] = useState(false);
  const [enviandoArquivo, setEnviandoArquivo] = useState(false);
  const [erroUpload, setErroUpload] = useState(null);

  useEffect(() => {
    setDados(projetoEditando ? { ...CAMPOS_VAZIOS, ...projetoEditando } : CAMPOS_VAZIOS);
  }, [projetoEditando]);

  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  async function handleUpload(e, campoDestino) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    setErroUpload(null);
    const setEnviando = campoDestino === "imagem_url" ? setEnviandoImagem : setEnviandoArquivo;
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

      setDados((prev) => ({
        ...prev,
        [campoDestino]: resultado.url,
        ...(campoDestino === "arquivo_url" ? { arquivo_tipo: arquivo.name.split(".").pop().toUpperCase() } : {}),
      }));
    } catch (e) {
      setErroUpload("Erro ao enviar arquivo.");
    } finally {
      setEnviando(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar(dados);
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>{projetoEditando ? "Editar projeto" : "Novo projeto"}</h3>

      <label>Título</label>
      <input name="titulo" value={dados.titulo} onChange={handleChange} required />

      <label>Descrição</label>
      <textarea name="descricao" value={dados.descricao} onChange={handleChange} required rows={3} />

      <label>Stack (separado por vírgula)</label>
      <input name="stack" value={dados.stack} onChange={handleChange} required />

      <label>Link do repositório</label>
      <input name="link_repo" value={dados.link_repo} onChange={handleChange} required />

      <label>Link de demo (opcional)</label>
      <input name="link_demo" value={dados.link_demo} onChange={handleChange} />

      <label>Imagem do projeto (opcional)</label>
      <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "imagem_url")} />
      {enviandoImagem && <p className="upload-status">Enviando imagem...</p>}
      {dados.imagem_url && <p className="upload-status">✓ {dados.imagem_url.split("/").pop()}</p>}

      <label>URL do vídeo (opcional)</label>
      <input name="video_url" value={dados.video_url} onChange={handleChange} />

      <label>Arquivo do projeto — APK/instalador (opcional)</label>
      <input type="file" onChange={(e) => handleUpload(e, "arquivo_url")} />
      {enviandoArquivo && <p className="upload-status">Enviando arquivo...</p>}
      {dados.arquivo_url && <p className="upload-status">✓ {dados.arquivo_url.split("/").pop()}</p>}

      {erroUpload && <p className="erro">{erroUpload}</p>}

      <div className="project-form-actions">
        <Button type="submit" variant="primary" disabled={enviandoImagem || enviandoArquivo}>
          Salvar
        </Button>
        {projetoEditando && <Button type="button" variant="secondary" onClick={onCancelar}>Cancelar</Button>}
      </div>
    </form>
  );
}

export default ProjectForm;