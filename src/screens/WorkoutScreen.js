import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import CurrentWorkoutModal from './CurrentWorkoutModal';
import global from '../UniversalStyles';
import MyButton from '../components/MyButton';

const WorkoutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={global.container}>
      <Text style={global.heading1}>Start Workout</Text>
      <Text style={global.heading3}>Start Empty Workout</Text>
      <MyButton title="Quick Start" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <CurrentWorkoutModal setModalVisible={setModalVisible} />
        </View>
      </Modal>

      <Text style={global.heading3}>Templates</Text>
      <MyButton title="New Template" onPress={() => console.log('+Template button pressed')} />
    </SafeAreaView>
  );
};

export default WorkoutScreen;