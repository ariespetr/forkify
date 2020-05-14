import React from "react";
import styles from "./Spinner.module.css";
import svg from "../../assets/svg/sprite.svg";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <use xlinkHref={`${svg}#icon-cw`}></use>
      </svg>
    </div>
  );
};

export default Spinner;
