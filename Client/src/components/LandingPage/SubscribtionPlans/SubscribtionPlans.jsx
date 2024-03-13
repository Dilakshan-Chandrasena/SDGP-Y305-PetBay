import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./subscribtionplans.module.css";
import plansData from "../../../assets/subscribtion-plans.json";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

export default function SubscribtionPlans() {
  const plans = plansData.plans;
  return (
    <div id="subscribtions">
      <div className={styles.titleContianer}>
        <h1>Subscribtion Plans</h1>
        <p>
          <span>
            <FontAwesomeIcon icon={faPaw} />
          </span>
          {"  "}
          Fur-tastic Plans For Your Pet!{"  "}
          <span>
            <FontAwesomeIcon icon={faPaw} />
          </span>
        </p>
      </div>
      <div className={styles.cardContainer}>
        {plans.map((plan) => (
          <Card className={styles.planCard}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title className={styles.planTitle}>{plan.name}</Card.Title>
              <Card.Text>
                <ListGroup>
                  {plan.features.map((feature) => (
                    <ListGroup.Item className={styles.feature}>
                      {feature}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Text>
              <h4>
                <Badge className={styles.priceBadge} bg="primary">
                  {plan.price}
                </Badge>
              </h4>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
