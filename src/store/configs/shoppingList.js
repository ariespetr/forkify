import { initStore } from "../";
import { updateObject } from "../../shared/utility";

const initialState = {
  items: [],
};

const configureStore = () => {
  const actions = {
    ADD_SHOPPING_LIST_ITEM: (globalState, item) => {
      return updateObject(globalState, {
        shoppingList: updateObject(globalState.shoppingList, {
          items: [...globalState.shoppingList.items, ...item],
        }),
      });
    },
    REMOVE_SHOPPING_LIST_ITEM: (globalState, newItems) => {
      return updateObject(globalState, {
        shoppingList: updateObject(globalState.shoppingList, {
          items: [...newItems],
        }),
      });
    },
    UPDATE_SHOPPING_LIST_ITEM_COUNT: (globalState, newItems) => {
      return updateObject(globalState, {
        shoppingList: updateObject(globalState.shoppingList, {
          items: [...newItems],
        }),
      });
    },
  };

  initStore(actions, { shoppingList: initialState });
};

export default configureStore;
