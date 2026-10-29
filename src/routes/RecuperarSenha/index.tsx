
import { useState, type FormEvent } from "react";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (!email.trim()) {
      setErro("Digite seu e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    setMensagem(
      "E-mail validado! O envio do link de recuperação estará disponível quando a API estiver integrada."
    );
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

      <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 md:min-h-dvh md:w-1/2 md:px-10">
        <div className="w-full max-w-md">
          <p className="mb-2 text-sm font-medium text-verde-claro">
            Recuperação de acesso
          </p>

          <h1 className="mb-4 text-3xl font-bold text-creme">
            Esqueceu sua senha?
          </h1>

          <p className="mb-8 leading-relaxed text-creme/75">
            Não se preocupe! Informe o e-mail utilizado na sua conta.
            Quando a recuperação estiver integrada, você poderá receber
            as instruções para redefinir sua senha.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label
                htmlFor="email-recuperacao"
                className="mb-2 block text-sm text-creme"
              >
                E-mail cadastrado
              </label>

              <input
                id="email-recuperacao"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
              />
            </div>

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
              className="w-full rounded-lg bg-verde py-3 font-semibold text-fundo transition-colors hover:bg-verde-claro"
            >
              Recuperar senha
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
