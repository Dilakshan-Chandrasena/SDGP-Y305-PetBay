import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import styles from "./lostfound.module.css";
import ViewDetails from "./ViewDetails";

export default function NoticeCard({ data }) {
  const findStatus = (status) => {
    return status === "lost";
  };

  const getTimeDifference = (createdDate) => {
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - new Date(createdDate));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      return `${diffDays} days ago`;
    } else if (diffHours > 1) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffMinutes} minutes ago`;
    }
  };

  return (
    <Card key={data.id} className={`${styles.card}`}>
      {findStatus(data.status) ? (
        <Card.Header className={`${styles.lostStatus}`}>
          <div>Lost</div>
        </Card.Header>
      ) : (
        <Card.Header className={`${styles.foundStatus}`}>
          <div>Found</div>
        </Card.Header>
      )}
      <Card.Body className="d-flex flex-column flex-md-row">
        <div className="mr-md-3 mb-3 mb-md-0" style={{ flex: "1" }}>
          <Figure.Image src={data.lostFoundImageURL} className={styles.image} />
        </div>
        <div style={{ flex: "2" }}>
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
      <Card.Footer className="text-center text-muted">
        {getTimeDifference(data.createdDate)}
      </Card.Footer>
    </Card>
  );
}
