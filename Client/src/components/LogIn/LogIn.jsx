// LogIn.js
import React, { useState, useEffect } from "react";
import styles from "../../assets/css/auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../config/auth";
import { useAuth } from "../../contexts/authContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function LogIn() {
  //Change the background color when mounting and unmounting the login page
  useEffect(() => {
    document.body.classList.add("auth-background");
    return () => {
      document.body.classList.remove("auth-background"); // Clean up when component unmounts
    };
  }, []);

  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Sign in with email and password function
  const signIn = async () => {
    if (email !== "" && password !== "") {
      try {
        setIsSigningIn(true);
        const authResult = await doSignInWithEmailAndPassword(email, password);
        setIsSigningIn(false);
        navigate("/home");
      } catch (error) {
        setIsSigningIn(false);
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/invalid-credential"
        ) {
          setErrorMessage("Invalid email or password. Please try again.");
          console.error(error.code);
        } else {
          console.error("Authentication Error:", error);
          console.error(error.code);
          setErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    } else {
      setErrorMessage("Fields cannot be empty!");
    }
  };

  //Check if the user is available or not
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

  //Sign in with Google function
  const signInGoogle = async () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const authResult = await doSignInWithGoogle();
        const userEmail = authResult.user.email;
        const userExists = await checkUserExistsInCollection(userEmail);
        const userId = authResult.user.uid;
        if (userExists) {
          window.sessionStorage.setItem("userId", userId);
          navigate("/home");
        } else {
          navigate("/getuserdetails", { state: { userId, email: userEmail } });
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
            <FontAwesomeIcon icon={faPaw} /> Login
          </h1>
        </div>

        <div className={styles.inputBox}>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formLink}>
          <a href="#">Forgot password?</a>
        </div>
        <div className={styles.button}>
          <button className={styles.signInButton} onClick={signIn}>
            Login
          </button>
        </div>

        <div className={styles.formLink}>
          <span>Don't have an account?</span>
          <Link to="/SignUp"> Signup</Link>
        </div>
        <div className={styles.line}></div>
        <button className={styles.googleButton} onClick={signInGoogle}>
          <span className={styles.googleSpan}>
            <span className={styles.googleIcon}>
              <FontAwesomeIcon icon={faGoogle} />
            </span>{" "}
            Login with Google
          </span>
        </button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <br />
      </div>
    </div>
  );
}
