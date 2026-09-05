import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Edit3, Calendar } from 'lucide-react';

export const EditMedicationModal = ({ isOpen, onClose, med }) => {
  const { updateMedication } = useHealth();
  const [formData, setFormData] = useState({
    dosage: '',
    doseQuantity: '1',
    unit: 'comprimido(s)',
    time: '08:00',
    frequency: '1x ao dia',
    acquisitionType: 'ubs',
    locationName: '',
    nextPickupDate: ''
  });

  useEffect(() => {
    if (med) {
      setFormData({
        dosage: med.dosage || '',
        doseQuantity: med.doseQuantity ? String(med.doseQuantity) : '1',
        unit: med.unit || 'comprimido(s)',
        time: med.time || '08:00',
        frequency: med.frequency || '1x ao dia',
        acquisitionType: med.acquisitionType || 'ubs',
        locationName: med.locationName || '',
        nextPickupDate: med.nextPickupDate || ''
      });
    }
  }, [med]);

  if (!isOpen || !med) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMedication(med.id, {
      dosage: formData.dosage,
      doseQuantity: formData.doseQuantity,
      unit: formData.unit,
      time: formData.time,
      frequency: formData.frequency,
      acquisitionType: formData.acquisitionType,
      locationName: formData.locationName,
      nextPickupDate: formData.nextPickupDate,
      tagText: `Às ${formData.time}`
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit3 style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">Editar Medicamento</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>{med.name}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Dosagem / Concentração</label>
              <input
                type="text"
                className="form-input"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Unidade / Forma</label>
              <select
                className="form-select"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="comprimido(s)">Comprimido(s)</option>
                <option value="cápsula(s)">Cápsula(s)</option>
                <option value="ml">ml (Mililitros)</option>
                <option value="gotas">Gotas</option>
                <option value="flaconete(s)">Flaconete(s)</option>
                <option value="dose(s)">Dose(s) / Sachê</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ background: '#E6F5F2', padding: '12px', borderRadius: '14px', border: '1px solid #BCE5DC' }}>
            <label className="form-label" style={{ color: '#0D6C5D', marginBottom: '6px' }}>
              💊 Quantidade a tomar por vez:
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {['1', '2', '0.5'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setFormData({ ...formData, doseQuantity: preset })}
                  style={{
                    flex: '1',
                    padding: '8px',
                    borderRadius: '10px',
                    border: formData.doseQuantity === preset ? '2px solid #0D6C5D' : '1px solid #CBD5E1',
                    background: formData.doseQuantity === preset ? '#0D6C5D' : '#FFFFFF',
                    color: formData.doseQuantity === preset ? '#FFFFFF' : '#334155',
                    fontWeight: 800,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {preset} {preset === '1' ? 'unidade' : 'unidades'}
                </button>
              ))}
              <input
                type="number"
                step="any"
                min="0.1"
                className="form-input"
                style={{ width: '80px', textAlign: 'center', fontWeight: 800 }}
                value={formData.doseQuantity}
                onChange={(e) => setFormData({ ...formData, doseQuantity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Horário Preferencial</label>
            <input
              type="time"
              className="form-input"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Calendar size={14} style={{ display: 'inline', marginRight: '4px', color: '#0D6C5D' }} />
              Frequência / Dias de Tomada
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Seg, Qua, Sex | Apenas aos Domingos | Dia sim, dia não"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              required
            />
          </div>

          {/* Acquisition Source (UBS / Posto vs Farmácia) */}
          <div className="form-group" style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <label className="form-label" style={{ marginBottom: '8px', color: '#0F172A' }}>
              📍 Como você obtém este medicamento?
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, acquisitionType: 'ubs' })}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: formData.acquisitionType === 'ubs' ? '2px solid #0284C7' : '1px solid #CBD5E1',
                  background: formData.acquisitionType === 'ubs' ? '#E0F2FE' : '#FFFFFF',
                  color: formData.acquisitionType === 'ubs' ? '#0369A1' : '#475569',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                🏛️ Posto de Saúde (SUS)
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, acquisitionType: 'pharmacy' })}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: formData.acquisitionType === 'pharmacy' ? '2px solid #0D6C5D' : '1px solid #CBD5E1',
                  background: formData.acquisitionType === 'pharmacy' ? '#E6F5F2' : '#FFFFFF',
                  color: formData.acquisitionType === 'pharmacy' ? '#0D6C5D' : '#475569',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                🛒 Comprado em Farmácia
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '11px' }}>
                  {formData.acquisitionType === 'ubs' ? 'Nome do Posto / UBS' : 'Farmácia Preferencial'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={formData.acquisitionType === 'ubs' ? 'Ex: UBS Vila Mariana' : 'Ex: Drogaria São Paulo'}
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '11px' }}>
                  {formData.acquisitionType === 'ubs' ? 'Próxima Retirada no Posto' : 'Próxima Compra'}
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.nextPickupDate}
                  onChange={(e) => setFormData({ ...formData, nextPickupDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

