import React from "react";
import appLogo from "../../assets/images/logo.png";

const Logo = ({ classes }) => {
  return <img src={appLogo} alt="Logo" className={classes.join(" ")} />;
};

export default Logo;
