import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

console.log('Firebase initialization starting...');
console.log('Current hostname:', window.location.hostname);

// Determine environment
const isDevelopment = window.location.hostname === 'localhost';
console.log('Environment:', isDevelopment ? 'Development' : 'Production');

// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // Only include measurementId in production
  ...(isDevelopment ? {} : { measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID })
};

console.log('Firebase config loaded:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasAuthDomain: !!firebaseConfig.authDomain,
  hasStorageBucket: !!firebaseConfig.storageBucket,
  projectId: firebaseConfig.projectId
});

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized');

// Initialize core services
console.log('Initializing Firebase services...');
export const functions = getFunctions(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
console.log('Core Firebase services initialized');

if (isDevelopment) {
  console.log('Connecting to Firebase emulators...');
  try {
    console.log('Connecting to Functions emulator...');
    connectFunctionsEmulator(functions, 'localhost', 5001);
    
    console.log('Connecting to Firestore emulator...');
    connectFirestoreEmulator(db, 'localhost', 8080);
    
    console.log('Connecting to Auth emulator...');
    connectAuthEmulator(auth, 'http://localhost:9099');
    
    console.log('Connecting to Storage emulator...');
    connectStorageEmulator(storage, 'localhost', 9199);
    
    console.log('Successfully connected to all emulators');
  } catch (error) {
    console.error('Error connecting to emulators:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
}

// Create exports object
const firebaseExports = {
  app,
  db,
  functions,
  auth,
  storage,
  isDevelopment
};

console.log('Firebase initialization complete');

export default firebaseExports;