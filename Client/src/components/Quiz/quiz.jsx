import styles from "./quiz.module.css";

export default function quiz() {
  return (
    <div>
      <div className={styles.container}>
        <h2>How friendly is your dog?</h2>
        <ul>
          <li>Extremely friendly</li>
          <li>Friendly when its been pet</li>
          <li>Friendly, only with family</li>
          <li>Tough</li>
          <li>Extremely tough</li>
        </ul>
        <button>Next</button>
      </div>
    </div>
  );
}
