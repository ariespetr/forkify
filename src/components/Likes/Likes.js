import React from "react";
import styles from "./Likes.module.css";
import svg from "../../assets/svg/sprite.svg";
import { truncateString } from "../../shared/utility";

const Likes = ({ likes, getRecipe }) => {
  return (
    <div className={styles.likes}>
      <div
        className={styles.likes__field}
        style={
          likes.length ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        <svg
          className={styles.likes__icon}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <use xlinkHref={`${svg}#icon-heart`}></use>
        </svg>
      </div>
      <div className={styles.likes__panel}>
        <ul className={styles.likes__list}>
          {likes.map((like, index) => {
            return (
              <li key={index}>
                <a
                  className={styles.likes__link}
                  href={`#${like.id}`}
                  onClick={(e) => getRecipe(e, like.id)}
                >
                  <figure className={styles.likes__fig}>
                    <img src={`${like.image_url}`} alt={`${like.title}`} />
                  </figure>
                  <div className={styles.likes__data}>
                    <h4
                      className={styles.likes__name}
                      dangerouslySetInnerHTML={{
                        __html: truncateString(like.title),
                      }}
                    ></h4>
                    <p className={styles.likes__author}>{like.publisher}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Likes;
