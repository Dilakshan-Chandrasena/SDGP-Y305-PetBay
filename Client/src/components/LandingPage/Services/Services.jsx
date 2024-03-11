import Carousel from "react-bootstrap/Carousel";
import styles from "./services.module.css";
import img from "../../../assets/images/hero.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import breedRecImg from "../../../assets/images/breedrec.png";
import petProfImg from "../../../assets/images/petprof.png";
import petRemImg from "../../../assets/images/petrem.png";
import petComImg from "../../../assets/images/petcom.png";
import petLostFoundImg from "../../../assets/images/petlostfound.png";

export default function Services() {
  return (
    <div className={styles.container} id="services">
      <div className={styles.titleContianer}>
        <h1>Our Services</h1>
        <p>
          <span>
            <FontAwesomeIcon icon={faPaw} />
          </span>
          {"  "}
          Your Pet's Wellness, Our Priority{"  "}
          <span>
            <FontAwesomeIcon icon={faPaw} />
          </span>
        </p>
      </div>
      <Carousel data-bs-theme="dark" className={styles.carousel}>
        <Carousel.Item>
          <div className={styles.caroContainer}>
            <img src={breedRecImg} alt="" className={styles.image} />
            <Carousel.Caption className={styles.caption}>
              <h3>Breed Recommendation</h3>
              <p>
                PetBay offers a comprehensive dog breed recommendation service,
                providing tailored suggestions based on your preferences. With
                over 120 breeds to choose from, our advanced algorithms ensure
                you find the perfect furry companion to suit your lifestyle and
                preferences.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.caroContainer}>
            <img src={petProfImg} alt="" className={styles.image} />
            <Carousel.Caption className={styles.caption}>
              <h3>Pet Profile & Records</h3>
              <p>
                At PetBay, we revolutionize pet care with our exclusive pet
                profile service. Seamlessly maintain all your furry friend's
                essential details, from their favorite toys to their medical
                records, in one secure platform. With our user-friendly
                interface, managing your pet's information has never been
                easier.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.caroContainer}>
            <img src={petRemImg} alt="" className={styles.image} />
            <Carousel.Caption className={styles.caption}>
              <h3>Pet Reminders</h3>
              <p>
                Meet Pet Reminders: Your pet's essential scheduler. Never miss a
                vet visit or grooming appointment again. Stay organized
                effortlessly with gentle nudges from Pet Reminders. Stress-free
                pet care starts here.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.caroContainer}>
            <img src={petComImg} alt="" className={styles.image} />
            <Carousel.Caption className={styles.caption}>
              <h3>Community</h3>
              <p>
                Enter the world of Pet Community: a dynamic hub for pet lovers
                to connect, share experiences, and seek advice. Our platform
                facilitates seamless interaction, allowing users to upvote,
                comment, and engage in meaningful discussions.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.caroContainer}>
            <img src={petLostFoundImg} alt="" className={styles.image} />
            <Carousel.Caption className={styles.caption}>
              <h3>Lost & Found</h3>
              <p>
                Welcome to Pet Lost and Found: Where lost pets find their way
                home safely. Post about missing pets or found ones, and let our
                community unite to reunite them with their families. Together,
                we ensure every pet's journey ends happily.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
