import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Eye, Volume2, VolumeX, Type, Sun, Moon, Keyboard } from 'lucide-react';

export const AccessibilityModal = ({ isOpen, onClose }) => {
  const {
    fontScale,
    setFontScale,
    highContrast,
    setHighContrast,
    isSpeaking,
    speakText,
    stopSpeech
  } = useHealth();

  if (!isOpen) return null;

  const handleTestAudio = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speakText('Olá! O assistente de voz do aplicativo Health App está ativo e funcionando perfeitamente.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}
            >
              <Eye size={22} />
            </div>
            <div>
              <h3 className="modal-title">Acessibilidade & Inclusão (a11y)</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Ajuste texto, contraste e leitor de voz</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 1. Font Size / Scale Selector */}
          <div className="form-group" style={{ background: '#F8FAFC', padding: '14px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Type size={16} style={{ color: 'var(--primary)' }} /> Tamanho da Fonte do Aplicativo
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setFontScale('normal')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: fontScale === 'normal' ? '2px solid var(--primary)' : '1px solid #CBD5E1',
                  background: fontScale === 'normal' ? 'var(--primary-light)' : '#FFFFFF',
                  color: fontScale === 'normal' ? 'var(--primary)' : '#475569',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Normal (100%)
              </button>

              <button
                type="button"
                onClick={() => setFontScale('large')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: fontScale === 'large' ? '2px solid var(--primary)' : '1px solid #CBD5E1',
                  background: fontScale === 'large' ? 'var(--primary-light)' : '#FFFFFF',
                  color: fontScale === 'large' ? 'var(--primary)' : '#475569',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Grande (+12%)
              </button>

              <button
                type="button"
                onClick={() => setFontScale('xlarge')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: fontScale === 'xlarge' ? '2px solid var(--primary)' : '1px solid #CBD5E1',
                  background: fontScale === 'xlarge' ? 'var(--primary-light)' : '#FFFFFF',
                  color: fontScale === 'xlarge' ? 'var(--primary)' : '#475569',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Extra (+25%)
              </button>
            </div>
          </div>

          {/* 2. High Contrast Mode Toggle */}
          <div className="form-group" style={{ background: '#F8FAFC', padding: '14px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <Moon size={16} style={{ color: 'var(--primary)' }} /> Modo Alto Contraste (Baixa Visão)
              </label>
              <p style={{ fontSize: '11px', color: '#64748B' }}>
                Fundo preto e texto de máximo contraste visual (WCAG AAA)
              </p>
            </div>

            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              style={{
                padding: '8px 16px',
                borderRadius: '100px',
                border: 'none',
                background: highContrast ? '#00E6B8' : '#CBD5E1',
                color: highContrast ? '#000000' : '#475569',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {highContrast ? 'Ativado ✓' : 'Desativado'}
            </button>
          </div>

          {/* 3. Audio Speech Reader */}
          <div className="form-group" style={{ background: '#F8FAFC', padding: '14px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <Volume2 size={16} style={{ color: 'var(--primary)' }} /> Leitor de Resumo de Voz
              </label>
              <p style={{ fontSize: '11px', color: '#64748B' }}>
                Síntese de voz em português para ler lembretes de consultas e remédios
              </p>
            </div>

            <button
              type="button"
              onClick={handleTestAudio}
              style={{
                padding: '8px 14px',
                borderRadius: '100px',
                border: 'none',
                background: isSpeaking ? '#FEE2E2' : 'var(--primary-light)',
                color: isSpeaking ? '#DC2626' : 'var(--primary)',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isSpeaking ? 'Parar' : 'Testar Voz'}</span>
            </button>
          </div>

          {/* 4. Keyboard Navigation Hint */}
          <div style={{ background: '#E6F5F2', padding: '12px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Keyboard size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <p style={{ fontSize: '12px', color: '#0D6C5D', lineHeight: 1.3, fontWeight: 600 }}>
              <strong>Navegação por Teclado:</strong> Pressione a tecla <code>Tab</code> para navegar entre os botões. Todos os elementos possuem contorno verde de foco visível.
            </p>
          </div>

          <button onClick={onClose} className="form-submit-btn">
            Salvar Ajustes de Acessibilidade
          </button>
        </div>
      </div>
    </div>
  );
};
