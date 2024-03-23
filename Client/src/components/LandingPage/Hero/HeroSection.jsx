import styles from "./herosection.module.css";
import img from "../../../assets/images/hero.png";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

export default function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.introContainer}>
        <div>
          <h1>Pamper, Protect, Prevail</h1>
          <p>Your Pet's Ultimate Care System!</p>
        </div>
        <div className={styles.btnContainer}>
          <Button className={styles.servicesBtn} variant="primary" href="#services">
            Services
          </Button>
          <Button className={styles.subscribtionsBtn} variant="primary" href="#subscribtions">
            Subscriptions
          </Button>
        </div>
        {/* paw prints animation */}
        <div className={styles.pawContainer}>
          <div className={styles.paws1}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPaw}
              rotation={90}
            />
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPaw}
              rotation={90}
            />
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPaw}
              rotation={90}
            />
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPaw}
              rotation={90}
            />
          </div>
          <div className={styles.paws2}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPaw}
              rotation={90}
            />
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPaw}
              rotation={90}
            />
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPaw}
              rotation={90}
            />
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img src={img} alt="" />
      </div>
      
    </div>
  );
}
