// // firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDaP8eVXAbi8VUU9lNcM_wMCVTclUk0RgM",
//   authDomain: "workout-c6426.firebaseapp.com",
//   projectId: "workout-c6426",
//   storageBucket: "workout-c6426.appspot.com",
//   messagingSenderId: "942864602626",
//   appId: "1:942864602626:web:4ace3186b484ac26acf91b",
//   measurementId: "G-GBQMZ76HXM"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { app, auth, db };

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
