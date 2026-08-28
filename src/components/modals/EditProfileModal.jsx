import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, User, Sparkles, RefreshCw, Save, Check } from 'lucide-react';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { userProfile, updateProfile } = useHealth();

  const [name, setName] = useState(userProfile.name || '');
  const [age, setAge] = useState(userProfile.age || '');
  const [location, setLocation] = useState(userProfile.location || '');
  const [bloodType, setBloodType] = useState(userProfile.bloodType || 'O +');
  const [height, setHeight] = useState(userProfile.height || '');
  const [weight, setWeight] = useState(userProfile.weight || '');

  const [emergencyName, setEmergencyName] = useState(userProfile.emergencyContact?.name || '');
  const [emergencyRelation, setEmergencyRelation] = useState(userProfile.emergencyContact?.relation || '');
  const [emergencyPhone, setEmergencyPhone] = useState(userProfile.emergencyContact?.phone || '');

  const [planName, setPlanName] = useState(userProfile.healthPlan?.name || '');
  const [planType, setPlanType] = useState(userProfile.healthPlan?.planType || '');
  const [planNumber, setPlanNumber] = useState(userProfile.healthPlan?.number || '');

  const [allergiesText, setAllergiesText] = useState(
    Array.isArray(userProfile.allergiesAndConditions)
      ? userProfile.allergiesAndConditions.map((a) => (typeof a === 'string' ? a : a.text)).join(', ')
      : ''
  );

  const [activeCategory, setActiveCategory] = useState('critters'); // 'critters' | 'clay' | 'avataaars' | 'personas' | 'photo'
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(userProfile.avatar);
  const [customSeed, setCustomSeed] = useState(userProfile.name || 'Paciente');

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setAge(userProfile.age || '');
      setLocation(userProfile.location || '');
      setBloodType(userProfile.bloodType || 'O +');
      setHeight(userProfile.height || '');
      setWeight(userProfile.weight || '');
      setSelectedAvatarUrl(userProfile.avatar);
      setCustomSeed(userProfile.name || 'Paciente');

      setEmergencyName(userProfile.emergencyContact?.name || '');
      setEmergencyRelation(userProfile.emergencyContact?.relation || '');
      setEmergencyPhone(userProfile.emergencyContact?.phone || '');

      setPlanName(userProfile.healthPlan?.name || '');
      setPlanType(userProfile.healthPlan?.planType || '');
      setPlanNumber(userProfile.healthPlan?.number || '');

      setAllergiesText(
        Array.isArray(userProfile.allergiesAndConditions)
          ? userProfile.allergiesAndConditions.map((a) => (typeof a === 'string' ? a : a.text)).join(', ')
          : ''
      );
    }
  }, [userProfile, isOpen]);

  if (!isOpen) return null;

  const avatarGalleryOptions = {
    critters: [
      { id: 'critter-1', url: `https://api.dicebear.com/10.x/critters/svg?seed=Mateus`, label: 'Mateus' },
      { id: 'critter-2', url: `https://api.dicebear.com/10.x/critters/svg?seed=Felix`, label: 'Felix' },
      { id: 'critter-3', url: `https://api.dicebear.com/10.x/critters/svg?seed=Oliver`, label: 'Oliver' },
      { id: 'critter-4', url: `https://api.dicebear.com/10.x/critters/svg?seed=Milo`, label: 'Milo' },
      { id: 'critter-5', url: `https://api.dicebear.com/10.x/critters/svg?seed=Jasper`, label: 'Jasper' },
      { id: 'critter-6', url: `https://api.dicebear.com/10.x/critters/svg?seed=Leo`, label: 'Leo' }
    ],
    clay: [
      { id: 'clay-1', url: `https://api.dicebear.com/10.x/clay/svg?seed=Mateus`, label: 'Mateus 3D' },
      { id: 'clay-2', url: `https://api.dicebear.com/10.x/clay/svg?seed=Alex`, label: 'Alex 3D' },
      { id: 'clay-3', url: `https://api.dicebear.com/10.x/clay/svg?seed=Gabriel`, label: 'Gabriel 3D' },
      { id: 'clay-4', url: `https://api.dicebear.com/10.x/clay/svg?seed=Lucas`, label: 'Lucas 3D' },
      { id: 'clay-5', url: `https://api.dicebear.com/10.x/clay/svg?seed=Bruno`, label: 'Bruno 3D' },
      { id: 'clay-6', url: `https://api.dicebear.com/10.x/clay/svg?seed=Diego`, label: 'Diego 3D' }
    ],
    avataaars: [
      { id: 'ava-1', url: `https://api.dicebear.com/9.x/avataaars/svg?seed=Mateus`, label: 'Mateus' },
      { id: 'ava-2', url: `https://api.dicebear.com/9.x/avataaars/svg?seed=David`, label: 'David' },
      { id: 'ava-3', url: `https://api.dicebear.com/9.x/avataaars/svg?seed=Samuel`, label: 'Samuel' },
      { id: 'ava-4', url: `https://api.dicebear.com/9.x/avataaars/svg?seed=Victor`, label: 'Victor' },
      { id: 'ava-5', url: `https://api.dicebear.com/9.x/avataaars/svg?seed=Thiago`, label: 'Thiago' },
      { id: 'ava-6', url: `https://api.dicebear.com/9.x/avataaars/svg?seed=Rafael`, label: 'Rafael' }
    ],
    personas: [
      { id: 'per-1', url: `https://api.dicebear.com/9.x/personas/svg?seed=Mateus`, label: 'Mateus' },
      { id: 'per-2', url: `https://api.dicebear.com/9.x/personas/svg?seed=Arthur`, label: 'Arthur' },
      { id: 'per-3', url: `https://api.dicebear.com/9.x/personas/svg?seed=Enzo`, label: 'Enzo' },
      { id: 'per-4', url: `https://api.dicebear.com/9.x/personas/svg?seed=Bernardo`, label: 'Bernardo' },
      { id: 'per-5', url: `https://api.dicebear.com/9.x/personas/svg?seed=Caio`, label: 'Caio' },
      { id: 'per-6', url: `https://api.dicebear.com/9.x/personas/svg?seed=Pedro`, label: 'Pedro' }
    ],
    photo: [
      { id: 'photo-1', url: '/avatars/mateus.jpg', label: 'Foto Estudio Mateus' }
    ]
  };

  const categories = [
    { id: 'critters', name: 'Critters 10.x', icon: '🦊' },
    { id: 'clay', name: 'Clay 3D 10.x', icon: '🎨' },
    { id: 'avataaars', name: 'Avataaars', icon: '👤' },
    { id: 'personas', name: 'Personas', icon: '✨' },
    { id: 'photo', name: 'Foto Realista', icon: '📸' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const allergiesArray = allergiesText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((text) => ({
        text,
        type: text.toLowerCase().includes('alergia') ? 'danger' : 'warning'
      }));

    updateProfile({
      name,
      age,
      location,
      bloodType,
      height,
      weight,
      avatar: selectedAvatarUrl,
      emergencyContact: {
        name: emergencyName,
        relation: emergencyRelation,
        phone: emergencyPhone
      },
      healthPlan: {
        name: planName || 'Sem plano cadastrado',
        planType,
        number: planNumber
      },
      allergiesAndConditions: allergiesArray
    });

    onClose();
  };

  const handleCustomSeedChange = (val) => {
    setCustomSeed(val);
    if (val.trim()) {
      const customUrl = `https://api.dicebear.com/10.x/${activeCategory === 'clay' ? 'clay' : 'critters'}/svg?seed=${encodeURIComponent(val)}`;
      setSelectedAvatarUrl(customUrl);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">Editar Perfil Completo</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Altere seus dados pessoais, plano de saúde, contatos e foto</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              background: 'linear-gradient(135deg, #E6F5F2 0%, #F8FAFC 100%)',
              borderRadius: '20px',
              marginBottom: '20px',
              border: '1px solid #BCE5DC'
            }}
          >
            <img
              src={selectedAvatarUrl}
              alt="Avatar Selecionado"
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #0D6C5D',
                boxShadow: '0 8px 20px rgba(13, 108, 93, 0.25)',
                marginBottom: '8px',
                backgroundColor: '#FFFFFF'
              }}
            />
            <span style={{ fontSize: '13px', color: '#0D6C5D', fontWeight: 800 }}>
              Avatar Selecionado
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Escolha seu Estilo de Avatar
            </label>

            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '100px',
                    border: activeCategory === cat.id ? 'none' : '1px solid #E2E8F0',
                    backgroundColor: activeCategory === cat.id ? '#0D6C5D' : '#F8FAFC',
                    color: activeCategory === cat.id ? '#FFFFFF' : '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '12px' }}>
              {avatarGalleryOptions[activeCategory]?.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setSelectedAvatarUrl(opt.url)}
                  style={{
                    borderRadius: '16px',
                    padding: '6px',
                    border: selectedAvatarUrl === opt.url ? '2px solid #0D6C5D' : '1px solid #E2E8F0',
                    backgroundColor: selectedAvatarUrl === opt.url ? '#E6F5F2' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {selectedAvatarUrl === opt.url && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        backgroundColor: '#0D6C5D',
                        color: '#FFFFFF',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Check size={12} />
                    </div>
                  )}
                  <img
                    src={opt.url}
                    alt={opt.label}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, marginTop: '4px', textAlign: 'center' }}>
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>

            {(activeCategory === 'critters' || activeCategory === 'clay') && (
              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>
                  Ou gere um avatar customizado via API:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={customSeed}
                    onChange={(e) => handleCustomSeedChange(e.target.value)}
                    placeholder="Digite qualquer palavra..."
                  />
                  <button
                    type="button"
                    onClick={() => handleCustomSeedChange(Math.random().toString(36).substring(7))}
                    style={{
                      padding: '0 14px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      background: '#FFFFFF',
                      color: '#475569',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 700
                    }}
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '20px 0' }} />

          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
            Dados Pessoais
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Nome Completo</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Idade (ex: 36 anos)</label>
              <input
                type="text"
                className="form-input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Cidade / Estado</label>
              <input
                type="text"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo Sanguíneo</label>
              <select
                className="form-select"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              >
                <option value="--">Não informado (--)</option>
                <option value="O +">O +</option>
                <option value="O -">O -</option>
                <option value="A +">A +</option>
                <option value="A -">A -</option>
                <option value="B +">B +</option>
                <option value="B -">B -</option>
                <option value="AB +">AB +</option>
                <option value="AB -">AB -</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Altura (m) (ex: 1,75)</label>
              <input
                type="text"
                className="form-input"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Peso (kg) (ex: 70)</label>
              <input
                type="text"
                className="form-input"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '20px 0' }} />

          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
            Plano de Saúde
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Nome da Operadora / Plano</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: Bradesco Saúde, Unimed"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo do Plano</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: Nacional Flex, Especial"
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Número da Carteirinha / Contrato</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Nº 4279 8812 0031"
              value={planNumber}
              onChange={(e) => setPlanNumber(e.target.value)}
            />
          </div>

          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '20px 0' }} />

          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
            Contato de Emergência
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Nome do Contato</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: Ana Maria"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Parentesco</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: Esposa, Mãe"
                value={emergencyRelation}
                onChange={(e) => setEmergencyRelation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Telefone / Celular</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: (85) 99999-8888"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
              />
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '20px 0' }} />

          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Alergias e Condições Médicas
          </h4>
          <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '10px' }}>
            Separe cada alergia ou condição por vírgula (ex: Alergia: Dipirona, Hipertensão, Asma)
          </p>

          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Alergia: Penicilina, Hipertensão Leve, Diabetes"
              value={allergiesText}
              onChange={(e) => setAllergiesText(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}
          >
            <Save size={18} /> Salvar Perfil e Informações
          </button>
        </form>
      </div>
    </div>
  );
};
