import React from "react";
import styles from "./recommendation.module.css";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

export default function BreedDetails({ breedData }) {
  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="9" lg="7" xl="12" className="mt-5">
          <MDBCard style={{ border: "none" }}>
            <MDBCardBody className="p-4">
              <MDBRow>
                <MDBCol sm="5" lg="4">
                  {/* Display the breed image */}
                  <MDBCardImage
                    src={breedData.imageLink}
                    alt="Pet Breed Image"
                    fluid
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                      maxWidth: "350px",
                    }}
                  />
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className={styles.breedDetails}>
                    <MDBCardBody>
                      {/* Display breed name */}
                      <MDBRow className="mb-4">
                        <MDBCol>
                          <MDBCardTitle
                            className="mb-2"
                            style={{ color: "#6cabd9" }}
                          >
                            Breed
                          </MDBCardTitle>
                          <MDBCardText
                            className="mb-3"
                            style={{
                              fontSize: "20px",
                              textTransform: "capitalize",
                            }}
                          >
                            {breedData.breedName}
                          </MDBCardText>
                        </MDBCol>
                        {/* Display average height */}
                        <MDBCol>
                          <MDBCardTitle
                            className="mb-2"
                            style={{ color: "#6cabd9" }}
                          >
                            Avg Height
                          </MDBCardTitle>
                          <MDBCardText
                            className="mb-3"
                            style={{ fontSize: "20px" }}
                          >
                            {breedData.avgHeight} cm
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      {/* Display breed group */}
                      <MDBRow className="mb-4">
                        <MDBCol>
                          <MDBCardTitle
                            className="mb-2"
                            style={{ color: "#6cabd9" }}
                          >
                            Breed Group
                          </MDBCardTitle>
                          <MDBCardText
                            className="mb-3"
                            style={{ fontSize: "20px" }}
                          >
                            {breedData.breedGroup}
                          </MDBCardText>
                        </MDBCol>
                        {/* Display average weight */}
                        <MDBCol>
                          <MDBCardTitle
                            className="mb-2"
                            style={{ color: "#6cabd9" }}
                          >
                            Avg Weight
                          </MDBCardTitle>
                          <MDBCardText
                            className="mb-3"
                            style={{ fontSize: "20px" }}
                          >
                            {breedData.avgWeight} kg
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      {/* Display average lifespan */}
                      <div className="mb-4">
                        <MDBCardTitle
                          className="mb-2"
                          style={{ color: "#6cabd9" }}
                        >
                          Life Span
                        </MDBCardTitle>
                        <MDBCardText
                          className="mb-3"
                          style={{ fontSize: "20px" }}
                        >
                          {breedData.avgLifeSpan} years
                        </MDBCardText>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
