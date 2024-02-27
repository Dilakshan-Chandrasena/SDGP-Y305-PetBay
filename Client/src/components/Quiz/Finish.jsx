import styles from "./quiz.module.css";

function Finish({ userPreferences }) {
  const finishButtonClick = () => {
    console.log(userPreferences);
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
