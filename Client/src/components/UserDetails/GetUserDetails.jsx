import React, { useState, useEffect } from "react";
import styles from "../../assets/css/auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function GetUserDetails() {
  useEffect(() => {
    document.body.classList.add("auth-background");
    return () => {
      document.body.classList.remove("auth-background"); // Clean up when component unmounts
    };
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { userId, email } = location.state;

  const handleSubscriptionChange = (e) => {
    setSubscriptionPlan(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const PostUserData = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/petbay/api/v1/users/create",
        userData
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while posting user data.");
    }
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

        await PostUserData(userData);
        window.localStorage.setItem("userId", JSON.stringify(userId));
        navigate("/home");
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
