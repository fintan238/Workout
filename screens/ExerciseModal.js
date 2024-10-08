import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AddExerciseModal from './AddExerciseModal'; // Assuming you have this component

const getTimeOfDay = () => {
  const hours = new Date().getHours();
  if (hours < 12) return 'Morning';
  if (hours < 18) return 'Afternoon';
  if (hours < 21) return 'Evening';
  return 'Night';
};

const ExerciseModal = ({ setModalVisible }) => {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.clockIcon}>
          <FontAwesome name="clock-o" size={24} color="black" />
        </View>
        <TouchableOpacity style={styles.finishButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{getTimeOfDay()} Workout</Text>
      <Text style={styles.timer}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
      <TextInput
        style={styles.notesInput}
        placeholder="notes"
        placeholderTextColor="gray"
        value={notes}
        onChangeText={setNotes}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setExerciseModalVisible(true)}>
        <Text style={styles.addButtonText}>Add exercises</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.cancelButtonText}>Cancel workout</Text>
      </TouchableOpacity>

      {exerciseModalVisible && (
        <AddExerciseModal
          setExerciseModalVisible={setExerciseModalVisible}
          onAddExercises={(selectedExercises) => {
            // Handle adding exercises
            setExerciseModalVisible(false);
          }}
          styles={styles}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  clockIcon: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  finishButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  finishButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timer: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  notesInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'black',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#ffcccc', // Light red color
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    textTransform: 'lowercase',
  },
  cancelButtonText: {
    color: 'white',
    textTransform: 'lowercase',
  },
});

export default ExerciseModal;