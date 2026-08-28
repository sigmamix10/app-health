import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { AuthModal } from '../components/modals/AuthModal';
import { X, ShieldCheck, FileText, ChevronDown, ChevronUp, Info, HelpCircle, Pill, Users, BookOpen } from 'lucide-react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'all 0.15s ease'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.3 }}>
          {question}
        </h4>
        <div style={{ color: '#0D6C5D', flexShrink: 0 }}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {isOpen && (
        <p style={{ fontSize: '12.5px', color: '#475569', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', lineHeight: 1.5, margin: '10px 0 0 0' }}>
          {answer}
        </p>
      )}
    </div>
  );
};

export const LandingPage = ({ onContinueAsGuest }) => {
  const { setActiveTab } = useHealth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [isTermsOpen, setIsTermsOpen] = useState(false);

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
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px 24px 16px',
        backgroundColor: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        boxSizing: 'border-box'
      }}
    >
      {/* Main Column Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Top Header Logo & Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}
        >
          {/* Logo Icon Squircle */}
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              backgroundColor: '#0D6C5D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(13, 108, 93, 0.25)',
              flexShrink: 0
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h4.28" stroke="#FFFFFF" strokeWidth="2.2" />
            </svg>
          </div>

          {/* Brand Name */}
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#0F172A',
              margin: 0,
              letterSpacing: '-0.6px',
              lineHeight: 1
            }}
          >
            Health App
          </h1>
        </div>

        {/* Hero Image Container Card with Unsplash Photo */}
        <div
          style={{
            width: '100%',
            height: '270px',
            borderRadius: '28px',
            position: 'relative',
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
            marginBottom: '24px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            backgroundColor: '#1E293B'
          }}
        >
          {/* Main Unsplash Stethoscope & Clipboard Photo */}
          <img
            src="/landing-banner.jpg"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1000&auto=format&fit=crop';
            }}
            alt="Health App Prancheta e Estetoscópio"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Subtle Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.5) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Top-Left Badge */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 5
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#0D6C5D',
                display: 'inline-block'
              }}
            />
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 800,
                color: '#0D6C5D',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              SUA SAÚDE EM DIA
            </span>
          </div>

          {/* Bottom Banner Glassmorphism Label */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              padding: '10px 14px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              zIndex: 5
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: '#E6F5F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0D6C5D'
                }}
              >
                <ShieldCheck size={16} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>
                Prontuário & Rotina Médica
              </span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#0D6C5D', backgroundColor: '#E6F5F2', padding: '3px 8px', borderRadius: '100px' }}>
              Digital
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h2
          style={{
            fontSize: '23px',
            fontWeight: 800,
            color: '#0F172A',
            textAlign: 'center',
            letterSpacing: '-0.3px',
            lineHeight: 1.25,
            margin: '0 0 10px 0',
            maxWidth: '320px'
          }}
        >
          Seu companheiro de saúde pessoal
        </h2>

        {/* Subtitle Text */}
        <p
          style={{
            fontSize: '13.5px',
            color: '#64748B',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: '340px',
            margin: '0 0 28px 0',
            fontWeight: 400
          }}
        >
          Acompanhe seus medicamentos de forma simples, organize exames, agende consultas médicas e monitore seus sinais vitais diariamente em um só lugar.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '360px' }}>
          {/* Primary Action Button: Entrar */}
          <button
            onClick={() => handleOpenAuth('login')}
            style={{
              backgroundColor: '#0D6C5D',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '15px 24px',
              fontSize: '15.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(13, 108, 93, 0.2)',
              transition: 'transform 0.15s ease, background-color 0.15s ease',
              textAlign: 'center',
              width: '100%'
            }}
          >
            Entrar no Aplicativo
          </button>

          {/* Secondary Action Button: Criar Conta Grátis */}
          <button
            onClick={() => handleOpenAuth('register')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0D6C5D',
              border: '1.5px solid #E2E8F0',
              borderRadius: '16px',
              padding: '14px 24px',
              fontSize: '15.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
              textAlign: 'center',
              width: '100%'
            }}
          >
            Criar Conta Grátis
          </button>

          {/* Patient User Guide Button */}
          <button
            onClick={() => setActiveTab('guide')}
            style={{
              backgroundColor: '#E6F5F2',
              color: '#0D6C5D',
              border: '1px solid #BCE5DC',
              borderRadius: '16px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%'
            }}
          >
            <BookOpen size={18} /> Guia de Uso do Paciente
          </button>
        </div>

        {/* Quick Guest Link so user can explore app freely */}
        <button
          onClick={handleGuest}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: '12px',
            cursor: 'pointer',
            marginTop: '12px',
            marginBottom: '24px',
            fontWeight: 600
          }}
        >
          (Explorar modo de demonstração)
        </button>

        {/* ---------------- SEÇÃO DE INFORMAÇÕES DO APLICATIVO ---------------- */}
        <div style={{ width: '100%', maxWidth: '380px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Info size={18} style={{ color: '#0D6C5D' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Recursos Principais
            </h3>
          </div>

          <div className="grid-responsive-2" style={{ gap: '10px' }}>
            <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EBF1F0' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <Pill size={18} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Medicamentos Flexíveis</h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', lineHeight: 1.4 }}>
                Agende dias específicos (ex: Domingos ou Seg/Qua/Sex) e dias alternados com alerta de estoque.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EBF1F0' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#E6F5F2', color: '#0D6C5D', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <Users size={18} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Grupo Familiar PIN</h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', lineHeight: 1.4 }}>
                Código de 6 dígitos para compartilhar e acompanhar dados de parentes em tempo real.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- SEÇÃO DE FAQ (PERGUNTAS FREQUENTES) ---------------- */}
        <div style={{ width: '100%', maxWidth: '380px', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <HelpCircle size={18} style={{ color: '#0D6C5D' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Perguntas Frequentes (FAQ)
            </h3>
          </div>

          <FaqItem
            question="Como agendar remédios que tomo apenas em dias específicos?"
            answer="No formulário de cadastro de medicamento, escolha 'Dias Específicos' no padrão de frequência e marque os dias da semana desejados (ex: marcaremos apenas [Dom] para tomar todo domingo)."
          />

          <FaqItem
            question="Como funciona o Grupo Familiar de 6 dígitos?"
            answer="Um membro cria o grupo no aplicativo e gera um código numérico de 6 dígitos. Os demais parentes digitam esse código para conectar os celulares e acompanhar remédios e consultas em tempo real."
          />

          <FaqItem
            question="Como ativar o leitor de voz e aumentar a letra do aplicativo?"
            answer="Acesse 'Meu Perfil' > 'Acessibilidade (a11y)' para escolher fontes maiores (+12% ou +25%), ativar o modo alto contraste ou clicar em 'Ouvir Resumo' para sintetizar a leitura em áudio."
          />

          <FaqItem
            question="O aplicativo é gratuito? Meus dados ficam salvos na nuvem?"
            answer="Sim! O Health App é gratuito. Ao criar sua conta com e-mail e senha, seus prontuários e medicamentos são salvos na nuvem criptografada do Firebase."
          />
        </div>

        {/* Terms of Use Footer Link */}
        <p style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center', marginTop: '24px', marginBottom: '6px' }}>
          Ao continuar, você concorda com nossos{' '}
          <button
            onClick={() => setIsTermsOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: '#0D6C5D',
              textDecoration: 'underline',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Termos de Uso
          </button>
        </p>

        {/* iOS Home Indicator Bar */}
        <div
          style={{
            width: '134px',
            height: '5px',
            backgroundColor: '#CBD5E1',
            borderRadius: '100px',
            marginTop: '4px',
            marginBottom: '8px'
          }}
        />
      </div>

      {/* Auth Modal Trigger */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialTab={authTab} />

      {/* Terms of Use Modal */}
      {isTermsOpen && (
        <div className="modal-overlay" onClick={() => setIsTermsOpen(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: '#E6F5F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0D6C5D'
                  }}
                >
                  <FileText size={20} />
                </div>
                <h3 className="modal-title" style={{ fontSize: '18px' }}>
                  Termos de Uso - Health App
                </h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsTermsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p>
                <strong>1. Privacidade e Segurança:</strong> O Health App prioriza a proteção dos seus dados de saúde. Todas as informações registradas (medicamentos, exames, consultas e sinais vitais) são armazenadas com criptografia e privacidade.
              </p>
              <p>
                <strong>2. Uso Informativo:</strong> O aplicativo funciona como um assistente pessoal de acompanhamento de rotina de saúde. Ele não substitui consultas médicas, diagnósticos profissionais ou emergências clínicas.
              </p>
              <p>
                <strong>3. Grupo Familiar:</strong> Ao compartilhar dados através do PIN de 6 dígitos do Grupo Familiar, certifique-se de disponibilizar o código apenas com pessoas de sua confiança.
              </p>
            </div>

            <button
              onClick={() => setIsTermsOpen(false)}
              className="form-submit-btn"
              style={{ marginTop: '20px' }}
            >
              Entendido e Aceito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


