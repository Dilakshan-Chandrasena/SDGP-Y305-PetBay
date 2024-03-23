import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./petprofile.module.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function PetProfile() {
  // configuring based url based on the env
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;
  const { petId } = useParams();
  const [petDetails, setPetDetails] = useState({});

  // loading all the details of a pet
  useEffect(() => {
    getPetDetailsById(petId);
  }, []);

  // backend call for getting a pet by id - GET
  const getPetDetailsById = async (petId) => {
    axios
      .get(`${base_url}/petbay/api/v1/pet-profiles/${petId}`)
      .then((res) => {
        setPetDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className={styles.petProfContainer}>
      <div>
        {/* Pet Image card structure */}
        <Card className={styles.petIdentityContainer}>
          <Card.Body>
            <Card.Title className={styles.petName}>
              {petDetails.name}
            </Card.Title>
          </Card.Body>
          <Card.Img className={styles.profImage} variant="top" src={petDetails.petImageURL} />
        </Card>
      </div>

      <div>
        {/* Pet Details rendering card structure */}
        <Card className={styles.petInfoContainer}>
          <Card.Body>
            <Card.Subtitle className={styles.petDetSubtitle}>
              Breed
            </Card.Subtitle>
            <Card.Text className={styles.petDetText}>
              {petDetails.breed}
            </Card.Text>
            <Card.Subtitle className={styles.petDetSubtitle}>
              Gender
            </Card.Subtitle>
            <Card.Text className={styles.petDetText}>
              {petDetails.gender}
            </Card.Text>
            <Card.Subtitle className={styles.petDetSubtitle}>
              Address
            </Card.Subtitle>
            <Card.Text className={styles.petDetText}>
              {petDetails.address}
            </Card.Text>
            <div className={styles.petDetSubContainer}>
              <div>
                <Card.Subtitle className={styles.petDetSubtitle}>
                  Age
                </Card.Subtitle>
                <Card.Text className={styles.petDetText}>
                  {petDetails.age} Years
                </Card.Text>
              </div>
              <div>
                <Card.Subtitle className={styles.petDetSubtitle}>
                  Height
                </Card.Subtitle>
                <Card.Text className={styles.petDetText}>
                  {petDetails.height}cm
                </Card.Text>
              </div>
              <div>
                <Card.Subtitle className={styles.petDetSubtitle}>
                  Weight
                </Card.Subtitle>
                <Card.Text className={styles.petDetText}>
                  {petDetails.weight}kg
                </Card.Text>
              </div>
            </div>
            <div className={styles.linkConatiner}>
            <Card.Link className={styles.cardLink} href="#pet-records">
              <Button variant="dark">Records</Button>
            </Card.Link>
            <Card.Link href="#">
              <Button variant="dark">Reminders</Button>
            </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
