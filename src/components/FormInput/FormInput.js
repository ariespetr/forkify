import React from "react";
import FormInputTemplate from "./FormInputTemplate/FormInputTemplate";

const FormInput = (props) => {
  let inputElement = null;
  let inputTemplate = null;
  let inputClassError = ["has-error"];
  let labelClassError = ["has-error"];
  let classesArray;

  if (props.invalid && props.shouldValidate) {
    const shouldPushInputClassError = inputClassError.every((error) =>
      props.inputClasses.includes(error)
    );
    !shouldPushInputClassError && props.inputClasses.push("has-error");

    const shouldPushLabelClassError =
      props.labelClasses &&
      labelClassError.every((error) => props.labelClasses.includes(error));
    !shouldPushLabelClassError &&
      props.labelClasses &&
      props.labelClasses.push("has-error");

 
  } else {
    classesArray =
      props.inputClasses && props.labelClasses
        ? props.inputClasses.concat(props.labelClasses)
        : props.inputClasses;
    const hasErrorClassIndex = classesArray.findIndex(
      (classes) => classes === "has-error"
    );

    if (hasErrorClassIndex !== -1) {
      props.inputClasses && props.inputClasses.splice(hasErrorClassIndex);
      props.labelClasses && props.labelClasses.splice(hasErrorClassIndex);
    }
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={props.inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.write}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={props.inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.write}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={props.inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.write}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.display}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={props.inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.write}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
      );
  }

  switch (props.type) {
    case "search":
      inputTemplate = (
        <FormInputTemplate type={props.type} inputElement={inputElement} />
      );
      break;
    case "shopping-list-count":
      inputTemplate = (
        <FormInputTemplate
          type={props.type}
          parentClasses={props.parentClasses}
          inputElement={inputElement}
        />
      );
      break;
    default:
      console.log("No type found");
  }

  return <>{inputTemplate}</>;
};

export default FormInput;
