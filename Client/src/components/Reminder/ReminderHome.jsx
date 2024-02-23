import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from './reminder.module.css';
import EmptyRecords from "../EmptyRecords/EmptyRecords";
import AddReminder from './AddReminder';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";


function ReminderHome() {
  const [data, setData] = useState([]);
  const [img, setImage] = useState([]);
  const { userId } = useParams();
  const [showEmptyRecs, setShowEmptyRecs] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getReminders();
  }, []);

  useEffect(() => {
    getPetNames();
  }, []);
  const getReminders = async () => {
    await axios
      .get("http://localhost:8080/petbay/api/v1/reminders/reminder/" + userId)
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

  const deleteReminderHandle = (id) => {
    axios
      .delete(
        "http://localhost:8080/petbay/api/v1/reminders/deleteReminder" + id
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const getPetNames = async () => {
    await axios
      .get("http://localhost:8080/petbay/api/v1/pet-profiles/owned-pets/" + userId)
      .then((res) => {
        const img = res.img;
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
                icon={faFileLines}
                style={{ color: "#6cabd9", fontSize: "34px" }}
              />
          </span>{" "}
          Pet Reminders
        </h1>
        <AddReminder reloadReminderList={getReminders} />
      </div>

      {data.map((reminder) => (
        <Card className={styles.reminderCard}>
          <Card.Body className={styles.reminderBody}>
            <span>
              {img.map((image) => {
                <img src={image.petImageURL} alt="" />
              })}
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
