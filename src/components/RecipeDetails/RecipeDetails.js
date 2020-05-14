import React from "react";
import styles from "./RecipeDetails.module.css";
import svg from "../../assets/svg/sprite.svg";

import FormButton from "../FormButton/FormButton";

const RecipeDetails = ({ recipe, updateServings, toggleLike }) => {
  return (
    <div className={styles.recipe__details}>
      <div className={styles.recipe__info}>
        <svg
          className={styles.recipe__info__icon}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <use xlinkHref={`${svg}#icon-stopwatch`}></use>
        </svg>
        <span
          className={[
            styles.recipe__info__data,
            styles.recipe__info__data__minutes,
          ].join(" ")}
        >
          {recipe.time}
        </span>
        <span className={styles.recipe__info__text}> minutes</span>
      </div>
      <div className={styles.recipe__info}>
        <svg
          className={styles.recipe__info__icon}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <use xlinkHref={`${svg}#icon-man`}></use>
        </svg>
        <span
          className={[
            styles.recipe__info__data,
            styles.recipe__info__data__people,
          ].join(" ")}
        >
          {recipe.servings}
        </span>
        <span className={styles.recipe__info__text}> servings</span>
        <div className={styles.recipe__info__buttons}>
          <FormButton
            config={{ onClick: updateServings }}
            type="recipe-dec-btn"
            classes={["btn-tiny"]}
          />
          <FormButton
            config={{ onClick: updateServings }}
            type="recipe-inc-btn"
            classes={["btn-tiny"]}
          />
        </div>
      </div>
      <FormButton
        config={{
          svgClass: [styles.header__likes],
          toggleLike: toggleLike,
          isLiked: recipe.isLiked,
        }}
        type="recipe-like"
        classes={[styles.recipe__love]}
      />
    </div>
  );
};

export default RecipeDetails;
