import React from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import { MobileFrame } from './components/MobileFrame';
import { HomeTab } from './pages/HomeTab';
import { MedicationsTab } from './pages/MedicationsTab';
import { ExamsTab } from './pages/ExamsTab';
import { ConsultationsTab } from './pages/ConsultationsTab';
import { VitalsTab } from './pages/VitalsTab';
import { ProfileTab } from './pages/ProfileTab';
import { LandingPage } from './pages/LandingPage';
import './styles/global.css';

const ScreenRouter = () => {
  const { activeTab } = useHealth();

  switch (activeTab) {
    case 'landing':
      return <LandingPage />;
    case 'home':
      return <HomeTab />;
    case 'medications':
      return <MedicationsTab />;
    case 'exams':
      return <ExamsTab />;
    case 'consultations':
      return <ConsultationsTab />;
    case 'vitals':
      return <VitalsTab />;
    case 'profile':
      return <ProfileTab />;
    default:
      return <HomeTab />;
  }
};

export default function App() {
  return (
    <HealthProvider>
      <MobileFrame>
        <ScreenRouter />
      </MobileFrame>
    </HealthProvider>
  );
}
