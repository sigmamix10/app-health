import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Settings, Phone, Camera, Sparkles, Edit3, Users, KeyRound, ArrowRight, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import { NotificationCenterModal } from '../components/modals/NotificationCenterModal';
import { EditProfileModal } from '../components/modals/EditProfileModal';
import { FamilyGroupModal } from '../components/modals/FamilyGroupModal';
import { AuthModal } from '../components/modals/AuthModal';

export const ProfileTab = () => {
  const { userProfile, familyGroupCode, familyGroup, authUser, logoutPatient } = useHealth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('login');

  const openAuth = (tabName = 'login') => {
    setAuthInitialTab(tabName);
    setIsAuthModalOpen(true);
  };

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
          {/* Main Profile Card */}
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
                  title="Editar Perfil"
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

          {/* Card: GRUPO FAMILIAR (Destaque Principal) */}
          <div
            className="card"
            style={{
              padding: '20px',
              borderRadius: '20px',
              border: familyGroupCode ? '2px solid #0D6C5D' : '1px solid #E2E8F0',
              background: familyGroupCode ? '#F4FBF9' : '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#E6F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D6C5D' }}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    {familyGroupCode ? (familyGroup?.familyName || 'Grupo Familiar') : 'Grupo Familiar Compartilhado'}
                  </h3>
                  <span style={{ fontSize: '12px', color: familyGroupCode ? '#0D6C5D' : '#64748B', fontWeight: 600 }}>
                    {familyGroupCode ? `Conectado • Código: ${familyGroupCode}` : 'Acesso a consultas e exames da família'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsFamilyModalOpen(true)}
                style={{
                  backgroundColor: '#0D6C5D',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {familyGroupCode ? 'Gerenciar' : 'Entrar / Criar'}
                <ArrowRight size={14} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4, margin: '8px 0 0 0' }}>
              {familyGroupCode
                ? `Você está sincronizado com ${familyGroup?.members?.length || 1} membro(s) no Firebase usando o código de 6 dígitos.`
                : 'Conecte sua família usando um código exclusivo de 6 dígitos para sincronizar exames, remédios e consultas.'}
            </p>
          </div>

          {/* Card: CONTATOS DE EMERGÊNCIA */}
          <div className="card" style={{ padding: '18px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                CONTATOS DE EMERGÊNCIA
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0D6C5D',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Edit3 size={13} /> Editar
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Alergias & Plano de Saúde */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card: ALERGIAS E CONDIÇÕES */}
          <div className="card" style={{ padding: '18px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                ALERGIAS E CONDIÇÕES
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0D6C5D',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
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

          {/* Card: PLANO DE SAÚDE */}
          <div className="card" style={{ padding: '18px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                PLANO DE SAÚDE
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0D6C5D',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Edit3 size={13} /> Editar
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

              {/* Health Plan Badge Icon */}
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <ShieldCheck size={14} color="#10B981" />
                  <span>{userProfile.healthPlan.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card: CONTA DO PACIENTE (FIREBASE AUTH) */}
          <div className="card" style={{ padding: '18px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              CONTA & SEGURANÇA (FIREBASE AUTH)
            </h3>

            {authUser ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={18} style={{ color: '#0D6C5D' }} /> {authUser.displayName || 'Paciente Autenticado'}
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
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <LogOut size={14} /> Sair
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    Modo Local / Não Logado
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                    Cadastre-se com e-mail e senha para salvar na nuvem.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openAuth('login')}
                    style={{
                      backgroundColor: '#E6F5F2',
                      color: '#0D6C5D',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '8px 12px',
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
                      backgroundColor: '#0D6C5D',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '8px 12px',
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
    </div>
  );
};
