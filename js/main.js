/**
 * FinanceControl - Dashboard Financeiro Pessoal
 * JavaScript principal da aplicação
 */

// Configurações da aplicação
const CONFIG = {
    STORAGE_KEY: 'financeControl_lancamentos',
    CURRENCY_LOCALE: 'pt-BR',
    CURRENCY: 'BRL',
    CHART_COLORS: {
        receita: '#198754',
        despesa: '#dc3545'
    },
    ANIMATION_DURATION: 1400,
    FADE_DURATION: 400
};

// Classe principal da aplicação
class FinanceControl {
    constructor() {
        this.lancamentos = [];
        this.editandoId = null;
        this.chart = null;
        this.init();
    }

    // Inicialização da aplicação
    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderLancamentos();
        this.atualizaResumo();
        this.setupAccessibility();
    }

    // Configuração de acessibilidade
    setupAccessibility() {
        // Adiciona suporte a navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });

        // Melhora foco para leitores de tela
        const focusableElements = document.querySelectorAll('button, input, select, a[href]');
        focusableElements.forEach(el => {
            el.addEventListener('focus', () => {
                el.classList.add('focus-visible');
            });
            el.addEventListener('blur', () => {
                el.classList.remove('focus-visible');
            });
        });
    }

    // Configuração dos event listeners
    setupEventListeners() {
        // Sidebar mobile
        this.setupSidebarEvents();
        
        // Dark mode
        this.setupThemeToggle();
        
        // Formulário
        this.setupFormEvents();
        
        // Filtros
        this.setupFilterEvents();
        
        // Ações em massa
        this.setupBulkActions();
    }

    // Eventos da sidebar
    setupSidebarEvents() {
        const sidebar = document.getElementById("sidebar");
        const openSidebar = document.getElementById("openSidebar");
        const closeSidebar = document.getElementById("closeSidebar");
        const overlay = document.getElementById("sidebar-overlay");

        if (openSidebar) {
            openSidebar.addEventListener("click", () => this.openSidebar());
        }
        
        if (closeSidebar) {
            closeSidebar.addEventListener("click", () => this.closeSidebar());
        }

        // Fechar sidebar ao clicar fora
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992 && 
                sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                e.target !== openSidebar) {
                this.closeSidebar();
            }
        });

        // Fechar sidebar com overlay
        if (overlay) {
            overlay.addEventListener('click', () => this.closeSidebar());
        }
    }

    openSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.add('open');
        document.getElementById("openSidebar").setAttribute('aria-expanded', 'true');
    }

    closeSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.remove('open');
        document.getElementById("openSidebar").setAttribute('aria-expanded', 'false');
    }

    // Toggle do tema
    setupThemeToggle() {
        const toggleTheme = document.getElementById("toggle-theme");
        if (toggleTheme) {
            toggleTheme.addEventListener("click", () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains("bg-dark");
        
        body.classList.toggle("bg-dark");
        body.classList.toggle("bg-light");
        
        // Salvar preferência
        localStorage.setItem('financeControl_theme', isDark ? 'light' : 'dark');
        
        // Atualizar aria-label do botão
        const toggleBtn = document.getElementById("toggle-theme");
        const icon = toggleBtn.querySelector('i');
        const label = toggleBtn.querySelector('span') || document.createElement('span');
        
        if (isDark) {
            icon.className = 'bi bi-moon-stars';
            label.textContent = 'Tema Escuro';
        } else {
            icon.className = 'bi bi-sun';
            label.textContent = 'Tema Claro';
        }
        
        if (!toggleBtn.querySelector('span')) {
            toggleBtn.appendChild(label);
        }
    }

    // Eventos do formulário
    setupFormEvents() {
        const form = document.getElementById("lancamento-form");
        if (form) {
            form.addEventListener("submit", (e) => this.handleFormSubmit(e));
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm(e.target)) {
            return;
        }

        const formData = this.getFormData(e.target);
        
        try {
            if (this.editandoId !== null) {
                this.editarLancamento(this.editandoId, formData);
            } else {
                this.adicionarLancamento(formData);
            }
            
            this.resetForm(e.target);
            this.showSuccessMessage();
            this.renderLancamentos();
            this.atualizaResumo();
            
        } catch (error) {
            console.error('Erro ao salvar lançamento:', error);
            this.showErrorMessage('Erro ao salvar lançamento. Tente novamente.');
        }
    }

    validateForm(form) {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return false;
        }
        return true;
    }

    getFormData(form) {
        return {
            descricao: form.querySelector("#descricao").value.trim(),
            valor: parseFloat(form.querySelector("#valor").value),
            categoria: form.querySelector("#categoria").value,
            tipo: form.querySelector("#tipo").value
        };
    }

    resetForm(form) {
        form.reset();
        form.classList.remove('was-validated');
        this.editandoId = null;
        const submitBtn = form.querySelector("button[type=submit]");
        if (submitBtn) {
            submitBtn.textContent = "Adicionar";
        }
    }

    // Eventos dos filtros
    setupFilterEvents() {
        const filtroCategoria = document.getElementById("filtro-categoria");
        const filtroTipo = document.getElementById("filtro-tipo");
        const limparFiltros = document.getElementById("limpar-filtros");

        if (filtroCategoria) {
            filtroCategoria.addEventListener("change", () => this.aplicarFiltros());
        }
        
        if (filtroTipo) {
            filtroTipo.addEventListener("change", () => this.aplicarFiltros());
        }
        
        if (limparFiltros) {
            limparFiltros.addEventListener("click", () => this.limparFiltros());
        }
    }

    aplicarFiltros() {
        this.renderLancamentos();
        this.atualizaResumo();
    }

    limparFiltros() {
        const filtroCategoria = document.getElementById("filtro-categoria");
        const filtroTipo = document.getElementById("filtro-tipo");
        
        if (filtroCategoria) filtroCategoria.value = "";
        if (filtroTipo) filtroTipo.value = "";
        
        this.aplicarFiltros();
    }

    // Ações em massa
    setupBulkActions() {
        const limparTodos = document.getElementById("limpar-todos");
        if (limparTodos) {
            limparTodos.addEventListener("click", () => this.limparTodosLancamentos());
        }
    }

    // Carregar dados do localStorage
    loadData() {
        try {
            const data = localStorage.getItem(CONFIG.STORAGE_KEY);
            this.lancamentos = data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.lancamentos = [];
        }
    }

    // Salvar dados no localStorage
    saveData() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.lancamentos));
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            this.showErrorMessage('Erro ao salvar dados. Verifique o espaço disponível.');
        }
    }

    // Gerar ID único
    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    // Formatar valor em moeda brasileira
    formatCurrency(value) {
        return Number(value).toLocaleString(CONFIG.CURRENCY_LOCALE, {
            style: 'currency',
            currency: CONFIG.CURRENCY
        });
    }

    // Adicionar lançamento
    adicionarLancamento(data) {
        const lancamento = {
            id: this.generateId(),
            ...data,
            dataCriacao: new Date().toISOString()
        };
        
        this.lancamentos.push(lancamento);
        this.saveData();
    }

    // Editar lançamento
    editarLancamento(id, data) {
        const index = this.lancamentos.findIndex(l => l.id === id);
        if (index === -1) {
            throw new Error('Lançamento não encontrado');
        }
        
        this.lancamentos[index] = {
            ...this.lancamentos[index],
            ...data,
            dataModificacao: new Date().toISOString()
        };
        
        this.saveData();
        this.editandoId = null;
    }

    // Remover lançamento
    removeLancamento(id) {
        if (!confirm("Deseja realmente remover este lançamento?")) {
            return;
        }
        
        const index = this.lancamentos.findIndex(l => l.id === id);
        if (index === -1) {
            this.showErrorMessage('Lançamento não encontrado');
            return;
        }
        
        this.lancamentos.splice(index, 1);
        this.saveData();
        this.renderLancamentos();
        this.atualizaResumo();
    }

    // Limpar todos os lançamentos
    limparTodosLancamentos() {
        if (!confirm("Deseja realmente apagar todos os lançamentos? Esta ação não pode ser desfeita.")) {
            return;
        }
        
        this.lancamentos = [];
        this.saveData();
        this.renderLancamentos();
        this.atualizaResumo();
        this.showSuccessMessage('Todos os lançamentos foram removidos');
    }

    // Renderizar lista de lançamentos
    renderLancamentos() {
        const tabela = document.getElementById("lista-lancamentos");
        const semLancamentos = document.getElementById("sem-lancamentos");
        
        if (!tabela) return;
        
        const lancamentosFiltrados = this.getLancamentosFiltrados();
        
        if (lancamentosFiltrados.length === 0) {
            tabela.innerHTML = "";
            if (semLancamentos) {
                semLancamentos.classList.remove('d-none');
            }
            return;
        }
        
        if (semLancamentos) {
            semLancamentos.classList.add('d-none');
        }
        
        tabela.innerHTML = lancamentosFiltrados.map(lancamento => 
            this.createLancamentoRow(lancamento)
        ).join('');
    }

    // Obter lançamentos filtrados
    getLancamentosFiltrados() {
        const filtroCategoria = document.getElementById("filtro-categoria");
        const filtroTipo = document.getElementById("filtro-tipo");
        
        return this.lancamentos.filter(lancamento => {
            const categoriaOK = !filtroCategoria?.value || lancamento.categoria === filtroCategoria.value;
            const tipoOK = !filtroTipo?.value || lancamento.tipo === filtroTipo.value;
            return categoriaOK && tipoOK;
        });
    }

    // Criar linha da tabela
    createLancamentoRow(lancamento) {
        const tipoClass = lancamento.tipo === 'receita' ? 'bg-success' : 'bg-danger';
        const tipoIcon = lancamento.tipo === 'receita' ? 'bi-arrow-up-circle' : 'bi-arrow-down-circle';
        const tipoText = lancamento.tipo.charAt(0).toUpperCase() + lancamento.tipo.slice(1);
        
        return `
            <tr>
                <td>${this.escapeHtml(lancamento.descricao)}</td>
                <td>${this.formatCurrency(lancamento.valor)}</td>
                <td><span class="badge bg-secondary px-3 py-2">${this.escapeHtml(lancamento.categoria)}</span></td>
                <td>
                    <span class="badge ${tipoClass} px-3 py-2">
                        <i class="bi ${tipoIcon}" aria-hidden="true"></i>
                        ${tipoText}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-warning me-1" 
                            onclick="app.editarLancamentoForm('${lancamento.id}')" 
                            title="Editar lançamento"
                            aria-label="Editar lançamento ${this.escapeHtml(lancamento.descricao)}">
                        <i class="bi bi-pencil" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" 
                            onclick="app.removeLancamento('${lancamento.id}')" 
                            title="Remover lançamento"
                            aria-label="Remover lançamento ${this.escapeHtml(lancamento.descricao)}">
                        <i class="bi bi-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    // Escapar HTML para prevenir XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Editar lançamento no formulário
    editarLancamentoForm(id) {
        const lancamento = this.lancamentos.find(l => l.id === id);
        if (!lancamento) {
            this.showErrorMessage('Lançamento não encontrado');
            return;
        }
        
        const form = document.getElementById("lancamento-form");
        if (!form) return;
        
        form.querySelector("#descricao").value = lancamento.descricao;
        form.querySelector("#valor").value = lancamento.valor;
        form.querySelector("#categoria").value = lancamento.categoria;
        form.querySelector("#tipo").value = lancamento.tipo;
        
        this.editandoId = id;
        
        const submitBtn = form.querySelector("button[type=submit]");
        if (submitBtn) {
            submitBtn.textContent = "Salvar";
        }
        
        // Focar no primeiro campo
        form.querySelector("#descricao").focus();
        
        // Scroll para o formulário
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Atualizar resumo
    atualizaResumo() {
        const lancamentosFiltrados = this.getLancamentosFiltrados();
        
        const receitas = lancamentosFiltrados
            .filter(l => l.tipo === 'receita')
            .reduce((acc, l) => acc + Number(l.valor), 0);
            
        const despesas = lancamentosFiltrados
            .filter(l => l.tipo === 'despesa')
            .reduce((acc, l) => acc + Number(l.valor), 0);

        this.updateSummaryDisplay(receitas, despesas);
        this.updateChart(receitas, despesas);
    }

    // Atualizar display do resumo
    updateSummaryDisplay(receitas, despesas) {
        const totalReceitas = document.getElementById("total-receitas");
        const totalDespesas = document.getElementById("total-despesas");
        const saldo = document.getElementById("saldo");
        
        if (totalReceitas) totalReceitas.textContent = this.formatCurrency(receitas);
        if (totalDespesas) totalDespesas.textContent = this.formatCurrency(despesas);
        if (saldo) saldo.textContent = this.formatCurrency(receitas - despesas);
    }

    // Atualizar gráfico
    updateChart(receitas, despesas) {
        const ctx = document.getElementById('grafico');
        if (!ctx) return;
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Receitas', 'Despesas'],
                datasets: [{
                    data: [receitas, despesas],
                    backgroundColor: [CONFIG.CHART_COLORS.receita, CONFIG.CHART_COLORS.despesa],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${this.formatCurrency(value)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Mostrar mensagem de sucesso
    showSuccessMessage(message = 'Lançamento salvo!') {
        const alerta = document.getElementById("alerta-form");
        if (!alerta) return;
        
        alerta.textContent = message;
        alerta.className = 'alert alert-success mt-3';
        alerta.classList.remove('d-none');
        alerta.style.opacity = '1';
        
        setTimeout(() => {
            alerta.style.opacity = '0';
            setTimeout(() => alerta.classList.add('d-none'), CONFIG.FADE_DURATION);
        }, CONFIG.ANIMATION_DURATION);
    }

    // Mostrar mensagem de erro
    showErrorMessage(message) {
        const alerta = document.getElementById("alerta-form");
        if (!alerta) return;
        
        alerta.textContent = message;
        alerta.className = 'alert alert-danger mt-3';
        alerta.classList.remove('d-none');
        alerta.style.opacity = '1';
        
        setTimeout(() => {
            alerta.style.opacity = '0';
            setTimeout(() => alerta.classList.add('d-none'), CONFIG.FADE_DURATION);
        }, CONFIG.ANIMATION_DURATION);
    }
}

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FinanceControl();
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('financeControl_theme');
    if (savedTheme === 'dark') {
        document.body.classList.remove('bg-light');
        document.body.classList.add('bg-dark');
    }
});

// Expor métodos globais para compatibilidade
window.editarLancamento = (id) => window.app?.editarLancamentoForm(id);
window.removeLancamento = (id) => window.app?.removeLancamento(id);