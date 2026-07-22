import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAdminProjects from "../hooks/useAdminProjects";
import LoginAdmin from "./LoginAdmin";
import ProjectForm from "../components/ProjectForm";
import Button from "../components/Button";

function Admin() {
  const { token, login, logout, erro: erroLogin, carregando: carregandoLogin, autenticado } = useAuth();
  const { projetos, carregando, erro, criarProjeto, editarProjeto, deletarProjeto } = useAdminProjects(token);
  const [projetoEditando, setProjetoEditando] = useState(null);

  if (!autenticado) {
    return <LoginAdmin onLogin={login} erro={erroLogin} carregando={carregandoLogin} />;
  }

  async function handleSalvar(dados) {
    const sucesso = projetoEditando
      ? await editarProjeto(projetoEditando.id, dados)
      : await criarProjeto(dados);
    if (sucesso) setProjetoEditando(null);
  }

  async function handleDeletar(id) {
    if (confirm("Tem certeza que quer excluir esse projeto?")) {
      await deletarProjeto(id);
    }
  }

  return (
    <section className="admin-panel">
      <div className="admin-header">
        <h2>Painel administrativo</h2>
        <Button onClick={logout} variant="secondary">Sair</Button>
      </div>

      {erro && <p className="erro">{erro}</p>}

    <ProjectForm
        projetoEditando={projetoEditando}
        onSalvar={handleSalvar}
        onCancelar={() => setProjetoEditando(null)}
        token={token}
    />

      <h3 style={{ marginTop: 40 }}>Projetos cadastrados</h3>
      {carregando && <p>Carregando...</p>}

      <div className="admin-list">
        {projetos.map((p) => (
          <div key={p.id} className="admin-list-item">
            <span>{p.titulo}</span>
            <div>
              <Button variant="secondary" onClick={() => setProjetoEditando(p)}>Editar</Button>
              <Button variant="secondary" onClick={() => handleDeletar(p.id)}>Excluir</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;