import React, { useEffect, useState } from 'react';
import styles from './useraccount.module.css'; 
import { MDBRow } from 'mdb-react-ui-kit';
import axios from "axios";
import { useAuth } from "../../contexts/authContext";


const UserAccount = () => {
  const {userId} = useAuth()
  const [userDetails, setUserDetails] = useState({
  });

  useEffect(() => {
    alert(userId)
    getUserDetails(userId)
  },[])
  
  const getUserDetails = async (userId) => {
    axios.get(`http://localhost:8080/petbay/api/v1/users/${userId}`)
    .then((res)=>{
        const user = res.data;
        console.log(user);
        setUserDetails(user);
    })
  } 

  return (
    <div className={styles.userAccountDetails}>
      <h4>Account</h4>
      
      <div className={styles.userInfo}>
        
        <div className={styles.userAccountDetails}>
           {userDetails.fullName}  {/*<strong></strong>  */}
        </div>
        <div className={styles.userInfoEmail}>
           {userDetails.email}
        </div>
        <hr />

        <h3>Basic Information</h3>

        <div className={styles.detailBar}>
            <div className={styles.userInfoDate}>
              <p className={styles.dateText}>Date Joined</p> {userDetails.datejoined}
            </div>
            
            <div className={styles.userInfoPlan}>
            <p className={styles.planText}>Subscription Plan</p> {userDetails.plan}
            </div>
        </div>

        <div className={styles.detailBar}>
            <div className={styles.userInfoContact}>
            <p className={styles.contactText}>Contact No</p> {userDetails.contact}
            </div>

            <div className={styles.userInfoPaymentInfo}>
            <p className={styles.paymentText}>Payment Info</p> {userDetails.paymentinfo}
            </div>  
        </div>
      </div>
    </div>
  );
};

export default UserAccount;

