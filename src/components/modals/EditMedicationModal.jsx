import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Edit3 } from 'lucide-react';

export const EditMedicationModal = ({ isOpen, onClose, med }) => {
  const { updateMedication } = useHealth();
  const [formData, setFormData] = useState({
    dosage: '',
    time: '08:00',
    frequency: '1x ao dia'
  });

  useEffect(() => {
    if (med) {
      setFormData({
        dosage: med.dosage || '',
        time: med.time || '08:00',
        frequency: med.frequency || '1x ao dia'
      });
    }
  }, [med]);

  if (!isOpen || !med) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMedication(med.id, {
      dosage: formData.dosage,
      time: formData.time,
      frequency: formData.frequency,
      tagText: `Às ${formData.time}`
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit3 style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">Editar Medicamento</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>{med.name}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Dosagem</label>
            <input
              type="text"
              className="form-input"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Horário Preferencial</label>
            <input
              type="time"
              className="form-input"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Frequência</label>
            <input
              type="text"
              className="form-input"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};
