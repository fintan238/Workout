// workouts.js
import { firestore, auth } from './firebaseConfig';

const workoutsCollection = firestore.collection('workouts');

export const createWorkout = (workout) => {
  const user = auth.currentUser;
  if (user) {
    return workoutsCollection.add({
      ...workout,
      userId: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  throw new Error('User not authenticated');
};

export const getWorkouts = () => {
  const user = auth.currentUser;
  if (user) {
    return workoutsCollection.where('userId', '==', user.uid).get();
  }
  throw new Error('User not authenticated');
};

export const updateWorkout = (workoutId, updatedWorkout) => {
  return workoutsCollection.doc(workoutId).update(updatedWorkout);
};

export const deleteWorkout = (workoutId) => {
  return workoutsCollection.doc(workoutId).delete();
};