// ===========================
//  SIMULADOR DE PONTOS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.acao-item input[type="checkbox"]');
    const ptsDia   = document.getElementById('pts-dia');
    const ptsMes   = document.getElementById('pts-mes');
    const creditos = document.getElementById('creditos');
    const barra    = document.getElementById('barra');
    const barraLabel = document.getElementById('barra-label');

    // 100 pts = R$ 0,50 | Meta mensal R$ 100
    const TAXA   = 0.005;   // reais por ponto
    const META   = 100;     // reais para passagem mensal
    const DIAS   = 30;

    function atualizar() {
        let totalDia = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) totalDia += parseInt(cb.dataset.pontos);
        });

        const totalMes    = totalDia * DIAS;
        const valorCredit = totalMes * TAXA;
        const pct         = Math.min((valorCredit / META) * 100, 100);

        ptsDia.textContent   = totalDia.toLocaleString('pt-BR');
        ptsMes.textContent   = totalMes.toLocaleString('pt-BR');
        creditos.textContent = 'R$ ' + valorCredit.toFixed(2).replace('.', ',');
        barra.style.width    = pct.toFixed(1) + '%';
        barraLabel.textContent = pct.toFixed(0) + '% da passagem mensal (R$ 100)';
    }

    checkboxes.forEach(cb => cb.addEventListener('change', atualizar));
});
