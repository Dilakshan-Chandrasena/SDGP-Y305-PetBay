import React, { useState } from "react";
import styles from "../assets/css/auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../config/auth";

import { useAuth } from "../contexts/authContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function SignUp() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async () => {
    if (email !== "" && password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        alert("Password do not match");
      } else {
        try {
          const authResult = await doCreateUserWithEmailAndPassword(
            email,
            password
          );
          const userId = authResult.user.uid;
          const userEmail = authResult.user.email;
          navigate("/GetUserDetails", { state: { userId, email: userEmail } });
        } catch (error) {
          if (error.code === "auth/invalid-email") {
            setErrorMessage("Invalid email or password. Please try again.");
          } else if (error.code === "auth/weak-password") {
            setErrorMessage("Password should be at least 6 characters");
          }
        }
      }
    } else {
      setErrorMessage("Fields cannot be empty!");
    }
  };

  const checkUserExistsInCollection = async (email) => {
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  const signIngoogle = async () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const authResult = await doSignInWithGoogle();
        const userEmail = authResult.user.email;
        const userExists = await checkUserExistsInCollection(userEmail);
        if (userExists) {
          navigate("/HomePage");
        } else {
          const userId = authResult.user.uid;
          navigate("/GetUserDetails", { state: { userId, email: userEmail } });
        }
      } catch (error) {
        setIsSigningIn(false);
        console.error("Error signing in with Google:", error);
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>
            <FontAwesomeIcon icon={faPaw} /> Sign Up
          </h1>
        </div>

        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className={styles.button}>
          <button className={styles.signInButton} onClick={signUp}>
            Sign Up
          </button>
        </div>

        <div className={styles.formLink}>
          <span>Already have an account?</span>
          <Link to="/LogIn"> Login</Link>
        </div>
        <div className={styles.line}></div>
        <button className={styles.googleButton} onClick={signIngoogle}>
          <span className={styles.googleSpan}>
            <span className={styles.googleIcon}>
              <FontAwesomeIcon icon={faGoogle} />
            </span>{" "}
            Sign up with Google
          </span>
        </button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <br />
      </div>
    </div>
  );
}
