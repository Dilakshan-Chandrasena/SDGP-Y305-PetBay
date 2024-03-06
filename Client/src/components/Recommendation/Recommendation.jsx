import styles from "./recommendation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BreedDetails from "./BreedDetails";
import Tabs from "./Tabs";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import "firebase/auth";
import { useState, useEffect } from "react";

export default function Recommendation({}) {
  const { userId } = useAuth();
  const [breedData, setBreedData] = useState({});

  useEffect(() => {
    getBreedRecommendation(userId);
  }, []);

  const getBreedRecommendation = async (userId) => {
    await axios
      .post(`http://localhost:8080/petbay/api/v1/breed-recommendation/`, {
        userId: userId,
        breedName: "Affenpinscher",
      })
      .then((res) => {
        setBreedData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderIcon = (matchingPercentage) => {
    if (matchingPercentage >= 80) {
      return (
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ color: "green", fontSize: "95px", marginLeft: "10px" }}
        />
      );
    } else if (matchingPercentage >= 60 || matchingPercentage >= 40) {
      return (
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ color: "orange", fontSize: "95px", marginLeft: "10px" }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          style={{ color: "red", fontSize: "95px", marginLeft: "10px" }}
        />
      );
    }
  };

  return (
    <div>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <div className={styles.headerContainer}>
              <div>{renderIcon(breedData.overallMatchingPercentage)}</div>
              <div className={styles.heading}>
                <h2>
                  {breedData.overallMatchingPercentage}% Overall Matching
                  Percentage
                </h2>
                <p
                  style={{
                    fontWeight: "bold",
                    wordSpacing: "2px",
                    fontSize: "20px",
                  }}
                >
                  {breedData.breedName} is a perfect match for you
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
        <BreedDetails breedData={breedData} />
        <Tabs breedData={breedData} />
      </MDBContainer>
    </div>
  );
}
