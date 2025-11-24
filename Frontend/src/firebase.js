// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwq_juYJqg6puLNWSn2h-pB-25ynI0eNM",
  authDomain: "global-health-pulse-7106a.firebaseapp.com",
  projectId: "global-health-pulse-7106a",
  storageBucket: "global-health-pulse-7106a.firebasestorage.app",
  messagingSenderId: "637423310908",
  appId: "1:637423310908:web:8c4306f72f98c54cca4b39",
  measurementId: "G-HTGXJ3Y5W0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;