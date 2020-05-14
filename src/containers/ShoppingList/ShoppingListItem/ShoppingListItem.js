import React, { useState, useRef } from "react";
import styles from "./ShoppingListItem.module.css";
import FormButton from "../../../components/FormButton/FormButton";
import FormInput from "../../../components/FormInput/FormInput";
import { checkFormValidity, updateObject } from "../../../shared/utility";
import {
  REMOVE_SHOPPING_LIST_ITEM,
  UPDATE_SHOPPING_LIST_ITEM_COUNT,
} from "../../../store/actionTypes";
import { useStore } from "../../../store";

const ShoppingListItem = ({ item, items }) => {
  const dispatch = useStore(false)[1];

  const inputRef = useRef();

  const [formControls, setFormControls] = useState({
    count: {
      label: {
        title: "",
        classes: [],
      },
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "",
        step: item.count,
        min: item.count,
        ref: inputRef,
      },
      elementClasses: [],
      parentClasses: [],
      value: item.count,
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
        value: parseFloat(event.target.value, 10),
        valid: checkFormValidity(
          event.target.value,
          formControls[formControlKey].validation
        ),
        touched: true,
      }),
    });

    setFormControls(updatedFormControls);
    updateItemCount();
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
      type="shopping-list-count"
    />
  ));

  const removeItem = (event) => {
    event.preventDefault();

    const currentItems = items;
    const index = currentItems.findIndex((curr) => curr.id === item.id);

    currentItems.splice(index, 1);

    dispatch(REMOVE_SHOPPING_LIST_ITEM, currentItems);
  };

  const updateItemCount = () => {
    const currItems = items;
    const currItem = item;

    const index = currItems.findIndex((item) => item.id === currItem.id);

    const newCount = parseFloat(inputRef.current.value, 10);
    currItem.count = newCount;

    currItems.splice(index, 1, currItem);

    dispatch(UPDATE_SHOPPING_LIST_ITEM_COUNT, currItems);
  };

  return (
    <li className={styles.shopping__item}>
      <div className={styles.shopping__count}>
        {formInput}
        <p>{item.unit}</p>
      </div>
      <p className={styles.shopping__description}>{item.ingredient}</p>
      <FormButton
        type="shopping-list-btn-delete"
        classes={[styles.shopping__delete, "btn-tiny"]}
        config={{ onClick: removeItem }}
      />
      <span>&nbsp;</span>
    </li>
  );
};

export default ShoppingListItem;
