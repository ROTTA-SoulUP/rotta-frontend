// =============================================================
//  CARTEIRA.JS — Lógica da Carteira Digital
//  Usa localStorage para persistir dados entre sessões
// =============================================================


// =============================================================
//  ESTADO INICIAL
//  Carrega dados salvos ou cria estado zerado
// =============================================================
function carregarEstado() {
    const salvo = localStorage.getItem('rotta_carteira');
    if (salvo) return JSON.parse(salvo);

    // Dados iniciais com algumas ações de demonstração
    return {
        pontos: 350,
        totalConvertido: 1.50,
        streak: 3,
        historico: [
            { acao: 'Separar recicláveis',      pontos: 15, data: dataFormatada(-2) },
            { acao: 'Usar garrafa reutilizável', pontos: 20, data: dataFormatada(-1) },
            { acao: 'Ir a pé ou de bicicleta',  pontos: 30, data: dataFormatada(0)  },
        ]
    };
}

function salvarEstado(estado) {
    localStorage.setItem('rotta_carteira', JSON.stringify(estado));
}

// Retorna data formatada (offset em dias a partir de hoje)
function dataFormatada(offsetDias) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDias);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Converte pontos em reais (100 pts = R$ 0,50)
function pontosParaReais(pts) {
    return (pts / 100 * 0.5).toFixed(2);
}


// =============================================================
//  ATUALIZAR INTERFACE
//  Reflete o estado atual em todos os elementos da tela
// =============================================================
function atualizarInterface(estado) {
    // Saldo principal
    document.getElementById('saldo-pontos').textContent =
        estado.pontos.toLocaleString('pt-BR');

    document.getElementById('saldo-reais').textContent =
        'R$ ' + pontosParaReais(estado.pontos).replace('.', ',');

    // Resumo rápido
    document.getElementById('total-acoes').textContent =
        estado.historico.length;

    document.getElementById('total-convertido').textContent =
        'R$ ' + estado.totalConvertido.toFixed(2).replace('.', ',');

    document.getElementById('streak').textContent =
        estado.streak + ' dia' + (estado.streak !== 1 ? 's' : '');

    // Histórico
    renderizarHistorico(estado.historico);
}


// =============================================================
//  HISTÓRICO
//  Renderiza a lista de ações no DOM
// =============================================================
function renderizarHistorico(historico) {
    const lista  = document.getElementById('historico-lista');
    const vazio  = document.getElementById('historico-vazio');

    // Remove entradas antigas (mantém o div vazio)
    const antigas = lista.querySelectorAll('.historico-item');
    antigas.forEach(el => el.remove());

    if (historico.length === 0) {
        vazio.style.display = 'flex';
        return;
    }

    vazio.style.display = 'none';

    // Insere do mais recente para o mais antigo
    [...historico].reverse().forEach(entrada => {
        const item = document.createElement('article');
        item.className = 'historico-item';
        item.innerHTML = `
            <div class="hist-icone">
                <i class="fa-solid fa-seedling"></i>
            </div>
            <div class="hist-info">
                <p class="hist-acao">${entrada.acao}</p>
                <p class="hist-data">${entrada.data}</p>
            </div>
            <span class="hist-pts">+${entrada.pontos} pts</span>
        `;
        lista.appendChild(item);
    });
}


// =============================================================
//  REGISTRAR AÇÃO
//  Chamado ao clicar em um card de ação sustentável
// =============================================================
function registrarAcao(nomeAcao, pontos) {
    const estado = carregarEstado();

    // Adiciona ao histórico
    estado.historico.push({
        acao:   nomeAcao,
        pontos: pontos,
        data:   dataFormatada(0)
    });

    // Soma pontos e incrementa streak
    estado.pontos += pontos;
    estado.streak += 1;

    salvarEstado(estado);
    atualizarInterface(estado);
    mostrarToast(`+${pontos} pts — ${nomeAcao}`);
}


// =============================================================
//  TOAST
//  Notificação rápida no canto inferior da tela
// =============================================================
function mostrarToast(texto) {
    const toast     = document.getElementById('toast');
    const toastTexto = document.getElementById('toast-texto');

    toastTexto.textContent = texto;
    toast.classList.add('visivel');

    setTimeout(() => toast.classList.remove('visivel'), 3000);
}


// =============================================================
//  MODAL DE CONVERSÃO
// =============================================================
const modalConverter    = document.getElementById('modal-converter');
const fundoConverter    = document.getElementById('fundo-converter');
const fecharConverter   = document.getElementById('fechar-converter');
const btnConverter      = document.getElementById('btn-converter');
const inputQtd          = document.getElementById('qtd-pontos');
const converterErro     = document.getElementById('converter-erro');
const converterValor    = document.getElementById('converter-valor');
const saldoDisponivel   = document.getElementById('saldo-disponivel');
const converterForm     = document.getElementById('converter-form');
const converterSucesso  = document.getElementById('converter-sucesso');
const btnConfirmar      = document.getElementById('btn-confirmar-converter');
const btnCancelar       = document.getElementById('btn-cancelar-converter');
const btnFecharSucesso  = document.getElementById('btn-fechar-sucesso');

// Abre modal
btnConverter.addEventListener('click', () => {
    const estado = carregarEstado();

    // Reseta para o estado do formulário
    converterForm.classList.remove('hidden');
    converterSucesso.classList.add('hidden');
    inputQtd.value = '';
    converterErro.textContent = '';
    converterValor.textContent = 'R$ 0,00';
    saldoDisponivel.textContent = estado.pontos.toLocaleString('pt-BR') + ' pts';

    modalConverter.classList.add('aberto');
});

// Atualiza valor em tempo real ao digitar
inputQtd.addEventListener('input', () => {
    const qtd = parseInt(inputQtd.value) || 0;
    converterValor.textContent =
        'R$ ' + pontosParaReais(qtd).replace('.', ',');
    converterErro.textContent = '';
});

// Confirma conversão
btnConfirmar.addEventListener('click', () => {
    const estado = carregarEstado();
    const qtd    = parseInt(inputQtd.value) || 0;

    // Validações
    if (!qtd || qtd <= 0) {
        converterErro.textContent = 'Informe a quantidade de pontos.';
        return;
    }
    if (qtd < 100) {
        converterErro.textContent = 'Mínimo de 100 pontos para converter.';
        return;
    }
    if (qtd > estado.pontos) {
        converterErro.textContent = 'Saldo insuficiente.';
        return;
    }
    if (qtd % 100 !== 0) {
        converterErro.textContent = 'Use múltiplos de 100 (ex: 100, 200, 500).';
        return;
    }

    // Aplica conversão
    const valor = parseFloat(pontosParaReais(qtd));
    estado.pontos -= qtd;
    estado.totalConvertido += valor;

    salvarEstado(estado);
    atualizarInterface(estado);

    // Mostra tela de sucesso
    converterForm.classList.add('hidden');
    converterSucesso.classList.remove('hidden');
    document.getElementById('sucesso-texto').textContent =
        `${qtd} pts convertidos em R$ ${valor.toFixed(2).replace('.', ',')} em créditos de transporte.`;
});

// Fecha modal
function fecharModalConverter() {
    modalConverter.classList.remove('aberto');
}

fecharConverter.addEventListener('click', fecharModalConverter);
fundoConverter.addEventListener('click', fecharModalConverter);
btnCancelar.addEventListener('click', fecharModalConverter);
btnFecharSucesso.addEventListener('click', fecharModalConverter);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModalConverter();
});


// =============================================================
//  LIMPAR HISTÓRICO
// =============================================================
document.getElementById('btn-limpar').addEventListener('click', () => {
    if (!confirm('Deseja apagar todo o histórico? Os pontos serão mantidos.')) return;

    const estado = carregarEstado();
    estado.historico = [];
    estado.streak    = 0;

    salvarEstado(estado);
    atualizarInterface(estado);
    mostrarToast('Histórico apagado.');
});


// =============================================================
//  EVENTOS DOS CARDS DE AÇÃO
// =============================================================
document.querySelectorAll('.acao-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const nomeAcao = btn.dataset.acao;
        const pontos   = parseInt(btn.dataset.pontos);

        // Feedback visual no card
        btn.classList.add('registrado');
        setTimeout(() => btn.classList.remove('registrado'), 800);

        registrarAcao(nomeAcao, pontos);
    });
});


// =============================================================
//  INICIALIZAÇÃO
//  Carrega estado e atualiza a tela ao abrir a página
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
    const estado = carregarEstado();
    atualizarInterface(estado);
});
