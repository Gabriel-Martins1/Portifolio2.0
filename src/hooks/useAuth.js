import { useState } from "react";

const API_URL = "https://portfolio-worker.gabrielzinnskk.workers.dev/api/login";

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function login(senha) {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });
      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro || "Erro ao entrar");
        return false;
      }

      localStorage.setItem("admin_token", dados.token);
      setToken(dados.token);
      return true;
    } catch (e) {
      setErro("Erro ao conectar com o servidor.");
      return false;
    } finally {
      setCarregando(false);
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken(null);
  }

  return { token, login, logout, erro, carregando, autenticado: !!token };
}

export default useAuth;