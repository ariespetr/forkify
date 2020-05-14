import React from "react";
import styles from "./RecipeFig.module.css";

const RecipeFig = ({ recipe }) => {
  return (
    <figure className={styles.recipe__fig}>
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className={styles.recipe__img}
      />
      <h1 className={styles.recipe__title}>
        <span>{recipe.title}</span>
      </h1>
    </figure>
  );
};

export default RecipeFig;
