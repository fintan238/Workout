import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function saveUserToDatabase(user) {
  const userDocRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    await setDoc(userDocRef, {
      name: user.displayName,
      email: user.email,
      templates: []
    });
  }
  console.log('Saving user to database');
}

export async function getUserFromDatabase(user) {
  const userRef = doc(db, 'users', user.uid); // Use uid for the document reference
  const docSnap = await getDoc(userRef); // Fetch the document

  if (docSnap.exists()) {
    console.log('User already exists in database:', docSnap.data());
    return docSnap.data(); // Return user data if it exists
  } else {
    console.log('No such user!');
    // Optionally, you could return null or handle the case where user data doesn't exist
    return null;
  }
}