import styles from "./lostfound.module.css";
import Filters from "./Filters";
import { useState } from "react";
import NoticeCard from "./NoticeCard";

export default function LostFoundAlerts() {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <Filters />
            <NoticeCard />
          </div>
        </div>
      </div>
    </div>
  );
}
