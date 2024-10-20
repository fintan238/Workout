import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Colours from '../../Colours';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width: viewportWidth } = Dimensions.get('window'); // Get viewport width

const UserTemplates = ({ userId }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templateRef = collection(db, 'users', userId, 'templates');
        const snapshot = await getDocs(templateRef);
        const fetchedTemplates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTemplates(fetchedTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    if (userId) {
      fetchTemplates();
    }
  }, [userId]);

  const renderTemplateItem = ({ item }) => (
    <View style={styles.templateBox}>
      <Text style={styles.templateTitle}>{item.name}</Text>
      {item.notes ? <Text style={styles.templateNotes}>{item.notes}</Text> : null}
      {item.exercises ? (
        <Text style={styles.templateExercises} numberOfLines={2} ellipsizeMode="tail">
          {item.exercises.map(exercise => exercise.name).join(', ')}
        </Text>
      ) : null}
      <AntDesign style={styles.clock} name="clockcircle"/>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={templates}
        renderItem={renderTemplateItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  row: {
    justifyContent: 'space-between',
  },
  templateBox: {
    backgroundColor: Colours.light,
    borderColor: Colours.primary,
    borderWidth: 1,
    width: (viewportWidth / 2) - 25,
    height: 120,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  templateNotes: {
    color: Colours.gray,
  },
  templateExercises: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 5,
  },
  clock: {
    fontSize: 14,
    color: Colours.gray,
    position: 'absolute',
    bottom: 10,
    left: 10
  },
});

export default UserTemplates;