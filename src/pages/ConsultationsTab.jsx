import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Calendar, Bell, MapPin, Clock, Plus } from 'lucide-react';
import { RescheduleModal } from '../components/modals/RescheduleModal';
import { DirectionsModal } from '../components/modals/DirectionsModal';
import { NotificationCenterModal } from '../components/modals/NotificationCenterModal';
import { AddAppointmentModal } from '../components/modals/AddAppointmentModal';
import { MemberSelectorBar } from '../components/common/MemberSelectorBar';
import { FamilyGroupModal } from '../components/modals/FamilyGroupModal';

export const ConsultationsTab = () => {
  const { appointments, userProfile } = useHealth();
  const [selectedReschedule, setSelectedReschedule] = useState(null);
  const [selectedDirections, setSelectedDirections] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Family Group Member Selector Bar */}
      <MemberSelectorBar
        onOpenFamilyModal={() => setIsFamilyOpen(true)}
        onAddMember={() => setIsFamilyOpen(true)}
      />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Consultas • {userProfile?.name}</h1>
          <p className="page-subtitle">Calendário e histórico médico</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '12px'
            }}
          >
            <Plus size={18} />
            <span>Nova Consulta</span>
          </button>

          <button
            onClick={() => setIsNotifOpen(true)}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EBF1F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F172A',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            aria-label="Notificações"
          >
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* List of Doctor Cards */}
      <div className="grid-responsive-2">
        {appointments.length > 0 ? (
          appointments.map((app) => (
            <div
              key={app.id}
              className="card"
              style={{ padding: '18px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {/* Doctor Info & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src={app.avatar}
                    alt={app.doctor}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #E2E8F0'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{app.doctor}</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>{app.specialty}</p>
                  </div>
                </div>

                <span
                  className={`badge ${
                    app.status === 'Confirmado' || app.status === 'Agendado' ? 'badge-green' : 'badge-orange'
                  }`}
                >
                  {app.dateText || app.status}
                </span>
              </div>

              {/* Date & Location Box */}
              {(app.fullDate || app.hospital) && (
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    padding: '12px',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                    <MapPin size={15} style={{ color: '#64748B', flexShrink: 0 }} />
                    <span>{app.hospital}</span>
                  </div>
                  {app.timeText && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                      <Clock size={15} style={{ color: '#64748B', flexShrink: 0 }} />
                      <span>Horário: {app.timeText} • {app.type}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Action Links */}
              {app.isUpcoming && (
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                    {app.insurance}
                  </span>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <button
                      onClick={() => setSelectedReschedule(app)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#475569',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Reagendar
                    </button>
                    <button
                      onClick={() => setSelectedDirections(app)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0D6C5D',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Como Chegar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card" style={{ gridColumn: '1 / -1', padding: '40px 20px', textAlign: 'center', borderRadius: '22px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#E6F5F2', color: '#0D6C5D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              <Calendar size={28} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
              Nenhuma consulta agendada
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '400px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
              Organize seus compromissos médicos, especialidades e locais de atendimento para manter seu histórico em dia.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                background: '#0D6C5D',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(13, 108, 93, 0.25)'
              }}
            >
              + Agendar Primeira Consulta
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <RescheduleModal
        isOpen={!!selectedReschedule}
        onClose={() => setSelectedReschedule(null)}
        appointment={selectedReschedule}
      />
      <DirectionsModal
        isOpen={!!selectedDirections}
        onClose={() => setSelectedDirections(null)}
        appointment={selectedDirections}
      />
      <NotificationCenterModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <FamilyGroupModal isOpen={isFamilyOpen} onClose={() => setIsFamilyOpen(false)} />
    </div>
  );
};
