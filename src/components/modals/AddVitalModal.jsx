import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Activity } from 'lucide-react';

export const AddVitalModal = ({ isOpen, onClose }) => {
  const { addVitalReading } = useHealth();
  const [type, setType] = useState('bloodPressure');
  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [value, setValue] = useState('72');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'bloodPressure') {
      addVitalReading({ type, systolic, diastolic });
    } else {
      addVitalReading({ type, value });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity style={{ color: '#0D6C5D' }} size={22} />
            <h3 className="modal-title">Registrar Sinal Vital</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tipo de Medição</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="bloodPressure">Pressão Arterial (mmHg)</option>
              <option value="heartRate">Frequência Cardíaca (bpm)</option>
              <option value="weight">Peso Corporal (kg)</option>
              <option value="glucose">Glicose em Jejum (mg/dL)</option>
            </select>
          </div>

          {type === 'bloodPressure' ? (
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Sistólica (Máx)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Ex: 120"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Diastólica (Mín)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Ex: 80"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Valor Medido</label>
              <input
                type="number"
                step="any"
                className="form-input"
                placeholder={type === 'weight' ? 'Ex: 78.4' : 'Ex: 72'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="form-submit-btn">
            Salvar Medição
          </button>
        </form>
      </div>
    </div>
  );
};
