import React, { useState } from "react";
import { updateObject, checkFormValidity } from "../../shared/utility";
import FormInput from "../../components/FormInput/FormInput";
import styles from "./Search.module.css";
import FormButton from "../../components/FormButton/FormButton";
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
} from "../../store/actionTypes";
import { useStore } from "../../store";
import { searchRecipe } from "../../actions";

const Search = () => {
  const dispatch = useStore(false)[1];

  const [formControls, setFormControls] = useState({
    search: {
      label: {
        title: "",
        classes: [],
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Search over 1,000,000 recipes...",
      },
      elementClasses: [styles.search__field],
      parentClasses: [],
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const inputChangeHandler = (event, formControlKey) => {
    const updatedFormControls = updateObject(formControls, {
      [formControlKey]: updateObject(formControls[formControlKey], {
        value: event.target.value,
        valid: checkFormValidity(
          event.target.value,
          formControls[formControlKey].validation
        ),
        touched: true,
      }),
    });

    setFormControls(updatedFormControls);
  };

  let formElementsArray = [];

  for (let key in formControls) {
    formElementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  let formInput = formElementsArray.map((formElement) => (
    <FormInput
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      inputClasses={formElement.config.elementClasses}
      value={formElement.config.value}
      write={(event) => inputChangeHandler(event, formElement.id)}
      shouldValidate={formElement.config.validation}
      invalid={formElement.config.touched && !formElement.config.valid}
      label={formElement.config.label.title}
      labelClasses={formElement.config.label.classes}
      parentClasses={formElement.config.parentClasses}
      type="search"
    />
  ));

  let buttonClasses = ["btn", "search__btn"];

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const isValid = formControls.search.valid;

    if (isValid) {
      dispatch(SEARCH_START);

      try {
        const res = await searchRecipe(formControls.search.value);

        if (res) {
          dispatch(SEARCH_SUCCESS, res.recipes);

          setFormControls(
            updateObject(formControls, {
              search: updateObject(formControls.search, {
                value: "",
                valid: false,
                touched: false,
              }),
            })
          );
        }
      } catch (error) {
        dispatch(SEARCH_ERROR, error.error);
      }
    }
  };

  return (
    <form onSubmit={(e) => submitFormHandler(e)} className={styles.search}>
      {formInput}
      <FormButton type="search-btn" classes={buttonClasses} />
    </form>
  );
};

export default React.memo(Search);
