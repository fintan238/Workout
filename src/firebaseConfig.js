// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVMISO0YT2p24v6hXLH_291I3Nw2eoIK0",
  authDomain: "workoutios-a8428.firebaseapp.com",
  projectId: "workoutios-a8428",
  storageBucket: "workoutios-a8428.appspot.com",
  messagingSenderId: "139389842380",
  appId: "1:139389842380:web:aedec7886f5693915ae369",
  measurementId: "G-MKT3H0Y1CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };