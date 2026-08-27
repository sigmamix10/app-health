import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, Calendar } from 'lucide-react';

export const AddAppointmentModal = ({ isOpen, onClose }) => {
  const { addAppointment, userProfile } = useHealth();

  const [doctor, setDoctor] = useState('');
  const [specialty, setSpecialty] = useState('Clínico Geral');
  const [hospital, setHospital] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00');
  const [type, setType] = useState('Atendimento presencial');
  const [insurance, setInsurance] = useState(() => userProfile?.healthPlan?.name || 'Bradesco Saúde');
  const [selectedAvatar, setSelectedAvatar] = useState('https://api.dicebear.com/10.x/voxel-art/svg?seed=Alexandre');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  if (!isOpen) return null;

  const doctorAvatars = [
    { label: 'Alexandre', url: 'https://api.dicebear.com/10.x/voxel-art/svg?seed=Alexandre' },
    { label: 'Beatriz', url: 'https://api.dicebear.com/10.x/voxel-art/svg?seed=Beatriz' },
    { label: 'Carlos', url: 'https://api.dicebear.com/10.x/voxel-art/svg?seed=Carlos' },
    { label: 'Patrícia', url: 'https://api.dicebear.com/10.x/voxel-art/svg?seed=Patricia' },
    { label: 'Marcelo', url: 'https://api.dicebear.com/10.x/voxel-art/svg?seed=Marcelo' },
    { label: 'Juliana', url: 'https://api.dicebear.com/10.x/voxel-art/svg?seed=Juliana' }
  ];

  // Dynamic Voxel-Art generator based on the doctor name if no specific avatar chosen
  const activeAvatar = customAvatarUrl.trim() || selectedAvatar || (doctor.trim() ? `https://api.dicebear.com/10.x/voxel-art/svg?seed=${encodeURIComponent(doctor.trim())}` : 'https://api.dicebear.com/10.x/voxel-art/svg?seed=Doctor');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctor.trim()) return;

    // Format date string for display (e.g., "28 Out" or "Amanhã")
    const selectedDateObj = new Date(date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round((selectedDateObj - today) / (1000 * 60 * 60 * 24));
    let dateText = selectedDateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    if (diffDays === 0) dateText = 'Hoje';
    else if (diffDays === 1) dateText = 'Amanhã';

    addAppointment({
      doctor: doctor.trim(),
      specialty,
      hospital: hospital.trim() || 'Consultório Médico',
      address: address.trim() || hospital.trim() || 'Endereço informado na recepção',
      dateText,
      timeText: time,
      type,
      insurance: insurance ? `Convênio ${insurance}` : 'Particular',
      avatar: activeAvatar
    });

    // Reset fields & close
    setDoctor('');
    setHospital('');
    setAddress('');
    setCustomAvatarUrl('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: '#E6F5F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0D6C5D'
              }}
            >
              <Calendar size={22} />
            </div>
            <div>
              <h3 className="modal-title">Nova Consulta Médica</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Agende ou adicione um compromisso médico</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Nome do Médico */}
          <div className="form-group">
            <label className="form-label">Nome do Médico(a) *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Dra. Juliana Lima"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            />
          </div>

          {/* Especialidade */}
          <div className="form-group">
            <label className="form-label">Especialidade</label>
            <select
              className="form-select"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="Clínico Geral">Clínico Geral</option>
              <option value="Cardiologia">Cardiologia</option>
              <option value="Dermatologia">Dermatologia</option>
              <option value="Endocrinologia">Endocrinologia</option>
              <option value="Ginecologia / Obstetrícia">Ginecologia / Obstetrícia</option>
              <option value="Neurologia">Neurologia</option>
              <option value="Odontologia">Odontologia</option>
              <option value="Oftalmologia">Oftalmologia</option>
              <option value="Ortopedia">Ortopedia</option>
              <option value="Pediatria">Pediatria</option>
              <option value="Psiquiatria / Psicologia">Psiquiatria / Psicologia</option>
              <option value="Outra Especialidade">Outra Especialidade</option>
            </select>
          </div>

          {/* Local / Hospital / Clínica */}
          <div className="form-group">
            <label className="form-label">Local / Hospital / Clínica</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Hospital Albert Einstein, Consultório Jardins"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
          </div>

          {/* Endereço Completo */}
          <div className="form-group">
            <label className="form-label">Endereço Completo (Opcional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Av. Paulista, 1500 - Cj 82, São Paulo - SP"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Data e Horário (2 colunas) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Data da Consulta</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Horário</label>
              <input
                type="time"
                className="form-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Tipo de Atendimento */}
          <div className="form-group">
            <label className="form-label">Tipo de Atendimento</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Atendimento presencial">Atendimento presencial</option>
              <option value="Telemedicina / Online">Telemedicina / Online</option>
              <option value="Consulta de Rotina">Consulta de Rotina</option>
              <option value="Retorno de Exames">Retorno de Exames</option>
            </select>
          </div>

          {/* Convênio / Plano de Saúde */}
          <div className="form-group">
            <label className="form-label">Convênio Médico / Plano</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Bradesco Saúde, Unimed, Particular"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            />
          </div>

          {/* Seleção do Avatar do Médico */}
          <div className="form-group">
            <label className="form-label">Escolha o Avatar Voxel-Art do Médico(a)</label>

            {/* Galeria de Avatares Voxel-Art da API DiceBear */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {doctorAvatars.map((av) => {
                const isSelected = activeAvatar === av.url;
                return (
                  <div
                    key={av.url}
                    onClick={() => {
                      setSelectedAvatar(av.url);
                      setCustomAvatarUrl('');
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#E6F5F2' : '#F8FAFC',
                        border: isSelected ? '3px solid #0D6C5D' : '2px solid #E2E8F0',
                        boxShadow: isSelected ? '0 0 0 3px rgba(13, 108, 93, 0.15)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        padding: '4px'
                      }}
                    >
                      <img
                        src={av.url}
                        alt={av.label}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '11px', color: isSelected ? '#0D6C5D' : '#64748B', fontWeight: isSelected ? 700 : 500 }}>
                      {av.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input de URL Personalizada */}
            <div style={{ marginTop: '4px' }}>
              <label style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                Ou cole a URL de uma foto da internet:
              </label>
              <input
                type="url"
                className="form-input"
                placeholder="https://exemplo.com/foto_do_medico.jpg"
                value={customAvatarUrl}
                onChange={(e) => setCustomAvatarUrl(e.target.value)}
                style={{ fontSize: '13px' }}
              />
            </div>
          </div>

          <button type="submit" className="form-submit-btn" style={{ marginTop: '8px' }}>
            Salvar Consulta
          </button>
        </form>
      </div>
    </div>
  );
};
