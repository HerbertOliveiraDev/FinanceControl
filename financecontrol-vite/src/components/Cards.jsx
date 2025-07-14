import React from 'react';
import './Cards.css';

const Cards = ({ totalIncome, totalExpense, balance }) => {
  return (
    <div className="cards-container">
      <div className="cards-grid">
        <div className="card card-income">
          <div className="card-header">
            <span className="card-label">Receitas</span>
            <div className="card-icon income">
              <i className="fas fa-arrow-up"></i>
            </div>
          </div>
          <div className="card-value">
            R$ {totalIncome.toFixed(2)}
          </div>
        </div>

        <div className="card card-expense">
          <div className="card-header">
            <span className="card-label">Despesas</span>
            <div className="card-icon expense">
              <i className="fas fa-arrow-down"></i>
            </div>
          </div>
          <div className="card-value">
            R$ {totalExpense.toFixed(2)}
          </div>
        </div>

        <div className="card card-balance">
          <div className="card-header">
            <span className="card-label">Saldo</span>
            <div className="card-icon balance">
              <i className="fas fa-wallet"></i>
            </div>
          </div>
          <div className="card-value">
            R$ {balance.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards; 