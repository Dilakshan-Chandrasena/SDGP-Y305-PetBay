import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import styles from "./recommendation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function ComparisonTable({ comparisonResults }) {
  if (!comparisonResults || comparisonResults.length === 0) {
    return (
      <div className={styles.tabContent}>
        <p>No comparison results available.</p>
      </div>
    );
  }

  const renderIcon = (matchingPercentage) => {
    if (matchingPercentage >= 80) {
      return (
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ color: "green", fontSize: "25px", marginLeft: "10px" }}
        />
      );
    } else if (matchingPercentage >= 60 || matchingPercentage >= 40) {
      return (
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ color: "orange", fontSize: "25px", marginLeft: "10px" }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          style={{ color: "red", fontSize: "25px", marginLeft: "10px" }}
        />
      );
    }
  };

  return (
    <>
      <section className={`border p-4 mb-4 ${styles.tabContent}`}>
        <MDBTable responsive className={styles.tableNoBorder}>
          <MDBTableHead>
            <tr>
              <th scope="col">Characteristics</th>
              <th scope="col" className="text-center">
                User Ratings
              </th>
              <th scope="col" className="text-center">
                Breed Ratings
              </th>
              <th scope="col" style={{ textAlign: "right" }}>
                Matching
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {comparisonResults.map((result, index) => (
              <tr key={index}>
                <td>{result.characteristic}</td>
                <td className="text-center">
                  <span className={styles.ratings}>
                    {result.userPreferenceRating}
                  </span>
                </td>
                <td className="text-center">
                  <span className={styles.ratings}>
                    {result.breedCharacteristicRating}
                  </span>
                </td>
                <td style={{ textAlign: "right" }} className="text-xl-end">
                  <div className="d-flex justify-content-xl-end align-items-center">
                    {result.matchingPercentage}
                    {renderIcon(result.matchingPercentage)}
                  </div>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </section>
    </>
  );
}
