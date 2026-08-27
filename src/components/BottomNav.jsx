import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Home, Pill, FileText, Calendar, User } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useHealth();

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'medications', label: 'Medicamentos', icon: Pill },
    { id: 'exams', label: 'Exames', icon: FileText },
    { id: 'consultations', label: 'Consultas', icon: Calendar },
    { id: 'profile', label: 'Perfil', icon: User }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
          >
            <IconComponent size={24} />
            <span>{item.label}</span>
          </button>
        );
      })}
      <div className="home-indicator" />
    </nav>
  );
};
