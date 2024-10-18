import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAVMISO0YT2p24v6hXLH_291I3Nw2eoIK0",
  authDomain: "workoutios-a8428.firebaseapp.com",
  projectId: "workoutios-a8428",
  storageBucket: "workoutios-a8428.appspot.com",
  messagingSenderId: "139389842380",
  appId: "1:139389842380:web:aedec7886f5693915ae369",
  measurementId: "G-MKT3H0Y1CW"
};

let app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, db, googleProvider, facebookProvider };
