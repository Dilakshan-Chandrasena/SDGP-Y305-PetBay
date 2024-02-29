import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import styles from "./lostfound.module.css";
import ViewDetails from "./ViewDetails";

export default function NoticeCard({ data }) {
  const findStatus = (status) => {
    return status === "lost";
  };

  return (
    <div>
      <Card key={data.id} className={`${styles.card}`}>
        {findStatus(data.status) ? (
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
            <Figure.Image
              src={data.lostFoundImageURL}
              className={styles.image}
            />
          </div>
          <div className="flex-grow-1" style={{ flex: 3 }}>
            <Card.Title className={styles.title}>{data.name}</Card.Title>
            <Card.Text>
              <strong>Last seen at:</strong> {data.area}
            </Card.Text>
            <Card.Text>
              <strong>Features:</strong> {data.color}
            </Card.Text>
            <Card.Text>
              <strong>Report to:</strong>{" "}
              <span className={styles.span}>{data.contact}</span>
            </Card.Text>
            <ViewDetails postId={data.id} />
          </div>
        </Card.Body>
        <Card.Footer className="text-center text-muted">2 days ago</Card.Footer>
      </Card>
    </div>
  );
}
