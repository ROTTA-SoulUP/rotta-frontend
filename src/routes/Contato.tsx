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