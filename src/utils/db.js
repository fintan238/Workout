import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const saveUserToDatabase = async (userId, email) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      email: email,
      "user-id": userId
    });
    console.log("User saved successfully");
  } catch (error) {
    console.error("Error saving user: ", error);
  }
};

export const saveTemplateToDatabase  = async (userId, templateData) => {
  try {
    const templateRef = doc(collection(db, "users", userId, "templates"));
    await setDoc(templateRef, {
      templateId: templateRef.id,
      ...templateData,
    });
    console.log("Template stored successfully");
  } catch (error) {
    console.error("Error storing template: ", error);
  }
};

export const addPerformedExercise = async (userId, exerciseData) => {
  try {
    const performedRef = collection(db, "users", userId, "performed");
    await addDoc(performedRef, {
      exerciseName: exerciseData.exerciseName,
      sets: exerciseData.sets,
      reps: exerciseData.reps,
      weight: exerciseData.weight,
      performedAt: new Date() // Timestamp of when the exercise was performed
    });
    console.log("Performed exercise added successfully");
  } catch (error) {
    console.error("Error adding performed exercise: ", error);
  }
};

export const saveWorkoutToHistory = async (userId, workoutData) => {
  try {
    const historyRef = collection(db, "users", userId, "history");
    await addDoc(historyRef, {
      workoutName: workoutData.workoutName,
      exerciseOrder: workoutData.exerciseOrder, // Array of exercise names in the order they were performed
      duration: workoutData.duration, // Time it took to complete the workout
      performedAt: new Date() // Timestamp of when the workout was performed
    });
    console.log("Workout history saved successfully");
  } catch (error) {
    console.error("Error saving workout to history: ", error);
  }
};
