import React from "react";
import FormButtonTemplate from "./FormButtonTemplate/FormButtonTemplate";

const FormButton = ({ type, config, classes }) => {
  return <FormButtonTemplate type={type} config={config} classes={classes} />;
};

export default FormButton;
