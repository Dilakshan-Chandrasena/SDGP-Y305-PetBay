import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card,Form, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faPaperPlane, faHashtag, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import styles from './community.module.css';
import EmptyRecords from "../EmptyRecords/EmptyRecords";
import axios from "axios";


export default function CommunityPage() {
  const [data, setData] = useState([]);
  const [showEmptyRecs, setShowEmptyRecs] = useState(false);
  const { userId } = useParams();
  const [validated, setValidated] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [values, setValues] = useState({
    id: "",
    username: "",
    dateTime: "",
    text: "",
    likes: 0,
  });

  const handleLikeClick = () => {
    const countLikes = values.likes+1;
    setValues(countLikes);
    console.log(values.likes);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    await axios
      .post(
        "http://localhost:8080/petbay/api/v1/community/addCommunityPost/" + userId,
        values
      )
      .then(async (res) => {
        alert("Post Published")
        loadPosts;
      })
      .catch((err) => console.log(err));
    setValidated(true);
  };

  useEffect(() => {
    getPosts();
  },[]);

  const getPosts = async () => {
    await axios
      .get("http://localhost:8080/petbay/api/v1/community/feed" )
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          setData(data);
        } else {
          setShowEmptyRecs(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="bg-light border-right">
        <div className={styles.communityHeader}>
        <h1 id="community">
          <span>
          <FontAwesomeIcon
                icon={faPaw}
                style={{ color: "#6cabd9", fontSize: "34px" }}
              />
          </span>{" "}
          Community
        </h1>
      </div>
        </Col>
        <Col sm={6} className={styles.communityPosts}>
        <Card className={styles.createPost}>
      <Card.Body className={styles.postBody}>
        <Card.Title className='mb-3'>Create Post</Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="createPostForm">
        <Form.Control required className={styles.postField} type="text" placeholder="What's on your mind?" onChange={(e) =>
                      setValues({ ...values, text: e.target.value })
                    } controlId="validationCustom01"/>
      </Form.Group>
      <div className={styles.createButtons}>
      <Button className={styles.publish} type="submit">
      <FontAwesomeIcon icon={faPaperPlane} /> Publish
      </Button>
      </div>
      
    </Form>
      </Card.Body>
    </Card>
    {data.map((post) => (
        <Card className={styles.communityCard} loadPosts={getPosts}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.title}>{post.username}</Card.Title>
        <Card.Text className={styles.subtitle}>{post.dateTime}</Card.Text>
        <Card.Text className={styles.postText}>
        {post.text}
        </Card.Text>
        <div className="d-flex text-center">
        <Button className={styles.likeButton} onClick={handleLikeClick}>
        <FontAwesomeIcon icon={faThumbsUp} /> 
              </Button>
              {post.likes}
              <Form.Control required className={styles.commentField} type="text" placeholder="Add your comment here..." onChange={(e) =>
                      setValues({ ...values, text: e.target.value })
                    } controlId="validationCustom01"/>
                    <Button className={styles.commentButton} type="submit"> Comment
                    </Button>
        </div>

        <div className={styles.commentBody}>
          <div className="p-1">
              <p>{post.username}</p>
              <p className={styles.commentText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis facere ipsam, dolorem fugit nobis quaerat. Molestiae earum harum fugit vero nostrum tenetur perspiciatis dolorem, reiciendis, facilis laboriosam mollitia aspernatur doloribus.</p>
          </div>
        </div>
        
      </Card.Body>
    </Card>
    ))}
        </Col>
      </Row>
    </Container>
  );
}
