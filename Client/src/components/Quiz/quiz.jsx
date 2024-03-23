import styles from "./quiz.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { questionsData } from "../../assets/questionsData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import "firebase/auth";
import Options from "./Options";
import Finish from "./Finish";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Quiz() {
  // Authentication context
  const { userId } = useAuth();

  // State variables
  const [index, setIndex] = useState(0); // Current question index
  const [lock, setLock] = useState(false); // Indicates whether an option is selected
  const [optionId, setOptionId] = useState(0); // ID of selected option
  const [userPreferences, setUserPreferences] = useState([]); // User preferences
  const [finish, setFinish] = useState(false); // Indicates quiz completion

  // Refs
  const optionRefs = useRef([null, null, null, null, null]); // Refs for option elements

  // Router navigation
  const navigate = useNavigate();

  // Current question object
  const question = questionsData[index];

  // Function to handle going back to the previous question
  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  // Function to handle option click
  const handleOptionClick = (e, optionId) => {
    // Remove selected class from all options
    optionRefs.current.forEach((option) => {
      if (option) option.classList.remove(styles.selected);
    });

    // Add selected class to clicked option
    e.target.classList.add(styles.selected);

    // Set option ID and lock option selection
    setOptionId(optionId);
    setLock(true);
  };

  // Effect to update user preferences when an option is selected
  useEffect(() => {
    if (lock && optionId !== 0) {
      const updatedPreferences = [...userPreferences];
      const preferenceIndex = updatedPreferences.findIndex(
        (pref) => pref.characteristic === question.characteristic
      );
      if (preferenceIndex !== -1) {
        updatedPreferences[preferenceIndex].userRating = optionId;
      } else {
        updatedPreferences.push({
          characteristic: question.characteristic,
          userRating: optionId,
        });
      }
      setUserPreferences(updatedPreferences);
    }
  }, [lock, optionId, index]);

  // Function to handle going to the next question or finishing the quiz
  const handleNext = () => {
    if (lock && optionId !== 0) {
      if (index === questionsData.length - 1) {
        setFinish(true);
      } else {
        setIndex(index + 1);
        setLock(false);
        // Remove selected class from all options
        optionRefs.current.forEach((option) => {
          if (option) {
            option.classList.remove(styles.selected);
          }
        });
        setOptionId(0);
      }
    }
  };

  return (
    <div>
      {/* Header Component */}
      <Header />
      <div className={styles.quizContainer}>
        {finish ? (
          // Render Finish component if quiz is finished
          <Finish userId={userId} userPreferences={userPreferences} />
        ) : (
          // Render quiz questions and options
          <>
            <div styles={styles.quizNo}>
              {index + 1} of {questionsData.length} Question
            </div>
            <h2>{question.question}</h2>

            {/* Options Component */}
            <Options
              question={question}
              optionRefs={optionRefs}
              handleOptionClick={handleOptionClick}
            />

            {/* Buttons for navigation */}
            <div className={styles.buttons}>
              <div>
                <button onClick={handleBack}>
                  {/* Icon for going back */}
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    style={{ fontSize: "19px" }}
                  />{" "}
                  Back
                </button>
              </div>
              <div>
                <button onClick={handleNext}>
                  Next {/* Icon for going to the next question */}
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ fontSize: "19px" }}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Footer Component */}
      <Footer />
    </div>
  );
}
