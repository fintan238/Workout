import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Carousel from 'react-native-reanimated-carousel';

const { width: viewportWidth } = Dimensions.get('window'); // Get viewport width

const MyCarousel = ({ userId }) => {
  const [templates, setTemplates] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

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
      <Text style={styles.templateName}>{item.name}</Text>
      <Text style={styles.templateNotes}>{item.notes}</Text>
      {item.exercises && item.exercises.length > 0 ? (
        item.exercises.map((exercise, index) => (
          <Text key={index} style={styles.exerciseText}>
            {exercise['name']}
          </Text>
        ))
      ) : (
        <Text>No exercises found.</Text>
      )}
    </View>
  );

  return (
    <View>
      <Carousel
        data={templates}
        renderItem={renderTemplateItem}
        width={viewportWidth * 0.8} // Adjust the width to leave space on the sides
        height={200} // Adjust the height based on your design
        onSnapToItem={(index) => setActiveSlide(index)}
        loop={false} // Optional: Disable infinite scrolling
        style={{ flexGrow: 0 }} // Optional: prevent stretching
      />
      <View style={styles.paginationContainer}>
        {templates.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeSlide ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  templateBox: {
    backgroundColor: '#f0f0f0',
    width: "100%", // Ensure the item takes full width of the carousel item
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  templateName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  templateNotes: {
    fontSize: 16,
    color: '#666',
  },
  exerciseText: {
    fontSize: 14,
    color: '#333',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  inactiveDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default MyCarousel;