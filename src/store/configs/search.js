import { initStore } from "..";
import { updateObject } from "../../shared/utility";

const initialState = {
  results: [],
  error: null,
  loading: false,
};

const configureStore = () => {
  const actions = {
    SEARCH_START: (globalState) => {
      return updateObject(globalState, {
        search: updateObject(globalState.search, {
          results: [],
          loading: true,
        }),
      });
    },
    SEARCH_SUCCESS: (globalState, newResults) => {
      return updateObject(globalState, {
        search: updateObject(globalState.search, {
          loading: false,
          error: null,
          results: globalState.search.results.concat(newResults),
        }),
      });
    },
    SEARCH_ERROR: (globalState, error) => {
      return updateObject(globalState, {
        search: updateObject(globalState.search, {
          loading: false,
          results: [],
          error,
        }),
      });
    },
  };

  initStore(actions, { search: initialState });
};

export default configureStore;
