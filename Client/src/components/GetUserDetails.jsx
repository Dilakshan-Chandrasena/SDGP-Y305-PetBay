import React, { useState } from "react";
import styles from "./auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

export default function GetUserDetails() {
  const navigate = useNavigate();

  const { userLoggedIn } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscriptionChange = (e) => {
    setSubscriptionPlan(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const finishSignUp = async () => {
    if (
      firstName == "" ||
      lastName == "" ||
      subscriptionPlan == "" ||
      paymentMethod == ""
    ) {
      setErrorMessage("Please provide all the details");
    } else {
      console.log(firstName, lastName, subscriptionPlan, paymentMethod);
      navigate("/HomePage");
    }
  };

  return (
    <div className={styles.detailsForm}>
      {userLoggedIn && <Navigate to={"/GetUserDetails"} />}
      <div className={styles.form}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Let's Finish Sign Up</h1>
        </div>

        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={`${styles.inputBox} ${styles.dropdown}`}>
          <select
            className={`${styles.input} ${styles.select}`}
            value={subscriptionPlan}
            onChange={handleSubscriptionChange}
          >
            <option>Subscription Plan</option>
            <option value="Free">Free</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
          </select>
          <div className={styles.dropdownIcon}>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        <div className={`${styles.inputBox} ${styles.dropdown}`}>
          <select
            className={`${styles.input} ${styles.select}`}
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="Payment method" className={styles.disableOption}>
              Payment method
            </option>
            <option>Visa</option>
            <option value="Master Card">Master Card</option>
            <option value="Paypal">Paypal</option>
          </select>
          <div className={styles.dropdownIcon}>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.signInButton} onClick={finishSignUp}>
            Finish Sign Up
          </button>
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <br />
      </div>
    </div>
  );
}
