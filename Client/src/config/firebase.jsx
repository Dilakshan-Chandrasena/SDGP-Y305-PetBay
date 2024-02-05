// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtxrgz7k4G7wThBKy6EQ-WCescAqOl01w",
  authDomain: "sdgp-y3-05-petbay.firebaseapp.com",
  projectId: "sdgp-y3-05-petbay",
  storageBucket: "sdgp-y3-05-petbay.appspot.com",
  messagingSenderId: "68269331856",
  appId: "1:68269331856:web:fa7bfd964f05087fc64f15",
  measurementId: "G-V4ZWEZNXRQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
