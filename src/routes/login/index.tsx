import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    if (carregando) {
      return;
    }

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

    if (temErro) {
      return;
    }

    try {
      setCarregando(true);

      await fazerLogin(email, senha);

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
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="md:w-1/2 h-64 md:h-full overflow-hidden flex items-center justify-center bg-verde">
          <img
            src="../../images/img01-login.jpeg"
            alt="Imagem ilustrativa Rotta"
            className="full h-full object-cover"
          />
        </aside>

        <main className="md:w-1/2 flex items-center justify-center px-6 py-12 bg-fundo">
          <div className="w-full max-w-md">
            <h1 className="text-creme text-3xl items-start font-bold mb-8">
              Bem-Vindo a ROTTA
            </h1>

            <h2 className="text-creme text-3xl font-bold mb-8">
              Login
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-creme text-sm mb-2"
                >
                  Email ou Username
                </label>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="teste123@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    disabled={carregando}
                    className="w-full bg-fundo-card border border-borda text-creme rounded-lg pl-5 pr-4 py-3 focus:outline-none focus:border-verde-claro transition-colors"
                  />
                </div>

                {erroEmail && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {erroEmail}
                  </span>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="senha"
                  className="block text-creme text-sm mb-2"
                >
                  Senha
                </label>

                <div className="relative">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    id="senha"
                    name="senha"
                    placeholder="Ex: Teste123"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    autoComplete="current-password"
                    disabled={carregando}
                    className="w-full bg-fundo-card border border-borda text-creme rounded-lg pl-5 pr-12 py-3 focus:outline-none focus:border-verde-claro transition-colors"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-creme/50 hover:text-creme transition-colors"
                    aria-label={
                      mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                    }
                    disabled={carregando}
                  >
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>

                {erroSenha && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {erroSenha}
                  </span>
                )}
              </div>

              {erroLogin && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="text-red-400 text-sm mb-4"
                >
                  {erroLogin}
                </p>
              )}

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 text-creme text-sm cursor-pointer">
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
                  onClick={(e) => e.preventDefault()}
                  className="text-verde-claro text-sm hover:underline"
                >
                  Esqueceu a Senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-verde text-fundo font-semibold rounded-lg py-3 hover:bg-verde-claro transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
