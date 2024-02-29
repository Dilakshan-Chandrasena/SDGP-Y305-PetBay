import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./lostfound.module.css";
import "./custom.css";
import { useState } from "react";

function Filters({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter); // Notify parent component about the filter change
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.tabsContainer}>
        <Tabs
          activeKey={activeFilter}
          onSelect={handleFilterChange}
          transition={false}
          id="noanim-tab-example"
          className={`mb-3 justify-content-end ${styles.customTabs}`}
        >
          <Tab eventKey="all" title="All"></Tab>
          <Tab eventKey="lost" title="Lost"></Tab>
          <Tab eventKey="found" title="Found"></Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Filters;
