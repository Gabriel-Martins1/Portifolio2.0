import { useEffect, useState } from "react";

const API_URL = "https://portfolio-worker.gabrielzinnskk.workers.dev/api/projetos";

function useProjects() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarProjetos() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Falha ao buscar projetos");
        const dados = await resposta.json();
        setProjetos(dados);
      } catch (e) {
        setErro("Não foi possível carregar os projetos no momento.");
      } finally {
        setCarregando(false);
      }
    }

    buscarProjetos();
  }, []);

  return { projetos, carregando, erro };
}

export default useProjects;