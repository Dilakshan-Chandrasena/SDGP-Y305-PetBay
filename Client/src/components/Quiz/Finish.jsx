import styles from "./quiz.module.css";
import axios from "axios";

const PostUserPreferences = async (userPreferences, userId) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/petbay/api/v1/users/preferences/set/${userId}`,
      { breedPreferences: userPreferences }
    );
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while posting user data.");
  }
};

function Finish({ userId, userPreferences }) {
  const finishButtonClick = () => {
    console.log(userPreferences);
    console.log(userId);
    PostUserPreferences(userPreferences, userId);
  };

  return (
    <div>
      <h1 className={styles.finishHeading}>
        Finish setting up your preferences
      </h1>
      <button className={styles.finishButton} onClick={finishButtonClick}>
        Finish
      </button>
    </div>
  );
}

export default Finish;
