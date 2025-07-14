# FinanceControl - Dashboard Financeiro

Um dashboard financeiro pessoal moderno e responsivo, desenvolvido com React + Vite para controle de receitas e despesas.

## ✨ Características

- **Interface Moderna**: Design clean e minimalista com tema claro/escuro
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Gráficos Dinâmicos**: Visualização de dados com Chart.js
- **Persistência Local**: Dados salvos automaticamente no localStorage
- **CRUD Completo**: Adicionar, editar e excluir lançamentos
- **Categorização**: Organize seus lançamentos por categorias
- **Cálculos Automáticos**: Saldo, receitas e despesas calculados em tempo real

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool rápida e moderna
- **Chart.js** - Gráficos interativos
- **CSS3** - Estilos modernos com variáveis CSS
- **FontAwesome** - Ícones profissionais
- **Inter Font** - Tipografia moderna

## 📦 Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd financecontrol-vite
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o projeto:**
```bash
npm run dev
```

4. **Acesse no navegador:**
```
http://localhost:5173
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 📱 Funcionalidades

### Dashboard
- **Cards de Resumo**: Receitas, despesas e saldo em tempo real
- **Gráfico de Pizza**: Visualização da proporção receitas vs despesas
- **Tabela de Lançamentos**: Lista completa com ações de edição/exclusão

### Gestão de Lançamentos
- **Adicionar**: Formulário modal para novos lançamentos
- **Editar**: Clique no ícone de edição para modificar
- **Excluir**: Confirmação antes da exclusão
- **Categorias**: Salário, Alimentação, Transporte, Educação, Saúde, Lazer, Outros

### Interface
- **Tema Escuro/Claro**: Alternância com botão na AppBar
- **Sidebar Responsiva**: Menu lateral que se adapta ao tamanho da tela
- **FAB**: Botão flutuante para adicionar lançamentos rapidamente

## 🎨 Design System

### Cores
- **Primária**: Azul escuro (#2c5aa0)
- **Secundária**: Azul mais escuro (#1e3a8a)
- **Accent**: Verde discreto (#059669)
- **Danger**: Vermelho sóbrio (#dc2626)

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 400, 500, 600, 700

### Componentes
- **Cards**: Glassmorphism com bordas sutis
- **Botões**: Estilo consistente com hover suave
- **Modal**: Overlay centralizado com animações
- **Tabela**: Design limpo com hover discreto

## 📊 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── AppBar.jsx      # Barra superior
│   ├── Sidebar.jsx     # Menu lateral
│   ├── Cards.jsx       # Cards de resumo
│   ├── Table.jsx       # Tabela de lançamentos
│   ├── Modal.jsx       # Modal de formulário
│   ├── Fab.jsx         # Botão flutuante
│   └── DashboardChart.jsx # Gráfico
├── styles/             # Estilos globais
│   ├── global.css      # Reset e utilitários
│   └── theme.css       # Variáveis CSS
├── App.jsx             # Componente principal
└── main.jsx           # Ponto de entrada
```

## 🔧 Personalização

### Cores
Edite as variáveis CSS em `src/styles/theme.css`:

```css
:root {
  --primary: #2c5aa0;
  --primary2: #1e3a8a;
  --accent: #059669;
  --danger: #dc2626;
  /* ... */
}
```

### Categorias
Modifique as opções no componente `Modal.jsx`:

```jsx
<option value="Salário">Salário</option>
<option value="Alimentação">Alimentação</option>
// Adicione suas categorias aqui
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deploy

Para fazer deploy em produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/` e podem ser hospedados em qualquer servidor estático.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**FinanceControl** - Dashboard Financeiro Pessoal

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
