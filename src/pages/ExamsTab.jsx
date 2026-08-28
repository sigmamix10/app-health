import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { FileText, Bell, Activity, Plus } from 'lucide-react';
import { ExamPdfModal } from '../components/modals/ExamPdfModal';
import { ExamPreparationModal } from '../components/modals/ExamPreparationModal';
import { NotificationCenterModal } from '../components/modals/NotificationCenterModal';
import { AddExamModal } from '../components/modals/AddExamModal';

export const ExamsTab = () => {
  const { exams } = useHealth();
  const [selectedExamPdf, setSelectedExamPdf] = useState(null);
  const [selectedPrepExam, setSelectedPrepExam] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Exames e Laudos</h1>
          <p className="page-subtitle">Acompanhe seus resultados laboratoriais</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '12px'
            }}
          >
            <Plus size={18} />
            <span>Registrar Exame</span>
          </button>

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
      </div>

      {/* List of Exams */}
      <div className="grid-responsive-2">
        {exams.length > 0 ? (
          exams.map((exam) => (
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
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{exam.title}</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                      {exam.lab}
                    </p>
                  </div>
                </div>

                <span
                  className={`badge ${
                    exam.status === 'Disponível' ? 'badge-green' : 'badge-orange'
                  }`}
                >
                  {exam.status}
                </span>
              </div>

              {/* Summary Text */}
              {exam.summary && (
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>
                  {exam.summary}
                </p>
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
          ))
        ) : (
          <div className="card" style={{ gridColumn: '1 / -1', padding: '40px 20px', textAlign: 'center', borderRadius: '22px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#E6F5F2', color: '#0D6C5D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              <FileText size={28} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
              Nenhum exame cadastrado
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '400px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
              Guarde seus laudos, hemogramas, exames de imagem e resultados laboratoriais com segurança.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                background: '#0D6C5D',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(13, 108, 93, 0.25)'
              }}
            >
              + Registrar Primeiro Exame
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddExamModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <ExamPdfModal isOpen={!!selectedExamPdf} onClose={() => setSelectedExamPdf(null)} exam={selectedExamPdf} />
      <ExamPreparationModal isOpen={!!selectedPrepExam} onClose={() => setSelectedPrepExam(null)} exam={selectedPrepExam} />
      <NotificationCenterModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
};
