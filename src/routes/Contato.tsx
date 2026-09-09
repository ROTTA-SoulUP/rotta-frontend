import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
};

type FormErrors = {
  nome?: string;
  email?: string;
  telefone?: string;
  assunto?: string;
  mensagem?: string;
};

export default function Contato() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [enviado, setEnviado] = useState(false);
  const [contador, setContador] = useState(5);

  const navigate = useNavigate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll pro topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Limpa os erros quando o usuário começa a digitar
  useEffect(() => {
    if (!enviado) {
      setErrors({});
    }
  }, [formData]);

  // Contagem regressiva — só roda quando enviado vira true
  useEffect(() => {
    if (enviado) {
      setContador(5);

      intervalRef.current = setInterval(() => {
        setContador((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            navigate("/home");
            return 0;
          }

          return prev - 1;
        });
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enviado, navigate]);

  const validar = (): boolean => {
    const novosErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      novosErrors.nome = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      novosErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      novosErrors.email = "E-mail inválido";
    }

    if (!formData.assunto) {
      novosErrors.assunto = "Selecione um assunto";
    }

    if (!formData.mensagem.trim()) {
      novosErrors.mensagem = "Mensagem é obrigatória";
    }

    const apenasDigitos = formData.telefone.replace(/\D/g, "");

    if (formData.telefone && apenasDigitos.length !== 11) {
      novosErrors.telefone =
        "O telefone deve ter 11 dígitos (ex: (11) 99999-9999)";
    }

    setErrors(novosErrors);
    return Object.keys(novosErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    });

    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validar()) {
      setEnviado(true);
    }
  };

  // Cancela a contagem e volta pro formulário
  const resetForm = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setEnviado(false);
    setContador(5);
    handleReset();
  };

  // Aplica a máscara (XX) XXXXX-XXXX enquanto digita
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

    setFormData((prev) => ({ ...prev, telefone: value }));
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

      {/* ===== FORMULÁRIO ===== */}
      <section className="px-4 py-8 max-w-2xl mx-auto pb-24">
        <article className="bg-fundo-card border border-borda rounded-xl p-8">
          {enviado ? (
            // ===== MENSAGEM DE SUCESSO =====
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

              {/* ===== CONTAGEM REGRESSIVA ===== */}
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
            // ===== FORM =====
            <form onSubmit={handleSubmit} noValidate>
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
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors"
                  />

                  {errors.nome && (
                    <span className="text-red-400 text-xs mt-1 block">
                      {errors.nome}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors"
                  />

                  {errors.email && (
                    <span className="text-red-400 text-xs mt-1 block">
                      {errors.email}
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
                    name="telefone"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors"
                  />

                  {errors.telefone && (
                    <span className="text-red-400 text-xs mt-1 block">
                      {errors.telefone}
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
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme focus:outline-none focus:border-verde-claro transition-colors"
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
                      {errors.assunto}
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
                  name="mensagem"
                  rows={5}
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva sua dúvida ou mensagem aqui..."
                  className="w-full bg-fundo border border-borda rounded-lg px-4 py-3 text-creme placeholder-texto-muted/50 focus:outline-none focus:border-verde-claro transition-colors resize-none"
                />

                {errors.mensagem && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.mensagem}
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
