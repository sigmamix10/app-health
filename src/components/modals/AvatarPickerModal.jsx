import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Sparkles, Check, RefreshCw, UserCheck } from 'lucide-react';

export const AvatarPickerModal = ({ isOpen, onClose }) => {
  const { userProfile, updateProfileAvatar } = useHealth();

  const [selectedStyle, setSelectedStyle] = useState('photo'); // 'photo' | 'avataaars' | 'bottts' | 'initials' | 'personas'
  const [seed, setSeed] = useState(userProfile.name || 'Mateus');

  if (!isOpen) return null;

  // Avatar API URL generators
  const getAvatarUrl = (style, seedVal) => {
    const encodedSeed = encodeURIComponent(seedVal);
    switch (style) {
      case 'photo':
        return '/avatars/mateus.jpg';
      case 'avataaars':
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodedSeed}`;
      case 'bottts':
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodedSeed}`;
      case 'personas':
        return `https://api.dicebear.com/7.x/personas/svg?seed=${encodedSeed}`;
      case 'initials':
        return `https://ui-avatars.com/api/?name=${encodedSeed}&background=0D6C5D&color=fff&size=150&font-size=0.4`;
      default:
        return '/avatars/mateus.jpg';
    }
  };

  const currentPreviewUrl = getAvatarUrl(selectedStyle, seed);

  const handleSave = () => {
    updateProfileAvatar(currentPreviewUrl);
    onClose();
  };

  const avatarStyles = [
    { id: 'photo', name: 'Foto Realista', icon: '👨‍💼' },
    { id: 'avataaars', name: 'Vector Avatar (DiceBear)', icon: '🎨' },
    { id: 'personas', name: 'Ilustração Persona', icon: '👤' },
    { id: 'initials', name: 'Iniciais (UI Avatars)', icon: '🔤' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">Personalizar Avatar via API</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Gerador de avatares com DiceBear & UI Avatars API</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        {/* Avatar Preview Box */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'linear-gradient(135deg, #E6F5F2 0%, #F8FAFC 100%)',
            borderRadius: '20px',
            marginBottom: '20px',
            border: '1px solid #BCE5DC'
          }}
        >
          <img
            src={currentPreviewUrl}
            alt="Avatar Preview"
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #0D6C5D',
              boxShadow: '0 8px 20px rgba(13, 108, 93, 0.2)',
              marginBottom: '12px',
              backgroundColor: '#FFFFFF'
            }}
          />
          <span style={{ fontSize: '13px', color: '#0D6C5D', fontWeight: 700 }}>
            Visualização do Avatar Gerado
          </span>
        </div>

        {/* Style Options */}
        <div className="form-group">
          <label className="form-label">Estilo do Avatar (API Externa)</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {avatarStyles.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStyle(st.id)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: selectedStyle === st.id ? '2px solid #0D6C5D' : '1px solid #CBD5E1',
                  background: selectedStyle === st.id ? '#E6F5F2' : '#FFFFFF',
                  color: selectedStyle === st.id ? '#0D6C5D' : '#334155',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{st.icon}</span>
                <span>{st.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Seed Input for Custom Dynamic Generation */}
        {selectedStyle !== 'photo' && (
          <div className="form-group">
            <label className="form-label">Semente de Geração (Nome / Código)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-input"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Digite seu nome ou termo para gerar..."
              />
              <button
                type="button"
                onClick={() => setSeed(Math.random().toString(36).substring(7))}
                style={{
                  padding: '0 14px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  background: '#F1F5F9',
                  color: '#475569',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Gerar avatar aleatório"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          className="form-submit-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <UserCheck size={18} /> Salvar Avatar no Perfil
        </button>
      </div>
    </div>
  );
};
