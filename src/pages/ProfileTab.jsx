import React, { useState } from 'react';
import { useHealth, THEMES } from '../context/HealthContext';
import {
  Settings,
  Phone,
  Camera,
  Sparkles,
  Edit3,
  Users,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  LogIn,
  LogOut,
  Palette,
  Eye,
  Type,
  Volume2,
  HeartPulse,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { NotificationCenterModal } from '../components/modals/NotificationCenterModal';
import { EditProfileModal } from '../components/modals/EditProfileModal';
import { FamilyGroupModal } from '../components/modals/FamilyGroupModal';
import { AuthModal } from '../components/modals/AuthModal';
import { ThemeColorModal } from '../components/modals/ThemeColorModal';
import { AccessibilityModal } from '../components/modals/AccessibilityModal';

export const ProfileTab = () => {
  const {
    userProfile,
    familyGroupCode,
    familyGroup,
    leaveFamilyGroup,
    authUser,
    logoutPatient,
    themeColor,
    fontScale,
    highContrast
  } = useHealth();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('login');

  const openAuth = (tabName = 'login') => {
    setAuthInitialTab(tabName);
    setIsAuthModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ---------------- TOP HEADER: TITLE & QUICK ACTIONS ---------------- */}
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '4px'
        }}
      >
        <div>
          <h1 className="page-title" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)' }}>
            Meu Perfil
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>
            Gerencie seu prontuário médico, preferências e sincronização
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsEditProfileOpen(true)}
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '100px',
              padding: '9px 18px',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px var(--primary-glow)',
              transition: 'all 0.2s ease'
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
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease'
            }}
            aria-label="Configurações e Notificações"
            title="Configurações"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* ---------------- NOTICE BANNER: FAMILY GROUP SYNC ACTIVE ---------------- */}
      {familyGroupCode && (
        <div
          style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            color: '#1E40AF',
            borderRadius: '16px',
            padding: '14px 18px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 2px 10px rgba(37, 99, 235, 0.08)'
          }}
        >
          <span style={{ flex: 1, minWidth: '220px', lineHeight: 1.4 }}>
            💡 <strong>Você está sincronizado no Grupo Familiar ({familyGroupCode})</strong> — Exibindo registros de saúde compartilhados. Para ver apenas seu perfil individual, saia do grupo.
          </span>
          <button
            onClick={leaveFamilyGroup}
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
            }}
          >
            <LogOut size={13} /> Sair do Grupo
          </button>
        </div>
      )}

      {/* ---------------- MAIN HERO PROFILE CARD (FULLY RESPONSIVE) ---------------- */}
      <div
        className="card"
        style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          {/* Avatar with Camera Overlay */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary)',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 14px var(--primary-glow)'
              }}
            />
            <button
              onClick={() => setIsEditProfileOpen(true)}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              title="Trocar Foto / Avatar"
            >
              <Camera size={13} />
            </button>
          </div>

          {/* User Details */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
                {userProfile.name}
              </h2>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                style={{
                  background: 'var(--primary-light)',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={12} /> Avatar API
              </button>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '3px' }}>
              {userProfile.age} • {userProfile.location}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '18px 0' }} />

        {/* 4 Responsive Health Metrics (Tipo Sanguíneo | Altura | Peso | Status) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '12px'
          }}
        >
          <div style={{ background: '#FFF5F5', padding: '12px', borderRadius: '14px', border: '1px solid #FEE2E2' }}>
            <span style={{ fontSize: '11px', color: '#991B1B', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>
              Tipo Sanguíneo
            </span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#DC2626' }}>
              {userProfile.bloodType || '--'}
            </span>
          </div>

          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>
              Altura
            </span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              {userProfile.height || '--'}
            </span>
          </div>

          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>
              Peso
            </span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              {userProfile.weight || '--'}
            </span>
          </div>

          <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '14px', border: '1px solid #BCE3DC' }}>
            <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>
              Conta Sincronizada
            </span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <UserCheck size={16} /> {authUser ? 'Firebase Auth' : 'Modo Local'}
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- 2-COLUMN RESPONSIVE GRID LAYOUT ---------------- */}
      <div className="grid-responsive-2" style={{ gap: '20px' }}>
        {/* LEFT COLUMN: Grupo Familiar, Contatos de Emergência & Plano de Saúde */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card: GRUPO FAMILIAR */}
          <div
            className="card"
            style={{
              padding: '20px',
              borderRadius: '20px',
              border: familyGroupCode ? '2px solid var(--primary)' : '1px solid var(--border-color)',
              background: familyGroupCode ? '#F4FBF9' : '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    {familyGroupCode ? (familyGroup?.familyName || 'Grupo Familiar') : 'Grupo Familiar Compartilhado'}
                  </h3>
                  <span style={{ fontSize: '12px', color: familyGroupCode ? 'var(--primary)' : '#64748B', fontWeight: 600 }}>
                    {familyGroupCode ? `Conectado • Código: ${familyGroupCode}` : 'Acesso a consultas e exames da família'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {familyGroupCode && (
                  <button
                    onClick={leaveFamilyGroup}
                    style={{
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      border: '1px solid #FCA5A5',
                      borderRadius: '12px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Sair do grupo familiar e voltar ao perfil individual"
                  >
                    <LogOut size={13} /> Sair
                  </button>
                )}
                <button
                  onClick={() => setIsFamilyModalOpen(true)}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {familyGroupCode ? 'Gerenciar' : 'Entrar / Criar'}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4, margin: 0 }}>
              {familyGroupCode
                ? `Sincronizado com ${familyGroup?.members?.length || 1} membro(s) no Firebase usando o código de 6 dígitos.`
                : 'Conecte sua família usando um código de 6 dígitos para acompanhar medicamentos e exames compartilhados.'}
            </p>
          </div>

          {/* Card: CONTATOS DE EMERGÊNCIA */}
          <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                CONTATOS DE EMERGÊNCIA
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Edit3 size={13} /> Editar
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              {userProfile.emergencyContact?.name ? (
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    {userProfile.emergencyContact.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                    {userProfile.emergencyContact.relation || 'Contato'} {userProfile.emergencyContact.phone ? `• ${userProfile.emergencyContact.phone}` : ''}
                  </p>
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#94A3B8' }}>
                    Nenhum contato cadastrado
                  </h4>
                  <p style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '2px' }}>
                    Clique em Editar para cadastrar um telefone de emergência
                  </p>
                </div>
              )}

              {userProfile.emergencyContact?.phone && (
                <a
                  href={`tel:${userProfile.emergencyContact.phone.replace(/\D/g, '')}`}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px var(--primary-glow)',
                    transition: 'transform 0.15s ease'
                  }}
                  aria-label="Ligar para emergência"
                  title="Ligar Agora"
                >
                  <Phone size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Card: PLANO DE SAÚDE */}
          <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                PLANO DE SAÚDE
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Edit3 size={13} /> Editar
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  {userProfile.healthPlan?.name || 'Sem plano cadastrado'}
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                  {userProfile.healthPlan?.planType
                    ? `${userProfile.healthPlan.planType} ${userProfile.healthPlan.number ? `• ${userProfile.healthPlan.number}` : ''}`
                    : userProfile.healthPlan?.number || 'Clique em Editar para cadastrar a carteirinha'}
                </p>
              </div>

              {userProfile.healthPlan?.name && userProfile.healthPlan.name !== 'Sem plano cadastrado' && (
                <div
                  style={{
                    backgroundColor: '#0F2644',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.3px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <ShieldCheck size={15} color="#10B981" />
                  <span>{userProfile.healthPlan.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Alergias & Condições, Aparência, Acessibilidade & Conta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card: ALERGIAS E CONDIÇÕES */}
          <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                ALERGIAS E CONDIÇÕES
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Edit3 size={13} /> Editar
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {userProfile.allergiesAndConditions && userProfile.allergiesAndConditions.length > 0 ? (
                userProfile.allergiesAndConditions.map((item, idx) => {
                  const text = typeof item === 'string' ? item : item.text;
                  const isDanger = typeof item === 'object' ? item.type === 'danger' : text.toLowerCase().includes('alergia');
                  return (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: isDanger ? '#FEE2E2' : '#FEF3C7',
                        color: isDanger ? '#EF4444' : '#D97706',
                        fontSize: '13px',
                        fontWeight: 700,
                        padding: '8px 14px',
                        borderRadius: '12px'
                      }}
                    >
                      {text}
                    </span>
                  );
                })
              ) : (
                <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>
                  Nenhuma alergia ou condição cadastrada
                </span>
              )}
            </div>
          </div>

          {/* Card: APARÊNCIA & CORES DO APLICATIVO */}
          <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                APARÊNCIA & CORES DO APLICATIVO
              </h3>
              <button
                onClick={() => setIsThemeModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Palette size={14} /> Personalizar
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)`,
                    boxShadow: '0 2px 8px var(--primary-glow)',
                    flexShrink: 0
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    {THEMES[themeColor]?.name || 'Verde Esmeralda'}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Paleta de cores ativa no aplicativo
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsThemeModalOpen(true)}
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Trocar Cor
              </button>
            </div>
          </div>

          {/* Card: ACESSIBILIDADE & INCLUSÃO (A11Y) */}
          <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                ACESSIBILIDADE & INCLUSÃO (A11Y)
              </h3>
              <button
                onClick={() => setIsA11yModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Eye size={14} /> Ajustar
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Eye size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    Texto {fontScale === 'xlarge' ? 'Extra Grande (+25%)' : fontScale === 'large' ? 'Grande (+12%)' : 'Normal'} • {highContrast ? 'Alto Contraste' : 'Contraste Padrão'}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Leitor de áudio por voz e navegação por teclado
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsA11yModalOpen(true)}
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Configurar
              </button>
            </div>
          </div>

          {/* Card: CONTA DO PACIENTE (FIREBASE AUTH) */}
          <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
              CONTA & SEGURANÇA (FIREBASE AUTH)
            </h3>

            {authUser ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--primary)' }} /> {authUser.displayName || 'Paciente Autenticado'}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                    {authUser.email}
                  </p>
                </div>

                <button
                  onClick={logoutPatient}
                  style={{
                    backgroundColor: '#FEE2E2',
                    color: '#991B1B',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <LogOut size={14} /> Sair
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    Modo Local / Não Logado
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                    Cadastre-se para salvar seu prontuário na nuvem.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openAuth('login')}
                    style={{
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Entrar
                  </button>

                  <button
                    onClick={() => openAuth('register')}
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
      <FamilyGroupModal isOpen={isFamilyModalOpen} onClose={() => setIsFamilyModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialTab={authInitialTab} />
      <NotificationCenterModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <ThemeColorModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
      <AccessibilityModal isOpen={isA11yModalOpen} onClose={() => setIsA11yModalOpen(false)} />
    </div>
  );
};
