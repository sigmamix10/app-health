import React from 'react';
import { X, AlertCircle, CheckSquare } from 'lucide-react';

export const ExamPreparationModal = ({ isOpen, onClose, exam }) => {
  if (!isOpen || !exam) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle style={{ color: '#D97706' }} size={22} />
            <div>
              <h3 className="modal-title">Instruções de Preparação</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>{exam.title} • {exam.lab}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', padding: '12px 14px', borderRadius: '12px', marginBottom: '16px' }}>
          <p style={{ fontSize: '13px', color: '#B45309', fontWeight: 600 }}>
            🗓️ Exame agendado para: <strong>{exam.date}</strong>
          </p>
        </div>

        <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: '#0F172A' }}>
          Cuidados necessários antes do exame:
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {exam.preparationInstructions?.map((instruction, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#F8FAFC', padding: '10px 12px', borderRadius: '10px' }}>
              <CheckSquare size={18} style={{ color: '#0D6C5D', marginTop: '2px', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>{instruction}</span>
            </div>
          ))}
        </div>

        <button className="form-submit-btn" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};
