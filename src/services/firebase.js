import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';

// Configuration from environment variables with direct project fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBy4rrIaVQcDy0tlyvYve-yIBPyO6Sp4Ag",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "health-app-c907c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "health-app-c907c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "health-app-c907c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "698692339353",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:698692339353:web:790237489467189942da08",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VR74SN0GHP"
};

// Check if valid Firebase configuration is provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'your_project_id' &&
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your_api_key_here'
);

let app = null;
let db = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log('[Firebase] Cloud Firestore & Firebase Auth initialized successfully.');
  } catch (error) {
    console.error('[Firebase] Initialization error:', error);
  }
} else {
  console.warn(
    '[Firebase] Missing or placeholder credentials in environment. Application running in local fallback mode.'
  );
}

export { app, db, auth };

// Document reference for default patient health record
const DEFAULT_PATIENT_DOC_ID = 'patient_guest_local';
const HEALTH_COLLECTION = 'healthRecords';

// ---------------- FIREBASE AUTHENTICATION SERVICES ----------------

/**
 * Register a new user with Email & Password
 */
export const registerUserWithEmail = async (email, password, displayName) => {
  if (!auth || !isFirebaseConfigured) {
    return {
      uid: 'mock_uid_' + Date.now(),
      email,
      displayName: displayName || email.split('@')[0]
    };
  }

  try {
    // 1. Save user credentials (email & password) in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;

    // 2. Update display name in Firebase Auth Profile
    if (displayName && displayName.trim()) {
      await updateFirebaseProfile(user, { displayName: displayName.trim() });
    }

    // 3. Create user account record in Firestore 'users' collection
    if (db) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(
          userDocRef,
          {
            uid: user.uid,
            email: user.email,
            displayName: displayName || user.displayName || email.split('@')[0],
            createdAt: new Date().toISOString(),
            authProvider: 'password'
          },
          { merge: true }
        );
        console.log(`[Firebase Auth & Firestore] User account created: ${user.uid} (${user.email})`);
      } catch (dbErr) {
        console.warn('[Firebase Firestore] Warning saving user doc to users collection:', dbErr);
      }
    }

    return {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.displayName || email.split('@')[0]
    };
  } catch (error) {
    console.error('[Firebase Auth] Error registering user:', error);
    throw error;
  }
};

/**
 * Login existing user with Email & Password
 */
export const loginUserWithEmail = async (email, password) => {
  if (!auth || !isFirebaseConfigured) {
    return {
      uid: 'mock_uid_local',
      email,
      displayName: email.split('@')[0]
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0]
    };
  } catch (error) {
    console.error('[Firebase Auth] Error logging in:', error);
    throw error;
  }
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  if (!auth || !isFirebaseConfigured) return true;

  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('[Firebase Auth] Error logging out:', error);
    throw error;
  }
};

/**
 * Subscribe to Auth State Changes
 */
export const subscribeToAuth = (onUserChanged) => {
  if (!auth || !isFirebaseConfigured) {
    onUserChanged(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => {
    if (user) {
      onUserChanged({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0]
      });
    } else {
      onUserChanged(null);
    }
  });
};

// ---------------- PATIENT HEALTH RECORD FIRESTORE SERVICES ----------------

/**
 * Subscribe to real-time updates for patient health record in Firestore
 */
export const subscribeToPatientRecord = (patientUid, onDataChange, onError) => {
  if (!db || !isFirebaseConfigured) return () => {};

  const targetDocId = patientUid ? `patient_${patientUid}` : DEFAULT_PATIENT_DOC_ID;
  const docRef = doc(db, HEALTH_COLLECTION, targetDocId);
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onDataChange(snapshot.data());
      } else {
        onDataChange(null);
      }
    },
    (error) => {
      console.error('[Firebase] Realtime sync error:', error);
      if (onError) onError(error);
    }
  );
};

/**
 * Helper to sanitize payloads and prevent Firestore undefined field errors
 */
const sanitizeForFirestore = (data) => {
  if (data === undefined) return null;
  return JSON.parse(
    JSON.stringify(data, (key, value) => (value === undefined ? null : value))
  );
};

/**
 * Save / Update patient record in Firestore
 */
export const savePatientRecordToFirestore = async (patientUid, healthData) => {
  if (!db || !isFirebaseConfigured) return false;

  try {
    const targetDocId = patientUid ? `patient_${patientUid}` : DEFAULT_PATIENT_DOC_ID;
    const docRef = doc(db, HEALTH_COLLECTION, targetDocId);
    const cleanPayload = sanitizeForFirestore(healthData);

    await setDoc(
      docRef,
      {
        ...cleanPayload,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
    console.log(`[Firebase] Record successfully saved to Firestore: ${targetDocId}`);
    return true;
  } catch (error) {
    console.error('[Firebase] Error saving record to Firestore:', error);
    throw error;
  }
};

// ---------------- FAMILY GROUPS FIRESTORE SERVICES ----------------
const FAMILY_COLLECTION = 'familyGroups';

/**
 * Generate a unique 6-digit numeric code
 */
export const generate6DigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Create a new Family Group in Cloud Firestore with a 6-digit code
 */
export const createFamilyGroupInFirestore = async (familyName, creatorName, currentHealthData) => {
  const creatorClean = creatorName || 'Paciente';
  if (!db || !isFirebaseConfigured) {
    const mockCode = generate6DigitCode();
    return {
      code: mockCode,
      familyName: familyName || 'Grupo Familiar',
      members: [{ name: creatorClean, role: 'Criador' }],
      membersHealthData: { [creatorClean]: currentHealthData || {} }
    };
  }

  try {
    const code = generate6DigitCode();
    const docRef = doc(db, FAMILY_COLLECTION, code);
    const cleanHealth = sanitizeForFirestore(currentHealthData || {});

    const groupData = {
      code,
      familyName: familyName || 'Grupo Familiar',
      createdAt: new Date().toISOString(),
      creatorName: creatorClean,
      members: [
        {
          name: creatorClean,
          role: 'Criador / Administrador',
          joinedAt: new Date().toISOString()
        }
      ],
      healthRecords: cleanHealth,
      membersHealthData: {
        [creatorClean]: cleanHealth
      }
    };

    await setDoc(docRef, groupData);
    console.log(`[Firebase] Family Group created with 6-digit code: ${code}`);
    return groupData;
  } catch (error) {
    console.error('[Firebase] Error creating family group:', error);
    throw error;
  }
};

/**
 * Join an existing Family Group using the 6-digit code
 */
export const joinFamilyGroupInFirestore = async (sixDigitCode, memberName) => {
  const codeClean = String(sixDigitCode).trim();
  if (!db || !isFirebaseConfigured) {
    return {
      code: codeClean,
      familyName: 'Família Conectada',
      members: [{ name: memberName || 'Membro', role: 'Membro' }]
    };
  }

  try {
    const docRef = doc(db, FAMILY_COLLECTION, codeClean);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      throw new Error('Código de 6 dígitos não encontrado. Verifique com o administrador da família.');
    }

    const data = snap.data();
    const existingMembers = data.members || [];
    const newMemberName = memberName.trim() || 'Membro da Família';

    const isAlreadyMember = existingMembers.some(
      (m) => m.name.toLowerCase() === newMemberName.toLowerCase()
    );

    let updatedMembers = existingMembers;
    if (!isAlreadyMember) {
      updatedMembers = [
        ...existingMembers,
        { name: newMemberName, role: 'Membro', joinedAt: new Date().toISOString() }
      ];
      await setDoc(docRef, { members: updatedMembers }, { merge: true });
    }

    return {
      ...data,
      members: updatedMembers
    };
  } catch (error) {
    console.error('[Firebase] Error joining family group:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time updates of a Family Group
 */
export const subscribeToFamilyGroupDoc = (sixDigitCode, onDataChange, onError) => {
  if (!db || !isFirebaseConfigured || !sixDigitCode) return () => {};

  const docRef = doc(db, FAMILY_COLLECTION, String(sixDigitCode).trim());
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onDataChange(snapshot.data());
      } else {
        onDataChange(null);
      }
    },
    (error) => {
      console.error('[Firebase] Family group subscription error:', error);
      if (onError) onError(error);
    }
  );
};

/**
 * Save / Update health data for a specific member inside a Family Group
 */
export const saveFamilyGroupHealthData = async (sixDigitCode, memberName, healthData) => {
  if (!db || !isFirebaseConfigured || !sixDigitCode) return false;

  try {
    const docRef = doc(db, FAMILY_COLLECTION, String(sixDigitCode).trim());
    const cleanPayload = sanitizeForFirestore(healthData);
    const memberKey = memberName || 'Paciente';

    await setDoc(
      docRef,
      {
        healthRecords: cleanPayload,
        [`membersHealthData.${memberKey}`]: cleanPayload,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error('[Firebase] Error updating family group health data:', error);
    throw error;
  }
};

