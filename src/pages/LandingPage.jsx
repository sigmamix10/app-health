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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 20px 40px 20px',
        backgroundColor: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        boxSizing: 'border-box'
      }}
    >
      {/* Responsive Landing Container */}
      <div className="landing-container">
        {/* Top Header Navbar / Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid #E2E8F0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.5px', lineHeight: 1 }}>
                Health App
              </h1>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Plataforma Digital de Saúde</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleOpenAuth('login')}
              style={{
                backgroundColor: 'transparent',
                color: '#0D6C5D',
                border: '1.5px solid #0D6C5D',
                borderRadius: '100px',
                padding: '8px 20px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Entrar
            </button>
            <button
              onClick={() => handleOpenAuth('register')}
              style={{
                backgroundColor: '#0D6C5D',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '100px',
                padding: '9px 20px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(13, 108, 93, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              Criar Conta Grátis
            </button>
          </div>
        </div>

        {/* Hero Section Grid (2-Columns on Desktop/Tablet, 1-Column on Mobile) */}
        <div className="landing-hero-grid">
          {/* Left Column: Headlines & Call to Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#E6F5F2', color: '#0D6C5D', padding: '6px 14px', borderRadius: '100px', width: 'fit-content', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0D6C5D' }} />
              SUA SAÚDE EM DIA
            </div>

            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.8px', lineHeight: 1.25, margin: 0 }}>
              Seu companheiro de saúde pessoal & rotina médica
            </h2>

            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
              Acompanhe seus medicamentos de forma simples, organize exames laboratoriais, agende consultas médicas e monitore seus sinais vitais diariamente em um só lugar.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px', width: '100%', maxWidth: '420px' }}>
              <button
                onClick={() => handleOpenAuth('login')}
                style={{
                  backgroundColor: '#0D6C5D',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '16px 28px',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(13, 108, 93, 0.25)',
                  transition: 'transform 0.15s ease, background-color 0.15s ease',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                Entrar no Aplicativo
              </button>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleOpenAuth('register')}
                  style={{
                    flex: 1,
                    minWidth: '160px',
                    backgroundColor: '#FFFFFF',
                    color: '#0D6C5D',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '14px',
                    padding: '12px 18px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                    textAlign: 'center'
                  }}
                >
                  Criar Conta Grátis
                </button>

                <button
                  onClick={() => setActiveTab('guide')}
                  style={{
                    flex: 1,
                    minWidth: '180px',
                    backgroundColor: '#E6F5F2',
                    color: '#0D6C5D',
                    border: '1px solid #BCE5DC',
                    borderRadius: '14px',
                    padding: '12px 18px',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <BookOpen size={18} /> Guia de Uso
                </button>
              </div>

              <button
                onClick={handleGuest}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  marginTop: '4px',
                  fontWeight: 600,
                  textAlign: 'left'
                }}
              >
                (Explorar modo de demonstração sem cadastro)
              </button>
            </div>
          </div>

          {/* Right Column: Hero Banner Image */}
          <div
            style={{
              width: '100%',
              height: '340px',
              borderRadius: '28px',
              position: 'relative',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
              boxSizing: 'border-box',
              overflow: 'hidden',
              backgroundColor: '#1E293B'
            }}
          >
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

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.5) 100%)',
                pointerEvents: 'none'
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                padding: '14px 18px',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                zIndex: 5
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: '#E6F5F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0D6C5D'
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Prontuário & Rotina Médica
                  </h4>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Segurança & Criptografia na Nuvem</span>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0D6C5D', backgroundColor: '#E6F5F2', padding: '4px 10px', borderRadius: '100px' }}>
                Digital
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- SEÇÃO DE RECURSOS PRINCIPAIS (RESPONSIVE GRID) ---------------- */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={20} style={{ color: '#0D6C5D' }} />
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Recursos Principais
            </h3>
          </div>

          <div className="grid-responsive-2" style={{ gap: '16px' }}>
            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '20px', border: '1px solid #EBF1F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <Pill size={20} />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>Medicamentos Flexíveis</h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', lineHeight: 1.5 }}>
                Agende dias específicos da semana (ex: Apenas aos Domingos ou Seg/Qua/Sex) e dias alternados com cálculo automático de estoque.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '20px', border: '1px solid #EBF1F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#E6F5F2', color: '#0D6C5D', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <Users size={20} />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>Grupo Familiar (Código 6 Dígitos)</h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', lineHeight: 1.5 }}>
                Conecte familiares e cuidadores usando um PIN exclusivo de 6 dígitos para acompanhar remédios e consultas em tempo real.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '20px', border: '1px solid #EBF1F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <FileText size={20} />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>Exames & Laudos PDF</h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', lineHeight: 1.5 }}>
                Visualize laudos laboratoriais em PDF, acompanhe recomendações de jejum e arquive exames anteriores com facilidade.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '20px', border: '1px solid #EBF1F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <ShieldCheck size={20} />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>Sinais Vitais & Leitor por Voz</h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', lineHeight: 1.5 }}>
                Monitore pressão arterial, glicose e batimentos cardíacos, com leitor de áudio por voz e temas acessíveis em alto contraste.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- SEÇÃO DE FAQ (PERGUNTAS FREQUENTES - RESPONSIVE GRID) ---------------- */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={20} style={{ color: '#0D6C5D' }} />
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Perguntas Frequentes (FAQ)
            </h3>
          </div>

          <div className="grid-responsive-2" style={{ gap: '12px' }}>
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
        </div>

        {/* Footer & Terms Link */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingTop: '16px' }}>
          <p style={{ fontSize: '12.5px', color: '#94A3B8', textAlign: 'center', margin: 0 }}>
            Ao continuar, você concorda com nossos{' '}
            <button
              onClick={() => setIsTermsOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#0D6C5D',
                textDecoration: 'underline',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '12.5px'
              }}
            >
              Termos de Uso
            </button>
          </p>
        </div>
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


