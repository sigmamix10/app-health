import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, CheckCircle2, Clock, Pill } from 'lucide-react';

export const LogDoseModal = ({ isOpen, onClose, selectedMed }) => {
  const { medications, logDoseIntake } = useHealth();
  const activeMeds = medications.filter((m) => m.category === 'active');

  const [medId, setMedId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [timeTaken, setTimeTaken] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedMed) {
      setMedId(selectedMed.id);
    } else if (activeMeds.length > 0) {
      setMedId(activeMeds[0].id);
    }
    const nowStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setTimeTaken(nowStr);
  }, [selectedMed, isOpen]);

  if (!isOpen) return null;

  const currentMed = activeMeds.find((m) => m.id === medId) || activeMeds[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentMed) return;

    logDoseIntake({
      medId: currentMed.id,
      medName: currentMed.name,
      dosage: currentMed.dosage,
      quantityTaken: Number(quantity),
      timeTaken: timeTaken,
      notes: notes
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 style={{ color: '#0D6C5D' }} size={24} />
            <div>
              <h3 className="modal-title">Registrar Dose Tomada</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Informe a quantidade e o horário da dose</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Select Medication */}
          <div className="form-group">
            <label className="form-label">Medicamento</label>
            <select
              className="form-select"
              value={medId}
              onChange={(e) => setMedId(e.target.value)}
            >
              {activeMeds.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.name} ({med.dosage}) - Estoque: {med.currentStock} un.
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Taken */}
          <div className="form-group">
            <label className="form-label">Quantidade Tomada</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              {['1', '2', '0.5'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuantity(preset)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: quantity === preset ? '2px solid #0D6C5D' : '1px solid #CBD5E1',
                    background: quantity === preset ? '#E6F5F2' : '#FFFFFF',
                    color: quantity === preset ? '#0D6C5D' : '#334155',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  {preset} {Number(preset) > 1 ? 'comprimidos' : 'comprimido'}
                </button>
              ))}
            </div>
            <input
              type="number"
              step="any"
              className="form-input"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {/* Time Taken */}
          <div className="form-group">
            <label className="form-label">Horário de Ingestão</label>
            <input
              type="time"
              className="form-input"
              value={timeTaken}
              onChange={(e) => setTimeTaken(e.target.value)}
              required
            />
          </div>

          {/* Optional Notes */}
          <div className="form-group">
            <label className="form-label">Observações (Opcional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Tomado no almoço, junto com água"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="form-submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} /> Confirmar Registro da Dose
          </button>
        </form>
      </div>
    </div>
  );
};
