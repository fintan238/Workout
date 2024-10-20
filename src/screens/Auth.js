import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthState, signIn } from '../features/auth';
import Login from './AuthComponents/Login'
import SignUp from './AuthComponents/SignUp';
import { auth } from '../firebaseConfig';
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { Alert } from 'react-native';
import { validateEmail, validatePassword } from '../utils/validation';
import { saveUserToDatabase, getUserFromDatabase } from '../utils/db';

export default function AuthScreen() {
  const dispatch = useDispatch();
  const { authState } = useSelector(state => state.auth);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onLogin = () => {
    const errorEmail = validateEmail(email);
    const errorPassword = validatePassword(password);
    if (errorEmail || errorPassword) {
      Alert.alert(errorEmail, errorPassword);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await getUserFromDatabase(user);
          const token = await user.getIdToken();
          dispatch(signIn(token));
          dispatch(setAuthState('signedIn'));
        })
        .catch(err => Alert.alert('Login error', err.message));
    }
  };

  const onSignUp = () => {
    const errorEmail = validateEmail(email);
    const errorPassword = validatePassword(password);
    if (errorEmail || errorPassword) {
      Alert.alert(errorEmail, errorPassword);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          alert('Signup success');
          await saveUserToDatabase(user);
          const token = await user.getIdToken();
          dispatch(signIn(token));
          dispatch(setAuthState('signedIn'));
        })
        .catch(err => Alert.alert('Signup error', err.message));
    }
  };

  const onSignOut = () => {
    signOut(auth).catch(err => console.log(err));
  };

  return (
    <>
      {authState === 'signIn' && (
        <Login
          onLogin={onLogin}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
      {authState === 'signUp' && (
        <SignUp
          onSignUp={onSignUp}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
    </>
  );
}