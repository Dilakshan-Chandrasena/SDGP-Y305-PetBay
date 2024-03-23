import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./petrecord.module.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPaw, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddPetRecord from "../AddPetRecord/AddPetRecord";
import EmptyRecords from "../EmptyRecords/EmptyRecords";

export default function PetRecord() {
  // configuring base url based on the env
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;
      
  const { petId } = useParams();

  // initializing state hooks for pet recs
  const [petRecords, setPetRecords] = useState([]);
  const [showEmptyRecs, setShowEmptyRecs] = useState(false);

  //loading all pet recod by id 
  useEffect(() => {
    getPetRecordsById(petId);
  }, []);

  // backend call for getting a pet record by id - GET
  const getPetRecordsById = async (petId) => {
    await axios
      .get(`${base_url}/petbay/api/v1/pet-records/records/${petId}`)
      .then((res) => {
        const data = res.data;

        setPetRecords(data);
        if (data.length > 0) {
          setShowEmptyRecs(false);
        } else {
          setShowEmptyRecs(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // backend call for deleting rec by rec id -DELETE
  const deletePetRecordByID = async (petRecordId) => {
    await axios
      .delete(`${base_url}/petbay/api/v1/pet-records/${petRecordId}`)
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
      {/*dynamically adding pet records to react cards  */}
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
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      {/*rendering empty recs component if no records available  */}
      <div
        style={{
          visibility: showEmptyRecs ? "visible" : "hidden",
          height: showEmptyRecs ? "fit-content" : "0px",
        }}
      >
        <EmptyRecords key={"key"} emptyProperty={"Pet Records"} />
      </div>
    </div>
  );
}
