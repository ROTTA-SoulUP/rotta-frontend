
export default function Cadastro() {
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
        </div>
      </main>
    </div>
  );
}
