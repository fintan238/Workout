import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../../features/auth';
import MyButton from '../../components/MyButton';
import MyInput from '../../components/MyInput';
import { authStyles } from './AuthStyles';

export default function SignUp({ onSignUp, setEmail, setPassword }) {
  const dispatch = useDispatch();
  return (
    <View style={authStyles.screenContainer}>
      <Text style={authStyles.title}>Sign Up</Text>
      <MyInput label="Email" onChangeText={setEmail} />
      <MyInput label="Password" secureTextEntry onChangeText={setPassword} />
      <MyButton title="Sign Up" onPress={onSignUp} />
      <Button
        title="Sign In"
        onPress={() => dispatch(setAuthState('signIn'))}
      />
    </View>
  );
}