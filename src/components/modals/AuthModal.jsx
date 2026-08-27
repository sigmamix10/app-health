import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Lock, Mail, User, ShieldCheck, LogIn, UserPlus } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { registerPatient, loginPatient, authUser, logoutPatient } = useHealth();
  const [tab, setTab] = useState(initialTab); // 'login' | 'register'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setIsLoading(true);
    try {
      await loginPatient(email.trim(), password);
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setErrorMsg('E-mail ou senha incorretos. Verifique suas credenciais.');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('Formato de e-mail inválido.');
      } else {
        setErrorMsg('Erro ao realizar login. Tente novamente.');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Por favor, informe seu Nome Completo.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Por favor, informe seu E-mail.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('As senhas digitadas não coincidem.');
      return;
    }

    setIsLoading(true);
    try {
      await registerPatient(email.trim(), password, fullName.trim());
      setIsLoading(false);
      setSuccessMsg('Conta criada com sucesso no Firebase!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('Este e-mail já está cadastrado no Firebase. Faça login.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMsg('A senha é muito fraca. Escolha uma senha mais forte.');
      } else {
        setErrorMsg('Erro ao cadastrar conta. Tente novamente.');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
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
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="modal-title">Conta do Paciente</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>
                Proteção e sincronização no Firebase Auth
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        {/* If currently logged in */}
        {authUser ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '10px 0' }}>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <span className="badge badge-green" style={{ marginBottom: '8px', display: 'inline-block' }}>
                Sessão Ativa no Firebase Auth
              </span>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                {authUser.displayName || 'Paciente Autenticado'}
              </h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>{authUser.email}</p>
            </div>

            <button
              onClick={async () => {
                await logoutPatient();
                onClose();
              }}
              style={{
                background: '#FEE2E2',
                color: '#991B1B',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Sair da Conta (Logout)
            </button>
          </div>
        ) : (
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
                onClick={() => { setTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  backgroundColor: tab === 'login' ? '#FFFFFF' : 'transparent',
                  color: tab === 'login' ? '#0D6C5D' : '#64748B',
                  boxShadow: tab === 'login' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <LogIn size={15} /> Entrar
              </button>

              <button
                onClick={() => { setTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  backgroundColor: tab === 'register' ? '#FFFFFF' : 'transparent',
                  color: tab === 'register' ? '#0D6C5D' : '#64748B',
                  boxShadow: tab === 'register' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <UserPlus size={15} /> Criar Conta
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

            {successMsg && (
              <div
                style={{
                  backgroundColor: '#E6F5F2',
                  color: '#0D6C5D',
                  fontSize: '13px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  marginBottom: '14px',
                  fontWeight: 600
                }}
              >
                {successMsg}
              </div>
            )}

            {/* TAB 1: LOGIN */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">E-mail do Paciente *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Senha *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Sua senha secreta"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                </div>

                <button type="submit" className="form-submit-btn" disabled={isLoading} style={{ marginTop: '8px' }}>
                  {isLoading ? 'Entrando no Firebase...' : 'Entrar no Aplicativo'}
                </button>
              </form>
            )}

            {/* TAB 2: REGISTER */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Nome Completo do Paciente *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ex: Mateus Ribeiro"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <User size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">E-mail *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Senha (Mínimo 6 caracteres) *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Criar senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Confirmar Senha *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Repita sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Lock size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                </div>

                <button type="submit" className="form-submit-btn" disabled={isLoading} style={{ marginTop: '8px' }}>
                  {isLoading ? 'Cadastrando...' : 'Criar Conta no Firebase'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
