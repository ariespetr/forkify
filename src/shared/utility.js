import { Fraction } from "fractional";
import { evaluate } from "mathjs";
import uniqid from "uniqid";

export const updateObject = (oldObject, updatedObjectProperties) => {
  return {
    ...oldObject,
    ...updatedObjectProperties,
  };
};

export const checkFormValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.toString().trim().length !== 0 && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};

export const truncateString = (string, limit = 17) => {
  const newString = [];

  if (string.length > limit) {
    string.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newString.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return `${newString.join(" ")}...`;
  }

  return string;
};

export const formatCount = (count) => {
  if (count) {
    //ex 2.5 => 2 1/2
    const newCount = Math.round(count * 10000) / 10000;
    const [int, dec] = newCount
      .toString()
      .split(".")
      .map((el) => parseInt(el, 10));

    if (!dec) return newCount;

    if (int === 0) {
      const fr = new Fraction(newCount);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(newCount - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }

  return "?";
};

export const evaluateInput = (input) => {
  const result = evaluate(input);

  return result;
};

export const persistData = (item, value) => {
  localStorage.setItem(item, JSON.stringify(value));
};

export const readStorage = (item) => {
  const storage = JSON.parse(localStorage.getItem(item));

  //Restore item from local storage
  return storage ? storage : [];
};

export const generateId = () => {
  return uniqid();
};
