import { auth } from "../config/firebase";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const useCredendial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const { uid } = useCredendial.user;

    return useCredendial;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};
