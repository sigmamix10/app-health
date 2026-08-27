import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Volume2, VolumeX, Sun, Type, X, Accessibility } from 'lucide-react';

export const AccessibilityWidget = () => {
  const {
    fontScale,
    setFontScale,
    highContrast,
    setHighContrast,
    isSpeaking,
    speakText,
    stopSpeech,
    userProfile,
    appointments,
    medications,
    vitals
  } = useHealth();

  const [isOpen, setIsOpen] = useState(false);

  const handleReadSummary = () => {
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    const nextApp = appointments.find((a) => a.isUpcoming) || appointments[0];
    const pendingMeds = medications.filter((m) => m.status === 'pending');

    let audioText = `Olá, ${userProfile.name}. Aqui está o resumo da sua saúde. `;

    if (nextApp) {
      audioText += `Sua próxima consulta é com ${nextApp.doctor}, ${nextApp.specialty}, agendada para ${nextApp.dateText || nextApp.fullDate}. `;
    }

    if (pendingMeds.length > 0) {
      audioText += `Você tem ${pendingMeds.length} medicamento(s) pendente(s) hoje, incluindo ${pendingMeds.map((m) => m.shortName).join(' e ')}. `;
    } else {
      audioText += `Todos os seus medicamentos de hoje já foram tomados. Parabéns pelo cuidado! `;
    }

    if (vitals && vitals.bloodPressure) {
      audioText += `Sua última pressão arterial registrada foi ${vitals.bloodPressure.systolic} por ${vitals.bloodPressure.diastolic} milímetros de mercúrio.`;
    }

    speakText(audioText);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 150 }}>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: highContrast ? '#00E6B8' : '#0D6C5D',
            color: highContrast ? '#000000' : '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            transition: 'transform 0.2s ease'
          }}
          title="Abrir Painel de Acessibilidade (Alto Contraste, Tamanho de Fonte, Áudio)"
          aria-label="Abrir recursos de acessibilidade"
        >
          <Accessibility size={24} />
        </button>
      )}

      {/* Accessibility Controls Card */}
      {isOpen && (
        <div
          style={{
            width: '320px',
            backgroundColor: highContrast ? '#121212' : '#FFFFFF',
            border: highContrast ? '2px solid #00E6B8' : '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '18px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Accessibility size={20} style={{ color: highContrast ? '#00E6B8' : '#0D6C5D' }} />
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: highContrast ? '#FFFFFF' : '#0F172A' }}>
                Acessibilidade
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: highContrast ? '#FFFFFF' : '#64748B',
                cursor: 'pointer'
              }}
              aria-label="Fechar acessibilidade"
            >
              <X size={18} />
            </button>
          </div>

          {/* 1. Font Size Scaling */}
          <div>
            <label
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: highContrast ? '#E5E7EB' : '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px'
              }}
            >
              <Type size={15} /> Tamanho do Texto:
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              <button
                onClick={() => setFontScale('normal')}
                style={{
                  padding: '6px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '12px',
                  fontWeight: fontScale === 'normal' ? 800 : 500,
                  backgroundColor: fontScale === 'normal' ? (highContrast ? '#00E6B8' : '#0D6C5D') : 'transparent',
                  color: fontScale === 'normal' ? (highContrast ? '#000' : '#FFF') : (highContrast ? '#FFF' : '#334155'),
                  cursor: 'pointer'
                }}
              >
                Normal
              </button>

              <button
                onClick={() => setFontScale('large')}
                style={{
                  padding: '6px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  fontWeight: fontScale === 'large' ? 800 : 500,
                  backgroundColor: fontScale === 'large' ? (highContrast ? '#00E6B8' : '#0D6C5D') : 'transparent',
                  color: fontScale === 'large' ? (highContrast ? '#000' : '#FFF') : (highContrast ? '#FFF' : '#334155'),
                  cursor: 'pointer'
                }}
              >
                Grande
              </button>

              <button
                onClick={() => setFontScale('xlarge')}
                style={{
                  padding: '6px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  fontWeight: fontScale === 'xlarge' ? 800 : 500,
                  backgroundColor: fontScale === 'xlarge' ? (highContrast ? '#00E6B8' : '#0D6C5D') : 'transparent',
                  color: fontScale === 'xlarge' ? (highContrast ? '#000' : '#FFF') : (highContrast ? '#FFF' : '#334155'),
                  cursor: 'pointer'
                }}
              >
                Extra
              </button>
            </div>
          </div>

          {/* 2. High Contrast Mode */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: highContrast ? '#E5E7EB' : '#334155',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sun size={16} /> Alto Contraste
            </span>

            <button
              onClick={() => setHighContrast(!highContrast)}
              style={{
                backgroundColor: highContrast ? '#00E6B8' : '#F1F5F9',
                color: highContrast ? '#000000' : '#0D6C5D',
                border: 'none',
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {highContrast ? 'LIGADO' : 'DESLIGADO'}
            </button>
          </div>

          {/* 3. Text to Speech (Leitura de Voz) */}
          <button
            onClick={handleReadSummary}
            style={{
              backgroundColor: isSpeaking ? '#DC2626' : (highContrast ? '#00E6B8' : '#0D6C5D'),
              color: isSpeaking ? '#FFFFFF' : (highContrast ? '#000000' : '#FFFFFF'),
              border: 'none',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isSpeaking ? 'Parar Leitura em Voz Alta' : 'Ouvir Resumo da Saúde (Áudio)'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
