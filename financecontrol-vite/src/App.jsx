import React, { useState, useEffect } from 'react';
import AppBar from './components/AppBar';
import Cards from './components/Cards';
import DashboardChart from './components/DashboardChart';
import Table from './components/Table';
import Modal from './components/Modal';
import Fab from './components/Fab';
import './App.css';

function App() {
  const [launches, setLaunches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLaunch, setEditingLaunch] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedLaunches = localStorage.getItem('financeLaunches');
    const savedTheme = localStorage.getItem('financeTheme');
    
    if (savedLaunches) {
      setLaunches(JSON.parse(savedLaunches));
    }
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('financeLaunches', JSON.stringify(launches));
  }, [launches]);

  // Salvar tema no localStorage
  useEffect(() => {
    localStorage.setItem('financeTheme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addLaunch = (launch) => {
    if (editingLaunch) {
      setLaunches(launches.map(l => 
        l.id === editingLaunch.id ? { ...launch, id: l.id } : l
      ));
      setEditingLaunch(null);
    } else {
      setLaunches([...launches, { ...launch, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const deleteLaunch = (id) => {
    setLaunches(launches.filter(l => l.id !== id));
  };

  const editLaunch = (launch) => {
    setEditingLaunch(launch);
    setIsModalOpen(true);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const totalIncome = launches
    .filter(l => l.type === 'income')
    .reduce((sum, l) => sum + l.value, 0);

  const totalExpense = launches
    .filter(l => l.type === 'expense')
    .reduce((sum, l) => sum + l.value, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="app">
      <AppBar 
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="main-content">
        <div className="container">
          <div className="grid grid-cols-1 gap-8">
            <Cards 
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              balance={balance}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DashboardChart 
                totalIncome={totalIncome}
                totalExpense={totalExpense}
              />
              
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
                  Controle Financeiro
                </h2>
                <p className="text-muted text-center lg:text-left">
                  Gerencie suas receitas e despesas de forma simples e eficiente. 
                  Adicione novos lançamentos e acompanhe seu saldo em tempo real.
                </p>
              </div>
            </div>
            
            <Table 
              launches={launches}
              onDelete={deleteLaunch}
              onEdit={editLaunch}
            />
          </div>
        </div>
      </main>
      
      <Fab onClick={() => setIsModalOpen(true)} />
      
      <Modal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLaunch(null);
        }}
        onSubmit={addLaunch}
        editingLaunch={editingLaunch}
      />
    </div>
  );
}

export default App;
