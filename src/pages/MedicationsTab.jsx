import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Pill, Bell, Plus, Edit3, PackagePlus, AlertTriangle, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { AddMedicationModal } from '../components/modals/AddMedicationModal';
import { EditMedicationModal } from '../components/modals/EditMedicationModal';
import { RefillStockModal } from '../components/modals/RefillStockModal';
import { LogDoseModal } from '../components/modals/LogDoseModal';
import { NotificationCenterModal } from '../components/modals/NotificationCenterModal';

export const MedicationsTab = () => {
  const { medications, intakeHistory, calculateStockPrediction } = useHealth();
  const [filter, setFilter] = useState('active'); // 'active' | 'archived'
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLogDoseOpen, setIsLogDoseOpen] = useState(false);
  const [selectedMedForDose, setSelectedMedForDose] = useState(null);
  const [editingMed, setEditingMed] = useState(null);
  const [refillMed, setRefillMed] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const activeMeds = medications.filter((m) => m.category === 'active');
  const archivedMeds = medications.filter((m) => m.category === 'archived');
  const displayedMeds = filter === 'active' ? activeMeds : archivedMeds;

  // Check if any medication has low stock (<= 7 days)
  const lowStockMeds = activeMeds.filter((m) => {
    const pred = calculateStockPrediction(m.currentStock, m.dailyDoseCount);
    return pred.daysLeft <= 7;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Meus Medicamentos</h1>
          <p className="page-subtitle">Acompanhe seus horários, histórico de ingestão e estoque</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => {
              setSelectedMedForDose(null);
              setIsLogDoseOpen(true);
            }}
            style={{
              backgroundColor: '#0D6C5D',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '100px',
              padding: '8px 16px',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(13, 108, 93, 0.25)'
            }}
          >
            <CheckCircle2 size={16} /> Registrar Dose
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

      {/* Low Stock Warning Alert Banner */}
      {lowStockMeds.length > 0 && filter === 'active' && (
        <div
          style={{
            background: '#FEF3C7',
            border: '1px solid #FDE68A',
            padding: '14px 16px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <AlertTriangle size={22} style={{ color: '#D97706', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#92400E' }}>
              Alerta de Estoque Baixo ({lowStockMeds.length} medicamento{lowStockMeds.length > 1 ? 's' : ''})
            </h4>
            <p style={{ fontSize: '12px', color: '#B45309', marginTop: '2px' }}>
              {lowStockMeds.map((m) => m.name).join(', ')} estão acabando em breve. Reabasteça para não interromper o tratamento.
            </p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Ativos ({activeMeds.length})
        </button>
        <button
          className={`filter-tab ${filter === 'archived' ? 'active' : ''}`}
          onClick={() => setFilter('archived')}
        >
          Arquivados ({archivedMeds.length})
        </button>
      </div>

      {/* List of Medications Cards */}
      <div className="grid-responsive-2">
        {displayedMeds.map((med) => {
          const prediction = calculateStockPrediction(med.currentStock, med.dailyDoseCount);
          const stockPercent = Math.min(100, Math.round((med.currentStock / (med.totalStock || 30)) * 100));

          return (
            <div
              key={med.id}
              className="card"
              style={{
                padding: '20px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: prediction.status === 'critical' ? '1.5px solid #FCA5A5' : '1px solid #EBF1F0'
              }}
            >
              {/* Top Row: Icon + Name + Dose Status Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      backgroundColor: med.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: med.iconColor,
                      flexShrink: 0
                    }}
                  >
                    <Pill size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{med.name}</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                      {med.dosage} • {med.frequency}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedMedForDose(med);
                    setIsLogDoseOpen(true);
                  }}
                  className={`badge ${med.status === 'taken' ? 'badge-green' : 'badge-orange'}`}
                  style={{ border: 'none', cursor: 'pointer', fontSize: '12px', padding: '6px 12px' }}
                >
                  {med.status === 'taken' ? 'Tomado' : (med.tagText || 'Às 12:00')}
                </button>
              </div>

              {/* Stock Progress Bar & Prediction Box */}
              {med.category === 'active' && (
                <div
                  style={{
                    background: '#F8FAFC',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1px solid #F1F5F9',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ fontWeight: 700, color: '#334155' }}>
                      📦 Estoque: <strong>{med.currentStock} un. restantes</strong>
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        color: prediction.status === 'critical' ? '#EF4444' : prediction.status === 'warning' ? '#D97706' : '#16A34A'
                      }}
                    >
                      {prediction.daysLeft} dias restantes
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '100px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${stockPercent}%`,
                        height: '100%',
                        background: prediction.status === 'critical' ? '#EF4444' : prediction.status === 'warning' ? '#F59E0B' : '#0D6C5D',
                        borderRadius: '100px',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                    <Calendar size={13} style={{ color: '#94A3B8' }} />
                    <span>Previsão de término: <strong>{prediction.predictionText}</strong></span>
                  </div>
                </div>
              )}

              {/* Footer Row: Actions (Registrar Intake, Reabastecer, Editar) */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setSelectedMedForDose(med);
                    setIsLogDoseOpen(true);
                  }}
                  style={{
                    background: '#E6F5F2',
                    border: 'none',
                    color: '#0D6C5D',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <CheckCircle2 size={14} /> Registrar Dose
                </button>

                <div style={{ display: 'flex', gap: '12px' }}>
                  {med.category === 'active' && (
                    <button
                      onClick={() => setRefillMed(med)}
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
                      <PackagePlus size={15} /> Reabastecer
                    </button>
                  )}
                  <button
                    onClick={() => setEditingMed(med)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64748B',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Edit3 size={15} /> Editar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Intake History Section */}
      <div style={{ marginTop: '10px' }}>
        <div className="section-title-row">
          <h2 className="section-title">Histórico de Doses Tomadas Hoje</h2>
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
            {intakeHistory.length} dose{intakeHistory.length > 1 ? 's' : ''} registrada{intakeHistory.length > 1 ? 's' : ''}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {intakeHistory.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '14px 16px',
                borderRadius: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#E8F8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16A34A'
                  }}
                >
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                    {item.medName}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    <strong>{item.quantityTaken} {item.unit}</strong> ({item.dosage}) • {item.notes}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#0D6C5D', fontWeight: 700, background: '#E6F5F2', padding: '4px 10px', borderRadius: '100px' }}>
                <Clock size={13} />
                <span>{item.timeTaken}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (+ Adicionar) */}
      <button className="fab-btn" onClick={() => setIsAddOpen(true)}>
        <Plus size={20} /> Cadastrar Medicamento
      </button>

      {/* Modals */}
      <AddMedicationModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <LogDoseModal isOpen={isLogDoseOpen} onClose={() => setIsLogDoseOpen(false)} selectedMed={selectedMedForDose} />
      <EditMedicationModal isOpen={!!editingMed} onClose={() => setEditingMed(null)} med={editingMed} />
      <RefillStockModal isOpen={!!refillMed} onClose={() => setRefillMed(null)} med={refillMed} />
      <NotificationCenterModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
};
