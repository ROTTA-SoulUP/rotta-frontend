// ===========================
//  MENU HAMBÚRGUER
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-btn');
    const nav = document.getElementById('menu-nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        const aberto = nav.classList.toggle('menu-aberto');
        btn.setAttribute('aria-expanded', aberto);
        btn.classList.toggle('ativo', aberto);
    });

    // Fecha ao clicar em link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('menu-aberto');
            btn.setAttribute('aria-expanded', false);
            btn.classList.remove('ativo');
        });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('menu-aberto');
            btn.setAttribute('aria-expanded', false);
            btn.classList.remove('ativo');
        }
    });
});
