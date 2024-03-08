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
    <div>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="12" className="mt-5">
            <MDBCard style={{ border: "none" }}>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol
                    sm="5"
                    className="mb-5 mb-sm-0"
                    style={{
                      marginLeft: "30px",
                      paddingLeft: "70px",
                    }}
                  >
                    <MDBCardImage
                      src={breedData.imageLink}
                      alt="Pet Breed Image"
                      fluid
                      style={{
                        borderRadius: "10px",
                        width: "350px",
                      }}
                    />
                  </MDBCol>
                  <MDBCol>
                    <MDBCard className={styles.breedDetails}>
                      <MDBRow>
                        <MDBCol style={{ marginLeft: "50px" }}>
                          <MDBCardTitle style={{ color: "#6cabd9" }}>
                            Breed
                          </MDBCardTitle>
                          <MDBCardText style={{ fontSize: "20px" }}>
                            {breedData.breedName}
                          </MDBCardText>
                          <MDBCardTitle style={{ color: "#6cabd9" }}>
                            Breed Group
                          </MDBCardTitle>
                          <MDBCardText style={{ fontSize: "20px" }}>
                            {breedData.breedGroup}
                          </MDBCardText>

                          <MDBCardTitle style={{ color: "#6cabd9" }}>
                            Life span
                          </MDBCardTitle>
                          <MDBCardText style={{ fontSize: "20px" }}>
                            {breedData.avgLifeSpan}years
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol>
                          <MDBCardTitle style={{ color: "#6cabd9" }}>
                            Avg Height
                          </MDBCardTitle>
                          <MDBCardText style={{ fontSize: "20px" }}>
                            {breedData.avgHeight}cm
                          </MDBCardText>
                          <MDBCardTitle style={{ color: "#6cabd9" }}>
                            Avg Weight
                          </MDBCardTitle>
                          <MDBCardText style={{ fontSize: "20px" }}>
                            {breedData.avgWeight}kg
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
