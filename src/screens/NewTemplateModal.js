import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MyButton from '../components/MyButton';
import AddExerciseModal from './AddExerciseModal';
import Feather from '@expo/vector-icons/Feather';
import global from '../GlobalStyles';
import { saveTemplateToDatabase } from '../utils/db';

const NewTemplateModal = ({ visible, setModalVisible, userId }) => {
  const [templateName, setTemplateName] = useState('');
  const [notes, setNotes] = useState('');
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleAddExercises = (exercises) => {
    const exercisesWithSets = exercises.map(exercise => ({
      ...exercise,
      sets: [{ setNumber: 1, previous: '', kg: '', reps: '', checked: false }]
    }));
    setSelectedExercises((prevExercises) => [...prevExercises, ...exercisesWithSets]);
    setExerciseModalVisible(false);
  };

  const renderSelectedExercise = ({ item }) => (
    <View style={styles.selectedExerciseContainer}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Feather name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeader, styles.setColumn]}>Set</Text>
          <Text style={[styles.tableHeader, styles.previousColumn]}>Previous</Text>
          <Text style={[styles.tableHeader, styles.kgColumn]}>kg</Text>
          <Text style={[styles.tableHeader, styles.repsColumn]}>Reps</Text>
          <Text style={[styles.tableHeader, styles.checkboxColumn]}>
            <AntDesign name="lock" size={18} color="black" />
          </Text>
        </View>
        {item.sets.map((set, index) => (
          <View key={index} style={styles.tableRow}>
            <TouchableOpacity style={[styles.setButton, styles.setColumn]}>
              <Text style={styles.tableCell}>{set.setNumber}</Text>
            </TouchableOpacity>
            <Text style={[styles.tableCell, styles.previousColumn]}>{set.previous}</Text>
            <TextInput
              style={[styles.tableInput, styles.kgColumn]}
              keyboardType="numeric"
              value={set.kg}
              onChangeText={(value) => handleSetChange(item.name, index, 'kg', value)}
            />
            <TextInput
              style={[styles.tableInput, styles.repsColumn]}
              keyboardType="numeric"
              value={set.reps}
              onChangeText={(value) => handleSetChange(item.name, index, 'reps', value)}
            />
            <TouchableOpacity
              style={[
                styles.checkboxButton,
                styles.checkboxColumn,
                set.checked && styles.checkboxButtonChecked
              ]}
            >
              <Text style={[styles.tickSymbol, set.checked && styles.tickSymbolChecked]}>-</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addSetButton} onPress={() => handleAddSet(item.name)}>
        <Text style={styles.addSetButtonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );

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

  const handleSaveTemplate = async () => {
    const templateData = {
      name: templateName,
      notes: notes,
      exercises: selectedExercises.map(exercise => ({
        name: exercise.name,
        sets: exercise.sets.map(set => ({
          setNumber: set.setNumber,
          kg: set.kg,
          reps: set.reps,
        })),
      })),
    };

    try {
      await saveTemplateToDatabase(userId, templateData);
      alert('Template saved successfully!');
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template. Please try again.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.clockIcon}>
            <AntDesign name="clockcircleo" size={24} color="black" />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveTemplate}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TextInput
            style={global.heading1}
            placeholder="New Template"
            value={templateName}
            onChangeText={setTemplateName}/>
          <TextInput
            style={styles.notesInput}
            placeholder="Notes"
            placeholderTextColor="gray"
            paddingHorizontal={10}
            value={notes}
            onChangeText={setNotes}
            multiline={true}
          />
          <FlatList
            data={selectedExercises}
            renderItem={renderSelectedExercise}
            keyExtractor={(item) => item.name}
          />
          <MyButton title={"Add Exercises"} onPress={() => setExerciseModalVisible(true)}></MyButton>
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
      </SafeAreaView>
    </Modal>
  );
};

export default NewTemplateModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
  },
  clockIcon: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
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
    paddingHorizontal: 10,
    color: 'black',
  },
  notesInput: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'red',
  },
  selectedExerciseContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
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
    textAlign: 'center',
  },
  tableCell: {
    textAlign: 'center',
  },
  tableInput: {
    textAlign: 'center',
    borderBottomWidth: 0, // Remove underline
    backgroundColor: '#f0f0f0', // Light grey background
    marginHorizontal: 5, // Slight separation between input fields
    paddingVertical: 5,
    borderRadius: 5,
  },
  setButton: {
    textAlign: 'center',
    backgroundColor: '#e0e0e0', // Slight grey background
    paddingVertical: 5,
    borderRadius: 5,
  },
  checkboxButton: {
    backgroundColor: '#e0e0e0', // Slight grey background
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 27, // Match the height of the numerical input fields
  },
  checkboxButtonChecked: {
    backgroundColor: '#89CFF0', // Light blue background when checked
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
  setColumn: {
    flex: 0.5, // Thinner column
  },
  previousColumn: {
    flex: 2, // Wider column
  },
  kgColumn: {
    flex: 1, // Slightly thinner column
  },
  repsColumn: {
    flex: 1, // Slightly thinner column
  },
  checkboxColumn: {
    flex: 0.5, // Thinner column
  },
});


