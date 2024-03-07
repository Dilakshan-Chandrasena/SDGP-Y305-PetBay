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
                        padding: "17px",
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "23px",
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
                          <MDBCardText>Date:</MDBCardText>
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
                          <MDBCardText>Time:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {lostFoundDetails.time}
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
                          <MDBCardText>Other Features:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {lostFoundDetails.features}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                    <MDBCardFooter
                      className="text-muted"
                      style={{ backgroundColor: "black", textAlign: "center" }}
                    >
                      <span style={{ color: "white", fontSize: "22px" }}>
                        If you have any information please call
                      </span>
                      <br />
                      <span style={{ color: "white", fontSize: "25px" }}>
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
