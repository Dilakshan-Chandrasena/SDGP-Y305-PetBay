import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from './reminder.module.css';
import EmptyRecords from "../EmptyRecords/EmptyRecords";
import AddReminder from './AddReminder';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/authContext";

function ReminderHome() {
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;
      
  const [data, setData] = useState([]);
  const [img, setImage] = useState([]);
  const { userId } = useAuth();
  const [reminders, setReminder] = useState([]);
  const [showEmptyRecs, setShowEmptyRecs] = useState(false);

  // Fetch reminders and check for immediate reminders on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/petbay/api/v1/reminders/reminder/${userId}`);
        if (response.data.length === 0) {
          console.log('No reminders found.');
          return;
        }
        setReminder(response.data);
        const currentDateTime = new Date();
        currentDateTime.setSeconds(0);
        
        response.data.forEach(reminder => {
          const reminderDateTime = new Date(reminder.date + 'T' + reminder.time);
          reminderDateTime.setSeconds(0); 
          if (currentDateTime.getFullYear() === reminderDateTime.getFullYear() &&
          currentDateTime.getMonth() === reminderDateTime.getMonth() &&
          currentDateTime.getDate() === reminderDateTime.getDate() &&
          currentDateTime.getHours() === reminderDateTime.getHours() &&
          currentDateTime.getMinutes() === reminderDateTime.getMinutes()) {
            alert("Reminder works")
          }
        });
      } catch (error) {
        console.error('Error fetching reminders:', error.message);
      }
    };
    fetchData();

    // Fetch reminders periodically (every minute)
    const intervalId = setInterval(fetchData, 60000); 
    return () => clearInterval(intervalId);
  }, []);

  // Fetch reminders and pet names on component mount
  useEffect(() => {
    getReminders();
  });



  useEffect(() => {
    getPetNames();
  }, []);

  // Function to fetch reminders from the backend
  const getReminders = async () => {
    await axios
      .get(`${base_url}/petbay/api/v1/reminders/reminder/${userId}`)
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          setData(data);
        } else {
          setShowEmptyRecs(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Function to delete a reminder
  const deleteReminderHandle = async (id) => {
    await axios
      .delete(`${base_url}/petbay/api/v1/reminders/deleteReminder/${id}`)
      .then((res) => {
        if (res.status == 200) {
          alert("Reminder deleted successfully!");
          getReminders();
        }
      })
      .catch((err) => console.log(err));
  };

  // Function to fetch pet names from the backend
  const getPetNames = async () => {
    await axios
      .get(`${base_url}/petbay/api/v1/pet-profiles/owned-pets/${userId}`)
      .then((res) => {
        const img = res.data;
        console.log(img);
        setImage(img);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div className={styles.reminderHeader}>
        <h1 id="pet-reminders">
          <span>
          <FontAwesomeIcon
                icon={faPaw}
                style={{ color: "#6cabd9", fontSize: "34px" }}
              />
          </span>{" "}
          Pet Reminders
        </h1>
        <AddReminder reloadReminderList={getReminders} />
      </div>

      {data.map((reminder) => (
        <Card loadReminders={getReminders} className={styles.reminderCard}>
          <Card.Body className={styles.reminderBody}>
          <span>
          <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#6cabd9", fontSize: "34px", marginLeft: "50px", }}
              />
          </span>
            <div className={styles.reminderInfoContainer}>
              <div className="main-reminder">
              <span className={styles.dogName}>{reminder.dogName}</span>
              <h1 className={styles.reminder}>{reminder.reminderText}</h1>
              </div>
              <span className={styles.dateAndTime}>{reminder.date}</span>
              <span className={styles.dateAndTime}>{reminder.time}</span>
            </div>
            <div className={styles.btnContainer}>
              <Button
                onClick={() => {
                  deleteReminderHandle(reminder.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <div
        style={{
          visibility: showEmptyRecs ? "visible" : "hidden",
          height: showEmptyRecs ? "fit-content" : "0px",
        }}
      >
        <EmptyRecords key={""} emptyProperty={"Reminders"} />
      </div>
          </div>
  );
}

export default ReminderHome;
