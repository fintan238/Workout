import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Modal, TextInput } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { FontAwesome } from '@expo/vector-icons';

export default function WorkoutScreen() {
  const [templates, setTemplates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTemplate, setNewTemplate] = useState('');
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

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

  return (
    <View style={styles.container}>
      <Button title="Start a new workout" onPress={startWorkout} />
      <Text style={styles.sectionTitle}>Templates</Text>
      <Swiper>
        {templates.map((item, index) => renderItem(item, index))}
      </Swiper>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add New Template</Text>
      </TouchableOpacity>
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
          <TouchableOpacity style={styles.addButton} onPress={() => {}}>
            <Text style={styles.addButtonText}>Add Exercises</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelWorkout}>
            <Text style={styles.cancelButtonText}>Cancel Workout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  carouselItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 150,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  workoutModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set background color to white
  },
  workoutModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
  },
  workoutTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  finishButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'black', // Change color to black for better visibility on white background
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});