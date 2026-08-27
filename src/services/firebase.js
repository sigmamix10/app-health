import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
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

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('[Firebase] Cloud Firestore initialized successfully.');
  } catch (error) {
    console.error('[Firebase] Initialization error:', error);
  }
} else {
  console.warn(
    '[Firebase] Missing or placeholder credentials in environment. Application running in local fallback mode.'
  );
}

export { app, db };

// Document reference for default patient health record
const DEFAULT_PATIENT_DOC_ID = 'patient_mateus_ribeiro';
const HEALTH_COLLECTION = 'healthRecords';

/**
 * Subscribe to real-time updates for patient health record in Firestore
 */
export const subscribeToPatientRecord = (onDataChange, onError) => {
  if (!db || !isFirebaseConfigured) return () => {};

  const docRef = doc(db, HEALTH_COLLECTION, DEFAULT_PATIENT_DOC_ID);
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
 * Save / Update patient record in Firestore
 */
export const savePatientRecordToFirestore = async (healthData) => {
  if (!db || !isFirebaseConfigured) return false;

  try {
    const docRef = doc(db, HEALTH_COLLECTION, DEFAULT_PATIENT_DOC_ID);
    await setDoc(docRef, {
      ...healthData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('[Firebase] Error saving record to Firestore:', error);
    throw error;
  }
};
