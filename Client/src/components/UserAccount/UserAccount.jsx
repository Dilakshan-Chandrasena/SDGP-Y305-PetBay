import React, { useEffect, useState } from "react";
import styles from "./useraccount.module.css";
import { MDBRow } from "mdb-react-ui-kit";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

const UserAccount = () => {
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;
  const { userId } = useAuth();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    getUserDetails(userId);
  }, []);

  const getUserDetails = async (userId) => {
    axios
      .get(`${base_url}/petbay/api/v1/users/${userId}`)
      .then((res) => {
        setUserDetails(res.data);
      });
  };

  return (
    <div className={styles.userAccountDetails}>
      <h4>Account</h4>

      <div className={styles.userInfo}>
        <div className={styles.userImage}>
          <img src="src\assets\images\userImage.jpg" alt="" />
        </div>
        <div className={styles.editImage}>
          <button type="edit">
            {" "}
            <img src="src\assets\images\editIcon.jpg" alt="" border="0" />{" "}
          </button>
        </div>

        <div className={styles.userAccountDetails}>
          <h3>
            {userDetails.firstName} {userDetails.lastName}
          </h3>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {" "}
            Welcome to PetBay!
          </span>
        </div>
        <hr />

        <h3>Basic Information</h3>

        <div className={styles.detailBar}>
          <div className={styles.userInfoDate}>
            <p className={styles.dateText}>Full Name</p>{" "}
            <span>
              {userDetails.firstName} {userDetails.lastName}
            </span>
          </div>

          <div className={styles.userInfoPlan}>
            <p className={styles.planText}>Subscription Plan</p>{" "}
            {userDetails.subscriptionPlan}
          </div>
        </div>

        <div className={styles.detailBar}>
          <div className={styles.userInfoContact}>
            <p className={styles.contactText}>Email</p> {userDetails.email}
          </div>

          <div className={styles.userInfoPaymentInfo}>
            <p className={styles.paymentText}>Payment Info</p>{" "}
            {userDetails.paymentMethod}
          </div>
        </div>

        <div className={styles.masterCard}>
          <img src="src\assets\images\mastercardIcon.png" alt="" />
        </div>

        <div className={styles.visa}>
          <img src="src\assets\images\visaIcon.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
