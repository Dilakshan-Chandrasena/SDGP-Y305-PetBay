import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./lostfound.module.css";
import "./custom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddPost from "./AddLostFoundModal";

function Filters() {
  return (
    <div className={styles.filterContainer}>
      <AddPost />
      <div className={styles.tabsContainer}>
        <Tabs
          defaultActiveKey="all"
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
