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
    >
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