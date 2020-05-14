import React from "react";
import styles from "./RecipeDirections.module.css";
import svg from "../../assets/svg/sprite.svg";

const RecipeDirections = ({ recipe }) => {
  return (
    <div className={styles.recipe__directions}>
      <h2 className="heading-2">How to cook it</h2>
      <p className={styles.recipe__directions__text}>
        This recipe was carefully designed and tested by
        <span>&nbsp;</span>
        <span className={styles.recipe__by}>{recipe.publisher}</span>. Please
        check out directions at their website.
      </p>
      <a className="btn-small recipe__btn" href={recipe.url}>
        <span>Directions</span>
        <svg className="search__icon">
          <use xlinkHref={`${svg}#icon-triangle-right`}></use>
        </svg>
      </a>
    </div>
  );
};

export default RecipeDirections;
