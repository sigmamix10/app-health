import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  isFirebaseConfigured,
  subscribeToPatientRecord,
  savePatientRecordToFirestore,
  createFamilyGroupInFirestore,
  joinFamilyGroupInFirestore,
  subscribeToFamilyGroupDoc,
  saveFamilyGroupHealthData,
  registerUserWithEmail,
  loginUserWithEmail,
  logoutUser,
  subscribeToAuth
} from '../services/firebase';

const HealthContext = createContext();

export const THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Verde Esmeralda',
    primary: '#0D6C5D',
    primaryDark: '#095448',
    primaryLight: '#E6F5F2',
    primaryHover: '#0B5D50'
  },
  ocean: {
    id: 'ocean',
    name: 'Azul Oceano',
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    primaryLight: '#EFF6FF',
    primaryHover: '#1E40AF'
  },
  violet: {
    id: 'violet',
    name: 'Violeta Elegante',
    primary: '#7C3AED',
    primaryDark: '#6D28D9',
    primaryLight: '#F5F3FF',
    primaryHover: '#5B21B6'
  },
  berry: {
    id: 'berry',
    name: 'Rosa Amora',
    primary: '#DB2777',
    primaryDark: '#BE185D',
    primaryLight: '#FDF2F8',
    primaryHover: '#9D174D'
  },
  terracotta: {
    id: 'terracotta',
    name: 'Laranja Terracota',
    primary: '#EA580C',
    primaryDark: '#C2410C',
    primaryLight: '#FFF7ED',
    primaryHover: '#9A3412'
  },
  dark: {
    id: 'dark',
    name: 'Modo Escuro',
    primary: '#38BDF8',
    primaryDark: '#0284C7',
    primaryLight: '#0F172A',
    primaryHover: '#0369A1'
  }
};

export const applyTheme = (themeId) => {
  const t = THEMES[themeId] || THEMES.emerald;
  const root = document.documentElement;
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--primary-dark', t.primaryDark);
  root.style.setProperty('--primary-light', t.primaryLight);
  root.style.setProperty('--primary-hover', t.primaryHover);

  if (themeId === 'dark') {
    document.body.classList.add('high-contrast');
  } else {
    document.body.classList.remove('high-contrast');
  }

  try {
    localStorage.setItem('app_health_theme', themeId);
  } catch (e) {}
};

export const HealthProvider = ({ children }) => {
  // Active Tab: 'landing' (Inicial) | 'home' | 'medications' | 'exams' | 'consultations' | 'profile' | 'vitals'
  const [activeTab, setActiveTab] = useState('landing');
  // View Mode: 'responsive' (Desktop/Notebook/Tablet/Mobile Fluid) | 'phoneFrame' (Figma Mobile Bezel)
  const [viewMode, setViewMode] = useState('responsive');

  // Firebase Auth State
  const [authUser, setAuthUser] = useState(null);

  // Theme & Accessibility (a11y) States
  const [themeColor, setThemeColor] = useState(() => {
    try {
      return localStorage.getItem('app_health_theme') || 'emerald';
    } catch (e) {
      return 'emerald';
    }
  });

  useEffect(() => {
    applyTheme(themeColor);
  }, [themeColor]);

  const changeThemeColor = (newTheme) => {
    setThemeColor(newTheme);
    applyTheme(newTheme);
  };

  const [fontScale, setFontScale] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [highContrast, setHighContrast] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply Accessibility (a11y) CSS classes to document.body
  useEffect(() => {
    const body = document.body;
    body.classList.remove('font-scale-large', 'font-scale-xlarge');
    if (fontScale === 'large') body.classList.add('font-scale-large');
    if (fontScale === 'xlarge') body.classList.add('font-scale-xlarge');

    if (highContrast) {
      body.classList.add('high-contrast');
    } else if (themeColor !== 'dark') {
      body.classList.remove('high-contrast');
    }
  }, [fontScale, highContrast, themeColor]);

  const speakText = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.92;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Family Group State (6-digit code persistence & Multi-Member Selection)
  const [familyGroupCode, setFamilyGroupCode] = useState(null);
  const [familyGroup, setFamilyGroup] = useState(null);
  const [activeMemberName, setActiveMemberName] = useState(null);
  const [familyMembersHealthData, setFamilyMembersHealthData] = useState({});

  // Cloud Sync Status: 'synced' | 'syncing' | 'error' | 'disconnected'
  const [syncStatus, setSyncStatus] = useState(isFirebaseConfigured ? 'synced' : 'disconnected');
  const isRemoteUpdate = useRef(false);

  // User Patient Data (Initialized clean, no pre-registered demo data)
  const [userProfile, setUserProfile] = useState({
    name: 'Novo Paciente',
    age: 'Não informado',
    location: 'Brasil',
    greeting: 'Bem-vindo ao seu acompanhamento de saúde!',
    avatar: 'https://api.dicebear.com/10.x/voxel-art/svg?seed=Paciente',
    bloodType: '--',
    height: '--',
    weight: '--',
    allergiesAndConditions: [],
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    healthPlan: {
      name: 'Sem plano cadastrado',
      planType: '',
      number: ''
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

  // Daily Intake History Log
  const [intakeHistory, setIntakeHistory] = useState([]);

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

  // Medications Data (Initialized empty)
  const [medications, setMedications] = useState([]);

  // Exams Data (Initialized empty)
  const [exams, setExams] = useState([]);

  // Appointments / Consultations Data (Initialized empty)
  const [appointments, setAppointments] = useState([]);

  // Vital Signs Data (Initialized empty)
  const [vitals, setVitals] = useState({
    bloodPressure: {
      systolic: '--',
      diastolic: '--',
      unit: 'mmHg',
      status: 'Sem medição'
    },
    heartRate: {
      value: '--',
      unit: 'bpm',
      status: 'Sem medição'
    },
    weight: {
      value: '--',
      unit: 'kg',
      target: '--'
    },
    glucose: {
      value: '--',
      unit: 'mg/dL',
      status: 'Sem medição'
    },
    history7Days: []
  });

  // 0. Subscribe to Firebase Auth Changes
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribe = subscribeToAuth((user) => {
      setAuthUser(user);
      if (user) {
        if (user.displayName) {
          setUserProfile((prev) => ({
            ...prev,
            name: user.displayName
          }));
        }
        setActiveTab('home');
      } else {
        setActiveTab('landing');
      }
    });

    return () => unsubscribe();
  }, []);

  // 1. Subscribe to Real-Time Updates from Firebase Cloud Firestore (Individual or Family Group)
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    let unsubscribe = () => {};

    if (familyGroupCode) {
      // Subscribe to Family Group Document
      unsubscribe = subscribeToFamilyGroupDoc(
        familyGroupCode,
        (groupData) => {
          if (groupData) {
            isRemoteUpdate.current = true;
            setFamilyGroup({
              code: groupData.code,
              familyName: groupData.familyName,
              members: groupData.members || []
            });

            const membersMap = groupData.membersHealthData || {};
            setFamilyMembersHealthData(membersMap);

            const currentMemberKey = activeMemberName || groupData.creatorName || (groupData.members && groupData.members[0]?.name) || userProfile.name;
            if (!activeMemberName) {
              setActiveMemberName(currentMemberKey);
            }

            const targetRecords = membersMap[currentMemberKey] || groupData.healthRecords || {};
            if (targetRecords.userProfile) setUserProfile(targetRecords.userProfile);
            if (targetRecords.medications) setMedications(targetRecords.medications);
            if (targetRecords.intakeHistory) setIntakeHistory(targetRecords.intakeHistory);
            if (targetRecords.exams) setExams(targetRecords.exams);
            if (targetRecords.appointments) setAppointments(targetRecords.appointments);
            if (targetRecords.vitals) setVitals(targetRecords.vitals);

            setSyncStatus('synced');
            setTimeout(() => {
              isRemoteUpdate.current = false;
            }, 300);
          }
        },
        (error) => {
          console.error('[HealthContext] Family group sync error:', error);
          setSyncStatus('error');
        }
      );
    } else if (authUser?.uid) {
      // Subscribe to Individual Patient Document (Using Auth UID if logged in)
      unsubscribe = subscribeToPatientRecord(
        authUser.uid,
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
          } else {
            // New user without remote data yet -> Initialize clean record
            isRemoteUpdate.current = true;
            const newProfile = {
              name: authUser.displayName || 'Novo Paciente',
              age: 'Não informado',
              location: 'Brasil',
              greeting: 'Bem-vindo ao seu acompanhamento de saúde!',
              avatar: `https://api.dicebear.com/10.x/voxel-art/svg?seed=${encodeURIComponent(authUser.displayName || authUser.email)}`,
              bloodType: '--',
              height: '--',
              weight: '--',
              allergiesAndConditions: [],
              emergencyContact: { name: '', relation: '', phone: '' },
              healthPlan: { name: 'Sem plano cadastrado', planType: '', number: '' }
            };
            setUserProfile(newProfile);
            setMedications([]);
            setIntakeHistory([]);
            setExams([]);
            setAppointments([]);
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
    }

    return () => unsubscribe();
  }, [familyGroupCode, authUser]);

  // Handle active member switching in Family Group
  useEffect(() => {
    if (familyGroupCode && activeMemberName && familyMembersHealthData[activeMemberName]) {
      const records = familyMembersHealthData[activeMemberName];
      isRemoteUpdate.current = true;
      if (records.userProfile) setUserProfile(records.userProfile);
      if (records.medications) setMedications(records.medications);
      if (records.intakeHistory) setIntakeHistory(records.intakeHistory);
      if (records.exams) setExams(records.exams);
      if (records.appointments) setAppointments(records.appointments);
      if (records.vitals) setVitals(records.vitals);
      setTimeout(() => {
        isRemoteUpdate.current = false;
      }, 300);
    }
  }, [activeMemberName, familyGroupCode]);

  // 2. Persist to Firebase Cloud Firestore on state modifications (Family Group or Individual UID)
  useEffect(() => {
    if (isFirebaseConfigured && !isRemoteUpdate.current) {
      // ONLY persist to Cloud Firestore if user is authenticated OR in a family group
      if (!authUser && !familyGroupCode) {
        setSyncStatus('disconnected');
        return;
      }

      setSyncStatus('syncing');

      const healthPayload = {
        userProfile,
        medications,
        intakeHistory,
        exams,
        appointments,
        vitals
      };

      if (familyGroupCode) {
        const targetMemberName = activeMemberName || userProfile.name;
        saveFamilyGroupHealthData(familyGroupCode, targetMemberName, healthPayload)
          .then(() => setSyncStatus('synced'))
          .catch(() => setSyncStatus('error'));
      } else if (authUser?.uid) {
        savePatientRecordToFirestore(authUser.uid, healthPayload)
          .then(() => setSyncStatus('synced'))
          .catch(() => setSyncStatus('error'));
      }
    }
  }, [userProfile, medications, intakeHistory, exams, appointments, vitals, familyGroupCode, authUser, activeMemberName]);

  // Auth Handlers
  const registerPatient = async (email, password, fullName) => {
    try {
      const user = await registerUserWithEmail(email, password, fullName);
      setAuthUser(user);

      const cleanProfile = {
        name: fullName || 'Novo Paciente',
        age: 'Não informado',
        location: 'Brasil',
        greeting: 'Bem-vindo(a) ao seu acompanhamento de saúde!',
        avatar: `https://api.dicebear.com/10.x/voxel-art/svg?seed=${encodeURIComponent(fullName || email)}`,
        bloodType: '--',
        height: '--',
        weight: '--',
        allergiesAndConditions: [],
        emergencyContact: { name: '', relation: '', phone: '' },
        healthPlan: { name: 'Sem plano cadastrado', planType: '', number: '' }
      };

      setUserProfile(cleanProfile);
      setMedications([]);
      setIntakeHistory([]);
      setExams([]);
      setAppointments([]);
      setVitals({
        bloodPressure: { systolic: '--', diastolic: '--', unit: 'mmHg', status: 'Sem medição' },
        heartRate: { value: '--', unit: 'bpm', status: 'Sem medição' },
        weight: { value: '--', unit: 'kg', target: '--' },
        glucose: { value: '--', unit: 'mg/dL', status: 'Sem medição' },
        history7Days: []
      });

      setActiveTab('home');
      return user;
    } catch (error) {
      console.error('Error registering patient:', error);
      throw error;
    }
  };

  const loginPatient = async (email, password) => {
    try {
      const user = await loginUserWithEmail(email, password);
      setAuthUser(user);
      if (user.displayName) {
        setUserProfile((prev) => ({ ...prev, name: user.displayName }));
      }
      setActiveTab('home');
      return user;
    } catch (error) {
      console.error('Error logging in patient:', error);
      throw error;
    }
  };

  const logoutPatient = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
    } catch (error) {
      console.error('Error logging out patient:', error);
    }
  };

  // Family Group Action Handlers
  const createFamilyGroup = async (familyName, creatorName) => {
    try {
      const currentHealthPayload = {
        userProfile,
        medications,
        intakeHistory,
        exams,
        appointments,
        vitals
      };

      const result = await createFamilyGroupInFirestore(familyName, creatorName, currentHealthPayload);
      setFamilyGroupCode(result.code);
      setFamilyGroup(result);
      try {
        localStorage.setItem('app_health_family_code', result.code);
      } catch (e) {}
      return result;
    } catch (error) {
      console.error('Error creating family group:', error);
      throw error;
    }
  };

  const joinFamilyGroup = async (sixDigitCode, memberName) => {
    try {
      const result = await joinFamilyGroupInFirestore(sixDigitCode, memberName);
      setFamilyGroupCode(result.code);
      setFamilyGroup(result);
      try {
        localStorage.setItem('app_health_family_code', result.code);
      } catch (e) {}
      return result;
    } catch (error) {
      console.error('Error joining family group:', error);
      throw error;
    }
  };

  const leaveFamilyGroup = () => {
    setFamilyGroupCode(null);
    setFamilyGroup(null);
    try {
      localStorage.removeItem('app_health_family_code');
    } catch (e) {}
  };

  const addFamilyMemberProfile = (memberName, memberRole = 'Dependente / Familiar') => {
    const cleanName = memberName?.trim();
    if (!cleanName) return;

    const newMemberObj = {
      name: cleanName,
      role: memberRole,
      joinedAt: new Date().toISOString()
    };

    setFamilyGroup((prev) => {
      if (!prev) {
        return {
          code: familyGroupCode || 'local',
          familyName: 'Grupo Familiar',
          members: [
            { name: userProfile.name, role: 'Criador' },
            newMemberObj
          ]
        };
      }
      const existingMembers = prev.members || [];
      if (existingMembers.some((m) => m.name.toLowerCase() === cleanName.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        members: [...existingMembers, newMemberObj]
      };
    });

    const defaultMemberRecords = {
      userProfile: {
        name: cleanName,
        age: 'Não informado',
        location: 'Brasil',
        greeting: `Acompanhamento de saúde de ${cleanName}`,
        avatar: `https://api.dicebear.com/10.x/voxel-art/svg?seed=${encodeURIComponent(cleanName)}`,
        bloodType: '--',
        height: '--',
        weight: '--',
        allergiesAndConditions: [],
        emergencyContact: { name: '', relation: '', phone: '' },
        healthPlan: { name: 'Sem plano cadastrado', planType: '', number: '' }
      },
      medications: [],
      intakeHistory: [],
      exams: [],
      appointments: [],
      vitals: {
        bloodPressure: { systolic: '--', diastolic: '--', unit: 'mmHg', status: 'Sem medição' },
        heartRate: { value: '--', unit: 'bpm', status: 'Sem medição' },
        weight: { value: '--', unit: 'kg', target: '--' },
        glucose: { value: '--', unit: 'mg/dL', status: 'Sem medição' },
        history7Days: []
      }
    };

    setFamilyMembersHealthData((prev) => ({
      ...prev,
      [cleanName]: defaultMemberRecords
    }));

    setActiveMemberName(cleanName);
  };


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
    let dailyCount = 1;

    if (newMed.frequencyType === 'specific_days' && Array.isArray(newMed.selectedDays)) {
      dailyCount = Number((newMed.selectedDays.length / 7).toFixed(2));
    } else if (newMed.frequencyType === 'alternate_days') {
      if (newMed.frequency.includes('A cada 3 dias')) dailyCount = 0.33;
      else if (newMed.frequency.includes('A cada 4 dias')) dailyCount = 0.25;
      else if (newMed.frequency.includes('Semanalmente')) dailyCount = 0.14;
      else if (newMed.frequency.includes('15 dias')) dailyCount = 0.07;
      else dailyCount = 0.5; // Dia sim, dia não (48h)
    } else if (newMed.frequencyType === 'as_needed') {
      dailyCount = 0.1;
    } else {
      if (newMed.frequency.includes('2x')) dailyCount = 2;
      else if (newMed.frequency.includes('3x')) dailyCount = 3;
      else dailyCount = 1;
    }

    const initialStock = Number(newMed.currentStock) || 30;

    const medObj = {
      id: `med-${Date.now()}`,
      name: newMed.name,
      shortName: newMed.name.split(' ')[0],
      dosage: newMed.dosage,
      frequency: newMed.frequency,
      frequencyType: newMed.frequencyType || 'daily',
      selectedDays: newMed.selectedDays || [],
      dailyDoseCount: dailyCount,
      currentStock: initialStock,
      totalStock: initialStock,
      time: newMed.time || '08:00',
      status: 'pending',
      statusText: 'Pendente',
      tagText: `Às ${newMed.time || '08:00'}`,
      nextDose: `Agendado às ${newMed.time || '08:00'}`,
      category: 'active',
      iconBg: newMed.frequencyType === 'specific_days' ? '#E0F2FE' : '#FEF3C7',
      iconColor: newMed.frequencyType === 'specific_days' ? '#0284C7' : '#D97706'
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
    const doctorNameClean = newApp.doctor.trim();
    const appObj = {
      id: `app-${Date.now()}`,
      doctor: doctorNameClean.startsWith('Dr.') || doctorNameClean.startsWith('Dra.') ? doctorNameClean : `Dr(a). ${doctorNameClean}`,
      specialty: newApp.specialty || 'Consulta Geral',
      hospital: newApp.hospital || 'Clínica de Atendimento',
      dateText: newApp.dateText || 'Agendado',
      timeText: newApp.timeText || '10:00',
      fullDate: `${newApp.dateText || 'Em breve'}, às ${newApp.timeText || '10:00'}`,
      type: newApp.type || 'Atendimento presencial',
      insurance: newApp.insurance || (userProfile?.healthPlan?.name ? `Convênio ${userProfile.healthPlan.name}` : 'Particular / Convênio'),
      status: 'Agendado',
      avatar: newApp.avatar || `https://api.dicebear.com/10.x/voxel-art/svg?seed=${encodeURIComponent(doctorNameClean)}`,
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

  // Action Handler: Add New Exam / Record Exam Date
  const addExam = (newExam) => {
    const examObj = {
      id: `exam-${Date.now()}`,
      title: newExam.title,
      lab: newExam.lab || 'Laboratório / Hospital',
      status: newExam.status || 'Agendado',
      date: newExam.date,
      summary: newExam.summary || 'Registro de exame cadastrado pelo paciente.',
      preparationInstructions: newExam.preparationInstructions
        ? newExam.preparationInstructions.split('\n').filter(Boolean)
        : null,
      type: newExam.type || 'lab',
      pdfFile: newExam.pdfFile || null
    };

    setExams((prev) => [examObj, ...prev]);
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
        authUser,
        registerPatient,
        loginPatient,
        logoutPatient,
        themeColor,
        changeThemeColor,
        fontScale,
        setFontScale,
        highContrast,
        setHighContrast,
        isSpeaking,
        speakText,
        stopSpeech,
        familyGroupCode,
        familyGroup,
        activeMemberName,
        setActiveMemberName,
        familyMembersHealthData,
        addFamilyMemberProfile,
        createFamilyGroup,
        joinFamilyGroup,
        leaveFamilyGroup,
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
        addExam,
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
