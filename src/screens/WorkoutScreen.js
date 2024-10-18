import React, { useState } from 'react';
import { View, Text, SafeAreaView, Modal } from 'react-native';
import CurrentWorkoutModal from './CurrentWorkoutModal';
import NewTemplateModal from './NewTemplateModal';
import global from '../GlobalStyles';
import MyButton from '../components/MyButton';

const WorkoutScreen = () => {
  const [currentWorkoutModalVisible, setCurrentWorkoutModalVisible] = useState(false);
  const [newTemplateModalVisible, setNewTemplateModalVisible] = useState(false);

  return (
    <SafeAreaView style={global.container}>
      <Text style={global.heading1}>Start Workout</Text>
      <Text style={global.heading3}>Start Empty Workout</Text>
      <MyButton title="Quick Start" onPress={() => setCurrentWorkoutModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={currentWorkoutModalVisible}
        onRequestClose={() => setCurrentWorkoutModalVisible(false)}
      >
        <View>
          <CurrentWorkoutModal setModalVisible={setCurrentWorkoutModalVisible} />
        </View>
      </Modal>

      <Text style={global.heading3}>Templates</Text>
      <MyButton title="New Template" onPress={() => setNewTemplateModalVisible(true)} />

      {/* Directly include NewTemplateModal here */}
      <NewTemplateModal
        visible={newTemplateModalVisible}
        setModalVisible={setNewTemplateModalVisible}
      />
    </SafeAreaView>
  );
};

export default WorkoutScreen;
