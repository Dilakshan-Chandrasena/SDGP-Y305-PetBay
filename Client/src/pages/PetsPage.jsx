import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PetCard from "../components/PetCard/PetCard";
import styles from "../assets/css/petpage.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AddPetModal from "../components/AddPet/AddPetModal";

export default function PetsPage() {
  const { userId } = useParams();
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    getPetsByUserId(userId);
  }, []);

  const getPetsByUserId = async (userId) => {
    await axios
      .get(
        `http://localhost:8080/petbay/api/v1/pet-profiles/owned-pets/${userId}`
      )
      .then((res) => {
        setPetList(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div className={styles.petsHeaderContainer}>
        <div className={styles.petPageHeader}>
          <h1>My Companions</h1>
          <AddPetModal reloadPetList={getPetsByUserId}/>
        </div>
      </div>

      <div>
        {petList.map((pet) => (
          <PetCard
            key={pet.id}
            name={pet.name}
            petId={pet.id}
            petImageURL={pet.petImageURL}
            reloadPetList={getPetsByUserId}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
