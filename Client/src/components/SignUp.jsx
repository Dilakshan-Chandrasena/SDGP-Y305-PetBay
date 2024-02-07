import React, { useState } from "react";
import styles from "./auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../config/auth";

import { useAuth } from "../contexts/authContext";

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
          await doCreateUserWithEmailAndPassword(email, password);
          navigate("/LogIn");
        } catch (error) {
          if (error.code === "auth/invalid-email") {
            setErrorMessage("Invalid email or password. Please try again.");
            console.error(error.code);
          }
          console.error(error);
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
      {userLoggedIn && <Navigate to={"/HomePage"} />}
      <div className={styles.form}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Sign Up</h1>
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
