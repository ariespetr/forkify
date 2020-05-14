import React from "react";
import Likes from "../Likes/Likes";

import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import Search from "../../containers/Search/Search";

const Header = ({ likes, getRecipe }) => {
  return (
    <header className={styles.header}>
      <Logo classes={[styles.header__logo]} />
      <Search />
      <Likes getRecipe={getRecipe} likes={likes} />
    </header>
  );
};

export default Header;
