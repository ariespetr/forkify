import axios from "../axios";

const rejectPromise = (err) => {
  let error = {};

  if (err && err.response && err.response.data) {
    error = err.response.data;
  } else {
    error = err;
  }

  return Promise.reject(error);
};

export const searchRecipe = async (query) => {
  return await axios
    .get(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
    .then((res) => res.data)
    .catch((err) => rejectPromise(err));
};

export const getRecipe = async (recipeId) => {
  return await axios
    .get(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
    .then((res) => res.data)
    .catch((err) => rejectPromise(err));
};
