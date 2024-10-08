import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// import CheckBox from 'expo-checkbox';
import AddExerciseModal from './AddExerciseModal'; // Ensure this is the correct path

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
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const handleAddExercises = (exercises) => {
    const exercisesWithSets = exercises.map(exercise => ({
      ...exercise,
      sets: [{ setNumber: 1, previous: '', kg: '', reps: '', checked: false }]
    }));
    setSelectedExercises((prevExercises) => [...prevExercises, ...exercisesWithSets]);
    setExerciseModalVisible(false);
  };

  const handleAddSet = (exerciseName) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const newSetNumber = exercise.sets.length + 1;
          return {
            ...exercise,
            sets: [...exercise.sets, { setNumber: newSetNumber, previous: '', kg: '', reps: '', checked: false }]
          };
        }
        return exercise;
      })
    );
  };

  const handleSetChange = (exerciseName, setIndex, field, value) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const updatedSets = exercise.sets.map((set, index) => {
            if (index === setIndex) {
              return { ...set, [field]: value };
            }
            return set;
          });
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      })
    );
  };

  const renderSelectedExercise = ({ item }) => (
    <View style={styles.selectedExerciseContainer}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <FontAwesome name="ellipsis-h" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Set</Text>
          <Text style={styles.tableHeader}>Previous</Text>
          <Text style={styles.tableHeader}>kg</Text>
          <Text style={styles.tableHeader}>Reps</Text>
          <Text style={styles.tableHeader}>✓</Text>
        </View>
        {item.sets.map((set, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{set.setNumber}</Text>
            <Text style={styles.tableCell}>{set.previous}</Text>
            <TextInput
              style={styles.tableInput}
              keyboardType="numeric"
              value={set.kg}
              onChangeText={(value) => handleSetChange(item.name, index, 'kg', value)}
            />
            <TextInput
              style={styles.tableInput}
              keyboardType="numeric"
              value={set.reps}
              onChangeText={(value) => handleSetChange(item.name, index, 'reps', value)}
            />
            {/* <CheckBox value={set.checked} /> */}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addSetButton} onPress={() => handleAddSet(item.name)}>
        <Text style={styles.addSetButtonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );

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
        multiline={true}
      />
      <FlatList
        data={selectedExercises}
        renderItem={renderSelectedExercise}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setExerciseModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Exercises</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.cancelButtonText}>Cancel Workout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={exerciseModalVisible}
        onRequestClose={() => setExerciseModalVisible(false)}
      >
        <AddExerciseModal
          setExerciseModalVisible={setExerciseModalVisible}
          onAddExercises={handleAddExercises}
        />
      </Modal>
    </View>
  );
};

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    padding: 20,
    paddingTop: 50
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
    width: '100%',
    marginBottom: 20,
    color: 'black',
  },
  selectedExerciseContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseName: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
  moreButton: {
    padding: 5,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableInput: {
    flex: 1,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  addSetButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  addSetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#89CFF0', // Lighter blue background
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff6666', // Slightly more red color
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#003366', // Dark blue text
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default ExerciseModal;