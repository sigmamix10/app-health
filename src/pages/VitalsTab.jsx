import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Activity, Heart, Bell, TrendingUp, Scale, Droplet, Plus } from 'lucide-react';
import { AddVitalModal } from '../components/modals/AddVitalModal';
import { NotificationCenterModal } from '../components/modals/NotificationCenterModal';

export const VitalsTab = () => {
  const { vitals } = useHealth();
  const [isAddVitalOpen, setIsAddVitalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG Chart calculation parameters for 7-day history
  const chartWidth = 300;
  const chartHeight = 80;
  const history = vitals.history7Days;

  const minVal = 110;
  const maxVal = 130;

  const points = history.map((item, index) => {
    const x = (index / (history.length - 1)) * (chartWidth - 20) + 10;
    const y = chartHeight - ((item.systolic - minVal) / (maxVal - minVal)) * (chartHeight - 20) - 10;
    return { x, y, day: item.day, val: item.systolic, diastolic: item.diastolic };
  });

  const pathD = points.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Sinais Vitais</h1>
          <p className="page-subtitle">Gráficos e histórico de monitoramento</p>
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

      {/* Top 2 Cards Row: Pressão Arterial & Frequência Cardíaca */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Pressão Arterial Card */}
        <div className="card" style={{ padding: '16px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Pressão Arterial</span>
            <TrendingUp size={16} style={{ color: '#16A34A' }} />
          </div>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
              {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>
              {vitals.bloodPressure.unit}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>
            {vitals.bloodPressure.status}
          </span>
        </div>

        {/* Frequência Cardíaca Card */}
        <div className="card" style={{ padding: '16px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Frequência Cardíaca</span>
            <Heart size={16} style={{ color: '#EF4444' }} />
          </div>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
              {vitals.heartRate.value}
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>
              {vitals.heartRate.unit}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>
            {vitals.heartRate.status}
          </span>
        </div>
      </div>

      {/* Dynamic 7-Day Blood Pressure Line Chart Card (Exact Figma Replica) */}
      <div className="card" style={{ padding: '18px', borderRadius: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Histórico de Pressão</h3>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>
            mmHg
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
          Últimos 7 dias (Sistólica)
        </p>

        {/* SVG Chart Area */}
        <div style={{ width: '100%', position: 'relative' }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', overflow: 'visible' }}>
            {/* Dashed baseline */}
            <line
              x1="0"
              y1={chartHeight / 2}
              x2={chartWidth}
              y2={chartHeight / 2}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />

            {/* Line Path */}
            <path d={pathD} fill="none" stroke="#0D6C5D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Data Points */}
            {points.map((pt, idx) => (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredPoint === idx ? 6 : 4}
                  fill="#0D6C5D"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}
          </svg>

          {/* Days Labels X-Axis */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 4px' }}>
            {history.map((h, i) => (
              <span key={i} style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
                {h.day}
              </span>
            ))}
          </div>

          {/* Active Tooltip on hover */}
          {hoveredPoint !== null && (
            <div
              style={{
                position: 'absolute',
                top: '-32px',
                left: `${(hoveredPoint / (history.length - 1)) * 80 + 5}%`,
                background: '#0F172A',
                color: '#FFFFFF',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                pointerEvents: 'none'
              }}
            >
              {points[hoveredPoint].val}/{points[hoveredPoint].diastolic} mmHg
            </div>
          )}
        </div>
      </div>

      {/* Bottom 2 Cards Row: Peso Corporal & Glicose em Jejum */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Peso Corporal */}
        <div className="card" style={{ padding: '16px', borderRadius: '18px' }}>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Peso Corporal
          </span>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
              {vitals.weight.value}
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>
              {vitals.weight.unit}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
            Meta: {vitals.weight.target} kg
          </span>
        </div>

        {/* Glicose em Jejum */}
        <div className="card" style={{ padding: '16px', borderRadius: '18px' }}>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Glicose em Jejum
          </span>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
              {vitals.glucose.value}
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>
              {vitals.glucose.unit}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>
            {vitals.glucose.status}
          </span>
        </div>
      </div>

      {/* FAB to Add New Vital Measurement */}
      <button className="fab-btn" onClick={() => setIsAddVitalOpen(true)}>
        <Plus size={20} /> Registrar
      </button>

      {/* Modals */}
      <AddVitalModal isOpen={isAddVitalOpen} onClose={() => setIsAddVitalOpen(false)} />
      <NotificationCenterModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
};
