function formatBRL(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function geraId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
let editandoId = null;

const tabela = document.getElementById("lista-lancamentos");
const totalReceitas = document.getElementById("total-receitas");
const totalDespesas = document.getElementById("total-despesas");
const saldo = document.getElementById("saldo");
const semLancamentos = document.getElementById("sem-lancamentos");
const alertaForm = document.getElementById("alerta-form");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroTipo = document.getElementById("filtro-tipo");
const limparFiltros = document.getElementById("limpar-filtros");
const sidebar = document.getElementById("sidebar");
const openSidebar = document.getElementById("openSidebar");
const lancamentoForm = document.getElementById("lancamento-form");
const limparTodos = document.getElementById("limpar-todos");

openSidebar.addEventListener('click', () => sidebar.classList.add('open'));
document.body.addEventListener('click', e => {
    if (window.innerWidth < 992 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== openSidebar) {
        sidebar.classList.remove('open');
    }
});

document.getElementById("toggle-theme").addEventListener("click", function() {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("bg-light");
});

let chart;
function atualizaGrafico(receitas, despesas) {
    const ctx = document.getElementById('grafico').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Receitas', 'Despesas'],
            datasets: [{
                data: [receitas, despesas],
                backgroundColor: ['#198754', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true, position: 'bottom' } }
        }
    });
}

function renderLancamentos() {
    tabela.innerHTML = "";
    let listaFiltrada = lancamentos.filter(l => {
        let catOK = !filtroCategoria.value || l.categoria === filtroCategoria.value;
        let tipoOK = !filtroTipo.value || l.tipo === filtroTipo.value;
        return catOK && tipoOK;
    });
    if (listaFiltrada.length === 0) {
        semLancamentos.classList.remove('d-none');
        return;
    }
    semLancamentos.classList.add('d-none');
    listaFiltrada.forEach((l) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${l.descricao}</td>
            <td>${formatBRL(l.valor)}</td>
            <td><span class="badge bg-secondary px-3 py-2">${l.categoria}</span></td>
            <td>
                <span class="badge ${l.tipo === 'receita' ? 'bg-success' : 'bg-danger'} px-3 py-2">
                    <i class="bi ${l.tipo === 'receita' ? 'bi-arrow-up-circle' : 'bi-arrow-down-circle'}"></i>
                    ${l.tipo.charAt(0).toUpperCase() + l.tipo.slice(1)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-warning me-1" onclick="editarLancamento('${l.id}')" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeLancamento('${l.id}')" title="Remover">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tabela.appendChild(tr);
    });
}
window.editarLancamento = function(id) {
    let idx = lancamentos.findIndex(l => l.id === id);
    if (idx === -1) return;
    let l = lancamentos[idx];
    document.getElementById("descricao").value = l.descricao;
    document.getElementById("valor").value = l.valor;
    document.getElementById("categoria").value = l.categoria;
    document.getElementById("tipo").value = l.tipo;
    editandoId = id;
    document.querySelector("#lancamento-form button[type=submit]").textContent = "Salvar";
    document.getElementById("descricao").focus();
}
window.removeLancamento = function(id) {
    let idx = lancamentos.findIndex(l => l.id === id);
    if (idx === -1) return;
    if (confirm("Deseja realmente remover este lançamento?")) {
        lancamentos.splice(idx, 1);
        localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
        renderLancamentos();
        atualizaResumo();
    }
};
limparTodos.onclick = function() {
    if (confirm("Deseja realmente apagar todos os lançamentos?")) {
        lancamentos = [];
        localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
        renderLancamentos();
        atualizaResumo();
    }
};

function atualizaResumo() {
    let listaFiltrada = lancamentos.filter(l => {
        let catOK = !filtroCategoria.value || l.categoria === filtroCategoria.value;
        let tipoOK = !filtroTipo.value || l.tipo === filtroTipo.value;
        return catOK && tipoOK;
    });
    let receitas = listaFiltrada.filter(l => l.tipo === 'receita').reduce((acc, l) => acc + Number(l.valor), 0);
    let despesas = listaFiltrada.filter(l => l.tipo === 'despesa').reduce((acc, l) => acc + Number(l.valor), 0);

    totalReceitas.textContent = formatBRL(receitas);
    totalDespesas.textContent = formatBRL(despesas);
    saldo.textContent = formatBRL(receitas - despesas);

    atualizaGrafico(receitas, despesas);
}

lancamentoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }
    let descricao = document.getElementById("descricao").value.trim();
    let valor = document.getElementById("valor").value;
    let categoria = document.getElementById("categoria").value;
    let tipo = document.getElementById("tipo").value;

    if (editandoId !== null) {
        let idx = lancamentos.findIndex(l => l.id === editandoId);
        lancamentos[idx] = { id: editandoId, descricao, valor, categoria, tipo };
        editandoId = null;
        document.querySelector("#lancamento-form button[type=submit]").textContent = "Adicionar";
    } else {
        lancamentos.push({ id: geraId(), descricao, valor, categoria, tipo });
    }
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
    this.reset();
    this.classList.remove('was-validated');
    alertaForm.textContent = "Lançamento salvo!";
    alertaForm.classList.remove('d-none');
    alertaForm.style.opacity = 1;
    setTimeout(() => {
        alertaForm.style.opacity = 0;
        setTimeout(() => alertaForm.classList.add('d-none'), 400);
    }, 1500);
    renderLancamentos();
    atualizaResumo();
});

filtroCategoria.onchange = filtroTipo.onchange = function() {
    renderLancamentos();
    atualizaResumo();
};
limparFiltros.onclick = function() {
    filtroCategoria.value = "";
    filtroTipo.value = "";
    renderLancamentos();
    atualizaResumo();
};

window.onload = function() {
    renderLancamentos();
    atualizaResumo();
};