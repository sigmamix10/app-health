import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, PackagePlus } from 'lucide-react';

export const RefillStockModal = ({ isOpen, onClose, med }) => {
  const { refillStock } = useHealth();
  const [quantity, setQuantity] = useState('30');

  if (!isOpen || !med) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || Number(quantity) <= 0) return;
    refillStock(med.id, Number(quantity));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PackagePlus style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">Reabastecer Estoque</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>{med.name} ({med.dosage})</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div style={{ background: '#E6F5F2', padding: '12px 14px', borderRadius: '12px', marginBottom: '16px' }}>
          <p style={{ fontSize: '13px', color: '#0D6C5D', fontWeight: 600 }}>
            📦 Estoque Atual: <strong>{med.currentStock} comprimidos</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Quantidade de Comprimidos Adicionados</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              {['14', '30', '60'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuantity(preset)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: quantity === preset ? '2px solid #0D6C5D' : '1px solid #CBD5E1',
                    background: quantity === preset ? '#E6F5F2' : '#FFFFFF',
                    color: quantity === preset ? '#0D6C5D' : '#334155',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  +{preset} un.
                </button>
              ))}
            </div>

            <input
              type="number"
              className="form-input"
              placeholder="Outra quantidade..."
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Confirmar Reabastecimento
          </button>
        </form>
      </div>
    </div>
  );
};
