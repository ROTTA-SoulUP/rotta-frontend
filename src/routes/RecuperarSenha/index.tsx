
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  verificarEmailRecuperacao,
  redefinirSenha,
} from "../../services/auth";

export default function RecuperarSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [etapa, setEtapa] = useState(1);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const requisicaoEmAndamento = useRef(false);

  async function handleVerificarEmail() {
    setErro("");

    if (!email.trim()) {
      setErro("Digite seu e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (requisicaoEmAndamento.current) {
      return;
    }

    requisicaoEmAndamento.current = true;

    try {
      setCarregando(true);

      await verificarEmailRecuperacao(email);

      setEtapa(2);
    } catch (erro) {
      setErro(
        erro instanceof Error
          ? erro.message
          : "Não foi possível verificar o e-mail."
      );
    } finally {
      requisicaoEmAndamento.current = false;
      setCarregando(false);
    }
  }

  async function handleRedefinirSenha() {
    setErro("");

    if (!senha || !confirmarSenha) {
      setErro("Preencha os dois campos de senha.");
      return;
    }

    if (senha.length < 4) {
      setErro("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (requisicaoEmAndamento.current) {
      return;
    }

    requisicaoEmAndamento.current = true;

    try {
      setCarregando(true);

      await redefinirSenha(email, senha);

      setEtapa(3);
    } catch (erro) {
      setErro(
        erro instanceof Error
          ? erro.message
          : "Não foi possível redefinir a senha."
      );
    } finally {
      requisicaoEmAndamento.current = false;
      setCarregando(false);
    }
  }

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

            {etapa !== 3 && (
              <div className="mb-10">
                <p className="mb-3 text-sm font-medium tracking-widest text-verde-claro">
                  RECUPERAÇÃO DE ACESSO
                </p>

                <h1 className="mb-3 text-3xl font-bold text-creme sm:text-4xl">
                  Redefinir senha
                </h1>

              </div>
            )}

            {etapa === 1 && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-creme">
                  Informe seu e-mail
                </h2>

                <p className="mb-8 leading-relaxed text-creme/75">
                  Informe o e-mail utilizado na sua conta para continuar
                  com a redefinição da sua senha.
                </p>

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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErro("");
                    }}
                    placeholder="seuemail@exemplo.com"
                    disabled={carregando}
                    className="w-full rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
                  />
                </div>

                {erro && (
                  <p role="alert" className="mb-4 text-sm text-red-400">
                    {erro}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleVerificarEmail}
                  disabled={carregando}
                  className="w-full rounded-lg bg-verde py-3 font-semibold text-fundo transition-colors hover:bg-verde-claro disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {carregando ? "Verificando..." : "Continuar"}
                </button>
              </>
            )}

            {etapa === 2 && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-creme">
                  Crie uma nova senha
                </h2>

                <p className="mb-8 leading-relaxed text-creme/75">
                  Crie uma nova senha para acessar sua conta.
                </p>

                <div className="mb-5">
                  <label
                    htmlFor="nova-senha"
                    className="mb-2 block text-sm text-creme"
                  >
                    Nova senha
                  </label>

                  <input
                    id="nova-senha"
                    name="novaSenha"
                    type={mostrarSenha ? "text" : "password"}
                    autoComplete="new-password"
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                      setErro("");
                    }}
                    placeholder="Digite sua nova senha"
                    disabled={carregando}
                    className="w-full appearance-none rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="confirmar-senha"
                    className="mb-2 block text-sm text-creme"
                  >
                    Confirmar nova senha
                  </label>

                  <input
                    id="confirmar-senha"
                    name="confirmarSenha"
                    type={mostrarSenha ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmarSenha}
                    onChange={(e) => {
                      setConfirmarSenha(e.target.value);
                      setErro("");
                    }}
                    placeholder="Digite novamente sua senha"
                    disabled={carregando}
                    className="w-full appearance-none rounded-lg border border-borda bg-fundo-card px-4 py-3 text-creme placeholder:text-creme/50 focus:border-verde-claro focus:outline-none"
                  />
                </div>

                <label className="mb-5 flex cursor-pointer items-center gap-2 text-sm text-creme/80">
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

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setErro("");
                      setEtapa(1);
                    }}
                    disabled={carregando}
                    className="w-full rounded-lg border border-borda py-3 font-semibold text-creme transition-colors hover:bg-fundo-card disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Voltar
                  </button>

                  <button
                    type="button"
                    onClick={handleRedefinirSenha}
                    disabled={carregando}
                    className="w-full rounded-lg bg-verde py-3 font-semibold text-fundo transition-colors hover:bg-verde-claro disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {carregando ? "Redefinindo..." : "Redefinir senha"}
                  </button>
                </div>
              </>
            )}

            {etapa === 3 && (
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-verde">
                    <span className="text-3xl text-creme">✓</span>
                  </div>
                </div>

                <p className="mb-3 text-sm font-medium tracking-widest text-verde-claro">
                  TUDO CERTO!
                </p>

                <h2 className="mb-4 text-2xl font-bold text-creme">
                  Senha redefinida!
                </h2>

                <p className="mb-8 leading-relaxed text-creme/75">
                  Sua senha foi atualizada. Agora você pode voltar à tela
                  de login.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-full rounded-lg bg-verde py-3 font-semibold text-fundo transition-colors hover:bg-verde-claro"
                >
                  Ir para o login
                </button>
              </div>
            )}

            {etapa !== 3 && (
              <p className="mt-8 text-center text-sm text-creme/80">
                Lembrou sua senha?{" "}
                <Link
                  to="/"
                  className="font-semibold text-verde-claro hover:underline"
                >
                  Voltar ao login
                </Link>
              </p>
            )}

            <p className="mt-12 text-center text-xs text-creme/30 md:hidden">
              ROTTA · Seu caminho, nossa rotta.
            </p>

          </div>
        </main>
      </div>
    </div>
  );
}
