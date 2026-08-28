import React from 'react';
import { useHealth, THEMES } from '../../context/HealthContext';
import { X, Palette, Check, Sparkles } from 'lucide-react';

export const ThemeColorModal = ({ isOpen, onClose }) => {
  const { themeColor, changeThemeColor } = useHealth();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}
            >
              <Palette size={22} />
            </div>
            <div>
              <h3 className="modal-title">Cores do Aplicativo</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Personalize o visual e a paleta de cores</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
            Escolha sua cor preferida para aplicar aos botões, ícones, destaques e navegação do seu aplicativo:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '6px' }}>
            {Object.values(THEMES).map((theme) => {
              const isSelected = (themeColor || 'emerald') === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    changeThemeColor(theme.id);
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    border: isSelected ? `2px solid ${theme.primary}` : '1px solid #E2E8F0',
                    background: isSelected ? theme.primaryLight : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? `0 4px 14px ${theme.primary}25` : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    {/* Circle Swatch */}
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF'
                      }}
                    >
                      {isSelected && <Check size={16} />}
                    </div>

                    {isSelected && (
                      <span style={{ fontSize: '11px', fontWeight: 800, color: theme.primary, background: '#FFFFFF', padding: '2px 8px', borderRadius: '100px' }}>
                        Ativo
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: isSelected ? theme.primary : '#0F172A' }}>
                      {theme.name}
                    </h4>
                    <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      {theme.id === 'emerald' && 'Tom de saúde verde natural'}
                      {theme.id === 'ocean' && 'Tom azul suave & confiável'}
                      {theme.id === 'violet' && 'Tom roxo moderno & elegante'}
                      {theme.id === 'berry' && 'Tom rosa suave & aconchegante'}
                      {theme.id === 'terracotta' && 'Tom quente vibrante'}
                      {theme.id === 'dark' && 'Fundo escuro e alto contraste'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="form-submit-btn"
            style={{ marginTop: '16px' }}
          >
            Concluir Seleção
          </button>
        </div>
      </div>
    </div>
  );
};
