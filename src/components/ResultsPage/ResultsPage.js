import React from "react";
import styles from "./ResultsPage.module.css";

const ResultPage = ({ children }) => {
  return <div className={styles.results__pages}>{children}</div>;
};

export default ResultPage;
