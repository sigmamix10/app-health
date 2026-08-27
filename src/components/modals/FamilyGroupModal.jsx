import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Users, Copy, Check, Share2, LogOut, KeyRound, Sparkles, UserPlus, HeartHandshake } from 'lucide-react';

export const FamilyGroupModal = ({ isOpen, onClose }) => {
  const {
    familyGroupCode,
    familyGroup,
    createFamilyGroup,
    joinFamilyGroup,
    leaveFamilyGroup,
    userProfile
  } = useHealth();

  const [tab, setTab] = useState('join'); // 'create' | 'join'
  const [familyNameInput, setFamilyNameInput] = useState('Família Ribeiro');
  const [creatorNameInput, setCreatorNameInput] = useState(userProfile?.name || 'Mateus Ribeiro');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [memberNameInput, setMemberNameInput] = useState('Membro da Família');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    if (!familyGroupCode) return;
    navigator.clipboard.writeText(familyGroupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!familyGroupCode) return;
    const text = encodeURIComponent(
      `Olá! Entre no nosso Grupo Familiar no app Saúde & Acompanhamento usando o código de 6 dígitos: *${familyGroupCode}* para compartilharmos consultas, exames e remédios!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      await createFamilyGroup(familyNameInput.trim(), creatorNameInput.trim());
      setIsLoading(false);
    } catch (err) {
      setErrorMsg('Erro ao criar o grupo familiar no Firebase. Tente novamente.');
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const codeClean = joinCodeInput.replace(/\D/g, '');

    if (codeClean.length !== 6) {
      setErrorMsg('Por favor, digite o código completo de 6 dígitos.');
      return;
    }

    setIsLoading(true);
    try {
      await joinFamilyGroup(codeClean, memberNameInput.trim());
      setIsLoading(false);
    } catch (err) {
      setErrorMsg(err.message || 'Código de 6 dígitos não encontrado no Firebase.');
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: '#E6F5F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0D6C5D'
              }}
            >
              <Users size={22} />
            </div>
            <div>
              <h3 className="modal-title">Grupo Familiar</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>
                Compartilhe saúde, medicamentos e consultas com sua família
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        {/* ---------------- STATE 1: ALREADY IN A FAMILY GROUP ---------------- */}
        {familyGroupCode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header Badge & Code Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0D6C5D 0%, #084D42 100%)',
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(13, 108, 93, 0.25)'
              }}
            >
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85, fontWeight: 700 }}>
                {familyGroup?.familyName || 'Grupo Familiar'}
              </span>

              {/* 6-Digit PIN Display */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  margin: '14px 0 10px 0',
                  justifyContent: 'center'
                }}
              >
                {familyGroupCode.split('').map((digit, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '42px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.18)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {digit}
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '14px' }}>
                Código exclusivo de 6 dígitos para os membros entrarem
              </p>

              {/* Copy & WhatsApp Share Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleCopyCode}
                  style={{
                    background: '#FFFFFF',
                    color: '#0D6C5D',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  style={{
                    background: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Share2 size={16} />
                  <span>Enviar no WhatsApp</span>
                </button>
              </div>
            </div>

            {/* List of Members */}
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HeartHandshake size={18} style={{ color: '#0D6C5D' }} /> Membros do Grupo ({familyGroup?.members?.length || 1})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(familyGroup?.members || [{ name: userProfile?.name || 'Você', role: 'Criador' }]).map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                      background: '#FFFFFF',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1px solid #EBF1F0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: '#E6F5F2',
                          color: '#0D6C5D',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '13px'
                        }}
                      >
                        {m.name ? m.name.charAt(0).toUpperCase() : 'M'}
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>{m.name}</span>
                    </div>
                    <span className="badge badge-green" style={{ fontSize: '11px' }}>
                      {m.role || 'Membro'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Message */}
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4, textAlign: 'center' }}>
              Todos os membros cadastrados neste código compartilham e recebem atualizações instantâneas no Firebase.
            </p>

            {/* Leave Group Button */}
            <button
              onClick={leaveFamilyGroup}
              style={{
                background: 'transparent',
                border: '1px solid #FCA5A5',
                color: '#DC2626',
                borderRadius: '12px',
                padding: '10px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                marginTop: '4px'
              }}
            >
              <LogOut size={16} /> Sair do Grupo Familiar
            </button>
          </div>
        ) : (
          /* ---------------- STATE 2: NOT IN A GROUP YET (TABS: CREATE / JOIN) ---------------- */
          <div>
            {/* Tab Selector */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: '#F1F5F9',
                borderRadius: '12px',
                padding: '4px',
                marginBottom: '16px'
              }}
            >
              <button
                onClick={() => { setTab('join'); setErrorMsg(''); }}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  backgroundColor: tab === 'join' ? '#FFFFFF' : 'transparent',
                  color: tab === 'join' ? '#0D6C5D' : '#64748B',
                  boxShadow: tab === 'join' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Entrar com Código
              </button>

              <button
                onClick={() => { setTab('create'); setErrorMsg(''); }}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  backgroundColor: tab === 'create' ? '#FFFFFF' : 'transparent',
                  color: tab === 'create' ? '#0D6C5D' : '#64748B',
                  boxShadow: tab === 'create' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Criar Novo Grupo
              </button>
            </div>

            {errorMsg && (
              <div
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  fontSize: '13px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  marginBottom: '14px',
                  fontWeight: 600
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* TAB: JOIN WITH 6-DIGIT CODE */}
            {tab === 'join' && (
              <form onSubmit={handleJoinGroup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Digite o Código de 6 Dígitos *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      maxLength={6}
                      className="form-input"
                      placeholder="Ex: 842917"
                      value={joinCodeInput}
                      onChange={(e) => setJoinCodeInput(e.target.value.replace(/\D/g, ''))}
                      style={{
                        fontSize: '22px',
                        letterSpacing: '8px',
                        textAlign: 'center',
                        fontWeight: 800,
                        padding: '12px',
                        color: '#0D6C5D'
                      }}
                      required
                    />
                    <KeyRound
                      size={20}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                    Insira o código numérico fornecido pelo criador da sua família.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Seu Nome / Identificação *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Ana Ribeiro (Esposa), João (Filho)"
                    value={memberNameInput}
                    onChange={(e) => setMemberNameInput(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="form-submit-btn" disabled={isLoading} style={{ marginTop: '8px' }}>
                  {isLoading ? 'Conectando ao Grupo...' : 'Entrar no Grupo Familiar'}
                </button>
              </form>
            )}

            {/* TAB: CREATE NEW GROUP */}
            {tab === 'create' && (
              <form onSubmit={handleCreateGroup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Nome do Grupo Familiar *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Família Ribeiro, Saúde dos Pais"
                    value={familyNameInput}
                    onChange={(e) => setFamilyNameInput(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Seu Nome (Criador) *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Mateus Ribeiro"
                    value={creatorNameInput}
                    onChange={(e) => setCreatorNameInput(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="form-submit-btn" disabled={isLoading} style={{ marginTop: '8px' }}>
                  {isLoading ? 'Gerando Código...' : 'Criar Grupo e Gerar Código'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
