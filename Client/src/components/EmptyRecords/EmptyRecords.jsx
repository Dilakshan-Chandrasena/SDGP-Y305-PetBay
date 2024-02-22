import Image from "react-bootstrap/Image";
import emptyImg from "../../assets/images/empty-component.png";
import styles from "./emptyrecords.module.css";

export default function EmptyRecords({ emptyProperty }) {
  return (
    <div className={styles.container}>
      <Image className={styles.image} src={emptyImg} fluid />
      <h1>No {emptyProperty} Available!</h1>
      <span>Let's get started</span>
    </div>
  );
}