const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const state = {
  lancamentos: JSON.parse(localStorage.getItem('lancamentos') || '[]'),
  editId: null,
  dark: localStorage.getItem('theme') === 'dark',
};

function formatBRL(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function animateValue(el, start, end, duration = 700) {
  if (start === end) { el.textContent = formatBRL(end); return; }
  let startTime;
  function animate(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const value = start + (end - start) * progress;
    el.textContent = formatBRL(value);
    if (progress < 1) requestAnimationFrame(animate);
    else el.textContent = formatBRL(end);
  }
  requestAnimationFrame(animate);
}

function updateCards(animated = true) {
  const receitas = state.lancamentos.filter(l => l.tipo === 'receita').reduce((a, l) => a + Number(l.valor), 0);
  const despesas = state.lancamentos.filter(l => l.tipo === 'despesa').reduce((a, l) => a + Number(l.valor), 0);
  const saldo = receitas - despesas;
  if (animated) {
    animateValue($('#total-receitas'), parseFloat($('#total-receitas').textContent.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0, receitas);
    animateValue($('#total-despesas'), parseFloat($('#total-despesas').textContent.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0, despesas);
    animateValue($('#saldo'), parseFloat($('#saldo').textContent.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0, saldo);
    animateValue($('#saldo-card'), parseFloat($('#saldo-card').textContent.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0, saldo);
  } else {
    $('#total-receitas').textContent = formatBRL(receitas);
    $('#total-despesas').textContent = formatBRL(despesas);
    $('#saldo').textContent = formatBRL(saldo);
    $('#saldo-card').textContent = formatBRL(saldo);
  }
}

function renderLancamentos() {
  const tbody = $('#lista-lancamentos');
  tbody.innerHTML = '';
  if (state.lancamentos.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="6">Nenhum lançamento encontrado.</td></tr>';
    return;
  }
  state.lancamentos.forEach((l, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${l.descricao}</td>
      <td class="${l.tipo === 'receita' ? 'income' : 'expense'}">${formatBRL(l.valor)}</td>
      <td>${l.categoria}</td>
      <td>${l.tipo === 'receita' ? 'Receita' : 'Despesa'}</td>
      <td>${l.data || ''}</td>
      <td>
        <button class="action-btn" title="Editar" onclick="editLancamento(${i})">✏️</button>
        <button class="action-btn" title="Remover" onclick="removeLancamento(${i})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function save() {
  localStorage.setItem('lancamentos', JSON.stringify(state.lancamentos));
}

function openModal(edit = false) {
  $('#modal-backdrop').classList.add('show');
  $('#modal-form').classList.add('show');
  if (!edit) {
    $('#lancamento-form').reset();
    state.editId = null;
    $('#modal-title').textContent = 'Adicionar Lançamento';
  }
}
function closeModal() {
  $('#modal-backdrop').classList.remove('show');
  $('#modal-form').classList.remove('show');
}

$('#open-modal').onclick = () => openModal();
$('#close-modal').onclick = closeModal;
$('#modal-backdrop').onclick = closeModal;
window.onkeydown = (e) => {
  if (e.key === 'Escape') closeModal();
};

$('#lancamento-form').onsubmit = (e) => {
  e.preventDefault();
  const descricao = $('#descricao').value.trim();
  const valor = parseFloat($('#valor').value);
  const categoria = $('#categoria').value;
  const tipo = $('#tipo').value;
  const data = new Date().toLocaleDateString('pt-BR');
  if (!descricao || !valor || !categoria || !tipo) return;
  if (state.editId !== null) {
    state.lancamentos[state.editId] = { descricao, valor, categoria, tipo, data };
  } else {
    state.lancamentos.push({ descricao, valor, categoria, tipo, data });
  }
  save();
  updateCards();
  renderLancamentos();
  closeModal();
};

window.editLancamento = (i) => {
  const l = state.lancamentos[i];
  $('#descricao').value = l.descricao;
  $('#valor').value = l.valor;
  $('#categoria').value = l.categoria;
  $('#tipo').value = l.tipo;
  state.editId = i;
  $('#modal-title').textContent = 'Editar Lançamento';
  openModal(true);
};

window.removeLancamento = (i) => {
  if (confirm('Remover este lançamento?')) {
    state.lancamentos.splice(i, 1);
    save();
    updateCards();
    renderLancamentos();
  }
};

$('#limpar-todos').onclick = () => {
  if (confirm('Remover todos os lançamentos?')) {
    state.lancamentos = [];
    save();
    updateCards();
    renderLancamentos();
  }
};

$('#theme-toggle').onclick = () => {
  state.dark = !state.dark;
  document.body.classList.toggle('dark', state.dark);
  localStorage.setItem('theme', state.dark ? 'dark' : 'light');
};

// Sidebar retrátil
const sidebar = $('#sidebar');
sidebar.onmouseenter = () => sidebar.classList.add('open');
sidebar.onmouseleave = () => sidebar.classList.remove('open');

// Inicialização
updateCards(false);
renderLancamentos();
if (state.dark) document.body.classList.add('dark'); 