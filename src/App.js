import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Results from "./containers/Results/Results";
import Recipe from "./containers/Recipe/Recipe";
import ShoppingList from "./containers/ShoppingList/ShoppingList";
import { readStorage } from "./shared/utility";
import {
  INIT_LIKES,
  FETCH_RECIPE_START,
  FETCH_RECIPE_ERROR,
  FETCH_RECIPE_SUCCESS,
} from "../src/store/actionTypes";
import { getRecipe } from "./actions";
import { useStore } from "./store";

const App = () => {
  const state = useStore()[0];
  const dispatch = useStore(false)[1];

  useEffect(() => {
    const likesStorage = readStorage("likes");

    if (likesStorage.length > 0) {
      dispatch(INIT_LIKES, likesStorage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRecipeOnClickLike = async (event, recipeId) => {
    event.preventDefault();

    dispatch(FETCH_RECIPE_START);

    try {
      const res = await getRecipe(recipeId);

      if (res) {
        dispatch(FETCH_RECIPE_SUCCESS, res);
      }
    } catch (error) {
      dispatch(FETCH_RECIPE_ERROR, error.error);
    }
  };

  return (
    <Layout>
      <Header getRecipe={getRecipeOnClickLike} likes={state.likes.data} />
      <Results />
      <Recipe />
      <ShoppingList />
    </Layout>
  );
};

export default App;
