
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { criarConta } from "../../services/auth";

function formatarCpf(valor: string) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  return numeros
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (carregando) {
      return;
    }

    setErro("");
    setMensagem("");

    if (
      !nome.trim() ||
      !email.trim() ||
      !cpf.trim() ||
      !telefone.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (cpf.replace(/\D/g, "").length !== 11) {
      setErro("Digite um CPF com 11 números.");
      return;
    }

    if (telefone.replace(/\D/g, "").length < 10) {
      setErro("Digite um telefone válido com DDD.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      setCarregando(true);

      await criarConta({
        nome,
        email,
        cpf: cpf.replace(/\D/g, ""),
        telefone,
        senha,
      });

      setMensagem("Conta criada com sucesso! Redirecionando para o login...");

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (erro) {
      setErro(
        erro instanceof Error
          ? erro.message
          : "Não foi possível criar sua conta."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-dvh w-full flex-col bg-fundo md:flex-row">
      <aside className="relative h-44 shrink-0 overflow-hidden bg-verde sm:h-56 md:h-dvh md:w-1/2">
        <img
          src="/images/img01-login.jpeg"
          alt="Mobilidade sustentável com a Rotta"
          className="h-full w-full object-cover"
        />
      </aside>

      <main className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8 md:min-h-dvh md:w-1/2 md:px-10 md:py-10">
        <div className="w-full max-w-md">
          <p className="mb-2 text-sm font-medium text-verde-claro">
            Faça parte da mudança
          </p>

          <h1 className="mb-2 text-3xl font-bold text-creme">
            Crie sua conta
          </h1>

          <p className="mb-7 text-sm text-creme/70">
            Comece sua jornada por uma mobilidade mais sustentável.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="nome" className="mb-2 block text-sm text-creme">
                Nome completo
              </label>

              <input
                id="nome"
                name="nome"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome completo"
                disabled={carregando}
                className="w-full rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email-cadastro"
                className="mb-2 block text-sm text-creme"
              >
                E-mail
              </label>

              <input
                id="email-cadastro"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                disabled={carregando}
                className="w-full rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
              />
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cpf" className="mb-2 block text-sm text-creme">
                  CPF
                </label>

                <input
                  id="cpf"
                  name="cpf"
                  inputMode="numeric"
                  autoComplete="off"
                  value={cpf}
                  onChange={(e) => setCpf(formatarCpf(e.target.value))}
                  placeholder="Digite seu CPF"
                  maxLength={14}
                  disabled={carregando}
                  className="w-full rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="mb-2 block text-sm text-creme"
                >
                  Telefone
                </label>

                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="DDD + número"
                  maxLength={16}
                  disabled={carregando}
                  className="w-full rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="senha-cadastro"
                className="mb-2 block text-sm text-creme"
              >
                Senha
              </label>

              <input
                id="senha-cadastro"
                name="senha"
                type={mostrarSenha ? "text" : "password"}
                autoComplete="new-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo de 8 caracteres"
                disabled={carregando}
                className="w-full rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="confirmar-senha"
                className="mb-2 block text-sm text-creme"
              >
                Confirmar senha
              </label>

              <input
                id="confirmar-senha"
                name="confirmarSenha"
                type={mostrarSenha ? "text" : "password"}
                autoComplete="new-password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Digite a senha novamente"
                disabled={carregando}
                className="w-full rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
              />
            </div>

            <label className="mb-5 flex cursor-pointer items-center gap-2 text-sm text-creme">
              <input
                type="checkbox"
                checked={mostrarSenha}
                onChange={(e) => setMostrarSenha(e.target.checked)}
                disabled={carregando}
                className="accent-verde-claro"
              />
              Mostrar senhas
            </label>

            {erro && (
              <p role="alert" className="mb-4 text-sm text-red-400">
                {erro}
              </p>
            )}

            {mensagem && (
              <p
                role="status"
                className="mb-4 rounded-lg border border-verde-claro p-3 text-sm text-verde-claro"
              >
                {mensagem}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-lg bg-verde py-3 font-semibold text-fundo transition-colors hover:bg-verde-claro disabled:cursor-not-allowed disabled:opacity-60"
            >
              {carregando ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-creme/80">
            Já tem uma conta?{" "}
            <Link
              to="/"
              className="font-semibold text-verde-claro hover:underline"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
