import React, { useState } from "react";
import styles from "./recommendation.module.css";
import ComparisonTable from "./ComparisonTable";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

export default function Tabs({ breedData }) {
  // State to manage active tab
  const [iconsActive, setIconsActive] = useState("tab1");

  // Function to handle tab click
  const handleIconsClick = (value) => {
    if (value === iconsActive) {
      return;
    }
    setIconsActive(value);
  };

  return (
    <div>
      {/* Render tabs */}
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="12" className="mt-5">
            <MDBTabs className="mb-3">
              <MDBTabsItem>
                {/* Details Tab */}
                <MDBTabsLink
                  onClick={() => handleIconsClick("tab1")}
                  active={iconsActive === "tab1"}
                  style={{
                    backgroundColor:
                      iconsActive === "tab1" ? "#EEEEEE" : "white",
                    color: iconsActive === "tab1" ? "#6CABD9" : "black",
                  }}
                >
                  Details
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                {/* Comparison Tab */}
                <MDBTabsLink
                  onClick={() => handleIconsClick("tab2")}
                  active={iconsActive === "tab2"}
                  style={{
                    backgroundColor:
                      iconsActive === "tab2" ? "#EEEEEE" : "white",
                    color: iconsActive === "tab2" ? "#6CABD9" : "black",
                  }}
                >
                  Comparison
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            {/* Render tab content */}
            <MDBTabsContent>
              <MDBTabsPane open={iconsActive === "tab1"}>
                {/* Details Tab Content */}
                <div className={styles.tabContent}>
                  <p className={styles.details}>{breedData.description}</p>
                </div>
              </MDBTabsPane>
              <MDBTabsPane open={iconsActive === "tab2"}>
                {/* Comparison Tab Content */}
                <ComparisonTable
                  comparisonResults={breedData.comparisonResults}
                />
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
