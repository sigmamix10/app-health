import React from 'react';
import { X, MapPin, Navigation, Compass } from 'lucide-react';

export const DirectionsModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">Como Chegar</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>{appointment.hospital}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        {/* Map Preview Box */}
        <div
          style={{
            height: '180px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          />
          <Compass size={36} style={{ color: '#0D6C5D', marginBottom: '8px' }} />
          <h4 style={{ fontSize: '14px', fontWeight: 700, zIndex: 1 }}>{appointment.hospital}</h4>
          <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px', zIndex: 1 }}>
            {appointment.address || 'Av. Albert Einstein, 627 - Morumbi, São Paulo'}
          </p>
        </div>

        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
          <p style={{ fontSize: '13px', color: '#475569' }}>
            🚘 <strong>Estacionamento:</strong> Valet no local (Bloco B)
          </p>
          <p style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>
            🚇 <strong>Metrô mais próximo:</strong> Estação São Paulo-Morumbi (Linha 4-Amarela)
          </p>
        </div>

        <button
          className="form-submit-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          onClick={() => {
            const query = encodeURIComponent(`${appointment.hospital} ${appointment.address}`);
            window.open(`https://maps.google.com/?q=${query}`, '_blank');
          }}
        >
          <Navigation size={18} /> Abrir no Waze / Google Maps
        </button>
      </div>
    </div>
  );
};
