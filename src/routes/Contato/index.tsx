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

  setContador(5);
  let segundos = 5;

  intervalRef.current = setInterval(() => {
    segundos -= 1;
    setContador(segundos);

    if (segundos <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      navigate("/home");
    }
  }, 2000);

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
}, [enviado, navigate]); 

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length <= 2) {
      value = value.replace(/(\d{0,2})/, "($1");
    } else if (value.length <= 7) {
      value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
    setValue("telefone", value);
  };

  const onSubmit = (data: FormData) => {
  console.log("Dados do formulário:", data);
    setEnviado(true);
  };

  const handleReset = () => {
    reset();
  };

  const resetForm = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setEnviado(false);
    setContador(5);
    reset();
  };

  return (
    <main className="min-h-screen bg-fundo text-creme font-sans">

      {/* ===== HERO ===== */}
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16">
        <span className="text-verde-claro text-sm uppercase tracking-widest mb-4">
          Fale Conosco
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-creme mb-4">
          Entre em Contato
        </h1>
        <p className="text-xl text-verde-claro font-light max-w-xl">
          Preencha o formulário abaixo para nos enviar sua dúvida ou sugestão.
        </p>
      </section>

      <section className="px-4 py-8 max-w-2xl mx-auto pb-24">
        <article className="bg-fundo-card border border-borda rounded-xl p-8">
          {enviado ? (
            <div className="flex flex-col items-center text-center py-12">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-verde text-creme text-3xl mb-6">
                ✓
              </div>
              <h2 className="text-2xl font-serif text-creme mb-2">
                Mensagem enviada!
              </h2>
              <p className="text-texto-muted text-sm mb-4">
                Obrigado pelo contato. Retornaremos em breve.
              </p>
              <p className="text-verde-claro text-sm mb-6">
                Você será redirecionado pra página inicial em{" "}
                <span className="font-serif text-lg text-creme">
                  {contador}
                </span>{" "}
                seg
              </p>
              <button
                onClick={resetForm}
                className="inline-block text-sm text-verde-claro border border-verde/30 rounded-full px-6 py-3 hover:bg-verde/10 transition-colors duration-300"
              >
                Nova Mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h3 className="text-lg font-serif text-creme mb-6">Seus Dados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-verde-claro text-xs uppercase tracking-widest mb-2"
                  >
                    Nome Completo <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="Seu nome completo"
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors"
                    {...register("nome", { required: "Nome é obrigatório" })}
                  />
                  {errors.nome && (
                    <span className="text-red-400 text-xs mt-1 block">
                      {errors.nome.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-verde-claro text-xs uppercase tracking-widest mb-2"
                  >
                    E-mail <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors"
                    {...register("email", {
                      required: "E-mail é obrigatório",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "E-mail inválido",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-verde-claro text-xs uppercase tracking-widest mb-2"
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors"
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
                    <span className="text-red-400 text-xs mt-1 block">
                      {errors.telefone.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="assunto"
                    className="block text-verde-claro text-xs uppercase tracking-widest mb-2"
                  >
                    Assunto <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="assunto"
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme focus:outline-none focus:border-verde-claro transition-colors"
                    {...register("assunto", { required: "Selecione um assunto" })}
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
                    <span className="text-red-400 text-xs mt-1 block">
                      {errors.assunto.message}
                    </span>
                  )}
                </div>
              </div>
              <hr className="border-borda my-6" />
              <h3 className="text-lg font-serif text-creme mb-6">
                Sua Mensagem
              </h3>
              <div className="mb-6">
                <label
                  htmlFor="mensagem"
                  className="block text-verde-claro text-xs uppercase tracking-widest mb-2"
                >
                  Dúvida ou Mensagem <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="mensagem"
                  rows={5}
                  placeholder="Escreva sua dúvida ou mensagem aqui..."
                  className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors resize-none"
                  {...register("mensagem", { required: "Mensagem é obrigatória" })}
                />
                {errors.mensagem && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.mensagem.message}
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-texto-muted border border-borda rounded-full px-6 py-3 hover:border-verde-claro hover:text-verde-claro transition-colors duration-300"
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 text-sm text-creme bg-verde rounded-full px-6 py-3 hover:bg-verde-claro hover:text-fundo transition-colors duration-300"
                >
                  <span>Enviar Mensagem</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}
        </article>
      </section>
    </main>
  );
}