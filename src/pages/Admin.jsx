import { useState } from "react";
import { LogOut, Pencil, Trash2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useAdminProjects from "../hooks/useAdminProjects";
import LoginAdmin from "./LoginAdmin";
import ProjectForm from "../components/ProjectForm";
import Button from "../components/Button";
import MonoLabel from "../components/MonoLabel";

function Admin() {
  const {
    token,
    login,
    logout,
    erro: erroLogin,
    carregando: carregandoLogin,
    autenticado,
  } = useAuth();
  const {
    projetos,
    carregando,
    erro,
    criarProjeto,
    editarProjeto,
    deletarProjeto,
  } = useAdminProjects(token);
  const [projetoEditando, setProjetoEditando] = useState(null);

  if (!autenticado) {
    return (
      <LoginAdmin
        onLogin={login}
        erro={erroLogin}
        carregando={carregandoLogin}
      />
    );
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
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <MonoLabel>Admin</MonoLabel>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
            Painel administrativo
          </h1>
        </div>
        <Button onClick={logout} variant="secondary">
          <LogOut className="size-4" strokeWidth={1.8} />
          Sair
        </Button>
      </header>

      {erro && (
        <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
          {erro}
        </p>
      )}

      <div className="mt-8">
        <ProjectForm
          key={projetoEditando?.id ?? "novo"}
          projetoEditando={projetoEditando}
          onSalvar={handleSalvar}
          onCancelar={() => setProjetoEditando(null)}
          token={token}
        />
      </div>

      <section className="mt-14">
        <div className="flex items-baseline justify-between border-b border-hairline pb-4">
          <h2 className="text-lg font-bold tracking-tight">
            Projetos cadastrados
          </h2>
          <MonoLabel tone="mist">
            {String(projetos.length).padStart(2, "0")}
          </MonoLabel>
        </div>

        {carregando && <p className="mt-6 text-sm text-mist">Carregando...</p>}

        <ul className="mt-4 space-y-2">
          {projetos.map((projeto) => (
            <li
              key={projeto.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface/60 px-5 py-3.5 transition-colors duration-300 hover:border-hairline-2"
            >
              <span className="text-sm font-medium">{projeto.titulo}</span>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setProjetoEditando(projeto)}
                >
                  <Pencil className="size-3.5" strokeWidth={1.8} />
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeletar(projeto.id)}
                >
                  <Trash2 className="size-3.5" strokeWidth={1.8} />
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Admin;
