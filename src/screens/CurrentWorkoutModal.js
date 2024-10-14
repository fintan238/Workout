import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AddExerciseModal from './AddExerciseModal';

const CurrentWorkoutModal = ({ setModalVisible }) => {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);

  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Morning';
    if (hours < 18) return 'Afternoon';
    if (hours < 21) return 'Evening';
    return 'Night';
  };

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
          <Text style={[styles.tableHeader, styles.setColumn]}>Set</Text>
          <Text style={[styles.tableHeader, styles.previousColumn]}>Previous</Text>
          <Text style={[styles.tableHeader, styles.kgColumn]}>kg</Text>
          <Text style={[styles.tableHeader, styles.repsColumn]}>Reps</Text>
          <Text style={[styles.tableHeader, styles.checkboxColumn]}>✓</Text>
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
              onPress={() => handleCheckboxChange(item.name, index)}
            >
              <Text style={[styles.tickSymbol, set.checked && styles.tickSymbolChecked]}>✓</Text>
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

  const handleCheckboxChange = (exerciseName, setIndex) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const updatedSets = exercise.sets.map((set, index) => {
            if (index === setIndex) {
              return { ...set, checked: !set.checked };
            }
            return set;
          });
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      })
    );
  };

  return (
    <SafeAreaView>
      <Text>Current Workout Modal</Text>
      <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.cancelButtonText}>Cancel Workout</Text>
      </TouchableOpacity>
      {/* <AntDesign name="clockcircleo" size={24} color="black" style={styles.clockIcon}/>
      <TouchableOpacity style={styles.finishButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity> */}
      {/* <View style={styles.container}>
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
      </View> */}
    </SafeAreaView>
  );
}

export default CurrentWorkoutModal;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   width: "100%",
  //   backgroundColor: 'yellow',
  //   padding: 20,
  // },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 20,
  // },
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
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // timer: {
  //   fontSize: 18,
  //   color: 'gray',
  //   marginBottom: 20,
  // },
  // notesInput: {
  //   width: '100%',
  //   marginBottom: 20,
  //   color: 'black',
  // },
  // selectedExerciseContainer: {
  //   backgroundColor: 'white',
  //   padding: 10,
  //   marginVertical: 5,
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   borderColor: 'lightgray',
  // },
  // exerciseHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  // exerciseName: {
  //   color: 'blue',
  //   fontWeight: 'bold',
  //   fontSize: 16,
  // },
  // moreButton: {
  //   padding: 5,
  // },
  // table: {
  //   width: '100%',
  // },
  // tableRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 5,
  // },
  // tableHeader: {
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // tableCell: {
  //   textAlign: 'center',
  // },
  // tableInput: {
  //   textAlign: 'center',
  //   borderBottomWidth: 0, // Remove underline
  //   backgroundColor: '#f0f0f0', // Light grey background
  //   marginHorizontal: 5, // Slight separation between input fields
  //   paddingVertical: 5,
  //   borderRadius: 5,
  // },
  // setButton: {
  //   textAlign: 'center',
  //   backgroundColor: '#e0e0e0', // Slight grey background
  //   paddingVertical: 5,
  //   borderRadius: 5,
  // },
  // checkboxButton: {
  //   backgroundColor: '#e0e0e0', // Slight grey background
  //   borderRadius: 5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 27, // Match the height of the numerical input fields
  // },
  // checkboxButtonChecked: {
  //   backgroundColor: '#89CFF0', // Light blue background when checked
  // },
  // tickSymbol: {
  //   color: 'grey', // Default tick color
  //   fontWeight: 'bold',
  // },
  // tickSymbolChecked: {
  //   color: 'white', // Tick color when checked
  // },
  // addSetButton: {
  //   backgroundColor: 'gray',
  //   padding: 10,
  //   borderRadius: 5,
  //   marginTop: 10,
  //   alignItems: 'center',
  //   width: '100%',
  // },
  // addSetButtonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
  // addButton: {
  //   backgroundColor: '#89CFF0', // Lighter blue background
  //   padding: 10,
  //   borderRadius: 5,
  //   marginVertical: 10,
  //   alignItems: 'center',
  // },
  // cancelButton: {
  //   backgroundColor: '#ff6666', // Slightly more red color
  //   padding: 10,
  //   borderRadius: 5,
  //   marginVertical: 10,
  //   alignItems: 'center',
  // },
  // addButtonText: {
  //   color: '#003366', // Dark blue text
  //   fontWeight: 'bold',
  //   textTransform: 'capitalize',
  // },
  // cancelButtonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textTransform: 'capitalize',
  // },
  // setColumn: {
  //   flex: 0.5, // Thinner column
  // },
  // previousColumn: {
  //   flex: 2, // Wider column
  // },
  // kgColumn: {
  //   flex: 1, // Slightly thinner column
  // },
  // repsColumn: {
  //   flex: 1, // Slightly thinner column
  // },
  // checkboxColumn: {
  //   flex: 0.5, // Thinner column
  // },
});


