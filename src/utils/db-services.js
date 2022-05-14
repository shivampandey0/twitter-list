import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
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

export const addUserInList = async (uid, id, data) => {
  try {
    const colRef = collection(
      db,
      'twitter_lists',
      uid,
      'lists',
      id,
      'twitter_users'
    );
    await addDoc(colRef, data);
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteUserInList = async (uid, id, docId) => {
  try {
    const docRef = doc(
      db,
      'twitter_lists',
      uid,
      'lists',
      id,
      'twitter_users',
      docId
    );
    await deleteDoc(docRef);
  } catch (e) {
    throw new Error(e);
  }
};
