import React from "react";
import styles from "./ResultsList.module.css";
import { truncateString } from "../../shared/utility";

const ResultList = ({ recipes, getRecipe }) => {
  return (
    <ul className={styles.results__list}>
      {recipes.map((recipe, index) => {
        return (
          <li key={index}>
            <a
              onClick={(e) => getRecipe(e, recipe.recipe_id)}
              className={[styles.results__link].join(" ")}
              href={`#${recipe.recipe_id}`}
            >
              <figure className={styles.results__fig}>
                <img src={recipe.image_url} alt={recipe.title} />
              </figure>
              <div className={styles.results__data}>
                <h4
                  className={styles.results__name}
                  dangerouslySetInnerHTML={{
                    __html: truncateString(recipe.title),
                  }}
                ></h4>
                <p className={styles.results__author}>{recipe.publisher}</p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default ResultList;
