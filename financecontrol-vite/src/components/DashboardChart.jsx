import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './DashboardChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardChart = ({ totalIncome, totalExpense }) => {
  const data = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: [
          '#10b981', // Verde mais vibrante
          '#ef4444', // Vermelho mais vibrante
        ],
        borderColor: [
          '#059669',
          '#dc2626',
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: '600',
          },
          color: 'var(--text)',
        },
      },
      tooltip: {
        backgroundColor: 'var(--glass)',
        titleColor: 'var(--text)',
        bodyColor: 'var(--text)',
        borderColor: 'var(--border)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: R$ ${value.toFixed(2)} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Receitas vs Despesas</h3>
      </div>
      <div className="chart-wrapper">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardChart; 