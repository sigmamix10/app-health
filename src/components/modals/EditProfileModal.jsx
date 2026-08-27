import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, User, Sparkles, RefreshCw, Save, Check } from 'lucide-react';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { userProfile, updateProfile } = useHealth();

  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age);
  const [location, setLocation] = useState(userProfile.location);
  const [bloodType, setBloodType] = useState(userProfile.bloodType);
  const [height, setHeight] = useState(userProfile.height);
  const [weight, setWeight] = useState(userProfile.weight);

  const [activeCategory, setActiveCategory] = useState('critters'); // 'critters' | 'clay' | 'avataaars' | 'personas' | 'photo'
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(userProfile.avatar);
  const [customSeed, setCustomSeed] = useState(userProfile.name || 'Mateus');

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setAge(userProfile.age);
      setLocation(userProfile.location);
      setBloodType(userProfile.bloodType);
      setHeight(userProfile.height);
      setWeight(userProfile.weight);
      setSelectedAvatarUrl(userProfile.avatar);
      setCustomSeed(userProfile.name || 'Mateus');
    }
  }, [userProfile, isOpen]);

  if (!isOpen) return null;

  // Pre-rendered Avatar Options Gallery for each category
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
    updateProfile({
      name,
      age,
      location,
      bloodType,
      height,
      weight,
      avatar: selectedAvatarUrl
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
              <h3 className="modal-title">Editar Perfil & Escolher Avatar</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Galeria visual de avatares com DiceBear 10.x API</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Main Selected Avatar Preview Box */}
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

          {/* Avatar Gallery Section */}
          <div className="form-group">
            <label className="form-label">
              Escolha seu Avatar na Galeria Visual (DiceBear 10.x API)
            </label>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '100px',
                    border: activeCategory === cat.id ? '2px solid #0D6C5D' : '1px solid #CBD5E1',
                    background: activeCategory === cat.id ? '#0D6C5D' : '#FFFFFF',
                    color: activeCategory === cat.id ? '#FFFFFF' : '#475569',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Visual Avatar Grid Gallery */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '14px' }}>
              {avatarGalleryOptions[activeCategory]?.map((option) => {
                const isSelected = selectedAvatarUrl === option.url;
                return (
                  <div
                    key={option.id}
                    onClick={() => setSelectedAvatarUrl(option.url)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        border: isSelected ? '3px solid #0D6C5D' : '2px solid #E2E8F0',
                        padding: '2px',
                        backgroundColor: '#FFFFFF',
                        boxShadow: isSelected ? '0 4px 12px rgba(13, 108, 93, 0.3)' : 'none',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={option.url}
                        alt={option.label}
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-2px',
                            right: '-2px',
                            backgroundColor: '#0D6C5D',
                            color: '#FFFFFF',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '11px', color: isSelected ? '#0D6C5D' : '#64748B', fontWeight: isSelected ? 800 : 500, marginTop: '4px', textAlign: 'center' }}>
                      {option.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Custom Seed Generator */}
            {activeCategory !== 'photo' && (
              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Ou gere um avatar customizado via API:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={customSeed}
                    onChange={(e) => handleCustomSeedChange(e.target.value)}
                    placeholder="Digite qualquer palavra para criar seu avatar exclusivo..."
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}
                    title="Gerar variante aleatória"
                  >
                    <RefreshCw size={14} /> Gerar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Name & Age Row */}
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
              <label className="form-label">Idade</label>
              <input
                type="text"
                className="form-input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Location & Blood Type Row */}
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

          {/* Height & Weight Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Altura (m)</label>
              <input
                type="text"
                className="form-input"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Peso (kg)</label>
              <input
                type="text"
                className="form-input"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={18} /> Salvar Perfil e Avatar Selecionado
          </button>
        </form>
      </div>
    </div>
  );
};
