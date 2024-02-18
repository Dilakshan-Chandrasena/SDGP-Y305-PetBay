import styles from "../../assets/quiz.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { questionsData } from "../../assets/questionsData";

import { useNavigate } from "react-router-dom";

export default function quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(questionsData[index]);
  let [lock, setLock] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option5 = useRef(null);

  let optionArray = [option1, option2, option3, option4, option5];

  const [userPreferences, setUserPreferences] = useState([]);
  const navigate = useNavigate();

  const handleNext = async () => {
    if (lock === true) {
      console.log(index);
      if (index === questionsData.length - 1) {
        console.log(userPreferences);
        navigate("/UploadImage");
      } else {
        setIndex(++index);
        setQuestion(questionsData[index]);
        setLock(false);
        optionArray.map((option) => {
          option.current.classList.remove(styles.selected);
          return null;
        });
      }
    }
  };

  const handleBack = async () => {
    if (index === 0) {
    } else {
      setIndex(index - 1);
      setQuestion(questionsData[index - 1]);
    }
  };

  const handleOptionClick = (e, optionId) => {
    if (lock === false) {
      setUserPreferences([...userPreferences, optionId]);
      e.target.classList.add(styles.selected);
      setLock(true);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div>
          {" "}
          {index + 1} of {questionsData.length} question
        </div>
        <h2>{question.question}</h2>
        <ul>
          <li
            ref={option1}
            id="1"
            onClick={(e) => {
              handleOptionClick(e, 1);
            }}
          >
            {" "}
            {question.option1}{" "}
          </li>
          <li
            ref={option2}
            id="2"
            onClick={(e) => {
              handleOptionClick(e, 2);
            }}
          >
            {" "}
            {question.option2}{" "}
          </li>
          <li
            ref={option3}
            id="3"
            onClick={(e) => {
              handleOptionClick(e, 3);
            }}
          >
            {" "}
            {question.option3}{" "}
          </li>
          <li
            ref={option4}
            id="4"
            onClick={(e) => {
              handleOptionClick(e, 4);
            }}
          >
            {" "}
            {question.option4}{" "}
          </li>
          <li
            ref={option5}
            id="5"
            onClick={(e) => {
              handleOptionClick(e, 5);
            }}
          >
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
              />{" "}
              Back
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
