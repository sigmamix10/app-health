import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import { searchMedicationsAPI } from '../../services/medicationApi';
import { X, Pill, Search, Calendar, RefreshCw, Clock } from 'lucide-react';

const DAYS_OF_WEEK = [
  { id: 'Dom', label: 'Dom' },
  { id: 'Seg', label: 'Seg' },
  { id: 'Ter', label: 'Ter' },
  { id: 'Qua', label: 'Qua' },
  { id: 'Qui', label: 'Qui' },
  { id: 'Sex', label: 'Sex' },
  { id: 'Sáb', label: 'Sáb' }
];

export const AddMedicationModal = ({ isOpen, onClose }) => {
  const { addMedication } = useHealth();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequencyType: 'daily', // 'daily' | 'specific_days' | 'alternate_days' | 'as_needed'
    dailyFrequency: '1x ao dia',
    selectedDays: ['Seg', 'Qua', 'Sex'],
    alternateInterval: 'Dia sim, dia não (a cada 48h)',
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
      dosage: med.dosage || formData.dosage
    });
    setShowDropdown(false);
  };

  const toggleDay = (dayId) => {
    setFormData((prev) => {
      const exists = prev.selectedDays.includes(dayId);
      const updatedDays = exists
        ? prev.selectedDays.filter((d) => d !== dayId)
        : [...prev.selectedDays, dayId];
      return {
        ...prev,
        selectedDays: updatedDays.length > 0 ? updatedDays : [dayId]
      };
    });
  };

  const getComputedFrequencyText = () => {
    if (formData.frequencyType === 'daily') {
      return formData.dailyFrequency;
    }
    if (formData.frequencyType === 'specific_days') {
      if (formData.selectedDays.length === 7) return 'Todos os dias';
      if (formData.selectedDays.length === 1) {
        const dayNames = {
          Dom: 'Apenas aos Domingos',
          Seg: 'Apenas às Segundas-feiras',
          Ter: 'Apenas às Terças-feiras',
          Qua: 'Apenas às Quartas-feiras',
          Qui: 'Apenas às Quintas-feiras',
          Sex: 'Apenas às Sextas-feiras',
          Sáb: 'Apenas aos Sábados'
        };
        return dayNames[formData.selectedDays[0]] || `Apenas ${formData.selectedDays[0]}`;
      }
      return `Dias específicos: ${formData.selectedDays.join(', ')}`;
    }
    if (formData.frequencyType === 'alternate_days') {
      return formData.alternateInterval;
    }
    return 'Se necessário (SOS)';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) return;

    const computedFrequency = getComputedFrequencyText();

    addMedication({
      name: formData.name,
      dosage: formData.dosage,
      frequency: computedFrequency,
      frequencyType: formData.frequencyType,
      selectedDays: formData.selectedDays,
      time: formData.time,
      currentStock: formData.currentStock
    });

    setFormData({
      name: '',
      dosage: '',
      frequencyType: 'daily',
      dailyFrequency: '1x ao dia',
      selectedDays: ['Seg', 'Qua', 'Sex'],
      alternateInterval: 'Dia sim, dia não (a cada 48h)',
      time: '08:00',
      currentStock: '30'
    });
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
              <p style={{ fontSize: '12px', color: '#64748B' }}>Configure o horário e os dias de tomada</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Autocomplete Medication Name Field */}
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">
              Nome do Medicamento <span style={{ fontSize: '11px', color: '#0D6C5D', fontWeight: 600 }}>(Busca via API)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Digite ex: Losartana, Omeprazol, Corticoide..."
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
                  maxHeight: '200px',
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
              placeholder="Ex: 50mg, 10ml, 1 comprimido"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              required
            />
          </div>

          {/* Frequency Type Selector (Daily, Specific Days, Alternate, SOS) */}
          <div className="form-group">
            <label className="form-label">Padrão de Frequência / Dias de Tomada</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, frequencyType: 'daily' })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: formData.frequencyType === 'daily' ? '2px solid #0D6C5D' : '1px solid #E2E8F0',
                  background: formData.frequencyType === 'daily' ? '#E6F5F2' : '#FFFFFF',
                  color: formData.frequencyType === 'daily' ? '#0D6C5D' : '#475569',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center'
                }}
              >
                <Clock size={14} /> Todos os dias
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, frequencyType: 'specific_days' })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: formData.frequencyType === 'specific_days' ? '2px solid #0D6C5D' : '1px solid #E2E8F0',
                  background: formData.frequencyType === 'specific_days' ? '#E6F5F2' : '#FFFFFF',
                  color: formData.frequencyType === 'specific_days' ? '#0D6C5D' : '#475569',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center'
                }}
              >
                <Calendar size={14} /> Dias específicos
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, frequencyType: 'alternate_days' })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: formData.frequencyType === 'alternate_days' ? '2px solid #0D6C5D' : '1px solid #E2E8F0',
                  background: formData.frequencyType === 'alternate_days' ? '#E6F5F2' : '#FFFFFF',
                  color: formData.frequencyType === 'alternate_days' ? '#0D6C5D' : '#475569',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center'
                }}
              >
                <RefreshCw size={14} /> Dias alternados
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, frequencyType: 'as_needed' })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: formData.frequencyType === 'as_needed' ? '2px solid #0D6C5D' : '1px solid #E2E8F0',
                  background: formData.frequencyType === 'as_needed' ? '#E6F5F2' : '#FFFFFF',
                  color: formData.frequencyType === 'as_needed' ? '#0D6C5D' : '#475569',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center'
                }}
              >
                <Pill size={14} /> Se necessário (SOS)
              </button>
            </div>
          </div>

          {/* Conditional Sub-options based on frequencyType */}
          {formData.frequencyType === 'daily' && (
            <div className="form-group">
              <label className="form-label">Doses diárias</label>
              <select
                className="form-select"
                value={formData.dailyFrequency}
                onChange={(e) => setFormData({ ...formData, dailyFrequency: e.target.value })}
              >
                <option value="1x ao dia">1x ao dia</option>
                <option value="2x ao dia (de 12 em 12h)">2x ao dia (de 12 em 12h)</option>
                <option value="3x ao dia (de 8 em 8h)">3x ao dia (de 8 em 8h)</option>
                <option value="Uso contínuo noturno">Uso contínuo noturno</option>
              </select>
            </div>
          )}

          {formData.frequencyType === 'specific_days' && (
            <div className="form-group" style={{ background: '#F8FAFC', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <label className="form-label" style={{ marginBottom: '8px' }}>
                Selecione os dias da semana que o medicamento deve ser tomado:
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {DAYS_OF_WEEK.map((day) => {
                  const isSelected = formData.selectedDays.includes(day.id);
                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => toggleDay(day.id)}
                      style={{
                        flex: '1 0 12%',
                        minWidth: '40px',
                        padding: '10px 4px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #0D6C5D' : '1px solid #CBD5E1',
                        background: isSelected ? '#0D6C5D' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#334155',
                        fontWeight: 800,
                        fontSize: '12px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: '11px', color: '#0D6C5D', fontWeight: 600, marginTop: '8px' }}>
                📌 Frequência calculada: <strong>{getComputedFrequencyText()}</strong>
              </p>
            </div>
          )}

          {formData.frequencyType === 'alternate_days' && (
            <div className="form-group">
              <label className="form-label">Intervalo de Dias Alternados</label>
              <select
                className="form-select"
                value={formData.alternateInterval}
                onChange={(e) => setFormData({ ...formData, alternateInterval: e.target.value })}
              >
                <option value="Dia sim, dia não (a cada 48h)">Dia sim, dia não (a cada 48h)</option>
                <option value="A cada 3 dias">A cada 3 dias</option>
                <option value="A cada 4 dias">A cada 4 dias</option>
                <option value="Semanalmente (a cada 7 dias)">Semanalmente (a cada 7 dias)</option>
                <option value="A cada 15 dias">A cada 15 dias</option>
              </select>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Horário Principal</label>
              <input
                type="time"
                className="form-input"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estoque Inicial (Doses)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Ex: 30"
                value={formData.currentStock}
                onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Cadastrar Medicamento
          </button>
        </form>
      </div>
    </div>
  );
};

