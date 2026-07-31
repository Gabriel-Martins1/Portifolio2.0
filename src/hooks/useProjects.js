import { useEffect, useState } from "react";

const API_URL =
  "https://portfolio-worker.gabrielzinnskk.workers.dev/api/projetos";

function useProjects() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    fetch(API_URL)
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Falha ao buscar projetos");
        return resposta.json();
      })
      .then((dados) => {
        if (ativo) setProjetos(Array.isArray(dados) ? dados : []);
      })
      .catch(() => {
        if (ativo) setErro("Não foi possível carregar os projetos no momento.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  return { projetos, carregando, erro };
}

export default useProjects;
