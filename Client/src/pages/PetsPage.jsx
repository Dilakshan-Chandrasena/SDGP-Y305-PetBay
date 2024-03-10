import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PetCard from "../components/PetCard/PetCard";
import styles from "../assets/css/petpage.module.css";
import { faPaw, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AddPetModal from "../components/AddPet/AddPetModal";
import EmptyRecords from "../components/EmptyRecords/EmptyRecords";

export default function PetsPage() {
  const base_url =
    import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  const { userId } = useParams();
  const [petList, setPetList] = useState([]);
  const [showEmptyRecs, setShowEmptyRecs] = useState(false);

  useEffect(() => {
    getPetsByUserId(userId);
  }, []);

  const getPetsByUserId = async (userId) => {
    await axios
      .get(`${base_url}/petbay/api/v1/pet-profiles/owned-pets/${userId}`)
      .then((res) => {
        const data = res.data;
        setPetList(res.data);
        if (data.length > 0) {
          setShowEmptyRecs(false);
        } else {
          setShowEmptyRecs(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div className={styles.petsHeaderContainer}>
        <div className={styles.petPageHeader}>
          <h1>
            {" "}
            <span>
              <FontAwesomeIcon icon={faPaw} />
            </span>{" "}
            My Companions
          </h1>
          <AddPetModal reloadPetList={getPetsByUserId} />
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

      <div
        style={{
          visibility: showEmptyRecs ? "visible" : "hidden",
          height: showEmptyRecs ? "fit-content" : "0px",
        }}
      >
        <EmptyRecords key={""} emptyProperty={"Pets"} />
      </div>

      <Footer />
    </div>
  );
}
