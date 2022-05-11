import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase-config";

export const registerUser = async ({
  email,
  password,
  firstname,
  lastname,
}) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName: firstname + " " + lastname,
    });
  } catch (error) {
    throw Error(error);
  }
};

export const signinUser = async ({ email, password }) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw Error(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw Error(error);
  }
};
