import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCCbgHdJAY2FGlTt5wLYEDnzepMGH3Lqg",
  authDomain: "where-s-vader.firebaseapp.com",
  projectId: "where-s-vader",
  storageBucket: "where-s-vader.appspot.com",
  messagingSenderId: "124150587001",
  appId: "1:124150587001:web:3ceb9bf505c72f4fb1fea8",
  measurementId: "G-1ZLHMH3B63",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
