function toggle(btn) {
    const item = btn.closest('.item');
    const aberto = item.classList.contains('aberto');

    // Fecha todos os outros
    document.querySelectorAll('.item.aberto').forEach(i => i.classList.remove('aberto'));

    // Abre o clicado (se estava fechado)
    if (!aberto) {
        item.classList.add('aberto');
    }
}