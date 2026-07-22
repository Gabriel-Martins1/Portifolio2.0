import { useState } from "react";
import Button from "../components/Button";

function LoginAdmin({ onLogin, erro, carregando }) {
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(senha);
  }

  return (
    <section className="admin-login">
      <form onSubmit={handleSubmit}>
        <h2>Área administrativa</h2>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoFocus
        />
        {erro && <p className="erro">{erro}</p>}
        <Button type="submit" variant="primary">
          {carregando ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </section>
  );
}

export default LoginAdmin;