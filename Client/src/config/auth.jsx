import { auth, db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  firstName,
  lastName
) => {
  try {
    const useCredendial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const { uid } = useCredendial.user;

    await addDoc(collection(db, "users"), {
      email: email,
      firstName: firstName,
      lastName: lastName,
    });
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
