# FinanceControl - Dashboard Financeiro Pessoal

![FinanceControl Logo](img/logo.svg)

Um dashboard financeiro pessoal moderno e responsivo para controle de receitas e despesas, desenvolvido com HTML5, CSS3 e JavaScript vanilla.

## ✨ Características

- 📊 **Dashboard Interativo**: Visualização clara de receitas, despesas e saldo
- 📈 **Gráficos Dinâmicos**: Gráfico de pizza mostrando a proporção entre receitas e despesas
- 💾 **Armazenamento Local**: Dados salvos no localStorage do navegador
- 🎨 **Tema Escuro/Claro**: Alternância entre temas com preferência salva
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- ♿ **Acessibilidade**: Suporte completo a leitores de tela e navegação por teclado
- 🔍 **Filtros Avançados**: Filtre por categoria e tipo de lançamento
- ✏️ **Edição em Tempo Real**: Edite lançamentos diretamente na interface
- 🎯 **Interface Intuitiva**: Design moderno e fácil de usar

## 🚀 Como Usar

### Instalação

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em seu navegador
3. Comece a adicionar seus lançamentos financeiros!

### Funcionalidades

#### Adicionar Lançamento
1. Preencha a descrição (ex: "Salário", "Mercado")
2. Digite o valor em reais
3. Selecione a categoria
4. Escolha o tipo (Receita ou Despesa)
5. Clique em "Adicionar"

#### Editar Lançamento
1. Clique no ícone de lápis ao lado do lançamento
2. Os dados serão carregados no formulário
3. Faça as alterações necessárias
4. Clique em "Salvar"

#### Filtrar Lançamentos
- Use os filtros de categoria e tipo para visualizar lançamentos específicos
- Clique em "Limpar Filtros" para remover todos os filtros

#### Alternar Tema
- Clique no botão "Tema" na sidebar para alternar entre tema claro e escuro
- Sua preferência será salva automaticamente

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com variáveis CSS e animações
- **JavaScript ES6+**: Funcionalidades interativas com classes e módulos
- **Bootstrap 5**: Framework CSS para layout responsivo
- **Chart.js**: Biblioteca para criação de gráficos
- **Bootstrap Icons**: Ícones consistentes e modernos

## 📁 Estrutura do Projeto

```
FinanceControl/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   └── main.js         # Lógica da aplicação
├── img/
│   └── logo.svg        # Logo do projeto
└── README.md           # Documentação
```

## 🎨 Design System

### Cores
- **Primária**: `#f1c40f` (Amarelo)
- **Sucesso**: `#198754` (Verde)
- **Perigo**: `#dc3545` (Vermelho)
- **Info**: `#0dcaf0` (Azul)

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 400 (Regular), 600 (Semi-bold)

### Componentes
- Cards com bordas arredondadas e sombras suaves
- Botões com gradientes e efeitos hover
- Tabelas responsivas com listras alternadas
- Formulários com validação visual

## ♿ Acessibilidade

O projeto segue as diretrizes WCAG 2.1 AA:

- ✅ Navegação por teclado completa
- ✅ Suporte a leitores de tela
- ✅ Contraste adequado em ambos os temas
- ✅ Labels e aria-labels apropriados
- ✅ Estrutura semântica HTML5
- ✅ Skip links para navegação rápida
- ✅ Redução de movimento para usuários sensíveis

## 📱 Responsividade

- **Desktop**: Layout completo com sidebar fixa
- **Tablet**: Layout adaptativo com cards empilhados
- **Mobile**: Menu hamburger e layout otimizado para toque

## 🔧 Personalização

### Adicionar Novas Categorias

Para adicionar novas categorias, edite os arquivos `index.html` e `js/main.js`:

```html
<!-- No HTML -->
<option value="Nova Categoria">Nova Categoria</option>
```

### Modificar Cores

As cores podem ser facilmente alteradas através das variáveis CSS em `css/styles.css`:

```css
:root {
    --primary-color: #sua-cor-aqui;
    --success-color: #sua-cor-aqui;
    --danger-color: #sua-cor-aqui;
}
```

## 🚀 Performance

- **Carregamento Otimizado**: Preload de recursos críticos
- **Animações Suaves**: Transições CSS otimizadas
- **Código Minificado**: Dependências CDN para melhor performance
- **Lazy Loading**: Carregamento sob demanda de componentes

## 🔒 Segurança

- **XSS Prevention**: Escape de HTML em dados dinâmicos
- **Input Validation**: Validação client-side robusta
- **Local Storage**: Dados armazenados localmente no navegador

## 📊 Funcionalidades Técnicas

### Armazenamento de Dados
- LocalStorage para persistência de dados
- Estrutura JSON otimizada
- Backup automático de preferências

### Validação de Formulários
- Validação HTML5 nativa
- Feedback visual em tempo real
- Prevenção de dados inválidos

### Gráficos Dinâmicos
- Chart.js para visualizações
- Atualização automática com filtros
- Tooltips informativos

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [Chart.js](https://www.chartjs.org/) - Biblioteca de gráficos
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Ícones
- [Google Fonts](https://fonts.google.com/) - Tipografia

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor:

1. Verifique se o problema já foi reportado
2. Crie uma nova issue com detalhes do problema
3. Inclua informações sobre seu navegador e sistema operacional

---

**Desenvolvido com ❤️ para facilitar o controle financeiro pessoal**
