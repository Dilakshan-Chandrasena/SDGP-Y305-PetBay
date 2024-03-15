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
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
  const base_url =
    import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  const { userId } = useAuth();
  const [breedData, setBreedData] = useState({});
  const { state } = useLocation();
  const breed = state?.breed; // Destructuring the breed property safely

  const [result, setResult] = useState("");
  const [preferencesSet, setPreferencesSet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (breed) {
      // Check if breed exists
      getBreedRecommendation(userId);
    }
  }, [breed]); // Trigger useEffect when breed changes

  const setPreferenceClick = async () => {
    navigate("/quiz");
  };
  const getBreedRecommendation = async (userId) => {
    try {
      const response = await axios.post(
        `${base_url}/petbay/api/v1/breed-recommendation/`,
        {
          userId: userId,
          breedName: breed,
        }
      );
      setBreedData(response.data);
      setResult(getResult(response.data.overallMatchingPercentage));
      setPreferencesSet(true);
    } catch (error) {
      console.log(error.message);
      setPreferencesSet(false);
    }
  };

  const getResult = (matchingPercentage) => {
    if (matchingPercentage >= 80) {
      return "Perfect";
    } else if (matchingPercentage >= 40) {
      return "Good";
    } else {
      return "Bad";
    }
  };

  const renderIcon = (matchingPercentage) => {
    if (matchingPercentage >= 80) {
      return (
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ color: "green", fontSize: "95px", marginLeft: "10px" }}
        />
      );
    } else if (matchingPercentage >= 40) {
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
              <div className={styles.heading}>
                {breed && preferencesSet ? (
                  <>
                    <div>
                      {renderIcon(breedData.overallMatchingPercentage)}
                      <h2>
                        {breedData.overallMatchingPercentage}% Overall Matching
                        Percentage
                      </h2>
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        wordSpacing: "2px",
                        fontSize: "20px",
                      }}
                    >
                      {breedData.breedName &&
                        `${breedData.breedName} is a ${result} match for you`}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        fontWeight: "bold",
                        wordSpacing: "2px",
                        fontSize: "20px",
                      }}
                    >
                      Please set preferences before
                    </p>
                    <br />
                    <button
                      className={styles.setButton}
                      onClick={setPreferenceClick}
                      style={{ marginTop: "10px" }}
                    >
                      Set Preferences
                    </button>
                  </>
                )}
              </div>
            </div>
          </MDBCol>
        </MDBRow>
        {breed && preferencesSet && <BreedDetails breedData={breedData} />}
        {breed && preferencesSet && <Tabs breedData={breedData} />}
      </MDBContainer>
    </div>
  );
}