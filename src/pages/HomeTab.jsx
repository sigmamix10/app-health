import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Pill, Activity, Heart, Calendar, ChevronRight, Users, Volume2, VolumeX } from 'lucide-react';
import { DirectionsModal } from '../components/modals/DirectionsModal';
import { FamilyGroupModal } from '../components/modals/FamilyGroupModal';

export const HomeTab = () => {
  const {
    userProfile,
    appointments,
    medications,
    vitals,
    setActiveTab,
    toggleMedicationStatus,
    familyGroupCode,
    familyGroup,
    speakText,
    isSpeaking,
    stopSpeech
  } = useHealth();

  const [selectedApp, setSelectedApp] = useState(null);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);

  // Next Appointment
  const nextAppointment = appointments.find((app) => app.isUpcoming) || appointments[0];

  // Today's medications
  const todayMeds = medications.filter((m) => m.category === 'active').slice(0, 2);

  const handleAudioSummary = () => {
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    const text = `Olá ${userProfile.name}. ${userProfile.greeting} ${
      nextAppointment ? `Sua próxima consulta é com ${nextAppointment.doctor}, ${nextAppointment.specialty}, marcada para ${nextAppointment.dateText || nextAppointment.fullDate}.` : ''
    } Você tem ${medications.filter((m) => m.status === 'pending').length} medicamento(s) pendente(s) hoje.`;

    speakText(text);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Profile Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
              Olá, {userProfile.name}
            </h1>

            <button
              onClick={() => setIsFamilyModalOpen(true)}
              style={{
                background: familyGroupCode ? '#E6F5F2' : '#F1F5F9',
                color: familyGroupCode ? '#0D6C5D' : '#475569',
                border: 'none',
                borderRadius: '100px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              <Users size={14} />
              <span>{familyGroupCode ? `${familyGroup?.familyName || 'Família'} (${familyGroupCode})` : '+ Grupo Familiar'}</span>
            </button>

            <button
              onClick={handleAudioSummary}
              style={{
                background: isSpeaking ? '#FEE2E2' : '#E6F5F2',
                color: isSpeaking ? '#DC2626' : '#0D6C5D',
                border: 'none',
                borderRadius: '100px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Ouvir resumo de voz"
            >
              {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isSpeaking ? 'Parar Áudio' : 'Ouvir Resumo'}</span>
            </button>
          </div>
          <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
            {userProfile.greeting}
          </p>
        </div>
        <img
          src={userProfile.avatar}
          alt={userProfile.name}
          onClick={() => setActiveTab('profile')}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #0D6C5D',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(13, 108, 93, 0.2)'
          }}
        />
      </div>

      {/* Responsive Dashboard Grid for PC / Tablet / Mobile */}
      <div className="desktop-dashboard-grid">
        {/* Left Column: Próxima Consulta & Sinais Vitais */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Next Appointment Green Card (Exact Figma match) */}
          <div className="card card-primary" style={{ padding: '22px', borderRadius: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} style={{ color: '#E6F5F2' }} />
                <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.8px', color: '#E6F5F2', textTransform: 'uppercase' }}>
                  PRÓXIMA CONSULTA
                </span>
              </div>
              <span className="badge badge-white-translucent" style={{ fontSize: '11px', padding: '4px 10px' }}>
                Confirmado
              </span>
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px', color: '#FFFFFF' }}>
              {nextAppointment.doctor}
            </h3>
            <p style={{ fontSize: '14px', color: '#D8F3EE', fontWeight: 500, marginBottom: '20px' }}>
              {nextAppointment.specialty} • {nextAppointment.hospital}
            </p>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                {nextAppointment.dateText}, às {nextAppointment.timeText}
              </span>
              <button
                onClick={() => {
                  setSelectedApp(nextAppointment);
                  setIsDirectionsOpen(true);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Ver Detalhes <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Vital Signs Section */}
          <div>
            <div className="section-title-row" style={{ marginTop: '4px' }}>
              <h2 className="section-title">Meus Sinais Vitais</h2>
              <span className="section-link" onClick={() => setActiveTab('vitals')}>
                Acompanhar
              </span>
            </div>

            <div className="grid-responsive-2">
              {/* Blood Pressure Card */}
              <div
                className="card"
                onClick={() => setActiveTab('vitals')}
                style={{ padding: '16px', borderRadius: '18px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: '#EFF6FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2563EB'
                    }}
                  >
                    <Activity size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>
                      Pressão Arterial
                    </span>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                    {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>
                    {vitals.bloodPressure.unit}
                  </span>
                </div>
              </div>

              {/* Heart Rate Card */}
              <div
                className="card"
                onClick={() => setActiveTab('vitals')}
                style={{ padding: '16px', borderRadius: '18px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: '#FEF2F2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EF4444'
                    }}
                  >
                    <Heart size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>
                      Frequência Card.
                    </span>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                    {vitals.heartRate.value}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>
                    {vitals.heartRate.unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Medicamentos de Hoje */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="section-title-row" style={{ marginTop: 0 }}>
            <h2 className="section-title">Medicamentos de Hoje</h2>
            <span className="section-link" onClick={() => setActiveTab('medications')}>
              Ver Lista
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todayMeds.map((med) => (
              <div
                key={med.id}
                className="card"
                onClick={() => toggleMedicationStatus(med.id)}
                style={{
                  padding: '18px',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  border: med.status === 'taken' ? '1px solid #BCE5DC' : '1px solid #EBF1F0',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: med.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: med.iconColor
                    }}
                  >
                    <Pill size={20} />
                  </div>
                  <span className={`badge ${med.status === 'taken' ? 'badge-green' : 'badge-orange'}`}>
                    {med.statusText}
                  </span>
                </div>

                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                  {med.shortName}
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                  {med.dosage} • {med.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location / Details Modal & Family Group Modal */}
      {selectedApp && (
        <DirectionsModal
          isOpen={isDirectionsOpen}
          onClose={() => setIsDirectionsOpen(false)}
          appointment={selectedApp}
        />
      )}
      <FamilyGroupModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
      />
    </div>
  );
};
