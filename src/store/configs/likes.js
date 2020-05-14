import { initStore } from "../";
import { updateObject } from "../../shared/utility";

const initialState = {
  data: [],
};

const configureStore = () => {
  const actions = {
    INIT_LIKES: (globalState, likes) => {
      return updateObject(globalState, {
        likes: updateObject(globalState.likes, {
          data: [...globalState.likes.data, ...likes],
        }),
      });
    },
    ADD_LIKE: (globalState, like) => {
      return updateObject(globalState, {
        likes: updateObject(globalState.likes, {
          data: [...globalState.likes.data, like],
        }),
      });
    },
    REMOVE_LIKE: (globalState, newLikes) => {
      return updateObject(globalState, {
        likes: updateObject(globalState.likes, {
          data: [...newLikes],
        }),
      });
    },
  };

  initStore(actions, { likes: initialState });
};

export default configureStore;
