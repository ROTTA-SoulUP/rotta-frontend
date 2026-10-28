import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErroEmail("");
    setErroSenha("");

    let temErro = false;

    if (!email) {
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

    if (!temErro) {
      navigate("/home");
    }
  };

  return (
    <div className="flex h-dvh w-full flex-col overflow-x-hidden md:flex-row">
      <aside className="h-64 w-full shrink-0 overflow-hidden bg-verde md:h-full md:w-1/2">
        <img
          src="../../images/img01-login.jpeg"
          alt="Imagem ilustrativa Rotta"
          className="block h-full w-full object-cover"
        />
      </aside>

      <main className="flex min-h-0 w-full flex-1 items-center justify-center overflow-y-auto bg-fundo px-6 py-8 md:h-full md:w-1/2 md:flex-none md:px-10 md:py-12">
        <div className="w-full max-w-md">
          <h1 className="mb-8 text-3xl font-bold text-creme">
            Bem-Vindo a ROTTA
          </h1>

          <h2 className="mb-8 text-3xl font-bold text-creme">Login</h2>

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
                className="w-full rounded-lg border border-borda bg-fundo-card py-3 pl-5 pr-4 text-creme transition-colors focus:border-verde-claro focus:outline-none"
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
                  className="w-full rounded-lg border border-borda bg-fundo-card py-3 pl-5 pr-12 text-creme transition-colors focus:border-verde-claro focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-creme/50 transition-colors hover:text-creme"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
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

            <div className="mb-6 flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-creme">
                <input
                  type="checkbox"
                  id="lembrar"
                  name="lembrar"
                  className="accent-verde-claro"
                />
                <span>Remember me</span>
              </label>

              <a
                href="#"
                className="text-sm text-verde-claro hover:underline"
              >
                Esqueceu a Senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-verde py-3 font-semibold text-fundo transition-colors hover:bg-verde-claro"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}