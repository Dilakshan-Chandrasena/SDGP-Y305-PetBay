import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./lostfound.module.css";
import image1 from "../../assets/images/dogs/dog1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

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

function ViewDetails() {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShowModal(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
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
                  <h2 className={styles.heading}>MISSING DOG</h2>
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
                      <span style={{ color: "white", fontSize: "25px" }}>
                        ROBIN
                      </span>
                    </MDBCardHeader>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image hover-overlay"
                    >
                      <MDBCardImage
                        src={image1}
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
                            Pomsky
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
                            Black + White
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
                            24.13cm
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
                            28/12/2023 15:44
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
                            Bay Area, San Francisco, CA
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
                      <span style={{ color: "white" }}>+123 456 7890</span>
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
