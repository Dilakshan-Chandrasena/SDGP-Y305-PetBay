import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./promobanner.module.css";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import img from "../../../assets/images/catflip.png";

export default function PromoBanner() {
  return (
    <div className={styles.promoContainer}>
      <div className={styles.promoDet}>
        <h3>PetBay Pro Launch Offer</h3>
        <h1>
          <FontAwesomeIcon icon={faPaw} /> Pawsome Offer
        </h1>
        <h2>
          19.99${" "}
          <span>
            <strike>29.99$</strike>
          </span>
        </h2>
        <p>Only valid until 31/04/2024 </p>
      </div>
      <div className={styles.imgContainer}>
        <img src={img} alt="" className={styles.img} />
      </div>
    </div>
  );
}
