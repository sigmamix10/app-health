import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Calendar } from 'lucide-react';

export const RescheduleModal = ({ isOpen, onClose, appointment }) => {
  const { rescheduleAppointment } = useHealth();
  const [newDate, setNewDate] = useState('2026-09-15');
  const [newTime, setNewTime] = useState('14:30');

  if (!isOpen || !appointment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = new Date(newDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    rescheduleAppointment(appointment.id, formattedDate, newTime);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">Reagendar Consulta</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>{appointment.doctor} • {appointment.specialty}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Selecione a nova data</label>
            <input
              type="date"
              className="form-input"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Horário disponível</label>
            <select
              className="form-select"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            >
              <option value="09:00">09:00</option>
              <option value="10:30">10:30</option>
              <option value="14:30">14:30</option>
              <option value="16:00">16:00</option>
              <option value="17:15">17:15</option>
            </select>
          </div>

          <button type="submit" className="form-submit-btn">
            Confirmar Reagendamento
          </button>
        </form>
      </div>
    </div>
  );
};
