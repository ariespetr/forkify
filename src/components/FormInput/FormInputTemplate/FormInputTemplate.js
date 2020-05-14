import React from "react";

const FormInputTemplate = ({ type, inputElement, parentClasses }) => {
  let formInputTemplate;

  switch (type) {
    case "search":
      formInputTemplate = inputElement;
      break;
    case "shopping-list-count":
      formInputTemplate = inputElement;
      break;
    default:
      console.log("No type found");
      break;
  }

  return <>{formInputTemplate}</>;
};

export default FormInputTemplate;
