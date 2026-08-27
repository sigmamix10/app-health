import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { FileText, Bell, Activity, ChevronRight } from 'lucide-react';
import { ExamPdfModal } from '../components/modals/ExamPdfModal';
import { ExamPreparationModal } from '../components/modals/ExamPreparationModal';
import { NotificationCenterModal } from '../components/modals/NotificationCenterModal';

export const ExamsTab = () => {
  const { exams } = useHealth();
  const [selectedExamPdf, setSelectedExamPdf] = useState(null);
  const [selectedPrepExam, setSelectedPrepExam] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Exames e Laudos</h1>
          <p className="page-subtitle">Acompanhe seus resultados laboratoriais</p>
        </div>
        <button
          onClick={() => setIsNotifOpen(true)}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #EBF1F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F172A',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
          aria-label="Notificações"
        >
          <Bell size={20} />
        </button>
      </div>

      {/* List of Exams */}
      <div className="grid-responsive-2">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="card"
            style={{ padding: '18px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {/* Top Row: Icon + Name/Lab + Status Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: exam.type === 'imaging' ? '#EFF6FF' : '#E6F5F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: exam.type === 'imaging' ? '#2563EB' : '#0D6C5D',
                    flexShrink: 0
                  }}
                >
                  {exam.type === 'imaging' ? <Activity size={22} /> : <FileText size={22} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{exam.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                    {exam.lab}
                  </p>
                </div>
              </div>

              <span className={`badge ${exam.status === 'Disponível' ? 'badge-green' : 'badge-orange'}`}>
                {exam.status}
              </span>
            </div>

            {/* Clinical Summary Callout Box (Figma Match) */}
            {exam.summary && (
              <div
                style={{
                  background: '#F8FAFC',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #F1F5F9',
                  fontSize: '12px',
                  color: '#475569',
                  lineHeight: 1.4
                }}
              >
                <span style={{ fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '2px' }}>
                  Resumo clínico rápido:
                </span>
                <span style={{ fontWeight: 700, color: '#1E293B' }}>{exam.summary}</span>
              </div>
            )}

            {/* Footer Row: Date + Action Link */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                {exam.status === 'Agendado' ? `Data marcada: ${exam.date}` : `Realizado em: ${exam.date}`}
              </span>

              {exam.status === 'Disponível' ? (
                <button
                  onClick={() => setSelectedExamPdf(exam)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0D6C5D',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Ver PDF Completo
                </button>
              ) : (
                <button
                  onClick={() => setSelectedPrepExam(exam)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0D6C5D',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Preparação
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ExamPdfModal isOpen={!!selectedExamPdf} onClose={() => setSelectedExamPdf(null)} exam={selectedExamPdf} />
      <ExamPreparationModal isOpen={!!selectedPrepExam} onClose={() => setSelectedPrepExam(null)} exam={selectedPrepExam} />
      <NotificationCenterModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
};
