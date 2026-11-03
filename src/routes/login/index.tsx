
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fazerLogin } from "../../services/auth";

export default function Login() {
  const navigate = useNavigate();

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (carregando) return;

    setErroEmail("");
    setErroSenha("");
    setErroLogin("");

    let temErro = false;

    if (!email.trim()) {
      setErroEmail("Digite um e-mail.");
      temErro = true;
    } else if (!email.includes("@")) {
      setErroEmail("Digite um e-mail válido.");
      temErro = true;
    }

    if (!senha) {
      setErroSenha("Digite uma senha.");
      temErro = true;
    } else if (senha.length < 4) {
      setErroSenha("A senha deve ter pelo menos 4 caracteres.");
      temErro = true;
    }

    if (temErro) return;

    try {
      setCarregando(true);

      const usuario = await fazerLogin(email, senha);

      localStorage.setItem("rotta_usuario", JSON.stringify(usuario));

      navigate("/home");
    } catch (erro) {
      setErroLogin(
        erro instanceof Error
          ? erro.message
          : "Não foi possível realizar o login."
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-fundo">

      <div className="flex min-h-dvh flex-col md:flex-row">

        <aside className="hidden overflow-hidden bg-verde md:flex md:h-dvh md:w-1/2 md:items-center md:justify-center">
          <img
            src="../../images/img01-login.jpeg"
            alt="Imagem ilustrativa Rotta"
            className="h-full w-full object-cover"
          />
        </aside>

        <main className="flex min-h-dvh w-full flex-1 items-center justify-center bg-fundo px-6 py-10 sm:px-10 md:min-h-dvh md:w-1/2 md:px-8 lg:px-12">

          <div className="w-full max-w-md">

            <div className="mb-10">
              <p className="mb-3 text-sm font-medium tracking-widest text-verde-claro">
                SUA JORNADA COMEÇA AQUI
              </p>

              <h1 className="mb-3 text-3xl font-bold text-creme sm:text-4xl">
                Bem-vindo à ROTTA
              </h1>

              <p className="text-sm leading-relaxed text-creme/60">
                Acesse sua conta e continue sua jornada por uma mobilidade
                mais sustentável.
              </p>
            </div>

            <h2 className="mb-6 text-2xl font-bold text-creme">
              Login
            </h2>

            <form onSubmit={handleSubmit} noValidate>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-creme"
                >
                  Email ou Username
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="alexandre@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  disabled={carregando}
                  className="w-full rounded-lg border border-borda bg-fundo-card px-5 py-3 text-creme transition-colors placeholder:text-creme/40 focus:border-verde-claro focus:outline-none"
                />

                {erroEmail && (
                  <span className="mt-1 block text-xs text-red-400">
                    {erroEmail}
                  </span>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="senha"
                  className="mb-2 block text-sm text-creme"
                >
                  Senha
                </label>

                <div className="relative">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    id="senha"
                    name="senha"
                    placeholder="Ex: SantaRosa"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    autoComplete="current-password"
                    disabled={carregando}
                    className="w-full rounded-lg border border-borda bg-fundo-card py-3 pl-5 pr-20 text-creme transition-colors placeholder:text-creme/40 focus:border-verde-claro focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-creme/50 transition-colors hover:text-creme"
                    aria-label={
                      mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                    }
                    disabled={carregando}
                  >
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>

                {erroSenha && (
                  <span className="mt-1 block text-xs text-red-400">
                    {erroSenha}
                  </span>
                )}
              </div>

              {erroLogin && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="mb-4 text-sm text-red-400"
                >
                  {erroLogin}
                </p>
              )}

              <div className="mb-7 flex items-center justify-between gap-3">

                <label className="flex cursor-pointer items-center gap-2 text-sm text-creme">
                  <input
                    type="checkbox"
                    id="lembrar"
                    name="lembrar"
                    className="accent-verde-claro"
                  />
                  <span>Remember me</span>
                </label>

                <Link
                  to="/recuperar-senha"
                  className="text-sm text-verde-claro hover:underline"
                >
                  Redefinir senha
                </Link>

              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-lg bg-verde py-3 font-semibold text-fundo transition-colors hover:bg-verde-claro disabled:cursor-not-allowed disabled:opacity-60"
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>

            </form>

            <p className="mt-8 text-center text-sm text-creme/80">
              Ainda não tem uma conta?{" "}
              <Link
                to="/cadastro"
                className="font-semibold text-verde-claro hover:underline"
              >
                Criar conta
              </Link>
            </p>

            <p className="mt-12 text-center text-xs text-creme/30 md:hidden">
              ROTTA · Seu caminho, nossa rotta.
            </p>

          </div>
        </main>
      </div>
    </div>
  );
}
