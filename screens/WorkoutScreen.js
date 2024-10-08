import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AddExerciseModal from './AddExerciseModal';
import ExerciseModal from './ExerciseModal';
import styles from '../styles';

const WorkoutScreen = () => {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const cancelWorkout = () => {
    // Cancel workout logic
  };

  const renderWorkoutExercise = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      {/* Render input fields and number of sets here */}
    </View>
  );

  const handleAddExercises = () => {
    setWorkoutExercises((prevExercises) => [
      ...prevExercises,
      ...selectedExercises.map((exercise) => ({
        ...exercise,
        inputFields: {}, // Initialize input fields
        numberOfSets: 0, // Initialize number of sets
      })),
    ]);
    setExerciseModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setAddExerciseModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Exercises</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={cancelWorkout}>
        <Text style={styles.cancelButtonText}>Cancel Workout</Text>
      </TouchableOpacity>
      {addExerciseModalVisible && (
        <AddExerciseModal
          setExerciseModalVisible={setAddExerciseModalVisible}
          cancelWorkout={cancelWorkout}
          workoutExercises={workoutExercises}
          renderWorkoutExercise={renderWorkoutExercise}
          styles={styles}
        />
      )}
      {exerciseModalVisible && (
        <ExerciseModal
          exerciseModalVisible={exerciseModalVisible}
          setExerciseModalVisible={setExerciseModalVisible}
          handleAddExercises={handleAddExercises}
          selectedExercises={selectedExercises}
          styles={styles}
        />
      )}
    </View>
  );
};

export default WorkoutScreen;