import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase-config';

// Firestore methods
export const addList = async (uid, data) => {
  try {
    const docRef = collection(db, 'twitter_lists', uid, 'lists');
    await addDoc(docRef, data);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateList = async (uid, docID, data) => {
  try {
    const docRef = doc(db, 'twitter_lists', uid, 'lists', docID);
    await updateDoc(docRef, data);
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteList = async (uid, docID) => {
  try {
    const docRef = doc(db, 'twitter_lists', uid, 'lists', docID);
    await deleteDoc(docRef);
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
