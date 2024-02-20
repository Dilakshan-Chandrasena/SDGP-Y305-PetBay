import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./petcard.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function PetCard({ name, petId, petImageURL, reloadPetList }) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [petID, setPetID] = useState();
  const [petName, setPetName] = useState();
  const [petImage, setPetImage] = useState();

  useEffect(() => {
    setPetID(petId);
    setPetName(name);
    setPetImage(petImageURL);
  });

  const viewPetProfile = () => {
    navigate(`/pet-profile/${petID}`);
  };

  const deletePetByID = async () => {
    await axios
      .delete(`http://localhost:8080/petbay/api/v1/pet-profiles/${petID}`)
      .then((res) => {
        if (res.status == 200) {
          alert(`${petName} deleted successfully!`);
          reloadPetList(userId);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.petContainer}>
      <Card className={styles.petCard}>
        <Card.Body>
          <div className={styles.detailsContainer}>
            <div className={styles.innerContainer} onClick={viewPetProfile}>
              <img src={petImage} alt={`${petName}- Profile Image`} />
              <h2>{petName}</h2>
            </div>
            <div className={styles.innerContainer}>
              <Button variant="outline-info">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button variant="outline-danger" onClick={deletePetByID}>
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
