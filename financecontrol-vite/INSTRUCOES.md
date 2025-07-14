# 🚀 FinanceControl - Instruções de Uso

## ✅ Projeto Funcionando!

O **FinanceControl** está rodando perfeitamente em: **http://localhost:5173**

## 🎯 Como Usar

### 1. **Adicionar Lançamentos**
- Clique no botão **"+"** (FAB) no canto inferior direito
- Preencha: Descrição, Valor, Categoria e Tipo
- Clique em **"Adicionar"**

### 2. **Editar Lançamentos**
- Na tabela, clique no ícone **✏️** (editar)
- Modifique os dados no modal
- Clique em **"Atualizar"**

### 3. **Excluir Lançamentos**
- Na tabela, clique no ícone **🗑️** (excluir)
- Confirme a exclusão

### 4. **Alternar Tema**
- Clique no ícone **🌙/☀️** na barra superior (canto direito)
- O tema é salvo automaticamente

## 📱 Funcionalidades Principais

### **Dashboard**
- **Cards**: Receitas, Despesas e Saldo em tempo real
- **Gráfico**: Proporção visual receitas vs despesas
- **Tabela**: Lista completa de todos os lançamentos

### **Gestão de Lançamentos**
- **Adicionar**: Formulário modal para novos lançamentos
- **Editar**: Clique no ícone de edição para modificar
- **Excluir**: Confirmação antes da exclusão
- **Categorias**: Salário, Alimentação, Transporte, Educação, Saúde, Lazer, Outros

### **Interface**
- **Tema Escuro/Claro**: Alternância com botão na AppBar
- **Layout Limpo**: Sem menu lateral, foco no conteúdo
- **FAB**: Botão flutuante para adicionar lançamentos rapidamente

## 🎨 Design Moderno

### **Cores Sóbrias**
- Azul escuro profissional
- Verde discreto para receitas
- Vermelho sóbrio para despesas
- Fundo claro e limpo

### **Tema Escuro**
- Fundo escuro elegante
- Texto claro para contraste
- Cores adaptadas para melhor visibilidade
- Transições suaves entre temas

### **Responsivo**
- **Desktop**: Layout completo sem sidebar
- **Tablet**: Layout adaptativo
- **Mobile**: Cards empilhados e tabela responsiva

### **Animações Suaves**
- Transições suaves em todos os elementos
- Hover effects discretos
- Loading states elegantes

## 🔧 Comandos Úteis

```bash
# Parar o servidor
Ctrl + C

# Reiniciar o servidor
npm run dev

# Build de produção
npm run build

# Visualizar build
npm run preview
```

## 🐛 Solução de Problemas

### **Se o servidor não iniciar:**
```bash
npm install
npm run dev
```

### **Se os ícones não aparecerem:**
- Verifique a conexão com internet
- Os ícones são carregados do FontAwesome CDN

### **Se os dados não salvarem:**
- Verifique se o localStorage está habilitado
- Tente em modo privado/incógnito

### **Se o tema escuro não funcionar:**
- Clique no ícone de lua/sol na barra superior
- Recarregue a página para verificar se foi salvo

## 📊 Estrutura de Dados

Cada lançamento contém:
```javascript
{
  id: 1234567890,
  description: "Salário",
  value: 5000.00,
  category: "Salário",
  type: "income" // ou "expense"
}
```

## 🎯 Próximos Passos

O projeto está pronto para uso! Você pode:

1. **Usar imediatamente** - Todas as funcionalidades estão funcionando
2. **Personalizar cores** - Edite `src/styles/theme.css`
3. **Adicionar categorias** - Modifique o componente Modal
4. **Deploy** - Execute `npm run build` para produção

---

**🎉 Divirta-se controlando suas finanças!** 