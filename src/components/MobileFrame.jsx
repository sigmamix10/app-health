import React from 'react';
import { useHealth } from '../context/HealthContext';
import { BottomNav } from './BottomNav';
import { Wifi, Battery, Signal, Smartphone, Activity, Home, Pill, FileText, Calendar, User, Monitor, Cloud, CloudOff, Database, CheckCircle2 } from 'lucide-react';

export const MobileFrame = ({ children }) => {
  const { viewMode, setViewMode, activeTab, setActiveTab, userProfile, syncStatus, isFirebaseConfigured } = useHealth();

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'medications', label: 'Medicamentos', icon: Pill },
    { id: 'exams', label: 'Exames', icon: FileText },
    { id: 'consultations', label: 'Consultas', icon: Calendar },
    { id: 'profile', label: 'Perfil', icon: User }
  ];

  const renderSyncBadge = () => {
    if (isFirebaseConfigured) {
      if (syncStatus === 'syncing') {
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '12px', background: '#FEF3C7', color: '#B45309' }}>
            <Cloud size={14} className="spin-animate" /> Salvando no Firebase...
          </span>
        );
      }
      if (syncStatus === 'error') {
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C' }}>
            <CloudOff size={14} /> Erro Firebase
          </span>
        );
      }
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '12px', background: '#E6F5F2', color: '#0D6C5D' }}>
          <Cloud size={14} /> Firebase Nuvem (Exclusivo)
        </span>
      );
    }

    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '12px', background: '#F1F5F9', color: '#64748B' }}>
        <CloudOff size={14} /> Firebase Desconectado
      </span>
    );
  };

  return (
    <div className="app-wrapper">
      {viewMode === 'responsive' ? (
        /* ---------------- NATIVE FULL-SCREEN RESPONSIVE WEB APP ---------------- */
        <div className="responsive-container">
          {/* Sticky Desktop Top Navigation Header */}
          <header className="desktop-header">
            <div className="desktop-header-inner">
              <div className="desktop-logo" onClick={() => setActiveTab('home')}>
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
                  <Activity size={22} />
                </div>
                <span>Saúde & Acompanhamento</span>
              </div>

              {/* Navigation Tabs for Desktop / Notebook */}
              <nav className="desktop-nav-tabs">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      className={`desktop-nav-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <IconComp size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Desktop User Avatar & Mode Toggle */}
              <div className="desktop-user-menu">
                {renderSyncBadge()}

                <button
                  className="device-toggle-btn"
                  onClick={() => setViewMode('phoneFrame')}
                  title="Simular visualização em moldura de celular"
                >
                  <Smartphone size={15} />
                  Simular Celular
                </button>

                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  onClick={() => setActiveTab('profile')}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #0D6C5D',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          </header>

          {/* Main Full-Screen Content */}
          <main className="app-screen">
            {children}
          </main>

          {/* Bottom Navigation for mobile viewports */}
          <BottomNav />
        </div>
      ) : (
        /* ---------------- PHONE MOCKUP MODE (WHEN EXPLICITLY TOGGLED) ---------------- */
        <div className="phone-mode-wrapper">
          <div style={{ marginBottom: '16px' }}>
            <button
              className="device-toggle-btn"
              onClick={() => setViewMode('responsive')}
              style={{ background: '#FFFFFF', color: '#0F172A', fontWeight: 800, padding: '8px 18px' }}
            >
              <Monitor size={16} /> Voltar para Visão Web Completa
            </button>
          </div>

          <div className="phone-container">
            {/* iOS Status Bar */}
            <div className="status-bar">
              <span className="status-bar-time">09:41</span>
              <div className="status-bar-icons">
                <span className="network-label">Claro</span>
                <Signal size={14} />
                <Wifi size={14} />
                <Battery size={18} />
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <main className="app-screen">
              {children}
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
          </div>
        </div>
      )}
    </div>
  );
};
