import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./petcard.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function PetCard({ name, petId, petImageURL, reloadPetList }) {
  // configuring base url based on the env
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;
      
  const navigate = useNavigate();
  const { userId } = useParams();

  // initializing state hooks for pet details
  const [petID, setPetID] = useState();
  const [petName, setPetName] = useState();
  const [petImage, setPetImage] = useState();

  // setting state hooks with props (pet details)
  useEffect(() => {
    setPetID(petId);
    setPetName(name);
    setPetImage(petImageURL);
  });

  // navigate to particular details of a pet 
  const viewPetProfile = () => {
    navigate(`/pet-profile/${petID}`);
  };

  // backend call for deleting a pet profile DELETE call
  const deletePetByID = async () => {
    await axios
      .delete(`${base_url}/petbay/api/v1/pet-profiles/${petID}`)
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
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
