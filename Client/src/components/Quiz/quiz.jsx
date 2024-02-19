import styles from "./quiz.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { questionsData } from "../../assets/questionsData";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(questionsData[index]);
  let [lock, setLock] = useState(false);
  let [optionId, setOptionId] = useState(0);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option5 = useRef(null);

  let optionArray = [option1, option2, option3, option4, option5];

  const [userPreferences, setUserPreferences] = useState({});
  const navigate = useNavigate();

  const handleBack = async () => {
    if (index === 0) {
    } else {
      setIndex(index - 1);
      setQuestion(questionsData[index - 1]);
    }
  };

  const handleOptionClick = (e, optionId) => {
    if (!lock) {
      e.target.classList.add(styles.selected);
      setOptionId(optionId);
      setLock(true);
    }

    if (lock) {
      optionArray.forEach((option) => {
        option.current.classList.remove(styles.selected);
      });
      e.target.classList.add(styles.selected);
      setOptionId(optionId);
      setLock(true);
    }
  };

  useEffect(() => {
    if (lock && optionId !== 0) {
      setUserPreferences((prevPreferences) => ({
        ...prevPreferences,
        [question.characteristic]: optionId,
      }));
    }
  }, [lock, optionId, index]);

  // Store the optionId of the last question when component unmounts
  useEffect(() => {
    return () => {
      if (lock && optionId !== 0) {
        setUserPreferences((prevPreferences) => ({
          ...prevPreferences,
          [question.characteristic]: optionId,
        }));
      }
    };
  }, []);

  const handleNext = async () => {
    if (lock && optionId !== 0) {
      if (index === questionsData.length - 1) {
        console.log(userPreferences);
        navigate("/UploadImage");
      } else {
        setIndex(index + 1);
        setQuestion(questionsData[index + 1]);
        setLock(false);
        optionArray.forEach((option) => {
          option.current.classList.remove(styles.selected);
        });
        setOptionId(0); // Reset optionId after moving to the next question
      }
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
