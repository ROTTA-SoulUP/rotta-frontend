// =============================================================
//  CREDENCIAIS PRÉ-PREENCHIDAS (demo)
// =============================================================
window.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    // Pré-preenche com valores de demo
    if (emailInput) emailInput.value = 'usuario@demo.com';
    if (senhaInput) senhaInput.value = '123456';
});


// =============================================================
//  MOSTRAR / ESCONDER SENHA
// =============================================================
const btnOlho    = document.getElementById('btn-olho');
const inputSenha = document.getElementById('senha');
const iconeOlho  = document.getElementById('icone-olho');

if (btnOlho) {
    btnOlho.addEventListener('click', () => {
        const visivel = inputSenha.type === 'text';
        inputSenha.type = visivel ? 'password' : 'text';
        iconeOlho.className = visivel
            ? 'fa-regular fa-eye'
            : 'fa-regular fa-eye-slash';
    });
}


// =============================================================
//  FUNÇÕES DE ERRO
// =============================================================
function mostrarErro(idErro, msg) {
    const el = document.getElementById(idErro);
    if (el) el.textContent = msg;
}

function limparErro(idErro) {
    const el = document.getElementById(idErro);
    if (el) el.textContent = '';
}

function setErro(inputEl, temErro) {
    if (!inputEl) return;
    inputEl.classList.toggle('input-error', temErro);
}


// =============================================================
//  VALIDAÇÃO (aceita qualquer e-mail + senha com 6+ caracteres)
// =============================================================
function validar() {
    let ok = true;

    const email = document.getElementById('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        mostrarErro('erro-email', 'Insira um e-mail válido.');
        setErro(email, true); ok = false;
    } else {
        limparErro('erro-email'); setErro(email, false);
    }

    const senha = document.getElementById('senha');
    if (senha.value.length < 6) {
        mostrarErro('erro-senha', 'A senha deve ter pelo menos 6 caracteres.');
        setErro(senha, true); ok = false;
    } else {
        limparErro('erro-senha'); setErro(senha, false);
    }

    return ok;
}


// =============================================================
//  FUNÇÃO DE REDIRECIONAMENTO
// =============================================================
function entrar() {
    const btn = document.querySelector('.btn-entrar');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Entrando…';
    }
    // Redireciona para a home após 1 segundo
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1000);
}


// =============================================================
//  SUBMIT DO FORMULÁRIO
// =============================================================
const form = document.getElementById('loginForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validar()) return;
        entrar();
    });

    // Remove erro ao digitar
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
    });
}


// =============================================================
//  BOTÃO ENTRAR COMO VISITANTE
//  Pula o formulário e vai direto para a home
// =============================================================
const btnVisitante = document.getElementById('btn-visitante');

if (btnVisitante) {
    btnVisitante.addEventListener('click', () => {
        btnVisitante.textContent = 'Entrando…';
        btnVisitante.disabled = true;
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 800);
    });
}