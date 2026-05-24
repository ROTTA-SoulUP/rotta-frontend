// ===========================
//  MODAL DE PERFIL
//  Abre ao clicar em "Ver perfil"
// ===========================

const modal       = document.getElementById('modal-perfil');
const modalFundo  = document.getElementById('modal-fundo');
const modalFechar = document.getElementById('modal-fechar');

// Elementos internos do modal
const modalFoto     = document.getElementById('modal-foto');
const modalNome     = document.getElementById('modal-nome');
const modalCargo    = document.getElementById('modal-cargo');
const modalTurma    = document.getElementById('modal-turma');
const modalGithub   = document.getElementById('modal-github');
const modalLinkedin = document.getElementById('modal-linkedin');

// Abre o modal com os dados do botão clicado
document.querySelectorAll('.btn-perfil').forEach(btn => {
    btn.addEventListener('click', () => {

        // Preenche o modal com os dados do data-* do botão
        modalFoto.src          = btn.dataset.foto;
        modalFoto.alt          = btn.dataset.nome;
        modalNome.textContent  = btn.dataset.nome;
        modalCargo.textContent = btn.dataset.cargo;
        modalTurma.textContent = btn.dataset.turma;
        modalGithub.href       = btn.dataset.github;
        modalLinkedin.href     = btn.dataset.linkedin;

        // Abre o modal
        modal.classList.add('aberto');
    });
});

// Fecha ao clicar no X
modalFechar.addEventListener('click', () => {
    modal.classList.remove('aberto');
});

// Fecha ao clicar no fundo escuro
modalFundo.addEventListener('click', () => {
    modal.classList.remove('aberto');
});

// Fecha com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('aberto');
});