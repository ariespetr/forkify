import React from "react";
import svg from "../../../assets/svg/sprite.svg";

const FormButtonTemplate = ({ type, config, classes }) => {
  let formButtonTemplate;

  switch (type) {
    case "search-btn":
      formButtonTemplate = (
        <button className={classes.join(" ")}>
          <svg
            className="search__icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use xlinkHref={`${svg}#icon-magnifying-glass`}></use>
          </svg>
          <span>Search</span>
        </button>
      );
      break;
    case "results-btn-prev":
      formButtonTemplate = (
        <button
          className={classes.join(" ")}
          data-goto={config.page}
          onClick={(e) => config.onClick(e)}
          ref={config.ref}
        >
          <svg className="search__icon">
            <use href={`${svg}#icon-triangle-left`}></use>
          </svg>
          <span>Page {config.page}</span>
        </button>
      );
      break;
    case "results-btn-next":
      formButtonTemplate = (
        <button
          className={classes.join(" ")}
          data-goto={config.page}
          onClick={(e) => config.onClick(e)}
          ref={config.ref}
        >
          <span>Page {config.page}</span>
          <svg className="search__icon">
            <use href={`${svg}#icon-triangle-right`}></use>
          </svg>
        </button>
      );
      break;
    case "recipe-btn":
      formButtonTemplate = (
        <button
          className={classes.join(" ")}
          onClick={(e) => config.addToShoppingList(e)}
        >
          <svg className="search__icon">
            <use href={`${svg}#icon-shopping-cart`}></use>
          </svg>
          <span>Add to shopping list</span>
        </button>
      );
      break;
    case "recipe-dec-btn":
      formButtonTemplate = (
        <button
          className={classes.join(" ")}
          onClick={(event) => config.onClick(event, "dec")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use xlinkHref={`${svg}#icon-circle-with-minus`}></use>
          </svg>
        </button>
      );
      break;
    case "recipe-inc-btn":
      formButtonTemplate = (
        <button
          className={classes.join(" ")}
          onClick={(event) => config.onClick(event, "inc")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use xlinkHref={`${svg}#icon-circle-with-plus`}></use>
          </svg>
        </button>
      );
      break;
    case "recipe-like":
      formButtonTemplate = (
        <button
          className={classes.join(" ")}
          onClick={(e) => config.toggleLike(e)}
        >
          <svg
            className={config.svgClass.join(" ")}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use
              xlinkHref={`${svg}#icon-${
                config.isLiked ? "heart" : "heart-outlined"
              }`}
            ></use>
          </svg>
        </button>
      );
      break;
    case "shopping-list-btn-delete":
      formButtonTemplate = (
        <button
          className={classes.join(" ")}
          onClick={(e) => config.onClick(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use xlinkHref={`${svg}#icon-circle-with-cross`}></use>
          </svg>
        </button>
      );
      break;
    default:
      console.log("No type found");
      break;
  }

  return <>{formButtonTemplate}</>;
};

export default FormButtonTemplate;
