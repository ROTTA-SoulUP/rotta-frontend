
export default function RecuperarSenha() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-fundo md:flex-row">
      <aside className="relative h-44 shrink-0 overflow-hidden bg-verde sm:h-56 md:h-dvh md:w-1/2">
        <img
          src="/images/img01-login.jpeg"
          alt="Mobilidade sustentável com a Rotta"
          className="h-full w-full object-cover object-center"
        />
      </aside>

      <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 md:min-h-dvh md:w-1/2 md:px-10">
        <div className="w-full max-w-md">
          <p className="mb-2 text-sm font-medium text-verde-claro">
            Recuperação de acesso
          </p>

          <h1 className="mb-4 text-3xl font-bold text-creme">
            Redefinir senha
          </h1>
        </div>
      </main>
    </div>
  );
}
