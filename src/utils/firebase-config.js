import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2E7WO_SFA2y0WijVv09Q1R7yUCwd9MlQ",
  authDomain: "neogprojects.firebaseapp.com",
  projectId: "neogprojects",
  storageBucket: "neogprojects.appspot.com",
  messagingSenderId: "590419674868",
  appId: "1:590419674868:web:9f5c46f270dee2907f00a1",
  measurementId: "G-HWC5ZDRPCE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
