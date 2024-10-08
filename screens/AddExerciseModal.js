import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { bodyParts, categories, exercises } from '../exercises';

const AddExerciseModal = ({ setExerciseModalVisible, styles, onAddExercises }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('Any Body Part');
  const [selectedCategory, setSelectedCategory] = useState('Any Category');
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleExerciseSelect = (exercise) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exercise)) {
        return prevSelected.filter((item) => item !== exercise);
      } else {
        return [...prevSelected, exercise];
      }
    });
  };

  const submitSelectedExercises = () => {
    if (onAddExercises) {
      onAddExercises(selectedExercises);
    }
    setExerciseModalVisible(false);
  };

  const renderWorkoutExercise = ({ item }) => {
    const isSelected = selectedExercises.includes(item);
    return (
      <TouchableOpacity
        onPress={() => handleExerciseSelect(item)}
        style={{
          backgroundColor: isSelected ? 'lightblue' : 'white',
          padding: 10,
          marginVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text>{item.name}</Text>
        {isSelected && <FontAwesome name="check" size={24} color="black" />}
      </TouchableOpacity>
    );
  };

  const filteredExercises = exercises
    .filter(exercise =>
      (selectedBodyPart === 'Any Body Part' || exercise.bodyPart === selectedBodyPart) &&
      (selectedCategory === 'Any Category' || exercise.category === selectedCategory) &&
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 30);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setExerciseModalVisible(false);
      }}
    >
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setExerciseModalVisible(false)}>
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={submitSelectedExercises}
            disabled={selectedExercises.length === 0}
            style={[styles.addButton, selectedExercises.length === 0 && styles.disabledButton]}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          ListHeaderComponent={
            <View>
              <TextInput
                style={styles.searchBar}
                placeholder="Search exercises"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <View style={styles.filterButtonsContainer}>
                <Picker
                  selectedValue={selectedBodyPart}
                  style={styles.filterButton}
                  onValueChange={(itemValue) => setSelectedBodyPart(itemValue)}
                >
                  <Picker.Item label="Any Body Part" value="Any Body Part" />
                  <Picker.Item label="Core" value="Core" />
                  <Picker.Item label="Arms" value="Arms" />
                  <Picker.Item label="Back" value="Back" />
                  <Picker.Item label="Chest" value="Chest" />
                  <Picker.Item label="Legs" value="Legs" />
                  <Picker.Item label="Shoulders" value="Shoulders" />
                  <Picker.Item label="Other" value="Other" />
                  <Picker.Item label="Full Body" value="Full Body" />
                  <Picker.Item label="Cardio" value="Cardio" />
                </Picker>
                <Picker
                  selectedValue={selectedCategory}
                  style={styles.filterButton}
                  onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                  <Picker.Item label="Any Category" value="Any Category" />
                  <Picker.Item label="Barbell" value="Barbell" />
                  <Picker.Item label="Dumbbell" value="Dumbbell" />
                  <Picker.Item label="Machine" value="Machine" />
                  <Picker.Item label="Weighted Bodyweight" value="Weighted Bodyweight" />
                  <Picker.Item label="Assisted Bodyweight" value="Assisted Bodyweight" />
                  <Picker.Item label="Cardio" value="Cardio" />
                  <Picker.Item label="Duration" value="Duration" />
                </Picker>
              </View>
            </View>
          }
          data={filteredExercises}
          renderItem={renderWorkoutExercise}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Modal>
  );
};

export default AddExerciseModal;