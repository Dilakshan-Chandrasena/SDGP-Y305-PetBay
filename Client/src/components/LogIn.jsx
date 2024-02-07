import React, { useState } from "react";
import styles from "./auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../config/auth";
import { useAuth } from "../contexts/authContext";

export default function LogIn() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async () => {
    if (email !== "" && password !== "") {
      try {
        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password);
        setIsSigningIn(false);
        navigate("/HomePage");
      } catch (error) {
        setIsSigningIn(false);
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/invalid-credential"
        ) {
          setErrorMessage("Invalid email or password. Please try again.");
          console.error(error.code);
        } else {
          // Handle other authentication errors
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

  const signIngoogle = async () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      {userLoggedIn ? <Navigate to="/HomePage" /> : null}
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
        <button className={styles.googleButton} onClick={signIngoogle}>
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
