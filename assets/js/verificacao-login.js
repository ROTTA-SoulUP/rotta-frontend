// verificacao-login.js
const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = './pages/login.html';
}