import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import ExerciseModal from './ExerciseModal'; // Assuming you have this component

const WorkoutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Workout</Text>
      <Button title="Start an Empty Workout" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ExerciseModal setModalVisible={setModalVisible} />
        </View>
      </Modal>

      <Text style={styles.heading}>Templates</Text>
      <TouchableOpacity style={styles.templateButton} onPress={() => console.log('+Template button pressed')}>
        <Text style={styles.templateButtonText}>+Template</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  templateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  templateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
});

export default WorkoutScreen;