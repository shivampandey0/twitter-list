import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase-config';

// Firestore methods
export const addDataToFirestore = async (uid, data) => {
  try {
    const docRef = collection(db, 'twitter_lists', uid, 'lists');
    await addDoc(docRef, data);
  } catch (e) {
    throw new Error(e);
  }
};
