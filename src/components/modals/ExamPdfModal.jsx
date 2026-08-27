import React from 'react';
import { X, Download, Printer, CheckCircle, FileText } from 'lucide-react';

export const ExamPdfModal = ({ isOpen, onClose, exam }) => {
  if (!isOpen || !exam) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" style={{ maxHeight: '92%' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText style={{ color: '#0D6C5D' }} size={22} />
            <div>
              <h3 className="modal-title">{exam.title}</h3>
              <span style={{ fontSize: '12px', color: '#64748B' }}>{exam.lab} • {exam.date}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        {/* Simulated PDF Document Viewer */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0D6C5D', paddingBottom: '12px', marginBottom: '16px' }}>
            <div>
              <h4 style={{ color: '#0D6C5D', fontSize: '16px', fontWeight: 800 }}>{exam.lab}</h4>
              <p style={{ fontSize: '11px', color: '#64748B' }}>Laudo Médico Laboratorial Certificado</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-green">
                <CheckCircle size={12} style={{ marginRight: '4px' }} /> Liberado
              </span>
              <p style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px' }}>Protocolo: #8921-2026</p>
            </div>
          </div>

          <div style={{ fontSize: '13px', color: '#334155', marginBottom: '16px', background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px' }}>
            <strong>Paciente:</strong> Mateus Ribeiro | <strong>CPF:</strong> ***.456.789-** | <strong>Data de Emissão:</strong> {exam.date}
          </div>

          <h5 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#0F172A' }}>Resultados Analíticos:</h5>

          {exam.details && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {Object.entries(exam.details).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#F1F5F9', borderRadius: '6px', fontSize: '13px' }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#475569' }}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span style={{ fontWeight: 700, color: '#0D6C5D' }}>{val}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '12px', fontSize: '12px', color: '#475569' }}>
            <strong>Conclusão Diagnóstica:</strong> {exam.summary}
            <div style={{ marginTop: '12px', fontSize: '10px', color: '#94A3B8', textAlign: 'center' }}>
              Documento assinado digitalmente pelo responsável técnico CRM/SP 148.902
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="form-submit-btn"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => alert(`Baixando arquivo ${exam.pdfFile}...`)}
          >
            <Download size={16} /> Baixar PDF
          </button>
          <button
            className="form-submit-btn"
            style={{ flex: 1, background: '#F1F5F9', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => window.print()}
          >
            <Printer size={16} /> Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};
