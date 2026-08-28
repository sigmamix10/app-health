import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Lock, Mail, User, ShieldCheck, LogIn, UserPlus, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { registerPatient, loginPatient, authUser, logoutPatient, setActiveTab } = useHealth();
  const [tab, setTab] = useState(initialTab); // 'login' | 'register'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Calculate Password Strength for Registration
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: '', percent: 0, color: '#E2E8F0' };
    if (pwd.length < 6) return { label: 'Muito curta (min 6 caracteres)', percent: 25, color: '#EF4444' };
    
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { label: 'Senha Fraca', percent: 40, color: '#F59E0B' };
    if (score === 2) return { label: 'Senha Média', percent: 70, color: '#3B82F6' };
    return { label: 'Senha Forte', percent: 100, color: '#10B981' };
  };

  const passwordStrength = getPasswordStrength(password);

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
      setActiveTab('home');
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
      const user = await registerPatient(email.trim(), password, fullName.trim());
      console.log('[AuthModal] Paciente cadastrado com sucesso no Firebase Auth:', user);
      setIsLoading(false);
      setActiveTab('home');
      onClose();
    } catch (err) {
      setIsLoading(false);
      console.error('[AuthModal] Erro ao cadastrar no Firebase Auth:', err);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('Este e-mail já está cadastrado no Firebase. Faça login com suas credenciais.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMsg('A senha é muito fraca. Digite pelo menos 6 caracteres.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMsg('O login por E-mail/Senha está desativado no Firebase Console. Ative em Authentication > Sign-in method.');
      } else {
        setErrorMsg(`Erro no Firebase (${err.code || err.message || 'Erro desconhecido'}).`);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '24px' }}>
        {/* Header */}
        <div className="modal-header" style={{ marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: '#E6F5F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0D6C5D',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="modal-title" style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Conta do Paciente
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0', fontWeight: 500 }}>
                Acesse ou crie seu prontuário digital seguro
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
            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <span className="badge badge-green" style={{ marginBottom: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 12px' }}>
                <CheckCircle2 size={13} /> Sessão Ativa
              </span>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
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
                borderRadius: '14px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
            >
              Sair da Conta (Logout)
            </button>
          </div>
        ) : (
          <div>
            {/* Pill Tab Selector */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: '#F1F5F9',
                borderRadius: '14px',
                padding: '4px',
                marginBottom: '20px'
              }}
            >
              <button
                type="button"
                onClick={() => { setTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 700,
                  backgroundColor: tab === 'login' ? '#FFFFFF' : 'transparent',
                  color: tab === 'login' ? '#0D6C5D' : '#64748B',
                  boxShadow: tab === 'login' ? '0 2px 8px rgba(13, 108, 93, 0.12)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <LogIn size={16} /> Entrar
              </button>

              <button
                type="button"
                onClick={() => { setTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 700,
                  backgroundColor: tab === 'register' ? '#FFFFFF' : 'transparent',
                  color: tab === 'register' ? '#0D6C5D' : '#64748B',
                  boxShadow: tab === 'register' ? '0 2px 8px rgba(13, 108, 93, 0.12)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <UserPlus size={16} /> Criar Conta
              </button>
            </div>

            {/* Error Feedback Message */}
            {errorMsg && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  color: '#991B1B',
                  fontSize: '13px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  fontWeight: 600,
                  borderLeft: '4px solid #EF4444',
                  lineHeight: 1.4
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Success Feedback Message */}
            {successMsg && (
              <div
                style={{
                  backgroundColor: '#E6F5F2',
                  color: '#0D6C5D',
                  fontSize: '13px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  fontWeight: 600,
                  borderLeft: '4px solid #0D6C5D'
                }}
              >
                {successMsg}
              </div>
            )}

            {/* TAB 1: LOGIN FORM */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    E-mail do Paciente *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="email"
                      className="form-input"
                      style={{ paddingLeft: '42px', height: '46px', borderRadius: '12px', fontSize: '14px' }}
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Senha *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      style={{ paddingLeft: '42px', paddingRight: '42px', height: '46px', borderRadius: '12px', fontSize: '14px' }}
                      placeholder="Sua senha secreta"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    height: '48px',
                    backgroundColor: '#0D6C5D',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(13, 108, 93, 0.25)',
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isLoading ? (
                    <span>Entrando...</span>
                  ) : (
                    <>
                      <span>Entrar no Aplicativo</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: REGISTER FORM */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Full Name */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Nome Completo do Paciente *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: '42px', height: '46px', borderRadius: '12px', fontSize: '14px' }}
                      placeholder="Ex: Mateus Ribeiro"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    E-mail do Paciente *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="email"
                      className="form-input"
                      style={{ paddingLeft: '42px', height: '46px', borderRadius: '12px', fontSize: '14px' }}
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Criar Senha *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      style={{ paddingLeft: '42px', paddingRight: '42px', height: '46px', borderRadius: '12px', fontSize: '14px' }}
                      placeholder="No mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div style={{ marginTop: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: passwordStrength.color }}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '100px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${passwordStrength.percent}%`,
                            height: '100%',
                            backgroundColor: passwordStrength.color,
                            transition: 'all 0.2s ease'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Confirmar Senha *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-input"
                      style={{ paddingLeft: '42px', paddingRight: '42px', height: '46px', borderRadius: '12px', fontSize: '14px' }}
                      placeholder="Repita sua senha exatamente"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title={showConfirmPassword ? 'Ocultar senha' : 'Exibir senha'}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    height: '48px',
                    backgroundColor: '#0D6C5D',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(13, 108, 93, 0.25)',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isLoading ? (
                    <span>Cadastrando...</span>
                  ) : (
                    <>
                      <span>Criar Minha Conta</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer Trust Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '20px',
                paddingTop: '14px',
                borderTop: '1px solid #F1F5F9',
                color: '#94A3B8',
                fontSize: '11.5px',
                fontWeight: 600
              }}
            >
              <ShieldCheck size={14} color="#0D6C5D" />
              <span>Dados protegidos com criptografia SSL</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

