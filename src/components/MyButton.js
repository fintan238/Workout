import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colours from '../Colours';

export default function MyButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    color: 'white',
    backgroundColor: Colours.primary
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
});