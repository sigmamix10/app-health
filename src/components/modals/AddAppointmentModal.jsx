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
  const [selectedAvatar, setSelectedAvatar] = useState('/avatars/dr_alexandre.jpg');

  if (!isOpen) return null;

  const doctorAvatars = [
    { label: 'Dr. Alexandre', url: '/avatars/dr_alexandre.jpg' },
    { label: 'Dra. Beatriz', url: '/avatars/dra_beatriz.jpg' },
    { label: 'Dr. Carlos', url: '/avatars/dr_carlos.jpg' }
  ];

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
      avatar: selectedAvatar
    });

    // Reset fields & close
    setDoctor('');
    setHospital('');
    setAddress('');
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

          {/* Avatar Selecionável */}
          <div className="form-group">
            <label className="form-label">Selecione o Ícone / Foto do Médico</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {doctorAvatars.map((av) => (
                <img
                  key={av.url}
                  src={av.url}
                  alt={av.label}
                  onClick={() => setSelectedAvatar(av.url)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: selectedAvatar === av.url ? '3px solid #0D6C5D' : '2px solid #E2E8F0',
                    cursor: 'pointer',
                    opacity: selectedAvatar === av.url ? 1 : 0.6
                  }}
                />
              ))}
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
