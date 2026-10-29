
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
};

export default function Contato() {
  const [enviado, setEnviado] = useState(false);
  const [contador, setContador] = useState(5);
  const navigate = useNavigate();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!enviado) return;

    intervalRef.current = setInterval(() => {
      setContador((anterior) => {
        if (anterior <= 1) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          navigate("/home");
          return 0;
        }

        return anterior - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enviado, navigate]);

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 2) {
      value = value ? `(${value}` : "";
    } else if (value.length <= 7) {
      value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    setValue("telefone", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = (data: FormData) => {
    console.log("Dados do formulário:", data);
    setContador(5);
    setEnviado(true);
  };

  const handleReset = () => {
    reset();
  };

  const resetForm = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setEnviado(false);
    setContador(5);
    reset();
  };

  return (
    <main className="min-h-screen bg-fundo font-sans text-creme">
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <span className="mb-4 text-sm uppercase tracking-widest text-verde-claro">
          Fale Conosco
        </span>

        <h1 className="mb-4 font-serif text-4xl text-creme md:text-5xl">
          Entre em Contato
        </h1>

        <p className="max-w-xl text-xl font-light text-verde-claro">
          Preencha o formulário abaixo para nos enviar sua dúvida ou sugestão.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-8 pb-24">
        <article className="rounded-xl border border-borda bg-fundo-card p-8">
          {enviado ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-verde text-3xl text-creme">
                ✓
              </div>

              <h2 className="mb-2 font-serif text-2xl text-creme">
                Mensagem enviada!
              </h2>

              <p className="mb-4 text-sm text-texto-muted">
                Obrigado pelo contato. Retornaremos em breve.
              </p>

              <p className="mb-6 text-sm text-verde-claro">
                Você será redirecionado pra página inicial em{" "}
                <span className="font-serif text-lg text-creme">
                  {contador}
                </span>{" "}
                seg
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="inline-block rounded-full border border-verde/30 px-6 py-3 text-sm text-verde-claro transition-colors duration-300 hover:bg-verde/10"
              >
                Nova Mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h3 className="mb-6 font-serif text-lg text-creme">
                Seus Dados
              </h3>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-2 block text-xs uppercase tracking-widest text-verde-claro"
                  >
                    Nome Completo <span className="text-red-400">*</span>
                  </label>

                  <input
                    type="text"
                    id="nome"
                    placeholder="Seu nome completo"
                    className="w-full rounded-lg border border-borda bg-fundo px-4 py-3 text-creme placeholder:text-texto-muted/50 transition-colors focus:border-verde-claro focus:outline-none"
                    {...register("nome", {
                      required: "Nome é obrigatório",
                    })}
                  />

                  {errors.nome && (
                    <span className="mt-1 block text-xs text-red-400">
                      {errors.nome.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs uppercase tracking-widest text-verde-claro"
                  >
                    E-mail <span className="text-red-400">*</span>
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border border-borda bg-fundo px-4 py-3 text-creme placeholder:text-texto-muted/50 transition-colors focus:border-verde-claro focus:outline-none"
                    {...register("email", {
                      required: "E-mail é obrigatório",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "E-mail inválido",
                      },
                    })}
                  />

                  {errors.email && (
                    <span className="mt-1 block text-xs text-red-400">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="telefone"
                    className="mb-2 block text-xs uppercase tracking-widest text-verde-claro"
                  >
                    Telefone
                  </label>

                  <input
                    type="tel"
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    className="w-full rounded-lg border border-borda bg-fundo px-4 py-3 text-creme placeholder:text-texto-muted/50 transition-colors focus:border-verde-claro focus:outline-none"
                    {...register("telefone", {
                      validate: (value) => {
                        if (!value) return true;

                        const apenasDigitos = value.replace(/\D/g, "");

                        return (
                          apenasDigitos.length === 11 ||
                          "O telefone deve ter 11 dígitos (ex: (11) 99999-9999)"
                        );
                      },
                    })}
                    onChange={handlePhoneChange}
                  />

                  {errors.telefone && (
                    <span className="mt-1 block text-xs text-red-400">
                      {errors.telefone.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="assunto"
                    className="mb-2 block text-xs uppercase tracking-widest text-verde-claro"
                  >
                    Assunto <span className="text-red-400">*</span>
                  </label>

                  <select
                    id="assunto"
                    className="w-full rounded-lg border border-borda bg-fundo px-4 py-3 text-creme transition-colors focus:border-verde-claro focus:outline-none"
                    {...register("assunto", {
                      required: "Selecione um assunto",
                    })}
                  >
                    <option value="" disabled>
                      Selecione um assunto
                    </option>
                    <option value="duvida">Dúvida Geral</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="parceria">Parceria</option>
                    <option value="outro">Outro</option>
                  </select>

                  {errors.assunto && (
                    <span className="mt-1 block text-xs text-red-400">
                      {errors.assunto.message}
                    </span>
                  )}
                </div>
              </div>

              <hr className="my-6 border-borda" />

              <h3 className="mb-6 font-serif text-lg text-creme">
                Sua Mensagem
              </h3>

              <div className="mb-6">
                <label
                  htmlFor="mensagem"
                  className="mb-2 block text-xs uppercase tracking-widest text-verde-claro"
                >
                  Dúvida ou Mensagem <span className="text-red-400">*</span>
                </label>

                <textarea
                  id="mensagem"
                  rows={5}
                  placeholder="Escreva sua dúvida ou mensagem aqui..."
                  className="w-full resize-none rounded-lg border border-borda bg-fundo px-4 py-3 text-creme placeholder:text-texto-muted/50 transition-colors focus:border-verde-claro focus:outline-none"
                  {...register("mensagem", {
                    required: "Mensagem é obrigatória",
                  })}
                />

                {errors.mensagem && (
                  <span className="mt-1 block text-xs text-red-400">
                    {errors.mensagem.message}
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-borda px-6 py-3 text-sm text-texto-muted transition-colors duration-300 hover:border-verde-claro hover:text-verde-claro"
                >
                  Limpar
                </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-verde px-6 py-3 text-sm text-creme transition-colors duration-300 hover:bg-verde-claro hover:text-fundo"
                >
                  <span>Enviar Mensagem</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          )}
        </article>
      </section>
    </main>
  );
}
