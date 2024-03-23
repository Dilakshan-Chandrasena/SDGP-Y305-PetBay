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
  // Authentication context
  const { userId } = useAuth();

  // State variables
  const [breedData, setBreedData] = useState({}); // Data for the recommended breed
  const { state } = useLocation(); // Get location state
  const breed = state?.breed; // Destructuring the breed property safely

  const [result, setResult] = useState(""); // Result of matching percentage
  const [preferencesSet, setPreferencesSet] = useState(false); // Indicates if user preferences are set
  const navigate = useNavigate(); // Navigation hook

  // Base URL based on environment
  const base_url =
    import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  // Effect to fetch recommendation when breed changes
  useEffect(() => {
    if (breed) {
      getBreedRecommendation(userId);
    }
  }, [breed]); // Trigger useEffect when breed changes

  // Function to handle setting preferences
  const setPreferenceClick = async () => {
    navigate("/quiz");
  };

  // Function to fetch breed recommendation
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

  // Function to determine result based on matching percentage
  const getResult = (matchingPercentage) => {
    if (matchingPercentage >= 80) {
      return "Perfect";
    } else if (matchingPercentage >= 40) {
      return "Good";
    } else {
      return "Bad";
    }
  };

  // Function to render appropriate icon based on matching percentage
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
                      textTransform: "capitalize",
                    }}
                  >
                    {breedData.breedName &&
                      `${breedData.breedName} is a ${result} match for you`}
                  </p>
                </>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
        {/* Render BreedDetails component if breed and preferences are set */}
        {breed && preferencesSet && <BreedDetails breedData={breedData} />}
        {/* Render Tabs component if breed and preferences are set */}
        {breed && preferencesSet && <Tabs breedData={breedData} />}
      </MDBContainer>
    </div>
  );
}
