import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import image1 from "../../assets/images/dogs/dog1.jpg";
import styles from "./lostfound.module.css";
import ViewDetails from "./ViewDetails";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export default function NoticeCard() {
  const findStatus = (status) => {
    return status === "lost";
  };

  return (
    <div>
      <Card className={`${styles.card}`}>
        {findStatus("lost") ? (
          <Card.Header className={`ml-auto ${styles.lostStatus}`}>
            <div className="ml-auto">Lost</div>
          </Card.Header>
        ) : (
          <Card.Header className={`ml-auto ${styles.foundStatus}`}>
            <div className="ml-auto">Found</div>
          </Card.Header>
        )}
        <Card.Body style={{ display: "flex" }}>
          <div className="flex-grow-1 mr-md-1 mb-1 mb-md-5" style={{ flex: 2 }}>
            <Figure.Image src={image1} className={styles.image} />
          </div>
          <div className="flex-grow-1" style={{ flex: 3 }}>
            <Card.Title className={styles.title}>Robin</Card.Title>
            <Card.Text>
              <strong>Last seen at:</strong> 6th Ave & Clay St. Denver,
              Colarado.
            </Card.Text>
            <Card.Text>
              <strong>Features:</strong> Cattle Dog/ Husky mix, Tan & white,
              Long hair
            </Card.Text>
            <Card.Text>
              <strong>Report to:</strong>{" "}
              <span className={styles.span}>720-432-7381</span>
            </Card.Text>
            <ViewDetails />
          </div>
        </Card.Body>

        <Card.Footer className="text-center text-muted">2 days ago</Card.Footer>
      </Card>

      <Card className={`${styles.card}`}>
        {findStatus("found") ? (
          <Card.Header className={`ml-auto ${styles.lostStatus}`}>
            <div className="ml-auto">Lost</div>
          </Card.Header>
        ) : (
          <Card.Header className={`ml-auto ${styles.foundStatus}`}>
            <div className="ml-auto">Found</div>
          </Card.Header>
        )}
        <Card.Body style={{ display: "flex" }}>
          <div className="flex-grow-1 mr-md-1 mb-1 mb-md-5" style={{ flex: 2 }}>
            <Figure.Image src={image1} className={styles.image} />
          </div>
          <div className="flex-grow-1" style={{ flex: 3 }}>
            <Card.Title className={styles.title}>Robin</Card.Title>
            <Card.Text>
              <strong>Last seen at:</strong> 6th Ave & Clay St. Denver,
              Colarado.
            </Card.Text>
            <Card.Text>
              <strong>Features:</strong> Cattle Dog/ Husky mix, Tan & white,
              Long hair
            </Card.Text>
            <Card.Text>
              <strong>Report to:</strong>{" "}
              <span className={styles.span}>720-432-7381</span>
            </Card.Text>
            <ViewDetails />
          </div>
        </Card.Body>

        <Card.Footer className="text-center text-muted">2 days ago</Card.Footer>
      </Card>
    </div>
  );
}
