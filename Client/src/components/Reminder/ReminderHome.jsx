import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from './ReminderStyle.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileLines, faPaw } from "@fortawesome/free-solid-svg-icons";
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

  const handleDelete = (id) => {
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
    
    <div className="main">
      <div className="header">
        <Header />
      </div>

      <div>
      <div className={styles.recordsHeader}>
        <h1 id="pet-records">
          <span>
            <FontAwesomeIcon icon={faPaw} />
          </span>{" "}
          Pet Records
        </h1>
        {/* <AddPetRecord reloadRecordsList={getPetRecordsById} /> */}
      </div>

      {data.map((reminder) => (
        <Card className={styles.recordCard}>
          <Card.Body className={styles.recordBody}>
            <span>
              <FontAwesomeIcon
                icon={faFileLines}
                style={{ color: "#6cabd9", fontSize: "34px" }}
              />
            </span>
            <div className={styles.recordInfoContainer}>
              <h1 className={styles.reminder}>{reminder.dogName}</h1>
              <h2 className={styles.reminder}>{reminder.reminderText}</h2>
              <span className={styles.dateAndTime}>{reminder.date}</span>
              <span className={styles.dateAndTime}>{reminder.time}</span>
            </div>
            <div className={styles.btnContainer}>
              <Button
                variant="outline-danger"
                onClick={() => {
                  deletePetRecordByID(record.id);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* <div
        style={{
          visibility: showEmptyRecs ? "visible" : "hidden",
          height: showEmptyRecs ? "fit-content" : "0px",
        }}
      >
        <EmptyRecords key={""} emptyProperty={"Pet Records"} />
      </div> */}
    </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ReminderHome;
