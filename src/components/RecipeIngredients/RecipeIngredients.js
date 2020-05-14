import React from "react";
import RecipeIngredientsList from "./RecipeIngredientsList/RecipeIngredientsList";
import FormButton from "../FormButton/FormButton";

import styles from "./RecipeIngredients.module.css";

const RecipeIngredients = ({ recipe, addItem, removeItem }) => {
  return (
    <div className={styles.recipe__ingredients}>
      <RecipeIngredientsList removeItem={removeItem} ingredients={recipe.ingredients} />
      <FormButton
        type="recipe-btn"
        classes={["btn-small", "recipe__btn"]}
        config={{ addToShoppingList: addItem }}
      />
    </div>
  );
};

export default RecipeIngredients;
