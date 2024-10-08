import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ExerciseModal = ({ exerciseModalVisible, setExerciseModalVisible, handleAddExercises, selectedExercises, styles }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={exerciseModalVisible}
      onRequestClose={() => {
        setExerciseModalVisible(!exerciseModalVisible);
      }}
    >
      <View style={styles.exerciseModalView}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setExerciseModalVisible(false)}>
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddExercises}
            disabled={selectedExercises.length === 0}
            style={[styles.addButton, selectedExercises.length === 0 && styles.disabledButton]}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseModal;