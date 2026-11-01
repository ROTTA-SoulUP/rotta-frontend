
const API_URL = import.meta.env.VITE_API_URL || "https://rotta-java-1.onrender.com";

async function obterMensagemErro(
    resposta: Response,
    mensagemPadrao: string
): Promise<string> {
    const texto = await resposta.text();

    if (!texto) {
        return mensagemPadrao;
    }

    try {
        const erro = JSON.parse(texto);
        return erro.erro || erro.message || mensagemPadrao;
    } catch {
        return texto;
    }
}

export interface LoginResponse {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    dataCadastro: string;
}

export async function fazerLogin(
    email: string,
    senha: string
): Promise<LoginResponse> {
    const resposta = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.trim(),
            senha: senha,
        }),
    });

    if (!resposta.ok) {
        if (resposta.status === 401 || resposta.status === 403) {
            throw new Error("E-mail ou senha inválidos.");
        }

        throw new Error(
            "Não foi possível realizar o login. Tente novamente."
        );
    }

    return (await resposta.json()) as LoginResponse;
}

export async function criarConta(dados: {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
}): Promise<void> {
    const resposta = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: dados.nome.trim(),
            email: dados.email.trim(),
            cpf: dados.cpf.replace(/\D/g, ""),
            telefone: dados.telefone.replace(/\D/g, ""),
            senha: dados.senha,
        }),
    });

    if (!resposta.ok) {
        const mensagem = await obterMensagemErro(
            resposta,
            "Não foi possível criar sua conta. Tente novamente."
        );

        throw new Error(mensagem);
    }
}

export async function verificarEmailRecuperacao(
    email: string
): Promise<void> {
    const resposta = await fetch(
        `${API_URL}/usuarios/recuperar-senha/verificar-email`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.trim(),
            }),
        }
    );

    if (!resposta.ok) {
        const mensagem = resposta.status === 404
            ? "E-mail não encontrado."
            : await obterMensagemErro(
                resposta,
                "Não foi possível verificar o e-mail. Tente novamente."
            );

        throw new Error(mensagem);
    }
}

export async function redefinirSenha(
    email: string,
    novaSenha: string
): Promise<void> {
    const resposta = await fetch(
        `${API_URL}/usuarios/recuperar-senha`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.trim(),
                novaSenha: novaSenha,
            }),
        }
    );

    if (!resposta.ok) {
        const mensagem = resposta.status === 404
            ? "E-mail não encontrado."
            : await obterMensagemErro(
                resposta,
                "Não foi possível redefinir a senha. Tente novamente."
            );

        throw new Error(mensagem);
    }
}
