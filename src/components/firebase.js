import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {getAuth} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAZ6APOp4lYomED_kQgn8GkJrxmeBEQjzw",
  authDomain: "test-project-c1b83.firebaseapp.com",
  projectId: "test-project-c1b83",
  storageBucket: "test-project-c1b83.appspot.com",
  messagingSenderId: "361939684364",
  appId: "1:361939684364:web:b3be27523287841b4a3229",
  measurementId: "G-114SVZ5PZX"
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
const auth = getAuth(app);


export default {app, db, analytics, functions, auth};