import React, { useState, useRef, useEffect } from "react";
import styles from "./Results.module.css";
import ResultsList from "../../components/ResultsList/ResultsList";
import ResultsPage from "../../components/ResultsPage/ResultsPage";
import FormButton from "../../components/FormButton/FormButton";
import Spinner from "../../components/Spinner/Spinner";
import {
  FETCH_RECIPE_START,
  FETCH_RECIPE_ERROR,
  FETCH_RECIPE_SUCCESS,
} from "../../store/actionTypes";
import { useStore } from "../../store";
import { updateObject } from "../../shared/utility";
import { getRecipe } from "../../actions";

const Results = () => {
  const state = useStore()[0];
  const dispatch = useStore()[1];

  const { results, loading } = state.search;

  let spinner = <Spinner />;

  const btnNextRef = useRef();
  const btnPrevRef = useRef();

  const [initialState, setInitialState] = useState({
    recipes: [],
    currentPage: 0,
    resultsPerPage: 0,
  });

  useEffect(() => {
    renderResults(results);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const renderResults = (results, page = 1, resultsPerPage = 10) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    const recipes = results.slice(start, end);

    setInitialState(
      updateObject(initialState, {
        recipes,
        currentPage: page,
        resultsPerPage,
      })
    );
  };

  const renderButtons = (page, numResults, resultPerPage) => {
    const pages = Math.ceil(numResults / resultPerPage);
    let paginationButtons;

    if (page === 1 && pages > 1) {
      // Only one button to go to the next page
      paginationButtons = (
        <>
          <span>&nbsp;</span>
          <FormButton
            config={{
              page: page + 1,
              ref: btnNextRef,
              onClick: gotoNextPage,
            }}
            classes={["btn-inline", "results__btn--next"]}
            type="results-btn-next"
          />
        </>
      );
    } else if (page < pages) {
      // Both buttons
      paginationButtons = (
        <>
          <FormButton
            config={{
              page: page - 1,
              ref: btnPrevRef,
              onClick: gotoPrevPage,
            }}
            classes={["btn-inline", "results__btn--prev"]}
            type="results-btn-prev"
          />
          <FormButton
            config={{
              page: page + 1,
              ref: btnNextRef,
              onClick: gotoNextPage,
            }}
            classes={["btn-inline", "results__btn--next"]}
            type="results-btn-next"
          />
        </>
      );
    } else if (page === pages && pages > 1) {
      // Only one button to go to the prev page
      paginationButtons = (
        <>
          <FormButton
            config={{
              page: page - 1,
              ref: btnPrevRef,
              onClick: gotoPrevPage,
            }}
            classes={["btn-inline", "results__btn--prev"]}
            type="results-btn-prev"
          />
          <span>&nbsp;</span>
        </>
      );
    }

    return paginationButtons;
  };

  const gotoPrevPage = (event) => {
    event.preventDefault();
    const page = btnPrevRef.current.getAttribute("data-goto");
    renderResults(results, parseInt(page, 10));
  };

  const gotoNextPage = (event) => {
    event.preventDefault();
    const page = btnNextRef.current.getAttribute("data-goto");
    renderResults(results, parseInt(page, 10));
  };

  const onClickResultListHandler = async (event, resultId) => {
    event.preventDefault();

    dispatch(FETCH_RECIPE_START);

    try {
      const res = await getRecipe(resultId);

      if (res) {
        dispatch(FETCH_RECIPE_SUCCESS, res);
      }
    } catch (error) {
      dispatch(FETCH_RECIPE_ERROR, error.error);
    }
  };

  return (
    <div className={styles.results}>
      {loading ? (
        spinner
      ) : (
        <ResultsList
          getRecipe={onClickResultListHandler}
          recipes={initialState.recipes}
        />
      )}
      <ResultsPage>
        {renderButtons(
          initialState.currentPage,
          results.length,
          initialState.resultsPerPage
        )}
      </ResultsPage>
    </div>
  );
};

export default Results;
