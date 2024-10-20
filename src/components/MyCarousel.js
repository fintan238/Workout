import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Carousel from 'react-native-reanimated-carousel'; // Updated import

const MyCarousel = ({ userId }) => {
  const [templates, setTemplates] = useState([]);
  const { width: viewportWidth } = Dimensions.get('window'); // Get viewport width

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
    </View>
  );

  return (
    <Carousel
      data={templates}
      renderItem={renderTemplateItem}
      width={viewportWidth} // Specify the width
      height={300} // You can adjust this value for item height
      loop={false} // Optional: Disable infinite scrolling
      style={{ flexGrow: 0 }} // Optional: prevent stretching
    />
  );
};

const styles = StyleSheet.create({
  templateBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  templateName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  templateNotes: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MyCarousel;
