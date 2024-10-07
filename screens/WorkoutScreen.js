import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Modal, TextInput, FlatList, CheckBox } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { FontAwesome } from '@expo/vector-icons';
import { bodyParts, categories, exercises } from '../exercises';
import styles from '../styles';

export default function WorkoutScreen() {
  const [templates, setTemplates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTemplate, setNewTemplate] = useState('');
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [bodyPart, setBodyPart] = useState('Any Body Part');
  const [category, setCategory] = useState('Any Category');
  const [searchQuery, setSearchQuery] = useState('');
  const [bodyPartDropdownVisible, setBodyPartDropdownVisible] = useState(false);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);

  const renderItem = (item, index) => (
    <View key={index} style={styles.carouselItem}>
      <Text>{item}</Text>
    </View>
  );

  const addTemplate = () => {
    setTemplates([...templates, newTemplate]);
    setNewTemplate('');
    setModalVisible(false);
  };

  const startWorkout = () => {
    const currentHour = new Date().getHours();
    let period = 'Morning';
    if (currentHour >= 12 && currentHour < 18) {
      period = 'Afternoon';
    } else if (currentHour >= 18 && currentHour < 21) {
      period = 'Evening';
    } else if (currentHour >= 21 || currentHour < 6) {
      period = 'Night';
    }
    setWorkoutTitle(`${period} Workout`);
    setWorkoutModalVisible(true);
    setTimer(0);
    const id = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    setIntervalId(id);
  };

  const finishWorkout = () => {
    clearInterval(intervalId);
    setWorkoutModalVisible(false);
  };

  const cancelWorkout = () => {
    clearInterval(intervalId);
    setWorkoutModalVisible(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const renderExerciseItem = ({ item }) => {
    const isSelected = selectedExercises.includes(item.name);
    return (
      <TouchableOpacity
        style={[styles.exerciseItem, isSelected && styles.selectedExerciseItem]}
        onPress={() => {
          if (isSelected) {
            setSelectedExercises(selectedExercises.filter(name => name !== item.name));
          } else {
            setSelectedExercises([...selectedExercises, item.name]);
          }
        }}
      >
        <Text>{item.name}</Text>
        {isSelected && <FontAwesome name="check" size={24} color="white" />}
      </TouchableOpacity>
    );
  };

  const filteredExercises = exercises.filter(exercise =>
    (bodyPart === 'Any Body Part' || exercise.bodyPart === bodyPart) &&
    (category === 'Any Category' || exercise.category === category) &&
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddExercises = () => {
    const exercisesWithSets = selectedExercises.map(name => ({
      name,
      sets: [{ set: 1, previous: '', kg: '', reps: '', completed: false }],
    }));
    setWorkoutExercises(exercisesWithSets);
    setExerciseModalVisible(false);
  };

  const addSet = (exerciseName) => {
    setWorkoutExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.name === exerciseName
          ? {
              ...exercise,
              sets: [
                ...exercise.sets,
                { set: exercise.sets.length + 1, previous: '', kg: '', reps: '', completed: false },
              ],
            }
          : exercise
      )
    );
  };

  const renderWorkoutExercise = ({ item }) => (
    <View style={styles.workoutExerciseContainer}>
      <Text style={styles.workoutExerciseName}>{item.name}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Set</Text>
        <Text style={styles.tableHeaderText}>Previous</Text>
        <Text style={styles.tableHeaderText}>kg</Text>
        <Text style={styles.tableHeaderText}>Reps</Text>
        <FontAwesome name="check" size={24} color="black" />
      </View>
      {item.sets.map((set, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableRowText}>{set.set}</Text>
          <Text style={styles.tableRowText}>{set.previous}</Text>
          <TextInput
            style={styles.tableInput}
            keyboardType="numeric"
            value={set.kg}
            onChangeText={(text) =>
              setWorkoutExercises(prevExercises =>
                prevExercises.map(exercise =>
                  exercise.name === item.name
                    ? {
                        ...exercise,
                        sets: exercise.sets.map((s, i) =>
                          i === index ? { ...s, kg: text } : s
                        ),
                      }
                    : exercise
                )
              )
            }
          />
          <TextInput
            style={styles.tableInput}
            keyboardType="numeric"
            value={set.reps}
            onChangeText={(text) =>
              setWorkoutExercises(prevExercises =>
                prevExercises.map(exercise =>
                  exercise.name === item.name
                    ? {
                        ...exercise,
                        sets: exercise.sets.map((s, i) =>
                          i === index ? { ...s, reps: text } : s
                        ),
                      }
                    : exercise
                )
              )
            }
          />
          <CheckBox
            value={set.completed}
            onValueChange={(newValue) =>
              setWorkoutExercises(prevExercises =>
                prevExercises.map(exercise =>
                  exercise.name === item.name
                    ? {
                        ...exercise,
                        sets: exercise.sets.map((s, i) =>
                          i === index ? { ...s, completed: newValue } : s
                        ),
                      }
                    : exercise
                )
              )
            }
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.addSetButton}
        onPress={() => addSet(item.name)}
      >
        <Text style={styles.addSetButtonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Start a new workout" onPress={startWorkout} />
      <Text style={styles.sectionTitle}>Templates</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add New Template</Text>
      </TouchableOpacity>
      <Swiper>
        {templates.map((item, index) => renderItem(item, index))}
      </Swiper>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Enter template name"
            value={newTemplate}
            onChangeText={setNewTemplate}
          />
          <Button title="Save Template" onPress={addTemplate} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={workoutModalVisible}
        onRequestClose={() => {
          setWorkoutModalVisible(!workoutModalVisible);
        }}
      >
        <View style={styles.workoutModalView}>
          <View style={styles.workoutModalHeader}>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="clock-o" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.workoutTitle}
              value={workoutTitle}
              onChangeText={setWorkoutTitle}
            />
            <TouchableOpacity style={styles.finishButton} onPress={finishWorkout}>
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setExerciseModalVisible(true)}>
            <Text style={styles.addButtonText}>Add Exercises</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelWorkout}>
            <Text style={styles.cancelButtonText}>Cancel Workout</Text>
          </TouchableOpacity>
          <FlatList
            data={workoutExercises}
            renderItem={renderWorkoutExercise}
            keyExtractor={(item) => item.name}
          />
        </View>
      </Modal>
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
          <TextInput
            style={styles.searchBar}
            placeholder="Search exercises"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton} onPress={() => setBodyPartDropdownVisible(!bodyPartDropdownVisible)}>
            <Text>{bodyPart}</Text>
          </TouchableOpacity>
          {bodyPartDropdownVisible && (
            <View style={styles.dropdown}>
              {bodyParts.map((part, index) => (
                <TouchableOpacity key={index} onPress={() => { setBodyPart(part); setBodyPartDropdownVisible(false); }}>
                  <Text style={styles.dropdownItem}>{part}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.filterButton} onPress={() => setCategoryDropdownVisible(!categoryDropdownVisible)}>
            <Text>{category}</Text>
          </TouchableOpacity>
          {categoryDropdownVisible && (
            <View style={styles.dropdown}>
              {categories.map((cat, index) => (
                <TouchableOpacity key={index} onPress={() => { setCategory(cat); setCategoryDropdownVisible(false); }}>
                  <Text style={styles.dropdownItem}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {filteredExercises.length > 0 ? (
            <FlatList
              data={filteredExercises}
              renderItem={renderExerciseItem}
              keyExtractor={(item) => item.name}
            />
          ) : (
            <Text>{`${searchQuery} not found`}</Text>
          )}
        </View>
      </Modal>
    </View>
  );
}