import React from "react";
import styles from "./RecipeIngredientsList.module.css";
import { formatCount } from "../../../shared/utility";
import svg from "../../../assets/svg/sprite.svg";

const RecipeIngredientsList = ({ ingredients }) => {
  return (
    <ul className={styles.recipe__ingredient__list}>
      {ingredients.map((ing, index) => {
        return (
          <li key={index} className={styles.recipe__item}>
            <svg
              className={styles.recipe__icon}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <use xlinkHref={`${svg}#icon-check`}></use>
            </svg>
            <div className={styles.recipe__count}>{formatCount(ing.count)}</div>
            <div className={styles.recipe__ingredient}>
              <span className={styles.recipe__unit}>{ing.unit}</span>
              <span>&nbsp;</span>
              {ing.ingredient}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RecipeIngredientsList;
