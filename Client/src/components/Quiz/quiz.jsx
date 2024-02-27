import styles from "./quiz.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { questionsData } from "../../assets/questionsData";

import { useNavigate } from "react-router-dom";

import Options from "./Options";
import Finish from "./Finish";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [optionId, setOptionId] = useState(0);
  const [userPreferences, setUserPreferences] = useState([]);
  const [finish, setFinish] = useState(false);

  const optionRefs = useRef([null, null, null, null, null]);
  const navigate = useNavigate();

  const question = questionsData[index];

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleOptionClick = (e, optionId) => {
    optionRefs.current.forEach((option) => {
      if (option) option.classList.remove(styles.selected);
    });

    e.target.classList.add(styles.selected);

    setOptionId(optionId);
    setLock(true);
  };

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

  const handleNext = () => {
    if (lock && optionId !== 0) {
      if (index === questionsData.length - 1) {
        setFinish(true);
        return 0;
      } else {
        setIndex(index + 1);
        setLock(false);
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
      <div className={styles.container}>
        {finish ? (
          <>
            <Finish userPreferences={userPreferences} />
          </>
        ) : (
          <>
            <div>
              {" "}
              {index + 1} of {questionsData.length} question
            </div>
            <h2>{question.question}</h2>

            <Options
              question={question}
              optionRefs={optionRefs}
              handleOptionClick={handleOptionClick}
            />

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
          </>
        )}
      </div>
    </div>
  );
}
