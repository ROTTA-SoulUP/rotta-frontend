// ===========================
//  MÁSCARA DE TELEFONE
// ===========================
const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        if (v.length <= 10) {
            v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
        e.target.value = v;
    });
}

// ===========================
//  VALIDAÇÃO
// ===========================
function mostrarErro(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function limparErro(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
}

function setErro(inputEl, hasError) {
    if (!inputEl) return;
    inputEl.classList.toggle('input-error', hasError);
}

function validar() {
    let ok = true;

    const nome = document.getElementById('nome');
    if (!nome.value.trim() || nome.value.trim().length < 3) {
        mostrarErro('erro-nome', 'Insira seu nome completo.');
        setErro(nome, true); ok = false;
    } else { limparErro('erro-nome'); setErro(nome, false); }

    const email = document.getElementById('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        mostrarErro('erro-email', 'Insira um e-mail válido.');
        setErro(email, true); ok = false;
    } else { limparErro('erro-email'); setErro(email, false); }

    const assunto = document.getElementById('assunto');
    if (!assunto.value) {
        mostrarErro('erro-assunto', 'Selecione um assunto.');
        setErro(assunto, true); ok = false;
    } else { limparErro('erro-assunto'); setErro(assunto, false); }

    const mensagem = document.getElementById('mensagem');
    if (!mensagem.value.trim() || mensagem.value.trim().length < 10) {
        mostrarErro('erro-mensagem', 'Escreva ao menos 10 caracteres.');
        setErro(mensagem, true); ok = false;
    } else { limparErro('erro-mensagem'); setErro(mensagem, false); }

    const termos = document.getElementById('termos');
    if (!termos.checked) {
        mostrarErro('erro-termos', 'Aceite os termos para continuar.');
        ok = false;
    } else { limparErro('erro-termos'); }

    return ok;
}

// ===========================
//  SUBMIT
// ===========================
const form = document.getElementById('contatoForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validar()) return;

        const btn = form.querySelector('.btn-enviar');
        btn.disabled = true;
        btn.querySelector('span').textContent = 'Enviando…';

        setTimeout(() => {
            form.classList.add('hidden');
            document.getElementById('sucesso-msg').classList.remove('hidden');
        }, 900);
    });

    form.querySelectorAll('input, select, textarea').forEach((el) => {
        el.addEventListener('input', () => el.classList.remove('input-error'));
        el.addEventListener('change', () => el.classList.remove('input-error'));
    });
}

// ===========================
//  RESET
// ===========================
function resetForm() {
    const f = document.getElementById('contatoForm');
    f.reset();
    f.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    f.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    const btn = f.querySelector('.btn-enviar');
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Enviar Mensagem';
    document.getElementById('sucesso-msg').classList.add('hidden');
    f.classList.remove('hidden');
}