import { ActivityIndicator, Text, View } from 'react-native';
import { authStyles } from './AuthComponents/AuthStyles';

export default function Splash() {
  return (
    <View style={authStyles.screenContainer}>
      <Text style={authStyles.title}>Welcome</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}