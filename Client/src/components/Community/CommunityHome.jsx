import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./community.module.css";
import "./community.module.css";
import axios from "axios";

export default function CommunityPage() {
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  const [point, setPoint] = useState(0);
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState({
    commentId: "",
    commentText: "",
    commentUser: "",
  });
  const { userId } = useParams();
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    id: "",
    username: "",
    dateTime: "",
    text: "",
    comments: [],
  });

  // Function to handle form submission
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      await axios
        .post(
          `${base_url}/petbay/api/v1/community/addCommunityPost/${userId}`,
          values
        )
        .then(async (res) => {
          await getPosts();
          setValues({ ...values, text: '' });
        })
        .catch((err) => console.log(err));
      setValidated(true);
    }
  };

  useEffect(() => {
    getPosts();
    getComments();
  }, []);

  // Function to get all the community posts
  const getPosts = async () => {
    await axios
      .get(`${base_url}/petbay/api/v1/community/feed`)
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          setData(data);
          let value = point + 1
          setPoint(value);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Function to get all post comments
  const getComments = async () => {
    await axios
      .get(`${base_url}/petbay/api/v1/community/getComments`)
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          setCommentData(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Function to handle comment submission
  const handleCommentSubmit = async (postId) => {
    console.log(comment)
    if (comment.commentText == "") {
      alert("Please add a comment")
    }else{
      comment.commentId = postId;
      await axios
        .post(
          `${base_url}/petbay/api/v1/community/addComment/${userId}`,
          comment
        )
        .then(async (res) => {
          await getPosts();
          setComment({ ...comment, commentText: '' });
        })
        .catch((err) => console.log(err));
      setValidated(true);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="bg-light border-right"></Col>
        <Col sm={6} className={styles.communityPosts}>
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
          <Card className={styles.createPost}>
            <Card.Body className={styles.postBody}>
              <Card.Title className="mb-3">Create Post</Card.Title>
              <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="createPostForm">
                  <Form.Control
                    required
                    className={styles.postField}
                    type="text"
                    placeholder="What's on your mind?"
                    onChange={(e) =>
                      setValues({ ...values, text: e.target.value })
                    }
                    controlId="validationCustom01"
                  />
                  <Form.Control.Feedback type="invalid">
                    This field can't be empty
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                <p hidden>{post.id}</p>
                <Card.Title className={styles.title}>
                  {post.username}
                </Card.Title>
                <Card.Text className={styles.subtitle}>
                  {post.dateTime}
                </Card.Text>
                <Card.Text className={styles.postText}>{post.text}</Card.Text>
                <div className="d-flex text-center">
                  <Button
                   className={styles.likeButton}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </Button>
                    <Form.Control
                      required
                      className={styles.commentField}
                      type="text"
                      placeholder="Add your comment here..."
                      id = "comment"
                      onChange={(e) =>
                        setComment({ ...comment, commentText: e.target.value })
                      }
                    />
                    <Button className={styles.commentButton} type="submit"
                     onClick={() => handleCommentSubmit(post.id)}> 
                      Comment
                    </Button>
                </div>
                {post.comments.map((postComments) => (
                  <div className={styles.commentBody}>
                    <div className="p-1">
                      <p className={styles.commentUser}>
                        {postComments.commentUser}
                      </p>
                      <p className={styles.commentText}>
                        {postComments.commentText}
                      </p>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
