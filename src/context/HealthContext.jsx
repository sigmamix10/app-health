import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  isFirebaseConfigured,
  subscribeToPatientRecord,
  savePatientRecordToFirestore
} from '../services/firebase';

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  // Active Tab: 'home', 'medications', 'exams', 'consultations', 'profile', 'vitals'
  const [activeTab, setActiveTab] = useState('home');
  // View Mode: 'responsive' (Desktop/Notebook/Tablet/Mobile Fluid) | 'phoneFrame' (Figma Mobile Bezel)
  const [viewMode, setViewMode] = useState('responsive');

  // Cloud Sync Status: 'synced' | 'syncing' | 'error' | 'disconnected'
  const [syncStatus, setSyncStatus] = useState(isFirebaseConfigured ? 'synced' : 'disconnected');
  const isRemoteUpdate = useRef(false);

  // User Patient Data
  const [userProfile, setUserProfile] = useState({
    name: 'Mateus Ribeiro',
    age: '34 anos',
    location: 'São Paulo, SP',
    greeting: 'Como está sua saúde hoje?',
    avatar: '/avatars/mateus.jpg',
    bloodType: 'O +',
    height: '1,82 m',
    weight: '78,4 kg',
    allergiesAndConditions: [
      { text: 'Alergia: Penicilina', type: 'danger' },
      { text: 'Hipertensão Leve', type: 'warning' }
    ],
    emergencyContact: {
      name: 'Ana Ribeiro',
      relation: 'Esposa',
      phone: '(11) 98765-4321'
    },
    healthPlan: {
      name: 'Bradesco Saúde',
      planType: 'Nacional Flex',
      number: 'Nº 4279 8812 0031'
    }
  });

  // Action Handler: Update Full Patient Profile
  const updateProfile = (updatedFields) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };

  // Action Handler: Update Profile Avatar URL
  const updateProfileAvatar = (avatarUrl) => {
    setUserProfile((prev) => ({
      ...prev,
      avatar: avatarUrl
    }));
  };

  // Helper to calculate stock run out prediction
  const calculateStockPrediction = (currentStock, dailyDoseCount = 1) => {
    const daysLeft = Math.max(0, Math.floor(currentStock / dailyDoseCount));
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysLeft);

    const dateFormatted = targetDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });

    let status = 'good'; // 'good' | 'warning' | 'critical'
    if (daysLeft <= 3) {
      status = 'critical';
    } else if (daysLeft <= 7) {
      status = 'warning';
    }

    return {
      daysLeft,
      dateFormatted,
      status,
      predictionText: daysLeft === 0 ? 'Estoque esgotado!' : `Acaba em ${dateFormatted} (${daysLeft} dias)`
    };
  };

  // Daily Intake History Log (Matches patient intake tracking)
  const [intakeHistory, setIntakeHistory] = useState([
    {
      id: 'intake-1',
      medId: 'med-1',
      medName: 'Losartana Potássica',
      dosage: '50mg',
      quantityTaken: 1,
      unit: 'comprimido',
      timeTaken: '08:00',
      dateTaken: new Date().toLocaleDateString('pt-BR'),
      notes: 'Tomado no café da manhã'
    }
  ]);

  // Action Handler: Log Dose Intake with custom quantity and time
  const logDoseIntake = ({ medId, medName, dosage, quantityTaken = 1, timeTaken, notes }) => {
    const qty = Number(quantityTaken) || 1;
    const nowTime = timeTaken || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const todayDate = new Date().toLocaleDateString('pt-BR');

    // 1. Add entry to intake history log
    const newEntry = {
      id: `intake-${Date.now()}`,
      medId,
      medName,
      dosage,
      quantityTaken: qty,
      unit: qty > 1 ? 'comprimidos' : 'comprimido',
      timeTaken: nowTime,
      dateTaken: todayDate,
      notes: notes || 'Registrado pelo paciente'
    };

    setIntakeHistory((prev) => [newEntry, ...prev]);

    // 2. Update medication status to 'taken' and deduct exact quantity from stock
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === medId || med.name === medName) {
          return {
            ...med,
            status: 'taken',
            statusText: 'Tomado',
            currentStock: Math.max(0, med.currentStock - qty),
            iconBg: '#E6F5F2',
            iconColor: '#0D6C5D'
          };
        }
        return med;
      })
    );
  };

  const [medications, setMedications] = useState([
    {
      id: 'med-1',
      name: 'Losartana Potássica',
      shortName: 'Losartana',
      dosage: '50mg',
      frequency: '1x ao dia',
      dailyDoseCount: 1,
      currentStock: 14,
      totalStock: 30,
      time: '08:00',
      status: 'taken', // 'taken' | 'pending'
      statusText: 'Tomado',
      nextDose: 'Próxima dose: Amanhã às 08:00',
      category: 'active',
      iconBg: '#E6F5F2',
      iconColor: '#0D6C5D'
    },
    {
      id: 'med-2',
      name: 'Metformina Cloridrato',
      shortName: 'Metformina',
      dosage: '850mg',
      frequency: '2x ao dia',
      dailyDoseCount: 2,
      currentStock: 6,
      totalStock: 30,
      time: '12:00',
      status: 'pending',
      statusText: 'Pendente',
      tagText: 'Às 12:00',
      nextDose: 'Segunda dose: Hoje às 20:00',
      category: 'active',
      iconBg: '#FEF3C7',
      iconColor: '#D97706'
    },
    {
      id: 'med-3',
      name: 'Atorvastatina Cálcica',
      shortName: 'Atorvastatina',
      dosage: '20mg',
      frequency: '1x ao dia',
      dailyDoseCount: 1,
      currentStock: 25,
      totalStock: 30,
      time: '22:00',
      status: 'pending',
      statusText: 'Pendente',
      tagText: 'Às 22:00',
      nextDose: 'Uso contínuo noturno',
      category: 'active',
      iconBg: '#FEF3C7',
      iconColor: '#D97706'
    },
    {
      id: 'med-4',
      name: 'Amoxicilina',
      shortName: 'Amoxicilina',
      dosage: '500mg',
      frequency: 'Tratamento finalizado',
      dailyDoseCount: 0,
      currentStock: 0,
      totalStock: 14,
      time: '08:00',
      status: 'taken',
      statusText: 'Arquivado',
      nextDose: 'Uso encerrado',
      category: 'archived',
      iconBg: '#F1F5F9',
      iconColor: '#64748B'
    }
  ]);

  // Exams Data (Matches Screenshot 3)
  const [exams, setExams] = useState([
    {
      id: 'exam-1',
      title: 'Hemograma Completo',
      lab: 'Laboratório Fleury',
      status: 'Disponível',
      date: '12 Out 2026',
      summary: 'Hemoglobina estável (14.2 g/dL), leucócitos normais (6.800/mm³). Sem sinais de infecção ou anemia.',
      details: {
        hemoglobin: '14.2 g/dL (Ref: 13.5 - 17.5)',
        platelets: '240.000 /mm³ (Ref: 150.000 - 450.000)',
        leukocytes: '6.800 /mm³ (Ref: 4.500 - 11.000)',
        hematocrit: '42% (Ref: 41 - 53%)'
      },
      pdfFile: 'Hemograma_Completo_Mateus_Ribeiro.pdf',
      type: 'lab'
    },
    {
      id: 'exam-2',
      title: 'Perfil Lipídico Completo',
      lab: 'Laboratório Sabin',
      status: 'Disponível',
      date: '10 Out 2026',
      summary: 'LDL: 110mg/dL (Desejável menor que 100). HDL e Triglicerídeos dentro da normalidade.',
      details: {
        totalCholesterol: '185 mg/dL (Ref: < 190)',
        hdl: '52 mg/dL (Ref: > 40)',
        ldl: '110 mg/dL (Ref: < 100)',
        triglycerides: '115 mg/dL (Ref: < 150)'
      },
      pdfFile: 'Perfil_Lipidico_Mateus_Ribeiro.pdf',
      type: 'lab'
    },
    {
      id: 'exam-3',
      title: 'Ultrassom Abdominal',
      lab: 'Clínica MedImagem',
      status: 'Agendado',
      date: '05 Nov 2026 • 09:00',
      summary: 'Exame agendado. Requer jejum absoluto de 8 horas e ingestão de 4 copos de água 1 hora antes.',
      preparationInstructions: [
        'Jejum absoluto de alimentos e água por 8 horas antes do horário do exame.',
        'Tomar 4 copos de água sem gás 1 hora antes e não urinar até a realização.',
        'Trazer exames anteriores de ultrassom se houver.',
        'Chegar com 20 minutos de antecedência na recepção da Clínica MedImagem.'
      ],
      type: 'imaging'
    }
  ]);

  // Appointments / Consultations Data (Matches Screenshots 1 & 4)
  const [appointments, setAppointments] = useState([
    {
      id: 'app-1',
      doctor: 'Dr. Alexandre Santos',
      specialty: 'Cardiologista',
      hospital: 'Hospital Albert Einstein - Bloco B, Cj 402',
      dateText: 'Amanhã',
      timeText: '14:30',
      fullDate: '28 de Agosto, às 14:30',
      type: 'Atendimento presencial',
      insurance: 'Convênio Bradesco Saúde',
      status: 'Confirmado', // 'Confirmado' | 'Amanhã'
      avatar: '/avatars/dr_alexandre.jpg',
      address: 'Av. Albert Einstein, 627 - Morumbi, São Paulo - SP',
      isUpcoming: true
    },
    {
      id: 'app-2',
      doctor: 'Dra. Beatriz Costa',
      specialty: 'Endocrinologista',
      hospital: 'Consultório Jardins - Av. Paulista, 1500',
      dateText: '04 Nov',
      timeText: '10:00',
      fullDate: '04 de Novembro, às 10:00',
      type: 'Consulta de Rotina',
      insurance: 'Convênio Bradesco Saúde',
      status: 'Agendado',
      avatar: '/avatars/dra_beatriz.jpg',
      address: 'Av. Paulista, 1500 - Cj 82, Jardins, São Paulo - SP',
      isUpcoming: true
    },
    {
      id: 'app-3',
      doctor: 'Dr. Carlos Eduardo',
      specialty: 'Clínico Geral',
      hospital: 'Centro Médico Paulista',
      dateText: '10 Set 2026',
      timeText: '16:00',
      fullDate: '10 de Setembro de 2026',
      type: 'Consulta Realizada',
      insurance: 'Convênio Bradesco Saúde',
      status: 'Realizada',
      avatar: '/avatars/dr_carlos.jpg',
      address: 'Rua Vergueiro, 1200 - Vila Mariana, São Paulo - SP',
      isUpcoming: false
    }
  ]);

  // Vital Signs Data (Matches Screenshots 1 & 5)
  const [vitals, setVitals] = useState({
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
      unit: 'mmHg',
      status: 'Estável e ideal',
      trend: 'up'
    },
    heartRate: {
      value: 72,
      unit: 'bpm',
      status: 'Ritmo perfeito'
    },
    weight: {
      value: 78.4,
      unit: 'kg',
      target: 75.0
    },
    glucose: {
      value: 92,
      unit: 'mg/dL',
      status: 'Excelente controle'
    },
    history7Days: [
      { day: 'Seg', systolic: 118, diastolic: 78 },
      { day: 'Ter', systolic: 122, diastolic: 82 },
      { day: 'Qua', systolic: 119, diastolic: 79 },
      { day: 'Qui', systolic: 125, diastolic: 84 },
      { day: 'Sex', systolic: 121, diastolic: 80 },
      { day: 'Sáb', systolic: 117, diastolic: 76 },
      { day: 'Dom', systolic: 120, diastolic: 80 }
    ]
  });

  // 1. Subscribe to Real-Time Updates EXCLUSIVELY from Firebase Cloud Firestore
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribe = subscribeToPatientRecord(
      (remoteData) => {
        if (remoteData) {
          isRemoteUpdate.current = true;
          if (remoteData.userProfile) setUserProfile(remoteData.userProfile);
          if (remoteData.medications) setMedications(remoteData.medications);
          if (remoteData.intakeHistory) setIntakeHistory(remoteData.intakeHistory);
          if (remoteData.exams) setExams(remoteData.exams);
          if (remoteData.appointments) setAppointments(remoteData.appointments);
          if (remoteData.vitals) setVitals(remoteData.vitals);
          setSyncStatus('synced');
          setTimeout(() => {
            isRemoteUpdate.current = false;
          }, 300);
        }
      },
      (error) => {
        console.error('[HealthContext] Error in Firestore subscription:', error);
        setSyncStatus('error');
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Persist EXCLUSIVELY to Firebase Cloud Firestore on state modifications
  useEffect(() => {
    if (isFirebaseConfigured && !isRemoteUpdate.current) {
      setSyncStatus('syncing');
      savePatientRecordToFirestore({
        userProfile,
        medications,
        intakeHistory,
        exams,
        appointments,
        vitals
      })
        .then(() => setSyncStatus('synced'))
        .catch(() => setSyncStatus('error'));
    }
  }, [userProfile, medications, intakeHistory, exams, appointments, vitals]);

  // Action Handler: Toggle Medication Taken/Pending
  const toggleMedicationStatus = (id) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const isTaken = med.status === 'taken';
          const newStock = isTaken
            ? med.currentStock + 1
            : Math.max(0, med.currentStock - 1);

          return {
            ...med,
            status: isTaken ? 'pending' : 'taken',
            statusText: isTaken ? 'Pendente' : 'Tomado',
            currentStock: newStock,
            iconBg: isTaken ? '#FEF3C7' : '#E6F5F2',
            iconColor: isTaken ? '#D97706' : '#0D6C5D'
          };
        }
        return med;
      })
    );
  };

  // Action Handler: Refill Medication Stock
  const refillStock = (id, additionalPills) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const updatedStock = med.currentStock + Number(additionalPills);
          return {
            ...med,
            currentStock: updatedStock,
            totalStock: Math.max(med.totalStock, updatedStock)
          };
        }
        return med;
      })
    );
  };

  // Action Handler: Add New Medication
  const addMedication = (newMed) => {
    const dailyCount = newMed.frequency === '2x ao dia' ? 2 : newMed.frequency === '3x ao dia' ? 3 : 1;
    const initialStock = Number(newMed.currentStock) || 30;

    const medObj = {
      id: `med-${Date.now()}`,
      name: newMed.name,
      shortName: newMed.name.split(' ')[0],
      dosage: newMed.dosage,
      frequency: newMed.frequency,
      dailyDoseCount: dailyCount,
      currentStock: initialStock,
      totalStock: initialStock,
      time: newMed.time || '08:00',
      status: 'pending',
      statusText: 'Pendente',
      tagText: `Às ${newMed.time || '08:00'}`,
      nextDose: `Primeira dose: Hoje às ${newMed.time || '08:00'}`,
      category: 'active',
      iconBg: '#FEF3C7',
      iconColor: '#D97706'
    };
    setMedications((prev) => [medObj, ...prev]);
  };

  // Action Handler: Edit Medication
  const updateMedication = (id, updatedFields) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, ...updatedFields } : med))
    );
  };

  // Action Handler: Add New Appointment / Consultation
  const addAppointment = (newApp) => {
    const appObj = {
      id: `app-${Date.now()}`,
      doctor: newApp.doctor.startsWith('Dr.') || newApp.doctor.startsWith('Dra.') ? newApp.doctor : `Dr(a). ${newApp.doctor}`,
      specialty: newApp.specialty || 'Consulta Geral',
      hospital: newApp.hospital || 'Clínica de Atendimento',
      dateText: newApp.dateText || 'Agendado',
      timeText: newApp.timeText || '10:00',
      fullDate: `${newApp.dateText || 'Em breve'}, às ${newApp.timeText || '10:00'}`,
      type: newApp.type || 'Atendimento presencial',
      insurance: newApp.insurance || (userProfile?.healthPlan?.name ? `Convênio ${userProfile.healthPlan.name}` : 'Particular / Convênio'),
      status: 'Agendado',
      avatar: newApp.avatar || '/avatars/dr_carlos.jpg',
      address: newApp.address || newApp.hospital || 'Consulte os detalhes na recepção',
      isUpcoming: true
    };

    setAppointments((prev) => [appObj, ...prev]);
  };

  // Action Handler: Reschedule Appointment
  const rescheduleAppointment = (id, newDate, newTime) => {
    setAppointments((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          return {
            ...app,
            dateText: newDate,
            timeText: newTime,
            fullDate: `${newDate}, às ${newTime}`
          };
        }
        return app;
      })
    );
  };

  // Action Handler: Add Vital Reading
  const addVitalReading = (reading) => {
    setVitals((prev) => {
      const updated = { ...prev };
      if (reading.type === 'bloodPressure') {
        updated.bloodPressure = {
          systolic: reading.systolic,
          diastolic: reading.diastolic,
          unit: 'mmHg',
          status: reading.systolic <= 120 ? 'Estável e ideal' : 'Atenção moderada',
          trend: 'up'
        };
        // Add to 7 day history chart
        updated.history7Days = [
          ...updated.history7Days.slice(1),
          { day: 'Hoje', systolic: Number(reading.systolic), diastolic: Number(reading.diastolic) }
        ];
      } else if (reading.type === 'heartRate') {
        updated.heartRate = {
          value: Number(reading.value),
          unit: 'bpm',
          status: 'Ritmo monitorado'
        };
      } else if (reading.type === 'weight') {
        updated.weight = {
          value: Number(reading.value),
          unit: 'kg',
          target: prev.weight.target
        };
      } else if (reading.type === 'glucose') {
        updated.glucose = {
          value: Number(reading.value),
          unit: 'mg/dL',
          status: 'Excelente controle'
        };
      }
      return updated;
    });
  };

  return (
    <HealthContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        syncStatus,
        isFirebaseConfigured,
        userProfile,
        updateProfile,
        updateProfileAvatar,
        medications,
        intakeHistory,
        logDoseIntake,
        calculateStockPrediction,
        refillStock,
        toggleMedicationStatus,
        addMedication,
        updateMedication,
        exams,
        appointments,
        addAppointment,
        rescheduleAppointment,
        vitals,
        addVitalReading
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
