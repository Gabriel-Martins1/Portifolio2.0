import { useCallback, useEffect, useState } from "react";

const API_URL =
  "https://portfolio-worker.gabrielzinnskk.workers.dev/api/projetos";

function useAdminProjects(token) {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarProjetos = useCallback(async () => {
    setCarregando(true);
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();
      setProjetos(Array.isArray(dados) ? dados : []);
    } catch {
      setErro("Erro ao carregar projetos.");
    } finally {
      setCarregando(false);
    }
  }, []);

  async function criarProjeto(dadosProjeto) {
    setErro(null);
    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dadosProjeto),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        setErro(dados.erro);
        return false;
      }
      await buscarProjetos();
      return true;
    } catch {
      setErro("Erro ao criar projeto.");
      return false;
    }
  }

  async function editarProjeto(id, dadosProjeto) {
    setErro(null);
    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dadosProjeto),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        setErro(dados.erro);
        return false;
      }
      await buscarProjetos();
      return true;
    } catch {
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
    } catch {
      setErro("Erro ao excluir projeto.");
      return false;
    }
  }

  // A primeira carga não passa por setState síncrono: o estado só muda
  // depois que a resposta chega.
  useEffect(() => {
    let ativo = true;

    fetch(API_URL)
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (ativo) setProjetos(Array.isArray(dados) ? dados : []);
      })
      .catch(() => {
        if (ativo) setErro("Erro ao carregar projetos.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  return {
    projetos,
    carregando,
    erro,
    criarProjeto,
    editarProjeto,
    deletarProjeto,
  };
}

export default useAdminProjects;
