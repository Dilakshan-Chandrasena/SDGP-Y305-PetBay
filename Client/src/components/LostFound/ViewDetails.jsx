import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./lostfound.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBCardFooter,
  MDBRipple,
  MDBBadge,
  MDBCardHeader,
  MDBTypography,
} from "mdb-react-ui-kit";

function ViewDetails({ postId }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [lostFoundDetails, setLostFoundDetails] = useState({});

  function handleShowModal(breakpoint) {
    0;
    setFullscreen(breakpoint);
    setShow(true);
  }

  useEffect(() => {
    getPostById(postId);
  }, []);

  const getPostById = async (postId) => {
    await axios
      .get(
        `http://localhost:8080/petbay/api/v1/lost-found/post-details/${postId}`
      )
      .then((res) => {
        setLostFoundDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Button
        onClick={() => handleShowModal(true)}
        variant="outline-primary"
        className={`mx-auto ${styles.viewButton}`}
      >
        View Details
      </Button>{" "}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {" "}
          <section className={styles.section}>
            <MDBContainer className="py-5">
              <MDBRow>
                <MDBCol>
                  <h2 className={styles.heading}>
                    {lostFoundDetails.status === "lost"
                      ? "MISSING PET"
                      : "FOUND PET"}
                  </h2>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard>
                    <MDBCardHeader
                      style={{
                        backgroundColor: "black",
                        textAlign: "center",
                        padding: "22px",
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "25px",
                          textTransform: "uppercase",
                        }}
                      >
                        {lostFoundDetails.name}
                      </span>
                    </MDBCardHeader>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image hover-overlay"
                    >
                      <MDBCardImage
                        src={lostFoundDetails.lostFoundImageURL}
                        style={{ width: "100%" }}
                        fluid
                        alt="..."
                      />
                      <a>
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        ></div>
                      </a>
                    </MDBRipple>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Breed:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {lostFoundDetails.breed}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Color:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {lostFoundDetails.color}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Height</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {lostFoundDetails.height}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Lost Date & Time:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {lostFoundDetails.date}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Area:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {lostFoundDetails.area}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Other features:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            <MDBBadge
                              pill
                              light
                              style={{
                                color: "#1c657d",
                                backgroundColor: "#def1f7",
                              }}
                            >
                              Male
                            </MDBBadge>
                            <MDBBadge
                              className="mx-2"
                              pill
                              light
                              style={{
                                color: "#1c657d",
                                backgroundColor: "#def1f7",
                              }}
                            >
                              Wooden Tag
                            </MDBBadge>
                            <MDBBadge
                              className="mx-2"
                              pill
                              light
                              style={{
                                color: "#1c657d",
                                backgroundColor: "#def1f7",
                              }}
                            >
                              Black Collar
                            </MDBBadge>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCardBody className="text-center">
                          <MDBBadge
                            className="mx-2"
                            pill
                            light
                            style={{
                              color: "#4E7E1C",
                              backgroundColor: "#C4F493",
                              padding: "10px",
                              width: "200px",
                              fontSize: "20px",
                              marginTop: "20px",
                            }}
                          >
                            <FontAwesomeIcon icon={faSackDollar} /> Reward 50$
                          </MDBBadge>
                        </MDBCardBody>
                      </MDBRow>
                    </MDBCardBody>
                    <MDBCardFooter
                      className="text-muted"
                      style={{ backgroundColor: "black", textAlign: "center" }}
                    >
                      <span style={{ color: "white" }}>
                        If you have any information please call
                      </span>
                      <br />
                      <span style={{ color: "white" }}>
                        {lostFoundDetails.contact}
                      </span>
                    </MDBCardFooter>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewDetails;
