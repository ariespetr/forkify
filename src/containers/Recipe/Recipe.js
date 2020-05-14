import React from "react";
import styles from "./Recipe.module.css";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import RecipeIngredients from "../../components/RecipeIngredients/RecipeIngredients";
import RecipeFig from "../../components/RecipeFig/RecipeFig";
import RecipeDirections from "../../components/RecipeDirections/RecipeDirections";
import Spinner from "../../components/Spinner/Spinner";
import {
  UPDATE_RECIPE_SERVINGS,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_SHOPPING_LIST_ITEM,
} from "../../store/actionTypes";
import { persistData, generateId } from "../../shared/utility";
import { useStore } from "../../store";

const Recipe = () => {
  const state = useStore()[0];
  const dispatch = useStore(false)[1];

  const { recipe, loading } = state.recipes;

  let spinner = <Spinner />;

  const updateServings = (event, type) => {
    event.preventDefault();

    let newServings;

    if (type === "dec" && recipe.servings !== 1) {
      newServings = recipe.servings - 1;

      dispatch(UPDATE_RECIPE_SERVINGS, newServings);
    } else if (type === "inc") {
      newServings = recipe.servings + 1;

      dispatch(UPDATE_RECIPE_SERVINGS, newServings);
    }
  };

  const renderRecipe = () => {
    let html = <span>&nbsp;</span>;

    if (recipe.hasOwnProperty("title")) {
      html = (
        <>
          <RecipeFig
            recipe={{ title: recipe.title, image_url: recipe.image_url }}
          />
          <RecipeDetails
            toggleLike={toggleLike}
            updateServings={updateServings}
            recipe={{
              time: recipe.time,
              servings: recipe.servings,
              isLiked: isLiked(state.likes.data, recipe.id) ? true : false,
            }}
          />
          <RecipeIngredients
            addItem={addItemToShoppingList}
            recipe={{ ingredients: recipe.ingredients }}
          />
          <RecipeDirections
            recipe={{ url: recipe.url, publisher: recipe.publisher }}
          />
        </>
      );
    }

    return html;
  };

  const isLiked = () => {
    return state.likes.data.findIndex((like) => like.id === recipe.id) !== -1;
  };

  const addLike = () => {
    const currentLikes = state.likes.data;

    let like = {};

    like.id = recipe.id;
    like.title = recipe.title;
    like.publisher = recipe.publisher;
    like.image_url = recipe.image_url;

    persistData("likes", [...currentLikes, like]);

    dispatch(ADD_LIKE, like);
  };

  const removeLike = () => {
    const currentLikes = state.likes.data;
    const index = currentLikes.findIndex((like) => like.id === recipe.id);

    currentLikes.splice(index, 1);

    persistData("likes", currentLikes);

    dispatch(REMOVE_LIKE, currentLikes);
  };

  const toggleLike = (event) => {
    event.preventDefault();

    if (!isLiked()) {
      addLike();
    } else {
      removeLike();
    }
  };

  const addItemToShoppingList = () => {
    const items = recipe.ingredients.map((ing) => {
      const item = {};
      item.id = generateId();
      item.count = ing.count;
      item.unit = ing.unit;
      item.ingredient = ing.ingredient;

      return item;
    });

    dispatch(ADD_SHOPPING_LIST_ITEM, items);
  };

  return (
    <div className={styles.recipe}>{loading ? spinner : renderRecipe()}</div>
  );
};

export default Recipe;
