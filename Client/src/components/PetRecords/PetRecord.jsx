import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./petrecord.module.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileLines, faPaw } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import AddPetRecord from "../AddPetRecord/AddPetRecord";
import EmptyRecords from "../EmptyRecords/EmptyRecords";

export default function PetRecord() {
  const { petId } = useParams();
  const [petRecords, setPetRecords] = useState([]);
  const [showEmptyRecs, setShowEmptyRecs] = useState(false);

  useEffect(() => {
    getPetRecordsById(petId);
  }, []);

  const getPetRecordsById = async (petId) => {
    await axios
      .get(`http://localhost:8080/petbay/api/v1/pet-records/records/${petId}`)
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          setPetRecords(data);
        } else {
          setShowEmptyRecs(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deletePetRecordByID = async (petRecordId) => {
    await axios
      .delete(`http://localhost:8080/petbay/api/v1/pet-records/${petRecordId}`)
      .then((res) => {
        if (res.status == 200) {
          alert("Record deleted successfully!");
          getPetRecordsById(petId);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className={styles.recordsHeader}>
        <h1 id="pet-records">
          <span>
            <FontAwesomeIcon icon={faPaw} />
          </span>{" "}
          Pet Records
        </h1>
        <AddPetRecord reloadRecordsList={getPetRecordsById} />
      </div>

      {petRecords.map((record) => (
        <Card className={styles.recordCard}>
          <Card.Body className={styles.recordBody}>
            <span>
              <FontAwesomeIcon
                icon={faFileLines}
                style={{ color: "#6cabd9", fontSize: "34px" }}
              />
            </span>
            <div className={styles.recordInfoContainer}>
              <h1 className={styles.recordTitle}>{record.recordName}</h1>
              <span className={styles.recordDate}>{record.date}</span>
            </div>
            <div className={styles.btnContainer}>
              <a href={record.petRecordURL} target="_blank">
                <Button variant="dark">View</Button>
              </a>
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

      <div
        style={{
          visibility: showEmptyRecs ? "visible" : "hidden",
          height: showEmptyRecs ? "fit-content" : "0px",
        }}
      >
        <EmptyRecords key={""} emptyProperty={"Pet Records"} />
      </div>
    </div>
  );
}
