function verificarLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Se está na página de login
    if (window.location.pathname.includes('login.html')) {
        if (usuarioLogado) {
            window.location.href = './index.html';
        }
    }

    // Se está em qualquer outra página
    else {
        if (!usuarioLogado) {
            window.location.href = './pages/login.html';
        }
    }
}

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', verificarLogin);