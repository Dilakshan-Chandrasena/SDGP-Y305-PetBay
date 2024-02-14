import styles from "./quiz.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { questionsData } from "../../assets/questionsData";

import { useNavigate } from "react-router-dom";

export default function quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(questionsData[index]);
  const [userPreferences, setUserPreferences] = useState([]);
  const navigate = useNavigate();

  const handleNext = async () => {
    setIndex(index + 1);
    if (index + 1 === questionsData.length) {
      // navigate("/uploadImage");
      console.log(userPreferences);
    }
    console.log(questionsData.length);
    setQuestion(questionsData[index + 1]);
  };

  const handleBack = async () => {
    if (index === 0) {
      // Optionally handle what happens when trying to go back from the first question
    } else {
      setIndex(index - 1);
      setQuestion(questionsData[index - 1]);
    }
  };

  const handleOptionClick = (optionId) => {
    setUserPreferences([...userPreferences, optionId]);
  };

  return (
    <div>
      <div className={styles.container}>
        <div> {index + 1} of 11 question</div>
        <h2>{question.question}</h2>
        <ul>
          <li id="1" onClick={() => handleOptionClick(1)}>
            {" "}
            {question.option1}{" "}
          </li>
          <li id="2" onClick={() => handleOptionClick(2)}>
            {" "}
            {question.option2}{" "}
          </li>
          <li id="3" onClick={() => handleOptionClick(3)}>
            {" "}
            {question.option3}{" "}
          </li>
          <li id="4" onClick={() => handleOptionClick(4)}>
            {" "}
            {question.option4}{" "}
          </li>
          <li id="5" onClick={() => handleOptionClick(5)}>
            {" "}
            {question.option5}{" "}
          </li>
        </ul>
        <div className={styles.buttons}>
          <div>
            {" "}
            <button onClick={handleBack}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ fontSize: "19px" }}
              />
              Back{" "}
            </button>
          </div>
          <div>
            <button onClick={handleNext}>
              Next{" "}
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ fontSize: "19px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
