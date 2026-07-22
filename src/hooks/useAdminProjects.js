import { useEffect, useState } from "react";

const API_URL = "https://portfolio-worker.gabrielzinnskk.workers.dev/api/projetos";

function useAdminProjects(token) {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function buscarProjetos() {
    setCarregando(true);
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();
      setProjetos(dados);
    } catch (e) {
      setErro("Erro ao carregar projetos.");
    } finally {
      setCarregando(false);
    }
  }

  async function criarProjeto(dadosProjeto) {
    setErro(null);
    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(dadosProjeto),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        setErro(dados.erro);
        return false;
      }
      await buscarProjetos();
      return true;
    } catch (e) {
      setErro("Erro ao criar projeto.");
      return false;
    }
  }

  async function editarProjeto(id, dadosProjeto) {
    setErro(null);
    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(dadosProjeto),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        setErro(dados.erro);
        return false;
      }
      await buscarProjetos();
      return true;
    } catch (e) {
      setErro("Erro ao editar projeto.");
      return false;
    }
  }

  async function deletarProjeto(id) {
    setErro(null);
    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        setErro(dados.erro);
        return false;
      }
      await buscarProjetos();
      return true;
    } catch (e) {
      setErro("Erro ao excluir projeto.");
      return false;
    }
  }

  useEffect(() => {
    buscarProjetos();
  }, []);

  return { projetos, carregando, erro, criarProjeto, editarProjeto, deletarProjeto };
}

export default useAdminProjects;