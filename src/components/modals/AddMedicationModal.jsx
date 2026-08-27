import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import { searchMedicationsAPI } from '../../services/medicationApi';
import { X, Pill, Search, Sparkles, Check } from 'lucide-react';

export const AddMedicationModal = ({ isOpen, onClose }) => {
  const { addMedication } = useHealth();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '1x ao dia',
    time: '08:00',
    currentStock: '30'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.name && formData.name.length >= 2) {
        setIsSearching(true);
        const results = await searchMedicationsAPI(formData.name);
        setSearchResults(results);
        setIsSearching(false);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.name]);

  if (!isOpen) return null;

  const handleSelectMedication = (med) => {
    setFormData({
      ...formData,
      name: med.name,
      dosage: med.dosage || formData.dosage,
      frequency: med.frequency || formData.frequency
    });
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) return;
    addMedication(formData);
    setFormData({ name: '', dosage: '', frequency: '1x ao dia', time: '08:00', currentStock: '30' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Pill style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">Novo Medicamento</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Consulta em tempo real na API ANVISA & OpenFDA</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Autocomplete Medication Name Field */}
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">
              Nome do Medicamento <span style={{ fontSize: '11px', color: '#0D6C5D', fontWeight: 600 }}>(Busca via API)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Digite para buscar Ex: Losartana, Glifage, Omeprazol..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>

            {/* Live Suggestions Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  zIndex: 250,
                  marginTop: '4px',
                  maxHeight: '220px',
                  overflowY: 'auto'
                }}
              >
                <div style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#0D6C5D', background: '#E6F5F2', borderBottom: '1px solid #BCE5DC' }}>
                  🔍 Medicamentos Encontrados na API (Clique para preencher)
                </div>
                {searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectMedication(item)}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background 0.15s ease',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                  >
                    <div style={{ fontWeight: 800, color: '#0F172A' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      Dosagem recomendada: <strong>{item.dosage}</strong> • {item.category}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Dosagem</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: 50mg, 850mg, 10ml"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Frequência</label>
            <select
              className="form-select"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            >
              <option value="1x ao dia">1x ao dia</option>
              <option value="2x ao dia">2x ao dia (de 12 em 12h)</option>
              <option value="3x ao dia">3x ao dia (de 8 em 8h)</option>
              <option value="Uso contínuo noturno">Uso contínuo noturno</option>
              <option value="Se necessário">Se necessário</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Estoque Inicial (Nº de Comprimidos / Doses)</label>
            <input
              type="number"
              className="form-input"
              placeholder="Ex: 30"
              value={formData.currentStock}
              onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Horário Principal de Dosagem</label>
            <input
              type="time"
              className="form-input"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Cadastrar Medicamento
          </button>
        </form>
      </div>
    </div>
  );
};
