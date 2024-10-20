import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import { authStyles } from './AuthStyles';
import { useDispatch } from 'react-redux';
import { setAuthState, signIn } from '../../features/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleSignInButton from './GoogleSignIn';
import FacebookSignInButton from './FacebookSignIn';

export default function Login({ onLogin, setEmail, setPassword }) {
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  async function save(value) {
    try {
      await AsyncStorage.setItem('@token', value);
      dispatch(signIn(value));
      console.log('data saved');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={authStyles.screenContainer}>
      <Text style={authStyles.title}>Login</Text>
      <MyInput onChangeText={setEmail} label="Email" />
      <MyInput label="Password" secureTextEntry onChangeText={setPassword} />
      <MyButton title="Login" onPress={onLogin} />
      <Button
        title="Sign Up"
        onPress={() => dispatch(setAuthState('signUp'))}
      />
      <GoogleSignInButton />
      <FacebookSignInButton />
    </View>
  );
}