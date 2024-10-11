import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from './src/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login Successful!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Text>{message}</Text>
    </View>
  );
};

export default App;
