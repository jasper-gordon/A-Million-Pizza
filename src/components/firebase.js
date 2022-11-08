import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';



const firebaseApp = initializeApp({
  apiKey: "AIzaSyAZ6APOp4lYomED_kQgn8GkJrxmeBEQjzw",
  authDomain: "test-project-c1b83.firebaseapp.com",
  projectId: "test-project-c1b83",
  storageBucket: "test-project-c1b83.appspot.com",
  messagingSenderId: "361939684364",
  appId: "1:361939684364:web:b3be27523287841b4a3229",
  measurementId: "G-114SVZ5PZX"
});

export const functions = getFunctions(firebaseApp);

export default firebaseApp;