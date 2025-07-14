import React from 'react';
import './Table.css';

const Table = ({ launches, onDelete, onEdit }) => {
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este lançamento?')) {
      onDelete(id);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3 className="table-title">Lançamentos</h3>
        {launches.length > 0 && (
          <button 
            className="clear-btn"
            onClick={() => {
              if (window.confirm('Tem certeza que deseja limpar todos os lançamentos?')) {
                launches.forEach(launch => onDelete(launch.id));
              }
            }}
          >
            Limpar Todos
          </button>
        )}
      </div>
      
      <div className="table-wrapper">
        <table className="launch-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {launches.length === 0 ? (
              <tr className="empty-row">
                <td colSpan="5">Nenhum lançamento encontrado</td>
              </tr>
            ) : (
              launches.map((launch) => (
                <tr key={launch.id}>
                  <td>{launch.description}</td>
                  <td className={launch.type}>
                    R$ {launch.value.toFixed(2)}
                  </td>
                  <td>{launch.category}</td>
                  <td className={launch.type}>
                    {launch.type === 'income' ? 'Receita' : 'Despesa'}
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => onEdit(launch)}
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(launch.id)}
                      title="Excluir"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table; 