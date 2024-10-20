import React, { useState } from 'react';
import { View, Text, SafeAreaView, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import CurrentWorkoutModal from './CurrentWorkoutModal';
import NewTemplateModal from './NewTemplateModal';
import global from '../GlobalStyles';
import MyButton from '../components/MyButton';
import { selectUser } from '../features/user';

const WorkoutScreen = () => {
  const user = useSelector(selectUser);
  const userId = user?.uid;
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

      {userId && ( // Conditionally render the modal if userId exists
        <NewTemplateModal
          visible={newTemplateModalVisible}
          setModalVisible={setNewTemplateModalVisible}
          userId={userId}
        />
      )}
    </SafeAreaView>
  );
};

export default WorkoutScreen;
