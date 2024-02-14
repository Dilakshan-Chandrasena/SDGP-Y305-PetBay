import React, { useState } from "react";
import styles from "./auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function GetUserDetails() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { userId, email } = useParams();

  const handleSubscriptionChange = (e) => {
    setSubscriptionPlan(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const finishSignUp = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      subscriptionPlan === "" ||
      paymentMethod === ""
    ) {
      setErrorMessage("Please provide all the details");
    } else {
      try {
        const userData = {
          id: userId,
          email: email,
          firstName: firstName,
          lastName: lastName,
          subscriptionPlan: subscriptionPlan,
          paymentMethod: paymentMethod,
          pets: [],
          breedPreferences: [],
          communityPost: [],
          lostAndFoundPosts: [],
        };

        const response = await axios.post(
          "http://localhost:8080/petbay/api/v1/users/create",
          userData
        );

        navigate("/HomePage");
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occured. Please try again!");
      }
    }
  };

  return (
    <div className={styles.detailsForm}>
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
