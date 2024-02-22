import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from './reminder.module.css';
import EmptyRecords from "../EmptyRecords/EmptyRecords";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileLines, faPaw, faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";


function ReminderHome() {
  const [data, setData] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8080/petbay/api/v1/reminders/reminder/" + userId)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <div>
      <div className={styles.reminderHeader}>
        <h1 id="pet-reminders">
          <span>
            <FontAwesomeIcon icon={faPaw} />
          </span>{" "}
          Pet Reminders
        </h1>
        {/* <AddPetRecord reloadRecordsList={getPetRecordsById} /> */}
      </div>

      {data.map((reminder) => (
        <Card className={styles.reminderCard}>
          <Card.Body className={styles.reminderBody}>
            <span>
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#6cabd9", fontSize: "34px", marginLeft: "30px", }}
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
              <Button className="deleteButton"
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
