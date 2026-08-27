import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Activity, Pill, FileText, Calendar, Users, ShieldCheck, ArrowRight, Sparkles, HeartPulse, CheckCircle2, Lock } from 'lucide-react';
import { AuthModal } from '../components/modals/AuthModal';

export const LandingPage = ({ onContinueAsGuest }) => {
  const { setActiveTab } = useHealth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  const handleOpenAuth = (tabName) => {
    setAuthTab(tabName);
    setIsAuthModalOpen(true);
  };

  const handleGuest = () => {
    if (onContinueAsGuest) {
      onContinueAsGuest();
    } else {
      setActiveTab('home');
    }
  };

  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 16px',
        background: 'linear-gradient(180deg, #F4FBF9 0%, #FFFFFF 100%)'
      }}
    >
      {/* Container Wrapper */}
      <div style={{ maxWidth: '640px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* App Logo Badge */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #0D6C5D 0%, #084D42 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 10px 25px rgba(13, 108, 93, 0.3)',
            marginBottom: '20px'
          }}
        >
          <Activity size={36} />
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#0F172A',
            textAlign: 'center',
            letterSpacing: '-0.8px',
            lineHeight: 1.2,
            marginBottom: '12px'
          }}
        >
          Saúde & Acompanhamento
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: '#475569',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: '480px',
            marginBottom: '28px',
            fontWeight: 500
          }}
        >
          Seu prontuário digital completo. Sincronize exames, medicamentos, consultas e grupo familiar com segurança no Firebase.
        </p>

        {/* Main Action Buttons: Entrar ou Cadastrar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '360px', marginBottom: '32px' }}>
          <button
            onClick={() => handleOpenAuth('register')}
            style={{
              backgroundColor: '#0D6C5D',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(13, 108, 93, 0.25)',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>Criar Minha Conta Grátis</span>
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => handleOpenAuth('login')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0D6C5D',
              border: '2px solid #0D6C5D',
              borderRadius: '16px',
              padding: '14px 24px',
              fontSize: '15px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
          >
            <Lock size={18} />
            <span>Já tenho conta (Entrar)</span>
          </button>

          <button
            onClick={handleGuest}
            style={{
              backgroundColor: 'transparent',
              color: '#64748B',
              border: 'none',
              borderRadius: '12px',
              padding: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Experimentar sem logar (Modo Convidado)
          </button>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
            width: '100%'
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: '#FFFFFF',
              padding: '18px',
              borderRadius: '18px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Pill size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                Gestão de Remédios
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
                Controle de horários, notificações de dose e previsão automática de estoque.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: '#FFFFFF',
              padding: '18px',
              borderRadius: '18px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#E6F5F2',
                color: '#0D6C5D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Users size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                Grupo Familiar (PIN 6 dígitos)
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
                Compartilhe o histórico de consultas e exames da família através de um código de 6 dígitos.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: '#FFFFFF',
              padding: '18px',
              borderRadius: '18px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#EEF2FF',
                color: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Calendar size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                Exames & Consultas
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
                Agendamento de consultas com avatar do médico, exames laboratoriais e laudos.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div
            style={{
              background: '#FFFFFF',
              padding: '18px',
              borderRadius: '18px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#FEE2E2',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                Segurança Firebase Nuvem
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
                Seus dados protegidos por autenticação de e-mail e senha com sincronização automática.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialTab={authTab} />
    </div>
  );
};
