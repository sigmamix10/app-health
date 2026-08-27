import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Settings, Phone, Camera, Sparkles, Edit3 } from 'lucide-react';
import { NotificationCenterModal } from '../components/modals/NotificationCenterModal';
import { EditProfileModal } from '../components/modals/EditProfileModal';

export const ProfileTab = () => {
  const { userProfile } = useHealth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header: Title + Settings Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
        <h1 className="page-title" style={{ fontSize: '26px' }}>Meu Perfil</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setIsEditProfileOpen(true)}
            style={{
              backgroundColor: '#0D6C5D',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '100px',
              padding: '8px 16px',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(13, 108, 93, 0.25)'
            }}
          >
            <Edit3 size={15} /> Editar Perfil
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
              color: '#475569',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            aria-label="Configurações"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Grid Responsive Container */}
      <div className="grid-responsive-2">
        {/* Left Column: Main Profile Card & Emergency Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Main Profile Card (Matches Figma Screenshot exactly) */}
          <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
            {/* User Info Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #0D6C5D',
                    backgroundColor: '#FFFFFF'
                  }}
                />
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    backgroundColor: '#0D6C5D',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}
                  title="Editar Perfil e Avatar via API"
                >
                  <Camera size={13} />
                </button>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                    {userProfile.name}
                  </h2>
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    style={{
                      background: '#E6F5F2',
                      border: 'none',
                      color: '#0D6C5D',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Sparkles size={12} /> Avatar API
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                  {userProfile.age} • {userProfile.location}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '16px 0' }} />

            {/* 3 Metrics Row: Tipo Sanguíneo | Altura | Peso */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                  Tipo Sanguíneo
                </span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#EF4444' }}>
                  {userProfile.bloodType}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                  Altura
                </span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                  {userProfile.height}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                  Peso
                </span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                  {userProfile.weight}
                </span>
              </div>
            </div>
          </div>

          {/* Card: CONTATOS DE EMERGÊNCIA */}
          <div className="card" style={{ padding: '18px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              CONTATOS DE EMERGÊNCIA
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  {userProfile.emergencyContact.name}
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                  {userProfile.emergencyContact.relation} • {userProfile.emergencyContact.phone}
                </p>
              </div>

              <a
                href={`tel:${userProfile.emergencyContact.phone.replace(/\D/g, '')}`}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#E6F5F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0D6C5D',
                  textDecoration: 'none',
                  transition: 'transform 0.15s ease'
                }}
                aria-label="Ligar para emergência"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Alergias & Plano de Saúde */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card: ALERGIAS E CONDIÇÕES */}
          <div className="card" style={{ padding: '18px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              ALERGIAS E CONDIÇÕES
            </h3>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#EF4444',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '8px 14px',
                  borderRadius: '12px'
                }}
              >
                Alergia: Penicilina
              </span>
              <span
                style={{
                  backgroundColor: '#FEF3C7',
                  color: '#D97706',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '8px 14px',
                  borderRadius: '12px'
                }}
              >
                Hipertensão Leve
              </span>
            </div>
          </div>

          {/* Card: PLANO DE SAÚDE */}
          <div className="card" style={{ padding: '18px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              PLANO DE SAÚDE
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  {userProfile.healthPlan.name}
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                  {userProfile.healthPlan.planType} • {userProfile.healthPlan.number}
                </p>
              </div>

              {/* Bradesco Saúde Badge Logo */}
              <div
                style={{
                  backgroundColor: '#0F2644',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.3px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}
              >
                <span style={{ color: '#CC092F', fontWeight: 900 }}>Bradesco</span> Saúde
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
      <NotificationCenterModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
};
