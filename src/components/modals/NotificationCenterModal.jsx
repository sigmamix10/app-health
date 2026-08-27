import React from 'react';
import { X, Bell, Pill, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export const NotificationCenterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Lembrete de Medicamento',
      desc: 'Hora de tomar Metformina (850mg) às 12:00.',
      time: 'Há 15 minutos',
      icon: Pill,
      color: '#D97706',
      unread: true
    },
    {
      id: 2,
      title: 'Consulta Confirmada',
      desc: 'Dr. Alexandre Santos (Cardiologista) amanhã às 14:30.',
      time: 'Há 2 horas',
      icon: Calendar,
      color: '#0D6C5D',
      unread: true
    },
    {
      id: 3,
      title: 'Novo Laudo Disponível',
      desc: 'Seu exame Hemograma Completo já está liberado pelo Fleury.',
      time: 'Ontem',
      icon: FileText,
      color: '#2563EB',
      unread: false
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell style={{ color: '#0D6C5D' }} size={22} />
            <h3 className="modal-title">Notificações</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {notifications.map((n) => {
            const IconComponent = n.icon;
            return (
              <div
                key={n.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: n.unread ? '#E6F5F2' : '#F8FAFC',
                  border: n.unread ? '1px solid #BCE5DC' : '1px solid #E2E8F0'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: n.color,
                    flexShrink: 0,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{n.title}</h5>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#475569', marginTop: '3px' }}>{n.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="form-submit-btn" onClick={onClose}>
          Marcar todas como lidas
        </button>
      </div>
    </div>
  );
};
