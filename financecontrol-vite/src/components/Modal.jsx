import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSubmit, editingLaunch }) => {
  const [formData, setFormData] = useState({
    description: '',
    value: '',
    category: '',
    type: ''
  });

  useEffect(() => {
    if (editingLaunch) {
      setFormData({
        description: editingLaunch.description,
        value: editingLaunch.value.toString(),
        category: editingLaunch.category,
        type: editingLaunch.type
      });
    } else {
      setFormData({
        description: '',
        value: '',
        category: '',
        type: ''
      });
    }
  }, [editingLaunch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description.trim() || !formData.value || !formData.category || !formData.type) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const launch = {
      description: formData.description.trim(),
      value: parseFloat(formData.value),
      category: formData.category,
      type: formData.type
    };

    onSubmit(launch);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {editingLaunch ? 'Editar Lançamento' : 'Novo Lançamento'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Descrição
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: Salário, Mercado..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="value" className="form-label">
              Valor (R$)
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="form-input"
              placeholder="0,00"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Categoria
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Selecione...</option>
                <option value="Salário">Salário</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Educação">Educação</option>
                <option value="Saúde">Saúde</option>
                <option value="Lazer">Lazer</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Tipo
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Selecione...</option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingLaunch ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal; 