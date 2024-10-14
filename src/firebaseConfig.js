import { initializeApp, getApps } from 'firebase/app'; // Import getApps
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Adjust imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVMISO0YT2p24v6hXLH_291I3Nw2eoIK0",
  authDomain: "workoutios-a8428.firebaseapp.com",
  projectId: "workoutios-a8428",
  storageBucket: "workoutios-a8428.appspot.com",
  messagingSenderId: "139389842380",
  appId: "1:139389842380:web:aedec7886f5693915ae369",
  measurementId: "G-MKT3H0Y1CW"
};

// Initialize Firebase if it hasn't been initialized already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Initialize Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Use AsyncStorage for persistence
});

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
