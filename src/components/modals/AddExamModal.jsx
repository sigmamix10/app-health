import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { X, FileText } from 'lucide-react';

export const AddExamModal = ({ isOpen, onClose }) => {
  const { addExam } = useHealth();

  const [title, setTitle] = useState('');
  const [lab, setLab] = useState('');
  const [type, setType] = useState('lab'); // 'lab' | 'imaging'
  const [status, setStatus] = useState('Agendado'); // 'Agendado' | 'Disponível' | 'Realizado'
  const [examDate, setExamDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [examTime, setExamTime] = useState('08:00');
  const [summary, setSummary] = useState('');
  const [preparationInstructions, setPreparationInstructions] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Format date string for display (e.g. "15 Out 2026 • 08:00" or "15 Out 2026")
    const dateObj = new Date(examDate + 'T00:00:00');
    const formattedDateOnly = dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const displayDate = examTime ? `${formattedDateOnly} • ${examTime}` : formattedDateOnly;

    addExam({
      title: title.trim(),
      lab: lab.trim() || 'Laboratório / Hospital',
      type,
      status,
      date: displayDate,
      summary: summary.trim() || (status === 'Agendado' ? 'Exame agendado. Aguardando realização.' : 'Exame realizado pelo paciente.'),
      preparationInstructions: preparationInstructions.trim() || null
    });

    // Reset & close
    setTitle('');
    setLab('');
    setSummary('');
    setPreparationInstructions('');
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
              <FileText size={22} />
            </div>
            <div>
              <h3 className="modal-title">Registrar Exame / Agendamento</h3>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Cadastre datas de exames laboratoriais ou de imagem</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Nome do Exame */}
          <div className="form-group">
            <label className="form-label">Nome do Exame *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Hemograma Completo, Ultrassom Abdominal, Raio-X de Tórax"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Laboratório / Hospital */}
          <div className="form-group">
            <label className="form-label">Laboratório ou Hospital</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Laboratório Fleury, Sabin, Clínica MedImagem"
              value={lab}
              onChange={(e) => setLab(e.target.value)}
            />
          </div>

          {/* Categoria & Status em 2 colunas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Tipo de Exame</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="lab">Laboratorial (Sangue, Urina, etc.)</option>
                <option value="imaging">Imagem / Diagnóstico (Raio-X, Tomografia, Ultrassom)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status do Exame</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Agendado">Agendado (Futuro)</option>
                <option value="Disponível">Disponível / Concluído</option>
                <option value="Realizado">Realizado (Aguardando Laudo)</option>
              </select>
            </div>
          </div>

          {/* Data do Exame e Horário */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Data do Exame *</label>
              <input
                type="date"
                className="form-input"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Horário (Opcional)</label>
              <input
                type="time"
                className="form-input"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
              />
            </div>
          </div>

          {/* Resumo / Observações */}
          <div className="form-group">
            <label className="form-label">Resumo Clínico / Observações (Opcional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Exame de rotina anual, Requer retorno com resultado"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          {/* Instruções de Preparo */}
          <div className="form-group">
            <label className="form-label">Instruções de Preparo (Opcional)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Ex: Jejum absoluto de 8 horas. Tomar 4 copos de água 1h antes."
              value={preparationInstructions}
              onChange={(e) => setPreparationInstructions(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="form-submit-btn" style={{ marginTop: '8px' }}>
            Salvar Exame
          </button>
        </form>
      </div>
    </div>
  );
};
