import { Text, View, Button } from 'react-native';
import { authStyles } from './AuthComponents/AuthStyles';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebaseConfig';
import { signOut as signOutFirebase } from 'firebase/auth';

export default function Profile() {
  const dispatch = useDispatch();
  return (
    <View style={authStyles.screenContainer}>
      <Text style={authStyles.title}>Profile</Text>
      <Button
        title="sign out"
        onPress={async () => {
          signOutFirebase(auth).catch(e => alert(e));
          await AsyncStorage.removeItem('@token');
          dispatch(signOut());
        }}
      />
    </View>
  );
}