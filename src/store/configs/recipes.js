import { initStore } from "..";
import { updateObject, evaluateInput } from "../../shared/utility";

const initialState = {
  recipe: {},
  error: null,
  loading: false,
};

const calcTime = (ingredients) => {
  const numberOfIngredients = ingredients.length;
  const periods = Math.ceil(numberOfIngredients / 3);

  const time = periods * 15;

  return time;
};

const calcServings = () => {
  const servings = 4;

  return servings;
};

const parseIngredients = (ingredients) => {
  const unitsLong = [
    "tablespoons",
    "tablespoon",
    "ounces",
    "ounce",
    "teaspoons",
    "teaspoon",
    "cups",
    "pounds",
  ];

  const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound"];

  const units = [...unitsShort, "kg", "g"];

  const newIngredients = ingredients.map((ing) => {
    // Uniform units
    let ingredient = ing.toLowerCase();

    unitsLong.forEach((unit, i) => {
      ingredient = ingredient.replace(unit, unitsShort[i]);
    });

    // Remove parentheses
    ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

    // Parse ingredients into count, unit and ingrdient
    const arrIng = ingredient.split(" ");
    const unitIndex = arrIng.findIndex((index) => units.includes(index));

    let ingredientObj;

    if (unitIndex > -1) {
      // There is a unit
      const arrCount = arrIng.slice(0, unitIndex);
      let count;

      if (arrCount.length === 1) {
        count = evaluateInput(arrIng[0].replace("-", "+"));
      } else {
        count = evaluateInput(arrIng.slice(0, unitIndex).join("+"));
      }

      ingredientObj = {
        count,
        unit: arrIng[unitIndex],
        ingredient: arrIng.slice(unitIndex + 1).join(" "),
      };
    } else if (parseInt(arrIng[0], 10)) {
      // No unit but first element is a number
      ingredientObj = {
        count: parseInt(arrIng[0], 10),
        unit: "",
        ingredient: arrIng.slice(1).join(" "),
      };
    } else if (unitIndex === -1) {
      // No unit
      ingredientObj = {
        count: 1,
        unit: "",
        ingredient,
      };
    }

    return ingredientObj;
  });

  return newIngredients;
};

const configureStore = () => {
  const actions = {
    FETCH_RECIPE_START: (globalState) => {
      return updateObject(globalState, {
        recipes: updateObject(globalState.recipes, {
          recipe: {},
          loading: true,
        }),
      });
    },
    FETCH_RECIPE_SUCCESS: (globalState, newRecipe) => {
      const parsedRecipe = {};

      parsedRecipe.id = newRecipe.recipe.recipe_id;
      parsedRecipe.title = newRecipe.recipe.title;
      parsedRecipe.image_url = newRecipe.recipe.image_url;
      parsedRecipe.publisher = newRecipe.recipe.publisher;
      parsedRecipe.url = newRecipe.recipe.source_url;
      parsedRecipe.time = calcTime(newRecipe.recipe.ingredients);
      parsedRecipe.servings = calcServings();
      parsedRecipe.ingredients = parseIngredients(newRecipe.recipe.ingredients);

      return updateObject(globalState, {
        recipes: updateObject(globalState.recipes, {
          recipe: { ...globalState.recipes.recipe, ...parsedRecipe },
          loading: false,
        }),
      });
    },
    FETCH_RECIPE_ERROR: (globalState, error) => {
      return updateObject(globalState, {
        recipes: updateObject(globalState.recipes, {
          recipe: {},
          loading: false,
          error,
        }),
      });
    },
    UPDATE_RECIPE_SERVINGS: (globalState, servings) => {
      const newIngredients = globalState.recipes.recipe.ingredients.map(
        (ing) => {
          ing.count *= servings / globalState.recipes.recipe.servings;

          return ing;
        }
      );

      const updatedRecipe = updateObject(globalState.recipes.recipe, {
        ingredients: [...newIngredients],
        servings,
      });

      return updateObject(globalState, {
        recipes: updateObject(globalState.recipes, {
          recipe: updatedRecipe,
        }),
      });
    },
  };

  initStore(actions, { recipes: initialState });
};

export default configureStore;
